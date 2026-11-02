'use strict';
// Recovery worker for the site-root scope. An earlier Pages deploy cached a
// broken quiz2.js there, and that worker kept serving it after the file was fixed.
self.addEventListener('install',()=>{self.skipWaiting();});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith('kotoba-shell-')).map(key=>caches.delete(key)));
    await self.clients.claim();
    const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    const next=new URL('dist/',self.registration.scope).href;
    await Promise.all(windows.map(client=>client.navigate(next)));
  })());
});
