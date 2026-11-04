'use strict';
// Adaptive vocabulary revision. Kanji stroke paths come from KanjiVG (CC BY-SA 3.0).
const REGIONAL_KANJI=new Set(['所','食','話','試','議','社','画','図','昼','曜','館','機','靴','終','強','部','郵','銀','後','術','階','号','段','新','電','会','番','映']);
function vocabEligibleKanji(word){return hasKanji(word)?[...word.c].filter(char=>REGIONAL_KANJI.has(char)):[];}
function vocabRevisionPool(){return scopedWords('vocabulary',true);}
function vocabKanjiQuestions(words){return words.flatMap(w=>vocabEligibleKanji(w).map(char=>({id:w.id,char})));}
function vocabChunk(ids,size=5){const parts=[];for(let i=0;i<ids.length;i+=size)parts.push(ids.slice(i,i+size));return parts;}
function vocabTargetMarkup(word){
  if(hasKanji(word)&&word.c&&word.kana&&word.c!==word.kana)return `<div class="kanji-stack vocab-target"><p class="kanji-reading jp" lang="ja">${esc(word.kana)}</p><h2 class="kanji-form jp" lang="ja">${esc(word.c)}</h2></div>`;
  return `<h2 class="jp vocab-target" lang="ja">${esc(word.jp||word.kana)}</h2>`;
}
function vocabMeaning(word){return nL(word.en,word.zh);}
function vocabResetQuestion(round){round.selected=null;round.choices=[];round.checked=false;round.final=false;round.feedback=null;round.luluFeedback=null;round.attempts=0;round.chosen=[];round.tileBank=[];round.b='';round.c='';round.result=null;round.revealed=false;}
function vocabEnqueue(round,item){
  if(round.queue.some((entry,index)=>index>round.queueIndex&&entry.id===item.id&&entry.stage===item.stage&&entry.char===item.char))return;
  const gap=round.queue.length-round.queueIndex-1;
  const at=gap>0?round.queueIndex+1+Math.max(1,Math.floor(Math.random()*gap)):round.queue.length;
  round.queue.splice(Math.min(round.queue.length,at),0,item);
}
function vocabPlannedAttempts(words){return words.reduce((n,w)=>n+4+vocabEligibleKanji(w).length,0);}
function vocabAddExtra(round,n){if(n)round.total=(round.total||0)+n;}
function vocabNextKanji(word,round){return vocabEligibleKanji(word).find(char=>!round.kanjiOk[word.id+':'+char])||null;}
function vocabAfterMatch(round,word,ok){
  if(ok){const char=vocabNextKanji(word,round);vocabEnqueue(round,char?{id:word.id,stage:'kanji',char}:{id:word.id,stage:'rebuild'});}
  else{vocabEnqueue(round,{id:word.id,stage:'match'});vocabAddExtra(round,1);}
}
function vocabAfterTranslate(round,word,ok){
  if(ok){const char=vocabNextKanji(word,round);vocabEnqueue(round,char?{id:word.id,stage:'kanji',char}:{id:word.id,stage:'rebuild'});}
  else{vocabEnqueue(round,{id:word.id,stage:'translate'});vocabAddExtra(round,1);}
}
function vocabRecordStep(round,key){if(!round.completed.includes(key))round.completed.push(key);}
function vocabStartAdaptive(words,home='vocabulary-content'){
  const ids=shuffle(words.map(w=>w.id)),parts=vocabChunk(ids);
  state.learningReturn=home;
  state.round={mode:'vocab-revision',activity:'adaptive',ids,total:vocabPlannedAttempts(words),answered:0,completed:[],parts,batch:0,phase:'preview',part:0,matchOrder:[],matchIndex:0,translateOrder:[],translateIndex:0,firstMatch:{},firstTranslate:{},kanjiOk:{},queue:[],queueIndex:0,stageLabel:'Preview'};
  vocabResetQuestion(state.round);state.view='vocab-revision';save();render();window.scrollTo({top:0,behavior:'auto'});
}
function vocabStartIndependent(activity,words,home='vocabulary-content'){
  const ids=shuffle(words.map(w=>w.id));
  const questions=activity==='kanji'?shuffle(vocabKanjiQuestions(words)):[];
  state.learningReturn=home;
  state.round={mode:'vocab-revision',activity,ids,questions,total:activity==='match'?ids.length*2:activity==='kanji'?questions.length:ids.length,completed:[],index:0,phase:activity==='match'?'match':'',translateOrder:[],firstMatch:{},firstTranslate:{},kanjiOk:{},stageLabel:activity};
  vocabResetQuestion(state.round);
  if(activity==='match')vocabPrepareMatch(state.round,ids[0]);
  else if(activity==='kanji')vocabPrepareKanji(state.round,questions[0]);
  else if(activity==='rebuild')vocabPrepareRebuild(state.round,ids[0]);
  else if(activity==='recall')vocabPrepareRecall(state.round,ids[0]);
  state.view='vocab-revision';save();render();window.scrollTo({top:0,behavior:'auto'});
}
function vocabCurrentPart(round){return round.parts[round.batch+round.part]||[];}
function vocabCategoryPool(round,id){
  const ids=round.activity==='adaptive'?vocabCurrentPart(round):round.ids||[];
  const pool=ids.map(wordBy).filter(item=>item&&item.id!==id);
  const seen=new Set(pool.map(item=>item.id));
  for(const extra of quiz2Words()){if(extra.id!==id&&!seen.has(extra.id)&&quiz2Bucket(extra)===quiz2Bucket(wordBy(id))){pool.push(extra);seen.add(extra.id);}}
  return pool;
}
function vocabPrepareMatch(round,id){
  const word=wordBy(id),pool=vocabCategoryPool(round,id);
  const distractors=shuffle(pool).slice(0,3);
  while(distractors.length<3){const extra=WORDS.find(item=>wordGameReady(item)&&item.id!==id&&!distractors.some(d=>d.id===item.id));if(!extra)break;distractors.push(extra);}
  round.q={id,stage:'match'};round.choices=shuffle([word,...distractors]).map(item=>item.id);round.selected=null;round.checked=false;round.final=false;round.feedback=null;round.luluFeedback=null;
}
function vocabPrepareTranslate(round,id){
  const word=wordBy(id),pool=vocabCategoryPool(round,id);
  const used=new Set([vocabJapaneseForm(word)]);
  const distractors=[];
  for(const item of shuffle(pool)){const form=vocabJapaneseForm(item);if(!form||used.has(form))continue;used.add(form);distractors.push(item);if(distractors.length===2)break;}
  while(distractors.length<2){const extra=WORDS.find(item=>wordGameReady(item)&&item.id!==id&&!used.has(vocabJapaneseForm(item)));if(!extra)break;used.add(vocabJapaneseForm(extra));distractors.push(extra);}
  round.q={id,stage:'translate'};round.choices=shuffle([word,...distractors]).map(item=>item.id);round.selected=null;round.checked=false;round.final=false;round.feedback=null;round.luluFeedback=null;
}
function vocabPrepareKanji(round,question){
  if(!REGIONAL_KANJI.has(question.char))return false;
  const options=shuffle([{kind:'correct',glyph:'jp'},{kind:'tc',glyph:'tc'}]);
  round.q={id:question.id,stage:'kanji',char:question.char};round.choices=options;round.selected=null;round.checked=false;round.final=false;round.feedback=null;round.luluFeedback=null;return true;
}
function vocabPrepareRebuild(round,id){const word=wordBy(id);round.q={id,stage:'rebuild'};round.tileBank=vocabularyTileBank(word);round.chosen=[];round.checked=false;round.final=false;round.feedback=null;round.luluFeedback=null;round.result=null;}
function vocabPrepareRecall(round,id){round.q={id,stage:'recall'};round.b='';round.c='';round.checked=false;round.final=false;round.feedback=null;round.luluFeedback=null;round.result=null;round.revealed=false;}
function vocabMarkComplete(round,id){if(!round.completed.includes(id))round.completed.push(id);}
function vocabBuildAdaptiveQueue(round,batchIds){
  round.phase='adaptive';
  let extra=0;
  round.queue=shuffle(batchIds).map(id=>{
    if(round.firstMatch[id]===false){extra++;return {id,stage:'match'};}
    if(round.firstTranslate[id]===false){extra++;return {id,stage:'translate'};}
    const word=wordBy(id),char=vocabNextKanji(word,round);
    return char?{id,stage:'kanji',char}:{id,stage:'rebuild'};
  });
  vocabAddExtra(round,extra);
  round.queueIndex=0;vocabLoadQueue(round);
}
function vocabAdvanceAdaptive(round){
  if(round.phase==='preview'){round.phase='match';round.matchOrder=shuffle([...vocabCurrentPart(round)]);round.matchIndex=0;vocabPrepareMatch(round,round.matchOrder[0]);return;}
  if(round.phase==='match'){
    if(round.matchIndex<round.matchOrder.length-1){round.matchIndex++;vocabPrepareMatch(round,round.matchOrder[round.matchIndex]);return;}
    round.phase='translate';round.translateOrder=shuffle([...vocabCurrentPart(round)]);round.translateIndex=0;vocabPrepareTranslate(round,round.translateOrder[0]);return;
  }
  if(round.phase==='translate'){
    if(round.translateIndex<round.translateOrder.length-1){round.translateIndex++;vocabPrepareTranslate(round,round.translateOrder[round.translateIndex]);return;}
    if(round.part===0&&round.parts[round.batch+1]){round.part=1;round.phase='preview';vocabResetQuestion(round);return;}
    vocabBuildAdaptiveQueue(round,[...vocabCurrentPart({...round,part:0}),...(round.parts[round.batch+1]||[])]);return;
  }
  round.queueIndex++;
  if(round.queueIndex>=round.queue.length){
    const next=round.batch+2;
    if(next<round.parts.length){round.batch=next;round.part=0;round.phase='preview';vocabResetQuestion(round);return;}
    round.phase='done';return;
  }
  vocabLoadQueue(round);
}
function vocabLoadQueue(round){const item=round.queue[round.queueIndex];if(!item)return;if(item.stage==='match')vocabPrepareMatch(round,item.id);else if(item.stage==='translate')vocabPrepareTranslate(round,item.id);else if(item.stage==='kanji')vocabPrepareKanji(round,item);else if(item.stage==='rebuild')vocabPrepareRebuild(round,item.id);else vocabPrepareRecall(round,item.id);}
function vocabCommitFeedback(round,ok){
  round.feedback=ok?'correct':'wrong';
  luluCommitFeedback(round,{key:`vocab:${round.q?.stage||''}:${round.q?.id||''}:${round.q?.char||''}:${ok}:${Date.now()}`,correct:ok?1:0,total:1});
  if(round.activity==='adaptive')round.answered=(round.answered||0)+1;
}
function vocabSubmit(round){
  const word=wordBy(round.q.id);
  if(round.q.stage==='match'){
    if(!round.selected)return;
    const ok=round.selected===round.q.id;
    if(round.firstMatch[round.q.id]===undefined)round.firstMatch[round.q.id]=ok;
    round.checked=true;round.final=true;vocabCommitFeedback(round,ok);vocabRecordStep(round,'picture:'+round.q.id);
    if(round.activity==='adaptive'&&round.phase==='adaptive')vocabAfterMatch(round,word,ok);
    return;
  }
  if(round.q.stage==='translate'){
    if(!round.selected)return;
    const ok=round.selected===round.q.id;
    if(round.firstTranslate[round.q.id]===undefined)round.firstTranslate[round.q.id]=ok;
    round.checked=true;round.final=true;vocabCommitFeedback(round,ok);vocabRecordStep(round,'translate:'+round.q.id);
    if(round.activity==='adaptive'&&round.phase==='adaptive')vocabAfterTranslate(round,word,ok);
    return;
  }
  if(round.q.stage==='kanji'){
    if(round.selected==null)return;
    const ok=round.choices[round.selected]?.kind==='correct';
    round.checked=true;round.final=true;vocabCommitFeedback(round,ok);
    if(ok){round.kanjiOk[round.q.id+':'+round.q.char]=true;if(round.activity==='adaptive'){const next=vocabNextKanji(word,round);vocabEnqueue(round,next?{id:word.id,stage:'kanji',char:next}:{id:word.id,stage:'rebuild'});}else vocabMarkComplete(round,round.q.id+':'+round.q.char);}
    else if(round.activity==='adaptive'){vocabEnqueue(round,{id:round.q.id,stage:'kanji',char:round.q.char});vocabAddExtra(round,1);}
    return;
  }
  if(round.q.stage==='rebuild'){
    const target=vocabularyReading(word),answer=round.chosen.map(index=>round.tileBank[index]).join('');
    if(!rebuildReady(answer,target))return;
    const ok=rebuildCorrect(answer,target);
    round.checked=true;round.final=true;round.result=ok;vocabCommitFeedback(round,ok);
    if(round.activity==='adaptive'){vocabEnqueue(round,ok?{id:word.id,stage:'recall'}:{id:word.id,stage:'rebuild'});if(!ok)vocabAddExtra(round,1);}
    else if(ok)vocabMarkComplete(round,word.id);
    return;
  }
  const result=gradeWord(word,round.b,round.c,true),ok=result.score===1&&!(!String(round.b||'').trim()||word.c!=='X'&&!String(round.c||'').trim());
  round.result=result;round.checked=true;round.final=true;round.revealed=!ok;vocabCommitFeedback(round,ok);
  if(round.activity==='adaptive'){if(ok)vocabMarkComplete(round,word.id);else{vocabEnqueue(round,{id:word.id,stage:'rebuild'});vocabAddExtra(round,2);}}
  else if(ok)vocabMarkComplete(round,word.id);
}
function vocabNext(round){
  vocabResetQuestion(round);
  if(round.activity==='adaptive'){vocabAdvanceAdaptive(round);return;}
  if(round.activity==='match'){
    if(round.phase!=='translate'){round.index++;if(round.index<round.ids.length){vocabPrepareMatch(round,round.ids[round.index]);return;}round.phase='translate';round.index=0;round.translateOrder=shuffle([...round.ids]);vocabPrepareTranslate(round,round.translateOrder[0]);return;}
    round.index++;if(round.index<round.translateOrder.length)vocabPrepareTranslate(round,round.translateOrder[round.index]);else round.phase='done';return;
  }
  if(round.activity==='kanji'){round.index++;if(round.index<round.questions.length)vocabPrepareKanji(round,round.questions[round.index]);else round.phase='done';return;}
  if(round.activity==='rebuild'){round.index++;if(round.index<round.ids.length)vocabPrepareRebuild(round,round.ids[round.index]);else round.phase='done';return;}
  if(round.activity==='recall'){round.index++;if(round.index<round.ids.length)vocabPrepareRecall(round,round.ids[round.index]);else round.phase='done';return;}
}
function vocabStageLabel(round){
  if(round.phase==='done')return nL('Complete','完成');
  if(round.activity!=='adaptive')return ({match:round.phase==='translate'?nL('Translation matching','翻譯配對'):nL('Picture matching','圖片配對'),kanji:nL('Choose the correct kanji','選擇正確漢字'),rebuild:nL('Rebuild','重組'),recall:nL('Recall','回想')})[round.activity];
  if(round.phase==='preview')return nL('Preview','預覽');
  if(round.phase==='match')return nL('Picture matching','圖片配對');
  if(round.phase==='translate')return nL('Translation matching','翻譯配對');
  return ({match:nL('Picture matching','圖片配對'),translate:nL('Translation matching','翻譯配對'),kanji:nL('Choose the correct kanji','選擇正確漢字'),rebuild:nL('Rebuild','重組'),recall:nL('Recall','回想')})[round.q?.stage]||nL('Adaptive practice','自適應練習');
}
function vocabJapaneseForm(word){return hasKanji(word)&&word.c&&word.c!=='X'?word.c:(word.jp||word.kana||'');}
function vocabOptionFace(word){
  const kana=word.kana||word.jp||'',kanji=hasKanji(word)&&word.c&&word.c!=='X'&&word.c!==kana?word.c:'';
  return kanji?`<span class="translate-reading jp" lang="ja">${esc(kana)}</span><span class="translate-kanji jp" lang="ja">${esc(kanji)}</span>`:`<span class="translate-kanji jp" lang="ja">${esc(kana)}</span>`;
}
function vocabMatchCard(round){
  const word=wordBy(round.q.id);
  const choices=round.choices.map(id=>{const item=wordBy(id),selected=round.selected===id,correct=round.checked&&id===round.q.id,wrong=round.checked&&selected&&id!==round.q.id;return `<button type="button" class="vocab-choice ${selected?'selected ':''}${correct?'correct ':''}${wrong?'wrong ':''}" data-vocab="choice" data-vocab-id="${id}" ${round.checked?'disabled':''} aria-pressed="${selected}"><span class="vocab-choice-art">${luluPreviewVisual(item)}</span><span class="vocab-choice-meaning">${esc(vocabMeaning(item))}</span></button>`;}).join('');
  return `<p class="vocab-instruction">${esc(nL('Choose the matching picture and meaning.','選擇相符的圖片和意思。'))}</p>${vocabTargetMarkup(word)}<div class="vocab-choice-grid" role="group">${choices}</div>`;
}
function vocabTranslateCard(round){
  const word=wordBy(round.q.id);
  const choices=round.choices.map(id=>{const item=wordBy(id),selected=round.selected===id,correct=round.checked&&id===round.q.id,wrong=round.checked&&selected&&id!==round.q.id;return `<button type="button" class="translate-option ${selected?'selected ':''}${correct?'correct ':''}${wrong?'wrong ':''}" data-vocab="choice" data-vocab-id="${id}" ${round.checked?'disabled':''} aria-pressed="${selected}">${vocabOptionFace(item)}</button>`;}).join('');
  return `<p class="vocab-instruction">${esc(nL('Choose the Japanese translation.','選擇日文翻譯。'))}</p><div class="translate-prompt"><span class="translate-lulu">${luluSprite('speaking')}</span><div class="translate-bubble">${esc(vocabMeaning(word))}</div></div><div class="translate-options" role="group">${choices}</div>`;
}
function vocabKanjiCard(round){
  const word=wordBy(round.q.id),char=round.q.char,selected=round.choices[round.selected];
  const blank=selected?`<span class="kanji-blank filled glyph-${selected.glyph}" lang="${selected.glyph==='jp'?'ja':'zh-Hant'}">${esc(char)}</span>`:`<span class="kanji-blank" aria-label="${esc(nL('Blank','空格'))}"></span>`;
  const wordHtml=[...word.c].map(item=>item===char?blank:`<span>${esc(item)}</span>`).join('');
  const options=round.choices.map((option,index)=>{const sel=round.selected===index,correct=round.checked&&option.kind==='correct',wrong=round.checked&&sel&&option.kind!=='correct';return `<button type="button" class="kanji-glyph-option ${sel?'selected ':''}${correct?'correct ':''}${wrong?'wrong ':''}" data-vocab="kanji" data-vocab-index="${index}" data-glyph="${option.glyph}" ${round.checked?'disabled':''} aria-pressed="${sel}"><span class="glyph-${option.glyph}" lang="${option.glyph==='jp'?'ja':'zh-Hant'}">${esc(char)}</span></button>`;}).join('');
  return `<h3 class="jp kanji-reading" lang="ja">${esc(word.kana)}</h3><p class="jp kanji-word" lang="ja">${wordHtml}</p><div class="kanji-glyph-row" role="group">${options}</div>`;
}
function vocabKanjiWord(word,target,svg){return `<span class="vocab-kanji-word jp" lang="ja">${[...word.c].map(char=>char===target?`<span class="vocab-kanji-svg">${svg}</span>`:esc(char)).join('')}</span>`;}
function vocabDiffText(kind){return kind==='missing'?nL('A stroke is missing.','少了一筆。'):kind==='extra'?nL('An extra stroke was added.','多了一筆。'):nL('A stroke is in the wrong place.','有一筆位置不對。');}
function vocabRebuildPrompt(word){return hasKanji(word)&&word.c&&word.c!=='X'?`<h2 class="jp vocab-target" lang="ja">${esc(word.c)}</h2>`:'';}
function vocabRebuildCard(round){
  const word=wordBy(round.q.id),target=vocabularyReading(word),limit=kanaUnits(target).length;
  const slots=Array.from({length:limit},(_,i)=>{const index=round.chosen[i];return index==null?`<span class="vocabulary-slot empty">${i+1}</span>`:`<button type="button" class="tile jp vocabulary-slot filled" data-vocab="slot" data-vocab-index="${i}" ${round.checked?'disabled':''}>${esc(round.tileBank[index])}</button>`;}).join('');
  const bank=round.checked?'':`<div class="token-bank">${round.tileBank.map((unit,index)=>`<button type="button" class="tile jp ${round.chosen.includes(index)?'selected':''}" data-vocab="tile" data-vocab-index="${index}" ${round.chosen.includes(index)||round.checked?'disabled':''}>${esc(unit)}</button>`).join('')}</div>`;
  return `<p class="vocab-instruction">${esc(nL('Rebuild the reading.','重組讀音。'))}</p>${vocabRebuildPrompt(word)}<p class="lexical-meaning">${esc(vocabMeaning(word))}</p><div class="token-area vocabulary-answer-slots">${slots}</div>${bank}`;
}
function vocabRecallCard(round){
  const word=wordBy(round.q.id);
  const fields=[['b',nL('Hiragana','平假名')],['c',nL('Kanji / X','漢字／X')]].filter(([key])=>!(round.checked&&round.result?.[key+'Ok']));
  const inputs=fields.map(([key,label])=>`<label class="field-label">${label}<input class="input jp" lang="ja" data-answer="${key}" value="${esc(round[key]||'')}" ${round.checked?'disabled':''}></label>`).join('');
  const reveal=round.revealed?`<p class="jp" lang="ja">${esc(word.kana)} · ${esc(word.c)}</p>`:'';
  return `<p class="vocab-instruction">${esc(nL('Recall the reading and written form.','回想讀音和書寫。'))}</p>${luluPreviewVisual(word)}<p class="lexical-meaning">${esc(vocabMeaning(word))}</p><div class="answer-grid">${inputs}</div>${reveal}`;
}
function vocabPreviewCard(round){
  const ids=vocabCurrentPart(round);
  return `<p class="vocab-instruction">${esc(nL('Preview these words, then continue to matching.','先預覽這些詞，再繼續配對。'))}</p><div class="quiz2-preview">${ids.map(id=>quiz2Card([wordBy(id)])).join('')}</div>`;
}
function vocabRevisionPage(){
  const round=state.round;if(!round||round.mode!=='vocab-revision')return '';
  if(round.phase==='done'||round.activity==='adaptive'&&round.phase==='adaptive'&&round.queueIndex>=round.queue.length&&round.batch+2>=round.parts.length)return `<section class="study-wrap vocab-revision"><h1>${esc(nL('Revision complete','溫習完成'))}</h1><p>${round.completed.length} / ${round.total}</p><div class="card-actions"><button type="button" class="button primary" data-action="gameBack">${nL('Back to Vocabulary','返回詞彙')}</button></div></section>`;
  const body=round.activity==='adaptive'&&round.phase==='preview'?vocabPreviewCard(round):round.q?.stage==='match'?vocabMatchCard(round):round.q?.stage==='translate'?vocabTranslateCard(round):round.q?.stage==='kanji'?vocabKanjiCard(round):round.q?.stage==='rebuild'?vocabRebuildCard(round):round.q?.stage==='recall'?vocabRecallCard(round):vocabPreviewCard(round);
  const extra=round.feedback==='wrong'&&round.q?.stage==='rebuild'?`<p class="jp" lang="ja">${esc(vocabularyReading(wordBy(round.q.id)))}</p>`:'';
  const notice=round.feedback?`<div class="quiz2-result">${quiz2Notice(round.feedback,round,extra)}</div>`:'';
  const ready=round.phase==='preview'||round.q?.stage==='match'&&round.selected||round.q?.stage==='translate'&&round.selected||round.q?.stage==='kanji'&&round.selected!=null||round.q?.stage==='rebuild'&&rebuildReady(round.chosen.map(i=>round.tileBank[i]).join(''),vocabularyReading(wordBy(round.q.id)))||round.q?.stage==='recall';
  const action=round.phase==='preview'?`<button type="button" class="button primary" data-vocab="continue">${nL('Continue','繼續')}</button>`:round.final?`<button type="button" class="button primary" data-vocab="next">${nL('Next','下一個')}</button>`:round.q?.stage==='match'||round.q?.stage==='translate'?'':`<button type="button" class="button primary" data-vocab="submit" ${ready?'':'disabled'}>${nL('Submit','提交')}</button>`;
  return `<section class="study-wrap vocab-revision"><h1 class="sr-only">${esc(vocabStageLabel(round))}</h1>${body}${notice}<div class="card-actions">${action}</div></section>`;
}
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-vocab]');if(!button||button.disabled)return;
  const round=state.round;if(!round||round.mode!=='vocab-revision')return;
  event.preventDefault();event.stopPropagation();
  const kind=button.dataset.vocab;
  if(kind==='choice'&&!round.checked){round.selected=button.dataset.vocabId;vocabSubmit(round);render();return;}
  if(kind==='kanji'&&!round.checked){round.selected=Number(button.dataset.vocabIndex);render();return;}
  if(kind==='tile'&&!round.checked){const index=Number(button.dataset.vocabIndex),hole=round.chosen.findIndex(item=>item==null);if(hole>=0)round.chosen[hole]=index;else round.chosen.push(index);round.feedback=null;render();return;}
  if(kind==='slot'&&!round.checked){round.chosen[Number(button.dataset.vocabIndex)]=null;round.feedback=null;render();return;}
  if(kind==='continue'){vocabAdvanceAdaptive(round);render();return;}
  if(kind==='submit'){vocabSubmit(round);render();return;}
  if(kind==='next'){vocabNext(round);render();}
},true);
Object.assign(ZH_HANT,{
  'Adaptive revision':'自適應溫習',
  'Choose the correct kanji':'選擇正確漢字',
  'Choose the matching picture and meaning.':'選擇相符的圖片和意思。',
  'Choose the correctly written Japanese form.':'選擇書寫正確的日文。',
  'Preview these words, then continue to matching.':'先預覽這些詞，再繼續配對。',
  'Rebuild the reading.':'重組讀音。',
  'Recall the reading and written form.':'回想讀音和書寫。',
  'A stroke is missing.':'少了一筆。',
  'An extra stroke was added.':'多了一筆。',
  'A stroke is in the wrong place.':'有一筆位置不對。',
  'Your choice':'你的選擇',
  'Correct form':'正確寫法',
  'Matching retry':'配對重試',
  'Revision complete':'溫習完成',
  'Batch':'批次',
  'Preview':'預覽',
  'Continue':'繼續'
});
