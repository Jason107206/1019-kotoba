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
assert.equal(ev('new Set(vocabularyStudySet("all").ids).size'),338);
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
// Chapter/task intersections and guide reachability are checked in learning-navigation.cjs.
// Clock geometry is derived from the same numeric values used by the time answers.
const clock=ev('lessonScene(CHAPTER_DIALOGUES.find(q=>q.id==="ch4-time-pm"))');
assert.ok(clock.includes('data-hour="4" data-minute="8"'));
assert.ok(clock.includes('rotate(124 100 100)'));assert.ok(clock.includes('rotate(48 100 100)'));
assert.ok(clock.includes('04:08'));assert.ok(clock.includes('PM'));
// Removed numerical scenes remain in the source registry, outside Dialogue pools.
for(const id of ['ch3-floor-answer','ch4-phone-answer','ch4-past-negative'])assert.equal(ev(`CHAPTER_DIALOGUES.some(q=>q.id==='${id}')&&!allDialogueItems().some(q=>q.id==='${id}')`),true);
const phoneReadings=plain(ev('CHAPTER_DIALOGUES.find(q=>q.id==="ch4-phone-answer").acceptedReadings'));
assert.ok(phoneReadings.includes('ごにななごのにななにご'));
// The timed assessment keeps its original distribution and all old IDs.
for(let i=0;i<10;i++){ev('startMock()');assert.equal(ev('mock.a.every(q=>wordBy(q.id).ch<=2)&&mock.b.every(q=>sentenceBy(q.id).ch<=2)'),true);}
console.log('PASS: Chapters 3–4 complete source rows, variants, shared membership, exact readings, scoped word modes, numeric scenes, and legacy progress/timed-practice compatibility.');

assert.equal(ev('allDialogueItems().length'),41);
assert.equal(ev('new Set(allDialogueItems().map(q=>q.id)).size'),41);
console.log('PASS: all active canonical scenes remain present after categorisation.');
