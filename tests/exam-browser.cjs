const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
for(const width of [390,1440])for(const language of ['en','zh-Hant']){
 const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:4173');
 await page.evaluate(lang=>{state.language=lang;navigate('exam-practice');},language);
 for(const skill of ['particles','verbForms','wordOrder','whWords','demonstratives','readings','kanji','schedule','exam']){
  await page.evaluate(skill=>exStart(skill,'write'),skill);
  // Inspect every item that could be sampled in this workflow, including number visuals.
  const count=await page.evaluate(()=>examRound.items.length);
  for(let i=0;i<count;i++){
   await page.evaluate(i=>{examRound.index=i;examRound.checked=false;examRound.answers=[];render();},i);
   assert.ok(await page.locator('[data-ex-answer]').count());
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   assert.equal(await page.locator('.token-bank').count(),0);
   const answers=await page.evaluate(()=>examRound.items[examRound.index].answers);
   for(let j=0;j<answers.length;j++)await page.locator(`[data-ex-answer="${j}"]`).fill(answers[j]);
   await page.locator('[data-ex-check]').click();
   assert.ok(await page.evaluate(()=>examRound.results.every(Boolean)));
  }
 }
 await page.evaluate(()=>exStart('whWords','example'));assert.equal(await page.locator('[data-ex-answer]:enabled').count(),0);
 await page.locator('[data-ex-promote]').click();assert.ok(await page.locator('.token-bank').count());
 await page.locator('[data-ex-reveal]').click();await page.locator('[data-ex-promote="write"]').click();assert.equal(await page.locator('.token-bank').count(),0);
 await page.evaluate(()=>{const q=EXAM_BANK.find(q=>q.pictures);examRound.items=[q];examRound.index=0;examRound.checked=false;examRound.answers=[];render();});assert.equal(await page.locator('.demonstrative-scene').count(),3);
 assert.deepEqual(errors,[]);await page.close();
}
await browser.close();console.log('PASS: mobile/desktop × both languages; all skill rounds, exact typed grading, no choices in recall, progression, source scenes and no overflow/browser errors.');})();
