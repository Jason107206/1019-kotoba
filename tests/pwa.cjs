'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const {generate,files}=require('../scripts/build-pwa.cjs');
const dist=path.resolve(__dirname,'../dist'),source=fs.readFileSync(path.join(dist,'sw.js'),'utf8');
assert.equal(source,generate(),'Rebuild offline assets with node scripts/build-pwa.cjs');
const manifest=JSON.parse(fs.readFileSync(path.join(dist,'manifest.webmanifest'),'utf8'));
assert.equal(manifest.start_url,'./');assert.equal(manifest.scope,'./');assert.equal(manifest.id,'./');assert.equal(manifest.display,'standalone');
assert.ok(manifest.icons.some(icon=>icon.purpose==='maskable'));
assert.ok(files(dist).includes('icons/lulu-piggy.png'),'The shared lesson illustration must be available offline');
assert.ok(files(dist).includes('icons/lulu-poses.png'),'The Lulu pose atlas must be available offline');
for(const icon of [...manifest.icons,{src:'icons/apple-touch-icon.png',sizes:'180x180'}]){
  const png=fs.readFileSync(path.join(dist,icon.src));assert.equal(png.toString('hex',0,8),'89504e470d0a1a0a');
  assert.equal(`${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`,icon.sizes);
}
const html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
assert.ok(html.includes('rel="manifest"'));assert.ok(html.includes('rel="apple-touch-icon"'));
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g))if(!match[1].startsWith('data:'))assert.ok(files(dist).includes(match[1]),match[1]);
function worker(scope){
  const handlers={},stored=new Map(),deleted=[],requests=[],network=[],state={skip:0,claimed:0,failInstall:false};
  const cache={addAll:async assets=>{if(state.failInstall)throw Error('offline');for(const request of assets){requests.push(request);stored.set(request.url,{body:request.url});}},match:async(request)=>stored.get(typeof request==='string'?request:request.url.split('?')[0])};
  const context=vm.createContext({URL,Request,Promise,self:{registration:{scope},addEventListener:(event,fn)=>handlers[event]=fn,skipWaiting:()=>state.skip++,clients:{claim:async()=>state.claimed++}},caches:{open:async()=>cache,keys:async()=>[vm.runInContext('CACHE_PREFIX',context)+'obsolete','unrelated-app','kotoba-shell-another-scope-old',vm.runInContext('CACHE_NAME',context)],delete:async key=>{deleted.push(key);return true;}},fetch:async request=>{network.push(request.url);return {network:true};}});
  vm.runInContext(source,context);return {handlers,context,stored,deleted,requests,network,state};
}
function pendingEvent(){let promise;return {waitUntil:p=>promise=p,done:()=>promise};}
function fakeButton(){const events={};return {events,hidden:true,disabled:false,textContent:'',addEventListener:(name,fn)=>events[name]=fn};}
function client({supported=true,secure=true,waiting=true,controller=true,installing=false}={}){
  const winEvents={},swEvents={},regEvents={},workerEvents={},install=fakeButton(),update=fakeButton(),messages=[];
  const state={reloads:0,registrations:[],prompted:0},worker={state:installing?'installing':'installed',postMessage:message=>messages.push(message),addEventListener:(name,fn)=>workerEvents[name]=fn};
  const registration={waiting:waiting?worker:null,installing:installing?worker:null,addEventListener:(name,fn)=>regEvents[name]=fn};
  const serviceWorker={controller:controller?{}:null,addEventListener:(name,fn)=>swEvents[name]=fn,register:async(...args)=>{state.registrations.push(args);return registration;}};
  const extra={};
  extra['pwa-update-slot']={append(node){node.parentNode=this;this.child=node;}};extra.app={};
  install.click=()=>install.events.click();
  const document={getElementById:id=>id==='pwa-install'?install:id==='pwa-update'?update:extra[id],documentElement:{lang:'en'}};
  const window={isSecureContext:secure,location:{reload:()=>state.reloads++},addEventListener:(name,fn)=>winEvents[name]=fn};
  let observer;const observers=[];
  vm.runInNewContext(fs.readFileSync(path.join(dist,'pwa.js'),'utf8'),{document,window,navigator:supported?{serviceWorker}:{},MutationObserver:class{constructor(fn){observer=fn;observers.push(fn);}observe(){}}});
  return {winEvents,swEvents,regEvents,workerEvents,worker,install,update,messages,state,document,observer,extra,observers};
}
(async()=>{
  for(const scope of ['https://example.com/1019-kotoba/','https://example.com/1019-kotoba/dist/']){
    const w=worker(scope),install=pendingEvent();w.handlers.install(install);await install.done();
    assert.deepEqual(w.requests.map(request=>new URL(request.url).pathname.slice(new URL(scope).pathname.length)).sort(),files(dist));
    assert.equal(w.state.skip,0,'An update must not activate in the middle of a session');
    assert.ok(w.requests.every(request=>request.cache==='reload'));
    for(const suffix of ['', 'index.html','?launch=installed']){
      let response;w.handlers.fetch({request:{url:scope+suffix,method:'GET',mode:'navigate'},respondWith:p=>response=p});
      assert.equal((await response).body,scope+'index.html');
    }
    let response;w.handlers.fetch({request:{url:scope+'kanji-writing.js?cache=1',method:'GET'},respondWith:p=>response=p});assert.ok((await response).body.endsWith('kanji-writing.js'));
    assert.equal(w.network.length,0,'Precached app assets must load offline');
    for(const request of [{url:'https://other.example/app.js',method:'GET'},{url:scope+'app.js',method:'POST'},{url:'https://example.com/other-project/',method:'GET'}])w.handlers.fetch({request,respondWith:()=>assert.fail('Out-of-scope request intercepted')});
    let fallback;w.handlers.fetch({request:{url:scope+'unknown.png',method:'GET'},respondWith:p=>fallback=p});assert.equal((await fallback).network,true);
    const activation=pendingEvent();w.handlers.activate(activation);await activation.done();assert.deepEqual(w.deleted,[vm.runInContext('CACHE_PREFIX',w.context)+'obsolete']);assert.equal(w.state.claimed,1);
    w.handlers.message({data:{type:'UNRELATED'}});assert.equal(w.state.skip,0);
    w.handlers.message({data:{type:'ACTIVATE_UPDATE'}});assert.equal(w.state.skip,1);
    const failure=worker(scope);failure.state.failInstall=true;const failed=pendingEvent();failure.handlers.install(failed);await assert.rejects(failed.done(),/offline/);assert.equal(failure.state.skip,0);
  }
  const c=client();await c.winEvents.load();assert.deepEqual(c.state.registrations[0][0],'./sw.js');assert.equal(c.state.registrations[0][1].scope,'./');assert.equal(c.state.registrations[0][1].updateViaCache,'none');
  assert.equal(c.update.hidden,false);assert.equal(c.state.reloads,0);assert.equal(c.state.prompted,0);
  c.swEvents.controllerchange();assert.equal(c.state.reloads,0);assert.equal(c.update.hidden,true);
  const next=client();await next.winEvents.load();next.update.events.click();assert.equal(next.messages[0].type,'ACTIVATE_UPDATE');assert.equal(next.state.reloads,0);next.swEvents.controllerchange();assert.equal(next.state.reloads,1);
  const fresh=client({waiting:false,controller:false,installing:true});await fresh.winEvents.load();fresh.worker.state='installed';fresh.workerEvents.statechange();assert.equal(fresh.update.hidden,true);
  const updating=client({waiting:false,installing:true});await updating.winEvents.load();updating.worker.state='installed';updating.workerEvents.statechange();assert.equal(updating.update.hidden,false);
  let prevented=false;c.winEvents.beforeinstallprompt({preventDefault:()=>prevented=true,prompt:async()=>c.state.prompted++});assert.equal(prevented,true);assert.equal(c.install.hidden,true);assert.equal(c.state.prompted,0);assert.ok(!html.includes('pwa-install')&&!html.includes('pwa-actions'));
  c.document.documentElement.lang='zh-Hant';c.observer();assert.ok(c.update.innerHTML.includes('更新'));assert.ok(c.update.innerHTML.includes('<svg'));
  assert.equal(client({supported:false}).winEvents.load,undefined);assert.equal(client({secure:false}).winEvents.load,undefined);
  assert.equal(c.update.parentNode,c.extra['pwa-update-slot']);c.update.parentNode=null;c.observers[0]();assert.equal(c.update.parentNode,c.extra['pwa-update-slot']);
  assert.ok(!html.includes('pwa-welcome'));
  console.log('PASS: PWA icons/manifest, reproducible cache revision, complete offline assets, both Pages paths, cache isolation, safe updates, no install button and bilingual controls.');
})().catch(error=>{console.error(error);process.exitCode=1;});
