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
assert.equal(ev('NUMBER_QUESTIONS.filter(q=>!q.sourceIds.length).every(q=>q.chapters.length===0)'),true);
assert.equal(ev('NUMBER_QUESTIONS.filter(q=>["fractions","decimals"].includes(q.type)).every(q=>!q.chapters.length)'),true);
assert.equal(ev('NUMBER_QUESTIONS.find(q=>q.type==="relative"&&q.value[0]==="week"&&q.value[1]===-2).kana'),'にしゅうかんまえ');
for(const type of ['all',...Array.from(ev('NUMBER_TYPES.map(t=>t[0])'))]){ev(`state.numberType='${type}';state.numberChapter='all'`);for(const chapter of ['all','general',...Array.from(ev('numberSelection().available')).map(String)]){ev(`state.numberChapter='${chapter}';startNumberMatching()`);assert.equal(ev('state.numberRound.ids.length>0'),true);assert.equal(ev('state.numberRound.ids.every(id=>numberSelection().items.some(q=>q.id===id))'),true);}}
ev('state.numberType="all";state.numberChapter="all";startNumberMatching()');
for(let i=0;i<ev('NUMBER_QUESTIONS.length');i++){ev(`state.numberRound.index=${i};prepareNumberMatching()`);assert.equal(ev('state.numberRound.choices.length'),4);assert.equal(ev('new Set(state.numberRound.choices.map(c=>c.kana)).size'),4);assert.equal(ev('state.numberRound.choices.every(c=>c.type===numberCurrent().type)'),true);assert.equal(ev('state.numberRound.choices.filter(c=>c.kana===numberCurrent().kana).length'),1);}
ev('state.numberRound.index=0;prepareNumberMatching();checkNumberMatching(state.numberRound.choices.find(c=>c.id!==numberCurrent().id).id)');assert.equal(ev('gameProgress().completed'),1);assert.equal(ev('state.numberRound.correct'),0);assert.ok(app.innerHTML.includes('feedback-lulu encouraging'));assert.ok(!app.innerHTML.includes('correct so far'));assert.ok(!app.innerHTML.includes('round-info'));
ev('numberClick({action:"numberNext"});checkNumberMatching(numberCurrent().id)');assert.equal(ev('gameProgress().completed'),2);assert.equal(ev('state.numberRound.correct'),1);assert.ok(app.innerHTML.includes('feedback-lulu happy'));
ev('numberClick({action:"numberRetry"})');assert.equal(ev('state.numberRound.ids.length'),1);assert.equal(ev('state.numberRound.index'),0);
for(const removed of ['numbers','time','days','activities','schedules','places']){assert.equal(ev(`dialogueCategories().some(c=>c.id==='${removed}')`),false);assert.equal(ev(`allDialogueItems().some(q=>q.category==='${removed}')`),false);ev(`state.dialogueBrowse='category';state.dialogueCategory='${removed}';dialogueStudySet()`);assert.equal(ev('state.dialogueCategory'),'introductions');}
assert.equal(ev('allDialogueItems().length'),48);assert.equal(ev('WORDS.length'),338);assert.equal(ev('CHAPTER_DIALOGUES.length'),48);assert.equal(ev('allDialogueItems().some(q=>q.id==="ch4-schedule-question")'),true);
for(const kind of ['dialogue-choice','dialogue-tiles']){ev(`startActivity('${kind}',['attention'],'demonstratives')`);const turns=[...app.innerHTML.matchAll(/class="conversation-turn (you|listener)"/g)].map(m=>m[1]);assert.deepEqual(turns,['you','listener']);assert.ok(app.innerHTML.includes('inline-answer'));}
console.log(`PASS: ${ev('NUMBER_QUESTIONS.length')} questions across all 10 types; Japanese exceptions, exact fractions/decimals, provenance, filters, choices, scoring/retries, category removals and learner-first turns.`);

for(const mode of ['write','vocabulary-rebuild','kanji-writing','sentences']){ev(`state.view='${mode}';begin('${mode}',[${mode==='sentences'?'"p1-1"':'"1-09"'}]);completeRound(false)`);assert.equal(ev('gameProgress().completed'),1);assert.equal(ev('state.round.correct'),0);}
for(const q of ev('NUMBER_QUESTIONS'))assert.equal(ev(`numberPrompt(NUMBER_QUESTIONS.find(q=>q.id===${JSON.stringify(q.id)})).includes(${JSON.stringify(q.kana)})`),false);
console.log('PASS: all shared game trackers count wrong attempts as completed and visual/accessibility prompts never disclose the hiragana answer.');
