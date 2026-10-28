const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']}),c=await b.newContext({viewport:{width:390,height:900}}),p=await c.newPage();
 await p.goto(process.env.KOTOBA_TEST_URL||'http://127.0.0.1:4173');await p.evaluate(()=>navigator.serviceWorker.ready);await p.waitForFunction(()=>!!navigator.serviceWorker.controller);
 const cached=await p.evaluate(async()=>{const keys=await caches.keys(),cache=await caches.open(keys.find(k=>k.startsWith('kotoba-shell-')));return (await cache.keys()).map(r=>new URL(r.url).pathname);});
 for(const path of ['icons/lulu-actions.png','icons/lulu-feedback-new.png','icons/lulu-teaching.png','lulu.js','lulu-objects.js','lulu-word-plans.js'])assert.ok(cached.some(p=>p.endsWith('/'+path)),path);
 await c.setOffline(true);await p.reload();await p.waitForSelector('[data-lulu-section="home"]');
 for(const lang of ['en','zh-Hant'])for(const view of ['vocabulary-menu','grammar','pictures','number-menu','handwriting-menu','mock','mixed','bank']){await p.evaluate(({lang,view})=>{state.language=lang;navigate(view);},{lang,view});assert.equal(await p.locator('[data-art-state="fallback"]').count(),0);}
 await p.evaluate(()=>{state.view='write';begin('write',['1-01']);state.round.b=wordBy(current()).kana;state.round.c='X';run('checkWrite');});
 assert.ok(await p.locator('[data-lulu-outcome="correct"]').count());assert.equal(await p.locator('[data-art-state="fallback"]').count(),0);
 const blobs=await p.evaluate(async()=>Promise.all(Object.values(LULU_ASSETS).map(async a=>{const r=await fetch(a.src);return r.ok&&(await r.blob()).size>1000;})));assert.ok(blobs.every(Boolean));
 await b.close();console.log('PASS: actual service-worker install, offline reload, both languages/all eight sections, graded feedback and every local Lulu atlas fetched offline.');
})();
