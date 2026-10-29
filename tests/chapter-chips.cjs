const assert=require('node:assert/strict'),fs=require('node:fs'),runtime=require('./runtime.cjs');
const {ev,plain,storage,app}=runtime();
const p=s=>plain(ev(s)),equal=(a,b)=>assert.deepEqual(a,b);
for(const [input,expected] of [['3',['3']],[4,['4']],[null,['all']],[[],['all']],[['4','1','3','1'],['1','3','4']],[['all','2'],['all']],[['9','x'],['all']]])equal(p(`normalizeChapters(${JSON.stringify(input)})`),expected);
let selected=['all'];for(const [ch,expected] of [['1',['1']],['3',['1','3']],['4',['1','3','4']],['3',['1','4']],['all',['all']],['2',['2']],['2',['all']]]){selected=p(`toggleChapter(${JSON.stringify(selected)},'${ch}')`);equal(selected,expected);}
// Check every nonempty subset against raw canonical record chapter memberships.
const raw=p('WORDS'),classification=new Map(p('[...WORD_CLASSIFICATION]'));let checked=0;
const overlaps=raw.filter(w=>w.chapters?.length>1);assert.ok(overlaps.length);
for(const key of ['vocabulary','reference','handwriting'])for(let mask=1;mask<64;mask++){
 const chapters=Array.from({length:6},(_,i)=>i+1).filter(ch=>mask&(1<<(ch-1)));
 ev(`state.learningScopes.${key}={chapter:${JSON.stringify(chapters)},group:'all',topic:'all',search:''}`);
 const groups=p(`scopeOptions('${key}').groups`);
 for(const [group] of groups){ev(`learningScope('${key}').group='${group}';learningScope('${key}').topic='all'`);for(const [topic] of p(`scopeOptions('${key}').topics`)){
  ev(`learningScope('${key}').topic='${topic}'`);
  const actual=p(`scopedWords('${key}',${key!=='reference'}).map(w=>w.id)`).sort(),expected=raw.filter(w=>(w.chapters||[w.ch]).some(ch=>chapters.includes(ch))&&(group==='all'||classification.get(w.id).group===group)&&(topic==='all'||classification.get(w.id).subgroup===topic)&&(key==='reference'||ev(`wordGameReady(wordBy('${w.id}'))`))&&(key!=='handwriting'||ev(`hasKanji(wordBy('${w.id}'))`))).map(w=>w.id).sort();
  equal(actual,expected);assert.equal(new Set(actual).size,actual.length);checked++;
 }}
}
// Other skills must equal the ID union of the existing single-chapter pools.
for(const [key,available,expression] of [['grammar',[1,2,3,4],'grammarExercises()'],['pictures',[1,2,3],'pictureScenes()']])for(let mask=1;mask<2**available.length;mask++){
 const chapters=available.filter((_,i)=>mask&(1<<i));ev(`state.learningScopes.${key}={chapter:${JSON.stringify(chapters)},group:'all',topic:'all'}`);
 for(const [group] of p(`scopeOptions('${key}').groups`)){ev(`learningScope('${key}').group='${group}';learningScope('${key}').topic='all'`);for(const [topic] of p(`scopeOptions('${key}').topics`)){
  ev(`learningScope('${key}').topic='${topic}'`);const ex=key==='grammar'&&group==='questions'?'grammarScenes()':key==='pictures'&&topic==='multiple'?'pictureExercises()':expression;
  const actual=p(`${ex}.map(q=>q.id)`).sort(),expected=new Set();for(const ch of chapters){ev(`learningScope('${key}').chapter=['${ch}']`);for(const id of p(`${ex}.map(q=>q.id)`))expected.add(id);}
  ev(`learningScope('${key}').chapter=${JSON.stringify(chapters)}`);equal(actual,[...expected].sort());checked++;
 }}
}
for(let mask=1;mask<16;mask++){
 const chapters=[1,3,4,5].filter((_,i)=>mask&(1<<i));ev(`state.numberChapter=${JSON.stringify(chapters)};state.numberType='all'`);
 const actual=p('numberSelection().items.map(q=>q.id)').sort(),expected=p('NUMBER_QUESTIONS').filter(q=>q.chapters.some(ch=>chapters.includes(ch))).map(q=>q.id).sort();equal(actual,expected);assert.equal(new Set(actual).size,actual.length);checked++;
}
// Exact launch scope, search intersection, child fallback and no readiness expansion.
ev("state.learningScopes.vocabulary={chapter:['1','3','4'],group:'objects',topic:'all',search:''};state.learningLaunchScope='vocabulary';navigate('vocabulary-menu')");const ids=p('scopedWords("vocabulary",true).map(w=>w.id)').sort();assert.ok(ids.length);ev("learningStart('recall')");equal(p('state.round.ids').sort(),ids);ev('gameBack();run("toggleLanguage")');equal(p('learningScope("vocabulary").chapter'),['1','3','4']);assert.ok(app.innerHTML.includes('第 1、3、4 課'));
ev("learningScope('vocabulary').chapter=['1'];learningScope('vocabulary').group='objects';learningScope('vocabulary').topic='stationery';normalizeLearningScope('vocabulary')");assert.equal(ev('learningScope("vocabulary").group'),'all');assert.equal(ev('learningScope("vocabulary").topic'),'all');
ev("state.learningScopes.reference={chapter:['1','3','4'],group:'all',topic:'all',search:'bank'};navigate('bank')");assert.ok(ev('scopedWords("reference").every(w=>/bank/i.test(w.en))'));assert.equal(ev('WORDS.filter(wordGameReady).length'),328);
ev("state.numberChapter=['4'];state.numberType='floors';numberSelection()");assert.equal(ev('state.numberType'),'all');
ev("state.learningScopes.grammar={chapter:['1','3','4'],group:'order',topic:'ranges'};learningStart('grammar-independent')");assert.ok(ev('state.round.ids.length>0&&state.round.ids.every(id=>sentenceBy(id).ch===4)'));ev('gameBack()');equal(p('learningScope("grammar").chapter'),['1','3','4']);
ev("state.learningScopes.vocabulary={chapter:['2'],group:'objects',topic:'stationery',page:1};learningChange('vocabulary','group','objects')");assert.equal(ev('learningScope("vocabulary").topic'),'stationery');assert.equal(ev('learningScope("vocabulary").page'),1);
// Safe migration of schema 2 single selections, schema 1 exclusive Numbers scopes, and reload.
const seed={learningSchema:2,language:'en',learningScopes:{vocabulary:{chapter:'3',group:'places',topic:'all'},grammar:{chapter:'4',group:'particles',topic:'all'}},numberSelection:{chapter:'4',type:'clock'},progress:{words:{'1-09':{wins:2,attempts:3,misses:1,last:true}},sentences:{},matches:{},best:17}};
const migrated=runtime(seed);equal(migrated.plain(migrated.ev('learningScope("vocabulary").chapter')),['3']);equal(migrated.plain(migrated.ev('state.numberChapter')),['4']);assert.equal(migrated.ev('state.numberType'),'clock');assert.equal(migrated.ev('progress.words["1-09"].wins'),2);assert.equal(migrated.ev('progress.best'),17);
const saved=JSON.parse(migrated.storage['kotoba-ch12-v1']);assert.equal(saved.learningSchema,3);equal(saved.learningScopes.vocabulary.chapter,['3']);equal(saved.numberSelection.chapter,['4']);const reload=runtime(saved);equal(reload.plain(reload.ev('learningScope("grammar").chapter')),['4']);
equal(p("restoredNumberScope({numberSelection:{browse:'category',chapter:'4',type:'floors'}})"),{type:'floors',chapter:['all']});equal(p("restoredNumberScope({numberSelection:{browse:'chapter',chapter:'4',type:'dates'}})"),{type:'all',chapter:['4']});
for(const lang of ['en','zh-Hant'])for(const view of ['vocabulary-menu','grammar','pictures','number-menu','handwriting-menu','bank']){ev(`state.language='${lang}';navigate('${view}')`);assert.ok(!app.innerHTML.includes('<select'));assert.ok(app.innerHTML.includes('aria-pressed='));assert.ok(app.innerHTML.includes('<legend>'));assert.ok(!/class="filter-chip"[^>]*>[✓✔]/u.test(app.innerHTML));}
for(const n of [16,32]){const b=fs.readFileSync(`dist/icons/favicon-${n}.png`);assert.equal(b.readUInt32BE(16),n);assert.equal(b.readUInt32BE(20),n);}
console.log(`PASS: ${checked} multi-chapter/group/topic intersections; independent toggle/All rules, canonical deduplication, exact launch pools, search, child fallback, migration/reload/progress, bilingual chip semantics and favicon sizes.`);
