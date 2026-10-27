'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const app={innerHTML:''},storage={};
const ctx=vm.createContext({console,Date,Math,JSON,Number,String,Array,Object,Map,Set,RegExp,document:{querySelector:s=>s==='#app'?app:null,querySelectorAll:()=>[],addEventListener(){}},window:{scrollTo(){}},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},setInterval(){},setTimeout(){},clearTimeout(){}});
const scripts=[...fs.readFileSync('dist/index.html','utf8').matchAll(/<script defer src="([^"]+)"/g)].map(m=>m[1]).filter(s=>s!=='pwa.js');
for(const script of scripts)vm.runInContext(fs.readFileSync('dist/'+script,'utf8'),ctx,{filename:script});
const ev=s=>vm.runInContext(s,ctx);
const fixtures={integerReading:[[0,'ぜろ'],[125,'ひゃくにじゅうご'],[300,'さんびゃく'],[600,'ろっぴゃく'],[800,'はっぴゃく'],[3000,'さんぜん'],[8000,'はっせん'],[8750000,'はっぴゃくななじゅうごまん'],[10000000,'せんまん']],ageReading:[[1,'いっさい'],[8,'はっさい'],[10,'じゅっさい'],[18,'じゅうはっさい'],[20,'はたち'],[21,'にじゅういっさい'],[29,'にじゅうきゅうさい'],[40,'よんじゅっさい']],floorNumberReading:[[1,'いっかい'],[3,'さんがい'],[6,'ろっかい'],[8,'はちかい'],[10,'じゅっかい'],[16,'じゅうろっかい'],[20,'にじゅっかい'],[23,'にじゅうさんがい']],minuteReading:[[1,'いっぷん'],[4,'よんぷん'],[6,'ろっぷん'],[8,'はっぷん'],[10,'じゅっぷん'],[16,'じゅうろっぷん'],[38,'さんじゅうはっぷん'],[59,'ごじゅうきゅうふん']]};
for(const [fn,rows] of Object.entries(fixtures))for(const [value,reading] of rows)assert.equal(ev(`${fn}(${value})`),reading,`${fn}(${value})`);
for(const [m,d,reading] of [[4,4,'しがつよっか'],[1,1,'いちがつついたち'],[7,17,'しちがつじゅうしちにち'],[9,19,'くがつじゅうくにち'],[4,20,'しがつはつか'],[4,24,'しがつにじゅうよっか'],[4,27,'しがつにじゅうしちにち'],[4,29,'しがつにじゅうくにち']])assert.equal(ev(`dateReading(${m},${d})`),reading);
assert.equal(ev('clockReading(6,8,"AM")'),'ごぜんろくじはっぷん');assert.equal(ev('clockReading(9,4,"PM")'),'ごごくじよんぷん');
assert.equal(ev('clockReading(12,0,"AM")'),'ごぜんれいじ');assert.equal(ev('clockReading(12,8,"PM")'),'ごごれいじはっぷん');
assert.equal(ev('fractionReading(15,100)'),'ひゃくぶんのじゅうご');assert.equal(ev('fractionReading(2,4)'),'よんぶんのに');
assert.equal(ev('decimalReading("0.368")'),'れいてんさんろくはち');assert.equal(ev('decimalReading("0.007")'),'れいてんぜろぜろなな');assert.equal(ev('decimalReading("12.30")'),'じゅうにてんさんぜろ');
for(const bad of ['integerReading(-1)','integerReading(100000000)','fractionReading(1,0)','dateReading(4,31)','dateReading(2,29)','decimalReading(".3")','clockReading(13,8,"AM")'])assert.throws(()=>ev(bad));
assert.equal(ev('new Set(NUMBER_QUESTIONS.map(q=>q.id)).size'),ev('NUMBER_QUESTIONS.length'));
assert.equal(ev('NUMBER_TYPES.every(([type])=>NUMBER_QUESTIONS.some(q=>q.type===type))'),true);
assert.equal(ev('NUMBER_QUESTIONS.every(q=>/^[ぁ-ゖー]+$/u.test(q.kana))'),true);
assert.equal(ev('NUMBER_QUESTIONS.every(q=>q.sourceIds.every(id=>WORDS.some(w=>w.id===id)))'),true);

assert.equal(ev('NUMBER_QUESTIONS.filter(q=>["fractions","decimals"].includes(q.type)).every(q=>!q.chapters.length)'),true);
assert.equal(ev('NUMBER_QUESTIONS.every(q=>q.chapters.every(ch=>q.sourceIds.some(id=>wordChapters(WORDS.find(w=>w.id===id)).includes(ch))||(q.chapterRules||[]).some(id=>{const rule=NUMBER_CHAPTER_SCOPES.find(r=>r.id===id);return rule.type===q.type&&rule.chapters.includes(ch)&&rule.sourceIds.every(id=>wordChapters(WORDS.find(w=>w.id===id)).includes(ch))})))'),true);
for(const [chapter,type,minimum] of [[1,'ages',40],[3,'whole',75],[3,'floors',30],[3,'money',20],[4,'clock',120],[4,'weekdays',7],[5,'dates',100]])assert.ok(ev(`NUMBER_QUESTIONS.filter(q=>q.type==='${type}'&&q.chapters.includes(${chapter})).length`)>=minimum);
const ids=Array.from(ev('NUMBER_QUESTIONS.map(q=>q.id)'));
for(const mode of ['matching','rebuild'])for(const id of ids){
 ev(`state.numberBrowse='all';startNumberPractice('${mode}',[${JSON.stringify(id)}])`);
 const readings=Array.from(ev('numberReadings(numberCurrent())'));
 for(const reading of readings){
  ev(`prepareNumberMatching();{const r=state.numberRound,units=r.mode==='rebuild'?numberCharacters(${JSON.stringify(reading)}):numberSegments(numberCurrent(),${JSON.stringify(reading)});for(const unit of units){const index=r.tileBank.findIndex((u,i)=>u===unit&&!r.chosen.includes(i));if(index<0)throw Error('Missing answer tile '+unit);r.chosen.push(index);}}`);
  assert.equal(ev('numberAnswerReady()'),true);ev('checkNumberMatching()');assert.equal(ev('state.numberRound.result'),true,`${mode}:${id}:${reading}`);
 }
}
assert.deepEqual(Array.from(ev('integerSegments(125)')),['ひゃく','にじゅう','ご']);
assert.deepEqual(Array.from(ev('numberCharacters("か\\u3099きゅう")')),['が','き','ゅ','う']);
assert.equal(ev('rebuildCorrect("さんひ\\u3099ゃく","さんびゃく")'),true);
// Duplicate tiles retain independent identities; swapping equal tiles is still correct.
ev(`state.numberBrowse='all';startNumberPractice('matching',[NUMBER_QUESTIONS.find(q=>q.type==='decimals'&&q.value==='0.007').id]);{const r=state.numberRound;for(const unit of numberSegments(numberCurrent()))r.chosen.push(r.tileBank.findIndex((u,i)=>u===unit&&!r.chosen.includes(i)));const repeated=r.chosen.map((id,i)=>[id,i]).filter(([id])=>r.tileBank[id]==='ぜろ');[r.chosen[repeated[0][1]],r.chosen[repeated[1][1]]]=[r.chosen[repeated[1][1]],r.chosen[repeated[0][1]]];}checkNumberMatching()`);
assert.equal(ev('state.numberRound.result'),true);
ev(`startNumberPractice('matching',[NUMBER_QUESTIONS.find(q=>q.type==='whole'&&q.value===125).id]);{const r=state.numberRound;for(const unit of numberSegments(numberCurrent()).reverse())r.chosen.push(r.tileBank.findIndex((u,i)=>u===unit&&!r.chosen.includes(i)));}checkNumberMatching()`);
assert.equal(ev('state.numberRound.result'),false);assert.equal(ev('state.numberRound.correct'),0);assert.equal(ev('gameProgress().completed'),1);assert.ok(app.innerHTML.includes('feedback-lulu encouraging'));
ev('numberClick({action:"numberNext"})');assert.ok(app.innerHTML.includes('numberRetry'));assert.ok(!app.innerHTML.includes('footer-line'));ev('numberClick({action:"numberRetry"})');assert.equal(ev('state.numberRound.ids.length'),1);assert.equal(ev('state.numberRound.mode'),'matching');
for(const browse of ['all','category','chapter']){
 const keys=browse==='all'?['all']:browse==='category'?Array.from(ev('NUMBER_TYPES.map(t=>t[0])')):['1','3','4','5'];
 for(const key of keys)for(const mode of ['matching','rebuild']){
  ev(`state.numberBrowse='${browse}';state.numberType='${key}';state.numberChapter='${key}';state.numberPage=0;state.view='number-menu';render()`);
  const scopeIds=Array.from(ev('numberSelection().items.map(q=>q.id)')).sort();assert.ok(scopeIds.length);
  ev(`startNumberPractice('${mode}')`);assert.deepEqual(Array.from(ev('state.numberRound.ids')).sort(),scopeIds);
  assert.ok(!app.innerHTML.includes('footer-line'));assert.ok(!app.innerHTML.includes('breadcrumb-row'));assert.ok(!app.innerHTML.includes('correct so far'));
  ev(`state.numberType='invalid';state.numberChapter='invalid';gameBack()`);assert.equal(ev('state.numberBrowse'),browse);assert.deepEqual(Array.from(ev('numberSelection().items.map(q=>q.id)')).sort(),scopeIds);assert.ok(app.innerHTML.includes('footer-line'));
 }
}
for(const mode of ['write','vocabulary-rebuild','kanji-writing','sentences']){ev(`state.view='${mode}';begin('${mode}',[${mode==='sentences'?'"p1-1"':'"1-09"'}]);completeRound(false)`);assert.equal(ev('gameProgress().completed'),1);assert.equal(ev('state.round.correct'),0);}
for(const q of ev('NUMBER_QUESTIONS'))assert.equal(ev(`numberPrompt(NUMBER_QUESTIONS.find(q=>q.id===${JSON.stringify(q.id)})).includes(${JSON.stringify(q.kana)})`),false);
assert.equal(ev('allDialogueItems().length'),48);assert.equal(ev('WORDS.length'),338);
console.log('PASS: all number readings and variants in both reconstruction modes; curriculum scopes, duplicate/Unicode tiles, ordered validation, retry, navigation, feedback, progress and footer visibility.');
