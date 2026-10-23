const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements={app:{innerHTML:''},toast:{style:{},textContent:''}};
const handlers={};let storage={};
const ctx=vm.createContext({console,Date,Math,JSON,Number,String,Array,Object,Set,RegExp,module:{exports:{}},document:{querySelector:s=>s==='#app'?elements.app:s==='#toast'?elements.toast:null,querySelectorAll:()=>[],addEventListener:(e,f)=>handlers[e]=f},window:{scrollTo:()=>{}},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},setInterval:()=>{},setTimeout:()=>{},clearTimeout:()=>{}});
vm.runInContext(fs.readFileSync('dist/content.js','utf8')+'\n'+fs.readFileSync('dist/hiragana.js','utf8')+'\n'+fs.readFileSync('dist/activities.js','utf8')+'\n'+fs.readFileSync('dist/app.js','utf8'),ctx);
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
for(const view of ['home','hiragana','cards','write','matching','dialogue','match','sentences','bank','mock']){ev(`navigate('${view}')`);assert.ok(elements.app.innerHTML.length>1000,view);assert.ok(!elements.app.innerHTML.includes('undefined'),view);}
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

// Hiragana grouping must cover the complete syllabus exactly once.
assert.equal(ev('new Set(HIRAGANA_KEYS.map(([k])=>k)).size'),71);
assert.equal(ev('[...hiraganaGroups(WORDS).values()].flat().length'),96);
assert.equal(ev('new Set([...hiraganaGroups(WORDS).values()].flat().map(w=>w.id)).size'),96);
assert.equal(ev('WORDS.every(w=>HIRAGANA_KEYS.some(([k])=>k===hiraganaInitial(w)))'),true);
assert.equal(ev('hiraganaInitial({jp:"コーヒー"})'),'こ');
assert.equal(ev('hiraganaInitial({kana:"～からきました"})'),'か');
assert.equal(ev('hiraganaInitial(wordBy("1-09"))'),'が');
assert.equal(ev('hiraganaGroups(WORDS).get("か").some(w=>w.id==="1-09")'),false);
assert.equal(ev('hiraganaGroups(WORDS).get("あ").length'),10);
assert.equal(ev('hiraganaGroups(WORDS).get("う").length'),0);
ev('resetFilters();navigate("hiragana");chooseHiragana("あ")');
assert.equal(ev('hiraganaWords().length'),10);
assert.equal((elements.app.innerHTML.match(/class="kana-word-card"/g)||[]).length,10);
ev('run("toggleKanaAnswers")');assert.ok(!elements.app.innerHTML.includes('class="kana-meaning"'));
ev('run("toggleKanaAnswers");startHiraganaDrill("cards")');
assert.equal(ev('state.round.ids.length'),10);
assert.equal(ev('state.round.ids.every(id=>hiraganaInitial(wordBy(id))==="あ")'),true);
ev('run("backKana");state.filter.ch="2";render()');
assert.equal(ev('hiraganaWords().every(w=>w.ch===2)'),true);
ev('startHiraganaDrill("write")');
assert.equal(ev('state.round.ids.every(id=>wordBy(id).ch===2&&hiraganaInitial(wordBy(id))==="あ")'),true);
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
ev('resetFilters();chooseHiragana("あ");startHiraganaDrill("match")');
assert.equal(ev('state.round.ids.every(id=>hasKanji(wordBy(id))&&hiraganaInitial(wordBy(id))==="あ")'),true);
ev('resetFilters();chooseHiragana("の")');
assert.ok(/data-kana-drill="match" disabled/.test(elements.app.innerHTML));
ev('state.view="cards";begin("cards",["1-01"]);run("flip")');
assert.ok(!elements.app.innerHTML.includes('answer-c '));
assert.ok(!elements.app.innerHTML.includes('no kanji'));
ev('chooseHiragana("の")');
assert.ok(!elements.app.innerHTML.includes('kana-written'));
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
