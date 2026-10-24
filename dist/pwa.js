'use strict';
(()=>{
  const install=document.getElementById('pwa-install'),update=document.getElementById('pwa-update');
  let installPrompt=null,waitingWorker=null,updateRequested=false;
  const invite=document.getElementById('pwa-welcome'),inviteInstall=document.getElementById('pwa-welcome-install'),later=document.getElementById('pwa-welcome-later'),help=document.getElementById('pwa-welcome-help');
  const SEEN='kotoba-install-invite-v1';
  const rememberInvite=()=>{try{localStorage.setItem(SEEN,'seen');}catch{}};
  const closeInvite=()=>{rememberInvite();if(invite.open)invite.close();};
  const standalone=()=>navigator.standalone===true||window.matchMedia?.('(display-mode: standalone)').matches===true;
  const showInvite=()=>{let seen=false;try{seen=!!localStorage.getItem(SEEN);}catch{}if(!seen&&!standalone()&&typeof invite.showModal==='function')invite.showModal();};
  later.addEventListener('click',closeInvite);invite.addEventListener('cancel',rememberInvite);
  inviteInstall.addEventListener('click',()=>{if(installPrompt)install.click();else{rememberInvite();help.hidden=false;inviteInstall.hidden=true;}});
  const labels=()=>{
    const zh=document.documentElement.lang==='zh-Hant';
    install.textContent=zh?'安裝應用程式':'Install app';
    document.getElementById('pwa-welcome-title').textContent=zh?'安裝 Kotoba？':'Install Kotoba?';
    document.getElementById('pwa-welcome-copy').textContent=zh?'加到主畫面，方便開啟及離線溫習。':'Add Kotoba to your home screen for quick access and offline study.';
    inviteInstall.textContent=zh?'安裝':'Install';later.textContent=zh?'暫時不用':'Not now';
    const ios=/iPad|iPhone|iPod/.test(navigator.userAgent||'')||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
    help.textContent=ios?(zh?'在 Safari 點選「分享」，再選「加入主畫面」。':'In Safari, tap Share, then Add to Home Screen.'):(zh?'開啟瀏覽器選單，選擇「安裝應用程式」或「加入主畫面」。':'Open your browser menu and choose Install app or Add to Home Screen.');
    update.textContent=zh?'更新':'Update';
  };
  const mountUpdate=()=>{const slot=document.getElementById('pwa-update-slot');if(slot&&update.parentNode!==slot)slot.append(update);};
  mountUpdate();new MutationObserver(mountUpdate).observe(document.getElementById('app'),{childList:true});
  labels();new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  window.addEventListener('beforeinstallprompt',event=>{
    event.preventDefault();installPrompt=event;install.hidden=false;inviteInstall.hidden=false;
  });
  window.addEventListener('appinstalled',()=>{installPrompt=null;install.hidden=true;closeInvite();});
  install.addEventListener('click',async()=>{
    const prompt=installPrompt;if(!prompt)return;
    installPrompt=null;install.hidden=true;closeInvite();
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
    showInvite();
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
