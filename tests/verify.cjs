const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements={app:{innerHTML:''},toast:{style:{},textContent:''}};
const handlers={};let storage={'kotoba-ch12-v1':JSON.stringify({language:'en'})};
const timers=new Map();let timerId=0;
const ctx=vm.createContext({console,Date,Math,JSON,Number,String,Array,Object,Set,RegExp,module:{exports:{}},document:{querySelector:s=>s==='#app'?elements.app:s==='#toast'?elements.toast:null,querySelectorAll:()=>[],addEventListener:(e,f)=>handlers[e]=f},window:{scrollTo:()=>{}},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},setInterval:()=>{},setTimeout:(fn,delay)=>{const id=++timerId;timers.set(id,{fn,delay});return id;},clearTimeout:id=>timers.delete(id)});
const scriptNames=[...fs.readFileSync('dist/index.html','utf8').matchAll(/<script defer src="([^"]+)"/g)].map(m=>m[1]).filter(s=>s!=='pwa.js');
vm.runInContext(scriptNames.map(s=>fs.readFileSync('dist/'+s,'utf8')).join('\n'),ctx);
const ev=s=>vm.runInContext(s,ctx);
assert.equal(ev('WORDS.length'),338);
assert.equal(ev('SENTENCES.length'),50);
assert.equal(ev('PATTERNS.length'),16);
assert.equal(ev('new Set(WORDS.map(x=>x.id)).size'),338);
assert.equal(ev('new Set(SENTENCES.map(x=>x.id)).size'),50);
assert.equal(ev('WORDS.filter(w=>w.group==="core"&&wordGameReady(w)).length'),151);
// All syllabus forms belong to one meaningful category, independently of their printed source group.
const expectedCategoryCounts=Object.fromEntries(ev('VOCAB_CATEGORIES.map(c=>[c.id,WORDS.filter(w=>vocabularySection(w)===c.id).length])'));
const expectedVocabularyCategoryCounts=Object.fromEntries(ev('VOCABULARY_CATEGORIES.map(c=>[c.id,VOCABULARY_WORDS.filter(w=>wordGameReady(w)&&vocabularySection(w)===c.id).length])'));
const libraryCount=ev('VOCABULARY_WORDS.length'),practiceCount=ev('VOCABULARY_WORDS.filter(wordGameReady).length'),categoryCount=ev('VOCAB_CATEGORIES.length');
assert.equal(ev('DIALOGUE_WORD_IDS.size'),25);
assert.deepEqual(Array.from(ev('WORDS.filter(w=>DIALOGUE_WORD_IDS.has(w.id)&&!["introductions","replies"].includes(vocabularySection(w))).map(w=>w.id)')).sort(),['1-17a','1-17b','1-19a','1-19b','1-c4','2-01','2-02','2-03','2-04','2-05','2-06','2-36','2-c1','2-c3','2-c4c','2-c4d'].sort());
assert.equal(ev('VOCABULARY_WORDS.every(w=>!DIALOGUE_WORD_IDS.has(w.id))'),true);
assert.equal(ev('VOCAB_CATEGORIES.length'),21);
assert.equal(ev('new Set(VOCAB_CATEGORIES.map(c=>c.id)).size'),21);
assert.equal(ev('VOCAB_CATEGORY_BY_WORD.size'),338);
assert.equal(ev('VOCAB_CATEGORIES.flatMap(c=>c.ids).length'),338);
assert.equal(ev('VOCAB_CATEGORIES.every(c=>c.ids.every(id=>!!wordBy(id)))'),true);
assert.equal(ev('WORDS.every(w=>!!vocabularySection(w))'),true);
assert.equal(ev('VOCAB_CATEGORIES.every(c=>ZH_HANT[c.label]&&ZH_HANT[c.description])'),true);
for(const [section,count] of Object.entries(expectedCategoryCounts)){
  ev(`state.filter.group='${section}'`);
  assert.equal(ev('pool("bank").length'),count);
  assert.equal(ev('pool("write").length'),expectedVocabularyCategoryCounts[section]||0);
  assert.equal(ev(`pool('write').every(w=>vocabularySection(w)==='${section}')`),true);
}
for(const [id,category] of [['1-04','people'],['1-09','occupations'],['1-06','nationality'],['1-18','questions'],['1-19b','questions'],['2-35','languages'],['2-06','demonstratives'],['2-c1','courtesy'],['2-30','food'],['2-31','food'],['2-22','objects'],['2-37','replies'],['2-c6','replies']])assert.equal(ev(`vocabularySection(wordBy('${id}'))`),category);
ev('resetFilters();navigate("bank")');
assert.equal((elements.app.innerHTML.match(/data-word-category=/g)||[]).length,categoryCount);
const bankIds=[...elements.app.innerHTML.matchAll(/data-word-id="([^"]+)"/g)].map(match=>match[1]);
assert.equal(bankIds.length,338);assert.equal(new Set(bankIds).size,338);
assert.ok(!elements.app.innerHTML.includes('Other main vocabulary'));
ev('state.search="coffee";render()');
assert.ok(elements.app.innerHTML.includes('data-word-category="food"'));
assert.ok(!elements.app.innerHTML.includes('data-word-category="objects"'));
assert.equal((elements.app.innerHTML.match(/data-word-id=/g)||[]).length,1);
ev('state.search="";state.filter.group="replies";state.filter.ch="2";render()');
assert.equal(ev('pool("bank").length'),5);
assert.equal((elements.app.innerHTML.match(/data-word-category=/g)||[]).length,1);
ev('resetFilters()');
ev('state.language="zh-Hant";render()');
for(const label of ['人物與稱呼','國家與國籍','疑問詞與年齡','食物與飲品','語言','回答與反應'])assert.ok(elements.app.innerHTML.includes(label));
assert.ok(!elements.app.innerHTML.includes('其他主要詞彙'));
ev('state.language="en";render()');
assert.equal(ev('WORDS.filter(w=>w.ch===1&&wordGameReady(w)).length'),43);
assert.equal(ev('WORDS.filter(w=>w.ch===2&&wordGameReady(w)).length'),53);
assert.equal(ev('WORDS.filter(wordGameReady).every(w=>/^[ぁ-ゖー～]+$/.test(w.kana))'),true);
assert.equal(ev('WORDS.filter(wordGameReady).every(w=>gradeWord(w,w.kana,w.c).score===1)'),true);
assert.equal(ev('WORDS.filter(wordGameReady).every(w=>gradeWord(w,"",w.c).score===.5)'),true);
assert.equal(ev('WORDS.filter(wordGameReady).every(w=>gradeWord(w,w.kana,"").score===.5)'),true);
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
for(const view of ['home','write-menu','write','vocabulary-menu','dialogue','vocabulary-rebuild','sentences','bank','mock']){ev(`navigate('${view}')`);assert.ok(elements.app.innerHTML.length>1000,view);assert.ok(!elements.app.innerHTML.includes('undefined'),view);}
ev('navigate("cards")');assert.equal(ev('state.view'),'vocabulary-menu');
assert.equal(ev('views.some(([view])=>view==="cards")'),false);
ev('navigate("write");state.round.b=wordBy(current()).kana;state.round.c=wordBy(current()).c;run("checkWrite")');assert.equal(ev('state.round.result.score'),1);assert.ok(elements.app.innerHTML.includes('1 / 1 mark'));
ev('run("next");state.round.ids[state.round.index]="1-09";prepareQuestion();state.round.b="";state.round.c="";run("checkWrite")');assert.equal(ev('state.round.result.score'),0);assert.equal(ev('state.round.missed.length'),1);
ev('run("repeatMissed")');assert.equal(ev('state.round.ids.length'),1);
ev('navigate("sentences");state.round.chosen=sentenceBy(current()).tokens.map((_,i)=>i);run("checkSentence")');assert.equal(ev('state.round.result'),true);assert.equal(ev('state.round.correct'),1);
ev('run("next");run("hint");state.round.chosen=sentenceBy(current()).tokens.map((_,i)=>i);run("checkSentence")');assert.equal(ev('state.round.result'),true);assert.equal(ev('state.round.correct'),1);assert.equal(ev('state.round.missed.length'),1);
// Exercise every item’s renderer and distractor generation.
for(const mode of ['write','vocabulary-rebuild','sentences']){
ev(`resetFilters();state.view='${mode}';begin('${mode}');for(let i=0;i<state.round.ids.length;i++){state.round.index=i;prepareQuestion();render();}`);
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
assert.equal(ev('WORDS.filter(wordGameReady).every(w=>HIRAGANA_KEYS.some(([k])=>k===hiraganaInitial(w)))'),true);
assert.equal(ev('hiraganaInitial({jp:"コーヒー"})'),'こ');
assert.equal(ev('hiraganaInitial({kana:"～からきました"})'),'か');
ev('resetFilters();state.filter.kana="が"');
assert.equal(ev('pool("write").length'),2);
assert.equal(ev('pool("sentences").length'),50);
ev('resetFilters()');

assert.equal(ev('WORDS.some(w=>/^1-r1[1-7]$/.test(w.id))'),false);
assert.equal(ev('/ミラー|サントス|ワン|カリナ|グプタ|テレーザ|IMC|AKC|神戸|富士|さくら大学/.test(JSON.stringify({WORDS:WORDS.filter(w=>w.ch<=2&&wordGameReady(w)),SENTENCES}))'),false);

ev('navigate("bank")');
assert.ok(!elements.app.innerHTML.includes('data-view="cards"'));
assert.ok(!elements.app.innerHTML.includes('data-action="goCards"'));
assert.ok(elements.app.innerHTML.includes('data-action="writeSelection"'));
ev('state.language="zh-Hant";render()');
assert.ok(elements.app.innerHTML.includes('回想詞彙練習的詞語'));
assert.ok(!elements.app.innerHTML.includes('記憶卡'));
ev('state.language="en";render()');
ev('state.search="student";writeSelection()');
assert.equal(ev('state.view'),'write');
assert.equal(ev('state.round.ids.join(",")'),'1-09');
assert.ok(elements.app.innerHTML.includes('C · KANJI / X'));
ev('resetFilters()');


// Matching categories and dialogue modes stay separate from the quiz bank.
assert.equal(ev('demonstrativeItems().length'),5);
assert.equal(ev('dialogueItems("quiz").some(x=>x.added)'),false);
assert.equal(ev('dialogueItems().length'),43);
assert.equal(ev('WORDS.some(w=>["はじめましょう"].includes(w.kana))'),false);
assert.equal(ev('kanaUnits("きょうし").join(",")'),'きょ,う,し');
assert.equal(ev('kanaUnits("えっ").join(",")'),'え,っ');
for(const kind of ['demonstratives','dialogue-choice','dialogue-tiles','wh-tiles']){
  ev(`startActivity('${kind}')`);
  assert.equal(elements.app.innerHTML.includes('class="breadcrumbs"'),!ev('isGamePage()'));
  const count=ev('state.activity.ids.length');
  for(let i=0;i<count;i++){
    ev(`state.activity.index=${i};prepareActivity();render()`);
    assert.equal(ev('new Set(state.activity.choices.map(x=>x.kana)).size===state.activity.choices.length&&state.activity.choices.length>=2&&state.activity.choices.length<=4'),true);
    assert.equal(ev(`state.activity.choices.every(item=>vocabularySection(wordBy(item.word))===vocabularySection(wordBy(activityCurrent().word))||[item.word,activityCurrent().word].sort().join(',')==='2-06,2-c1')`),true);
    if(kind.startsWith('dialogue'))assert.equal(ev('state.activity.choices.filter(x=>x.family===activityCurrent().family).length'),1);
    if(['dialogue-tiles','wh-tiles'].includes(kind)){
      assert.equal(ev('kanaUnits(vocabularyReading(activityCurrent())).every(unit=>state.activity.tileBank.filter(x=>x===unit).length>=kanaUnits(vocabularyReading(activityCurrent())).filter(x=>x===unit).length)'),true);
      assert.equal(ev('state.activity.tileBank.some(unit=>!kanaUnits(vocabularyReading(activityCurrent())).includes(unit))'),true);
      ev(`{const a=state.activity;for(const unit of kanaUnits(vocabularyReading(activityCurrent()))){const id=a.tileBank.findIndex((x,i)=>x===unit&&!a.chosen.includes(i));if(id<0)throw Error('Missing tile');a.chosen.push(id);}checkActivity();}`);
      assert.equal(ev('activityAnswer()'),ev('vocabularyReading(activityCurrent())'));
    }else ev('checkActivity(activityCurrent().id)');
    assert.equal(ev('state.activity.result'),true,kind+' correct answer');
    assert.ok(!elements.app.innerHTML.includes('undefined'));
  }
  assert.equal(ev('state.activity.correct'),count);
  ev('activityAction("activityNext")');assert.ok(elements.app.innerHTML.includes('Round complete.'));
  assert.ok(elements.app.innerHTML.lastIndexOf('data-action="activityBack"')>elements.app.innerHTML.indexOf('data-action="activityRestart"'));
  ev('activityAction("activityBack")');assert.equal(ev('state.view'),'dialogue');
  assert.equal(ev('state.dialogueCategory'),kind.startsWith('dialogue')?'introductions':'wh-words');
  assert.ok(elements.app.innerHTML.includes('data-dialogue-category'));
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
ev(`{const a=state.activity;for(const unit of kanaUnits(vocabularyReading(activityCurrent()))){const id=a.tileBank.findIndex((x,i)=>x===unit&&!a.chosen.includes(i));activityClick({dataset:{activityTile:String(id)}});}activityAction('activityCheck');}`);
assert.equal(ev('state.activity.result'),true);
ev('navigate("vocabulary-menu")');assert.ok(!elements.app.innerHTML.includes('Question words'));
ev('navigate("dialogue")');assert.ok(elements.app.innerHTML.includes('data-dialogue-category'));
ev('startMock()');assert.equal(ev('mock.a.every(q=>!!wordBy(q.id))'),true);
ev('mock.done=true;resetFilters()');


// Every activity answer must now come from the syllabus bank.
assert.equal(ev('[...demonstrativeItems(),...dialogueItems()].every(q=>q.lesson?q.turns.some(t=>t[1].includes(q.kana)):WORDS.some(w=>w.kana===q.kana))'),true);
assert.equal(ev('[...demonstrativeItems(),...dialogueItems()].some(q=>["はじめましょう"].includes(q.kana))'),false);
assert.equal(ev('demonstrativeItems().every(q=>vocabularySection(wordBy(q.word))==="questions"&&q.word!=="1-18")'),true);
for(const id of ['1-17a','1-17b','1-19a','1-19b','2-36']){
  const html=ev(`demonstrativeQuestion(demonstrativeItems().find(x=>x.word==='${id}'))`);
  assert.ok(html.includes('<svg'));assert.ok(html.includes('role="img"'));assert.ok(!html.includes('undefined'));
  assert.ok(html.includes('_____'));
}
ev('navigate("dialogue")');assert.ok(!elements.app.innerHTML.includes('data-dialogue-scope'));

console.log('PASS: source coverage, strict spelling, 0/0.5/1 scoring, all 50 puzzles, 16 groups, shuffled duplicate tiles, word practice modes, missed-item practice, hints, 15-minute mock, balanced chapter sampling, 20-point grading and persisted state.');

// Expression prompts show the incoming line without translating the answer.
for(const kind of ['dialogue-choice','dialogue-tiles']){
  ev(`startActivity('${kind}',['likewise'])`);
  assert.ok(elements.app.innerHTML.includes('<p class="jp" lang="ja">よろしくおねがいします。</p>'));
  assert.ok(!/LINE TO SAY|The pleasure is mine|Someone has finished an introduction|highlighted/.test(elements.app.innerHTML));
  ev(`startActivity('${kind}',['meet'])`);
  assert.ok(elements.app.innerHTML.includes('Meeting someone for the first time.'));
  assert.ok(!/LINE TO SAY/.test(elements.app.innerHTML));
}

// Language switching preserves an in-progress answer and persists the preference.
ev('startActivity("dialogue-tiles",["likewise"]);state.activity.chosen=[0];run("toggleLanguage")');
assert.equal(ev('state.language'),'zh-Hant');
assert.equal(ev('state.activity.chosen.length'),1);
assert.equal(JSON.parse(Object.values(storage)[0]).language,'zh-Hant');
assert.ok(!elements.app.innerHTML.includes('你會怎樣說？'));
assert.ok(elements.app.innerHTML.includes('<p class="jp" lang="ja">よろしくおねがいします。</p>'));
assert.ok(!/LINE TO SAY|The pleasure is mine/.test(elements.app.innerHTML));
assert.equal(ev('DIALOGUES.every(d=>(!d.scene||ZH_HANT[d.scene])&&ZH_HANT[d.why])'),true);
assert.equal(ev('SENTENCES.every(s=>ZH_HANT[s.prompt])'),true);
assert.equal(ev('PATTERNS.every(p=>ZH_HANT[p.title]&&ZH_HANT[p.tip])'),true);
assert.equal(ev('demonstrativeItems().every(q=>ZH_HANT[q.why])'),true);
assert.equal(ev('localizeMarkup(`<input value="English &amp; これ" data-answer="b" placeholder="Type hiragana"><span lang="ja">よろしくおねがいします</span>`)'),'<input value="English &amp; これ" data-answer="b" placeholder="輸入平假名"><span lang="ja">よろしくおねがいします</span>');
for(const view of ['home','write-menu','write','vocabulary-menu','dialogue','sentences','bank','mock']){
  ev(`mock=null;resetFilters();navigate('${view}')`);
  assert.ok(elements.app.innerHTML.includes('切換至繁體中文')===false);
  if(view==='home')assert.ok(elements.app.innerHTML.includes('情境對話'));assert.ok(!elements.app.innerHTML.includes('data-view="hiragana"'));
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

// The language switch follows the breadcrumb navigation.
for(const lang of ['en','zh-Hant']){
 ev(`state.language='${lang}';navigate('home')`);
 const html=elements.app.innerHTML;
 assert.equal((html.match(/data-action="toggleLanguage"/g)||[]).length,1);
 assert.ok(html.indexOf('class="brand-header"')<html.indexOf('class="language-switch"'));
 assert.ok(html.indexOf('class="language-switch"')>html.indexOf('</nav>'));
 assert.ok(!/data-view="hiragana"|kana-home-banner[^]*A NEW WAY/.test(html));
 assert.ok(!html.includes('Hiragana groups')&&!html.includes('按平假名分類'));
}
ev('navigate("hiragana")');assert.equal(ev('state.view'),'home');
assert.equal(ev('typeof hiraganaView'),'undefined');
console.log('PASS: language selector in logo header; removed Hiragana groups page, navigation and home link.');

// Exercise conversations show the opening line while hiding reply feedback until grading.
for(const language of ['en','zh-Hant'])for(const kind of ['dialogue-choice','dialogue-tiles']){
  ev(`state.language='${language}';startActivity('${kind}',['likewise'])`);
  assert.ok(elements.app.innerHTML.includes('class="conversation-turn listener"'));
  assert.ok(elements.app.innerHTML.includes('class="conversation-turn you"'));
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Listener':'聽話者'));
  assert.ok(!elements.app.innerHTML.includes('reply-feedback'));
  assert.ok(!elements.app.innerHTML.includes('The pleasure is mine'));
  ev(`startActivity('${kind}',['offer'])`);
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Offer something to someone':'向某人提供某物'));
  assert.ok(elements.app.innerHTML.includes('Thank you.')||elements.app.innerHTML.includes('謝謝。'));
  assert.ok(!elements.app.innerHTML.includes('Use どうぞ when'));
  assert.ok(!elements.app.innerHTML.includes(language==='en'?'please / here you are':'請（讓別人做某事時）'));
  assert.ok(!elements.app.innerHTML.includes('expression-figure'));
  if(kind==='dialogue-tiles')ev('{const a=state.activity;for(const unit of kanaUnits(vocabularyReading(activityCurrent()))){const i=a.tileBank.findIndex((text,index)=>text===unit&&!a.chosen.includes(index));a.chosen.push(i);}checkActivity();}');
  else ev('checkActivity(activityCurrent().id)');
  assert.ok(elements.app.innerHTML.includes('reply-feedback correct'));
  if(kind==='dialogue-choice'&&language==='zh-Hant')assert.ok(elements.app.innerHTML.includes('✓</span> 正確'));
  assert.ok(elements.app.innerHTML.includes(language==='en'?'please / here you are':'請（讓別人做某事時）'));
  const explanation=language==='en'?'Use どうぞ when you give someone something.':'把東西遞給對方時，可以說 どうぞ';
  const html=elements.app.innerHTML;
  assert.ok(html.includes(`<p class="activity-explanation">${explanation}`));
  assert.ok(html.indexOf(explanation) < html.indexOf('data-action="activityNext"'));
}
console.log('PASS: bilingual exercise conversations hide reply feedback until grading.');

for(const language of ['en','zh-Hant']){
  ev(`state.language='${language}';openDialogueCategory('introductions');selectDialogueExpression('neighbour')`);
  const description=language==='en'?'Greeting your colleagues for the first time.':'初次向同事打招呼。';
  const speaker=language==='en'?'Colleague':'同事';
  assert.ok(elements.app.innerHTML.includes(description.slice(0,-1)+'</button>'));
  assert.ok(elements.app.innerHTML.includes(`<span class="dialogue-role">${speaker}</span>`));
  assert.ok(!elements.app.innerHTML.match(/<article[^]*?<\/article>/)[0].includes(description));
  for(const kind of ['dialogue-choice','dialogue-tiles']){
    ev(`startActivity('${kind}',['neighbour'],'introductions')`);
    assert.ok(elements.app.innerHTML.includes(`<p class="exercise-situation">${description}</p>`));
    assert.ok(elements.app.innerHTML.includes(`<span class="dialogue-role">${speaker}</span>`));
    assert.ok(!elements.app.innerHTML.includes('new neighbour'));
  }
}
assert.equal(ev('CONVERSATIONS.neighbour[0]'),ev('DIALOGUES.find(q=>q.id==="neighbour").scene'));
assert.equal(ev('wordBy("2-d1").kana'),'これからおせわになります');
console.log('PASS: colleague context is shared by the guide and both exercises without changing the Japanese answer.');

// Overview has one shared launcher per mode and combined vocabulary progress.
for(const language of ['en','zh-Hant']){
  ev(`state.language='${language}';navigate('home')`);
  const html=elements.app.innerHTML;
  assert.ok(html.includes('class="shell home-view"'));
  assert.ok(html.includes('class="nav overview-nav"'));
  assert.ok(html.indexOf('class="nav overview-nav"')>html.indexOf('class="overview-intro"'));
  assert.ok(html.indexOf('class="nav overview-nav"')<html.indexOf('class="overview-progress"'));
  const nav=html.match(/<nav class="nav overview-nav"[^]*?<\/nav>/)[0];
  assert.deepEqual([...nav.matchAll(/data-view="([^"]+)"/g)].map(match=>match[1]),['number-menu','dialogue','vocabulary-menu','sentences','handwriting-menu','mock','bank']);
  for(const mode of ['number-menu','dialogue','vocabulary-menu','sentences','handwriting-menu','mock','bank'])assert.equal((nav.match(new RegExp(`data-view="${mode}"`,'g'))||[]).length,1);
  const drawer=html.match(/<nav class="nav drawer-nav"[^]*?<\/nav>/)[0];
  assert.deepEqual([...drawer.matchAll(/data-view="([^"]+)"/g)].map(match=>match[1]),['home','number-menu','dialogue','vocabulary-menu','sentences','handwriting-menu','mock','bank']);
  assert.equal((html.match(/class="stat"/g)||[]).length,3);
  assert.ok(!/mock-banner|kana-home-banner|hero-art|class="nav "/.test(html));
  assert.equal(ev('STUDY_MODES.every(mode=>ZH_HANT[mode.label]&&ZH_HANT[mode.copy])'),true);
  assert.ok(!html.includes(language==='en'?'Open practice':'進入練習'));
  assert.equal((nav.match(/class="card-arrow"/g)||[]).length,7);
  assert.ok(html.includes(language==='en'?'Your progress':'溫習進度'));
  assert.ok(!html.includes('data-action="goCards"')&&!html.includes('data-action="review"'));
  assert.equal((html.match(/class="nav overview-nav"/g)||[]).length,1);
  ev('navigate("dialogue")');
  assert.ok(!elements.app.innerHTML.includes('class="nav overview-nav"'));
  assert.ok(!elements.app.innerHTML.includes('class="nav "'));
}
console.log('PASS: unified Overview launcher, consistent mode order, combined word progress, and persistent Material navigation.');

// Dialogue opens the This/That guide before practice.
for(const language of ['en','zh-Hant']){
 ev(`state.language='${language}';navigate('dialogue')`);
 assert.ok(!elements.app.innerHTML.includes('demonstrative-guide'));
 assert.ok(elements.app.innerHTML.includes('guide-cards'));
 ev('activityClick({dataset:{dialogueCategory:"wh-words"}})');
 assert.equal(ev('state.view'),'demonstratives-content');
 assert.ok(elements.app.innerHTML.includes('guide-cards'));
 assert.equal((elements.app.innerHTML.match(/data-dialogue-expression=/g)||[]).length,ev('dialogueStudySet().items.length'));
 assert.ok(elements.app.innerHTML.includes('data-open-dialogue="dialogue-choice"'));
 assert.ok(elements.app.innerHTML.includes(language==='en'?'WH-words guide':'疑問詞指南'));
 ev('activityClick({dataset:{openDemonstratives:"practice"}})');
 assert.equal(ev('state.view'),'activity');
 assert.equal(ev('state.activity.kind'),'demonstratives');
 assert.equal(ev('state.activity.ids.length'),5);
 assert.ok(elements.app.innerHTML.includes('data-action="gameBack"'));
 ev('navigate("demonstratives-content")');
 assert.ok(elements.app.innerHTML.includes('guide-cards'));
 assert.equal(ev('activityNav()'),'dialogue');
}
console.log('PASS: Dialogue menu → illustrated content → WH-word questions, with guide return path.');

// Mode navigation is available through Overview cards only.
for(const view of ['dialogue','vocabulary-menu','write-menu','handwriting-menu','vocabulary-menu','bank','mock']){
  ev(`navigate('${view}')`);
  assert.ok(!elements.app.innerHTML.includes('class="nav "'));
}
ev('navigate("home")');assert.ok(elements.app.innerHTML.includes('class="nav overview-nav"'));

// Vocabulary opens set selection, then illustrated content with both practice modes.
for(const category of ['introductions','demonstratives']){
  assert.equal(ev(`vocabularyStudySet('category-${category}')`),null);
}
for(const mode of ['write','vocabulary-rebuild']){
  ev(`startWordSet('${mode}','all')`);
  assert.equal(ev('state.round.ids.length'),practiceCount);
  assert.equal(ev('state.round.ids.every(id=>!DIALOGUE_WORD_IDS.has(id))'),true);
}

assert.equal(ev('WORDS.filter(w=>!w.id.startsWith("csv-")).every(w=>typeof VOCAB_VISUALS[w.id]==="string"&&VOCAB_VISUALS[w.id].length>0)'),true);
for(const language of ['en','zh-Hant']){
  ev(`state.language='${language}';navigate('vocabulary-menu')`);
  assert.equal(ev('activityNav()'),'vocabulary-menu');
  assert.ok(elements.app.innerHTML.includes('data-vocabulary-browse'));
  assert.ok(!elements.app.innerHTML.includes('data-vocabulary-menu='));
  ev('openVocabularyContent("all")');
  assert.equal(ev('state.view'),'vocabulary-content');
  assert.equal((elements.app.innerHTML.match(/data-vocabulary-guide=/g)||[]).length,libraryCount);
  assert.equal((elements.app.innerHTML.match(/<svg[^>]+role="img"/g)||[]).length,libraryCount);
  assert.ok(!elements.app.innerHTML.includes('undefined'));
  assert.ok(elements.app.innerHTML.includes('data-vocabulary-browse'));
  assert.ok(!/value="category-(?:introductions|replies)"|data-vocabulary-guide="(?:1-c1|2-c6)"/.test(elements.app.innerHTML));
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Recall':'回想練習'));
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Rebuild':'重組練習'));
  assert.ok(elements.app.innerHTML.indexOf('data-vocabulary-browse')<elements.app.innerHTML.indexOf('<h1>'));
  ev('openVocabularyContent("chapter-1")');
  assert.equal(ev('state.vocabularyContentKey'),'chapter-1');
  assert.equal((elements.app.innerHTML.match(/data-vocabulary-guide=/g)||[]).length,ev('vocabularyStudySet("chapter-1").ids.length'));
  handlers.click({target:{closest:()=>({disabled:false,dataset:{vocabularyPractice:'write'}})}});
  assert.equal(ev('state.view'),'write');
  assert.equal(ev('state.round.ids.length'),28);
  assert.equal(ev('state.round.ids.every(id=>wordBy(id).ch===1)'),true);
  ev('navigateBreadcrumb({crumbView:"vocabulary-menu"})');
  handlers.click({target:{closest:()=>({disabled:false,dataset:{vocabularyPractice:'vocabulary-rebuild'}})}});
  assert.equal(ev('state.view'),'vocabulary-rebuild');
  assert.equal(ev('state.round.ids.length'),28);
  ev('run("restart")');assert.equal(ev('state.round.ids.length'),28);
  ev('navigateBreadcrumb({crumbView:"vocabulary-menu"})');
  assert.ok(elements.app.innerHTML.includes('data-vocabulary-set="chapter-1" aria-pressed="true"'));
  ev('run("toggleLanguage")');
  assert.equal(ev('state.vocabularyContentKey'),'chapter-1');
  assert.equal((elements.app.innerHTML.match(/data-vocabulary-guide=/g)||[]).length,ev('vocabularyStudySet("chapter-1").ids.length'));
}
for(const key of ['chapter-2',...Object.keys(expectedVocabularyCategoryCounts).filter(id=>expectedVocabularyCategoryCounts[id]).map(id=>'category-'+id)]){
  ev(`openVocabularyContent('${key}')`);
  const count=ev(`vocabularyStudySet('${key}').ids.length`);
  assert.equal((elements.app.innerHTML.match(/data-vocabulary-guide=/g)||[]).length,count);
  for(const mode of ['write','vocabulary-rebuild']){
    ev(`startVocabularyPractice('${mode}')`);
    assert.equal(ev('state.round.ids.length'),ev(`vocabularyStudySet('${key}').ids.filter(id=>wordGameReady(wordBy(id))).length`));
    assert.equal(ev('state.round.ids.every(id=>vocabularyStudySet(state.vocabularyContentKey).ids.includes(id))'),true);
  }
}
ev('navigate("write-menu")');assert.equal(ev('state.view'),'vocabulary-menu');
for(const [key,count] of [['chapter-1',28],['chapter-2',30],...Object.entries(expectedVocabularyCategoryCounts).filter(([,count])=>count).map(([category,count])=>[`category-${category}`,count])]){
  ev(`startWriteSet('${key}')`);
  assert.equal(ev('state.round.ids.length'),count);
  assert.ok(elements.app.innerHTML.includes('data-action="gameBack"'));
  ev('run("restart")');
  assert.equal(ev('state.round.ids.length'),count);
  assert.equal(ev('state.round.ids.every(id=>state.writeSet.ids.includes(id))'),true);
}
ev('startWriteSet("category-places");state.round.missed=[state.round.ids[0]];run("repeatMissed")');
assert.equal(ev('state.round.ids.length'),1);
ev('run("restart")');assert.equal(ev('state.round.ids.length'),27);
ev('state.round.index=state.round.ids.length;render()');
assert.equal(elements.app.innerHTML.includes('class="breadcrumbs"'),!ev('isGamePage()'));
ev('navigate("mock")');
assert.ok(!/Part A|Part B|A 部分|B 部分/.test(elements.app.innerHTML));
console.log('PASS: bilingual Write menu, all/chapter/category sets, retry scope, and removed Part A/B labels.');

// Every practice mode keeps correct-answer feedback visible until the user presses Next.
const assertManualFeedback=()=>{
  assert.equal([...timers.values()].some(timer=>timer.delay===1000||timer.delay===2000),false);
  assert.ok(!elements.app.innerHTML.includes('data-auto-countdown'));
};
for(const mode of ['vocabulary-rebuild','write','sentences']){
  ev('state.language="en"');
  if(mode==='vocabulary-rebuild')ev('startWordPractice("vocabulary-rebuild",["1-07","1-08"],"Jobs & roles")');
  else if(mode==='write')ev('startWriteWords(["1-09","1-13"],"Jobs & roles")');
  else ev('state.view="sentences";begin("sentences",["p1-1","p1-2"]);render()');
  for(let index=0;index<2;index++){
    if(mode==='vocabulary-rebuild')ev(`{const r=state.round;for(const unit of kanaUnits(vocabularyReading(wordBy(current()))))r.chosen.push(r.tileBank.findIndex((x,i)=>x===unit&&!r.chosen.includes(i)));vocabularyAction('vocabularyCheck');}`);
    else if(mode==='write')ev('state.round.b=wordBy(current()).kana;state.round.c=wordBy(current()).c;run("checkWrite")');
    else ev('state.round.chosen=sentenceBy(current()).tokens.map((_,i)=>i);run("checkSentence")');
    assert.equal(ev('state.round.index'),index);assert.equal(ev('state.round.checked'),true);
    assertManualFeedback();assert.ok(elements.app.innerHTML.includes('data-action="next"'));
    ev('run("next")');assert.equal(ev('state.round.index'),index+1);
  }
  assert.ok(elements.app.innerHTML.includes('Round complete'));
}
for(const kind of ['demonstratives','dialogue-choice','dialogue-tiles','wh-tiles']){
  ev(`state.language='en';startActivity('${kind}');state.activity.ids=state.activity.ids.slice(0,2);prepareActivity();render()`);
  for(let index=0;index<2;index++){
    if(['dialogue-tiles','wh-tiles'].includes(kind))ev(`{const a=state.activity;for(const unit of kanaUnits(vocabularyReading(activityCurrent()))){const id=a.tileBank.findIndex((x,i)=>x===unit&&!a.chosen.includes(i));a.chosen.push(id);}checkActivity();}`);
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

// Dialogue and WH-word Rebuild use the shared bank and support review, retries and editing.
for(const category of ['courtesy','wh-words']){
  ev(`selectDialogueCategory('${category}')`);
  clickData(category==='wh-words'?{openDemonstratives:'rebuild'}:{openDialogue:'dialogue-tiles'});
  assert.equal(ev('state.activity.kind'),category==='wh-words'?'wh-tiles':'dialogue-tiles');
  assert.deepEqual(Array.from(ev('breadcrumbItems().map(item=>item.label)')),['Kotoba','Dialogue','Rebuild']);
  const limit=ev('kanaUnits(vocabularyReading(activityCurrent())).length');
  assert.equal((elements.app.innerHTML.match(/data-activity-slot=/g)||[]).length,0);
  assert.ok(elements.app.innerHTML.includes('class="inline-answer'));
  clickData({action:'activityCheck'});assert.equal(ev('state.activity.checked'),false);
  const tile=ev('state.activity.tileBank.findIndex(unit=>unit===kanaUnits(vocabularyReading(activityCurrent()))[0])');
  clickData({activityTile:String(tile)});clickData({activityTile:String(tile)});
  clickData({activityTile:'-1'});clickData({activityTile:'99999'});clickData({activityReturn:'-1'});
  assert.equal(ev('state.activity.chosen.length'),1);
  assert.ok(elements.app.innerHTML.includes('class="tile jp selected"'));
  clickData({action:'activityUndo'});assert.equal(ev('state.activity.chosen.length'),0);
  clickData({activityTile:String(tile)});clickData({action:'activityClear'});
  assert.equal(ev('state.activity.chosen.length'),0);
  const before=ev('Object.values(progress.activities).reduce((sum,item)=>sum+item.attempts,0)');
  clickData({action:'activityReveal'});
  assert.equal(ev('state.activity.checked&&state.activity.revealed&&!state.activity.result'),true);
  assert.equal(ev('state.activity.missed.length'),1);
  clickData({action:'activityCheck'});
  assert.equal(ev('Object.values(progress.activities).reduce((sum,item)=>sum+item.attempts,0)'),before+1);
  clickData({action:'activityRestart'});
  assert.equal(ev('state.activity.revealed'),false);
  assert.equal(ev('state.activity.ids.length'),category==='courtesy'?9:5);
  ev(`{const a=state.activity;for(const unit of kanaUnits(vocabularyReading(activityCurrent()))){const i=a.tileBank.findIndex((text,index)=>text===unit&&!a.chosen.includes(index));activityClick({dataset:{activityTile:String(i)}});}}`);
  ev('state.language="en";run("toggleLanguage")');
  assert.equal(ev('state.activity.chosen.length'),ev('kanaUnits(vocabularyReading(activityCurrent())).length'));
  handlers.keydown({key:'Enter',target:{tagName:'BODY'},preventDefault(){}});
  assert.equal(ev('state.activity.result'),true);assert.equal(ev('state.activity.index'),0);
  handlers.keydown({key:'Enter',target:{tagName:'BODY'},preventDefault(){}});
  assert.equal(ev('state.activity.index'),1);
  clickData({action:'activityBack'});assert.equal(ev('state.dialogueCategory'),category);
}
ev('state.language="en"');
console.log('PASS: shared Dialogue/WH Rebuild slots, confusable tiles, editing, review, scoped retries, language retention and manual Next.');

for(const mode of ['write','vocabulary-rebuild']){
  for(const key of ['chapter-1','category-occupations'])for(const complete of [false,true]){
    ev('pageHistory.length=0;navigate("vocabulary-menu")');
    assert.ok(elements.app.innerHTML.includes('data-vocabulary-browse'));
    ev(`openVocabularyContent('${key}')`);
    clickData({vocabularyPractice:mode});assert.equal(ev('state.view'),mode);
    if(complete)ev('state.round.index=state.round.ids.length;render()');
    clickData({crumbView:'vocabulary-menu'});assert.equal(ev('state.view'),'vocabulary-menu');
    assert.equal(ev('state.vocabularyContentKey'),key);
    assert.ok(elements.app.innerHTML.includes(`data-vocabulary-set="${key}" aria-pressed="true"`));
    assert.deepEqual(Array.from(ev('breadcrumbItems().map(item=>item.label)')),['Kotoba','Vocabulary']);
    assert.ok(!elements.app.innerHTML.includes('class="mode-card'));
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
ev('pageHistory.length=0;previousPage("vocabulary-menu")');assert.equal(ev('state.view'),'vocabulary-menu');
console.log('PASS: Back returns to the preceding subpage, including chapter/category menus, activity guides and filtered word references.');

// Opening Dialogue shows the initial guide immediately and starts a scoped game.
for(const kind of ['dialogue-choice','dialogue-tiles']){
  ev('state.dialogueBrowse="category";state.dialogueCategory="introductions";pageHistory.length=0;navigate("dialogue")');
  assert.ok(elements.app.innerHTML.includes('data-dialogue-category="introductions" aria-pressed="true"'));
  assert.equal((elements.app.innerHTML.match(/data-dialogue-guide=/g)||[]).length,1);
  assert.ok(!elements.app.innerHTML.includes('class="mode-card'));
  assert.ok(!elements.app.innerHTML.includes('dialogue-content-description'));
  clickData({openDialogue:kind});
  assert.equal(ev('state.activity.category'),'introductions');
  assert.equal(ev('state.activity.ids.length'),5);
  clickData({action:'back'});
  assert.equal(ev('state.view'),'dialogue');
}

// Dialogue categories lead to a guide, then either game; retries retain that category.
const dialogueCategoryCounts=Object.fromEntries(ev('DIALOGUE_CATEGORIES.map(c=>[c.id,dialogueItems(c.id).length])'));
assert.equal(ev('new Set(DIALOGUE_CATEGORIES.flatMap(c=>dialogueItems(c.id).map(q=>q.id))).size'),31);
assert.equal(ev('DIALOGUE_CATEGORIES.flatMap(c=>dialogueItems(c.id)).length'),31);
assert.equal(ev('DIALOGUE_CATEGORIES.every(c=>ZH_HANT[c.label]&&ZH_HANT[c.description])'),true);
for(const language of ['en','zh-Hant'])for(const [category,count] of Object.entries(dialogueCategoryCounts)){
  ev(`state.language='${language}';pageHistory.length=0;navigate('dialogue')`);
  assert.ok(elements.app.innerHTML.includes('data-dialogue-category'));
  assert.ok(!elements.app.innerHTML.includes('class="page-head"'));
  assert.equal((elements.app.innerHTML.match(/data-dialogue-category="(?:introductions|courtesy|replies|demonstratives|wh-words)"/g)||[]).length,5);
  clickData({dialogueCategory:category});
  assert.equal(ev('state.view'),'dialogue-content');
  assert.equal(ev('activityNav()'),'dialogue');
  assert.equal((elements.app.innerHTML.match(/data-dialogue-guide=/g)||[]).length,1);
  assert.equal((elements.app.innerHTML.match(/data-dialogue-expression=/g)||[]).length,count);
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Expression guide':'說法指南'));
  for(const label of language==='en'?['Matching','Rebuild']:['配對練習','重組練習'])assert.ok(elements.app.innerHTML.includes(label));
  for(const id of ev(`dialogueItems('${category}').map(q=>q.id)`))assert.ok(elements.app.innerHTML.includes(`data-dialogue-expression="${id}"`));
  assert.ok(!elements.app.innerHTML.includes('undefined'));
  for(const kind of ['dialogue-choice','dialogue-tiles']){
    clickData({openDialogue:kind});
    assert.equal(ev('state.view'),'activity');
    assert.equal(ev('state.activity.category'),category);
    assert.equal(ev('state.activity.ids.length'),count);
    for(let index=0;index<count;index++){
      ev(`state.activity.index=${index};prepareActivity();render()`);
      assert.equal(ev(`state.activity.choices.every(q=>dialogueInCategory(q,'${category}'))`),true);
      assert.equal(ev('new Set(state.activity.choices.map(q=>q.kana)).size'),ev('state.activity.choices.length'));
      if(['dialogue-tiles','wh-tiles'].includes(kind)){
        ev(`{const a=state.activity;for(const unit of kanaUnits(vocabularyReading(activityCurrent()))){a.chosen.push(a.tileBank.findIndex((x,i)=>x===unit&&!a.chosen.includes(i)));}checkActivity();}`);
      }else clickData({activityChoice:ev('activityCurrent().id')});
      assert.equal(ev('state.activity.result'),true);
    }
    ev('activityAction("activityNext")');
    assert.ok(elements.app.innerHTML.includes('data-action="gameBack"'));
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
console.log('PASS: bilingual Dialogue categories → category guide → choice/hiragana game, all retained scenes, category-only choices, scoped retries and guide return paths.');

// Expression guides show one selected conversation; WH-word guide cards remain visible.
for(const language of ['en','zh-Hant'])for(const category of ['introductions','courtesy','replies','demonstratives']){
  ev(`state.language='${language}';pageHistory.length=0;navigate('dialogue')`);
  clickData({dialogueCategory:category==='demonstratives'?'wh-words':category});
  const count=category==='demonstratives'?5:dialogueCategoryCounts[category];
  assert.equal((elements.app.innerHTML.match(/<article class="paper guide-card/g)||[]).length,1);
  if(category!=='demonstratives'){
    assert.equal((elements.app.innerHTML.match(/data-dialogue-expression=/g)||[]).length,count);
    assert.equal((elements.app.innerHTML.match(/class="conversation-turn /g)||[]).length,2);
  }
  assert.ok(elements.app.innerHTML.includes('class="guide-cards"'));
  assert.ok(!elements.app.innerHTML.includes('undefined'));
  ev('run("toggleLanguage")');
  assert.equal((elements.app.innerHTML.match(/<article class="paper guide-card/g)||[]).length,1);
  if(category==='demonstratives')clickData({openDemonstratives:'practice'});
  else clickData({openDialogue:'dialogue-choice'});
  clickData({action:'back'});
  assert.equal((elements.app.innerHTML.match(/<article class="paper guide-card/g)||[]).length,1);
}
assert.equal(ev('Object.keys(CONVERSATIONS).length'),68);
assert.equal(ev('DIALOGUES.every(q=>CONVERSATIONS[q.id][2].some(turn=>turn[1].includes(q.target||wordBy(q.word).kana)))'),true);
ev('state.language="en";openDialogueCategory("introductions")');
assert.ok(elements.app.innerHTML.includes('data-dialogue-expression="meet" aria-pressed="true">Meeting someone for the first time</button>'));
assert.equal((elements.app.innerHTML.match(/class="conversation-turn /g)||[]).length,2);
assert.ok(elements.app.innerHTML.includes('Nice to meet you too.'));
assert.ok(!elements.app.innerHTML.includes('data-conversation=')&&!elements.app.innerHTML.includes('conversation-situation'));
clickData({dialogueExpression:'intro'});
assert.equal(ev('selectedDialogueExpression'),'intro');
assert.ok(elements.app.innerHTML.includes('data-dialogue-guide="intro"'));
assert.ok(elements.app.innerHTML.includes('Likewise.'));
ev('state.language="zh-Hant";render()');
assert.ok(elements.app.innerHTML.includes('data-dialogue-expression="intro" aria-pressed="true">結束自我介紹</button>'));
ev('selectDialogueCategory("courtesy")');
assert.equal(ev('selectedDialogueExpression'),ev('dialogueItems("courtesy")[0].id'));
assert.equal((elements.app.innerHTML.match(/class="conversation-turn /g)||[]).length,2);
// Language and Update controls follow the breadcrumbs in the page header.
for(const view of ['home','number-menu','dialogue','vocabulary-menu']){
  ev(`navigate('${view}')`);
  const html=elements.app.innerHTML,header=html.match(/<header class="topbar">([\s\S]*?)<\/header>/)[1];
  assert.ok(header.indexOf('data-action="toggleLanguage"')>header.indexOf('</nav>'));
  assert.ok(header.indexOf('pwa-update-slot')<header.indexOf('data-action="toggleLanguage"'));
  assert.ok(!html.match(/<aside[\s\S]*?<\/aside>/)[0].includes('data-action="toggleLanguage"'));
}
console.log('PASS: bilingual description chips, complete conversations and breadcrumb language/update controls.');

// Write accepts a blank C only for no-kanji words, without changing mock grading.
assert.equal(ev('WORDS.filter(wordGameReady).every(w=>gradeWord(w,w.kana,"",true).score===(w.c==="X"?1:.5))'),true);
for(const answer of ['','  ','　','X','x','ｘ','×']){
  ev(`startWriteWords(['2-18'],'Blank kanji practice');state.round.b='かぎ';state.round.c=${JSON.stringify(answer)};run('checkWrite')`);
  assert.equal(ev('state.round.result.cOk'),true);
  assert.equal(ev('state.round.result.score'),1);
  assert.equal(ev('state.round.correct'),1);
  assert.equal(ev('state.round.missed.length'),0);
}
for(const answer of ['。','～','鍵','no'])assert.equal(ev(`gradeWord(wordBy('2-18'),'かぎ',${JSON.stringify(answer)},true).cOk`),false);
ev('startWriteWords(["1-09"],"Kanji required");state.round.b="がくせい";state.round.c="";run("checkWrite")');
assert.equal(ev('state.round.result.score'),.5);
assert.equal(ev('state.round.missed.length'),1);
ev('startWriteWords(["2-18"],"No reading");state.round.b="";state.round.c="";run("checkWrite")');
assert.equal(ev('state.round.result.score'),.5);
for(const language of ['en','zh-Hant']){
  ev(`state.language='${language}';render()`);
  assert.ok(elements.app.innerHTML.includes(language==='en'?'No kanji? Leave C blank or enter X.':'沒有漢字時，C 欄可留空或填 X。'));
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Blank or X':'留空或 X'));
}
ev('startMock();mock.a[0]={id:"2-18",b:"かぎ",c:""};finishMock()');
assert.equal(ev('mock.aResults[0].score'),.5);
assert.equal(ev('mock.aResults[0].cOk'),false);
console.log('PASS: Write accepts blank/whitespace or X for no-kanji words, still requires kana and taught kanji, and preserves strict mock scoring.');

// Kanji Writing is independent from the renamed typed Vocabulary Recall mode.
for(const language of ['en','zh-Hant']){
  ev(`state.language='${language}';navigate('home')`);
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Vocabulary':'詞彙'));
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Kanji Writing':'漢字書寫'));
  ev('navigate("handwriting-menu")');
  assert.equal(ev('activityNav()'),'handwriting-menu');
  assert.ok(elements.app.innerHTML.includes('data-handwriting-set="all"'));
  clickData({handwritingMenu:'category'});
  for(const category of ev('VOCAB_CATEGORIES.filter(c=>!c.ids.some(id=>hasKanji(wordBy(id))&&wordGameReady(wordBy(id)))).map(c=>c.id)'))assert.ok(!elements.app.innerHTML.includes(`data-handwriting-set="category-${category}"`));
  clickData({handwritingSet:'category-occupations'});
  assert.equal(ev('state.view'),'kanji-writing');
  assert.equal(ev('state.round.ids.every(id=>hasKanji(wordBy(id)))'),true);
  clickData({action:'back'});assert.equal(ev('state.view'),'handwriting-menu');assert.equal(ev('state.handwritingMenu'),'category');
}
for(const key of ['all','chapter-1','chapter-2',...ev('VOCAB_CATEGORIES.filter(c=>c.ids.some(id=>hasKanji(wordBy(id))&&wordGameReady(wordBy(id)))).map(c=>"category-"+c.id)')]){
  ev(`startWordSet('kanji-writing','${key}')`);
  const expected=ev(`WORDS.filter(w=>hasKanji(w)&&wordGameReady(w)).filter(w=>'${key}'==='all'||('${key}'.startsWith('chapter-')?w.ch===Number('${key}'.slice(-1)):vocabularySection(w)==='${key}'.slice(9))).length`);
  assert.equal(ev('state.round.ids.length'),expected);
  for(let i=0;i<expected;i++){
    ev(`state.round.index=${i};prepareQuestion();render()`);
    assert.equal((elements.app.innerHTML.match(/data-kanji-cell=/g)||[]).length,ev('kanjiCharacters(wordBy(current())).length'));
    assert.ok(!elements.app.innerHTML.includes('undefined'));
    assert.ok(!elements.app.innerHTML.includes('class="kanji-model'));
  }
  ev('state.round.missed=[state.round.ids[0]];run("repeatMissed")');assert.equal(ev('state.round.ids.length'),1);
  ev('run("restart")');assert.equal(ev('state.round.ids.length'),expected);
}
ev('state.language="en";startWordPractice("kanji-writing",["1-01","1-09","2-18"],"Kanji only")');
assert.equal(ev('state.round.ids.join(",")'),'1-09');
const inkGroup={innerHTML:''};
const penPad={dataset:{kanjiCell:'0'},getBoundingClientRect:()=>({left:10,top:20,width:200,height:200}),setPointerCapture(){},hasPointerCapture:()=>true,releasePointerCapture(){},querySelector:()=>inkGroup};
const penEvent=(overrides={})=>({target:{closest:()=>penPad},pointerId:1,clientX:60,clientY:80,isPrimary:true,button:0,preventDefault(){},...overrides});
handlers.pointerdown(penEvent());assert.equal(ev('state.round.ink.length'),1);
assert.deepEqual(Array.from(ev('state.round.ink[0].points[0]')),[50,60]);
handlers.pointerdown(penEvent({pointerId:2}));assert.equal(ev('state.round.ink.length'),1);
handlers.pointermove(penEvent({pointerId:2}));assert.equal(ev('state.round.ink[0].points.length'),1);
handlers.pointermove(penEvent({clientX:400,clientY:-50}));
assert.deepEqual(Array.from(ev('state.round.ink[0].points[1]')),[200,0]);
assert.ok(inkGroup.innerHTML.includes('L200 0'));
handlers.pointerup(penEvent());
ev('run("toggleLanguage")');assert.equal(ev('state.round.ink.length'),1);
ev('run("kanjiUndo")');assert.equal(ev('state.round.ink.length'),0);
handlers.pointerdown(penEvent({button:2}));assert.equal(ev('state.round.ink.length'),0);
handlers.pointerdown(penEvent());handlers.pointercancel(penEvent());
ev('run("kanjiClear")');assert.equal(ev('state.round.ink.length'),0);
ev('run("kanjiReveal");run("kanjiCorrect")');assert.equal(ev('state.round.checked'),false);
// A model is revealed before self-marking, and empty drawings cannot earn a recall.
ev('begin("kanji-writing",["1-09"]);render()');
handlers.pointerdown(penEvent());handlers.pointerup(penEvent());
const typedAttempts=ev('progress.words["1-09"]?.attempts||0');
ev('run("kanjiCorrect")');assert.equal(ev('state.round.checked'),false);
ev('run("kanjiReveal")');assert.ok(elements.app.innerHTML.includes('class="kanji-model jp"'));
handlers.pointerdown(penEvent());assert.equal(ev('state.round.ink.length'),1);
ev('run("kanjiCorrect")');assert.equal(ev('state.round.correct'),1);assert.equal(ev('state.round.checked'),true);
assert.equal(ev('progress.words["1-09"]?.attempts||0'),typedAttempts);
const handwritingAttempts=ev('progress.kanjiWriting["1-09"].attempts');
ev('run("kanjiCorrect")');assert.equal(ev('progress.kanjiWriting["1-09"].attempts'),handwritingAttempts);
assert.equal(JSON.parse(Object.values(storage)[0]).progress.kanjiWriting['1-09'].last,true);
ev('run("next")');assert.ok(elements.app.innerHTML.includes('data-action="gameBack"'));
ev('begin("kanji-writing",["1-09"]);run("kanjiReveal");run("kanjiMissed")');assert.equal(ev('state.round.missed.join(",")'),'1-09');
console.log('PASS: Kanji Writing selection, per-character pads, pointer input and bounds, undo/clear/cancel, model reveal, independent self-check progress, retries and Vocabulary Recall naming.');

// Both Dialogue games place Lulu beside every turn and keep feedback hidden.
for(const language of ['en','zh-Hant'])for(const kind of ['dialogue-choice','dialogue-tiles'])for(const id of ev('DIALOGUES.map(q=>q.id)')){
  ev(`state.language='${language}';startActivity('${kind}',['${id}'])`);
  const html=elements.app.innerHTML;
  assert.equal((html.match(/class="conversation-pig"/g)||[]).length,ev('CONVERSATIONS[activityCurrent().id][2].length'),`${kind}: ${id}`);
  assert.equal([...html.matchAll(/class="conversation-turn (you|listener)"/g)][0][1],ev('CONVERSATIONS[activityCurrent().id][2][0][0]'));
  assert.ok(!html.includes('class="expression-figure"'));
  assert.ok(!html.includes('reply-feedback'));
  assert.ok(!html.includes(ev('esc(translateText(activityCurrent().why))')));
}
console.log('PASS: all retained Dialogue scenes use speaker bubbles in both games and languages, with feedback hidden before grading.');

// Rebuild launches vocabulary or sentences, and replaces Matching before writing modes.
for(const language of ['en','zh-Hant']){
  ev(`state.language='${language}';pageHistory.length=0;navigate('home')`);
  assert.equal(ev('STUDY_MODES.some(mode=>mode.id==="matching")'),false);
  assert.equal(ev('STUDY_MODES.findIndex(mode=>mode.id==="vocabulary-menu")<STUDY_MODES.findIndex(mode=>mode.id==="handwriting-menu")'),true);
  assert.equal(ev('STUDY_MODES.some(mode=>mode.id==="write-menu")'),false);
  assert.equal(ev('STUDY_MODES.some(mode=>mode.id==="rebuild-menu")'),false);
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Vocabulary':'詞彙'));
  assert.ok(elements.app.innerHTML.includes(language==='en'?'Sentence Rebuild':'句子重組'));
  clickData({view:'sentences'});assert.equal(ev('activityNav()'),'sentences');
  clickData({view:'home'});
  clickData({view:'vocabulary-menu'});assert.equal(ev('activityNav()'),'vocabulary-menu');
  assert.ok(elements.app.innerHTML.includes('data-vocabulary-browse'));
  clickData({vocabularyBrowse:"category"});
  for(const category of Object.keys(expectedVocabularyCategoryCounts).filter(id=>expectedVocabularyCategoryCounts[id]))assert.ok(elements.app.innerHTML.includes(`data-vocabulary-set="category-${category}"`));
  clickData({vocabularySet:'category-occupations'});
  assert.equal(ev('state.vocabularyContentKey'),'category-occupations');
}
for(const key of ['all','chapter-1','chapter-2',...Object.keys(expectedVocabularyCategoryCounts).filter(id=>expectedVocabularyCategoryCounts[id]).map(id=>'category-'+id)]){
  ev(`startWordSet('vocabulary-rebuild','${key}')`);
  const count=ev('state.round.ids.length');assert.ok(count>0);
  if(key==='all')assert.equal(count,practiceCount);
  else if(key.startsWith('chapter-'))assert.equal(ev(`state.round.ids.every(id=>wordBy(id).ch===Number('${key}'.slice(-1)))`),true);
  else assert.equal(ev(`state.round.ids.every(id=>vocabularySection(wordBy(id))==='${key}'.slice(9))`),true);
  ev('state.round.missed=[state.round.ids[0]];run("repeatMissed")');assert.equal(ev('state.round.ids.length'),1);
  ev('run("restart")');assert.equal(ev('state.round.ids.length'),count);
}
const exampleBank=Array.from(ev('vocabularyTileBank({kana:"そうじ"})'));
for(const unit of ['そ','ぞ','う','じ','し','っじ'])assert.ok(exampleBank.includes(unit),unit);
const chooseVocabularyAnswer=()=>ev(`{const r=state.round;for(const unit of kanaUnits(vocabularyReading(wordBy(current())))){const index=r.tileBank.findIndex((text,i)=>text===unit&&!r.chosen.includes(i));if(index<0)throw Error('Missing correct tile');vocabularyTileClick({vocabularyTile:String(index)});}}`);
for(const language of ['en','zh-Hant']){
  ev(`state.language='${language}';resetFilters();startWordSet('vocabulary-rebuild','all')`);
  for(let i=0;i<practiceCount;i++){
    ev(`state.round.index=${i};prepareQuestion();render()`);
    assert.equal(ev('state.round.tileBank.every(unit=>/^[ぁ-ゖー]+$/u.test(unit))'),true);
    assert.equal((elements.app.innerHTML.match(/data-vocabulary-slot=/g)||[]).length,ev('kanaUnits(vocabularyReading(wordBy(current()))).length'));
    assert.equal((elements.app.innerHTML.match(/class="vocabulary-slot empty"/g)||[]).length,ev('kanaUnits(vocabularyReading(wordBy(current()))).length'));
    assert.equal(ev('kanaUnits(vocabularyReading(wordBy(current()))).every(unit=>state.round.tileBank.filter(text=>text===unit).length>=kanaUnits(vocabularyReading(wordBy(current()))).filter(text=>text===unit).length)'),true);
    assert.equal(ev('state.round.tileBank.some(unit=>!kanaUnits(vocabularyReading(wordBy(current()))).includes(unit))'),true);
    assert.ok(!elements.app.innerHTML.includes('undefined'));
    chooseVocabularyAnswer();
    assert.equal(ev('vocabularyAnswer()'),ev('vocabularyReading(wordBy(current()))'));
    ev('run("vocabularyCheck")');assert.equal(ev('state.round.result'),true);
    assert.equal(ev('state.round.index'),i);assertManualFeedback();
  }
}
ev('state.language="en";startWordPractice("vocabulary-rebuild",["1-09","2-09"],"Spelling practice");begin("vocabulary-rebuild",["1-09","2-09"]);render()');
const oldRecallAttempts=ev('progress.words["1-09"]?.attempts||0');
chooseVocabularyAnswer();
const oldIndex=ev('state.round.index');
handlers.keydown({key:'Enter',target:{tagName:'BODY'},preventDefault(){}});
assert.equal(ev('state.round.index'),oldIndex,'Enter checks the answer without skipping feedback');
assert.equal(ev('state.round.result'),true);
assert.equal(ev('progress.words["1-09"]?.attempts||0'),oldRecallAttempts);
assert.equal(JSON.parse(Object.values(storage)[0]).progress.vocabularyRebuild['1-09'].last,true);
handlers.keydown({key:'Enter',target:{tagName:'BODY'},preventDefault(){}});assert.equal(ev('state.round.index'),oldIndex+1);
const firstIndex=ev('state.round.tileBank.findIndex(unit=>unit===kanaUnits(vocabularyReading(wordBy(current())))[0])');
clickData({vocabularyTile:String(firstIndex)});clickData({vocabularyTile:String(firstIndex)});assert.equal(ev('state.round.chosen.length'),1);
clickData({vocabularyTile:'-1'});clickData({vocabularyTile:'9999'});assert.equal(ev('state.round.chosen.length'),1);
clickData({vocabularyReturn:'-1'});assert.equal(ev('state.round.chosen.length'),1);
ev('run("vocabularyCheck")');assert.equal(ev('state.round.checked'),false);
clickData({vocabularyReturn:'0'});assert.equal(ev('state.round.chosen.length'),0);
chooseVocabularyAnswer();ev('run("vocabularyUndo")');assert.equal(ev('state.round.chosen.length'),ev('kanaUnits(vocabularyReading(wordBy(current()))).length-1'));
ev('run("vocabularyClear")');assert.equal(ev('state.round.chosen.length'),0);
chooseVocabularyAnswer();ev('state.round.chosen[0]=state.round.tileBank.findIndex(unit=>unit.length===kanaUnits(vocabularyReading(wordBy(current())))[0].length&&!kanaUnits(vocabularyReading(wordBy(current()))).includes(unit));run("vocabularyCheck")');
assert.equal(ev('state.round.result'),false);assert.equal(ev('state.round.missed.join(",")'),'2-09');
const attemptsAfterWrong=ev('progress.vocabularyRebuild["2-09"].attempts');ev('run("vocabularyCheck")');assert.equal(ev('progress.vocabularyRebuild["2-09"].attempts'),attemptsAfterWrong);
ev('run("next")');assert.ok(elements.app.innerHTML.includes('Round complete'));
ev('run("repeatMissed")');assert.equal(ev('state.round.ids.join(",")'),'2-09');
ev('run("vocabularyReveal")');assert.equal(ev('state.round.result'),false);assert.equal(ev('state.round.revealed'),true);
ev('navigate("matching")');assert.equal(ev('state.view'),'vocabulary-menu');assert.equal(ev('typeof matchingMenu'),'undefined');
console.log('PASS: bilingual Rebuild mode menu and order, full-word/chapter/category sets, all eligible Vocabulary readings with complete similar-kana banks, duplicate tiles, scoring, manual feedback, validation and retries.');



// Breadcrumbs replace Back links, retain context and navigate to ancestors.
for(const language of ['en','zh-Hant']){
  ev(`state.language='${language}';navigate('dialogue');openDialogueCategory('introductions')`);
  assert.deepEqual(Array.from(ev('breadcrumbItems().map(item=>item.label)')),['Kotoba','Dialogue']);
  const html=elements.app.innerHTML;
  assert.ok(!html.includes('data-action="back"')&&!html.includes('page-back'));
  assert.ok(html.includes('aria-current="page"'));
  assert.ok(html.indexOf('id="pwa-update-slot"')<html.indexOf('class="language-switch"'));
  clickData({openDialogue:'dialogue-choice'});
  assert.deepEqual(Array.from(ev('breadcrumbItems().map(item=>item.label)')),['Kotoba','Dialogue','Matching']);
  clickData({crumbView:'dialogue-content',crumbCategory:'introductions'});assert.equal(ev('state.view'),'dialogue-content');
  clickData({crumbView:'dialogue'});assert.equal(ev('state.view'),'dialogue');
  clickData({crumbView:'home'});assert.equal(ev('state.view'),'home');
  ev('openVocabularyContent("category-occupations");startVocabularyPractice("vocabulary-rebuild")');
  assert.deepEqual(Array.from(ev('breadcrumbItems().map(item=>item.label)')),['Kotoba','Vocabulary','Rebuild']);
  clickData({crumbView:'vocabulary-menu'});
  assert.equal(ev('state.view'),'vocabulary-menu');assert.equal(ev('state.vocabularyContentKey'),'category-occupations');
  assert.ok(elements.app.innerHTML.includes('data-vocabulary-browse'));
  for(const view of ['vocabulary-menu','write-menu','write','handwriting-menu','kanji-writing','bank','mock','sentences','demonstratives-content']){
    ev(`navigate('${view}')`);assert.equal(elements.app.innerHTML.includes('class="breadcrumbs"'),!ev('isGamePage()'));
    assert.ok(!elements.app.innerHTML.includes('data-action="back"')&&!elements.app.innerHTML.includes('page-back'));
  }
}

// Opening and closing navigation must preserve an in-progress answer.
ev('state.language="en";startWordPractice("write",["1-09"],"Selected words");state.round.b="がくせい";run("openNavigation")');
assert.equal(ev('state.navOpen'),true);
assert.ok(elements.app.innerHTML.includes('aria-modal="true" aria-label="Study navigation"'));
assert.ok(elements.app.innerHTML.includes('id="main-content" tabindex="-1" inert'));
ev('run("closeNavigation")');
assert.equal(ev('state.navOpen'),false);
assert.equal(ev('state.round.b'),'がくせい');
ev('run("openNavigation");navigate("bank")');
assert.equal(ev('state.navOpen'),false);
assert.ok(elements.app.innerHTML.includes('class="active" aria-current="page"'));
for(const language of ['en','zh-Hant']){
 ev(`state.language='${language}';run('openNavigation')`);
 assert.ok(elements.app.innerHTML.includes(language==='en'?'Close navigation':'關閉導覽'));
 ev('run("closeNavigation")');
}
console.log('PASS: Material navigation preserves answers, closes on destination changes and has bilingual accessible controls.');

// The learner, listener and character prompts share the Lulu illustration.
assert.equal((ev('dialogueGraphic(DIALOGUES[0])').match(/class="lulu-piggy"/g)||[]).length,2);
assert.equal((ev('vocabularyVisual(wordBy("1-01"))').match(/class="lulu-piggy"/g)||[]).length,1);
assert.equal((ev('vocabularyVisual(wordBy("1-09"))').match(/class="lulu-piggy"/g)||[]).length,1);
assert.equal((ev('vocabularyVisual(wordBy("2-01"))').match(/class="lulu-piggy"/g)||[]).length,2);
assert.equal((ev('demonstrativeGraphic(demonstrativeItems()[0])').match(/class="lulu-piggy"/g)||[]).length,1);
assert.equal((ev('vocabularyVisual(wordBy("2-10"))').match(/class="lulu-piggy"/g)||[]).length,0);
console.log('PASS: Lulu replaces human figures in dialogue, vocabulary, demonstratives and WH-word scenes while object cards keep their subject.');
assert.equal(ev('Object.keys(LULU_POSES).length'),9);
assert.ok(ev('vocabularyVisual(wordBy("1-01"))').includes('icons/lulu-poses.png'));
assert.ok(!ev('vocabularyVisual(wordBy("1-01"))').includes('👋'));
assert.ok(ev('vocabularyVisual(wordBy("1-09"))').includes('viewBox="0 418 418 418"'));
assert.ok(ev('vocabularyVisual(wordBy("2-32a"))').includes('viewBox="418 836 418 418"'));
assert.equal(ev('VOCABULARY_WORDS.filter(w=>PIGGY_VISUAL_CATEGORIES.has(vocabularySection(w))||PIGGY_VISUAL_WORD_IDS.has(w.id)).every(w=>!vocabularyVisual(w).includes("Apple Color Emoji"))'),true);
assert.ok(ev('dialogueGraphic(DIALOGUES.find(q=>q.id==="meet"))').includes('icons/lulu-poses.png'));
console.log('PASS: nine Lulu poses replace gesture emoji in the relevant Vocabulary cards and Dialogue scenes.');

// The full reference still lists Dialogue forms, but its Recall shortcut cannot
// start an empty Vocabulary round when a search finds only Dialogue words.
ev('state.language="en";resetFilters();navigate("bank");state.search="who";writeSelection()');
assert.equal(ev('state.view'),'bank');
assert.ok(elements.toast.textContent.includes('Try Dialogue'));
ev('mock={a:[{id:"1-17a"}],aResults:[{score:0}]};run("mockMissedWords")');
assert.equal(ev('state.view'),'bank');
assert.ok(elements.toast.textContent.includes('practised in Dialogue'));
ev('mock={a:[{id:"1-17a"},{id:"1-09"}],aResults:[{score:0},{score:0}]};run("mockMissedWords")');
assert.equal(ev('state.view'),'write');
assert.equal(ev('state.round.ids.join(",")'),'1-09');
console.log('PASS: reference and mock review avoid empty Vocabulary rounds for Dialogue-only words.');

// Regression: spellings are compared in order, independently of tile segmentation
// and duplicate tile identity. Canonical Unicode is allowed, distinct kana are not.
assert.equal(ev('rebuildCorrect("か\\u3099\\u200b くせい", "がくせい")'),true);
for(const [answer,target] of [['せんせい','せんせい'],['せいせん','せんせい'],['せんい','せんせい'],['きや','きゃ'],['は','ば'],['コーヒー','こーひー']]){
  assert.equal(ev(`rebuildCorrect(${JSON.stringify(answer)},${JSON.stringify(target)})`),answer===target);
}
ev(`resetFilters();startWordPractice('vocabulary-rebuild',['2-09'],'Regression');state.round.tileBank=['ざ','っし'];state.round.chosen=[0,1];render();vocabularyAction('vocabularyCheck')`);
assert.equal(ev('state.round.result'),true,'Correct text must pass even with fewer tiles');
for(const reversed of [false,true]){
 ev(`startWordPractice('vocabulary-rebuild',['1-07'],'Duplicates');state.round.tileBank=['せ','ん','せ','い'];state.round.chosen=${reversed?'[2,1,0,3]':'[0,1,2,3]'};vocabularyAction('vocabularyCheck')`);
 assert.equal(ev('state.round.result'),true,'Equal duplicate tiles can trade positions');
}
ev(`startWordPractice('vocabulary-rebuild',['1-07'],'Wrong order');state.round.tileBank=['せ','ん','せ','い'];state.round.chosen=[0,3,2,1];vocabularyAction('vocabularyCheck')`);
assert.equal(ev('state.round.result'),false);
ev(`startActivity('dialogue-tiles',['thanks']);state.activity.tileBank=['あ','り','か\\u3099','と','う','こ\\u3099','ざ','い','ま','す'];state.activity.chosen=[0,1,2,3,4,5,6,7,8,9];checkActivity()`);
assert.equal(ev('state.activity.result'),true,'Dialogue uses the same canonical-text comparison');
for(const key of ['category-demonstratives']){
 ev(`openVocabularyContent('${key}')`);assert.equal(ev('state.vocabularyContentKey'),'all');
 assert.equal((elements.app.innerHTML.match(/data-vocabulary-guide=/g)||[]).length,libraryCount);
}
console.log('PASS: normalized Rebuild text, combined tiles, duplicate identity, wrong order, distinct kana, and obsolete category recovery.');

// Occupation scenes are distinct, reusable and tied to the original word IDs.
for(const [id,cell] of [['1-10',0],['1-12',1],['1-14',2]]){
  const illustration=ev(`vocabularyVisual(wordBy("${id}"))`);
  assert.ok(illustration.includes('icons/lulu-occupations.png'));
  assert.ok(illustration.includes(`viewBox="${cell*724} 0 724 724"`));
  for(const mode of ['write','vocabulary-rebuild']){
    ev(`startWordPractice('${mode}',['${id}'],'Selected words')`);
    assert.ok(elements.app.innerHTML.includes(`data-occupation="${id}"`));
    assert.ok(!elements.app.innerHTML.includes('class="page-head"'));
  }
}
console.log('PASS: distinct company, bank and research Lulu scenes are reused in both vocabulary games without browsing headings.');

// All and chapter scopes include WH words and preserve their existing progress keys.
for(const [browse,chapter] of [['all',1],['chapter',1],['chapter',2]])for(const kind of ['dialogue-choice','dialogue-tiles']){
 ev(`state.dialogueBrowse='${browse}';state.dialogueChapter=${chapter};state.view='dialogue-content';render();startDialoguePractice('${kind}')`);
 const ids=Array.from(ev('state.activity.ids'));
 assert.equal(ids.length,browse==='all'?48:chapter===1?8:17);
 for(const id of ids){
  ev(`state.activity.index=state.activity.ids.indexOf('${id}');prepareActivity();render()`);
  assert.ok(ev('state.activity.choices.length>=2'));
  const progressKey=ev("`${WH_CONVERSATIONS[activityCurrent().word]?(isActivityRebuild(state.activity)?'wh-tiles':'demonstratives'):state.activity.kind}-${activityCurrent().id}`");
  const attempts=ev(`progress.activities['${progressKey}']?.attempts||0`);
  if(kind==='dialogue-tiles')ev('{const a=state.activity;for(const unit of kanaUnits(vocabularyReading(activityCurrent())))a.chosen.push(a.tileBank.findIndex((t,i)=>t===unit&&!a.chosen.includes(i)));checkActivity()}');
  else ev('checkActivity(activityCurrent().id)');
  assert.equal(ev('state.activity.result'),true);
  assert.equal(ev(`progress.activities['${progressKey}'].attempts`),attempts+1);
 }
 assert.equal(ev('state.activity.correct'),ids.length);
 ev('activityAction("activityRestart")');assert.deepEqual(Array.from(ev('state.activity.ids')).sort(),ids.sort());
 ev('run("gameBack")');assert.equal(ev('state.dialogueBrowse'),browse);assert.equal(ev('state.dialogueChapter'),chapter);
}
console.log('PASS: all/chapter games include 48 expressions, valid choices and unchanged Dialogue/WH progress keys.');

// The attention expression remains in all/chapter pools, but never in Polite expressions.
assert.equal(ev("dialogueItems('courtesy').some(q=>q.word==='2-c1')"),false);
assert.equal(ev("dialogueItems().some(q=>q.word==='2-c1')"),true);
assert.equal(ev("dialogueItems('demonstratives').some(q=>q.word==='2-06')"),true);
for(const kind of ['dialogue-choice','dialogue-tiles']){
 ev(`startActivity('${kind}',undefined,'courtesy')`);
 assert.equal(ev("state.activity.items.some(q=>q.word==='2-c1')"),false);
}
console.log('PASS: Polite expressions excludes あのう in shared category guides and both games; あの remains intact.');

assert.equal(ev("dialogueItems('demonstratives').filter(q=>q.word==='2-c1').length"),1);
assert.equal(ev("allDialogueItems().filter(q=>q.word==='2-c1').length"),1);
for(const kind of ['dialogue-choice','dialogue-tiles']){
 ev(`startActivity('${kind}',undefined,'demonstratives')`);
 assert.equal(ev("state.activity.items.filter(q=>q.id==='attention').length"),1);
}
