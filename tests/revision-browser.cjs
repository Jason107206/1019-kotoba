'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,headless:true,args:['--no-sandbox']});
 try{
  const context=await browser.newContext({serviceWorkers:'block'}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.KOTOBA_TEST_URL||'http://127.0.0.1:4173');
  const ev=fn=>page.evaluate(fn);
  let screens=0;
  async function layout(){
   const result=await ev(()=>({overflow:document.documentElement.scrollWidth>innerWidth,headings:document.querySelectorAll('main h1').length,install:!!document.querySelector('#pwa-install,.pwa-actions')}));
   assert.equal(result.overflow,false,'No horizontal page overflow');assert.equal(result.headings,1);assert.equal(result.install,false);screens++;
  }
  async function retainScroll(selector,action){
   const before=await page.locator(selector).evaluate(row=>{row.scrollLeft=row.scrollWidth-row.clientWidth;return row.scrollLeft;});
   await action();
   const after=await page.locator(selector).evaluate(row=>row.scrollLeft);
   assert.ok(Math.abs(after-before)<=1,`${selector}: scroll reset ${before} → ${after}`);
  }
  async function feedbackCard(correct){
   const details=await page.locator('.reply-feedback').evaluate(card=>{
    const style=getComputedStyle(card),rect=card.getBoundingClientRect(),body=card.parentElement;
    const bank=body.querySelector('.activity-tile-bank,.activity-options').getBoundingClientRect();
    const explanation=card.querySelector('.activity-explanation'),copy=card.querySelector('.feedback-copy');
    const luminance=color=>color.match(/[\d.]+/g).slice(0,3).map(Number).map(n=>{n/=255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4;}).reduce((sum,n,i)=>sum+n*[.2126,.7152,.0722][i],0);
    const text=luminance(style.color),background=luminance(style.backgroundColor);
    return {background:style.backgroundColor,contrast:(Math.max(text,background)+.05)/(Math.min(text,background)+.05),border:style.borderTopWidth,radius:parseFloat(style.borderTopLeftRadius),padding:parseFloat(style.paddingTop),widthMatches:Math.abs(rect.width-bank.width)<1,leftMatches:Math.abs(rect.left-bank.left)<1,explanation:explanation.textContent,below:explanation.getBoundingClientRect().top>=Math.max(copy.getBoundingClientRect().bottom,card.querySelector('.feedback-lulu').getBoundingClientRect().bottom),controlsNext:card.nextElementSibling.matches('.activity-controls'),status:card.getAttribute('role'),icon:copy.textContent.trim().charAt(0)};
   });
   assert.equal(details.background,correct?'rgb(214, 238, 221)':'rgb(249, 222, 220)');
   assert.ok(details.contrast>=4.5,'Feedback text meets normal-text contrast');
   assert.equal(details.border,'1px');assert.ok(details.radius>=12&&details.padding>=16);
   assert.ok(details.widthMatches&&details.leftMatches,'Card aligns with answer bank');
   assert.equal(details.explanation,await ev(()=>translateText(activityCurrent().why)));
   assert.ok(details.below&&details.controlsNext,'Explanation sits underneath; controls immediately follow card');
   assert.equal(details.status,'status');assert.equal(details.icon,correct?'✓':'✕');
   const sizes=await ev(()=>['.conversation-pig','.feedback-lulu'].map(selector=>{const r=document.querySelector(selector).getBoundingClientRect();return [r.width,r.height]}));
   assert.deepEqual(sizes[0],sizes[1],'Feedback and conversation Lulu share responsive square sizing');
   const before=await ev(()=>JSON.stringify(state.activity));
   await ev(()=>run('toggleLanguage'));
   assert.equal(await page.locator('.reply-feedback .activity-explanation').textContent(),await ev(()=>translateText(activityCurrent().why)));
   await ev(()=>run('toggleLanguage'));
   assert.equal(await ev(()=>JSON.stringify(state.activity)),before,'Language switching preserves the graded answer');
  }
  for(const width of [360,390,1440])for(const language of ['en','zh-Hant']){
   await page.setViewportSize({width,height:900});
   await page.evaluate(language=>{state.language=language;navigate('vocabulary-menu')},language);
   await page.locator('[data-vocabulary-browse="all"]').click();
   assert.equal(await page.locator('[data-vocabulary-guide]').count(),await ev(()=>VOCABULARY_WORDS.length));
   assert.equal(await page.locator('.vocabulary-filter-label').count(),0);
   assert.deepEqual(await page.locator('.vocabulary-selector [data-vocabulary-practice]').evaluateAll(buttons=>buttons.map(b=>[b.dataset.vocabularyPractice,b.classList.contains('primary')])),[['vocabulary-rebuild',false],['write',true]]);
   assert.ok(await page.locator('.vocabulary-selector .dialogue-intro').evaluate(intro=>intro.nextElementSibling.matches('.dialogue-guide-actions')));
   assert.equal(await page.locator('.vocabulary-filter-row').count(),0);await layout();
   await page.locator('[data-vocabulary-browse="category"]').click();
   assert.equal(await page.locator('.vocabulary-filter-label').textContent(),language==='en'?'Category':'分類');
   assert.ok(await page.locator('.vocabulary-filter-row').evaluate(row=>row.previousElementSibling.matches('.vocabulary-filter-label')&&row.nextElementSibling.matches('.dialogue-intro')));
   assert.equal(await page.locator('[data-vocabulary-set]').count(),await ev(()=>VOCABULARY_CATEGORIES.length));
   assert.equal(await page.locator('[data-vocabulary-set="category-demonstratives"],[data-vocabulary-set="category-introductions"]').count(),0);
   // Click the final visible chip without browser auto-scroll changing the baseline.
   await retainScroll('.vocabulary-filter-row',()=>ev(()=>document.querySelector('[data-vocabulary-set="category-languages"]').click()));
   assert.equal(await page.locator('[data-vocabulary-guide]').count(),3);await layout();
   const ids=await ev(()=>vocabularyStudySet(state.vocabularyContentKey).ids.slice().sort().join(','));
   const chipScroll=await page.locator('.vocabulary-filter-row').evaluate(row=>row.scrollLeft);
   await page.locator('[data-vocabulary-practice="vocabulary-rebuild"]').click();
   assert.equal(await ev(()=>state.round.ids.slice().sort().join(',')),ids);
   await page.locator('[data-action="gameBack"]').click();
   assert.equal(await ev(()=>state.vocabularyContentKey),'category-languages');
   assert.equal(await page.locator('.vocabulary-filter-row').evaluate(row=>row.scrollLeft),chipScroll);
   await page.locator('[data-vocabulary-practice="write"]').click();
   assert.equal(await ev(()=>state.round.ids.slice().sort().join(',')),ids);
   assert.equal(await page.locator('.page-head,.vocabulary-selector,.filters').count(),0);
   await page.locator('[data-action="gameBack"]').click();
   await page.locator('[data-vocabulary-browse="chapter"]').click();
   assert.equal(await page.locator('.vocabulary-filter-label').textContent(),language==='en'?'Chapter':'課次');
   await page.locator('[data-vocabulary-set="chapter-2"]').click();
   assert.equal(await page.locator('[data-vocabulary-guide]').count(),await ev(()=>vocabularyStudySet('chapter-2').ids.length));await layout();
   await ev(()=>{state.vocabularyContentKey='category-unknown';render()});
   assert.equal(await ev(()=>state.vocabularyContentKey),'all');
   await ev(()=>{state.dialogueBrowse='category';state.dialogueCategory='replies';navigate('dialogue')});
   assert.equal(await page.locator('.topbar .breadcrumbs').count(),0);
   assert.equal(await page.locator('.breadcrumb-row .breadcrumbs').count(),1);
   assert.equal(await page.locator('.topbar .app-title').textContent(),'Kotoba');await layout();
   await page.locator('[data-dialogue-category="wh-words"]').click();
   assert.equal(await page.locator('[data-dialogue-expression]').count(),17);
   for(const word of ['1-17a','1-17b','1-19a','1-19b','2-36']){
    await retainScroll('.wh-chip-row',()=>page.evaluate(word=>document.querySelector(`[data-dialogue-expression="wh-words-${word}"]`).click(),word));
    assert.equal(await page.locator('.conversation-turn').count(),2);
    assert.equal(await page.locator('.conversation-translation').count(),2);
    const target=await ev(()=>wordBy(demonstrativeItems().find(q=>q.id===selectedWhExpression).word).kana);
    assert.equal(await page.locator('.wh-target').textContent(),target);
    assert.equal(await page.locator('.conversation-turn.you .jp').textContent(),await ev(()=>WH_CONVERSATIONS[demonstrativeItems().find(q=>q.id===selectedWhExpression).word][0][1]));
    assert.ok(await page.locator('.wh-target').evaluate(el=>Number(getComputedStyle(el).fontWeight)>Number(getComputedStyle(el.parentElement).fontWeight)));
    assert.equal(await page.locator('.expression-figure').count(),0);await layout();
   }
   await page.locator('[data-action="toggleLanguage"]').click();
   assert.equal(await ev(()=>selectedWhExpression),'wh-words-2-36');await layout();
   await page.locator('[data-action="toggleLanguage"]').click();
   for(const kind of ['dialogue-choice','dialogue-tiles','demonstratives','wh-tiles']){
    await page.evaluate(kind=>startActivity(kind,kind.startsWith('dialogue')?['thanks-full']:['wh-words-1-19b'],kind.startsWith('dialogue')?'courtesy':null),kind);
    assert.equal(await page.locator('.conversation-exercise .paper').count(),0);
    assert.equal(await page.locator('.topbar .menu-button').count(),0);
    assert.equal(await page.locator('.topbar .back-button').count(),1);
    assert.equal(await page.locator('.reply-feedback').count(),0);await layout();
    if(kind.endsWith('tiles')){
     await ev(()=>{const a=state.activity;for(const unit of kanaUnits(vocabularyReading(activityCurrent())))a.chosen.push(a.tileBank.findIndex((text,i)=>text===unit&&!a.chosen.includes(i)));render()});
     await page.locator('[data-action="activityCheck"]').click();
    }else await ev(()=>checkActivity(activityCurrent().id));
    assert.equal(await ev(()=>state.activity.result),true);
    assert.equal(await page.locator('.reply-feedback .feedback-lulu.happy').count(),1);
    assert.equal(await page.locator('.reply-bubble .reply-feedback').count(),0);
    await feedbackCard(true);
    await layout();
    await ev(()=>activityAction('activityRestart'));
    if(kind.endsWith('tiles'))await page.locator('[data-action="activityReveal"]').click();
    else await ev(()=>checkActivity(state.activity.choices.find(q=>q.id!==activityCurrent().id).id));
    assert.equal(await ev(()=>state.activity.result),false);
    assert.equal(await page.locator('.feedback-lulu.encouraging').count(),1);await feedbackCard(false);await layout();
    await page.locator('.topbar .back-button').click();
    assert.equal(await ev(()=>state.view),'dialogue');
    assert.equal(await ev(()=>state.dialogueCategory),kind.startsWith('dialogue')?'courtesy':'wh-words');
   }
   // A directly opened activity still has an explicit destination, independent of history.
   await ev(()=>{pageHistory.length=0;startActivity('dialogue-tiles',['thanks-full'],'courtesy');pageHistory.length=0;});
   await page.locator('.back-button').click();assert.equal(await ev(()=>state.dialogueCategory),'courtesy');
   // Update remains compact with its icon and coordinated green disabled style.
   await ev(()=>{document.getElementById('pwa-update').hidden=false});await layout();
   assert.equal(await page.locator('#pwa-update .icon').count(),1);
   const background=await page.locator('#pwa-update').evaluate(b=>getComputedStyle(b).backgroundColor);
   assert.equal(background,'rgb(50, 105, 65)');
   await page.locator('#pwa-update').evaluate(b=>b.disabled=true);
   assert.equal(await page.locator('#pwa-update').evaluate(b=>getComputedStyle(b).opacity),'1');
   await page.locator('#pwa-update').evaluate(b=>{b.disabled=false;b.hidden=true});
   const padding=await page.locator('.breadcrumbs').evaluate(nav=>[getComputedStyle(nav).paddingLeft,getComputedStyle(nav).paddingRight,getComputedStyle(nav.closest('main')).paddingLeft]);
   assert.equal(padding[0],padding[2]);assert.equal(padding[1],padding[2]);
  }
  // Every Dialogue chip immediately displays its full target and localized exchange.
  for(const width of [360,1440])for(const language of ['en','zh-Hant']){
   await page.setViewportSize({width,height:900});
   await page.evaluate(language=>{state.language=language;state.dialogueBrowse='category';navigate('dialogue')},language);
   for(const category of ['introductions','courtesy','replies','demonstratives']){
    await retainScroll('.dialogue-filter-row',()=>page.evaluate(category=>selectDialogueCategory(category),category));
    const ids=await ev(()=>dialogueItems(state.dialogueCategory).map(q=>q.id));
    for(const id of ids){
     await retainScroll('.expression-chip-row',()=>page.evaluate(id=>selectDialogueExpression(id),id));
     assert.equal(await page.locator('[data-dialogue-guide]').getAttribute('data-dialogue-guide'),id);
     const expected=await ev(()=>{const q=dialogueItems(state.dialogueCategory).find(q=>q.id===selectedDialogueExpression);return {target:q.target||wordBy(q.word).kana,turn:CONVERSATIONS[q.id][2].find(t=>t[0]==='you')[1]}});
     assert.equal(await page.locator('.wh-target').textContent(),expected.target);
     assert.equal(await page.locator('.conversation-turn.you .jp').textContent(),expected.turn);
     assert.equal(await page.locator('.conversation-translation').count(),await ev(()=>CONVERSATIONS[selectedDialogueExpression][2].length));
     await layout();
    }
   }
   assert.equal(await page.locator('[data-dialogue-category="demonstratives"]').textContent(),language==='en'?'This and That':'這個與那個');
   for(const kind of ['dialogue-choice','dialogue-tiles']){
    await page.locator(`[data-open-dialogue="${kind}"]`).click();
    assert.equal(await ev(()=>state.activity.ids.length),13);
    assert.equal(await ev(()=>state.activity.items.every(q=>[2,3].includes(wordBy(q.word).ch)&&dialogueInCategory(q,'demonstratives'))),true);
    if(await ev(()=>!!activityCurrent().sentence))assert.equal(await page.locator('.reply-bubble .inline-answer').textContent(),'＿＿＿');
    await page.locator('[data-action="gameBack"]').first().click();
   }
   await ev(()=>{selectDialogueCategory('replies');selectDialogueExpression('realise')});
   const situation=language==='en'?'Suddenly notice something':'突然注意到某件事';
   assert.equal(await page.locator('[data-dialogue-expression="realise"]').textContent(),situation);
   for(const kind of ['dialogue-choice','dialogue-tiles']){
    await page.evaluate(kind=>startActivity(kind,['realise'],'replies'),kind);
    assert.equal(await page.locator('.exercise-situation').textContent(),situation);
   }
  }
  await page.setViewportSize({width:390,height:900});
  await ev(()=>{state.language='en';startActivity('dialogue-tiles',['thanks-full'],'courtesy');checkActivity(null,true)});
  await page.screenshot({path:'/tmp/kotoba-dialogue-390.png',fullPage:true});
  await ev(()=>{openVocabularyContent('category-languages')});
  await page.screenshot({path:'/tmp/kotoba-vocabulary-390.png',fullPage:true});
  await ev(()=>selectDialogueCategory('wh-words'));
  await page.screenshot({path:'/tmp/kotoba-wh-390.png',fullPage:true});
  assert.deepEqual(errors,[]);
  console.log(`PASS: ${screens} layouts at 360, 390 and 1440px in both languages; vocabulary order and scoped destinations, retained scroll offsets, WH highlights, feedback cards and Lulu sizes, back navigation, Update states, responsive breadcrumb padding and no page errors.`);
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
