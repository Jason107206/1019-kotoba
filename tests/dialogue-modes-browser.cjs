'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox']});
 try{
  const page=await browser.newPage({serviceWorkers:'block'}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.KOTOBA_TEST_URL||'http://127.0.0.1:4173');
  const ev=fn=>page.evaluate(fn);let checks=0;
  for(const width of [320,390,1440])for(const language of ['en','zh-Hant']){
   await page.setViewportSize({width,height:900});
   await page.evaluate(language=>{state.language=language;dialogueBrowse('all')},language);
   assert.deepEqual(await page.locator('[data-dialogue-browse]').allTextContents(),language==='en'?['All','By category','By chapter']:['全部','按分類','按課次']);
   const cases=[['all',null],...['introductions','courtesy','replies','demonstratives','wh-words'].map(c=>['category',c]),...[1,2,3,4].map(ch=>['chapter',String(ch)])];
   for(const [mode,filter] of cases){
    await page.locator(`[data-dialogue-browse="${mode}"]`).click();
    if(filter)await page.locator(`[data-dialogue-${mode==="category"?'category':'chapter'}="${filter}"]`).click();
    const ids=await ev(()=>dialogueStudySet().items.map(q=>q.id).sort());
    assert.equal(ids.length,mode==='all'?41:mode==='category'?({introductions:5,courtesy:7,replies:4,demonstratives:10,'wh-words':15})[filter]:({1:6,2:19,3:13,4:3})[filter]);
    assert.equal(await page.locator('.dialogue-filter-label,.dialogue-filter-row').count(),mode==='all'?0:2);
    if(mode!=='all')assert.equal(await page.locator('.dialogue-filter-label').textContent(),language==='en'?(mode==='category'?'Category':'Chapter'):(mode==='category'?'分類':'課次'));
    assert.equal(await page.locator('.expression-chip-row button').count(),ids.length);
    const scroll=await page.locator('.expression-chip-row').evaluate(row=>{row.scrollLeft=row.scrollWidth;return row.scrollLeft});
    await page.locator('.expression-chip-row button').last().evaluate(b=>b.click());
    assert.equal(await page.locator('.expression-chip-row').evaluate(row=>row.scrollLeft),scroll);
    const selected=await ev(()=>selectedDialogueExpression);
    assert.deepEqual(await page.locator('.wh-target').allTextContents(),await ev(()=>{const q=dialogueStudySet().items.find(q=>q.id===selectedDialogueExpression);return dialogueForms(q).map(f=>f.target||f.kana)}));
    await page.locator('[data-action="toggleLanguage"]').click();
    await page.locator('[data-action="toggleLanguage"]').click();
    assert.equal(await ev(()=>selectedDialogueExpression),selected);
    if(mode==='chapter'&&filter==='2')assert.equal(await ev(()=>dialogueStudySet().items.filter(q=>q.id.startsWith('this-that-')).length),6);
    for(const kind of ['dialogue-choice','dialogue-tiles']){
     await page.locator(`[data-open-dialogue="${kind}"]`).click();
     assert.deepEqual(await ev(()=>state.activity.ids.slice().sort()),ids);
     assert.equal(await page.locator('.breadcrumb-row,.breadcrumbs').count(),0);
     assert.equal(await page.locator('.topbar .app-title').textContent(),'Kotoba');
     assert.ok(await ev(()=>state.activity.choices.length>=2));
     await ev(()=>{const q=activityCurrent(),a=state.activity;if(q.forms){if(isActivityRebuild(a)){for(const f of q.forms){const part=a.formAnswers[f.role];for(const unit of dialogueCharacters(f.kana))part.chosen.push(part.tileBank.findIndex((u,i)=>u===unit&&!part.chosen.includes(i)));}}else a.selections=q.forms.map(f=>f.id);checkActivity();}else if(isActivityRebuild(state.activity)){const a=state.activity;for(const unit of kanaUnits(vocabularyReading(activityCurrent())))a.chosen.push(a.tileBank.findIndex((t,i)=>t===unit&&!a.chosen.includes(i)));checkActivity()}else checkActivity(activityCurrent().id)});
     assert.equal(await ev(()=>state.activity.correct),1);
     assert.equal(await page.locator('.reply-feedback.correct').count(),1);
     const index=await ev(()=>state.activity.index);
     await page.locator('[data-action="toggleLanguage"]').click();await page.locator('[data-action="toggleLanguage"]').click();
     assert.equal(await ev(()=>state.activity.index),index);
     await ev(()=>activityAction('activityRestart'));
     assert.deepEqual(await ev(()=>state.activity.ids.slice().sort()),ids);
     await ev(()=>{state.activity.missed=[state.activity.ids[0]];activityAction('activityMissed')});
     assert.equal(await ev(()=>state.activity.ids.length),1);
     await page.locator('.topbar [data-action="gameBack"]').click();
     assert.equal(await ev(()=>state.dialogueBrowse),mode);
     assert.deepEqual(await ev(()=>dialogueStudySet().items.map(q=>q.id).sort()),ids);
     assert.equal(await ev(()=>selectedDialogueExpression),selected);
     assert.equal(await page.locator('.expression-chip-row').evaluate(row=>row.scrollLeft),scroll);
     assert.equal(await page.locator('.breadcrumb-row').count(),1);
     assert.equal(await ev(()=>document.documentElement.scrollWidth<=innerWidth),true);checks++;
    }
   }
   // Other games return to real content surfaces, retaining selections and mock state.
   for(const mode of ['write','vocabulary-rebuild','kanji-writing','sentences','mock']){
    await page.evaluate(mode=>{if(mode==='mock'){navigate('mock');startMock()}else if(mode==='sentences')navigate(mode);else startWordSet(mode,'chapter-2')},mode);
    assert.equal(await page.locator('.breadcrumb-row,.breadcrumbs').count(),0);
    const deadline=await ev(()=>mock?.deadline);
    await page.locator('.topbar [data-action="gameBack"]').click();
    assert.equal(await ev(()=>state.view),({write:'vocabulary-content','vocabulary-rebuild':'vocabulary-content','kanji-writing':'handwriting-menu',sentences:'sentence-menu',mock:'mock-menu'})[mode]);
    assert.equal(await page.locator('.breadcrumb-row').count(),1);
    if(mode==='mock'){await page.locator('[data-action="resumeMock"]').click();assert.equal(await ev(()=>mock.deadline),deadline);}
   }
  }
  await page.setViewportSize({width:390,height:900});
  await ev(()=>{state.language='zh-Hant';selectDialogueChapter(2);selectDialogueExpression('this-that-2-05')});
  await page.screenshot({path:'/tmp/kotoba-dialogue-chapter.png',fullPage:true});
  await ev(()=>startDialoguePractice('dialogue-tiles'));
  await page.screenshot({path:'/tmp/kotoba-dialogue-game-no-breadcrumb.png',fullPage:true});
  assert.deepEqual(errors,[]);
  console.log(`PASS: ${checks} filtered game launches, all/category/chapter guides, Chapter 2 demonstratives, highlighting, scroll retention, language switching, retries and game back destinations at 320/390/1440px.`);
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
