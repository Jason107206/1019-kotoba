'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox']});
 try{
  const page=await browser.newPage({serviceWorkers:'block'}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.KOTOBA_TEST_URL||'http://127.0.0.1:4173');
  const cases=[
   ['2-01','you','This','這個','それはなんですか。','これはほんです。'],
   ['2-02','listener','That','那個','これはなんですか。','それはほんです。'],
   ['2-03','far','That over there','那個（遠處）','あれはなんですか。','あれはほんです。'],
   ['2-04','you','This · Noun','這 · 名詞','それはだれのほんですか。','このほんはわたしのです。'],
   ['2-05','listener','That · Noun','那 · 名詞','これはだれのほんですか。','そのほんはわたしのです。'],
   ['2-06','far','That over there · Noun','那（遠處）· 名詞','あれはだれのほんですか。','あのほんはわたしのです。']
  ];let checks=0;
  for(const width of [320,390,1440])for(const language of ['en','zh-Hant']){
   await page.setViewportSize({width,height:950});
   await page.evaluate(language=>{state.language=language;selectDialogueCategory('demonstratives')},language);
   for(const [word,location,en,zh,opening,reply] of cases){
    const chip=page.locator(`[data-dialogue-expression="this-that-${word}"]`);
    assert.equal(await chip.textContent(),language==='en'?en:zh);
    const scroll=await page.locator('.expression-chip-row').evaluate(row=>{row.scrollLeft=row.scrollWidth;return row.scrollLeft});
    await chip.evaluate(b=>b.click());
    assert.equal(await page.locator('.expression-chip-row').evaluate(row=>row.scrollLeft),scroll);
    assert.equal(await page.locator('.demonstrative-scene').getAttribute('data-object-location'),location);
    assert.equal(await page.locator('[data-scene-person]').count(),2);
    assert.equal(await page.locator('.conversation-turn.listener .jp').textContent(),opening);
    assert.equal(await page.locator('.conversation-turn.you .jp').textContent(),reply);
    assert.equal(await page.locator('.wh-target').textContent(),reply.slice(0,2));
    const geometry=await page.locator('.scene-book').evaluate(book=>{
     const b=book.getBoundingClientRect(),svg=book.closest('svg').getBoundingClientRect();
     return {x:Number(book.dataset.x),y:Number(book.dataset.y),width:b.width,inside:b.left>=svg.left&&b.right<=svg.right&&b.top>=svg.top&&b.bottom<=svg.bottom};
    });
    assert.ok(geometry.inside&&geometry.width>=30);
    assert.equal(geometry.x,location==='you'?165:location==='listener'?335:250);
    assert.equal(geometry.y,location==='far'?65:165);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    const scene=await page.locator('.demonstrative-scene').boundingBox(),conversation=await page.locator('.conversation-stage').boundingBox();
    assert.ok(scene.y+scene.height<=conversation.y);
    if(width===390&&language==='en'&&['2-02','2-03','2-04'].includes(word))await page.screenshot({path:`/tmp/kotoba-scene-${location}.png`,fullPage:true});
    if(width===1440&&language==='zh-Hant'&&word==='2-04')await page.screenshot({path:'/tmp/kotoba-scene-desktop.png',fullPage:true});
    checks++;
   }
   const attention=page.locator('[data-dialogue-expression="attention"]');
   assert.equal(await attention.textContent(),language==='en'?'Get attention':'引起注意');
   const offset=await page.locator('.expression-chip-row').evaluate(row=>row.scrollLeft);
   await attention.evaluate(b=>b.click());
   assert.equal(await page.locator('.expression-chip-row').evaluate(row=>row.scrollLeft),offset);
   assert.equal(await page.locator('.attention-scene').count(),1);
   assert.equal(await page.locator('.scene-book').count(),0);
   assert.equal(await page.locator('.attention-scene [data-scene-person]').count(),2);
   assert.equal(await page.locator('.wh-target').textContent(),'あのう');
   assert.equal(await page.locator('.conversation-turn.listener .jp').textContent(),'はい。');
   assert.ok((await page.locator('.conversation-notes').textContent()).includes('あの'));
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   if(width===390)await page.screenshot({path:`/tmp/kotoba-attention-${language}.png`,fullPage:true});
   for(const kind of ['dialogue-choice','dialogue-tiles']){
    await page.locator(`[data-open-dialogue="${kind}"]`).click();
    assert.equal(await page.evaluate(()=>state.activity.ids.filter(id=>id==='attention').length),1);
    await page.evaluate(()=>{state.activity.index=state.activity.ids.indexOf('attention');prepareActivity();render()});
    assert.equal(await page.locator('.exercise-situation').textContent(),language==='en'?'Getting someone’s attention.':'引起對方注意。');
    await page.locator('[data-action="gameBack"]').click();
    assert.equal(await page.locator('.attention-scene').count(),1);
   }
   checks++;
   await page.evaluate(()=>selectDialogueCategory('courtesy'));
   assert.equal(await page.locator('[data-dialogue-expression="attention"]').count(),0);
   for(const kind of ['dialogue-choice','dialogue-tiles']){
    await page.locator(`[data-open-dialogue="${kind}"]`).click();
    assert.equal(await page.evaluate(()=>state.activity.items.some(q=>q.word==='2-c1')),false);
    await page.locator('[data-action="gameBack"]').click();
   }
  }
  assert.deepEqual(errors,[]);
  console.log(`PASS: ${checks} bilingual demonstrative scenes at 320/390/1440px: physical locations, both speakers, exact dialogues, short labels, highlights, scroll retention, no overflow and Polite category exclusion.`);
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
