'use strict';
// Every Japanese surface is copied from a source record or a reviewed substitution below.
const EXAM_SKILLS=['particles','verbForms','wordOrder','whWords','demonstratives','readings','kanji'];
const exL=(en,zh)=>state.language==='zh-Hant'?zh:en;
const exNorm=s=>String(s??'').normalize('NFC').replace(/\s/gu,'');
function kanaSlots(s){const result=[];for(const c of String(s).normalize('NFC')){if(/[ゃゅょャュョぁぃぅぇぉァィゥェォ]/u.test(c)&&result.length&&!/[っッ]/u.test(result.at(-1)))result[result.length-1]+=c;else result.push(c);}return result;}
const EXAM_PARTICLES=['は','も','の','から','まで','か'];
const EXAM_NOTES={
 は:['marks the topic; keep it after the topic noun.','標示主題，放在主題名詞後。'],
 も:['means “also”; it replaces the topic marker in this pattern.','表示「也」，在此句型取代主題助詞。'],
 の:['links the owner or description to the following noun, or stands for an understood noun.','連接所屬者與名詞，或代替已知的名詞。'],
 から:['marks the starting time or origin.','標示開始時間或來源。'],
 まで:['marks the ending time.','標示結束時間。'],
 か:['marks a question at the end of the sentence.','放在句尾表示疑問。'],
 X:['No particle belongs inside this word or between this noun modifier and its noun.','詞內或連體指示詞與名詞之間不加助詞。']
};
const EXAM_BANK=[];
function exQuestion(q){q.origin='new-format-practice';q.alternatives=[];EXAM_BANK.push(q);}
for(const s of SENTENCES){
 const sourceRefs=[{dataset:'sentences',id:s.id}];
 exQuestion({id:'order-'+s.id,skill:'wordOrder',kind:'order',prompt:s.prompt,parts:['',''],answers:[s.tokens.join('')],tokens:s.tokens,sourceRefs,marks:[2],why:['Keep each noun with its particle; the predicate comes at the end. Use every tile once, including duplicate tiles.','名詞與助詞相連，述語放在句尾。每張詞卡用一次，包括重複詞卡。']});
 const indices=s.tokens.flatMap((t,i)=>EXAM_PARTICLES.includes(t)?[i]:[]);
 if(indices.length){const parts=[],answers=[];let start=0;for(const i of indices){parts.push(s.tokens.slice(start,i).join(''));answers.push(s.tokens[i]);start=i+1;}parts.push(s.tokens.slice(start).join(''));exQuestion({id:'particle-'+s.id,skill:'particles',kind:'blanks',prompt:s.prompt,parts,answers,sourceRefs,marks:answers.map(()=>1),choices:[...EXAM_PARTICLES,'X'],why:['Fill only the missing particle. X means no particle.','只填缺少的助詞，不需助詞時填X。']});}
 // An explicit no-particle boundary: the demonstrative modifier immediately precedes its noun.
 if(s.pattern==='p16'){exQuestion({id:'zero-'+s.id,skill:'particles',kind:'blanks',prompt:s.prompt,parts:[s.tokens[0],s.tokens.slice(1).join('')],answers:['X'],sourceRefs,marks:[1],choices:[...EXAM_PARTICLES,'X'],why:EXAM_NOTES.X});}
 const index=s.tokens.findIndex(t=>/します$|きます$|来ました$/.test(t));
 if(index>=0)exQuestion({id:'verb-'+s.id,skill:'verbForms',kind:'blanks',prompt:s.prompt,parts:[s.tokens.slice(0,index).join(''),s.tokens.slice(index+1).join('')],answers:[s.tokens[index]],sourceRefs,marks:[1],choices:[...new Set(SENTENCES.flatMap(x=>x.tokens).filter(t=>/します$|きます$|来ました$/.test(t)))],why:s.tokens[index]==='来ました'?['The cue says “came”: a completed arrival in the source. The current routine forms do not express this past meaning.','提示表示已完成的到來，應用教材已有的過去形式，現在習慣形式不符合此語意。']:['The cue is a present affirmative routine. Keep the source non-past form and select the activity that matches study or work. A completed arrival has a different meaning.','提示是現在的肯定習慣。保留教材非過去形式，並依讀書或工作選動詞；已完成的到來不符合此語意。']});
 const end=s.tokens.length-1;
 exQuestion({id:'completion-'+s.id,skill:'wordOrder',kind:'blanks',prompt:s.prompt,parts:[s.tokens.slice(0,Math.max(1,end-2)).join(''),s.tokens.slice(end).join('')],answers:[s.tokens.slice(Math.max(1,end-2),end).join('')],sourceRefs,marks:[2],why:['Complete the supplied frame exactly; keep particles and the predicate in order.','依已提供的句型完成，注意助詞與述語的次序。']});
}
for(const q of dialogueSources){
 if(!q.answerSlot||!q.target)continue;
 const wh=Object.keys(WH_CONVERSATIONS).includes(q.word)||['ch3-where','ch3-where-polite','ch3-origin','ch3-price','ch4-time-question','ch4-weekday-question'].includes(q.id);
 if(q.id.startsWith('this-that-'))continue;
 const sourceRefs=[{dataset:'dialogues',id:q.id}];
 for(const whole of [false,true]){const turn=q.answerSlot.turn,answer=whole?q.turns[turn][1]:q.target;
 exQuestion({id:`recall-${q.id}-${whole}`,skill:wh?'whWords':'readings',kind:'blanks',prompt:q.scene,promptZh:q.sceneZh,parts:whole?['','']:[q.answerSlot.before,q.answerSlot.after],answers:[answer],sourceRefs,marks:[2],dialogue:q,turn,whole,why:[`Use the ${q.role==='polite'||q.id.includes('polite')||/17b|19b/.test(q.word)?'polite':'source'} expression shown in the example. Supply only the blank; printed particles stay outside it. No other register is accepted for this item.`, '使用範例指定的形式，只填空格內的部分，不要重複已印出的助詞。本題不接受其他語體。']});}
}
for(const n of NUMBER_QUESTIONS){if(!n.kana)continue;exQuestion({id:'number-'+n.id,skill:'readings',kind:'blanks',prompt:n.label||n.display||String(n.value??n.id),parts:['',''],answers:[n.kana],sourceRefs:[{dataset:'numbers',id:n.id}],marks:[2],why:['Keep small kana, doubled consonants and long vowels distinct. Joined sounds count as one kana slot; a small stop counts separately.','區分小假名、促音及長音。拗音合為一格，促音獨立一格。'],number:n});}
for(const w of WORDS.filter(wordGameReady).filter(w=>/\p{Script=Han}/u.test(w.c))){exQuestion({id:'kanji-'+w.id,skill:'kanji',kind:'blanks',prompt:w.en,promptZh:w.zh,parts:['',''],answers:[w.c],sourceRefs:[{dataset:'words',id:w.id}],marks:[1],why:['Write the existing printed kanji form, preserving any surrounding kana.','寫出資料庫的漢字形式，保留周圍假名。']});}
// Reviewed Chapter 4 range pattern: substitute only attested time tokens and non-past activities.
const timetableModels=SENTENCES.filter(s=>s.pattern==='p18');
for(const [start,end] of [['しちじ','くじ'],['くじ','ろくじ']])for(const activity of ['べんきょうします','はたらきます']){
 const model=timetableModels.find(s=>s.tokens.includes(activity));
 const timeSources=SENTENCES.filter(s=>s.tokens.includes(start)||s.tokens.includes(end));
 const tokens=[start,'から',end,'まで',activity,'。'];
 const base={skill:'particles',kind:'blanks',prompt:`Daily routine · ${start==='しちじ'?'07:00–09:00':'09:00–18:00'} · ${activity==='べんきょうします'?'study':'work'} (present, affirmative)`,promptZh:`每天的習慣 · ${start==='しちじ'?'07:00–09:00':'09:00–18:00'} · ${activity==='べんきょうします'?'讀書':'工作'}（現在、肯定）`,schedule:{range:start==='しちじ'?'07:00–09:00':'09:00–18:00',activity:activity==='べんきょうします'?'study':'work'},sourceRefs:[...new Set([model,...timeSources])].map(s=>({dataset:'sentences',id:s.id})),why:['The first time is the start; the second is the finish. This is a daily affirmative routine, not yesterday’s activity.','第一個時間是開始，第二個時間是結束。這是每天的肯定習慣，不是昨天的活動。']};
 const id='schedule-'+EXAM_BANK.length;
 exQuestion({...base,id:id+'-particles',parts:[start,end,activity+'。'],answers:['から','まで'],marks:[1,1],choices:EXAM_PARTICLES});
 exQuestion({...base,id:id+'-verb',skill:'verbForms',parts:[tokens.slice(0,4).join(''),'。'],answers:[activity],marks:[1],choices:['べんきょうします','はたらきます']});
 exQuestion({...base,id:id+'-complete',skill:'wordOrder',parts:[start+'から','。'],answers:[tokens.slice(2,-1).join('')],marks:[2]});
 exQuestion({...base,id:id+'-write',skill:'wordOrder',parts:['',''],answers:[tokens.join('')],marks:[2]});
}
// Two turns, two speakers: each target is reviewed from the existing spatial scene.
for(const q of dialogueSources.filter(q=>/^this-that-2-0[1-6]$/.test(q.id))){
 const opening=q.turns[0][1],prefix=opening.match(/^(これ|それ|あれ)/u)?.[0];if(!prefix)continue;
 exQuestion({id:'picture-'+q.id,skill:'demonstratives',kind:'blanks',prompt:q.scene,promptZh:q.sceneZh,parts:['',opening.slice(prefix.length)+'\n','',q.answerSlot.after],answers:[prefix,q.target],marks:[1,1],sourceRefs:[{dataset:'dialogues',id:q.id}],picture:q,useOnce:prefix!==q.target,choices:prefix===q.target?null:[prefix,q.target],why:[`First line: Listener speaks; second line: You speak. ${q.why} Re-evaluate proximity when the speaker changes. Standalone forms replace a noun; modifiers require a following noun.`, '第一句由聽者說，第二句由你說。每次換人說話都要重新判斷遠近。獨立指示詞代替名詞，連體形式後面必須有名詞。']});
 // Remove the extra empty segment: each answer has exactly one following segment.
 EXAM_BANK.at(-1).parts=['',opening.slice(prefix.length)+'\n'+q.answerSlot.before,q.answerSlot.after];
}
for(const family of [['2-01','2-02','2-03'],['2-04','2-05','2-06']]){
 const pictures=family.map(id=>dialogueSources.find(q=>q.id==='this-that-'+id));
 const parts=[''];pictures.forEach((q,i)=>{parts[i]+=`${String.fromCharCode(65+i)} · ${q.turns[0][1]}\n`;parts.push(q.answerSlot.after+(i<2?'\n':''));});
 exQuestion({id:'picture-multiple-'+family[0],skill:'demonstratives',kind:'blanks',prompt:'Three separate books: A beside You, B beside Listener, C far from both. Listener asks each printed question; You answer each blank. Each word once.',promptZh:'三本不同的書：A在你身旁，B在聽者身旁，C離雙方遠。聽者問已印出的問題，你回答空格。每詞只用一次。',pictures,parts,answers:pictures.map(q=>q.target),marks:[1,1,1],choices:pictures.map(q=>q.target),useOnce:true,sourceRefs:pictures.map(q=>({dataset:'dialogues',id:q.id})),why:['All blanks are spoken by You. Recompute the question perspective for Listener. Standalone forms replace the object; noun modifiers directly precede the book noun.','全部空格由你說出。問題則按聽者的視角判斷遠近。獨立形式代替物件，連體形式直接放在書本名詞前。']});
}
function exGrade(q,answers){return q.answers.map((expected,i)=>exNorm(answers[i])===exNorm(expected)||q.alternatives.some(a=>a.reviewed===true&&a.index===i&&exNorm(a.answer)===exNorm(answers[i])));}
function exValidate(){const ids=new Set();for(const q of EXAM_BANK){if(ids.has(q.id)||q.parts.length!==q.answers.length+1||q.marks.length!==q.answers.length)throw Error('Invalid exercise '+q.id);ids.add(q.id);for(const ref of q.sourceRefs){const pool=ref.dataset==='sentences'?SENTENCES:ref.dataset==='dialogues'?dialogueSources:ref.dataset==='numbers'?NUMBER_QUESTIONS:WORDS;if(!pool.some(x=>x.id===ref.id))throw Error('Missing source '+ref.id);}if(q.useOnce&&new Set(q.answers).size!==q.answers.length)throw Error('Duplicate use-once answer');}return true;}
exValidate();
let examRound=null;
function exStart(skill,stage='write'){
 let pool=EXAM_BANK.filter(q=>skill==='exam'||skill==='schedule'?skill==='exam'||q.schedule:q.skill===skill);
 if(skill==='exam'){
  // 12 grammar marks + 8 recall marks; these are actual practice marks, not a full paper.
  const pick=(items,n)=>shuffle(items).slice(0,n);
  pool=[...pick(EXAM_BANK.filter(q=>q.id.startsWith('zero-')),2),...pick(EXAM_BANK.filter(q=>q.skill==='verbForms'&&!q.schedule),2),...pick(EXAM_BANK.filter(q=>q.skill==='wordOrder'&&q.kind==='order'),4),...pick(EXAM_BANK.filter(q=>q.skill==='whWords'),2),...pick(EXAM_BANK.filter(q=>q.id.startsWith('number-')),1),...pick(EXAM_BANK.filter(q=>q.skill==='kanji'),2)];stage='write';
 }else pool=shuffle(pool).slice(0,10);
 examRound={skill,stage,items:pool,index:0,answers:[],checked:false,results:[],earned:0,total:pool.reduce((n,q)=>n+q.marks.reduce((a,b)=>a+b,0),0),assisted:stage!=='write',ink:[],chosen:[]};state.view='exam-practice';render();
}
function exSkillName(s){return ({particles:exL('Particles','助詞'),verbForms:exL('Verb forms','動詞形式'),wordOrder:exL('Word order & completion','語序與完成句子'),whWords:exL('Question words','疑問詞'),demonstratives:exL('Picture dialogues','圖片對話'),readings:exL('Readings & recall','讀音與回想'),kanji:exL('Kanji','漢字'),schedule:exL('Timetable','時間表'),exam:exL('Mixed practice','綜合練習')})[s];}
function exProgress(){const p=progress.examSkills||{};return EXAM_SKILLS.map(s=>{const x=p[s]||{};return `<li>${exSkillName(s)}: ${exL('unassisted','獨立作答')} ${x.recall?.correct||0}/${x.recall?.attempts||0} · ${exL('assisted','輔助作答')} ${x.assisted?.correct||0}/${x.assisted?.attempts||0} · ${exL('handwriting self-check','手寫自評')} ${x.selfAssessed?.correct||0}/${x.selfAssessed?.attempts||0}</li>`;}).join('');}
function exMenu(){return mixedMenu();}

function exMismatchSlot(expected,actual){const units=kanaSlots(expected),typed=kanaSlots(actual||'');const i=units.findIndex((u,n)=>u!==typed[n]);return i<0?units.length+1:i+1;}
function exFeedback(q,r){return `<div class="reply-feedback ${r.results.every(Boolean)?'correct':'wrong'}" role="status">${luluFeedbackArt(r)}<p class="lulu-outcome-label">${luluFeedbackLabel(r)}</p><div>${q.answers.map((answer,i)=>`<p>${i+1}. ${r.results[i]?'✓':'✗'} <span class="jp" lang="ja">${esc(answer)}</span> · ${r.results[i]?q.marks[i]:0}/${q.marks[i]}</p>${!r.results[i]?`<p>${exL('First differing slot','首個不同的格數')}: ${exMismatchSlot(answer,r.answers[i])}. ${exL('Check the supplied boundary, small kana, vowel length and token order.','檢查空格邊界、小假名、長音與詞語次序。')}</p>`:''}<p>${esc((EXAM_NOTES[answer]||q.why)[state.language==='zh-Hant'?1:0])}</p>`).join('')}<p>${esc(q.why[state.language==='zh-Hant'?1:0])}</p><p>${exL('Spelling is exact: preserve small kana, long vowels, particles and punctuation. Keywords alone do not earn marks.','拼寫須準確：保留小假名、長音、助詞與標點。只有關鍵詞不給分。')}</p></div></div>`;}
function exPage(){const r=examRound;if(!r)return mixedMenu();if(r.index>=r.items.length)return `<section class="study-wrap paper">${luluSummaryArt(r)}<h1>${exL('Practice complete','練習完成')}</h1><p>${r.earned}/${r.total} ${exL('available marks','可得分數')}</p><p>${nL('Guided and independent results are recorded separately.','引導與獨立練習結果分開記錄。')}</p><button class="button primary" data-ex-menu>${learningBackLabel()}</button></section>`;
 const q=r.items[r.index],example=r.stage==='example';let field=0;
 const input=i=>`<label class="ex-field"><span class="sr-only">${exL('Answer','答案')} ${i+1}</span><input lang="ja" autocomplete="off" autocapitalize="off" spellcheck="false" data-ex-answer="${i}" value="${esc(r.answers[i]||'')}" ${r.checked||example?'disabled':''}></label>`;
 const frame=q.parts.map((part,i)=>esc(part)+(i<q.answers.length?(example?`<strong class="jp">${esc(q.answers[i])}</strong>`:input(i)):'')).join('');
 const turns=q.dialogue?q.dialogue.turns.map((t,i)=>`<p>${conversationPig(t[0],'idle')}<b>${exL(t[0]==='you'?'You':'Listener',t[0]==='you'?'你':'聽者')}</b>: <span lang="ja">${i===q.turn?frame:esc(t[1])}</span></p>`).join(''):frame;
 return `<section class="study-wrap ex-practice"><div class="card-actions"><button class="button ghost" data-ex-menu>${learningBackLabel()}</button><span>${r.index+1}/${r.items.length} · ${q.marks.reduce((a,b)=>a+b,0)} ${exL('marks','分')}</span></div><h1>${r.learningTitle?nL(...r.learningTitle):exSkillName(r.skill)}</h1><p>${esc(state.language==='zh-Hant'?(q.promptZh||translateText(q.prompt)):q.prompt)}</p>${q.schedule?`<table class="ex-schedule"><caption>${exL('Daily schedule · complete the marked entry','每天的時間表 · 完成標示的項目')}</caption><thead><tr><th>${exL('Time','時間')}</th><th>${exL('Activity','活動')}</th></tr></thead><tbody>${['07:00–09:00','09:00–18:00'].map(range=>`<tr ${q.schedule.range===range?'aria-current="true"':''}><td>${range===q.schedule.range?'→ ':''}${range}</td><td>${(range===q.schedule.range?q.schedule.activity==='study':q.schedule.activity!=='study')?exL('Study','讀書'):exL('Work','工作')}</td></tr>`).join('')}</tbody></table>`:''}${q.picture?demonstrativeScene(q.picture):''}${q.pictures?q.pictures.map((pic,i)=>`<h2>${String.fromCharCode(65+i)}</h2>${demonstrativeScene(pic)}`).join(''):''}${q.picture?`<p>${exL('Line 1: Listener → You. Line 2: You → Listener.','第一句：聽者對你說。第二句：你對聽者說。')}</p>`:''}${q.useOnce?`<p>${exL('Use each supplied word once.','每個提供的詞只用一次。')}</p>`:''}<div class="paper jp ex-frame" lang="ja">${turns}</div>${q.number?numberPrompt(q.number)+`<p>${exL('Kana slots','假名格數')}: ${kanaSlots(q.answers[0]).length}</p>`:''}${r.stage==='practice'?`<p>${exL('Support is visible; this attempt counts as assisted.','有輔助提示，本次記為輔助作答。')}</p><div class="token-bank">${(q.choices||q.tokens||q.answers).map((t,i)=>`<button class="tile jp" data-ex-tile="${i}" ${r.checked?'disabled':''}>${esc(t)}</button>`).join('')}</div><p>${esc(q.why[state.language==='zh-Hant'?1:0])}</p>`:''}${example?`<p>${esc(q.why[state.language==='zh-Hant'?1:0])}</p><button class="button primary" data-ex-promote="practice">${exL('Try supported practice','試做輔助練習')}</button>`:r.checked?exFeedback(q,r)+`<button class="button primary" data-ex-next>${exL('Next','下一題')}</button>${r.stage==='practice'?`<button class="button ghost" data-ex-promote="write">${exL('Now write without choices','現在無選項書寫')}</button>`:''}`:`${luluFeedbackPlaceholder()}<div class="card-actions"><button class="button primary" data-ex-check>${icon('check')}${exL('Check answer','檢查答案')}</button><button class="button ghost" data-ex-reveal>${exL('Reveal (assisted)','顯示答案（輔助）')}</button><button class="button ghost" data-ex-clear>${icon('clear')}${exL('Clear','清除')}</button></div>`}${q.answers.length===1&&!r.checked&&!example&&r.skill!=='exam'?`<details><summary>${exL('Handwrite a complete answer (self-assessed)','手寫完整答案（自我評估）')}</summary><p>${exL('No automatic recognition. Reveal the model and compare your own writing.','不提供自動辨識。顯示範例後自行比較。')}</p><svg class="kanji-pad ex-pad" viewBox="0 0 600 200" aria-label="${exL('Answer drawing pad','答案手寫板')}"><g class="ex-ink">${strokeMarkup(r.ink)}</g></svg><button class="button ghost" data-ex-ink-clear>${exL('Clear writing','清除筆跡')}</button><button class="button ghost" data-ex-model>${exL('Reveal handwriting model','顯示手寫範例')}</button>${r.model?`<p class="jp">${esc(q.answers[0])}</p><p>${exL('Compare spelling and kana size, then self-assess.','比較拼寫與假名大小後自評。')}</p><button class="button primary" data-ex-self="yes">${exL('Self-assessed correct','自評正確')}</button><button class="button ghost" data-ex-self="no">${exL('Needs practice','需要練習')}</button>`:''}</details>`:''}</section>`;
}
function exRecord(q,results,assisted,self=false){progress.examSkills||={};const skill=progress.examSkills[q.skill]||={};const bucket=self?'selfAssessed':assisted?'assisted':'recall';const p=skill[bucket]||={attempts:0,correct:0,earned:0,available:0};p.attempts+=results.length;p.correct+=results.filter(Boolean).length;p.earned+=q.marks.reduce((n,m,i)=>n+(results[i]?m:0),0);p.available+=q.marks.reduce((a,b)=>a+b,0);save();}
document.addEventListener('input',e=>{if(e.target.dataset.exAnswer!==undefined&&examRound)examRound.answers[Number(e.target.dataset.exAnswer)]=e.target.value;});
document.addEventListener('click',e=>{
 const t=e.target.closest('[data-ex-start],[data-ex-menu],[data-ex-check],[data-ex-next],[data-ex-reveal],[data-ex-promote],[data-ex-tile],[data-ex-clear],[data-ex-model],[data-ex-self],[data-ex-ink-clear]');if(!t)return;const d=t.dataset,r=examRound;
 if(d.exStart){exStart(d.exStart,d.exStage);return;}if('exMenu'in d){examRound=null;state.view=state.learningReturn||'mixed';render();return;}if(!r)return;const q=r.items[r.index];
 if('exNext'in d){r.index++;r.answers=[];r.chosen=[];r.ink=[];r.model=false;r.checked=false;r.luluFeedback=null;r.assisted=r.stage!=='write';}
 else if(d.exPromote){if(r.checked)r.earned-=q.marks.reduce((n,m,i)=>n+(r.results[i]?m:0),0);r.stage=d.exPromote;r.assisted=r.stage!=='write';r.checked=false;r.luluFeedback=null;r.answers=[];r.chosen=[];r.ink=[];r.model=false;}
 else if('exClear'in d&&!r.checked){r.answers=[];r.chosen=[];}
 else if('exInkClear'in d){r.ink=[];}
 else if('exModel'in d){r.model=true;r.assisted=true;}
 else if(d.exTile!==undefined&&!r.checked){const i=Number(d.exTile),tiles=q.choices||q.tokens||q.answers;if(q.kind==='order'){if(r.chosen.includes(i))return;r.chosen.push(i);r.answers[0]=(r.answers[0]||'')+tiles[i];}else{const slot=q.answers.findIndex((_,n)=>!r.answers[n]);if(slot<0)return;r.answers[slot]=tiles[i];}}
 else if(('exCheck'in d||'exReveal'in d||'exSelf'in d)&&!r.checked){const reveal='exReveal'in d,self='exSelf'in d;r.results=reveal?q.answers.map(()=>false):self?q.answers.map(()=>d.exSelf==='yes'):exGrade(q,r.answers);r.checked=true;luluCommitFeedback(r,{key:String(r.index)+':'+r.stage,correct:r.results.filter(Boolean).length,total:r.results.length,assisted:r.assisted,revealed:reveal,selfAssessed:self});if(reveal||self)r.assisted=true;r.earned+=q.marks.reduce((n,m,i)=>n+(r.results[i]?m:0),0);if(r.index===r.items.length-1)luluPrepareSummary(r,r.earned,r.total,r.assisted||self);exRecord(q,r.results,r.assisted,self);}
 render();
});
let exPointer=null;
document.addEventListener('pointerdown',e=>{const pad=e.target.closest('.ex-pad');if(state.view!=='exam-practice'||!pad||!examRound||examRound.checked||examRound.model||e.isPrimary===false)return;e.preventDefault();pad.setPointerCapture(e.pointerId);const rect=pad.getBoundingClientRect(),point=e=>[(e.clientX-rect.left)*600/rect.width,(e.clientY-rect.top)*200/rect.height];const stroke={points:[point(e)]};examRound.ink.push(stroke);exPointer={pad,stroke,point,id:e.pointerId};});
document.addEventListener('pointermove',e=>{if(!exPointer||exPointer.id!==e.pointerId)return;e.preventDefault();exPointer.stroke.points.push(exPointer.point(e));exPointer.pad.querySelector('.ex-ink').innerHTML=strokeMarkup(examRound.ink);},{passive:false});
for(const event of ['pointerup','pointercancel'])document.addEventListener(event,e=>{if(exPointer?.id===e.pointerId)exPointer=null;});
function exLegacyRecord(type,id,ok){
 if(type==='words'){if(state.view==='write'&&state.round?.result){const r=state.round;exRecord({skill:'readings',marks:[1]},[r.result.bOk],!!r.assisted||!!r.revealed);if(hasKanji(wordBy(id)))exRecord({skill:'kanji',marks:[1]},[r.result.cOk],!!r.assisted||!!r.revealed);}return;}
 const skill=type==='words'?'readings':type==='kanjiWriting'?'kanji':type==='sentences'?'wordOrder':null;
 if(!skill)return;progress.examSkills||={};const entry=progress.examSkills[skill]||={};const bucket=type==='kanjiWriting'?'selfAssessed':type==='sentences'||state.round?.assisted||state.round?.revealed?'assisted':'recall';const p=entry[bucket]||={attempts:0,correct:0,earned:0,available:0};p.attempts++;const correct=type==='sentences'&&state.view==='sentences'&&state.round?.assisted?!!state.round.result:ok;p.correct+=Number(correct);p.earned+=Number(correct);p.available++;
}
Object.assign(ZH_HANT,{'Grammar & exam practice':'文法與考試練習','Examples, supported practice and unassisted writing.':'範例、輔助練習與獨立書寫。','Chapters 1–2 · 15 minutes · 20 marks':'第1–2章 · 15分鐘 · 20分'});
