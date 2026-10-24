'use strict';
// Matching and dialogue content uses the existing quiz-page vocabulary.
const questionWords=[
  {word:'1-19a',meaning:'How old? (standard form)',clue:'Ask a person’s age using the standard form.'},
  {word:'1-19b',meaning:'How old? (polite form)',clue:'Ask a person’s age using the polite alternative.'},
  {word:'1-17a',meaning:'Who? (standard form)',clue:'Ask who a person is using the standard form.'},
  {word:'1-17b',meaning:'Who? (polite form)',clue:'Ask who a person is using the polite alternative.'},
  {word:'2-36',meaning:'What? (before です)',clue:'Ask what something is. Choose the question word used before です.'},
];
const demonstrativeWords=[
  {word:'2-01',meaning:'This · near the speaker · stands alone',clue:'The book is beside you. Refer to it with a word that stands alone.'},
  {word:'2-02',meaning:'That · near the listener · stands alone',clue:'The book is beside the person you are speaking to. Use a word that stands alone.'},
  {word:'2-03',meaning:'That over there · far from both · stands alone',clue:'The book is far from both of you. Use a word that stands alone.'},
  {word:'2-04',meaning:'This … · near the speaker · before a noun',clue:'The book is beside you. Choose the word that goes immediately before the noun “book”.'},
  {word:'2-05',meaning:'That … · near the listener · before a noun',clue:'The book is beside the listener. Choose the word that goes immediately before a noun.'},
  {word:'2-06',meaning:'That … over there · far from both · before a noun',clue:'The book is far from both of you. Choose the word that goes immediately before a noun.'},
  {word:'2-c1',meaning:'Um / excuse me … · get someone’s attention',clue:'You hesitate and politely get someone’s attention before speaking. This is an expression, rather than a word pointing to an object.'}
];
function matchingItems(kind){return (kind==='wh'?questionWords:demonstrativeWords).map(q=>{const w=wordBy(q.word);const explanations={
  '1-19a':'なんさい asks age in the standard form.',
  '1-19b':'おいくつ is the polite age question. The standard form is なんさい.',
  '1-17a':'だれ asks who someone is. どなた is the polite alternative.',
  '1-17b':'どなた is the polite alternative to だれ.',
  '2-36':'なん means “what” in the taught pattern なんですか.',
  '2-01':'これ stands alone and refers to something near the speaker. この must come before a noun.',
  '2-02':'それ stands alone and refers to something near the listener. その must come before a noun.',
  '2-03':'あれ stands alone and refers to something far from both people. あの must come before a noun.',
  '2-04':'この comes directly before a noun and points to something near the speaker.',
  '2-05':'その comes directly before a noun and points to something near the listener.',
  '2-06':'あの comes directly before a noun and points to something far from both people. あのう gets attention.',
  '2-c1':'あのう gets attention or shows hesitation. The final う distinguishes it from the noun modifier あの.'
};return {...q,id:`${kind}-${w.id}`,kana:w.kana,zh:w.zh,why:explanations[w.id]};});}
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
function dialogueItems(){return DIALOGUES.map(d=>({...d,kana:wordBy(d.word).kana}));}
function kanaUnits(text){const units=[];for(const c of [...text]){if(/[ゃゅょぁぃぅぇぉゎ]/u.test(c)&&units.length)units[units.length-1]+=c;else units.push(c);}return units;}
function activityNav(){if(state.view==='write'||state.view==='write-menu')return 'write-menu';if(state.view==='match'||state.view==='kanji-menu'||state.view==='matching'||state.view==='demonstratives-content'||state.view==='question-words-content')return 'matching';if(state.view==='activity')return state.activity?.kind.startsWith('dialogue')?'dialogue':'matching';return state.view;}
function activityCard(title,copy,label,attr,tone='',action='Start practice',symbol=''){return `<button class="mode-card ${tone}" ${attr}>${symbol?`<span class="activity-icon">${icon(symbol)}</span>`:''}<span class="eyebrow muted">${label}</span><h2>${title}</h2><p>${copy}</p><span class="mode-link">${action} ${icon('arrow')}</span></button>`;}
function matchingMenu(){return header('Matching, your way.','Choose a group. Get feedback after each answer and return to missed items at the end.')+`<section class="mode-grid">${activityCard('Kanji match','Match readings with their taught kanji. Only kanji-bearing words and choices are included.',`${WORDS.filter(hasKanji).length} WORDS`,'data-open-match="kanji"','','Choose word set')}${activityCard('Question words','Practise standard and polite questions about age, people and “what”.',`${questionWords.length} WORDS · QUIZ VOCABULARY`,'data-open-match="wh"','mode-yellow','View guide')}${activityCard('This and that','Use illustrated scenes to locate the book relative to the speaker and listener. Then complete the blank.','7 WORDS · VISUAL PRACTICE','data-open-match="demonstratives"','mode-blue','View guide')}</section>`;}
function questionWordsContent(){
  const entry=(id,form)=>{const q=matchingItems('wh').find(item=>item.word===id);return `<div class="question-guide-entry"><span class="eyebrow muted">${form}</span><strong class="jp" lang="ja">${esc(q.kana)}</strong><span>${esc(q.meaning)}</span></div>`;};
  return header('Question words.','Learn the five question words, then practise matching them.')+`<div class="study-wrap question-words-content"><button class="scope-link" data-view="matching">← Back to menu</button><section class="paper question-words-lesson"><h2>Question word guide</h2><p>For age and people, compare the standard and polite forms. For “what” before です, use なん.</p><div class="question-guide-grid"><section class="question-guide-card"><h3>Ask about age</h3><div class="question-guide-pair">${entry('1-19a','Standard')}${entry('1-19b','Polite')}</div></section><section class="question-guide-card"><h3>Ask who</h3><div class="question-guide-pair">${entry('1-17a','Standard')}${entry('1-17b','Polite')}</div></section><section class="question-guide-card question-guide-what"><h3>Ask what</h3>${entry('2-36','Before です')}</section></div></section><div class="card-actions"><button class="button primary" data-open-match="start-wh">Start matching ${icon('arrow')}</button></div></div>`;
}
function demonstrativesContent(){return header('This and that.','Look at where the book is, then practise matching the words.')+`<div class="study-wrap demonstratives-content"><button class="scope-link" data-view="matching">← Back to menu</button><section class="paper demonstratives-lesson"><h2>Visual guide · this and that</h2><p>Look at the speaker, listener and book. Use これ・それ・あれ alone; put この・その・あの before a noun.</p><div class="visual-guide-grid">${['2-01','2-02','2-03'].map(id=>{const q=matchingItems('demonstratives').find(x=>x.word===id);return `<article><div class="guide-pair jp">${{'2-01':'これ / この','2-02':'それ / その','2-03':'あれ / あの'}[id]}</div>${demonstrativeGraphic(q,true)}</article>`;}).join('')}</div><div class="demonstratives-attention"><div class="guide-pair jp">あのう</div>${demonstrativeGraphic(matchingItems('demonstratives').find(x=>x.word==='2-c1'),true)}<p>あのう gets someone’s attention. It does not point to the book.</p></div></section><div class="card-actions"><button class="button primary" data-open-match="start-demonstratives">Start matching ${icon('arrow')}</button></div></div>`;}
function dialogueMenu(){return header('Practise the conversation.','Read the situation or what the other person says. Choose your answer or build it with hiragana.')+`<section class="mode-grid two-modes">${activityCard('Choose your answer','Pick what you would say from four choices.',`${dialogueItems().length} SCENES · QUIZ EXPRESSIONS`,'data-open-dialogue="dialogue-choice"')}${activityCard('Build with hiragana','Tap the tiles to spell your answer. Small kana like ょ stay with the letter before them.','HIRAGANA TILE PRACTICE','data-open-dialogue="dialogue-tiles"','mode-yellow')}</section>`;}

function startActivity(kind,ids){const dialogue=kind.startsWith('dialogue');const items=dialogue?dialogueItems():matchingItems(kind);state.activity={kind,items,ids:ids||shuffle(items.map(x=>x.id)),index:0,correct:0,missed:[],checked:false,selected:null,chosen:[],tileBank:[],choices:[],result:false};state.view='activity';prepareActivity();render();window.scrollTo({top:0,behavior:'smooth'});}
function activityCurrent(){const a=state.activity;return a?.items.find(x=>x.id===a.ids[a.index]);}
function prepareActivity(){const a=state.activity,q=activityCurrent();if(!q)return;a.checked=false;a.selected=null;a.chosen=[];a.result=false;const dialogue=a.kind.startsWith('dialogue');const candidates=shuffle(a.items.filter(x=>x.id!==q.id&&(!dialogue||x.family!==q.family)));a.choices=shuffle([q,...candidates.slice(0,3)]);if(a.kind==='dialogue-tiles'){const correct=kanaUnits(q.kana),other=[...new Set(a.items.flatMap(x=>kanaUnits(x.kana)))].filter(x=>!correct.includes(x));a.tileBank=shuffle([...correct,...shuffle(other).slice(0,3)]);}}
function activityAnswer(){const a=state.activity;return a.chosen.map(id=>a.tileBank[id]).join('');}
function checkActivity(choice=null){const a=state.activity,q=activityCurrent();if(!q||a.checked)return;const tiles=a.kind==='dialogue-tiles';if(!tiles&&!a.choices.some(c=>c.id===choice))return;a.selected=choice;a.result=tiles?activityAnswer()===q.kana:choice===q.id;a.checked=true;if(a.result)a.correct++;else if(!a.missed.includes(q.id))a.missed.push(q.id);record('activities',`${a.kind}-${q.id}`,a.result);render();}
function dialoguePrompt(q){
  const situation=q.scene?`<div class="dialogue-situation"><span class="dialogue-role">Situation</span><p class="dialogue-scene">${esc(q.scene)}</p></div>`:'';
  const incoming=q.incoming?`<blockquote class="dialogue-incoming"><div class="dialogue-speaker"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 3v-3a2 2 0 0 1-2-2V6a2 2 0 0 1 3-2Z"/><path d="M7 9h10M7 13h6"/></svg><span class="dialogue-role">They say</span></div><p class="dialogue-scene jp" lang="ja">${esc(q.incoming)}</p></blockquote>`:'';
  return situation+incoming;
}
function activityPage(){const a=state.activity;if(!a)return matchingMenu();const dialogue=a.kind.startsWith('dialogue');const menu=dialogue?'dialogue':a.kind==='demonstratives'?'demonstratives-content':a.kind==='wh'?'question-words-content':'matching';if(a.index>=a.ids.length)return header('Round complete.','Give yourself another chance with the items you missed.')+`<div class="study-wrap paper result-center"><div class="result-score">${a.correct}<small> / ${a.ids.length}</small></div><p class="muted" style="margin-top:15px">${a.missed.length?`${a.missed.length} items are ready for another look.`:'Every answer correct in this round.'}</p><div class="card-actions">${a.missed.length?button('Practise missed items','activityMissed','coral'):''}${button('New round','activityRestart','primary')}<button class="button ghost" data-view="${menu}">Back to menu</button></div></div>`;
const q=activityCurrent(),tileMode=a.kind==='dialogue-tiles',title=dialogue?'What would you say?':a.kind==='wh'?'Which question word?':'Choose the right word.';
return header(title,dialogue?(tileMode?'Use hiragana tiles to spell what you would say.':'Choose what you would say in Japanese.'):a.kind==='demonstratives'?'Look at the scene and complete the blank.':q.clue)+`<section class="study-wrap"><div class="row between" style="margin-bottom:17px"><button class="scope-link" data-view="${menu}">← Back to menu</button><span class="pill">${a.index+1} / ${a.ids.length} · ${a.correct} correct</span></div><div class="progress-bar"><div class="progress-fill" style="width:${100*a.index/a.ids.length}%"></div></div><section class="paper"><span class="eyebrow muted">QUIZ-PAGE VOCABULARY</span>${dialogue?dialoguePrompt(q):a.kind==='demonstratives'?demonstrativeQuestion(q):`<h2 class="meaning-prompt">${esc(q.meaning)}</h2>`}${tileMode?activityTiles(q):activityChoices()}${a.checked?`<div class="feedback ${a.result?'':'bad'}" role="status"><strong>${a.result?'Correct!':'The correct answer is:'}</strong><div class="jp" lang="ja">${esc(q.kana)}</div><p>${esc(q.why||q.clue)}</p>${tileMode?`<p class="small jp">${kanaUnits(q.kana).map(esc).join(' · ')}</p>`:''}</div><div class="card-actions">${button('Next '+icon('arrow'),'activityNext','primary')}</div>`:''}</section></section>`;}
function activityChoices(){const a=state.activity;return `<div class="options activity-options">${a.choices.map((q,i)=>`<button class="option jp ${a.checked&&q.id===activityCurrent().id?'correct':a.checked&&q.id===a.selected?'wrong':''}" data-activity-choice="${q.id}" ${a.checked?'disabled':''}><span class="number">${i+1}</span>${esc(q.kana)}</button>`).join('')}</div>`;}
function activityTiles(q){const a=state.activity,limit=kanaUnits(q.kana).length;return `<p class="small muted" style="margin-top:22px">Tap the tiles in order. Tap a chosen tile to put it back. You will not need every tile.</p><div class="token-area ${a.chosen.length?'filled':''}" aria-label="Your hiragana answer">${a.chosen.length?a.chosen.map((id,i)=>`<button class="tile jp" data-activity-return="${i}" ${a.checked?'disabled':''}>${esc(a.tileBank[id])}</button>`).join(''):'<span class="empty-hint">Put your answer here.</span>'}</div><div class="token-bank activity-tile-bank" aria-label="Hiragana bank">${a.tileBank.map((unit,i)=>`<button class="tile jp" data-activity-tile="${i}" ${a.checked||a.chosen.includes(i)?'disabled':''}>${esc(unit)}</button>`).join('')}</div><div class="small muted">${a.chosen.length} / ${limit} units</div>${a.checked?'':`<div class="card-actions">${button('Clear','activityClear','ghost')}${button('Undo','activityUndo','ghost',a.chosen.length?'':'disabled')}${button('Check answer','activityCheck','primary',a.chosen.length===limit?'':'disabled')}</div>`}`;}
function activityAction(action){const a=state.activity;if(!a)return;switch(action){case'activityNext':a.index++;prepareActivity();render();break;case'activityRestart':startActivity(a.kind);break;case'activityMissed':startActivity(a.kind,shuffle(a.missed));break;case'activityClear':if(!a.checked)a.chosen=[];render();break;case'activityUndo':if(!a.checked)a.chosen.pop();render();break;case'activityCheck':checkActivity();break;}}
function activityClick(target){const d=target.dataset;if(d.openMatch){if(d.openMatch==='kanji')navigate('kanji-menu');else if(d.openMatch==='wh')navigate('question-words-content');else if(d.openMatch==='start-wh')startActivity('wh');else if(d.openMatch==='demonstratives')navigate('demonstratives-content');else if(d.openMatch==='start-demonstratives')startActivity('demonstratives');else startActivity(d.openMatch);return true;}if(d.openDialogue){startActivity(d.openDialogue);return true;}if(d.activityChoice){checkActivity(d.activityChoice);return true;}if(d.activityTile!==undefined){const a=state.activity;if(!a||a.checked)return true;const i=Number(d.activityTile),limit=kanaUnits(activityCurrent().kana).length;if(Number.isInteger(i)&&i>=0&&i<a.tileBank.length&&!a.chosen.includes(i)&&a.chosen.length<limit)a.chosen.push(i);render();return true;}if(d.activityReturn!==undefined){const a=state.activity;if(a&&!a.checked)a.chosen.splice(Number(d.activityReturn),1);render();return true;}if(d.action?.startsWith('activity')){activityAction(d.action);return true;}return false;}

function demonstrativeLocation(q){return {'2-01':'speaker','2-04':'speaker','2-02':'listener','2-05':'listener','2-03':'far','2-06':'far','2-c1':'attention'}[q.word];}
function demonstrativeGraphic(q,compact=false){
  const location=demonstrativeLocation(q),attention=location==='attention';
  const descriptions={speaker:'The book is near the speaker on the left.',listener:'The book is near the listener in the middle.',far:'The book is on the right, far from both people.',attention:'The speaker is getting the listener’s attention before speaking.'};
  const x={speaker:90,listener:310,far:520}[location];
  const person=(cx,color,flip=false)=>`<g transform="translate(${cx} 0)"><circle cx="0" cy="132" r="17" fill="${color}"/><path d="M-28 181v-15c0-20 56-20 56 0v15" fill="${color}"/><path d="M-14 182v18m28-18v18" stroke="${color}" stroke-width="8" stroke-linecap="round"/><circle cx="${flip?-5:5}" cy="130" r="2" fill="#fff"/></g>`;
  const book=attention?'':`<g class="scene-book" transform="translate(${x} 68)"><ellipse cy="32" rx="32" ry="7" fill="#24393615"/><rect x="-24" y="-26" width="49" height="54" rx="5" fill="#f5d577" stroke="#725a2d" stroke-width="2"/><path d="M-17-25v52" stroke="#b29043" stroke-width="3"/><path d="M-9-10h25m-25 9h19" stroke="#8c7039" stroke-width="2"/><text x="3" y="19" text-anchor="middle" fill="#655028" font-size="10">BOOK</text></g>`;
  const bubble=attention?'<g><path d="M62 38h113a13 13 0 0 1 13 13v29a13 13 0 0 1-13 13h-44l-17 18 3-18H62a13 13 0 0 1-13-13V51a13 13 0 0 1 13-13" fill="#fff" stroke="#e77255" stroke-width="2"/><text x="118" y="75" text-anchor="middle" font-size="29" fill="#a7442d">…</text><path d="m266 108 10-12m4 23 15-2" stroke="#e77255" stroke-width="3" stroke-linecap="round"/></g>':'';
  return `<figure class="demonstrative-figure ${compact?'compact-scene':''}"><svg viewBox="0 0 620 240" role="img" aria-labelledby="scene-${q.id}${compact?'-guide':''}"><title id="scene-${q.id}${compact?'-guide':''}">${esc(descriptions[location])} The speaker is labelled You, and the other person Listener.</title><rect x="10" y="16" width="185" height="205" rx="20" fill="${location==='speaker'||attention?'#fbe9df':'#f0f2eb'}" stroke="${location==='speaker'||attention?'#e9ac93':'#e3e5dc'}"/><rect x="220" y="16" width="185" height="205" rx="20" fill="${location==='listener'?'#e4eef7':'#f0f2eb'}" stroke="${location==='listener'?'#9bb9ce':'#e3e5dc'}"/><rect x="430" y="16" width="180" height="205" rx="20" fill="${location==='far'?'#fff3cf':'#f6f6f0'}" stroke="${location==='far'?'#cfb56e':'#e3e5dc'}" stroke-dasharray="${location==='far'?'0':'5 5'}"/><path d="M28 200h564" stroke="#cdd5c5" stroke-width="2"/>${person(105,'#d86c51')}${person(313,'#557a88',true)}${book}${bubble}<text x="105" y="232" text-anchor="middle" fill="#8e3f2b" font-size="17" font-weight="600">YOU · SPEAKER</text><text x="313" y="232" text-anchor="middle" fill="#3f6676" font-size="17" font-weight="600">LISTENER</text><text x="520" y="190" text-anchor="middle" fill="#768069" font-size="15">FAR FROM BOTH</text></svg><figcaption>${esc(descriptions[location])}</figcaption></figure>`;
}
function demonstrativeQuestion(q){
  const attention=demonstrativeLocation(q)==='attention',beforeNoun=['2-04','2-05','2-06'].includes(q.word);
  const prompt=attention?'Get the listener’s attention before speaking.':beforeNoun?'Choose the word immediately before the noun.':'Choose a word that stands alone.';
  return `${demonstrativeGraphic(q)}<div class="scene-sentence"><span class="eyebrow muted">${prompt}</span><div class="jp" lang="ja"><span class="scene-blank">_____</span>${attention?' …':beforeNoun?' 本（ほん）':' は 本です。'}</div></div>`;
}
