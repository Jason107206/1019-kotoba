'use strict';
// Generated into dist/sw.js with a revision derived from every deployable asset.
const CACHE_PREFIX='kotoba-shell-'+encodeURIComponent(new URL(self.registration.scope).pathname)+'-';
const CACHE_NAME=CACHE_PREFIX+'2b8db46414e4e264867b';
const PRECACHE=[".nojekyll","activities.js","app.js","content.js","hiragana.js","i18n.js","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","icons/icon.svg","icons/lulu-feedback.png","icons/lulu-piggy.png","icons/lulu-poses.png","icons/maskable-512.png","index.html","kanji-writing.js","manifest.webmanifest","pwa.js","style.css","vocabulary-rebuild.js"];
const appUrl=path=>new URL(path,self.registration.scope).href;
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(PRECACHE.map(path=>new Request(appUrl(path),{cache:'reload'})))));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(CACHE_PREFIX)&&key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('message',event=>{
  if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();
});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url),scope=new URL(self.registration.scope);
  if(request.method!=='GET'||url.origin!==scope.origin||!url.href.startsWith(scope.href))return;
  // Pin the HTML and scripts to one complete release until the user updates.
  const navigation=request.mode==='navigate'&&(url.pathname===scope.pathname||url.pathname===scope.pathname+'index.html');
  event.respondWith(caches.open(CACHE_NAME).then(async cache=>{
    const cached=await cache.match(navigation?appUrl('index.html'):request,{ignoreSearch:true});
    return cached||fetch(request);
  }));
});
