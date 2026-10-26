'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage({serviceWorkers:'block'}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.KOTOBA_TEST_URL||'http://127.0.0.1:4173');
 for(const width of [320,390,1440])for(const language of ['en','zh-Hant']){
  await page.setViewportSize({width,height:900});await page.evaluate(language=>{state.language=language;selectDialogueCategory('wh-words')},language);
  const ids=await page.evaluate(()=>dialogueStudySet().items.map(q=>q.id));
  for(const id of ids){const chip=page.locator(`[data-dialogue-expression="${id}"]`);await chip.scrollIntoViewIfNeeded();await chip.click();assert.equal(await page.locator('.expression-chip-row [aria-pressed="true"]').count(),1);assert.equal(await page.locator('.expression-chip-row .selected').getAttribute('data-dialogue-expression'),id);assert.equal(await page.locator('.conversation-card').getAttribute('data-dialogue-guide'),id);assert.equal(await page.locator('.conversation-notes').textContent(),await page.evaluate(()=>translateText(dialogueStudySet().items.find(q=>q.id===selectedDialogueExpression).why)));assert.equal(await page.locator('.wh-target').textContent(),await page.evaluate(()=>wordBy(dialogueStudySet().items.find(q=>q.id===selectedDialogueExpression).word).kana));}
  for(const kind of ['dialogue-choice','dialogue-tiles']){
   await page.evaluate(kind=>{startDialoguePractice(kind);state.activity.ids=['wh-words-2-36'];state.activity.index=0;prepareActivity();render()},kind);
   assert.equal(await page.locator('.inline-answer').textContent(),'＿＿＿');assert.equal(await page.locator('.reply-tokens,.reply-placeholder').count(),0);
   if(kind==='dialogue-choice')await page.locator('[data-activity-choice="wh-words-2-36"]').click();else{await page.evaluate(()=>{const a=state.activity;for(const unit of kanaUnits(activityCurrent().kana))activityClick({dataset:{activityTile:String(a.tileBank.findIndex((t,i)=>t===unit&&!a.chosen.includes(i)))}})});assert.equal(await page.locator('.inline-answer').textContent(),'なん');await page.evaluate(()=>checkActivity());}
   assert.equal(await page.locator('.inline-answer').textContent(),'なん');assert.equal(await page.locator('.reply-feedback.correct').count(),1);assert.equal(await page.evaluate(()=>state.activity.correct),1);
   await page.evaluate(()=>{state.activity.index=0;prepareActivity();render()});assert.equal(await page.locator('.inline-answer').textContent(),'＿＿＿');
   await page.evaluate(()=>selectDialogueCategory('wh-words'));
  }
  // A long-answer fixture exercises the layout without adding learning content.
  await page.evaluate(()=>{startDialoguePractice('dialogue-tiles');const q={...activityCurrent(),sentence:'そちらは{word}ですか。'};state.activity.tileBank=[...'なんじからなんじまで'];state.activity.chosen=state.activity.tileBank.map((_,i)=>i);document.querySelector('#app').innerHTML=localizeMarkup(dialogueExercise(q,true));});
  assert.equal(await page.locator('.inline-reply').textContent(),'そちらはなんじからなんじまでですか。');assert.equal(await page.locator('.inline-answer').evaluate(el=>getComputedStyle(el).textDecorationLine),'underline');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.evaluate(()=>openVocabularyContent('chapter-4'));assert.ok(await page.locator('[data-vocabulary-guide]').count()>0);const shared=await page.evaluate(()=>WORDS.find(w=>w.jp==='そちら').id);assert.equal(await page.locator(`[data-vocabulary-guide="${shared}"]`).count(),1);
  if(language==='zh-Hant')assert.equal(await page.locator('.dialogue-intro h1').textContent(),'第 4 課');
  await page.evaluate(()=>openVocabularyContent('chapter-3'));assert.equal(await page.locator(`[data-vocabulary-guide="${shared}"]`).count(),1);
  await page.evaluate(()=>{state.dialogueBrowse='category';state.dialogueCategory='location-direction';dialogueContent()});assert.equal(await page.evaluate(()=>state.dialogueCategory),'introductions');
  await page.evaluate(()=>selectDialogueCategory('replies'));assert.ok(!await page.evaluate(()=>dialogueStudySet().items.some(q=>wordBy(q.word).jp.includes('たいへん'))));
  if(width===320&&language==='zh-Hant')await page.screenshot({path:'/tmp/kotoba-import-mobile.png',fullPage:true});
 }
 assert.deepEqual(errors,[]);console.log('PASS: every WH chip, one active state, localized conversation/explanation/highlight, inline choice/tiles/reset, long mobile answers, multi-chapter browsing and removed-category recovery at 320/390/1440px in both languages.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
