const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.KOTOBA_TEST_URL||'http://127.0.0.1:4173');
 await page.locator('[data-action="toggleLanguage"]').click();
 await page.locator('[data-action="openNavigation"]').click();
 await page.waitForFunction(()=>document.activeElement?.dataset.action==='closeNavigation');
 assert.equal(await page.locator('main').getAttribute('inert'),'');
 await page.locator('.sidebar [data-action="scope"]').focus();
 await page.keyboard.press('Tab');
 assert.equal(await page.evaluate(()=>document.activeElement.className),'brand');
 await page.keyboard.press('Shift+Tab');
 assert.equal(await page.evaluate(()=>document.activeElement.dataset.action),'scope');
 await page.keyboard.press('Escape');
 assert.equal(await page.evaluate(()=>document.activeElement.dataset.action),'openNavigation');
 await page.locator('[data-action="openNavigation"]').click();
 await page.locator('.drawer-nav [data-view="vocabulary-menu"]').click();
 assert.equal(await page.locator('.navigation-open').count(),0);
 assert.equal(await page.evaluate(()=>document.activeElement.id),'main-content');
 await page.locator('[data-vocabulary-practice="write"]').click();
 await page.locator('[data-answer="b"]').fill('がくせい');
 await page.locator('[data-action="toggleLanguage"]').click();
 assert.equal(await page.locator('[data-answer="b"]').inputValue(),'がくせい');
 await page.locator('[data-action="toggleLanguage"]').click();
 // Re-rendering an edited text field keeps its focus and caret.
 await page.locator('[data-answer="b"]').focus();
 await page.evaluate(()=>render());
 assert.equal(await page.evaluate(()=>document.activeElement.dataset.answer),'b');
 await page.locator('.footer-line [data-action="scope"]').click();
 await page.waitForFunction(()=>!!document.activeElement.closest('.modal'));
 await page.keyboard.press('Escape');
 assert.equal(await page.evaluate(()=>document.activeElement.dataset.action),'scope');
 // Every mode and its principal content, practice, feedback and result surfaces.
 const routes=[
 ['home',()=>navigate('home')],
 ['vocabulary',()=>navigate('vocabulary-menu')],
 ['recall',()=>startWordPractice('write',['1-09'],'Selected words')],
 ['recall-feedback',()=>{state.round.b='がくせい';state.round.c='学生';run('checkWrite')}],
 ['round-result',()=>run('next')],
 ['rebuild',()=>startWordPractice('vocabulary-rebuild',['1-09'],'Selected words')],
 ['rebuild-feedback',()=>run('vocabularyReveal')],
 ['dialogue',()=>navigate('dialogue')],
 ['matching',()=>startActivity('dialogue-choice',['offer'],'courtesy')],
 ['matching-feedback',()=>checkActivity('offer')],
 ['dialogue-rebuild',()=>startActivity('dialogue-tiles',['offer'],'courtesy')],
 ['wh-guide',()=>selectDialogueCategory('wh-words')],
 ['wh-practice',()=>startActivity('demonstratives')],
 ['sentences',()=>navigate('sentences')],
 ['sentence-feedback',()=>run('revealSentence')],
 ['kanji-menu',()=>navigate('handwriting-menu')],
 ['kanji-categories',()=>openWordMenu('handwriting','category')],
 ['kanji',()=>startWordPractice('kanji-writing',['1-09'],'Selected words')],
 ['reference',()=>navigate('bank')],
 ['mock-intro',()=>{mock=null;navigate('mock')}],
 ['mock-vocabulary',()=>startMock()],
 ['mock-sentences',()=>{mock.tab='b';render()}],
 ['mock-result',()=>finishMock()],
 ];
 let checks=0;
 for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  for(const language of ['en','zh-Hant']){
   await page.evaluate(language=>{state.language=language;render()},language);
   for(const [name,fn] of routes){
    await page.evaluate(fn);
    const layout=await page.evaluate(()=>({body:document.documentElement.scrollWidth,width:innerWidth,h1:document.querySelectorAll('main h1').length,active:document.querySelectorAll('.drawer-nav [aria-current="page"]').length}));
    assert.ok(layout.body<=layout.width,`${width} ${language} ${name}: overflow ${layout.body}`);
    assert.equal(layout.h1,1,`${language} ${name}: heading`);
    assert.equal(layout.active,1,`${language} ${name}: active destination`);
    checks++;
   }
  }
 }
 // Reference filtering uses the input without losing focus.
 await page.evaluate(()=>{state.language='en';navigate('bank')});
 await page.locator('[data-search]').fill('coffee');
 assert.equal(await page.locator('[data-word-id]').count(),1);
 // Drawer restores normal layout when crossing its breakpoint.
 await page.setViewportSize({width:390,height:844});
 await page.locator('[data-action="openNavigation"]').click();
 await page.setViewportSize({width:1024,height:768});
 await page.waitForFunction(()=>!state.navOpen);
 assert.equal(await page.locator('main[inert]').count(),0);
 assert.deepEqual(errors,[]);
 console.log(`PASS: ${checks} responsive/bilingual screen checks; drawer focus trap, Escape, resizing, active navigation, keyboard focus, saved inputs, modal focus and reference search. No browser errors.`);
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
