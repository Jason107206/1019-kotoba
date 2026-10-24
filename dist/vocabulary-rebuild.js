'use strict';
function rebuildMenu(){return header('Rebuild, your way.','Choose vocabulary or sentences, then put the tiles in order.')+`<section class="mode-grid two-modes">${activityCard('Vocabulary Rebuild','Build the hiragana reading from a bank of similar kana.',`${WORDS.length} forms`,'data-view="vocabulary-menu"','mode-blue','Choose word set','hiragana')}${activityCard('Sentence Rebuild','Put the sentence tiles in order.',`${SENTENCES.length} sentences`,'data-view="sentences"','','Start practice','sentences')}</section>`;}
const vocabularyReading=word=>clean(word.kana);
function similarKanaUnits(unit){
  const groups=['かが','きぎ','くぐ','けげ','こご','さざ','しじ','すずづ','せぜ','そぞ','ただ','ちぢ','つづ','てで','とど','はばぱ','ひびぴ','ふぶぷ','へべぺ','ほぼぽ','やゃ','ゆゅ','よょ','つっ','あぁ','いぃ','うぅ','えぇ','おぉ','ーうお','いえ','ぬめ','ねれわ','るろ','しつ','そん','きさ'];
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
function vocabularyRebuildCard(){
  const w=wordBy(current()),r=state.round,target=vocabularyReading(w),limit=kanaUnits(target).length;
  const prompt=hasKanji(w)?w.c:w.zh;
  return `<div class="paper vocabulary-rebuild-card"><div class="eyebrow muted">${sourceTag(w)}</div><h2 class="vocabulary-rebuild-prompt ${hasKanji(w)?'jp':''}" ${hasKanji(w)?'lang="ja"':''}>${esc(prompt)}</h2><p class="muted">${hasKanji(w)?`${esc(w.zh)} · `:''}${esc(w.en)}</p><p class="small muted" style="margin-top:18px">Build the reading. Watch for similar kana, long vowels and small letters.</p><div class="token-area ${r.chosen.length?'filled':''}" aria-label="Your hiragana answer">${r.chosen.length?r.chosen.map((index,position)=>`<button class="tile jp" lang="ja" data-vocabulary-return="${position}" ${r.checked?'disabled':''}>${esc(r.tileBank[index])}</button>`).join(''):'<span class="empty-hint">Put your answer here.</span>'}</div><div class="token-bank vocabulary-tile-bank" aria-label="Hiragana bank">${r.tileBank.map((unit,index)=>`<button class="tile jp" lang="ja" data-vocabulary-tile="${index}" ${r.checked||r.chosen.includes(index)?'disabled':''}>${esc(unit)}</button>`).join('')}</div><div class="small muted">${r.chosen.length} / ${limit} units</div>${r.checked?`<div class="feedback ${r.result?'':'bad'}" role="status"><strong>${r.result?'Correct!':'The correct answer is:'}</strong><div class="jp" lang="ja">${esc(target)}</div><p class="small jp">${kanaUnits(target).map(esc).join(' · ')}</p></div><div class="card-actions">${button('Next word '+icon('arrow'),'next','primary')}</div>`:`<div class="card-actions">${button('Clear','vocabularyClear','ghost')}${button('Undo','vocabularyUndo','ghost',r.chosen.length?'':'disabled')}${button('Check answer','vocabularyCheck','primary',r.chosen.length===limit?'':'disabled')}</div><div style="text-align:center;margin-top:14px"><button class="scope-link" data-action="vocabularyReveal">Show answer & mark for review</button></div>`}</div>`;
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
