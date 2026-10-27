'use strict';
// Dialogue-only views keep the source lesson/vocabulary registries and progress IDs intact.
const DIALOGUE_ALIASES=new Map();
const REMOVED_DIALOGUE_IDS=new Set(['ch3-show','ch3-buy']);
function dialogueChapters(q){return q.chapters||[...new Set(q.forms?q.forms.flatMap(dialogueChapters):q.ch?[q.ch]:wordChapters(WORDS.find(w=>w.id===q.word)))].sort();}
function dialogueUsage(q){return state.language==='zh-Hant'?(q.whyZh||translateText(q.why)):q.why;}
function dialogueFormLabel(form){return form.role==='polite'?'Polite':'Normal';}
function dialogueSourceEntry(source){
 const q={...source,kana:source.kana||WORDS.find(w=>w.id===source.word).kana};
 q.scene||=source.clue||CONVERSATIONS[q.id]?.[0];q.sceneZh||=CONVERSATIONS[q.id]?.[1];
 q.turns=(source.turns||CONVERSATIONS[q.id]?.[2]||WH_CONVERSATIONS[q.word]).map(t=>[...t]);
 q.chapters=dialogueChapters(q);return q;
}
function setDialogueTarget(q,target,frame){
 q.kana=target;q.target=target;q.sentence=frame;
 const turn=q.turns.findIndex(t=>t[0]==='you'),[before,after]=frame.split('{word}');
 q.answerSlot={turn,before,after};q.turns[turn][1]=before+target+after;
 // Store other occurrences explicitly, so examples cannot leak the answer during play.
 q.supportSlots=q.turns.flatMap((t,index)=>{
  if(index===turn)return [];const at=t[1].indexOf(target);return at<0?[]:[{turn:index,before:t[1].slice(0,at),after:t[1].slice(at+target.length)}];
 });return q;
}
const dialogueSources=[...DIALOGUES.map(dialogueSourceEntry),...demonstrativeWords.map(source=>dialogueSourceEntry({...source,id:`wh-words-${source.word}`,family:`wh-words-${source.word}`,category:'wh-words'}))];
for(const q of dialogueSources){
 const turn=q.turns.find(t=>t[0]==='you'),target=q.target||q.kana,at=turn[1].indexOf(target);
 setDialogueTarget(q,target,q.sentence||(at>=0?turn[1].slice(0,at)+'{word}'+turn[1].slice(at+target.length):'{word}'));
}
const dialogueSource=id=>dialogueSources.find(q=>q.id===id);
// Fixed supporting text is outside the target, not stripped from the submitted answer.
setDialogueTarget(dialogueSource('thanks-full'),'どうも','{word}ありがとうございます。');
dialogueSource('thanks-full').why='Practise どうも; ありがとうございます is supplied. Together they mean “thank you very much”.';
dialogueSource('thanks-full').whyZh='練習目標是 どうも；已提供 ありがとうございます。合起來表示「非常感謝」。';
setDialogueTarget(dialogueSource('likewise'),'こちらこそ','{word}よろしくおねがいします。');
setDialogueTarget(dialogueSource('ch3-origin'),'どこの','これは{word}ワインですか。');
dialogueSource('ch3-origin').distractors=['だれの','なんの','どこ'];
const DIALOGUE_PAIRS=[
 ['wh-words-1-17a','wh-words-1-17b',['Who','誰'],['Ask who a person is.','詢問某人是誰。']],
 ['wh-words-1-19a','wh-words-1-19b',['How old','幾歲'],['Ask someone’s age.','詢問某人的年齡。']],
 ['ch3-where','ch3-where-polite',['Where','在哪裡'],['Ask where a place is.','詢問場所的位置。']],
 ['ch3-location-01','ch3-location-05',['Here','這裡'],['Say that a place is near you.','說明某個場所靠近自己。']],
 ['ch3-location-02','ch3-location-06',['There','那裡'],['Say that a place is near the listener.','說明某個場所靠近聽者。']],
 ['ch3-location-03','ch3-location-07',['Over there','那邊（遠處）'],['Say that a place is far from both people.','說明某個場所離雙方都遠。']]
];
for(const [normalId,politeId,labels,scene] of DIALOGUE_PAIRS){
 const normal=dialogueSource(normalId),polite=dialogueSource(politeId);
 const forms=[{...normal,role:'normal'},{...polite,role:'polite'}];
 if(normalId==='ch3-where'){forms[1].why='どちら politely asks where a place is here. Country and affiliation uses are separate entries. '+forms[1].why;forms[1].whyZh='這裡的 どちら 是詢問場所位置的禮貌說法；詢問國家或所屬機構的用法另列。'+forms[1].whyZh;}
 normal.forms=forms;normal.chapters=[...new Set(forms.flatMap(dialogueChapters))].sort();normal.labels=labels;normal.scene=scene[0];normal.sceneZh=scene[1];normal.clue=scene[0];
 DIALOGUE_ALIASES.set(politeId,normalId);
}
// The long time-range question becomes an example of 何時, not a second WH target.
const timeQuestion=dialogueSource('ch4-time-question'),rangeQuestion=dialogueSource('ch4-schedule-question');
timeQuestion.examples=[{...rangeQuestion}];DIALOGUE_ALIASES.set(rangeQuestion.id,timeQuestion.id);
// These examples already exist in the Chapter 2 sentence bank and This/That scenes.
const NO_QUESTIONS=[
 {id:'wh-whose',sourceSentenceIds:['p14-1','p14-3'],word:'1-17a',kana:'だれの',sentence:'あれは{word}かばんですか。',labels:['Whose','誰的'],replyEn:'Whose bag is that over there?',replyZh:'那邊的包包是誰的？',why:'だれの asks whose something is. Keep の in the question expression.',whyZh:'だれの 詢問物品屬於誰。の 是疑問表達的一部分。',answer:['せんせいのかばんです。','It is the teacher’s bag.','是老師的包包。'],distractors:['どこの','なんの','だれ']},
 {id:'wh-what-kind',sourceSentenceIds:['p13-2','p13-3'],word:'2-36',kana:'なんの',sentence:'それは{word}ざっしですか。',labels:['What kind / topic','哪一類／什麼主題'],replyEn:'What is that magazine about?',replyZh:'那本雜誌是關於什麼的？',why:'なんの asks the kind or topic before a noun. Standalone なん asks what something is.',whyZh:'なんの 放在名詞前，詢問種類或主題。單獨的 なん 則詢問是什麼東西。',answer:['コンピューターのざっしです。','It is a computer magazine.','是電腦雜誌。'],distractors:['どこの','だれの','なん']}
];
for(const source of NO_QUESTIONS){
 const q={...source,family:source.id,category:'wh-words',ch:2,chapters:[2],lesson:true,target:source.kana,scene:source.labels[0],sceneZh:source.labels[1],turns:[['you',source.sentence.replace('{word}',source.kana),source.replyEn,source.replyZh],['listener',...source.answer]]};
 setDialogueTarget(q,q.kana,q.sentence);dialogueSources.push(q);
}
const DIALOGUE_ENTRIES=dialogueSources.filter(q=>!REMOVED_DIALOGUE_IDS.has(q.id)&&!DIALOGUE_ALIASES.has(q.id));
function resolveDialogueId(id){return DIALOGUE_ALIASES.get(id)||id;}
function dialogueContentItems(){return DIALOGUE_ENTRIES;}
function dialogueForms(q){return q.forms||[q];}
function dialogueCharacters(text){const result=[];for(const c of [...rebuildText(text).normalize('NFC')]){if(/\p{M}/u.test(c)&&result.length)result[result.length-1]+=c;else result.push(c);}return result;}
function pairedTileBank(form){
 const counts=new Map();for(const reading of activityReadings(form)){const own=new Map();for(const unit of dialogueCharacters(reading))own.set(unit,(own.get(unit)||0)+1);for(const [unit,n] of own)counts.set(unit,Math.max(n,counts.get(unit)||0));}
 const bank=shuffle([...counts].flatMap(([unit,n])=>Array(n).fill(unit)));if(bank.length>1&&bank.join('')===form.kana)bank.push(bank.shift());return bank;
}
function dialogueFormAnswer(role){const part=state.activity.formAnswers[role];return part.chosen.map(id=>part.tileBank[id]).join('');}
function dialogueTemplate(q,answer){return esc(q.answerSlot.before)+answer+esc(q.answerSlot.after);}
function dialogueTurnText(q,index,checked){const slot=q.supportSlots.find(s=>s.turn===index);return !checked&&slot?slot.before+'…'+slot.after:q.turns[index][1];}
function dialogueExamples(q){
 const zh=state.language==='zh-Hant';return (q.examples||[]).map(example=>`<div class="dialogue-extra-example"><span class="dialogue-role">Time-range example</span>${example.turns.map(([speaker,ja,en,cn])=>`<div class="dialogue-example-turn"><span class="dialogue-role">${conversationSpeaker(example,speaker)}</span><p class="jp" lang="ja">${esc(ja)}</p><p class="conversation-translation">${esc(zh?cn:en)}</p></div>`).join('')}<p class="small muted">${esc(dialogueUsage(example))}</p></div>`).join('');
}
function pairedConversationCard(q){
 const zh=state.language==='zh-Hant',normal=q.forms[0];
 const supportLine=(form,index)=>{const turn=form.turns[index];return `<span class="dialogue-role">${dialogueFormLabel(form)}</span><p class="jp" lang="ja">${esc(turn[1])}</p><p class="conversation-translation">${esc(zh?turn[3]:turn[2])}</p>`;};
 const turns=normal.turns.map(([speaker,ja,en,cn],index)=>{
  let body;
  if(index===normal.answerSlot.turn)body=q.forms.map(form=>`<div class="dialogue-form-example"><span class="dialogue-role">${dialogueFormLabel(form)}</span><p class="jp" lang="ja">${dialogueTemplate(form,`<strong class="wh-target">${esc(form.kana)}</strong>`)}</p><p class="conversation-translation">${esc(zh?(form.replyZh||form.turns[form.answerSlot.turn][3]):(form.replyEn||form.turns[form.answerSlot.turn][2]))}</p><p class="small muted">${esc(dialogueUsage(form))}</p></div>`).join('');
  else if(q.forms.every(form=>form.turns[index]?.[0]===speaker)&&q.forms.some(form=>form.turns[index][1]!==ja))body=q.forms.map(form=>`<div class="dialogue-support-example">${supportLine(form,index)}</div>`).join('');
  else body=`<span class="dialogue-role">${conversationSpeaker(q,speaker)}</span><p class="jp" lang="ja">${esc(ja)}</p><p class="conversation-translation">${esc(zh?cn:en)}</p>`;
  return `<div class="conversation-turn ${speaker}">${conversationPig(speaker,'speaking')}<div class="conversation-bubble">${body}</div></div>`;
 }).join('');
 return `<article class="paper guide-card conversation-card" data-dialogue-guide="${q.id}">${q.lesson?lessonScene(q):demonstrativeScene(q)}<div class="guide-card-body"><p class="small muted">Two ways to say it</p><div class="conversation-stage" aria-label="Conversation">${turns}</div></div></article>`;
}
// Sentence Structure reuses the complete source examples; mock sampling remains Chapters 1–2.
const RANGE_PATTERNS=[
 {id:'p17',ch:4,title:'From a starting point · から',formula:'time から',source:'Chapter 4 · opening hours / study hours',tip:'から marks the starting point. In くじからろくじまで, くじ is the start; do not add に after から.',zhTitle:'起點・から',zhTip:'から 表示起點。くじからろくじまで 中，くじ 是開始時間；から 後不加 に。'},
 {id:'p18',ch:4,title:'Until an ending point · まで',formula:'time まで',source:'Chapter 4 · opening hours / weekday range',tip:'まで marks the ending point. In くじからろくじまで, ろくじ is the end; から and まで can also mark weekday ranges.',zhTitle:'終點・まで',zhTip:'まで 表示終點。くじからろくじまで 中，ろくじ 是結束時間；から、まで 也可表示星期範圍。'}
];
PATTERNS.push(...RANGE_PATTERNS);
S('p17',rangeQuestion.replyEn,'そちら|は|なんじ|から|なんじ|まで|です|か|。');
S('p17','It is open from nine to six.','くじ|から|ろくじ|まで|です|。');
S('p18','I study from seven to nine.','しちじ|から|くじ|まで|べんきょうします|。');
S('p18','I work from Monday to Friday.','げつようび|から|きんようび|まで|はたらきます|。');
function preparePairedActivity(q){
 const a=state.activity;a.selections=[];a.formResults=null;a.activeForm='normal';a.formAnswers={};
 for(const form of q.forms)a.formAnswers[form.role]={chosen:[],tileBank:pairedTileBank(form)};
 const correct=q.forms.map(form=>({...form,formRole:form.role})),seen=new Set(q.forms.flatMap(activityReadings));
 const distractors=[...(q.distractors||[]).map((kana,i)=>({id:`${q.id}-d${i}`,kana,word:q.word,category:q.category,family:`${q.id}-d${i}`})),...relatedActivityItems(a,q)].filter(item=>{const key=rebuildText(item.kana);if(seen.has(key))return false;seen.add(key);return true;}).slice(0,2);
 a.choices=shuffle([...correct,...distractors]);a.tileBank=a.formAnswers.normal.tileBank;a.chosen=a.formAnswers.normal.chosen;
}
function selectActivityChoice(id){
 const a=state.activity,q=activityCurrent();if(!q||a.checked||!a.choices.some(c=>c.id===id))return;
 if(!q.forms){checkActivity(id);return;}
 const index=a.selections.indexOf(id);if(index>=0)a.selections.splice(index,1);else if(a.selections.length<2)a.selections.push(id);render();
}
function pairedActivityResults(q,reveal){
 const a=state.activity;
 return Object.fromEntries(q.forms.map(form=>[form.role,!reveal&&(isActivityRebuild(a)?activityReadings(form).some(reading=>rebuildCorrect(dialogueFormAnswer(form.role),reading)):a.selections.some(id=>activityReadings(form).some(reading=>rebuildCorrect(a.choices.find(c=>c.id===id).kana,reading))))]));
}
function recordDialogueActivity(q){
 const a=state.activity;for(const form of dialogueForms(q)){
  const prefix=WH_CONVERSATIONS[form.word]?(isActivityRebuild(a)?'wh-tiles':'demonstratives'):a.kind;
  record('activities',`${prefix}-${form.id}`,q.forms?a.formResults[form.role]:a.result);
 }
}
function pairedActivityClick(d){
 const a=state.activity,q=activityCurrent();if(!q?.forms||!d.activityForm)return false;
 const form=q.forms.find(f=>f.role===d.activityForm),part=a.formAnswers[d.activityForm];if(!form||!part||a.checked||!isActivityRebuild(a))return true;
 a.activeForm=d.activityForm;
 if(d.activityFormTile!==undefined){const index=Number(d.activityFormTile),limit=Math.max(...activityReadings(form).map(r=>dialogueCharacters(r).length));if(Number.isInteger(index)&&index>=0&&index<part.tileBank.length&&!part.chosen.includes(index)&&part.chosen.length<limit)part.chosen.push(index);}
 else if(d.activityFormReturn!==undefined){const index=Number(d.activityFormReturn);if(Number.isInteger(index)&&index>=0&&index<part.chosen.length)part.chosen.splice(index,1);}
 else if(d.action==='activityFormUndo')part.chosen.pop();
 else if(d.action==='activityFormClear')part.chosen.splice(0);
 render();return true;
}
function pairedInlineResponse(form){
 const a=state.activity,part=a.formAnswers[form.role],answer=dialogueFormAnswer(form.role);
 const inline=part.chosen.map((id,index)=>`<button class="inline-answer-token jp" lang="ja" data-activity-form="${form.role}" data-activity-form-return="${index}" aria-label="Return ${esc(part.tileBank[id])} to word bank" ${a.checked?'disabled':''}>${esc(part.tileBank[id])}</button>`).join('');
 const blank=`<span class="inline-answer${answer?' filled':''}" aria-label="${esc(translateText(dialogueFormLabel(form)))}">${inline||'<span aria-hidden="true">＿＿＿</span>'}</span>`;
 const result=a.checked?(a.formResults[form.role]?'correct':'wrong'):'';
 return `<section class="paired-answer ${result}" data-form-answer="${form.role}" aria-label="${esc(translateText(dialogueFormLabel(form)))}"><h2 class="dialogue-role">${dialogueFormLabel(form)}</h2><p class="jp inline-reply" lang="ja">${dialogueTemplate(form,blank)}</p><div class="activity-tile-bank" role="group" aria-label="${esc(translateText(dialogueFormLabel(form)))} · ${esc(translateText('Hiragana bank'))}">${part.tileBank.map((unit,index)=>`<button class="tile jp ${part.chosen.includes(index)?'selected':''}" lang="ja" data-activity-form="${form.role}" data-activity-form-tile="${index}" ${a.checked||part.chosen.includes(index)?'disabled':''}>${esc(unit)}</button>`).join('')}</div>${a.checked?`<p class="form-status">${a.formResults[form.role]?'Correct':'Needs correction'}</p>`:`<div class="card-actions paired-form-controls"><button class="button ghost" data-action="activityFormUndo" data-activity-form="${form.role}" ${part.chosen.length?'':'disabled'}>Undo</button><button class="button ghost" data-action="activityFormClear" data-activity-form="${form.role}" ${part.chosen.length?'':'disabled'}>Clear</button></div>`}</section>`;
}
function pairedDialogueExercise(q,tileMode){
 const a=state.activity,zh=state.language==='zh-Hant';
 const response=tileMode?q.forms.map(pairedInlineResponse).join(''):q.forms.map((form,index)=>{
  const choice=a.choices.find(c=>c.id===a.selections[index]),blank=`<span class="inline-answer${choice?' filled':''}" aria-label="Your hiragana answer">${choice?esc(choice.kana):'<span aria-hidden="true">＿＿＿</span>'}</span>`;
  return `<p class="jp inline-reply" lang="ja">${dialogueTemplate(q.forms[0],blank)}</p>`;
 }).join('');
 const conversation=q.turns.map(([speaker,ja,en,cn],index)=>`<div class="conversation-turn ${speaker}">${conversationPig(speaker)}<div class="conversation-bubble ${index===q.answerSlot.turn?'reply-bubble':''}">${index===q.answerSlot.turn?`<span class="dialogue-role">You</span>${response}`:`<span class="dialogue-role">${conversationSpeaker(q,speaker)}</span><p class="jp" lang="ja">${esc(dialogueTurnText(q,index,a.checked))}</p><p class="conversation-translation">${esc(zh?cn:en)}</p>`}</div></div>`).join('');
 const options=tileMode?'':`<p class="small pair-selection-count" role="status">${a.selections.length} / 2 selected</p><div class="options activity-options paired-options" role="group" aria-label="Select both forms">${a.choices.map((choice,index)=>{
  const selected=a.selections.includes(choice.id),correct=q.forms.some(f=>activityReadings(f).some(r=>rebuildCorrect(choice.kana,r)));
  return `<button class="option jp ${selected?'selected ':''}${a.checked?(correct?'correct':selected?'wrong':''):''}" aria-pressed="${selected}" data-activity-choice="${choice.id}" ${a.checked||!selected&&a.selections.length===2?'disabled':''}><span class="number">${index+1}</span><span>${esc(choice.kana)}</span>${selected?'<span class="pair-check" aria-hidden="true">✓</span>':''}</button>`;
 }).join('')}</div>`;
 const feedback=a.checked?`<div class="reply-feedback ${a.result?'correct':'wrong'}" role="status"><span class="feedback-lulu ${a.result?'happy':'encouraging'}" aria-hidden="true"></span><div class="feedback-copy"><strong>${a.result?'Correct!':'Review both forms'}</strong>${q.forms.map(form=>`<div class="pair-form-feedback ${a.formResults[form.role]?'correct':'wrong'}" data-form-result="${form.role}"><span>${dialogueFormLabel(form)}</span> · <span>${a.formResults[form.role]?'Correct':'Needs correction'}</span><p class="jp" lang="ja">${esc(form.kana)}</p></div>`).join('')}</div><p class="activity-explanation">${q.forms.map(form=>`${esc(translateText(dialogueFormLabel(form)))}: ${esc(dialogueUsage(form))}`).join('<br>')}</p></div>`:'';
 const controls=a.checked?button('Next '+icon('arrow'),'activityNext','primary'):button('Check answer','activityCheck','primary',(tileMode?activityReady(q):a.selections.length===2)?'':'disabled');
 return `<h1 class="sr-only">${tileMode?'Rebuild':'Matching'}</h1><section class="study-wrap conversation-exercise paired-exercise"><div class="exercise-body"><p class="exercise-situation">${esc(zh?q.sceneZh:q.scene)}</p><p class="pair-instruction">${tileMode?'Build both the normal and polite forms.':'Select both the normal and polite forms.'}</p>${q.lesson?lessonScene(q):''}<div class="conversation-stage">${conversation}</div>${options}${feedback}<div class="card-actions activity-controls">${controls}</div>${tileMode&&!a.checked?'<div class="activity-reveal"><button class="scope-link" data-action="activityReveal">Show answer & mark for review</button></div>':''}</div></section>`;
}
