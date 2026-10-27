'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const app={innerHTML:''},seed={language:'en',contentRevision:'no-fictional-names-v1',progress:{activities:{'demonstratives-wh-words-1-19b':{wins:2,attempts:7,misses:1},'dialogue-choice-ch3-where-polite':{wins:1,attempts:2}},words:{'3-c2b':{wins:3}},sentences:{},best:17}},storage={'kotoba-ch12-v1':JSON.stringify(seed)};
const context=vm.createContext({console,Date,Math,JSON,Number,String,Array,Object,Map,Set,RegExp,document:{querySelector:s=>s==='#app'?app:null,querySelectorAll:()=>[],addEventListener(){}},window:{scrollTo(){}},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},setInterval(){},setTimeout(){},clearTimeout(){}});
const scripts=[...fs.readFileSync('dist/index.html','utf8').matchAll(/<script defer src="([^"]+)"/g)].map(m=>m[1]).filter(s=>s!=='pwa.js');for(const name of scripts)vm.runInContext(fs.readFileSync('dist/'+name,'utf8'),context,{filename:name});
const ev=s=>vm.runInContext(s,context),plain=x=>JSON.parse(JSON.stringify(x));
assert.deepEqual(plain(ev('progress.activities["demonstratives-wh-words-1-19b"]')),seed.progress.activities['demonstratives-wh-words-1-19b']);assert.equal(ev('progress.words["3-c2b"].wins'),3);assert.equal(ev('progress.best'),17);
assert.equal(ev('allDialogueItems().length'),41);assert.equal(ev('new Set(allDialogueItems().map(q=>q.id)).size'),41);assert.equal(ev('allDialogueItems().filter(q=>q.forms).length'),6);
assert.equal(ev('WORDS.length'),338);assert.equal(ev('CHAPTER_DIALOGUES.some(q=>q.id==="ch3-show")'),true);assert.equal(ev('wordBy("3-c2b").kana'),'みせてください');
for(const id of ['ch3-show','ch3-buy','ch4-schedule-question','ch3-where-polite','wh-words-1-17b','wh-words-1-19b'])assert.equal(ev(`allDialogueItems().some(q=>q.id==='${id}')`),false);
for(const id of ['ch3-country','ch3-company','ch3-university'])assert.equal(ev(`allDialogueItems().find(q=>q.id==='${id}').kana`),'どちら');
assert.equal(ev('DIALOGUE_ALIASES.get("ch3-where-polite")'),'ch3-where');
assert.equal(ev('DIALOGUE_ALIASES.get("ch4-schedule-question")'),'ch4-time-question');
for(const q of plain(ev('allDialogueItems()'))){
 assert.equal(q.turns[q.answerSlot.turn][1],q.answerSlot.before+q.kana+q.answerSlot.after);
 assert.equal(q.sentence.split('{word}').length,2);
 if(q.forms){assert.deepEqual(q.forms.map(f=>f.role),['normal','polite']);assert.deepEqual(q.chapters,[...new Set(q.forms.flatMap(f=>f.chapters))].sort());}
}
for(const [id,kana,hint] of [['thanks-full','どうも','ありがとうございます'],['likewise','こちらこそ','よろしくおねがいします'],['ch3-origin','どこの','ワイン']]){
 const q=ev(`allDialogueItems().find(q=>q.id==='${id}')`);assert.equal(q.kana,kana);assert.ok(q.answerSlot.after.includes(hint));
 for(const language of ['en','zh-Hant']){ev(`state.language='${language}';state.dialogueBrowse='all';selectedDialogueExpression='${id}';navigate('dialogue')`);assert.ok(app.innerHTML.includes(`<strong class="wh-target">${kana}</strong>`));assert.ok(!app.innerHTML.includes(`<strong class="wh-target">${kana+hint}`));}
}
for(const target of ['どこの','だれの','なんの']){const q=ev(`allDialogueItems().find(q=>q.kana==='${target}')`);assert.ok(q);assert.equal(q.category,'wh-words');assert.equal(q.answerSlot.after.startsWith('の'),false);}
assert.ok(ev('allDialogueItems().some(q=>q.kana==="なん")'));assert.ok(ev('allDialogueItems().some(q=>q.kana==="だれ")'));
assert.equal(ev('allDialogueItems().filter(q=>q.kana==="なんじ").length'),1);assert.equal(ev('allDialogueItems().some(q=>q.kana==="なんじからなんじまで")'),false);
assert.ok(ev('allDialogueItems().find(q=>q.id==="ch4-time-question").examples[0].turns.some(t=>t[1]==="そちらはなんじからなんじまでですか。")'));
assert.equal(ev('PATTERNS.length'),18);assert.equal(ev('SENTENCES.length'),54);assert.ok(ev('SENTENCES.some(s=>s.pattern==="p17"&&s.tokens.join("")==="そちらはなんじからなんじまでですか。")'));
ev('startMock()');assert.equal(ev('mock.b.every(s=>sentenceBy(s.id).ch<=2)'),true);
const solve=`{const a=state.activity,q=activityCurrent();if(q.forms){if(isActivityRebuild(a)){for(const form of q.forms){const part=a.formAnswers[form.role];for(const unit of dialogueCharacters(form.kana))part.chosen.push(part.tileBank.findIndex((u,i)=>u===unit&&!part.chosen.includes(i)));}}else for(const form of q.forms)selectActivityChoice(form.id);checkActivity();}else if(isActivityRebuild(a)){for(const unit of kanaUnits(q.kana))a.chosen.push(a.tileBank.findIndex((u,i)=>u===unit&&!a.chosen.includes(i)));checkActivity();}else checkActivity(q.id);}`;
for(const language of ['en','zh-Hant'])for(const mode of ['all','category','chapter']){
 const keys=mode==='all'?['all']:mode==='category'?Array.from(ev('dialogueCategories().map(c=>c.id)')):['1','2','3','4'];
 for(const key of keys)for(const kind of ['dialogue-choice','dialogue-tiles']){
  ev(`state.language='${language}';state.dialogueBrowse='${mode}';state.dialogueCategory='${key}';state.dialogueChapter=Number('${key}');navigate('dialogue');startDialoguePractice('${kind}')`);
  const ids=plain(ev('state.activity.ids'));assert.ok(ids.length);assert.equal(new Set(ids).size,ids.length);assert.ok(!ids.some(id=>['ch3-show','ch3-buy','ch4-schedule-question'].includes(id)));
  for(const id of ids){ev(`state.activity.index=state.activity.ids.indexOf('${id}');prepareActivity();render()`);assert.ok(!app.innerHTML.includes('undefined'),`${language}:${key}:${kind}:${id} `+app.innerHTML.match(/.{0,80}undefined.{0,80}/)?.[0]);assert.ok(!app.innerHTML.includes('wh-target'));
   if(ev('!!activityCurrent().forms')){assert.equal(ev('new Set(state.activity.choices.map(c=>c.kana)).size'),ev('state.activity.choices.length'));ev('checkActivity()');assert.equal(ev('state.activity.checked'),false);}
   ev(solve);assert.equal(ev('state.activity.result'),true,`${language}:${key}:${kind}:${id}`);assert.ok(app.innerHTML.includes('feedback-lulu happy'));assert.equal(ev('gameProgress().completed'),ev('state.activity.index+1'));
   if(['thanks-full','likewise','ch3-origin','wh-whose','wh-what-kind'].includes(id)){const q=ev('activityCurrent()');const response=app.innerHTML.match(/<p class="jp inline-reply"[\s\S]*?<\/p>/)[0].replace(/<[^>]+>/g,'');assert.equal(response.replace(/\s/g,''),q.turns[q.answerSlot.turn][1].replace(/\s/g,''));}
  }
  assert.equal(ev('state.activity.correct'),ids.length);ev('activityAction("activityBack")');assert.equal(ev('state.dialogueBrowse'),mode);
 }
}
// Multi-selection never grades automatically, supports deselection and requires both.
ev(`state.dialogueBrowse='all';startDialoguePractice('dialogue-choice');state.activity.ids=['ch3-where'];state.activity.index=0;prepareActivity();selectActivityChoice('ch3-where');`);
assert.equal(ev('state.activity.checked'),false);assert.equal(ev('state.activity.selections.length'),1);ev('checkActivity()');assert.equal(ev('state.activity.checked'),false);
ev(`selectActivityChoice('ch3-where');`);assert.equal(ev('state.activity.selections.length'),0);
ev(`selectActivityChoice('ch3-where');selectActivityChoice(state.activity.choices.find(c=>!activityCurrent().forms.some(f=>f.id===c.id)).id);checkActivity()`);
assert.equal(ev('state.activity.result'),false);assert.deepEqual(plain(ev('state.activity.formResults')),{normal:true,polite:false});assert.equal(ev('state.activity.correct'),0);assert.equal(ev('state.activity.missed.length'),1);assert.equal(ev('gameProgress().completed'),1);
ev('activityAction("activityNext");activityAction("activityMissed")');assert.equal(ev('state.activity.ids.length'),1);assert.equal(ev('state.activity.selections.length'),0);
// Independent character banks, reset, partial correctness and Unicode handling.
ev(`state.dialogueBrowse='all';startDialoguePractice('dialogue-tiles');state.activity.ids=['wh-words-1-19a'];state.activity.index=0;prepareActivity();`);
assert.deepEqual(plain(ev('dialogueCharacters("か\\u3099きゅう")')),['が','き','ゅ','う']);
ev(`{const a=state.activity;for(const form of activityCurrent().forms){const part=a.formAnswers[form.role];for(const unit of dialogueCharacters(form.kana))part.chosen.push(part.tileBank.findIndex((u,i)=>u===unit&&!part.chosen.includes(i)));}}`);
assert.equal(ev('activityReady(activityCurrent())'),true);const politeBefore=ev('dialogueFormAnswer("polite")');
ev('pairedActivityClick({activityForm:"normal",action:"activityFormUndo"})');assert.equal(ev('activityReady(activityCurrent())'),false);assert.equal(ev('dialogueFormAnswer("polite")'),politeBefore);
ev(`pairedActivityClick({activityForm:'normal',action:'activityFormClear'});{const f=activityCurrent().forms[0],part=state.activity.formAnswers.normal;for(const unit of dialogueCharacters(f.kana).reverse())part.chosen.push(part.tileBank.findIndex((u,i)=>u===unit&&!part.chosen.includes(i)));}checkActivity()`);
assert.equal(ev('state.activity.result'),false);assert.deepEqual(plain(ev('state.activity.formResults')),{normal:false,polite:true});assert.ok(app.innerHTML.includes('data-form-result="normal"'));assert.ok(app.innerHTML.includes('Needs correction')||app.innerHTML.includes('需要修正'));
// Alias and removal recovery never creates an empty or invalid selection.
ev(`state.dialogueBrowse='all';selectedDialogueExpression='ch3-where-polite';navigate('dialogue')`);assert.equal(ev('selectedDialogueExpression'),'ch3-where');
ev(`selectedDialogueExpression='ch3-show';render()`);assert.ok(ev('allDialogueItems().some(q=>q.id===selectedDialogueExpression)'));
console.log('PASS: all 41 Dialogue entries, six equivalent pairs, every chapter/category and both languages/modes; multi-selection, independent reconstruction, partial grading, explicit hints, の targets, removals, aliases, source progress and Sentence Structure.');
