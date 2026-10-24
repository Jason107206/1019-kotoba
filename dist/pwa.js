'use strict';
(()=>{
  const install=document.getElementById('pwa-install'),update=document.getElementById('pwa-update');
  let installPrompt=null,waitingWorker=null,updateRequested=false;
  const labels=()=>{
    const zh=document.documentElement.lang==='zh-Hant';
    install.textContent=zh?'安裝應用程式':'Install app';
    update.textContent=zh?'更新':'Update';
  };
  const mountUpdate=()=>{const slot=document.getElementById('pwa-update-slot');if(slot&&update.parentNode!==slot)slot.append(update);};
  mountUpdate();new MutationObserver(mountUpdate).observe(document.getElementById('app'),{childList:true});
  labels();new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  window.addEventListener('beforeinstallprompt',event=>{
    event.preventDefault();installPrompt=event;install.hidden=false;
  });
  window.addEventListener('appinstalled',()=>{installPrompt=null;install.hidden=true;});
  install.addEventListener('click',async()=>{
    const prompt=installPrompt;if(!prompt)return;
    installPrompt=null;install.hidden=true;
    try{await prompt.prompt();await prompt.userChoice;}catch{/* Browser controls installation availability. */}
  });
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
