'use strict';
// Matching and dialogue content uses the existing quiz-page vocabulary.
const demonstrativeWords=[
  {
    "word": "1-17a",
    "meaning": "Who",
    "clue": "Ask who that person is, using the standard form.",
    "why": "だれ asks who someone is. Use どなた for the polite form.",
    "sentence": "あの人は {word} ですか。",
    "symbol": "?"
  },
  {
    "word": "1-17b",
    "meaning": "Who · polite",
    "clue": "Ask who that person is, using the polite form.",
    "why": "どなた is the polite way to ask who someone is.",
    "sentence": "あの方は {word} ですか。",
    "symbol": "?"
  },
  {
    "word": "1-19a",
    "meaning": "How old",
    "clue": "Ask someone’s age, using the standard form.",
    "why": "なんさい asks how old someone is. Use おいくつ for the polite form.",
    "sentence": "あなたは {word} ですか。",
    "symbol": "18?"
  },
  {
    "word": "1-19b",
    "meaning": "How old · polite",
    "clue": "Ask someone’s age, using the polite form.",
    "why": "おいくつ is the polite way to ask someone’s age.",
    "sentence": "あなたは {word} ですか。",
    "symbol": "18?"
  },
  {
    "word": "2-36",
    "meaning": "What",
    "clue": "Ask what this object is.",
    "why": "なん means what before ですか.",
    "sentence": "これは {word} ですか。",
    "symbol": "?"
  }
];
function demonstrativeItems(){return demonstrativeWords.map(q=>{const w=wordBy(q.word);return {...q,id:`wh-words-${w.id}`,kana:w.kana,zh:w.zh};});}
const DIALOGUES=[
  {
    "id": "meet",
    "word": "1-c1",
    "family": "first-meeting",
    "scene": "You meet someone for the first time.",
    "why": "Use はじめまして when you first meet someone."
  },
  {
    "id": "intro",
    "word": "1-c3d",
    "family": "introduction",
    "scene": "You have just said your name. End with a polite greeting. Use the full phrase.",
    "why": "どうぞよろしくおねがいします is a polite way to end an introduction."
  },
  {
    "id": "likewise",
    "word": "2-d2c",
    "family": "likewise",
    "incoming": "よろしくおねがいします",
    "why": "こちらこそ means “likewise”. Here, add よろしくおねがいします after it."
  },
  {
    "id": "excuse",
    "word": "1-c4",
    "family": "excuse",
    "scene": "You want to ask a stranger their name. What do you say before asking?",
    "why": "Use しつれいですが before asking a personal question, such as someone’s name."
  },
  {
    "id": "name",
    "word": "1-c5",
    "family": "name",
    "scene": "You want to know someone’s name. Ask politely.",
    "why": "おなまえは asks someone’s name. The last は is a particle."
  },
  {
    "id": "attention",
    "word": "2-c1",
    "family": "attention",
    "scene": "You want to speak to someone but are unsure how to start.",
    "why": "Use あのう to get someone’s attention or when you are unsure how to start. Keep the final う."
  },
  {
    "id": "offer",
    "word": "2-c3",
    "family": "offer",
    "scene": "You give someone a pen.",
    "why": "Use どうぞ when you give someone something."
  },
  {
    "id": "thanks",
    "word": "2-c4c",
    "family": "thanks",
    "scene": "Someone gives you a gift. Say thank you politely.",
    "why": "ありがとうございます is a polite way to say thank you."
  },
  {
    "id": "thanks-full",
    "word": "2-c4d",
    "family": "thanks",
    "scene": "Someone helps you a lot. Thank them using the full phrase.",
    "why": "どうもありがとうございます means “thank you very much”."
  },
  {
    "id": "understand",
    "word": "2-c5",
    "family": "understand",
    "scene": "Someone tells you something you did not know. Show that you understand.",
    "why": "そうですか means “I see” here."
  },
  {
    "id": "incorrect",
    "word": "2-c6",
    "family": "incorrect",
    "scene": "Someone says your book is a dictionary. They are wrong.",
    "why": "Use ちがいます to say that something is not correct."
  },
  {
    "id": "surprise",
    "word": "2-c2",
    "family": "surprise",
    "scene": "You hear some news and are surprised.",
    "why": "えっ shows surprise. Remember the small っ."
  },
  {
    "id": "realise",
    "word": "2-c7",
    "family": "realisation",
    "scene": "You suddenly see that the umbrella is yours.",
    "why": "Use あ when you suddenly notice something."
  },
  {
    "id": "neighbour",
    "word": "2-d1",
    "family": "neighbour",
    "scene": "You have just moved in. Greet your new neighbour.",
    "why": "これからおせわになります asks for someone’s kindness or help from now on."
  }
];
function guideCards(cards,label){
  return `<section class="expression-guide" aria-label="${esc(label)}"><div class="guide-heading"><h2>${label}</h2></div><div class="guide-cards">${cards.join('')}</div></section>`;
}
function dialogueGraphic(q){
  const person=(x,color,flip=false)=>`<g transform="translate(${x} 0)"><circle cy="119" r="20" fill="${color}"/><path d="M-30 184v-24c0-27 60-27 60 0v24" fill="${color}"/><circle cx="${flip?-6:6}" cy="117" r="2.5" fill="#fff"/></g>`;
  const bubble=(x,symbol)=>`<g transform="translate(${x} 0)"><path d="M-37 28h74a12 12 0 0 1 12 12v26a12 12 0 0 1-12 12H9L-5 94l2-16h-34a12 12 0 0 1-12-12V40a12 12 0 0 1 12-12" fill="#fff" stroke="#a6b8a0" stroke-width="2"/><text y="62" text-anchor="middle" font-size="29" fill="#425b36">${symbol}</text></g>`;
  const gift='<rect x="219" y="123" width="62" height="49" rx="4" fill="#f4d780" stroke="#876d35" stroke-width="2"/><path d="M250 123v49m-33-39h66m-33-10c-27-1-23-26-8-18l8 18c25-1 25-25 9-18Z" fill="none" stroke="#d36f55" stroke-width="5"/>';
  const badge='<rect x="211" y="113" width="78" height="54" rx="7" fill="#fff" stroke="#698a96" stroke-width="2"/><circle cx="230" cy="132" r="8" fill="#e3eada"/><path d="M220 152q10-17 20 0m8-25h29m-29 12h21" stroke="#698a96" stroke-width="3" fill="none"/>';
  const pen='<g transform="rotate(25 250 148)"><rect x="244" y="110" width="12" height="64" rx="4" fill="#557a88"/><path d="m244 174 6 14 6-14" fill="#d5b975"/></g><path d="M184 151h42m-11-9 11 9-11 9" stroke="#d36f55" stroke-width="4" fill="none"/>';
  const house='<path d="m207 134 43-39 43 39v53h-86Z" fill="#f7edca" stroke="#8c7851" stroke-width="2"/><path d="M238 187v-33h24v33m-47-47h14v14h-14m57-14h14v14h-14" fill="#fff" stroke="#8c7851" stroke-width="2"/>';
  const books='<path d="M212 172v-51h34v51Zm42 0v-62h34v62Z" fill="#f4d780" stroke="#8c7851" stroke-width="2"/><path d="m239 91 22 22m0-22-22 22" stroke="#c36b53" stroke-width="4"/>';
  const bulb='<circle cx="250" cy="126" r="24" fill="#f7df86" stroke="#b18a39" stroke-width="2"/><path d="M237 149v15h26v-15m-22 22h18m-9-85V76m-39 45h-12m90 0h12m-78-27-8-8m69 8 8-8" stroke="#b18a39" stroke-width="3" fill="none"/>';
  const umbrella='<path d="M212 133a38 38 0 0 1 76 0Z" fill="#d8e9f1" stroke="#557a88" stroke-width="2"/><path d="M250 132v43c0 17 20 17 20 0" fill="none" stroke="#557a88" stroke-width="4"/>';
  const props={meet:badge,intro:badge,likewise:badge,excuse:badge,name:badge,attention:'',offer:pen,thanks:gift,'thanks-full':gift,understand:bulb,incorrect:books,surprise:bulb,realise:umbrella,neighbour:house};
  const symbols={meet:'…',intro:'…',likewise:'↔',excuse:'?',name:'?',attention:'…',offer:'→',thanks:'♡','thanks-full':'♡',understand:'!',incorrect:'×',surprise:'!',realise:'!',neighbour:'…'};
  return `<figure class="expression-figure"><svg viewBox="0 0 500 225" role="img" aria-labelledby="expression-scene-${q.id}"><title id="expression-scene-${q.id}">${esc(q.scene||'Reply to a greeting.')}</title><rect x="5" y="5" width="490" height="210" rx="24" fill="#edf2e6"/><path d="M45 185h410" stroke="#cdd8c3" stroke-width="2"/>${person(105,'#d8775b')}${person(395,'#557a88',true)}${bubble(105,symbols[q.id]||'…')}${q.id==='likewise'?bubble(395,'↔'):''}${props[q.id]||''}<text x="105" y="207" text-anchor="middle" fill="#8e4936" font-size="14">You</text><text x="395" y="207" text-anchor="middle" fill="#3f6676" font-size="14">Listener</text></svg></figure>`;
}

const DIALOGUE_CATEGORIES=[
  {id:'introductions',label:'Introduction',description:'Meeting people, asking names and making introductions.'},
  {id:'courtesy',label:'Polite expressions',description:'Getting attention, offering something and saying thank you.'},
  {id:'replies',label:'Replies',description:'Responding, showing surprise and correcting a misunderstanding.'}
];
function dialogueItems(category=null){return DIALOGUES.filter(d=>!category||vocabularySection(wordBy(d.word))===category).map(d=>({...d,kana:wordBy(d.word).kana}));}
function openDialogueCategory(category){if(!DIALOGUE_CATEGORIES.some(c=>c.id===category))return;rememberPage();state.dialogueCategory=category;navigate('dialogue-content',false);}

function kanaUnits(text){const units=[];for(const c of [...text]){if(/[ゃゅょぁぃぅぇぉゎ]/u.test(c)&&units.length)units[units.length-1]+=c;else units.push(c);}return units;}
function activityNav(){if(state.view==='handwriting-menu'||state.view==='kanji-writing')return 'handwriting-menu';if(state.view==='dialogue-content'||state.view==='demonstratives-content')return 'dialogue';if(state.view==='write'||state.view==='write-menu')return 'write-menu';if(['vocabulary-menu','vocabulary-rebuild'].includes(state.view))return 'vocabulary-menu';if(state.view==='activity')return state.activity?.kind.startsWith('dialogue')||state.activity?.kind==='demonstratives'?'dialogue':'dialogue';return state.view;}
function activityCard(title,copy,label,attr,tone='',action='',symbol=''){return `<button class="mode-card ${tone}" ${attr}><span class="activity-icon">${icon(symbol||'bank')}</span><span class="card-copy"><span class="eyebrow muted">${label}</span><h2>${title}</h2><p>${copy}</p></span><span class="card-arrow" aria-hidden="true">${icon('arrow')}</span></button>`;}
function demonstrativesContent(){
  const cards=demonstrativeItems().map(q=>`<article class="paper guide-card" data-dialogue-guide="${q.id}"><h2 class="guide-pair jp" lang="ja">${esc(q.kana)}</h2>${demonstrativeGraphic(q,true)}<p class="guide-meaning">${esc(q.meaning)}</p><p class="jp" lang="ja">${esc(q.sentence.replace('{word}',q.kana))}</p><p class="muted">${esc(q.why)}</p></article>`);
  return dialogueSelector('wh-words')+`<div class="study-wrap dialogue-content demonstratives-content"><div class="dialogue-guide-actions"><button class="button primary" data-open-demonstratives="practice">Choose your answer ${icon('arrow')}</button></div>${guideCards(cards,'WH-words guide')}</div>`;
}
function dialogueSelector(selected){
  const categories=[...DIALOGUE_CATEGORIES,{id:'wh-words',label:'WH-words'}];
  return `<div class="study-wrap dialogue-selector"><select class="filter dialogue-category-select" data-dialogue-select aria-label="Dialogue category">${categories.map(category=>`<option value="${category.id}" ${category.id===selected?'selected':''}>${category.label}</option>`).join('')}</select></div>`;
}
function selectDialogueCategory(category){
  if(category==='wh-words'){rememberPage();state.dialogueCategory=category;navigate('demonstratives-content',false);}
  else openDialogueCategory(category);
}
function dialogueMenu(){return state.dialogueCategory==='wh-words'?demonstrativesContent():dialogueContent();}
function dialogueContent(){
  const category=DIALOGUE_CATEGORIES.find(c=>c.id===state.dialogueCategory);
  if(!category){state.dialogueCategory=DIALOGUE_CATEGORIES[0].id;return dialogueContent();}
  const items=dialogueItems(category.id);
  const cards=items.map(q=>{const word=wordBy(q.word);return `<article class="paper guide-card dialogue-guide-entry" data-dialogue-guide="${q.id}">${dialogueGraphic(q)}${dialoguePrompt(q)}<span class="dialogue-role">You say</span><h3 class="jp" lang="ja">${esc(q.kana)}</h3><p class="guide-meaning">${esc(word.zh)} · ${esc(word.en)}</p><p class="muted">${esc(q.why)}</p></article>`;});
  return dialogueSelector(category.id)+`<div class="study-wrap dialogue-content"><div class="dialogue-guide-actions"><button class="button primary" data-open-dialogue="dialogue-choice">Choose your answer ${icon('arrow')}</button><button class="button soft" data-open-dialogue="dialogue-tiles">Build with hiragana ${icon('arrow')}</button></div>${guideCards(cards,'Expression guide')}</div>`;
}

function startActivity(kind,ids,category=null){if(!['demonstratives','dialogue-choice','dialogue-tiles'].includes(kind))return;if(state.view!=='activity')rememberPage();const dialogue=kind.startsWith('dialogue');const items=dialogue?dialogueItems(category):demonstrativeItems();state.activity={kind,category,items,ids:ids||shuffle(items.map(x=>x.id)),index:0,correct:0,missed:[],checked:false,selected:null,chosen:[],tileBank:[],choices:[],result:false};state.view='activity';prepareActivity();render();window.scrollTo({top:0,behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
function activityCurrent(){const a=state.activity;return a?.items.find(x=>x.id===a.ids[a.index]);}
function relatedActivityItems(a,q){
  const category=vocabularySection(wordBy(q.word));
  const candidates=a.items.filter(item=>item.id!==q.id&&(vocabularySection(wordBy(item.word))===category||[q.word,item.word].sort().join(',')==='2-06,2-c1')&&(!a.kind.startsWith('dialogue')||item.family!==q.family));
  const seen=new Set();return shuffle(candidates).filter(item=>{const key=item.family||item.kana;if(seen.has(key))return false;seen.add(key);return true;});
}
function prepareActivity(){const a=state.activity,q=activityCurrent();if(!q)return;a.checked=false;a.selected=null;a.chosen=[];a.result=false;a.choices=shuffle([q,...relatedActivityItems(a,q).slice(0,3)]);if(a.kind==='dialogue-tiles')a.tileBank=shuffle(kanaUnits(q.kana));}
function activityAnswer(){const a=state.activity;return a.chosen.map(id=>a.tileBank[id]).join('');}
function checkActivity(choice=null){const a=state.activity,q=activityCurrent();if(!q||a.checked)return;const tiles=a.kind==='dialogue-tiles';if(!tiles&&!a.choices.some(c=>c.id===choice))return;a.selected=choice;a.result=tiles?activityAnswer()===q.kana:choice===q.id;a.checked=true;if(a.result)a.correct++;else if(!a.missed.includes(q.id))a.missed.push(q.id);record('activities',`${a.kind}-${q.id}`,a.result);render();}
function dialoguePrompt(q){
  const situation=q.scene?`<div class="dialogue-situation"><span class="dialogue-role">Situation</span><p class="dialogue-scene">${esc(q.scene)}</p></div>`:'';
  const incoming=q.incoming?`<blockquote class="dialogue-incoming"><div class="dialogue-speaker"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 3v-3a2 2 0 0 1-2-2V6a2 2 0 0 1 3-2Z"/><path d="M7 9h10M7 13h6"/></svg><span class="dialogue-role">They say</span></div><p class="dialogue-scene jp" lang="ja">${esc(q.incoming)}</p></blockquote>`:'';
  return situation+incoming;
}
function activityPage(){const a=state.activity;if(!a)return dialogueMenu();const dialogue=a.kind.startsWith('dialogue');const menu=dialogue?(a.category?'dialogue-content':'dialogue'):a.kind==='demonstratives'?'demonstratives-content':'dialogue';if(a.index>=a.ids.length)return header('Round complete.','Give yourself another chance with the items you missed.')+`<div class="study-wrap paper result-center"><div class="result-score">${a.correct}<small> / ${a.ids.length}</small></div><p class="muted" style="margin-top:15px">${a.missed.length?`${a.missed.length} items are ready for another look.`:'Every answer correct in this round.'}</p><div class="card-actions">${a.missed.length?button('Practise missed items','activityMissed','coral'):''}${button('New round','activityRestart','primary')}</div></div>`;
const q=activityCurrent(),tileMode=a.kind==='dialogue-tiles';
return `<section class="study-wrap"><div class="row between" style="margin-bottom:17px"><span class="pill">${a.index+1} / ${a.ids.length} · ${a.correct} correct</span></div><div class="progress-bar"><div class="progress-fill" style="width:${100*a.index/a.ids.length}%"></div></div><section class="paper"><span class="eyebrow muted">QUIZ-PAGE VOCABULARY</span>${dialogue?dialogueGraphic(q)+dialoguePrompt(q):a.kind==='demonstratives'?demonstrativeQuestion(q):`<h2 class="meaning-prompt">${esc(q.meaning)}</h2>`}${tileMode?activityTiles(q):activityChoices()}${a.checked?`<div class="feedback ${a.result?'':'bad'}" role="status"><strong>${a.result?'Correct!':'The correct answer is:'}</strong><div class="jp" lang="ja">${esc(q.kana)}</div><p>${esc(q.why||q.clue)}</p>${tileMode?`<p class="small jp">${kanaUnits(q.kana).map(esc).join(' · ')}</p>`:''}</div><div class="card-actions">${button('Next '+icon('arrow'),'activityNext','primary')}</div>`:''}</section></section>`;}
function activityChoices(){const a=state.activity;return `<div class="options activity-options">${a.choices.map((q,i)=>`<button class="option jp ${a.checked&&q.id===activityCurrent().id?'correct':a.checked&&q.id===a.selected?'wrong':''}" data-activity-choice="${q.id}" ${a.checked?'disabled':''}><span class="number">${i+1}</span>${esc(q.kana)}</button>`).join('')}</div>`;}
function activityTiles(q){const a=state.activity,limit=kanaUnits(q.kana).length;return `<p class="small muted" style="margin-top:22px">Tap the tiles in order. Tap a chosen tile to put it back.</p><div class="token-area ${a.chosen.length?'filled':''}" aria-label="Your hiragana answer">${a.chosen.length?a.chosen.map((id,i)=>`<button class="tile jp" data-activity-return="${i}" ${a.checked?'disabled':''}>${esc(a.tileBank[id])}</button>`).join(''):'<span class="empty-hint">Put your answer here.</span>'}</div><div class="token-bank activity-tile-bank" aria-label="Hiragana bank">${a.tileBank.map((unit,i)=>`<button class="tile jp" data-activity-tile="${i}" ${a.checked||a.chosen.includes(i)?'disabled':''}>${esc(unit)}</button>`).join('')}</div><div class="small muted">${a.chosen.length} / ${limit} units</div>${a.checked?'':`<div class="card-actions">${button('Clear','activityClear','ghost')}${button('Undo','activityUndo','ghost',a.chosen.length?'':'disabled')}${button('Check answer','activityCheck','primary',a.chosen.length===limit?'':'disabled')}</div>`}`;}
function activityAction(action){const a=state.activity;if(!a)return;switch(action){case'activityNext':a.index++;prepareActivity();render();break;case'activityRestart':startActivity(a.kind,undefined,a.category);break;case'activityMissed':startActivity(a.kind,shuffle(a.missed),a.category);break;case'activityClear':if(!a.checked)a.chosen=[];render();break;case'activityUndo':if(!a.checked)a.chosen.pop();render();break;case'activityCheck':checkActivity();break;}}
function activityClick(target){const d=target.dataset;if(d.openDemonstratives){if(d.openDemonstratives==='guide'){selectDialogueCategory('wh-words');}else if(d.openDemonstratives==='practice')startActivity('demonstratives');return true;}if(d.dialogueCategory){openDialogueCategory(d.dialogueCategory);return true;}if(d.openDialogue){startActivity(d.openDialogue,undefined,['dialogue','dialogue-content'].includes(state.view)?state.dialogueCategory:null);return true;}if(d.activityChoice){checkActivity(d.activityChoice);return true;}if(d.activityTile!==undefined){const a=state.activity;if(!a||a.checked)return true;const i=Number(d.activityTile),limit=kanaUnits(activityCurrent().kana).length;if(Number.isInteger(i)&&i>=0&&i<a.tileBank.length&&!a.chosen.includes(i)&&a.chosen.length<limit)a.chosen.push(i);render();return true;}if(d.activityReturn!==undefined){const a=state.activity;if(a&&!a.checked)a.chosen.splice(Number(d.activityReturn),1);render();return true;}if(d.action?.startsWith('activity')){activityAction(d.action);return true;}return false;}

function demonstrativeGraphic(q,compact=false){
  const age=q.word.startsWith('1-19'),object=q.word==='2-36';
  const figure=object?'<rect x="225" y="93" width="50" height="58" rx="5" fill="#f5d577" stroke="#8c7039" stroke-width="2"/><path d="M234 94v56m8-40h25m-25 12h20" stroke="#8c7039" stroke-width="2"/>':'<circle cx="250" cy="106" r="21" fill="#d8775b"/><path d="M214 182v-31c0-32 72-32 72 0v31" fill="#557a88"/>';
  return `<figure class="expression-figure"><svg viewBox="0 0 500 225" role="img" aria-labelledby="wh-scene-${q.id}${compact?'-guide':''}"><title id="wh-scene-${q.id}${compact?'-guide':''}">${esc(q.clue)}</title><rect x="5" y="5" width="490" height="210" rx="24" fill="#edf2e6"/>${figure}<rect x="315" y="35" width="110" height="66" rx="16" fill="#fff" stroke="#a6b8a0" stroke-width="2"/><text x="370" y="79" text-anchor="middle" font-size="30" fill="#425b36">${age?'18?':'?'}</text></svg><figcaption>${esc(q.clue)}</figcaption></figure>`;
}
function demonstrativeQuestion(q){
  return `${demonstrativeGraphic(q)}<div class="scene-sentence"><span class="eyebrow muted">${esc(q.clue)}</span><div class="jp" lang="ja">${esc(q.sentence).replace('{word}','<span class="scene-blank">_____</span>')}</div></div>`;
}
