'use strict';
// Canonical composition and invisible layout characters must not affect spelling.
// NFC preserves distinct kana, small letters, long vowels and character counts.
const rebuildText=text=>String(text??'').normalize('NFC').replace(/[\s\p{Cf}～~]/gu,'');
const vocabularyReading=word=>rebuildText(word.kana);
const rebuildReady=(answer,target)=>rebuildText(answer).length===rebuildText(target).length;
const rebuildCorrect=(answer,target)=>rebuildText(answer)===rebuildText(target);
function similarKanaUnits(unit){
  const groups=['かが','きぎ','くぐ','けげ','こご','さざ','しじ','すずづ','せぜ','そぞ','ただ','ちぢ','つづ','てで','とど','はばぱ','ひびぴ','ふぶぷ','へべぺ','ほぼぽ','やゃ','ゆゅ','よょ','つっ','あお','うぅ','えぇ','おぉ','ーうお','いえ','ぬめ','ねれわ','るろ','しつ','そん','きさ'];
  const candidates=[],letters=[...unit];
  letters.forEach((letter,index)=>{for(const group of groups)if(group.includes(letter))for(const replacement of group)if(replacement!==letter){const copy=[...letters];copy[index]=replacement;candidates.push(copy.join(''));}});
  if(/^[がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ]/u.test(unit))candidates.push('っ'+unit);
  return [...new Set(candidates)];
}
function vocabularyTileBank(word){
  const target=kanaUnits(vocabularyReading(word)),alternatives=[...new Set([...target.flatMap(similarKanaUnits),...(word.distractors||[]).flatMap(kanaUnits)])].filter(unit=>!target.includes(unit));
  if(!alternatives.length)alternatives.push(...['に','と','は','が','を','で','の','か'].filter(unit=>!target.includes(unit)).slice(0,4));
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
  return `<p class="small muted" style="margin-top:var(--space-4)">Build the reading. Watch for similar kana, long vowels and small letters.</p><div class="token-area vocabulary-answer-slots ${round.chosen.length?'filled':''}" role="group" aria-label="Your hiragana answer">${vocabularyAnswerSlots(round,limit,prefix)}</div><div class="token-bank vocabulary-tile-bank" aria-label="Hiragana bank">${round.tileBank.map((unit,index)=>`<button class="tile jp ${round.chosen.includes(index)?'selected':''}" lang="ja" data-${prefix}-tile="${index}" ${round.checked||round.chosen.includes(index)?'disabled':''}>${esc(unit)}</button>`).join('')}</div><div class="small muted">${round.chosen.length} / ${limit} units</div>`;
}
function rebuildTileControls(round,target,prefix='vocabulary'){
  return `<div class="card-actions">${button('Clear',`${prefix}Clear`,'ghost')}${button('Undo',`${prefix}Undo`,'ghost',round.chosen.length?'':'disabled')}${button('Check answer',`${prefix}Check`,'primary',rebuildReady(round.chosen.map(i=>round.tileBank[i]).join(''),target)?'':'disabled')}</div><div style="text-align:center;margin-top:var(--space-4)"><button class="scope-link" data-action="${prefix}Reveal">Show answer & mark for review</button></div>`;
}
function vocabularyRebuildCard(){
  const w=wordBy(current()),r=state.round,target=vocabularyReading(w),limit=kanaUnits(target).length;
  const prompt=hasKanji(w)?w.c:w.zh;
  return `<div class="paper vocabulary-rebuild-card">${vocabularyVisual(w)}<div class="eyebrow muted">${sourceTag(w)}</div><h2 class="vocabulary-rebuild-prompt ${hasKanji(w)?'jp':''}" ${hasKanji(w)?'lang="ja"':''}>${esc(prompt)}</h2><p class="muted">${hasKanji(w)?`${esc(w.zh)} · `:''}${esc(w.en)}</p>${rebuildTileInputs(r,target)}${r.checked?`<div class="feedback ${r.result?'':'bad'}" role="status"><strong>${r.result?'Correct!':'The correct answer is:'}</strong><div class="jp" lang="ja">${esc(target)}</div><p class="small jp">${kanaUnits(target).map(esc).join(' · ')}</p></div><div class="card-actions">${button('Next word '+icon('arrow'),'next','primary')}</div>`:rebuildTileControls(r,target)}</div>`;
}
function vocabularyAction(action){
  const r=state.round;if(state.view!=='vocabulary-rebuild'||!r||r.checked||r.index>=r.ids.length)return;
  if(action==='vocabularyClear')r.chosen=[];
  else if(action==='vocabularyUndo')r.chosen.pop();
  else if(['vocabularyCheck','vocabularyReveal'].includes(action)){
    const target=vocabularyReading(wordBy(current()));
    if(action==='vocabularyCheck'&&!rebuildReady(vocabularyAnswer(),target))return;
    const ok=action==='vocabularyCheck'&&rebuildCorrect(vocabularyAnswer(),target);
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

// Keep every word taught by a Dialogue scene in Dialogue, including its WH-words.
// Other introduction/reply forms were already outside Vocabulary.
const DIALOGUE_WORD_IDS=new Set([...DIALOGUES.filter(q=>!q.lesson),...demonstrativeWords].map(item=>item.word));
const VOCABULARY_CATEGORIES=VOCAB_CATEGORIES.filter(category=>!['introductions','demonstratives'].includes(category.id));
const VOCABULARY_WORDS=WORDS.filter(word=>(wordChapters(word).some(ch=>ch>=3)||!DIALOGUE_WORD_IDS.has(word.id)&&!['courtesy','replies'].includes(vocabularySection(word)))&&VOCABULARY_CATEGORIES.some(category=>category.id===vocabularySection(word)));
const VOCABULARY_WORD_IDS=new Set(VOCABULARY_WORDS.map(word=>word.id));

// Shared vocabulary library and launch point for Recall and Rebuild.
function vocabularyStudySet(key){
  let words=VOCABULARY_WORDS,label,description,section='main';
  if(key==='all'){
    label='All words';description='Study vocabulary from Chapters 1–4.';
  }else if(/^chapter-[1-4]$/.test(key)){
    const ch=Number(key.slice(-1));section='chapter';words=VOCABULARY_WORDS.filter(w=>inChapter(w,ch));
    label=chapterLabel(ch);description='Review the vocabulary from this chapter.';
  }else{
    const category=VOCABULARY_CATEGORIES.find(c=>key===`category-${c.id}`);if(!category)return null;
    section='category';words=VOCABULARY_WORDS.filter(w=>vocabularySection(w)===category.id);
    label=category.label;description=category.description;
  }
  return {key,section,label,description,ids:words.map(w=>w.id)};
}
function vocabularyMenu(){return vocabularyContent();}
function openVocabularyContent(key){
  const set=vocabularyStudySet(key)||vocabularyStudySet('all');key=set.key;
  rememberPage();state.vocabularyContentKey=key;state.vocabularyMenu=set.section;
  state.view='vocabulary-content';state.round=null;state.modal=false;render();window.scrollTo({top:0,behavior:'smooth'});
}
function startVocabularyPractice(mode){
  if(!['write','vocabulary-rebuild'].includes(mode))return;
  const set=vocabularyStudySet(state.vocabularyContentKey)||vocabularyStudySet('all');state.vocabularyContentKey=set.key;
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
const PIGGY_VISUAL_WORD_IDS=new Set(['1-06','2-07','2-08','2-32a','2-32b','2-33','2-34','2-35']);
const PIGGY_VISUAL_POSES={
  '1-01':'wave','1-02':'point','1-03a':'point','1-03b':'point','1-04':'bow','1-05':'wave','1-06':'point',
  '1-07':'teacher','1-08':'teacher','1-09':'reading','1-10':'speaking','1-11':'speaking','1-12':'speaking','1-13':'doctor','1-14':'doctor',
  '1-17a':'thinking','1-17b':'thinking','1-18':'thinking','1-19a':'thinking','1-19b':'thinking',
  '2-07':'reading','2-08':'reading','2-32a':'gift','2-32b':'gift','2-33':'speaking','2-34':'speaking','2-35':'speaking',
};
function piggyPose(word){return PIGGY_VISUAL_POSES[word.id]||({introductions:'bow',courtesy:'bow',replies:'speaking',people:'wave',occupations:'teacher',questions:'thinking'})[vocabularySection(word)]||'idle';}
// Equal square cells keep all three occupations at the same visual scale.
const LULU_OCCUPATIONS={'1-10':0,'1-11':0,'1-12':1,'1-14':2};
function occupationPiggy(word){
  const cell=LULU_OCCUPATIONS[word.id];
  return `<svg class="lulu-piggy occupation-pig" data-occupation="${word.id}" x="157" y="7" width="186" height="186" viewBox="${cell*724} 0 724 724" aria-hidden="true"><image href="icons/lulu-occupations.png" width="2172" height="724"/></svg>`;
}
function vocabularyVisual(word,compact=false){
  const id=`vocab-visual-${word.id}`,category=vocabularySection(word);
  let scene=`<circle cx="250" cy="100" r="76" fill="#fffaf0"/><text x="250" y="128" text-anchor="middle" font-size="76" font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif">${VOCAB_VISUALS[word.id]}</text>`;
  if(PIGGY_VISUAL_CATEGORIES.has(category)||PIGGY_VISUAL_WORD_IDS.has(word.id)){
    scene=`<circle cx="250" cy="100" r="76" fill="#fffaf0"/>${luluPiggy(250,100,1.55,piggyPose(word))}`;
  }
  if(Object.hasOwn(LULU_OCCUPATIONS,word.id))scene=`<circle cx="250" cy="100" r="94" fill="#fffaf0"/>${occupationPiggy(word)}`;
  if(category==='demonstratives'){
    const position={'2-01':95,'2-04':95,'2-02':250,'2-05':250,'2-03':415,'2-06':415}[word.id];
    scene=`${luluPiggy(95,110,.9,'point')}${luluPiggy(250,110,.9)}<text x="${position}" y="57" text-anchor="middle" font-size="43">📕</text><text x="95" y="183" text-anchor="middle" fill="#8e4936" font-size="14">You</text><text x="250" y="183" text-anchor="middle" fill="#3f6676" font-size="14">Listener</text>`;
  }
  return `<figure class="vocabulary-visual"><svg viewBox="${compact?'150 0 200 200':'0 0 500 200'}" role="img" aria-labelledby="${id}"><title id="${id}">${esc(word.en)}</title>${lessonBackdrop(200,156)}${scene}</svg></figure>`;
}
function vocabularyBrowse(mode){
  if(!['all','category','chapter'].includes(mode))return;
  const key=mode==='all'?'all':mode==='chapter'?'chapter-1':`category-${VOCABULARY_CATEGORIES[0].id}`;
  openVocabularyContent(key);
}
function vocabularyContent(){
  const set=vocabularyStudySet(state.vocabularyContentKey)||vocabularyStudySet('all');
  state.vocabularyContentKey=set.key;
  const mode=set.section==='main'?'all':set.section;
  const chips=(entries,attribute,selected)=>entries.map(([key,label])=>`<button class="dialogue-chip${key===selected?' selected':''}" data-${attribute}="${key}" aria-pressed="${key===selected}">${esc(label)}</button>`).join('');
  const filters=mode==='category'?VOCABULARY_CATEGORIES.map(c=>[`category-${c.id}`,c.label]):CHAPTERS.map(ch=>[`chapter-${ch}`,chapterLabel(ch)]);
  return `<div class="study-wrap vocabulary-selector"><div class="dialogue-chip-row vocabulary-mode-row" role="group" aria-label="Vocabulary selection">${chips([['all','All words'],['category','By category'],['chapter','By chapter']],'vocabulary-browse',mode)}</div>${mode==='all'?'':`<div class="field-label vocabulary-filter-label" id="vocabulary-filter-label">${mode==='category'?'Category':'Chapter'}</div><div class="dialogue-chip-row vocabulary-filter-row" data-chip-group="${mode}" role="group" aria-labelledby="vocabulary-filter-label">${chips(filters,'vocabulary-set',set.key)}</div>`}<div class="dialogue-intro"><h1>${esc(set.label)}</h1><p>${esc(set.description)}</p></div><div class="dialogue-guide-actions"><button class="button soft" data-vocabulary-practice="vocabulary-rebuild">Rebuild ${icon('arrow')}</button><button class="button primary" data-vocabulary-practice="write">Recall ${icon('arrow')}</button></div></div><div class="study-wrap dialogue-content vocabulary-content"><div class="guide-cards">${set.ids.map(id=>{const word=wordBy(id),spelling=hasKanji(word)?word.c:word.jp;return `<article class="paper guide-card vocabulary-guide-card" data-vocabulary-guide="${word.id}">${vocabularyVisual(word,true)}<span class="eyebrow muted">${sourceTag(word)}</span><h2 class="jp" lang="ja">${esc(spelling)}</h2>${spelling!==word.kana?`<p class="jp vocabulary-reading" lang="ja">${esc(word.kana)}</p>`:''}<p class="guide-meaning">${esc(word.zh)} · ${esc(word.en)}</p>${word.note?`<p class="small muted">${esc(word.note)}</p>`:''}</article>`;}).join('')}</div></div>`;
}
