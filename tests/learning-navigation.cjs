const assert=require('node:assert/strict'),fs=require('node:fs'),{app,ev,plain,storage}=require('./runtime.cjs')();
assert.equal(ev('WORD_CLASSIFICATION.size'),338);assert.equal(ev('LEARNING_TAXONOMY.length'),12);assert.equal(ev('new Set(LEARNING_TAXONOMY.flatMap(g=>g.ids)).size'),338);assert.equal(ev('LEARNING_TAXONOMY.flatMap(g=>g.ids).length'),338);
assert.ok(ev('LEARNING_TAXONOMY.every(g=>g.description&&g.descriptionZh&&g.zh&&g.subgroups.every(s=>s.label&&s.zh&&s.ids.length))'));
for(const [id,group,sub] of [['1-18','numbers','counters'],['2-27','travel','vehicles'],['4-46','linking','particles'],['4-33','actions','events'],['csv-a0827d7777003ef6','time','calendar'],['csv-9263b75441c6fb63','time','relative'],['2-c1','everyday','attention']])assert.deepEqual(plain(ev(`WORD_CLASSIFICATION.get('${id}')`)).group,group);
assert.equal(ev('WORDS.filter(wordGameReady).length'),328);assert.equal(ev('scopedWords("reference").length'),338);assert.equal(ev('scopedWords("vocabulary",true).length'),328);
const crypto=require('node:crypto'),baseline=require('../reports/navigation-baseline.json');for(const [name,expression] of Object.entries(baseline.expressions))assert.equal(crypto.createHash('sha256').update(ev('JSON.stringify('+expression+')')).digest('hex'),baseline.hashes[name],name+' must preserve source content and scoring');
const scopes=['vocabulary','reference','handwriting','grammar','pictures'];let combinations=0;
for(const key of scopes)for(const ch of ['all','1','2','3','4','5','6']){
 ev(`state.learningScopes['${key}']={chapter:'${ch}',group:'all',topic:'all'}`);
 const groups=plain(ev(`scopeOptions('${key}').groups`));
 for(const [group] of groups){ev(`learningScope('${key}').group='${group}';learningScope('${key}').topic='all'`);
  const topics=plain(ev(`scopeOptions('${key}').topics`));
  for(const [topic] of topics){ev(`learningScope('${key}').topic='${topic}'`);combinations++;
   if(['vocabulary','reference','handwriting'].includes(key)){
    const ids=plain(ev(`scopedWords('${key}',${key!=='reference'}).map(w=>w.id)`));assert.equal(new Set(ids).size,ids.length);
    assert.ok(ev(`scopedWords('${key}',${key!=='reference'}).every(w=>matchesChapter(w,'${ch}'))`));
    ev(`state.view='${key==='reference'?'bank':key==='handwriting'?'handwriting-menu':'vocabulary-content'}';render()`);
    if(key!=='handwriting')assert.ok(app.innerHTML.includes(`${ids.filter(id=>ev(`wordGameReady(wordBy('${id}'))`)).length} `));
   }else if(key==='grammar'){
    const q=plain(ev('grammarExercises()')),scenes=plain(ev('grammarScenes()'));
    assert.equal(new Set(q.map(x=>x.id)).size,q.length);assert.ok(ev(`grammarExercises().every(q=>matchesChapter({chapters:exerciseChapters(q)},'${ch}'))`));
    assert.ok(ev(`grammarScenes().every(q=>matchesChapter(q,'${ch}'))`));ev(`state.view='grammar';render()`);
   }else{assert.ok(ev(`pictureScenes().every(q=>matchesChapter(q,'${ch}'))`));ev(`state.view='pictures';render()`);}
   assert.ok(!app.innerHTML.includes('undefined'),key+ch+group+topic);
  }
 }
}
assert.equal(ev('SCENE_META.size'),41);assert.equal(ev('DIALOGUE_ENTRIES.every(q=>SCENE_META.has(q.id))'),true);assert.equal(ev('new Set(FAMILY_DEFS.flatMap(f=>f[3])).size'),18);assert.equal(ev('PATTERNS.every(p=>FAMILY_BY_PATTERN.has(p.id))'),true);
for(const q of plain(ev('DIALOGUE_ENTRIES'))){const home=ev(`SCENE_META.get('${q.id}').home`);ev(`state.learningScopes['${home==='grammar'?'grammar':'pictures'}']={chapter:'all',group:'${home==='grammar'?'questions':home}',topic:'all'}`);const list=plain(ev(home==='grammar'?'grammarScenes().map(q=>q.id)':'pictureScenes().map(q=>q.id)'));assert.ok(list.includes(q.id));assert.ok(ev(`conversationCard(DIALOGUE_ENTRIES.find(q=>q.id==='${q.id}')).includes('conversation-turn')`));}
// Launch lists equal the selected scope; chapter and content selection intersect.
ev(`state.learningScopes.vocabulary={chapter:'5',group:'travel',topic:'all'};state.learningLaunchScope='vocabulary'`);const selected=plain(ev('scopedWords("vocabulary",true).map(w=>w.id)')).sort();ev(`learningStart('recall')`);assert.deepEqual(plain(ev('state.round.ids')).sort(),selected);ev('gameBack()');assert.deepEqual(plain(ev('learningScope("vocabulary").chapter')),['5']);assert.equal(ev('learningScope("vocabulary").group'),'travel');
ev(`state.learningScopes.grammar={chapter:'2',group:'order',topic:'ownership'};learningStart('grammar-independent')`);assert.ok(ev('state.round.ids.every(id=>sentenceBy(id).ch===2&&FAMILY_BY_PATTERN.get(sentenceBy(id).pattern)==="ownership")'));ev('gameBack()');assert.equal(ev('state.view'),'grammar');assert.deepEqual(plain(ev('learningScope("grammar").chapter')),['2']);
for(const key of ['source-vocabulary','source-expressions','occupations','locations','schedules']){ev(`learningScope('vocabulary').chapter='all';openVocabularyContent('category-${key}')`);assert.equal(ev('learningScope("vocabulary").group'),ev(`migrateCategory('${key}')`));}
ev(`learningScope('vocabulary').chapter='4';learningScope('vocabulary').group='time';save();run('toggleLanguage')`);assert.deepEqual(plain(ev('learningScope("vocabulary").chapter')),['4']);assert.equal(JSON.parse(storage['kotoba-ch12-v1']).learningScopes.vocabulary.group,'time');
// Learner-visible text and accessibility labels must not contain provenance or paper framing.
const prohibited=/past papers?|exam[- ]aligned|paper[- ]format|based on.*paper|marking scheme|official answer|missing pages|\bPDF\b|\bCSV\b|20(?:23|24|25|26)\/|\bPart [ABCD]\b|[ABC] · (?:HIRAGANA|KANJI|Meaning)|試卷|考古題|官方答案|評分準則|缺頁|匯入檔案|模擬測驗|考試練習|Content sources|content-repairs\.js/i;
function check(html,where){const text=html.replace(/<[^>]+>/g,' '),attrs=[...html.matchAll(/(?:aria-label|title|placeholder)="([^"]*)"/g)].map(x=>x[1]).join(' ');assert.ok(!prohibited.test(text+' '+attrs),where+' '+(text+' '+attrs).match(prohibited));}
for(const language of ['en','zh-Hant']){
 ev(`state.language='${language}'`);
 for(const view of ['home','vocabulary-menu','grammar','pictures','number-menu','handwriting-menu','mock','mixed','bank']){ev(`navigate('${view}')`);check(app.innerHTML,language+view);}
 ev('run("scope")');check(app.innerHTML,'dialog');ev('run("closeScope")');
 for(const q of plain(ev('EXAM_BANK'))){ev(`state.learningReturn='grammar';examRound={skill:'wordOrder',stage:'write',items:[EXAM_BANK.find(q=>q.id===${JSON.stringify(q.id)})],index:0,answers:[],checked:true,results:[],earned:0,total:1,ink:[],chosen:[]};state.view='exam-practice';render()`);check(app.innerHTML,language+q.id);}
 for(const q of plain(ev('DIALOGUE_ENTRIES'))){check(ev(`conversationCard(DIALOGUE_ENTRIES.find(q=>q.id==='${q.id}'))`),q.id);}
}
console.log(`PASS: ${combinations} chapter/group/topic scopes; all categories, scenes and patterns reachable; exact launch pools, migrations, language/back persistence and paper-free learning surfaces.`);

assert.deepEqual(plain(ev("restoredNumberScope({numberSelection:{browse:'category',chapter:'5',type:'floors'}})")),{type:'floors',chapter:['all']});assert.deepEqual(plain(ev("restoredNumberScope({numberSelection:{browse:'chapter',chapter:'4',type:'dates'}})")),{type:'all',chapter:['4']});
