'use strict';
function kanjiCharacters(word){return [...word.c].filter(char=>/\p{Script=Han}/u.test(char));}
function strokeMarkup(strokes){return strokes.map(stroke=>{const points=stroke.points.length===1?[stroke.points[0],stroke.points[0]]:stroke.points;return `<path d="M${points.map(point=>point.map(n=>Number(n.toFixed(1))).join(' ')).join(' L')}" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;}).join('');}
function kanjiWritingCard(){
  const r=state.round,w=wordBy(current());let cell=0;
  const pads=[...w.c].map(char=>{
    if(!/\p{Script=Han}/u.test(char))return `<span class="jp kanji-kana">${esc(char)}</span>`;
    const index=cell++;
    return `<svg class="kanji-pad" data-kanji-cell="${index}" viewBox="0 0 200 200" role="img" aria-label="${esc(translateText('Kanji writing pad'))} ${index+1}"><path class="kanji-grid" d="M100 0v200M0 100h200M0 0l200 200M200 0 0 200"/><g class="kanji-ink">${strokeMarkup(r.ink.filter(stroke=>stroke.cell===index))}</g></svg>`;
  }).join('');
  return `<div class="paper"><div class="eyebrow muted">${sourceTag(w)}</div><h2 class="kanji-reading jp" lang="ja">${esc(w.kana)}</h2><p>${esc(w.zh)} · ${esc(w.en)}</p>${luluSectionArt('handwriting','lulu-small')}<p class="small muted kanji-instruction">Draw the missing kanji. Kana are provided.</p><div class="kanji-writing-row ${r.revealed?'locked':''}">${pads}</div>${r.revealed?`<section class="feedback" role="status">${luluSprite('review','lulu-small')}<strong>Compare with the model</strong><div class="kanji-model jp" lang="ja">${esc(w.c)}</div><p>Check the shapes and parts, then mark your attempt.</p></section>`:`<div class="card-actions">${button('Undo last stroke','kanjiUndo','ghost',r.ink.length?'':'disabled')}${button('Clear writing','kanjiClear','ghost',r.ink.length?'':'disabled')}${button('Reveal model','kanjiReveal','primary')}</div>`}${r.checked?`<div class="feedback ${r.result?'':'bad'}">${luluFeedbackHeading(r)}<strong>${r.result?'Marked as recalled.':'Saved for another try.'}</strong><p>Handwriting progress is based on your self-check.</p></div><div class="card-actions">${button('Next word '+icon('arrow'),'next','primary')}</div>`:r.revealed?`<div class="card-actions">${button('Practise again','kanjiMissed','ghost')}${button('I wrote it correctly','kanjiCorrect','primary',r.ink.length?'':'disabled')}</div>`:''}</div>`;
}
function kanjiWritingAction(action){
  const r=state.round;if(state.view!=='kanji-writing'||!r||r.index>=r.ids.length||r.checked)return;
  if(action==='kanjiUndo'&&!r.revealed)r.ink.pop();
  else if(action==='kanjiClear'&&!r.revealed)r.ink=[];
  else if(action==='kanjiReveal')r.revealed=true;
  else if(r.revealed&&['kanjiCorrect','kanjiMissed'].includes(action)){
    if(action==='kanjiCorrect'&&!r.ink.length)return;
    const ok=action==='kanjiCorrect';r.result=ok;record('kanjiWriting',current(),ok);completeRound(ok);
  }else return;
  render();
}
let kanjiPointer=null;
function kanjiPoint(event,pad){const rect=pad.getBoundingClientRect();return [Math.max(0,Math.min(200,(event.clientX-rect.left)*200/rect.width)),Math.max(0,Math.min(200,(event.clientY-rect.top)*200/rect.height))];}
function startKanjiStroke(event){
  const pad=event.target.closest?.('[data-kanji-cell]'),r=state.round;
  if(!pad||state.view!=='kanji-writing'||!r||r.checked||r.revealed||kanjiPointer||event.isPrimary===false||(event.button!==undefined&&event.button!==0))return;
  const cell=Number(pad.dataset.kanjiCell);if(!Number.isInteger(cell)||cell<0||cell>=kanjiCharacters(wordBy(current())).length)return;
  event.preventDefault();pad.setPointerCapture(event.pointerId);
  const stroke={cell,points:[kanjiPoint(event,pad)]};r.ink.push(stroke);kanjiPointer={id:event.pointerId,pad,stroke,round:r};
  updateKanjiInk(pad,r);
}
function updateKanjiInk(pad,round){const ink=pad.querySelector('.kanji-ink');if(ink)ink.innerHTML=strokeMarkup(round.ink.filter(stroke=>stroke.cell===Number(pad.dataset.kanjiCell)));}
function moveKanjiStroke(event){
  const active=kanjiPointer;if(!active||event.pointerId!==active.id)return;
  if(active.round!==state.round||state.view!=='kanji-writing'||state.round.revealed){kanjiPointer=null;return;}
  event.preventDefault();active.stroke.points.push(kanjiPoint(event,active.pad));updateKanjiInk(active.pad,active.round);
}
function endKanjiStroke(event){
  const active=kanjiPointer;if(!active||event.pointerId!==active.id)return;
  kanjiPointer=null;if(active.pad.hasPointerCapture?.(event.pointerId))active.pad.releasePointerCapture(event.pointerId);
  if(state.view==='kanji-writing'&&state.round===active.round)render();
}
document.addEventListener('pointerdown',startKanjiStroke);
document.addEventListener('pointermove',moveKanjiStroke,{passive:false});
document.addEventListener('pointerup',endKanjiStroke);
document.addEventListener('pointercancel',endKanjiStroke);
