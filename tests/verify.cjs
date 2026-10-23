const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements={app:{innerHTML:''},toast:{style:{},textContent:''}};
const handlers={};let storage={'kotoba-ch12-v1':JSON.stringify({language:'en'})};
const ctx=vm.createContext({console,Date,Math,JSON,Number,String,Array,Object,Set,RegExp,module:{exports:{}},document:{querySelector:s=>s==='#app'?elements.app:s==='#toast'?elements.toast:null,querySelectorAll:()=>[],addEventListener:(e,f)=>handlers[e]=f},window:{scrollTo:()=>{}},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},setInterval:()=>{},setTimeout:()=>{},clearTimeout:()=>{}});
vm.runInContext(fs.readFileSync('dist/content.js','utf8')+'\n'+fs.readFileSync('dist/hiragana.js','utf8')+'\n'+fs.readFileSync('dist/activities.js','utf8')+'\n'+fs.readFileSync('dist/i18n.js','utf8')+'\n'+fs.readFileSync('dist/app.js','utf8'),ctx);
const ev=s=>vm.runInContext(s,ctx);
assert.equal(ev('WORDS.length'),96);
assert.equal(ev('SENTENCES.length'),50);
assert.equal(ev('PATTERNS.length'),16);
assert.equal(ev('new Set(WORDS.map(x=>x.id)).size'),96);
assert.equal(ev('new Set(SENTENCES.map(x=>x.id)).size'),50);
assert.equal(ev('WORDS.filter(w=>w.group==="core").length'),62);
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
for(const view of ['home','cards','write','matching','dialogue','match','sentences','bank','mock']){ev(`navigate('${view}')`);assert.ok(elements.app.innerHTML.length>1000,view);assert.ok(!elements.app.innerHTML.includes('undefined'),view);}
ev('navigate("cards");begin("cards",["1-09"]);run("flip")');assert.ok(elements.app.innerHTML.includes('KANJI'));ev('run("got")');assert.equal(ev('state.round.index'),1);
ev('navigate("write");state.round.b=wordBy(current()).kana;state.round.c=wordBy(current()).c;run("checkWrite")');assert.equal(ev('state.round.result.score'),1);assert.ok(elements.app.innerHTML.includes('1 / 1 mark'));
ev('run("next");state.round.b="";state.round.c="";run("checkWrite")');assert.equal(ev('state.round.result.score'),0);assert.equal(ev('state.round.missed.length'),1);
ev('run("repeatMissed")');assert.equal(ev('state.round.ids.length'),1);
ev('navigate("sentences");state.round.chosen=sentenceBy(current()).tokens.map((_,i)=>i);run("checkSentence")');assert.equal(ev('state.round.result'),true);assert.equal(ev('state.round.correct'),1);
ev('run("next");run("hint");state.round.chosen=sentenceBy(current()).tokens.map((_,i)=>i);run("checkSentence")');assert.equal(ev('state.round.result'),true);assert.equal(ev('state.round.correct'),1);assert.equal(ev('state.round.missed.length'),1);
ev('navigate("match")');assert.equal(ev('new Set(state.round.options).size'),4);assert.equal(ev('state.round.options.includes(wordBy(current()).c)'),true);
// Exercise every item’s renderer and distractor generation.
for(const mode of ['cards','write','match','sentences']){
ev(`resetFilters();state.view='${mode}';begin('${mode}');for(let i=0;i<state.round.ids.length;i++){state.round.index=i;prepareQuestion();render();if('${mode}'==='cards'){state.round.revealed=true;render();}if('${mode}'==='match'&&new Set(state.round.options).size!==4)throw Error('Bad distractors');}`);
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
assert.equal(ev('pool("cards").length'),1);
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
ev('state.view="cards";begin("cards",["1-01"]);run("flip")');
assert.ok(!elements.app.innerHTML.includes('answer-c '));
assert.ok(!elements.app.innerHTML.includes('no kanji'));
ev('state.view="cards";begin("cards",["1-09"]);run("flip")');
assert.ok(elements.app.innerHTML.includes('answer-c jp'));
ev('resetFilters()');


// Matching categories and dialogue modes stay separate from the quiz bank.
assert.equal(ev('matchingItems("wh").length'),5);
assert.equal(ev('matchingItems("demonstratives").length'),7);
assert.equal(ev('matchingItems("wh").filter(x=>x.added).length'),0);
assert.equal(ev('dialogueItems("quiz").some(x=>x.added)'),false);
assert.equal(ev('dialogueItems().length'),14);
assert.equal(ev('WORDS.some(w=>["なんじ","いくら","はじめましょう"].includes(w.kana))'),false);
assert.equal(ev('kanaUnits("きょうし").join(",")'),'きょ,う,し');
assert.equal(ev('kanaUnits("えっ").join(",")'),'え,っ');
for(const kind of ['wh','demonstratives','dialogue-choice','dialogue-tiles']){
  ev(`startActivity('${kind}')`);
  assert.ok(elements.app.innerHTML.includes('Back to menu'));
  const count=ev('state.activity.ids.length');
  for(let i=0;i<count;i++){
    ev(`state.activity.index=${i};prepareActivity();render()`);
    assert.equal(ev('new Set(state.activity.choices.map(x=>x.kana)).size'),4);
    if(kind.startsWith('dialogue'))assert.equal(ev('state.activity.choices.filter(x=>x.family===activityCurrent().family).length'),1);
    if(kind==='dialogue-tiles'){
      ev(`{const a=state.activity;for(const unit of kanaUnits(activityCurrent().kana)){const id=a.tileBank.findIndex((x,i)=>x===unit&&!a.chosen.includes(i));if(id<0)throw Error('Missing tile');a.chosen.push(id);}checkActivity();}`);
      assert.equal(ev('activityAnswer()'),ev('activityCurrent().kana'));
    }else ev('checkActivity(activityCurrent().id)');
    assert.equal(ev('state.activity.result'),true,kind+' correct answer');
    assert.ok(!elements.app.innerHTML.includes('undefined'));
  }
  assert.equal(ev('state.activity.correct'),count);
  ev('activityAction("activityNext")');assert.ok(elements.app.innerHTML.includes('Round complete.'));
}
ev('startActivity("wh");checkActivity(state.activity.choices.find(x=>x.id!==activityCurrent().id).id)');
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
ev('navigate("matching")');assert.ok(elements.app.innerHTML.includes('Question words'));
ev('navigate("dialogue")');assert.ok(elements.app.innerHTML.includes('Build with hiragana'));
ev('startMock()');assert.equal(ev('mock.a.every(q=>!!wordBy(q.id))'),true);
ev('mock.done=true;resetFilters()');


// Every activity answer must now come from the syllabus bank.
assert.equal(ev('[...matchingItems("wh"),...matchingItems("demonstratives"),...dialogueItems()].every(q=>WORDS.some(w=>w.kana===q.kana))'),true);
assert.equal(ev('[...matchingItems("wh"),...matchingItems("demonstratives"),...dialogueItems()].some(q=>["なんじ","いくら","はじめましょう"].includes(q.kana))'),false);
for(const [id,location] of [['2-01','speaker'],['2-04','speaker'],['2-02','listener'],['2-05','listener'],['2-03','far'],['2-06','far'],['2-c1','attention']]){
  ev(`{const q=matchingItems('demonstratives').find(x=>x.word==='${id}');if(demonstrativeLocation(q)!=='${location}')throw Error('Wrong graphic location');}`);
  const html=ev(`demonstrativeQuestion(matchingItems('demonstratives').find(x=>x.word==='${id}'))`);
  assert.ok(html.includes('<svg'));assert.ok(html.includes('role="img"'));assert.ok(!html.includes('undefined'));
  if(location==='attention')assert.ok(!html.includes('scene-book'));else assert.ok(html.includes('scene-book'));
  assert.ok(html.includes('_____'));
}
ev('navigate("dialogue")');assert.ok(!elements.app.innerHTML.includes('data-dialogue-scope'));

console.log('PASS: source coverage, strict spelling, 0/0.5/1 scoring, all 50 puzzles, 16 groups, shuffled duplicate tiles, every card renderer, missed-item practice, hints, 15-minute mock, balanced chapter sampling, 20-point grading and persisted state.');

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
assert.equal(ev('matchingItems("wh").concat(matchingItems("demonstratives")).every(q=>ZH_HANT[q.why])'),true);
assert.equal(ev('localizeMarkup(`<input value="English &amp; これ" data-answer="b" placeholder="Type hiragana"><span lang="ja">よろしくおねがいします</span>`)'),'<input value="English &amp; これ" data-answer="b" placeholder="輸入平假名"><span lang="ja">よろしくおねがいします</span>');
for(const view of ['home','cards','write','matching','dialogue','sentences','bank','mock']){
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
