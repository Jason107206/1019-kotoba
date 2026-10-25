'use strict';
const vocabularyReading=word=>clean(word.kana);
function similarKanaUnits(unit){
  const groups=['かが','きぎ','くぐ','けげ','こご','さざ','しじ','すずづ','せぜ','そぞ','ただ','ちぢ','つづ','てで','とど','はばぱ','ひびぴ','ふぶぷ','へべぺ','ほぼぽ','やゃ','ゆゅ','よょ','つっ','あお','うぅ','えぇ','おぉ','ーうお','いえ','ぬめ','ねれわ','るろ','しつ','そん','きさ'];
  const candidates=[],letters=[...unit];
  letters.forEach((letter,index)=>{for(const group of groups)if(group.includes(letter))for(const replacement of group)if(replacement!==letter){const copy=[...letters];copy[index]=replacement;candidates.push(copy.join(''));}});
  if(/^[がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ]/u.test(unit))candidates.push('っ'+unit);
  return [...new Set(candidates)];
}
function vocabularyTileBank(word){
  const target=kanaUnits(vocabularyReading(word)),alternatives=[...new Set(target.flatMap(similarKanaUnits))].filter(unit=>!target.includes(unit));
  // Keep every repeated target tile, so words such as せんせい can be assembled.
  return shuffle([...target,...alternatives]);
}
function vocabularyAnswer(){const r=state.round;return r.chosen.map(index=>r.tileBank[index]).join('');}
function vocabularyAnswerSlots(round,count,prefix='vocabulary'){return Array.from({length:count},(_,position)=>{
  const index=round.chosen[position],attrs=`data-${prefix}-slot="${position}"`;
  return index===undefined?`<span class="vocabulary-slot empty" ${attrs} aria-label="${esc(translateText('Empty slot'))} ${position+1}"><span aria-hidden="true">${position+1}</span></span>`:`<button class="tile jp vocabulary-slot filled" lang="ja" ${attrs} data-${prefix}-return="${position}" aria-label="Return ${esc(round.tileBank[index])} to word bank" ${round.checked?'disabled':''}>${esc(round.tileBank[index])}</button>`;
}).join('');}
function rebuildTileInputs(round,target,prefix='vocabulary'){
  const limit=kanaUnits(target).length;
  return `<p class="small muted" style="margin-top:18px">Build the reading. Watch for similar kana, long vowels and small letters.</p><div class="token-area vocabulary-answer-slots ${round.chosen.length?'filled':''}" role="group" aria-label="Your hiragana answer">${vocabularyAnswerSlots(round,limit,prefix)}</div><div class="token-bank vocabulary-tile-bank" aria-label="Hiragana bank">${round.tileBank.map((unit,index)=>`<button class="tile jp ${round.chosen.includes(index)?'selected':''}" lang="ja" data-${prefix}-tile="${index}" ${round.checked||round.chosen.includes(index)?'disabled':''}>${esc(unit)}</button>`).join('')}</div><div class="small muted">${round.chosen.length} / ${limit} units</div>`;
}
function rebuildTileControls(round,limit,prefix='vocabulary'){
  return `<div class="card-actions">${button('Clear',`${prefix}Clear`,'ghost')}${button('Undo',`${prefix}Undo`,'ghost',round.chosen.length?'':'disabled')}${button('Check answer',`${prefix}Check`,'primary',round.chosen.length===limit?'':'disabled')}</div><div style="text-align:center;margin-top:14px"><button class="scope-link" data-action="${prefix}Reveal">Show answer & mark for review</button></div>`;
}
function vocabularyRebuildCard(){
  const w=wordBy(current()),r=state.round,target=vocabularyReading(w),limit=kanaUnits(target).length;
  const prompt=hasKanji(w)?w.c:w.zh;
  return `<div class="paper vocabulary-rebuild-card">${vocabularyVisual(w)}<div class="eyebrow muted">${sourceTag(w)}</div><h2 class="vocabulary-rebuild-prompt ${hasKanji(w)?'jp':''}" ${hasKanji(w)?'lang="ja"':''}>${esc(prompt)}</h2><p class="muted">${hasKanji(w)?`${esc(w.zh)} · `:''}${esc(w.en)}</p>${rebuildTileInputs(r,target)}${r.checked?`<div class="feedback ${r.result?'':'bad'}" role="status"><strong>${r.result?'Correct!':'The correct answer is:'}</strong><div class="jp" lang="ja">${esc(target)}</div><p class="small jp">${kanaUnits(target).map(esc).join(' · ')}</p></div><div class="card-actions">${button('Next word '+icon('arrow'),'next','primary')}</div>`:rebuildTileControls(r,limit)}</div>`;
}
function vocabularyAction(action){
  const r=state.round;if(state.view!=='vocabulary-rebuild'||!r||r.checked||r.index>=r.ids.length)return;
  if(action==='vocabularyClear')r.chosen=[];
  else if(action==='vocabularyUndo')r.chosen.pop();
  else if(['vocabularyCheck','vocabularyReveal'].includes(action)){
    const target=vocabularyReading(wordBy(current()));
    if(action==='vocabularyCheck'&&r.chosen.length!==kanaUnits(target).length)return;
    const ok=action==='vocabularyCheck'&&vocabularyAnswer()===target;
    r.result=ok;r.revealed=action==='vocabularyReveal';record('vocabularyRebuild',current(),ok);completeRound(ok);
  }else return;
  render();
}
function vocabularyTileClick(dataset){
  const r=state.round;if(state.view!=='vocabulary-rebuild'||!r||r.checked||r.index>=r.ids.length)return;
  if(dataset.vocabularyTile!==undefined){
    const index=Number(dataset.vocabularyTile),limit=kanaUnits(vocabularyReading(wordBy(current()))).length;
    if(Number.isInteger(index)&&index>=0&&index<r.tileBank.length&&!r.chosen.includes(index)&&r.chosen.length<limit)r.chosen.push(index);
  }else if(dataset.vocabularyReturn!==undefined){
    const index=Number(dataset.vocabularyReturn);if(Number.isInteger(index)&&index>=0&&index<r.chosen.length)r.chosen.splice(index,1);
  }
  render();
}

// Dialogue handles introductions/greetings and replies; Vocabulary focuses on the other groups.
const VOCABULARY_CATEGORIES=VOCAB_CATEGORIES.filter(category=>!['introductions','replies'].includes(category.id));
const VOCABULARY_WORDS=WORDS.filter(word=>VOCABULARY_CATEGORIES.some(category=>category.id===vocabularySection(word)));
const VOCABULARY_WORD_IDS=new Set(VOCABULARY_WORDS.map(word=>word.id));

// Shared vocabulary library and launch point for Recall and Rebuild.
function vocabularyStudySet(key){
  let words=VOCABULARY_WORDS,label,description,section='main';
  if(key==='all'){
    label='All words';description='Review every vocabulary form from Chapters 1–2.';
  }else if(/^chapter-[12]$/.test(key)){
    const ch=Number(key.slice(-1));section='chapter';words=VOCABULARY_WORDS.filter(w=>w.ch===ch);
    label=`Chapter ${ch} · p.${ch===1?1:6}`;description='Review the vocabulary from this chapter.';
  }else{
    const category=VOCABULARY_CATEGORIES.find(c=>key===`category-${c.id}`);if(!category)return null;
    section='category';words=VOCABULARY_WORDS.filter(w=>vocabularySection(w)===category.id);
    label=category.label;description=category.description;
  }
  return {key,section,label,description,ids:words.map(w=>w.id)};
}
function vocabularyMenu(){return vocabularyContent();}
function openVocabularyContent(key){
  const set=vocabularyStudySet(key);if(!set)return;
  rememberPage();state.vocabularyContentKey=key;state.vocabularyMenu=set.section;
  state.view='vocabulary-content';state.round=null;state.modal=false;render();window.scrollTo({top:0,behavior:'smooth'});
}
function startVocabularyPractice(mode){
  if(!['write','vocabulary-rebuild'].includes(mode))return;
  const set=vocabularyStudySet(state.vocabularyContentKey);if(!set)return;
  state[`${wordModePrefix(mode)}Menu`]=set.section;
  startWordPractice(mode,set.ids,set.label,set.key);
}
const VOCAB_VISUALS={
  '1-01':'👋','1-02':'👉','1-03a':'👉','1-03b':'👉','1-04':'🪪','1-05':'🎈','1-06':'🌏',
  '1-07':'📚','1-08':'🏫','1-09':'🎓','1-10':'🏢','1-11':'🪪','1-12':'🏦','1-13':'⚕️','1-14':'🔬',
  '1-15':'🏫','1-16':'🏥','1-17a':'❓','1-17b':'❓','1-18':'🎂','1-19a':'🎂❓','1-19b':'🎂❓','1-20':'✅','1-21':'❌',
  '1-c1':'👋🤝','1-c2':'🌏✈️','1-c3a':'🤝','1-c3b':'🤝','1-c3c':'🤝','1-c3d':'🤝','1-c4':'💬','1-c5':'🪪❓','1-c6':'👉🪪',
  '1-r1':'🇺🇸','1-r2':'🇬🇧','1-r3':'🇮🇳','1-r4':'🇮🇩','1-r5':'🇰🇷','1-r6':'🇹🇭','1-r7':'🇨🇳','1-r8':'🇩🇪','1-r9':'🇯🇵','1-r10':'🇧🇷',
  '2-01':'📕','2-02':'📕','2-03':'📕','2-04':'📕','2-05':'📕','2-06':'📕',
  '2-07':'📕','2-08':'📚','2-09':'📖','2-10':'📰','2-11':'📓','2-12':'📔','2-13':'🪪','2-14':'💳','2-15':'✏️','2-16':'🖊️','2-17':'✏️',
  '2-18':'🔑','2-19':'⌚','2-20':'☂️','2-21':'👜','2-22':'💿','2-23':'📺','2-24':'📻','2-25':'📷','2-26':'💻','2-27':'🚗','2-28':'🪑💻','2-29':'🪑',
  '2-30':'🍫','2-31':'☕','2-32a':'🎁','2-32b':'🎁','2-33':'🇬🇧💬','2-34':'🇯🇵💬','2-35':'🌏💬','2-36':'📦❓','2-37':'✅💬',
  '2-d1':'🏠','2-d2a':'🤝↔️','2-d2b':'🤝↔️','2-d2c':'🤝↔️','2-d2d':'🤝↔️',
  '2-c1':'💬','2-c2':'❗','2-c3':'🎁','2-c4a':'♡','2-c4b':'♡','2-c4c':'♡','2-c4d':'♡','2-c5':'💡💬','2-c6':'✖','2-c7':'💡'
};
const PIGGY_VISUAL_CATEGORIES=new Set(['people','occupations','questions','introductions','courtesy','replies']);
const PIGGY_VISUAL_ACCENTS={
  '1-01':'👋','1-02':'👉','1-03a':'👉','1-03b':'👉','1-04':'🪪','1-05':'🎈','1-06':'🌏',
  '1-07':'📚','1-08':'🏫','1-09':'🎓','1-10':'🏢','1-11':'🪪','1-12':'🏦','1-13':'⚕️','1-14':'🔬',
  '1-17a':'❓','1-17b':'❓','1-18':'🎂','1-19a':'🎂','1-19b':'🎂',
};
function piggyAccent(word){return PIGGY_VISUAL_ACCENTS[word.id]||({introductions:'💬',courtesy:'♡',replies:'↔',people:'👋',occupations:'📚',questions:'❓'})[vocabularySection(word)]||'✦';}
function vocabularyVisual(word){
  const id=`vocab-visual-${word.id}`,category=vocabularySection(word);
  let scene=`<circle cx="250" cy="100" r="76" fill="#fffefb"/><text x="250" y="128" text-anchor="middle" font-size="76" font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif">${VOCAB_VISUALS[word.id]}</text>`;
  if(PIGGY_VISUAL_CATEGORIES.has(category)||word.id==='1-06'){
    scene=`<circle cx="250" cy="100" r="76" fill="#fffefb"/>${luluPiggy(250,101,1.02)}<circle cx="336" cy="57" r="30" fill="#eaddff"/><text x="336" y="69" text-anchor="middle" font-size="31" font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif">${piggyAccent(word)}</text>`;
  }
  if(category==='demonstratives'){
    const position={'2-01':95,'2-04':95,'2-02':250,'2-05':250,'2-03':415,'2-06':415}[word.id];
    scene=`<path d="M40 156h420" stroke="#bccab0" stroke-width="2"/>${luluPiggy(95,115,.67,'#6750a4')}${luluPiggy(250,115,.67,'#3f6676')}<text x="${position}" y="70" text-anchor="middle" font-size="43">📕</text><text x="95" y="183" text-anchor="middle" fill="#8e4936" font-size="14">You</text><text x="250" y="183" text-anchor="middle" fill="#3f6676" font-size="14">Listener</text>`;
  }
  return `<figure class="vocabulary-visual"><svg viewBox="0 0 500 200" role="img" aria-labelledby="${id}"><title id="${id}">${esc(word.en)}</title><rect x="5" y="5" width="490" height="190" rx="24" fill="${['food','objects'].includes(category)?'#f7edca':category==='nationality'?'#e3eaf0':'#edf2e6'}"/>${scene}</svg></figure>`;
}
function vocabularyContent(){
  const set=vocabularyStudySet(state.vocabularyContentKey)||vocabularyStudySet('all');
  const chapters=[1,2].map(ch=>vocabularyStudySet(`chapter-${ch}`));
  const categories=VOCABULARY_CATEGORIES.map(category=>vocabularyStudySet(`category-${category.id}`));
  const entries=sets=>options(sets.map(entry=>[entry.key,entry.label]),set.key);
  return `<div class="study-wrap dialogue-selector"><label class="field-label" for="vocabulary-selection">Vocabulary selection</label><select id="vocabulary-selection" class="filter" data-vocabulary-select aria-label="Vocabulary selection">${entries([vocabularyStudySet('all')])}<optgroup label="${esc(translateText('By chapter'))}">${entries(chapters)}</optgroup><optgroup label="${esc(translateText('By category'))}">${entries(categories)}</optgroup></select><div class="dialogue-intro"><h1>${esc(set.label)}</h1><p>${esc(set.description)}</p></div></div><div class="study-wrap dialogue-content vocabulary-content"><div class="dialogue-guide-actions"><button class="button primary" data-vocabulary-practice="write">Recall ${icon('arrow')}</button><button class="button soft" data-vocabulary-practice="vocabulary-rebuild">Rebuild ${icon('arrow')}</button></div><div class="guide-cards">${set.ids.map(id=>{const word=wordBy(id),spelling=hasKanji(word)?word.c:word.jp;return `<article class="paper guide-card vocabulary-guide-card" data-vocabulary-guide="${word.id}">${vocabularyVisual(word)}<span class="eyebrow muted">${sourceTag(word)}</span><h2 class="jp" lang="ja">${esc(spelling)}</h2>${spelling!==word.kana?`<p class="jp vocabulary-reading" lang="ja">${esc(word.kana)}</p>`:''}<p class="guide-meaning">${esc(word.zh)} · ${esc(word.en)}</p>${word.note?`<p class="small muted">${esc(word.note)}</p>`:''}</article>`;}).join('')}</div></div>`;
}
