'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('dist/index.html','utf8');
const scripts=[...html.matchAll(/<script defer src="([^"]+)"/g)].map(m=>m[1]).filter(s=>s!=='pwa.js');
const seed={contentRevision:'no-fictional-names-v1',language:'en',progress:{words:{'1-09':{wins:2,attempts:3}},sentences:{'p1-1':{wins:1}},activities:{'dialogue-choice-meet':{wins:2}},vocabularyRebuild:{'2-08':{wins:2}},best:19},mock:{a:[{id:'1-09',b:'が',c:''}],b:[{id:'p1-1',chosen:[0],order:[0,1,2,3,4]}],started:100,deadline:900100,done:false}};
const app={innerHTML:''},storage={'kotoba-ch12-v1':JSON.stringify(seed)};
const ctx=vm.createContext({console,Date,Math,JSON,Number,String,Array,Object,Map,Set,RegExp,document:{querySelector:s=>s==='#app'?app:null,querySelectorAll:()=>[],addEventListener(){}},window:{scrollTo(){}},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},setInterval(){},setTimeout(){},clearTimeout(){}});
scripts.forEach(s=>vm.runInContext(fs.readFileSync(`dist/${s}`,'utf8'),ctx,{filename:s}));
const ev=s=>vm.runInContext(s,ctx),plain=x=>JSON.parse(JSON.stringify(x));
assert.deepEqual(plain(ev('progress.words["1-09"]')),seed.progress.words['1-09']);
assert.equal(ev('progress.best'),19);assert.equal(ev('mock.deadline'),seed.mock.deadline);assert.equal(ev('mock.a[0].b'),'が');
assert.equal(ev('progress.activities["dialogue-choice-meet"].wins'),2);assert.equal(ev('progress.vocabularyRebuild["2-08"].wins'),2);
for(const [ch,count,forms] of [[3,36,54],[4,48,62]]){
 const rows=plain(ev(`CHAPTER_SOURCE_ROWS[${ch}]`));
 assert.deepEqual([...new Set(rows.filter(r=>/^\d/.test(r.row)).map(r=>parseInt(r.row,10)))].sort((a,b)=>a-b),Array.from({length:count},(_,i)=>i+1));
 assert.equal(rows.length,forms);assert.equal(ev(`vocabularyStudySet('chapter-${ch}').ids.length`),forms);
 assert.equal(ev(`CHAPTER_SOURCE_ROWS[${ch}].every(r=>inChapter(wordBy(r.word),${ch})&&VOCABULARY_WORD_IDS.has(r.word))`),true);
 for(const mode of ['write','vocabulary-rebuild','kanji-writing']){
  ev(`startWordSet('${mode}','chapter-${ch}')`);
  assert.equal(ev(`state.round.ids.every(id=>inChapter(wordBy(id),${ch}))`),true);
  assert.ok(ev('state.round.ids.length')>0);assert.ok(!app.innerHTML.includes('breadcrumb-row'));
  ev('run("restart")');assert.equal(ev(`state.round.ids.every(id=>inChapter(wordBy(id),${ch}))`),true);
  ev('run("gameBack")');assert.ok(app.innerHTML.includes('breadcrumb-row'));
 }
}
assert.equal(ev('WORDS.filter(w=>w.kana==="そちら").length'),1);
assert.deepEqual(plain(ev('wordChapters(wordBy("3-06"))')),[3,4]);
assert.equal(ev('new Set(vocabularyStudySet("all").ids).size'),300);
assert.equal(ev('WORDS.filter(w=>w.kana==="おととい").length'),1);assert.equal(ev('WORDS.filter(w=>w.kana==="きのう").length'),1);
assert.equal(ev('wordBy("4-28").c'),'X');assert.equal(ev('wordBy("4-r2").jp'),'ペキン');
assert.equal(ev('wordBy("3-16a").jp'),'トイレ');assert.equal(ev('wordBy("3-16b").c'),'お手洗い');
assert.equal(ev('wordBy("3-22a").kana'),'くに');assert.equal(ev('wordBy("3-22b").kana'),'おくに');
assert.equal(ev('wordBy("4-14a").kana'),'～ふん');assert.equal(ev('wordBy("4-14b").kana'),'～ぷん');
assert.equal(ev('wordBy("4-22a").c'),'晩');assert.equal(ev('wordBy("4-22b").c'),'夜');
assert.equal(ev('wordBy("4-17").kana'),'なんぷん');assert.equal(ev('wordBy("3-31").kana'),'なんがい');
assert.deepEqual(plain(ev('[HOUR_READINGS[3],HOUR_READINGS[6],HOUR_READINGS[8]]')),['よじ','しちじ','くじ']);
assert.deepEqual(plain(ev('[MINUTE_READINGS[1],MINUTE_READINGS[4],MINUTE_READINGS[6],MINUTE_READINGS[8],MINUTE_READINGS[10]]')),['いっぷん','よんぷん','ろっぷん','はっぷん','じゅっぷん']);
assert.deepEqual(plain(ev('[NUMBER_READINGS[300],NUMBER_READINGS[600],NUMBER_READINGS[800],NUMBER_READINGS[3000],NUMBER_READINGS[8000]]')),['さんびゃく','ろっぴゃく','はっぴゃく','さんぜん','はっせん']);
assert.equal(ev('timeReading(4,8,"ごご")'),'ごごよじはっぷん');
assert.equal(ev('rebuildCorrect("きようしつ","きょうしつ")'),false);
assert.equal(ev('rebuildCorrect("ろくぷん","ろっぷん")'),false);
assert.equal(ev('rebuildCorrect("せんいせ","せんせい")'),false);
assert.equal(ev('rebuildCorrect("か\u3099い","がい")'),true);
for(const lang of ['en','zh-Hant'])for(const ch of [3,4]){
 ev(`state.language='${lang}';selectDialogueChapter(${ch})`);
 const ids=plain(ev('dialogueStudySet().items.map(q=>q.id)'));
 assert.equal(ids.length,ch===3?24:24);
 assert.equal(ev(`dialogueStudySet().items.every(q=>q.ch===${ch})`),true);
 for(const id of ids){
  ev(`selectDialogueExpression('${id}')`);
  const q=plain(ev(`allDialogueItems().find(q=>q.id==='${id}')`));
  assert.ok(app.innerHTML.includes(`data-dialogue-guide="${id}"`));
  assert.equal((app.innerHTML.match(/class="conversation-turn /g)||[]).length,q.turns.length);
  assert.ok(app.innerHTML.includes('class="wh-target"'));
  assert.ok(app.innerHTML.includes(lang==='en'?q.why:q.whyZh));
  assert.equal(new Set([q.kana,...q.distractors]).size,q.distractors.length+1);
 }
 for(const kind of ['dialogue-choice','dialogue-tiles']){
  ev(`startDialoguePractice('${kind}')`);
  assert.deepEqual(plain(ev('state.activity.ids')).sort(),ids.slice().sort());
  for(const id of ids){
   ev(`state.activity.index=state.activity.ids.indexOf('${id}');prepareActivity();render()`);
   assert.ok(!app.innerHTML.includes('wh-target'));assert.ok(!app.innerHTML.includes('reply-feedback'));assert.ok(!app.innerHTML.includes('breadcrumb-row'));assert.ok(!app.innerHTML.includes('conversation-notes'));
   const q=plain(ev('activityCurrent()'));
   const incoming=app.innerHTML.match(/<div class="conversation-turn listener">([\s\S]*?)<div class="conversation-turn you">/)[1];
   assert.ok(incoming.includes(q.turns[0][1]));
   if(kind==='dialogue-choice')ev('checkActivity(activityCurrent().id)');
   else ev('{const a=state.activity;for(const unit of kanaUnits(vocabularyReading(activityCurrent()))){const i=a.tileBank.findIndex((x,i)=>x===unit&&!a.chosen.includes(i));if(i<0)throw Error("missing repeated tile");a.chosen.push(i);}checkActivity()}');
   assert.equal(ev('state.activity.result'),true,id);assert.ok(app.innerHTML.includes('reply-feedback correct'));assert.ok(app.innerHTML.includes('feedback-lulu happy'));
  }
  assert.equal(ev('state.activity.correct'),ids.length);
  ev('activityAction("activityRestart")');assert.deepEqual(plain(ev('state.activity.ids')).sort(),ids.slice().sort());
  ev('state.activity.missed=[state.activity.ids[0]];activityAction("activityMissed")');assert.equal(ev('state.activity.ids.length'),1);
  ev('run("gameBack")');assert.equal(ev('state.dialogueChapter'),ch);
 }
}
for(const category of plain(ev('dialogueCategories().map(c=>c.id)'))){
 ev(`selectDialogueCategory('${category}');startDialoguePractice('dialogue-choice')`);
 assert.equal(ev(`state.activity.items.every(q=>dialogueInCategory(q,'${category}'))`),true);
}
// Clock geometry is derived from the same numeric values used by the time answers.
const clock=ev('lessonScene(CHAPTER_DIALOGUES.find(q=>q.id==="ch4-time-pm"))');
assert.ok(clock.includes('data-hour="4" data-minute="8"'));
assert.ok(clock.includes('rotate(124 100 100)'));assert.ok(clock.includes('rotate(48 100 100)'));
assert.ok(clock.includes('04:08'));assert.ok(clock.includes('PM'));
// The shorter telephone reading is valid, but missing/reordered digits are not.
for(const id of ['ch3-floor-answer','ch4-phone-answer']){
 const readings=plain(ev(`CHAPTER_DIALOGUES.find(q=>q.id==='${id}').acceptedReadings`));
 for(const reading of readings){
  ev(`selectDialogueChapter(${id.startsWith('ch3')?3:4});startDialoguePractice('dialogue-tiles');state.activity.index=state.activity.ids.indexOf('${id}');prepareActivity()`);
  ev(`for(const unit of kanaUnits(${JSON.stringify(reading)})){const a=state.activity;const index=a.tileBank.findIndex((x,i)=>x===unit&&!a.chosen.includes(i));if(index<0)throw Error('missing alternate tile');activityClick({dataset:{activityTile:String(index)}})}checkActivity()`);
  assert.equal(ev('state.activity.result'),true,reading);
 }
}
ev(`selectDialogueChapter(4);startDialoguePractice('dialogue-tiles');state.activity.index=state.activity.ids.indexOf('ch4-phone-answer');prepareActivity();for(const unit of kanaUnits('ごにななごのにななごに')){const a=state.activity;a.chosen.push(a.tileBank.findIndex((x,i)=>x===unit&&!a.chosen.includes(i)))}checkActivity()`);
assert.equal(ev('state.activity.result'),false);
ev('selectDialogueChapter(4);startDialoguePractice("dialogue-choice");state.activity.index=state.activity.ids.indexOf("ch4-past-negative");prepareActivity();checkActivity(state.activity.choices.find(q=>q.id!==activityCurrent().id).id)');
assert.equal(ev('state.activity.result'),false);assert.ok(app.innerHTML.includes('reply-feedback wrong'));assert.ok(app.innerHTML.includes('feedback-lulu encouraging'));
// The timed assessment keeps its original distribution and all old IDs.
for(let i=0;i<10;i++){ev('startMock()');assert.equal(ev('mock.a.every(q=>wordBy(q.id).ch<=2)&&mock.b.every(q=>sentenceBy(q.id).ch<=2)'),true);}
console.log('PASS: Chapters 3–4 complete source rows, variants, shared membership, exact readings, all scoped modes, bilingual complete guides, grading visibility, numeric scenes, retries, and legacy progress/mock compatibility.');

// Category migrations preserve every other conversation and stable source IDs.
assert.equal(ev('dialogueCategories().some(c=>c.id==="locations")'),false);
ev('selectDialogueCategory("wh-words")');
for(const id of ['ch3-where','ch3-where-polite','ch3-floor-question','ch4-time-question','ch4-weekday-question','ch4-phone-question','ch4-schedule-question'])assert.equal(ev(`dialogueStudySet().items.some(q=>q.id==='${id}')`),true,id);
for(const kind of ['dialogue-choice','dialogue-tiles']){ev(`startDialoguePractice('${kind}')`);assert.equal(ev('state.activity.ids.includes("ch4-schedule-question")'),true);}
ev('selectDialogueCategory("demonstratives")');
for(const [id,en,zh] of [['ch3-location-01','Here','這裡'],['ch3-location-02','There','那裡'],['ch3-location-03','Over there','那邊（遠處）']]){assert.equal(ev(`dialogueStudySet().items.some(q=>q.id==='${id}')`),true);ev('state.language="en"');assert.equal(ev(`dialogueExpressionLabel(allDialogueItems().find(q=>q.id==='${id}'))`),en);ev('state.language="zh-Hant"');assert.equal(ev(`dialogueExpressionLabel(allDialogueItems().find(q=>q.id==='${id}'))`),zh);}
assert.equal(ev('allDialogueItems().length'),73);assert.equal(ev('new Set(allDialogueItems().map(q=>q.id)).size'),73);
assert.equal(ev('allDialogueItems().some(q=>q.id==="ch4-empathy")'),false);assert.equal(ev('wordBy("4-e1").kana'),'たいへんですね');assert.notEqual(ev('vocabularySection(wordBy("4-e1"))'),'replies');
for(const category of ev('dialogueCategories().map(c=>c.id)'))for(const kind of ['dialogue-choice','dialogue-tiles']){ev(`selectDialogueCategory('${category}');startDialoguePractice('${kind}')`);assert.equal(ev('state.activity.items.some(q=>q.id==="ch4-empathy")'),false);}
ev('state.dialogueBrowse="category";state.dialogueCategory="locations";dialogueContent()');assert.equal(ev('state.dialogueCategory'),'introductions');
console.log('PASS: WH/place category migrations, source conversations, localized place chips, category game pools, Replies exclusion and saved-category recovery.');
