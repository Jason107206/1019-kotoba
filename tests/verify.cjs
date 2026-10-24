const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements={app:{innerHTML:''},toast:{style:{},textContent:''}};
const handlers={};let storage={'kotoba-ch12-v1':JSON.stringify({language:'en'})};
const timers=new Map();let timerId=0;
const ctx=vm.createContext({console,Date,Math,JSON,Number,String,Array,Object,Set,RegExp,module:{exports:{}},document:{querySelector:s=>s==='#app'?elements.app:s==='#toast'?elements.toast:null,querySelectorAll:()=>[],addEventListener:(e,f)=>handlers[e]=f},window:{scrollTo:()=>{}},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},setInterval:()=>{},setTimeout:(fn,delay)=>{const id=++timerId;timers.set(id,{fn,delay});return id;},clearTimeout:id=>timers.delete(id)});
vm.runInContext(fs.readFileSync('dist/content.js','utf8')+'\n'+fs.readFileSync('dist/hiragana.js','utf8')+'\n'+fs.readFileSync('dist/activities.js','utf8')+'\n'+fs.readFileSync('dist/i18n.js','utf8')+'\n'+fs.readFileSync('dist/app.js','utf8'),ctx);
const ev=s=>vm.runInContext(s,ctx);
assert.equal(ev('WORDS.length'),96);
assert.equal(ev('SENTENCES.length'),50);
assert.equal(ev('PATTERNS.length'),16);
assert.equal(ev('new Set(WORDS.map(x=>x.id)).size'),96);
assert.equal(ev('new Set(SENTENCES.map(x=>x.id)).size'),50);
assert.equal(ev('WORDS.filter(w=>w.group==="core").length'),62);
// All syllabus forms belong to one meaningful category, independently of their printed source group.
const expectedCategoryCounts={people:6,occupations:8,places:2,nationality:11,questions:6,demonstratives:6,objects:25,food:2,languages:3,introductions:13,courtesy:7,replies:7};
assert.equal(ev('VOCAB_CATEGORIES.length'),12);
assert.equal(ev('new Set(VOCAB_CATEGORIES.map(c=>c.id)).size'),12);
assert.equal(ev('VOCAB_CATEGORY_BY_WORD.size'),96);
assert.equal(ev('VOCAB_CATEGORIES.flatMap(c=>c.ids).length'),96);
assert.equal(ev('VOCAB_CATEGORIES.every(c=>c.ids.every(id=>!!wordBy(id)))'),true);
assert.equal(ev('WORDS.every(w=>!!vocabularySection(w))'),true);
assert.equal(ev('VOCAB_CATEGORIES.every(c=>ZH_HANT[c.label]&&ZH_HANT[c.description])'),true);
for(const [section,count] of Object.entries(expectedCategoryCounts)){
  ev(`state.filter.group='${section}'`);
  assert.equal(ev('pool("write").length'),count);
  assert.equal(ev(`pool('write').every(w=>vocabularySection(w)==='${section}')`),true);
}
for(const [id,category] of [['1-04','people'],['1-09','occupations'],['1-06','nationality'],['1-18','questions'],['1-19b','questions'],['2-35','languages'],['2-06','demonstratives'],['2-c1','courtesy'],['2-30','food'],['2-31','food'],['2-22','objects'],['2-37','replies'],['2-c6','replies']])assert.equal(ev(`vocabularySection(wordBy('${id}'))`),category);
ev('resetFilters();navigate("bank")');
assert.equal((elements.app.innerHTML.match(/data-word-category=/g)||[]).length,12);
const bankIds=[...elements.app.innerHTML.matchAll(/data-word-id="([^"]+)"/g)].map(match=>match[1]);
assert.equal(bankIds.length,96);assert.equal(new Set(bankIds).size,96);
assert.ok(!elements.app.innerHTML.includes('Other main vocabulary'));
ev('state.search="coffee";render()');
assert.ok(elements.app.innerHTML.includes('data-word-category="food"'));
assert.ok(!elements.app.innerHTML.includes('data-word-category="objects"'));
assert.equal((elements.app.innerHTML.match(/data-word-id=/g)||[]).length,1);
ev('state.search="";state.filter.group="replies";state.filter.ch="2";render()');
assert.equal(ev('pool("write").length'),5);
assert.equal((elements.app.innerHTML.match(/data-word-category=/g)||[]).length,1);
ev('resetFilters()');
ev('state.language="zh-Hant";render()');
for(const label of ['人物與稱呼','國家與國籍','疑問詞與年齡','食物與飲品','語言','回答與反應'])assert.ok(elements.app.innerHTML.includes(label));
assert.ok(!elements.app.innerHTML.includes('其他主要詞彙'));
ev('state.language="en";render()');
assert.equal(ev('WORDS.filter(w=>w.ch===1).length'),43);
assert.equal(ev('WORDS.filter(w=>w.ch===2).length'),53);
assert.equal(ev('WORDS.every(w=>/^[ぁ-ゖー～]+$/.test(w.kana))'),true);
assert.equal(ev('WORDS.every(w=>gradeWord(w,w.kana,w.c).score===1)'),true);
assert.equal(ev('WORDS.every(w=>gradeWord(w,"",w.c).score===.5)'),true);
assert.equal(ev('WORDS.every(w=>gradeWord(w,w.kana,"").score===.5)'),true);
assert.equal(ev('gradeWord(wordBy("1-01"),"わたし","私").score'),.5);
assert.equal(ev('gradeWord(wordBy("2-18"),"かぎ","鍵").score'),.5);
assert.equal(ev('gradeWord(wordBy("2-29"),"いす","椅子").score'),.5);
assert.equal(ev('gradeWord(wordBy("1-09"),"がくせい","學生").score'),.5);
assert.equal(ev('gradeWord(wordBy("1-09"),"gakusei","学生").score'),.5);
assert.equal(ev('gradeWord(wordBy("2-09"),"ざつし","雑誌").score'),.5);
assert.equal(ev('gradeWord(wordBy("2-11"),"ノート","X").score'),.5);
assert.equal(ev('gradeWord(wordBy("2-11"),"のーと","ｘ").score'),1);
assert.equal(ev('gradeWord(wordBy("1-c2"),"からきました。","から来ました。").score'),1);
assert.equal(ev('gradeWord(wordBy("1-c6"),"こちらは～さんです。","X").score'),1);
assert.equal(ev('SENTENCES.every(s=>gradeSentence(s,s.tokens.map((_,i)=>i)))'),true);
assert.equal(ev('SENTENCES.every(s=>!gradeSentence(s,[]))'),true);
assert.equal(ev('gradeSentence(sentenceBy("p12-1"),[0,1,5,3,4,2,6,7])'),true);
assert.equal(ev('PATTERNS.every(p=>SENTENCES.some(s=>s.pattern===p.id))'),true);
// Every kanji in a puzzle is taught on one of the specified vocabulary pages.
assert.equal(ev(`(()=>{const allowed=new Set(WORDS.map(w=>w.c).join('').match(/\\p{Script=Han}/gu));return SENTENCES.every(s=>(s.tokens.join('').match(/\\p{Script=Han}/gu)||[]).every(k=>allowed.has(k)));})()`),true);
for(const view of ['home','write-menu','write','matching','dialogue','match','sentences','bank','mock']){ev(`navigate('${view}')`);assert.ok(elements.app.innerHTML.length>1000,view);assert.ok(!elements.app.innerHTML.includes('undefined'),view);}
ev('navigate("cards")');assert.equal(ev('state.view'),'write-menu');
assert.equal(ev('views.some(([view])=>view==="cards")'),false);
ev('navigate("write");state.round.b=wordBy(current()).kana;state.round.c=wordBy(current()).c;run("checkWrite")');assert.equal(ev('state.round.result.score'),1);assert.ok(elements.app.innerHTML.includes('1 / 1 mark'));
ev('run("next");state.round.b="";state.round.c="";run("checkWrite")');assert.equal(ev('state.round.result.score'),0);assert.equal(ev('state.round.missed.length'),1);
ev('run("repeatMissed")');assert.equal(ev('state.round.ids.length'),1);
ev('navigate("sentences");state.round.chosen=sentenceBy(current()).tokens.map((_,i)=>i);run("checkSentence")');assert.equal(ev('state.round.result'),true);assert.equal(ev('state.round.correct'),1);
ev('run("next");run("hint");state.round.chosen=sentenceBy(current()).tokens.map((_,i)=>i);run("checkSentence")');assert.equal(ev('state.round.result'),true);assert.equal(ev('state.round.correct'),1);assert.equal(ev('state.round.missed.length'),1);
ev('navigate("match")');assert.equal(ev('new Set(state.round.options).size===state.round.options.length&&state.round.options.length>=1&&state.round.options.length<=4'),true);assert.equal(ev('state.round.options.includes(wordBy(current()).c)'),true);
// Exercise every item’s renderer and distractor generation.
for(const mode of ['write','match','sentences']){
ev(`resetFilters();state.view='${mode}';begin('${mode}');for(let i=0;i<state.round.ids.length;i++){state.round.index=i;prepareQuestion();render();if('${mode}'==='match'&&(new Set(state.round.options).size!==state.round.options.length||state.round.options.length>4||!state.round.options.every(c=>relatedWords(wordBy(current())).some(w=>w.c===c))))throw Error('Unrelated distractors');}`);
assert.ok(!elements.app.innerHTML.includes('undefined'));
}
ev('navigate("mock");startMock()');assert.equal(ev('mock.a.length'),10);assert.equal(ev('mock.b.length'),5);assert.equal(ev('mock.a.filter(q=>wordBy(q.id).ch===1).length'),5);assert.equal(ev('new Set(mock.b.map(q=>sentenceBy(q.id).pattern)).size'),5);assert.equal(ev('mock.deadline-mock.started'),900000);
ev('mock.a.forEach(q=>{q.b=wordBy(q.id).kana;q.c=wordBy(q.id).c});mock.b.forEach(q=>q.chosen=sentenceBy(q.id).tokens.map((_,i)=>i));finishMock()');assert.equal(ev('mock.score'),20);assert.equal(ev('progress.best'),20);
const attempts=ev('Object.values(progress.words).reduce((n,w)=>n+w.attempts,0)');ev('finishMock()');assert.equal(ev('Object.values(progress.words).reduce((n,w)=>n+w.attempts,0)'),attempts);
ev('startMock();mock.a[0].b=wordBy(mock.a[0].id).kana;finishMock(true)');assert.equal(ev('mock.score'),.5);assert.equal(ev('mock.timedout'),true);
ev('state.view="mock";render()');assert.ok(elements.app.innerHTML.includes('0.5<small> / 20'));
assert.ok(Object.keys(storage).length===1);assert.equal(JSON.parse(Object.values(storage)[0]).mock.done,true);

// Retain first-reading filters without a separate Hiragana groups page.
assert.equal(ev('new Set(HIRAGANA_KEYS.map(([k])=>k)).size'),71);
assert.equal(ev('WORDS.every(w=>HIRAGANA_KEYS.some(([k])=>k===hiraganaInitial(w)))'),true);
assert.equal(ev('hiraganaInitial({jp:"コーヒー"})'),'こ');
assert.equal(ev('hiraganaInitial({kana:"～からきました"})'),'か');
ev('resetFilters();state.filter.kana="が"');
assert.equal(ev('pool("write").length'),1);
assert.equal(ev('pool("sentences").length'),50);
ev('resetFilters()');

assert.equal(ev('WORDS.some(w=>/^1-r1[1-7]$/.test(w.id))'),false);
assert.equal(ev('/ミラー|サントス|ワン|カリナ|グプタ|テレーザ|IMC|AKC|神戸|富士|さくら大学/.test(JSON.stringify({WORDS,SENTENCES}))'),false);

// Exclude kana-only entries through both normal and explicit-ID match entry points.
ev('resetFilters();begin("match")');
assert.equal(ev('state.round.ids.length'),ev('WORDS.filter(hasKanji).length'));
assert.equal(ev('state.round.ids.every(id=>hasKanji(wordBy(id)))'),true);
assert.equal(ev('state.round.options.every(c=>/\\p{Script=Han}/u.test(c))'),true);
ev('begin("match",["1-01","1-09","2-18"])');
assert.equal(ev('state.round.ids.join(",")'),'1-09');
ev('navigate("bank")');
assert.ok(!elements.app.innerHTML.includes('data-view="cards"'));
assert.ok(!elements.app.innerHTML.includes('data-action="goCards"'));
assert.ok(elements.app.innerHTML.includes('data-action="writeSelection"'));
ev('state.language="zh-Hant";render()');
assert.ok(elements.app.innerHTML.includes('默寫所選詞彙'));
assert.ok(!elements.app.innerHTML.includes('記憶卡'));
ev('state.language="en";render()');
ev('state.search="student";writeSelection()');
assert.equal(ev('state.view'),'write');
assert.equal(ev('state.round.ids.join(",")'),'1-09');
assert.ok(elements.app.innerHTML.includes('C · KANJI / X'));
ev('resetFilters()');


// Matching categories and dialogue modes stay separate from the quiz bank.
assert.equal(ev('demonstrativeItems().length'),7);
assert.equal(ev('dialogueItems("quiz").some(x=>x.added)'),false);
assert.equal(ev('dialogueItems().length'),14);
assert.equal(ev('WORDS.some(w=>["なんじ","いくら","はじめましょう"].includes(w.kana))'),false);
assert.equal(ev('kanaUnits("きょうし").join(",")'),'きょ,う,し');
assert.equal(ev('kanaUnits("えっ").join(",")'),'え,っ');
for(const kind of ['demonstratives','dialogue-choice','dialogue-tiles']){
  ev(`startActivity('${kind}')`);
  assert.ok(elements.app.innerHTML.includes('data-action="back"'));
  const count=ev('state.activity.ids.length');
  for(let i=0;i<count;i++){
    ev(`state.activity.index=${i};prepareActivity();render()`);
    assert.equal(ev('new Set(state.activity.choices.map(x=>x.kana)).size===state.activity.choices.length&&state.activity.choices.length>=2&&state.activity.choices.length<=4'),true);
    assert.equal(ev(`state.activity.choices.every(item=>vocabularySection(wordBy(item.word))===vocabularySection(wordBy(activityCurrent().word))||[item.word,activityCurrent().word].sort().join(',')==='2-06,2-c1')`),true);
    if(kind.startsWith('dialogue'))assert.equal(ev('state.activity.choices.filter(x=>x.family===activityCurrent().family).length'),1);
    if(kind==='dialogue-tiles'){
      assert.equal(ev('JSON.stringify([...state.activity.tileBank].sort())===JSON.stringify(kanaUnits(activityCurrent().kana).sort())'),true);
      ev(`{const a=state.activity;for(const unit of kanaUnits(activityCurrent().kana)){const id=a.tileBank.findIndex((x,i)=>x===unit&&!a.chosen.includes(i));if(id<0)throw Error('Missing tile');a.chosen.push(id);}checkActivity();}`);
      assert.equal(ev('activityAnswer()'),ev('activityCurrent().kana'));
    }else ev('checkActivity(activityCurrent().id)');
    assert.equal(ev('state.activity.result'),true,kind+' correct answer');
    assert.ok(!elements.app.innerHTML.includes('undefined'));
  }
  assert.equal(ev('state.activity.correct'),count);
  ev('activityAction("activityNext")');assert.ok(elements.app.innerHTML.includes('Round complete.'));
}
ev('startActivity("demonstratives");checkActivity(state.activity.choices.find(x=>x.id!==activityCurrent().id).id)');
assert.equal(ev('state.activity.result'),false);
assert.equal(ev('state.activity.missed.length'),1);
const attemptsBefore=ev('Object.values(progress.activities).reduce((n,x)=>n+x.attempts,0)');
ev('checkActivity(activityCurrent().id)');
assert.equal(ev('Object.values(progress.activities).reduce((n,x)=>n+x.attempts,0)'),attemptsBefore);
ev('activityAction("activityMissed")');assert.equal(ev('state.activity.ids.length'),1);
ev('startActivity("dialogue-choice")');
assert.equal(ev('state.activity.items.some(x=>x.added)'),false);
ev('startActivity("dialogue-tiles",["thanks-full"])');
assert.equal(ev('activityCurrent().kana'),'どうもありがとうございます');
// Simulate actual event handlers for tile placement, removal and submission.
ev(`{const a=state.activity,id=a.tileBank.findIndex(x=>x==='ど');activityClick({dataset:{activityTile:String(id)}});}`);
assert.equal(ev('activityAnswer()'),'ど');
ev('activityClick({dataset:{activityReturn:"0"}})');assert.equal(ev('activityAnswer()'),'');
ev(`{const a=state.activity;for(const unit of kanaUnits(activityCurrent().kana)){const id=a.tileBank.findIndex((x,i)=>x===unit&&!a.chosen.includes(i));activityClick({dataset:{activityTile:String(id)}});}activityAction('activityCheck');}`);
assert.equal(ev('state.activity.result'),true);
ev('navigate("matching")');assert.ok(!elements.app.innerHTML.includes('Question words'));
ev('navigate("dialogue")');assert.ok(elements.app.innerHTML.includes('data-dialogue-category="introductions"'));
ev('startMock()');assert.equal(ev('mock.a.every(q=>!!wordBy(q.id))'),true);
ev('mock.done=true;resetFilters()');


// Every activity answer must now come from the syllabus bank.
assert.equal(ev('[...demonstrativeItems(),...dialogueItems()].every(q=>WORDS.some(w=>w.kana===q.kana))'),true);
assert.equal(ev('[...demonstrativeItems(),...dialogueItems()].some(q=>["なんじ","いくら","はじめましょう"].includes(q.kana))'),false);
for(const [id,location] of [['2-01','speaker'],['2-04','speaker'],['2-02','listener'],['2-05','listener'],['2-03','far'],['2-06','far'],['2-c1','attention']]){
  ev(`{const q=demonstrativeItems().find(x=>x.word==='${id}');if(demonstrativeLocation(q)!=='${location}')throw Error('Wrong graphic location');}`);
  const html=ev(`demonstrativeQuestion(demonstrativeItems().find(x=>x.word==='${id}'))`);
  assert.ok(html.includes('<svg'));assert.ok(html.includes('role="img"'));assert.ok(!html.includes('undefined'));
  if(location==='attention')assert.ok(!html.includes('scene-book'));else assert.ok(html.includes('scene-book'));
  assert.ok(html.includes('_____'));
}
ev('navigate("dialogue")');assert.ok(!elements.app.innerHTML.includes('data-dialogue-scope'));

console.log('PASS: source coverage, strict spelling, 0/0.5/1 scoring, all 50 puzzles, 16 groups, shuffled duplicate tiles, word practice modes, missed-item practice, hints, 15-minute mock, balanced chapter sampling, 20-point grading and persisted state.');

// Expression prompts show the incoming line without translating the answer.
for(const kind of ['dialogue-choice','dialogue-tiles']){
  ev(`startActivity('${kind}',['likewise'])`);
  assert.ok(elements.app.innerHTML.includes('<p class="dialogue-scene jp" lang="ja">よろしくおねがいします</p>'));
  assert.ok(!/LINE TO SAY|The pleasure is mine|Someone has finished an introduction|highlighted/.test(elements.app.innerHTML));
  ev(`startActivity('${kind}',['meet'])`);
  assert.ok(elements.app.innerHTML.includes('You meet someone for the first time.'));
  assert.ok(!/LINE TO SAY|Nice to meet you/.test(elements.app.innerHTML));
}

// Language switching preserves an in-progress answer and persists the preference.
ev('startActivity("dialogue-tiles",["likewise"]);state.activity.chosen=[0];run("toggleLanguage")');
assert.equal(ev('state.language'),'zh-Hant');
assert.equal(ev('state.activity.chosen.length'),1);
assert.equal(JSON.parse(Object.values(storage)[0]).language,'zh-Hant');
assert.ok(elements.app.innerHTML.includes('你會怎樣說？'));
assert.ok(elements.app.innerHTML.includes('<p class="dialogue-scene jp" lang="ja">よろしくおねがいします</p>'));
assert.ok(!/LINE TO SAY|The pleasure is mine/.test(elements.app.innerHTML));
assert.equal(ev('DIALOGUES.every(d=>(!d.scene||ZH_HANT[d.scene])&&ZH_HANT[d.why])'),true);
assert.equal(ev('SENTENCES.every(s=>ZH_HANT[s.prompt])'),true);
assert.equal(ev('PATTERNS.every(p=>ZH_HANT[p.title]&&ZH_HANT[p.tip])'),true);
assert.equal(ev('demonstrativeItems().every(q=>ZH_HANT[q.why])'),true);
assert.equal(ev('localizeMarkup(`<input value="English &amp; これ" data-answer="b" placeholder="Type hiragana"><span lang="ja">よろしくおねがいします</span>`)'),'<input value="English &amp; これ" data-answer="b" placeholder="輸入平假名"><span lang="ja">よろしくおねがいします</span>');
for(const view of ['home','write-menu','write','matching','dialogue','sentences','bank','mock']){
  ev(`mock=null;resetFilters();navigate('${view}')`);
  assert.ok(elements.app.innerHTML.includes('切換至繁體中文')===false);
  assert.ok(elements.app.innerHTML.includes('情境對話'));assert.ok(!elements.app.innerHTML.includes('data-view="hiragana"'));
  assert.ok(!elements.app.innerHTML.includes('undefined'));
}
ev('navigate("bank");state.search="student";render()');
assert.ok(elements.app.innerHTML.includes('學生'));
ev('state.view="write";begin("write",["1-09"]);state.round.b="がくせい";run("toggleLanguage")');
assert.equal(ev('state.round.b'),'がくせい');
assert.equal(ev('state.language'),'en');
assert.ok(elements.app.innerHTML.includes('Check both answers'));
assert.equal(JSON.parse(Object.values(storage)[0]).language,'en');
console.log('PASS: Traditional Chinese prompts, feedback, safe markup translation and persistent language switching without losing answers.');

// The language switch belongs to the logo header, above navigation.
for(const lang of ['en','zh-Hant']){
 ev(`state.language='${lang}';navigate('home')`);
 const html=elements.app.innerHTML;
 assert.equal((html.match(/data-action="toggleLanguage"/g)||[]).length,1);
 assert.ok(html.indexOf('class="brand-header"')<html.indexOf('class="language-switch"'));
 assert.ok(html.indexOf('class="language-switch"')<html.indexOf('<nav'));
 assert.ok(!/data-view="hiragana"|kana-home-banner[^]*A NEW WAY/.test(html));
 assert.ok(!html.includes('Hiragana groups')&&!html.includes('按平假名分類'));
}
ev('navigate("hiragana")');assert.equal(ev('state.view'),'home');
assert.equal(ev('typeof hiraganaView'),'undefined');
console.log('PASS: language selector in logo header; removed Hiragana groups page, navigation and home link.');

// Actual speech has a distinct bubble and speaker label in both languages and modes.
for(const language of ['en','zh-Hant'])for(const kind of ['dialogue-choice','dialogue-tiles']){
  ev(`state.language='${language}';startActivity('${kind}',['likewise'])`);
  assert.ok(elements.app.innerHTML.includes('<blockquote class="dialogue-incoming">'));
  assert.ok(elements.app.innerHTML.includes(language==='en'?'They say':'對方說'));
  assert.ok(!elements.app.innerHTML.includes('dialogue-situation'));
  assert.ok(!elements.app.innerHTML.includes('こちらこそ responds'));
  ev(`startActivity('${kind}',['offer'])`);
  assert.ok(elements.app.innerHTML.includes('class="dialogue-situation"'));
  assert.ok(elements.app.innerHTML.includes(language==='en'?'You give someone a pen.':'你把一枝筆遞給對方。'));
  assert.ok(!elements.app.innerHTML.includes('dialogue-incoming'));
  assert.ok(!elements.app.innerHTML.includes('Use どうぞ when'));
  if(kind==='dialogue-tiles')assert.ok(elements.app.innerHTML.includes(language==='en'?'Use hiragana tiles to spell what you would say.':'用平假名字卡，拼出這個情況下你會說的話。'));
  ev('state.activity.checked=true;render()');
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Use どうぞ when you give someone something.':'把東西遞給對方時，可以說 どうぞ'));
}
console.log('PASS: simple bilingual expression prompts, distinct incoming dialogue, and explanations shown only after answering.');

// Overview has one shared launcher per mode and combined vocabulary progress.
for(const language of ['en','zh-Hant']){
  ev(`state.language='${language}';navigate('home')`);
  const html=elements.app.innerHTML;
  assert.ok(html.includes('class="shell home-view"'));
  assert.ok(html.includes('class="nav overview-nav"'));
  assert.ok(html.indexOf('class="nav overview-nav"')>html.indexOf('class="overview-intro"'));
  assert.ok(html.indexOf('class="nav overview-nav"')<html.indexOf('class="overview-progress"'));
  const nav=html.match(/<nav class="nav overview-nav"[^]*?<\/nav>/)[0];
  assert.deepEqual([...nav.matchAll(/data-view="([^"]+)"/g)].map(match=>match[1]),['matching','dialogue','write-menu','sentences','mock','bank']);
  for(const mode of ['matching','dialogue','write-menu','sentences','mock','bank'])assert.equal((html.match(new RegExp(`data-view="${mode}"`,'g'))||[]).length,1);
  assert.equal((html.match(/class="stat"/g)||[]).length,3);
  assert.ok(!/mock-banner|kana-home-banner|hero-art|class="nav "/.test(html));
  assert.equal(ev('STUDY_MODES.every(mode=>ZH_HANT[mode.label]&&ZH_HANT[mode.copy])'),true);
  assert.ok(html.includes(language==='en'?'Open practice':'進入練習'));
  assert.ok(html.includes(language==='en'?'Your progress':'溫習進度'));
  assert.ok(!html.includes('data-action="goCards"')&&!html.includes('data-action="review"'));
  assert.equal((html.match(/class="nav overview-nav"/g)||[]).length,1);
  ev('navigate("dialogue")');
  assert.ok(!elements.app.innerHTML.includes('class="nav overview-nav"'));
  assert.ok(elements.app.innerHTML.includes('class="nav "'));
}
console.log('PASS: unified Overview launcher, consistent mode order, combined word progress, and no duplicate entry points.');

// Dialogue opens the This/That guide before practice.
for(const language of ['en','zh-Hant']){
 ev(`state.language='${language}';navigate('dialogue')`);
 assert.ok(!elements.app.innerHTML.includes('demonstrative-guide'));
 assert.ok(!elements.app.innerHTML.includes('visual-guide-grid'));
 ev('activityClick({dataset:{openDemonstratives:"guide"}})');
 assert.equal(ev('state.view'),'demonstratives-content');
 assert.ok(elements.app.innerHTML.includes('visual-guide-grid'));
 assert.equal((elements.app.innerHTML.match(/class="guide-pair jp"/g)||[]).length,4);
 assert.ok(elements.app.innerHTML.includes('data-open-demonstratives="practice"'));
 assert.ok(elements.app.innerHTML.includes(language==='en'?'Look at the speaker, listener and book.':'看圖中你、對方和書的位置。'));
 ev('activityClick({dataset:{openDemonstratives:"practice"}})');
 assert.equal(ev('state.view'),'activity');
 assert.equal(ev('state.activity.kind'),'demonstratives');
 assert.equal(ev('state.activity.ids.length'),7);
 assert.ok(elements.app.innerHTML.includes('data-back-view="demonstratives-content"'));
 ev('navigate("demonstratives-content")');
 assert.ok(elements.app.innerHTML.includes('visual-guide-grid'));
 assert.equal(ev('activityNav()'),'dialogue');
}
console.log('PASS: Dialogue menu → illustrated content → seven This/That questions, with guide return path.');

// Re-rendered horizontal navigation retains its scroll offset across subpages.
const querySelector=ctx.document.querySelector;
const menuNav={scrollLeft:0},guideNav={scrollLeft:0},overviewNav={scrollLeft:0};
ctx.document.querySelector=s=>{
  if(s==='.overview-nav')return elements.app.innerHTML.includes('class="shell home-view"')?overviewNav:null;
  if(s==='.sidebar .nav')return elements.app.innerHTML.includes('demonstratives-content')?guideNav:menuNav;
  return querySelector(s);
};
ev('navigate("matching")');menuNav.scrollLeft=245;
ev('activityClick({dataset:{openDemonstratives:"guide"}})');
assert.equal(guideNav.scrollLeft,245);
guideNav.scrollLeft=318;
ev('navigate("matching")');
assert.equal(menuNav.scrollLeft,318);
menuNav.scrollLeft=278;
ev('navigate("home")');
assert.equal(overviewNav.scrollLeft,278);
overviewNav.scrollLeft=301;
ev('navigate("dialogue")');
assert.equal(menuNav.scrollLeft,301);
ctx.document.querySelector=querySelector;
console.log('PASS: horizontal navigation position survives menu, guide, and overview page changes.');

// Writing opens a choice menu; the chosen set survives restarts and missed-item rounds.
for(const language of ['en','zh-Hant']){
  ev(`state.language='${language}';navigate('write-menu')`);
  assert.equal(ev('activityNav()'),'write-menu');
  assert.ok(elements.app.innerHTML.includes('data-write-set="all"'));
  assert.ok(elements.app.innerHTML.includes('data-write-menu="chapter"'));
  assert.ok(elements.app.innerHTML.includes('data-write-menu="category"'));
  assert.ok(!/Part A|Part B|A 部分|B 部分/.test(elements.app.innerHTML));
  ev('state.writeMenu="chapter";render()');
  assert.ok(elements.app.innerHTML.includes('data-write-set="chapter-1"'));
  assert.ok(elements.app.innerHTML.includes('data-write-set="chapter-2"'));
  ev('state.writeMenu="category";render()');
  for(const category of Object.keys(expectedCategoryCounts))assert.ok(elements.app.innerHTML.includes(`data-write-set="category-${category}"`));
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Choose a category.':'選擇詞彙分類。'));
}
ev('startWriteSet("all")');
assert.equal(ev('state.round.ids.length'),96);
ev('navigate("write-menu")');
handlers.click({target:{closest:()=>({disabled:false,dataset:{writeMenu:'chapter'}})}});
assert.equal(ev('state.writeMenu'),'chapter');
handlers.click({target:{closest:()=>({disabled:false,dataset:{writeSet:'chapter-1'}})}});
assert.equal(ev('state.view'),'write');
assert.equal(ev('state.round.ids.length'),43);
for(const [key,count] of [['chapter-1',43],['chapter-2',53],...Object.entries(expectedCategoryCounts).map(([category,count])=>[`category-${category}`,count])]){
  ev(`startWriteSet('${key}')`);
  assert.equal(ev('state.round.ids.length'),count);
  assert.ok(elements.app.innerHTML.includes('data-view="write-menu"'));
  ev('run("restart")');
  assert.equal(ev('state.round.ids.length'),count);
  assert.equal(ev('state.round.ids.every(id=>state.writeSet.ids.includes(id))'),true);
}
ev('startWriteSet("category-places");state.round.missed=[state.round.ids[0]];run("repeatMissed")');
assert.equal(ev('state.round.ids.length'),1);
ev('run("restart")');assert.equal(ev('state.round.ids.length'),2);
ev('state.round.index=state.round.ids.length;render()');
assert.ok(elements.app.innerHTML.includes('data-action="back"')||elements.app.innerHTML.includes('返回上一頁'));
ev('navigate("mock")');
assert.ok(!/Part A|Part B|A 部分|B 部分/.test(elements.app.innerHTML));
console.log('PASS: bilingual Write menu, all/chapter/category sets, retry scope, and removed Part A/B labels.');

// Kanji Match shares the word-set flow and never includes kana-only prompts or choices.
for(const language of ['en','zh-Hant']){
  ev(`state.language='${language}';navigate('matching');activityClick({dataset:{openMatch:'kanji'}})`);
  assert.equal(ev('state.view'),'kanji-menu');
  assert.equal(ev('activityNav()'),'matching');
  assert.ok(elements.app.innerHTML.includes('data-kanji-set="all"'));
  assert.ok(elements.app.innerHTML.includes('data-kanji-menu="chapter"'));
  assert.ok(elements.app.innerHTML.includes('data-kanji-menu="category"'));
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Choose kanji words.':'選擇漢字配對詞彙。'));
  handlers.click({target:{closest:()=>({disabled:false,dataset:{kanjiMenu:'category'}})}});
  assert.ok(!elements.app.innerHTML.includes('data-kanji-set="category-food"'));
  assert.ok(!elements.app.innerHTML.includes('data-kanji-set="category-demonstratives"'));
  for(const category of ev('VOCAB_CATEGORIES.filter(c=>c.ids.some(id=>hasKanji(wordBy(id)))).map(c=>c.id)'))assert.ok(elements.app.innerHTML.includes(`data-kanji-set="category-${category}"`));
  handlers.click({target:{closest:()=>({disabled:false,dataset:{kanjiSet:'all'}})}});
  assert.equal(ev('state.view'),'match');
  assert.equal(ev('state.round.ids.length'),ev('WORDS.filter(hasKanji).length'));
}
for(const key of ['chapter-1','chapter-2',...ev('VOCAB_CATEGORIES.filter(c=>c.ids.some(id=>hasKanji(wordBy(id)))).map(c=>"category-"+c.id)')]){
  ev(`startWordSet('match','${key}')`);
  const count=ev('state.round.ids.length');
  assert.ok(count>0);
  assert.equal(ev('state.round.ids.every(id=>hasKanji(wordBy(id)))'),true);
  assert.equal(ev('state.round.options.every(c=>/\\p{Script=Han}/u.test(c))'),true);
  if(key.startsWith('chapter-'))assert.equal(ev(`state.round.ids.every(id=>wordBy(id).ch===${key.slice(-1)})`),true);
  else assert.equal(ev(`state.round.ids.every(id=>vocabularySection(wordBy(id))==='${key.slice(9)}')`),true);
  assert.ok(elements.app.innerHTML.includes('data-back-view="kanji-menu"'));
  ev('state.round.missed=[state.round.ids[0]];run("repeatMissed")');
  assert.equal(ev('state.round.ids.length'),1);
  ev('run("restart")');assert.equal(ev('state.round.ids.length'),count);
}
ev('state.round.index=state.round.ids.length;render()');
assert.ok(elements.app.innerHTML.includes('data-back-view="kanji-menu"'));
console.log('PASS: Matching → Kanji word sets → all/chapter/category practice; kanji-only contents and preserved retry scope.');

// Every practice mode keeps correct-answer feedback visible until the user presses Next.
const assertManualFeedback=()=>{
  assert.equal([...timers.values()].some(timer=>timer.delay===1000||timer.delay===2000),false);
  assert.ok(!elements.app.innerHTML.includes('data-auto-countdown'));
};
for(const mode of ['match','write','sentences']){
  ev('state.language="en"');
  if(mode==='match')ev('startWordPractice("match",["1-07","1-08"],"Jobs & roles")');
  else if(mode==='write')ev('startWriteWords(["1-09","1-13"],"Jobs & roles")');
  else ev('state.view="sentences";begin("sentences",["p1-1","p1-2"]);render()');
  for(let index=0;index<2;index++){
    if(mode==='match')handlers.click({target:{closest:()=>({disabled:false,dataset:{match:String(ev('state.round.options.indexOf(wordBy(current()).c)'))}})}});
    else if(mode==='write')ev('state.round.b=wordBy(current()).kana;state.round.c=wordBy(current()).c;run("checkWrite")');
    else ev('state.round.chosen=sentenceBy(current()).tokens.map((_,i)=>i);run("checkSentence")');
    assert.equal(ev('state.round.index'),index);assert.equal(ev('state.round.checked'),true);
    assertManualFeedback();assert.ok(elements.app.innerHTML.includes('data-action="next"'));
    ev('run("next")');assert.equal(ev('state.round.index'),index+1);
  }
  assert.ok(elements.app.innerHTML.includes('Round complete'));
}
for(const kind of ['demonstratives','dialogue-choice','dialogue-tiles']){
  ev(`state.language='en';startActivity('${kind}');state.activity.ids=state.activity.ids.slice(0,2);prepareActivity();render()`);
  for(let index=0;index<2;index++){
    if(kind==='dialogue-tiles')ev(`{const a=state.activity;for(const unit of kanaUnits(activityCurrent().kana)){const id=a.tileBank.findIndex((x,i)=>x===unit&&!a.chosen.includes(i));a.chosen.push(id);}checkActivity();}`);
    else ev('checkActivity(activityCurrent().id)');
    assert.equal(ev('state.activity.index'),index);assert.equal(ev('state.activity.checked'),true);
    assertManualFeedback();assert.ok(elements.app.innerHTML.includes('data-action="activityNext"'));
    ev('activityAction("activityNext")');assert.equal(ev('state.activity.index'),index+1);
  }
  assert.ok(elements.app.innerHTML.includes('Round complete'));
}
console.log('PASS: all practice modes wait for manual Next after correct answers, including before final results; no countdown timers.');

// Back retraces the actual subpages and restores the chapter/category selection.
const clickData=dataset=>handlers.click({target:{closest:()=>({disabled:false,dataset})}});
for(const [view,prefix,mode] of [['write-menu','write','write'],['kanji-menu','kanji','match'],['hiragana-menu','hiragana','hiragana-match']]){
  for(const section of ['chapter','category'])for(const complete of [false,true]){
    ev(`pageHistory.length=0;navigate('${view}')`);
    clickData({[`${prefix}Menu`]:section});
    clickData({[`${prefix}Set`]:section==='chapter'?'chapter-1':'category-occupations'});
    assert.equal(ev('state.view'),mode);
    if(complete)ev('state.round.index=state.round.ids.length;render()');
    clickData({action:'back',backView:view});
    assert.equal(ev('state.view'),view);
    assert.equal(ev(`state.${prefix}Menu`),section);
    clickData({action:'back',backView:view});
    assert.equal(ev(`state.${prefix}Menu`),'main');
  }
}
// This/That keeps its Dialogue guide after retries and round completion.
ev(`pageHistory.length=0;navigate('dialogue');activityClick({dataset:{openDemonstratives:'guide'}});activityClick({dataset:{openDemonstratives:'practice'}})`);
ev('state.activity.missed=[state.activity.ids[0]];activityAction("activityMissed");activityAction("activityRestart");state.activity.index=state.activity.ids.length;render()');
assert.equal(ev('activityNav()'),'dialogue');
clickData({action:'back'});assert.equal(ev('state.view'),'demonstratives-content');
clickData({action:'back'});assert.equal(ev('state.view'),'dialogue');
for(const kind of ['dialogue-choice','dialogue-tiles']){
  ev(`pageHistory.length=0;navigate('dialogue');activityClick({dataset:{openDialogue:'${kind}'}})`);
  clickData({action:'back'});assert.equal(ev('state.view'),'dialogue');
}
ev('pageHistory.length=0;resetFilters();navigate("bank");state.filter.group="occupations";state.search="student";writeSelection()');
clickData({action:'back'});
assert.equal(ev('state.view'),'bank');
assert.equal(ev('state.filter.group'),'occupations');
assert.equal(ev('state.search'),'student');
assert.ok(elements.app.innerHTML.includes('data-word-id="1-09"'));
ev('pageHistory.length=0;previousPage("matching")');assert.equal(ev('state.view'),'matching');
console.log('PASS: Back returns to the preceding subpage, including chapter/category menus, activity guides and filtered word references.');

// Hiragana Match has four close spellings, including the requested voicing/long-vowel contrast.
assert.deepEqual(Array.from(ev('hiraganaDistractors("そうじ")')).sort(),['そうし','そおじ','そおし'].sort());
for(const language of ['en','zh-Hant']){
  ev(`state.language='${language}';resetFilters();navigate('matching')`);
  assert.ok(elements.app.innerHTML.includes('data-open-match="hiragana"'));
  ev('activityClick({dataset:{openMatch:"hiragana"}})');
  assert.equal(ev('state.view'),'hiragana-menu');
  assert.equal(ev('activityNav()'),'matching');
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Choose hiragana words.':'選擇平假名配對詞彙。'));
  clickData({hiraganaSet:'all'});
  assert.equal(ev('state.view'),'hiragana-match');
  assert.equal(ev('state.round.ids.length'),96);
  for(let i=0;i<96;i++){
    ev(`state.round.index=${i};prepareQuestion();render()`);
    assert.equal(ev('state.round.options.length'),4);
    assert.equal(ev('new Set(state.round.options).size'),4);
    assert.equal(ev('state.round.options.filter(option=>option===wordBy(current()).kana).length'),1);
    assert.equal(ev('state.round.options.every(option=>/^[ぁ-ゖー～]+$/u.test(option))'),true);
    const prompt=elements.app.innerHTML.match(/<div class="match-prompt[^]*?<\/div>/)[0];
    assert.ok(!prompt.includes(ev('wordBy(current()).kana')),prompt);
    assert.ok(!elements.app.innerHTML.includes('undefined'));
  }
}
for(const key of ['chapter-1','chapter-2',...Object.keys(expectedCategoryCounts).map(id=>'category-'+id)]){
  ev(`startWordSet('hiragana-match','${key}')`);
  const count=ev('state.round.ids.length');assert.ok(count>0);
  if(key.startsWith('chapter-'))assert.equal(ev(`state.round.ids.every(id=>wordBy(id).ch===${key.slice(-1)})`),true);
  else assert.equal(ev(`state.round.ids.every(id=>vocabularySection(wordBy(id))==='${key.slice(9)}')`),true);
  ev('state.round.missed=[state.round.ids[0]];run("repeatMissed")');assert.equal(ev('state.round.ids.length'),1);
  ev('run("restart")');assert.equal(ev('state.round.ids.length'),count);
}
ev('state.language="en";startWordPractice("hiragana-match",["1-09","2-09"],"Spelling practice");begin("hiragana-match",["1-09","2-09"]);render()');
const oldKanjiAttempts=ev('progress.matches["1-09"]?.attempts||0'),oldWriteAttempts=ev('progress.words["1-09"]?.attempts||0');
clickData({match:String(ev('state.round.options.indexOf(wordBy(current()).kana)'))});
assert.equal(ev('state.round.correct'),1);
assert.equal(ev('state.round.checked'),true);
assert.equal(ev('state.round.index'),0);
assert.equal(ev('progress.hiraganaMatches["1-09"].last'),true);
assert.equal(ev('progress.matches["1-09"]?.attempts||0'),oldKanjiAttempts);
assert.equal(ev('progress.words["1-09"]?.attempts||0'),oldWriteAttempts);
assertManualFeedback();
ev('run("next")');
clickData({match:String(ev('state.round.options.findIndex(option=>option!==wordBy(current()).kana)'))});
assert.equal(ev('state.round.correct'),1);
assert.equal(ev('state.round.missed.join(",")'),'2-09');
assert.ok(elements.app.innerHTML.includes('The correct match is ざっし.'));
assert.equal(JSON.parse(Object.values(storage)[0]).progress.hiraganaMatches['2-09'].last,false);
ev('run("next")');assert.ok(elements.app.innerHTML.includes('Round complete'));
ev('run("repeatMissed")');assert.equal(ev('state.round.ids.join(",")'),'2-09');
console.log('PASS: bilingual Hiragana Match, all 96 prompts, four similar choices, independent saved scoring, manual feedback and scoped retries.');

// Dialogue categories lead to a guide, then either game; retries retain that category.
const dialogueCategoryCounts={introductions:5,courtesy:5,replies:4};
assert.equal(ev('new Set(DIALOGUE_CATEGORIES.flatMap(c=>dialogueItems(c.id).map(q=>q.id))).size'),14);
assert.equal(ev('DIALOGUE_CATEGORIES.flatMap(c=>dialogueItems(c.id)).length'),14);
assert.equal(ev('DIALOGUE_CATEGORIES.every(c=>ZH_HANT[c.label]&&ZH_HANT[c.description])'),true);
for(const language of ['en','zh-Hant'])for(const [category,count] of Object.entries(dialogueCategoryCounts)){
  ev(`state.language='${language}';pageHistory.length=0;navigate('dialogue')`);
  assert.equal((elements.app.innerHTML.match(/data-dialogue-category=/g)||[]).length,3);
  assert.ok(!elements.app.innerHTML.includes('data-open-dialogue='));
  clickData({dialogueCategory:category});
  assert.equal(ev('state.view'),'dialogue-content');
  assert.equal(ev('activityNav()'),'dialogue');
  assert.equal((elements.app.innerHTML.match(/data-dialogue-guide=/g)||[]).length,count);
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Expression guide':'說法指南'));
  for(const label of language==='en'?['Choose your answer','Build with hiragana']:['選擇答案','平假名拼寫'])assert.ok(elements.app.innerHTML.includes(label));
  for(const id of ev(`dialogueItems('${category}').map(q=>q.id)`))assert.ok(elements.app.innerHTML.includes(`data-dialogue-guide="${id}"`));
  assert.ok(!elements.app.innerHTML.includes('undefined'));
  for(const kind of ['dialogue-choice','dialogue-tiles']){
    clickData({openDialogue:kind});
    assert.equal(ev('state.view'),'activity');
    assert.equal(ev('state.activity.category'),category);
    assert.equal(ev('state.activity.ids.length'),count);
    for(let index=0;index<count;index++){
      ev(`state.activity.index=${index};prepareActivity();render()`);
      assert.equal(ev(`state.activity.choices.every(q=>vocabularySection(wordBy(q.word))==='${category}')`),true);
      assert.equal(ev('new Set(state.activity.choices.map(q=>q.kana)).size'),ev('state.activity.choices.length'));
      if(kind==='dialogue-tiles'){
        ev(`{const a=state.activity;for(const unit of kanaUnits(activityCurrent().kana)){a.chosen.push(a.tileBank.findIndex((x,i)=>x===unit&&!a.chosen.includes(i)));}checkActivity();}`);
      }else clickData({activityChoice:ev('activityCurrent().id')});
      assert.equal(ev('state.activity.result'),true);
    }
    ev('activityAction("activityNext")');
    assert.ok(elements.app.innerHTML.includes('data-back-view="dialogue-content"'));
    ev('state.activity.missed=[state.activity.ids[0]];activityAction("activityMissed")');
    assert.equal(ev('state.activity.ids.length'),1);
    assert.equal(ev('state.activity.category'),category);
    ev('activityAction("activityRestart")');
    assert.equal(ev('state.activity.ids.length'),count);
    clickData({action:'back'});
    assert.equal(ev('state.view'),'dialogue-content');
    assert.equal(ev('state.dialogueCategory'),category);
  }
  clickData({action:'back'});assert.equal(ev('state.view'),'dialogue');
}
console.log('PASS: bilingual Dialogue categories → category guide → choice/hiragana game, all 14 scenes, category-only choices, scoped retries and guide return paths.');

// Matching has only two word modes; This/That belongs to Dialogue in both languages.
for(const language of ['en','zh-Hant']){
  ev(`state.language='${language}';navigate('matching')`);
  assert.deepEqual([...elements.app.innerHTML.matchAll(/data-open-match="([^"]+)"/g)].map(m=>m[1]),['kanji','hiragana']);
  assert.ok(!elements.app.innerHTML.includes('data-open-demonstratives'));
  assert.equal(ev('typeof questionWordsContent'),'undefined');
  ev('activityClick({dataset:{openMatch:"wh"}})');assert.equal(ev('state.view'),'matching');
  ev('startActivity("wh")');assert.equal(ev('state.view'),'matching');
  ev('navigate("dialogue")');
  assert.ok(elements.app.innerHTML.includes('data-open-demonstratives="guide"'));
  ev('activityClick({dataset:{openDemonstratives:"guide"}})');
  assert.equal(ev('activityNav()'),'dialogue');
  assert.ok(elements.app.innerHTML.includes('data-back-view="dialogue"'));
  ev('activityClick({dataset:{openDemonstratives:"practice"}})');
  assert.equal(ev('activityNav()'),'dialogue');
  assert.equal(ev('state.activity.ids.length'),7);
}
console.log('PASS: Question Words removed, Matching has two modes, This/That guide and game highlight Dialogue.');
