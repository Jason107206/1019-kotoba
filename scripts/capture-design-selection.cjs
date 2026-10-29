// Actual app captures. Serve dist on :4173; service workers are blocked for a fresh release.
const fs=require('node:fs'),{execFileSync}=require('node:child_process'),{chromium}=require('playwright');
(async()=>{
 const out='docs/design-selection';fs.mkdirSync(out+'/screenshots',{recursive:true});
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']}),p=await b.newPage({serviceWorkers:'block',reducedMotion:'reduce'});
 const shots=[
  ['overview-mobile',390,'en',"navigate('home')"],['overview-desktop',1440,'zh-Hant',"navigate('home')"],
  ['vocabulary-multi-mobile',360,'en',"state.learningScopes.vocabulary={chapter:['1','3','4'],group:'objects',topic:'all'};navigate('vocabulary-menu')"],
  ['reference-multi-desktop',1440,'zh-Hant',"state.learningScopes.reference={chapter:['1','3','4'],group:'objects',topic:'all'};navigate('bank')"],
  ['grammar-multi-tablet',768,'zh-Hant',"state.learningScopes.grammar={chapter:['1','3','4'],group:'particles',topic:'timetables'};navigate('grammar')"],
  ['pictures-multi-mobile',390,'zh-Hant',"state.learningScopes.pictures={chapter:['2','3'],group:'pictures',topic:'all'};navigate('pictures')"],
  ['numbers-multi-mobile',390,'en',"state.numberChapter=['1','3','4'];state.numberType='all';navigate('number-menu')"],
  ['numbers-multi-desktop',1440,'zh-Hant',"state.numberChapter=['3','4'];state.numberType='all';navigate('number-menu')"],
  ['recall-mobile',390,'en',"state.view='write';begin('write',['1-09'])"],
  ['partial-feedback-mobile',360,'zh-Hant',"state.view='write';begin('write',['1-09']);state.round.b=wordBy(current()).kana;state.round.c='';run('checkWrite')"],
  ['sentence-desktop',1440,'en',"state.learningScopes.grammar={chapter:['1','3','4'],group:'order',topic:'ranges'};learningStart('grammar-guided')"],
  ['handwriting-mobile',390,'en',"state.learningReturn='handwriting-menu';startWordPractice('kanji-writing',['1-09'],'Kanji')"],
  ['mixed-desktop',1440,'en',"navigate('mixed')"],
  ['timed-results-desktop',1440,'en',"startMock();mock.a[0].b=wordBy(mock.a[0].id).kana;finishMock()"]
 ];
 for(const [name,width,lang,setup] of shots){await p.setViewportSize({width,height:900});await p.goto(process.env.KOTOBA_TEST_URL||'http://127.0.0.1:4173');await p.evaluate(({lang,setup})=>{state.language=lang;(0,eval)(setup);render();document.activeElement?.blur();},{lang,setup});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(100);await p.screenshot({path:`${out}/screenshots/${name}.png`,fullPage:width>=768});
  if(name==='vocabulary-multi-mobile'||name==='pictures-multi-mobile'){await p.evaluate(()=>document.querySelector('[data-lexical-id],[data-learning-scene]').scrollIntoView({block:'start'}));await p.screenshot({path:`${out}/screenshots/${name}-content.png`});}
 }
 const old=execFileSync('git',['show','d675276:dist/icons/icon.svg'],{encoding:'utf8'}),current=fs.readFileSync('dist/icons/icon.svg','utf8');
 const sizes=[16,32,48,96,180];
 let html='<style>body{margin:0;padding:32px;background:#fdf8ff;color:#302635;font:16px/1.5 system-ui}h1,h2{margin:0 0 16px}.rows{display:grid;gap:24px}.row{display:flex;align-items:end;gap:32px;border:1px solid #cac4d0;border-radius:20px;padding:24px;background:white}.cell{text-align:center}.cell svg{display:block;margin:auto}.cell p{margin:8px 0 0}.large{display:flex;gap:32px;margin-top:24px}.mask{border-radius:50%;overflow:hidden}</style><h1>Lulu icon · same face at every size</h1><div class="rows">';
 for(const [label,svg] of [['Before · latest main',old],['After · rounded ears and contoured snout',current]])html+='<section><h2>'+label+'</h2><div class="row">'+sizes.map(size=>`<div class="cell"><div style="width:${Math.max(size,48)}px">${svg.replace('<svg ','<svg style="width:'+size+'px;height:'+size+'px" ')}</div><p>${size}px</p></div>`).join('')+'</div></section>';
 html+='</div><div class="large"><div class="cell"><h2>Maskable circular crop</h2><div class="mask" style="width:256px;height:256px">'+current+'</div></div><div class="cell"><h2>80% safe circle · ears intact</h2><div style="width:256px;height:256px">'+current.replace('</svg>','<circle cx="256" cy="256" r="204.8" fill="none" stroke="#6750a4" stroke-width="3" stroke-dasharray="8 8"/></svg>')+'</div></div></div>';
 await p.setViewportSize({width:1100,height:900});await p.setContent(html);await p.screenshot({path:out+'/icon-comparison.png',fullPage:true});
 fs.writeFileSync(out+'/icon-comparison.html','<!doctype html><html lang="en"><meta charset="utf-8"><title>Lulu icon review</title>'+html+'</html>');
 await b.close();console.log('Saved 16 app screenshots plus favicon-size/maskable icon comparison.');
})();
