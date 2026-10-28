// Requires the local preview at :4173. These are actual rendered-app captures.
const fs=require('node:fs'),{chromium}=require('playwright');
(async()=>{
 const dir='docs/visual-review',out=dir+'/screenshots';fs.mkdirSync(out,{recursive:true});
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:390,height:900},serviceWorkers:'block',reducedMotion:'reduce'});
 async function screen(name,width,language,setup){await p.setViewportSize({width,height:width>1000?1000:900});await p.goto('http://127.0.0.1:4173');await p.evaluate(({language,setup})=>{state.language=language;(0,eval)(setup);render();},{language,setup});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(150);await p.screenshot({path:out+'/'+name+'.png',fullPage:true});}
 await screen('after-overview-390-en',390,'en',"navigate('home')");
 await screen('after-overview-1440-zh',1440,'zh-Hant',"navigate('home')");
 await screen('after-self-recall-390',390,'en',"state.view='write';begin('write',['1-01'])");
 await screen('after-partial-feedback-360',360,'zh-Hant',"state.view='write';begin('write',['1-09']);state.round.b=wordBy(current()).kana;state.round.c='';run('checkWrite')");
 await screen('after-object-reference-1440',1440,'en',"state.learningScopes.reference={chapter:'2',group:'objects',topic:'all'};navigate('bank')");
 await screen('after-spatial-scenes-390',390,'en',"state.learningScopes.pictures={chapter:'2',group:'pictures',topic:'standalone'};navigate('pictures')");
 await screen('after-grammar-768-zh',768,'zh-Hant',"state.learningScopes.grammar={chapter:'all',group:'all',topic:'all'};navigate('grammar')");
 await screen('after-number-clock-390',390,'zh-Hant',"startNumberPractice('rebuild',[NUMBER_QUESTIONS.find(q=>q.type==='clock').id])");
 await screen('after-mixed-1440',1440,'en',"navigate('mixed')");
 await screen('after-timed-intro-360',360,'en',"navigate('mock')");
 await screen('after-timed-results-1440',1440,'zh-Hant',"startMock();mock.a[0].b=wordBy(mock.a[0].id).kana;finishMock()");
 await screen('after-handwriting-390',390,'en',"startWordPractice('kanji-writing',['1-09'],'Kanji')");
 const sheet=await p.evaluate(()=>{
  state.language='en';const poses=[['happy','Correct · retained'],['clap','Correct A · seated clapping'],['proud','Correct B · star badge'],['hop','Correct C · party hop'],['encouraging','Support · retained'],['puzzled','Wrong A · puzzled'],['disappointed','Wrong B · gentle disappointment'],['review','Wrong C · ready to retry']];
  return `<h1>Lulu feedback · eight distinct poses</h1><p>Four correct poses and four gentle support poses. Six new transparent illustrations; the original two are retained.</p><div class="review-grid">${poses.map(([pose,label])=>`<figure>${luluSprite(pose)}<figcaption>${label}</figcaption></figure>`).join('')}</div>`;
 });
 const style='<style>body{margin:0;padding:32px;background:#faf7fc;color:#533c50;font:16px/1.5 system-ui}h1{margin:0}.review-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:28px}.review-grid figure{margin:0;background:white;border:1px solid #e4d8e7;border-radius:20px;padding:16px;text-align:center}.review-grid .lulu-art{width:100%;height:215px}.review-grid figcaption{margin-top:12px;font-weight:600}</style>';
 const html='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Lulu feedback contact sheet</title><link rel="stylesheet" href="../../dist/style.css">'+style+'<body>'+sheet.replaceAll('href="icons/','href="../../dist/icons/')+'</body></html>';
 fs.writeFileSync(dir+'/feedback-contact-sheet.html',html);
 await p.setViewportSize({width:1280,height:850});await p.setContent('<link rel="stylesheet" href="http://127.0.0.1:4173/style.css">'+style+sheet.replaceAll('href="icons/','href="http://127.0.0.1:4173/icons/'));await p.waitForTimeout(250);await p.screenshot({path:dir+'/feedback-contact-sheet.png',fullPage:true});
 // A compact teaching gallery makes word/action distinctions reviewable in one artifact.
 await p.goto('http://127.0.0.1:4173');const gallery=await p.evaluate(()=>{state.language='en';const ids=['1-01','1-02','1-07','1-09','1-13','1-10','1-14','4-01','4-02','4-03','4-04','4-05','2-07','2-08','2-09','2-11','2-15','2-16','2-17','4-07','4-08','4-09','csv-e5f8b4417ebfe19c','csv-df823f0054e95444','csv-75b0e4c01e1d84c5','csv-1ff1d8b46cf7910c','csv-cc1157bdb7daec7d','4-06'];return '<h1>Teaching distinctions · existing words</h1><div class="review-gallery">'+ids.map(id=>{const w=wordBy(id);return '<article>'+vocabularyVisual(w,false)+'<strong>'+esc(w.en)+'</strong><small>'+id+'</small></article>';}).join('')+'</div>';});
 await p.setContent('<link rel="stylesheet" href="http://127.0.0.1:4173/style.css"><style>body{padding:24px;background:#faf7fc;font:16px system-ui;color:#533c50}.review-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.review-gallery article{background:white;padding:12px;border-radius:16px;text-align:center}.review-gallery small{display:block}.vocabulary-visual{margin:0!important}</style>'+gallery.replaceAll('href="icons/','href="http://127.0.0.1:4173/icons/'));await p.waitForTimeout(250);await p.screenshot({path:dir+'/teaching-gallery.png',fullPage:true});
 await b.close();console.log('Saved eight-pose contact sheet, semantic gallery and 12 actual app screenshots.');
})();
