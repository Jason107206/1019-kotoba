'use strict';
(()=>{
  const dialog=document.getElementById('update-dialog');
  const update=document.getElementById('pwa-update');
  if(!dialog||!update)return;
  let waitingWorker=null,updateRequested=false,lastFocus=null,open=false;
  const zh=()=>document.documentElement.lang==='zh-Hant';
  const text={
    title:()=>zh()?'有新版本':'Update available',
    description:()=>zh()?'新版本已準備好，更新後即可使用最新內容。':'A new version is ready. Update to get the latest changes.',
    later:()=>zh()?'稍後':'Later',
    update:()=>zh()?'更新':'Update',
    close:()=>zh()?'關閉':'Close'
  };
  const labels=()=>{
    dialog.querySelector('#update-title').textContent=text.title();
    dialog.querySelector('#update-description').textContent=text.description();
    dialog.querySelector('[data-update="dismiss"].button').textContent=text.later();
    dialog.querySelector('.update-close').setAttribute('aria-label',text.close());
    update.innerHTML='<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5m10-4a8 8 0 0 0-14-2m14 12a8 8 0 0 1-14-2"/></svg><span>'+text.update()+'</span>';
    const art=dialog.querySelector('.update-lulu');
    if(art&&!art.childElementCount&&typeof luluSprite==='function')art.innerHTML=luluSprite('happy');
  };
  const focusables=()=>[...dialog.querySelectorAll('button')].filter(el=>!el.disabled);
  const show=()=>{
    if(open)return;
    open=true;lastFocus=document.activeElement;
    dialog.hidden=false;update.hidden=false;
    labels();
    dialog.querySelector('.update-dialog')?.focus();
  };
  const hide=()=>{
    if(!open&&dialog.hidden)return;
    open=false;dialog.hidden=true;update.hidden=true;
    if(lastFocus&&typeof lastFocus.focus==='function')lastFocus.focus();
    lastFocus=null;
  };
  labels();
  new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  window.addEventListener('beforeinstallprompt',event=>event.preventDefault());
  dialog.addEventListener('click',event=>{
    if(event.target.closest('[data-update="dismiss"]'))hide();
  });
  document.addEventListener('keydown',event=>{
    if(!open)return;
    if(event.key==='Escape'){event.preventDefault();hide();return;}
    if(event.key!=='Tab')return;
    const items=focusables();if(!items.length)return;
    const first=items[0],last=items.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  const embedded=window.parent&&window.parent!==window;
  if(embedded){
    if('serviceWorker' in navigator)navigator.serviceWorker.getRegistrations().then(list=>Promise.all(list.map(reg=>reg.unregister()))).catch(()=>{});
    return;
  }
  if(!('serviceWorker' in navigator)||!window.isSecureContext)return;
  const offerUpdate=worker=>{if(open)return;waitingWorker=worker;show();};
  update.addEventListener('click',()=>{
    if(!waitingWorker)return;
    updateRequested=true;update.disabled=true;waitingWorker.postMessage({type:'ACTIVATE_UPDATE'});
  });
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    hide();waitingWorker=null;if(updateRequested){updateRequested=false;window.location.reload();}
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
