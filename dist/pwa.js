'use strict';
(()=>{
  const update=document.getElementById('pwa-update');
  let waitingWorker=null,updateRequested=false;
  const labels=()=>{
    const zh=document.documentElement.lang==='zh-Hant';
    update.innerHTML='<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5m10-4a8 8 0 0 0-14-2m14 12a8 8 0 0 1-14-2"/></svg><span>'+(zh?'更新':'Update')+'</span>';
  };
  const mountUpdate=()=>{const slot=document.getElementById('pwa-update-slot');if(slot&&update.parentNode!==slot)slot.append(update);};
  mountUpdate();new MutationObserver(mountUpdate).observe(document.getElementById('app'),{childList:true});
  labels();new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  window.addEventListener('beforeinstallprompt',event=>event.preventDefault());
  if(!('serviceWorker' in navigator)||!window.isSecureContext)return;
  const offerUpdate=worker=>{waitingWorker=worker;update.hidden=false;};
  update.addEventListener('click',()=>{
    if(!waitingWorker)return;
    updateRequested=true;update.disabled=true;waitingWorker.postMessage({type:'ACTIVATE_UPDATE'});
  });
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    update.hidden=true;waitingWorker=null;if(updateRequested){updateRequested=false;window.location.reload();}
  });
  window.addEventListener('load',async()=>{
    try{
      const registration=await navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'});
      if(registration.waiting)offerUpdate(registration.waiting);
      const watchInstalling=()=>{
        const worker=registration.installing;if(!worker)return;
        const check=()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)offerUpdate(worker);};
        worker.addEventListener('statechange',check);check();
      };
      registration.addEventListener('updatefound',watchInstalling);watchInstalling();
    }catch{/* The online app remains usable if offline setup is unavailable. */}
  });
})();
