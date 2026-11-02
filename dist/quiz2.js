'use strict';
// Quiz 2 Revision reuses existing records. It does not copy Japanese into new word IDs.
progress.particleMatching||={};
const QUIZ2_SKIP=new Set(['linking','everyday']);
const QUIZ2_GROUPS=[
 ['facilities','Facilities','設施'],
 ['countries','Countries and regions','國家與地區'],
 ['fictional','Fictional places','虛構場所'],
 ['objects','Objects','物品'],
 ['food','Food','食物'],
 ['actions','Daily actions','日常動作'],
 ['leisure','Leisure & events','休閒與活動'],
 ['clock','Clock time','時刻'],
 ['weekdays','Weekdays','星期'],
 ['counters','Counters','量詞'],
 ['relative','Relative time & frequency','相對時間與頻率'],
 ['questions','Question words & wh-words','疑問詞']
];
const QUIZ2_FICTIONAL=new Set(['4-r5','4-r6','4-r7','4-r8']);
const QUIZ2_REGIONS=new Set(['3-r4','3-r5','3-r6','3-r7','4-r1','4-r2','4-r3','4-r4']);
const QUIZ2_PAIR=new Map([['3-01','3-05'],['3-05','3-01'],['3-02','3-06'],['3-06','3-02'],['3-03','3-07'],['3-07','3-03'],['3-04','3-08'],['3-08','3-04'],['3-16a','3-16b'],['3-16b','3-16a'],['3-22a','3-22b'],['3-22b','3-22a'],['3-30a','3-30b'],['3-30b','3-30a'],['4-14a','4-14b'],['4-14b','4-14a'],['4-22a','4-22b'],['4-22b','4-22a']]);
function quiz2Bucket(w){
 const c=WORD_CLASSIFICATION.get(w.id);if(!c)return null;
 if(QUIZ2_FICTIONAL.has(w.id))return 'fictional';
 if(c.group==='questions')return 'questions';
 if(c.subgroup==='facilities')return 'facilities';
 if(c.subgroup==='countries'||QUIZ2_REGIONS.has(w.id))return 'countries';
 if(c.group==='objects')return 'objects';
 if(c.group==='food')return 'food';
 if(c.subgroup==='verbs')return 'actions';
 if(c.subgroup==='events'||c.subgroup==='learning')return 'leisure';
 if(c.subgroup==='weekdays')return 'weekdays';
 if((c.tags||[]).includes('counter')||c.group==='numbers')return 'counters';
 if(w.id==='4-12'||c.subgroup==='relative')return 'relative';
 if(c.subgroup==='clock')return 'clock';
 if(c.subgroup==='named')return 'countries';
 return null;
}
const PARTICLE_ORDER=['は','が','を','に','で','と','の','から','まで','か','も','×'];
const PARTICLE_ROLES={
 は:['marks the topic.','標示主題。'],
 が:['marks the subject.','標示主語。'],
 を:['marks the object of the action.','標示動作的受詞。'],
 に:['marks a specific point in time.','標示具體時刻。'],
 で:['marks where an action happens.','標示動作發生的場所。'],
 と:['joins nouns, meaning “and”.','連接名詞，表示「和」。'],
 の:['links an origin, owner or description to the following noun.','把來源、擁有者或描述連到後面的名詞。'],
 から:['marks the starting time or point. Treat the whole particle as one answer.','標示開始時間或起點。整個助詞算一個答案。'],
 まで:['marks the ending time or point. Treat the whole particle as one answer.','標示結束時間或終點。整個助詞算一個答案。'],
 か:['turns the sentence into a question.','把句子變成問句。'],
 も:['means “also” and replaces は.','表示「也」，並取代は。'],
 '×':['no particle is used. Words such as 毎朝 and 今 do not take に.','不加助詞。毎朝、今 這類詞不加 に。']
};
// Written blanks from Minna no Nihongo I lessons 3–4. `page` is internal only.
const PARTICLE_ITEMS=[
 {id:'ch3-classroom',chapters:[3],page:52,context:['You are in the classroom. Say what this place is.','你在教室裡，說出這裡是甚麼地方。'],parts:['ここ','教室です。'],answers:['は']},
 {id:'ch3-reception',chapters:[3],page:58,context:['Ask where reception is.','詢問接待處在哪裡。'],parts:['受付','どこです','。'],answers:['は','か']},
 {id:'ch3-meeting',chapters:[3],page:53,context:['Ask where the meeting room is.','詢問會議室在哪裡。'],parts:['会議室','どこです','。'],answers:['は','か']},
 {id:'ch3-vending',chapters:[3],page:52,context:['The vending machine is on the second floor.','自動販賣機在二樓。'],parts:['自動販売機','2階です。'],answers:['は']},
 {id:'ch3-office',chapters:[3],page:57,context:['The office is over there, away from both of you.','事務所在遠處。'],parts:['事務所','あそこです。'],answers:['は']},
 {id:'ch3-toilet-way',chapters:[3],page:57,context:['Ask which way the toilet is. The reply is a direction, あちら.','詢問洗手間在哪一個方向。回答是方向詞あちら。'],parts:['トイレ','どちらです','。'],answers:['は','か']},
 {id:'ch3-tie',chapters:[3],page:52,context:['This tie costs 1,500 yen.','這條領帶是 1,500 円。'],parts:['このネクタイ','1,500円です。'],answers:['は']},
 {id:'ch3-tie-price',chapters:[3],page:52,context:['Ask the price of this tie.','詢問這條領帶多少錢。'],parts:['このネクタイ','いくらです','。'],answers:['は','か']},
 {id:'ch3-car',chapters:[3],page:52,context:['This car is from Japan.','這輛車是日本的。'],parts:['これは日本','車です。'],answers:['の']},
 {id:'ch3-wine',chapters:[3],page:57,context:['This wine is from Italy.','這瓶葡萄酒是意大利的。'],parts:['これはイタリア','ワインです。'],answers:['の']},
 {id:'ch3-wine-ask',chapters:[3],page:57,context:['Ask which country this wine is from.','詢問這瓶葡萄酒是哪裡的。'],parts:['これはどこ','ワインです','。'],answers:['の','か']},
 {id:'ch3-german-wine',chapters:[3],page:58,context:['The wine you were offered is German.','對方遞上的是德國葡萄酒。'],parts:['ドイツ','ワインです。'],answers:['の']},
 {id:'ch3-miller-country',chapters:[3],page:54,context:['Ask Mr Miller which country he is from.','詢問 Miller 先生是哪一國人。'],parts:['ミラーさん','お国','どちらです','。'],answers:['の','は','か']},
 {id:'ch3-company-kind',chapters:[3],page:58,context:['Ask what kind of company Power Electric is.','詢問 Power 電氣是甚麼公司。'],parts:['パワー電気','何','会社です','。'],answers:['は','の','か']},
 {id:'ch3-computer-co',chapters:[3],page:58,context:['It is a computer company.','那是一間電腦公司。'],parts:['コンピューター','会社です。'],answers:['の']},
 {id:'ch3-schmidt',chapters:[3],page:58,context:['That person is Mr Schmidt of Power Electric.','那位是 Power 電氣的 Schmidt 先生。'],parts:['パワー電気','シュミットさんです。'],answers:['の']},
 {id:'ch3-staff',chapters:[3],page:58,context:['Ask whether that person is a Power Electric employee.','詢問那位是不是 Power 電氣的職員。'],parts:['あの方','パワー電気','社員です','。'],answers:['は','の','か']},
 {id:'ch3-santos',chapters:[3],page:58,context:['That person is Mr Santos of Brazil Air.','那位是巴西航空的 Santos 先生。'],parts:['あの方','ブラジルエアー','サントスさんです。'],answers:['は','の']},
 {id:'ch3-umbrella',chapters:[3],page:58,context:['Ask if this is Mr Miller’s umbrella.','詢問這是不是 Miller 先生的傘。'],parts:['これ','ミラーさん','傘です','。'],answers:['は','の','か']},
 {id:'ch3-car-key',chapters:[3],page:58,context:['That is the key to your car.','那是你的汽車鑰匙。'],parts:['それ','わたし','車','かぎです。'],answers:['は','の','の']},
 {id:'ch3-my-bag',chapters:[3],page:57,context:['The bag near the listener is yours.','靠近對方的袋子是你的。'],parts:['そのかばん','わたし','です。'],answers:['は','の']},
 {id:'ch3-who-polite',chapters:[3],page:58,context:['Ask politely who that person is.','禮貌地詢問那位是誰。'],parts:['あの方','どなたです','。'],answers:['は','か']},
 {id:'ch4-get-up',chapters:[4],page:62,context:['You get up at six every morning.','你每天早上六點起床。'],parts:['わたし','毎朝','6時','起きます。'],answers:['は','×','に']},
 {id:'ch4-lunch',chapters:[4],page:64,context:['Lunch break runs from 12:00 to 1:00.','午休從 12 點到 1 點。'],parts:['昼休み','12時','1時','です。'],answers:['は','から','まで']},
 {id:'ch4-work-span',chapters:[4],page:64,context:['You work from 9:00 to 5:00.','你從 9 點工作到 5 點。'],parts:['わたし','9時','5時','働きます。'],answers:['は','から','まで']},
 {id:'ch4-weekdays',chapters:[4],page:64,context:['You work from Monday through Friday.','你從星期一工作到星期五。'],parts:['月曜日','金曜日','働きます。'],answers:['から','まで']},
 {id:'ch4-days-off',chapters:[4],page:62,context:['The days off are Saturday and Sunday.','休息日是星期六和星期日。'],parts:['休み','土曜日','日曜日です。'],answers:['は','と']},
 {id:'ch4-bank',chapters:[4],page:65,context:['Ask what hours the bank is open.','詢問銀行幾點到幾點。'],parts:['銀行','何時','何時','です','。'],answers:['は','から','まで','か']},
 {id:'ch4-museum',chapters:[4],page:69,context:['Ask what hours the museum is open.','詢問美術館幾點到幾點。'],parts:['美術館','何時','何時','です','。'],answers:['は','から','まで','か']},
 {id:'ch4-post',chapters:[4],page:67,context:['The post office is open from 9:00 to 4:00.','郵局從 9 點開到 4 點。'],parts:['郵便局','9時','4時','です。'],answers:['は','から','まで']},
 {id:'ch4-library',chapters:[4],page:67,context:['Midori Library is open from 9:00 to 6:00.','綠圖書館從 9 點開到 6 點。'],parts:['みどり図書館','9時','6時','です。'],answers:['は','から','まで']},
 {id:'ch4-closed-day',chapters:[4],page:67,context:['It is closed on Thursday.','星期四休息。'],parts:['休み','木曜日です。'],answers:['は']},
 {id:'ch4-now',chapters:[4],page:69,context:['Ask what time it is now.','詢問現在幾點。'],parts:['今、何時','です','。'],answers:['×','か']},
 {id:'ch4-thursday-pm',chapters:[4],page:69,context:['The hospital is closed on Thursday afternoon.','醫院星期四下午休息。'],parts:['木曜日','午後、病院','休みです。'],answers:['の','は']},
 {id:'ch4-finish',chapters:[4],page:69,context:['Ask what time the university finishes.','詢問大學幾點結束。'],parts:['大学','何時','終わります','。'],answers:['は','に','か']},
 {id:'ch4-bank-off',chapters:[4],page:69,context:['The bank is closed on Saturday and Sunday.','銀行星期六和星期日休息。'],parts:['銀行','休み','土曜日','日曜日です。'],answers:['の','は','と']},
 {id:'ch4-until',chapters:[4],page:69,context:['Ask until what time they worked yesterday.','詢問昨天工作到幾點。'],parts:['きのう何時','働きました','。'],answers:['まで','か']},
 {id:'ch4-sleep',chapters:[4],page:66,context:['You go to bed at 11 every night.','你每晚 11 點睡覺。'],parts:['毎晩11時','寝ます。'],answers:['に']},
 {id:'ch4-study',chapters:[4],page:66,context:['You study from 7:00 to 9:00.','你從 7 點讀書到 9 點。'],parts:['7時','9時','勉強します。'],answers:['から','まで']},
 {id:'ch4-meeting',chapters:[4],page:67,context:['The meeting starts at 1:00.','會議 1 點開始。'],parts:['会議','1時','です。'],answers:['は','から']},
 {id:'ch4-end-time',chapters:[4],page:67,context:['It finishes at 2:30.','2 點半結束。'],parts:['2時半','終わります。'],answers:['に']},
 {id:'ch4-phone',chapters:[4],page:63,context:['Ask for the telephone number.','詢問電話號碼。'],parts:['電話番号','何番です','。'],answers:['は','か']}
];
function quiz2Words(){const seen=new Set();return WORDS.filter(w=>{if(!wordGameReady(w)||seen.has(w.id))return false;const cls=WORD_CLASSIFICATION.get(w.id);if(!cls||QUIZ2_SKIP.has(cls.group)||cls.subgroup==='particles')return false;if(!matchesChapters(w,['3','4']))return false;seen.add(w.id);return true;});}
function quiz2QuestionScenes(){const seen=new Set();return DIALOGUE_ENTRIES.filter(q=>SCENE_META.get(q.id).home==='grammar'&&matchesChapters(q,['3','4'])&&!seen.has(q.id)&&seen.add(q.id));}
function particlePool(){return PARTICLE_ITEMS.filter(item=>matchesChapters({chapters:item.chapters},state.quiz2Chapter));}
function particleChoices(items){const used=new Set(items.flatMap(item=>item.answers));return PARTICLE_ORDER.filter(p=>used.has(p));}
function particlePlain(item,values){return item.parts.map((part,i)=>{const a=values[i];return part+(a&&a!=='×'?a:'');}).join('');}
function quiz2Rows(group){
 const words=quiz2Words().filter(w=>quiz2Bucket(w)===group),byId=new Map(words.map(w=>[w.id,w])),seen=new Set(),rows=[];
 for(const w of words){if(seen.has(w.id))continue;seen.add(w.id);const mate=byId.get(QUIZ2_PAIR.get(w.id)||'');if(mate&&!seen.has(mate.id)){seen.add(mate.id);rows.push([w,mate]);}else rows.push([w]);}
 return rows;
}
function quiz2GroupMeta(id){return QUIZ2_GROUPS.find(group=>group[0]===id)||QUIZ2_GROUPS[0];}
function quiz2GroupsLive(){return QUIZ2_GROUPS.filter(([id])=>quiz2Rows(id).length);}
function quiz2ActiveGroup(){const live=quiz2GroupsLive();return live.some(([id])=>id===state.quiz2Group)?state.quiz2Group:live[0]?.[0]||'facilities';}
function quiz2NextGroup(after){const ids=QUIZ2_GROUPS.map(group=>group[0]),start=ids.indexOf(after);for(let i=start+1;i<ids.length;i++)if(quiz2Rows(ids[i]).length)return ids[i];return null;}
function quiz2Entry(w){
 const reading=w.kana||'',spelling=hasKanji(w)?w.c:reading,ruby=hasKanji(w)&&reading?`<span class="quiz2-reading jp" lang="ja">${esc(reading)}</span>`:'';
 return `<div class="quiz2-entry"><div class="quiz2-spell"><span class="jp" lang="ja">${esc(spelling)}</span>${ruby}</div><div class="quiz2-zh">${esc(w.zh||'')}</div><div class="quiz2-en">${esc(w.en||'')}</div></div>`;
}
function quiz2Preview(group,tag='h2'){
 const [,en,zh]=quiz2GroupMeta(group),rows=quiz2Rows(group);if(!rows.length)return '';
 const name=nL(en,zh),body=rows.map(row=>row.length>1?`<div class="quiz2-pair">${row.map(quiz2Entry).join('')}</div>`:quiz2Entry(row[0])).join('');
 return `<${tag} class="quiz2-preview-title">${esc(name)} <span class="quiz2-count">${rows.flat().length}</span></${tag}><div class="quiz2-preview">${body}</div>`;
}
function quiz2GroupChips(selected,doneId){
 return `<div class="filter-chip-group quiz2-groups"><div class="filter-chip-options" role="group" aria-label="${esc(nL('Word groups','詞彙組別'))}">${quiz2GroupsLive().map(([id,en,zh])=>{const done=id===doneId,label=nL(en,zh);return `<button type="button" class="filter-chip${done?' quiz2-done':''}" data-quiz2="group" data-quiz2-group="${id}" aria-pressed="${selected===id}">${esc(label)}${done?`<span class="quiz2-done-mark">${esc(nL('Done','完成'))}</span>`:''}</button>`;}).join('')}</div></div>`;
}
function quiz2Menu(){
 const method=['rebuild','questions','particles'].includes(state.quiz2Method)?state.quiz2Method:'rebuild';
 const methods=[['rebuild','Rebuild','重組'],['questions','Question Words','疑問詞'],['particles','Particle Matching','助詞配對']];
 const chips=methods.map(([id,en,zh])=>`<button type="button" class="filter-chip" data-quiz2="method" data-quiz2-method="${id}" aria-pressed="${method===id}">${nL(en,zh)}</button>`).join('');
 const group=quiz2ActiveGroup();
 const count=method==='questions'?quiz2QuestionScenes().length:method==='particles'?particlePool().length:quiz2Rows(group).length;
 const below=method==='rebuild'?quiz2GroupChips(group,null)+quiz2Preview(group):method==='particles'?`<div class="quiz2-chapters">${filterChips('quiz2','quiz2','chapter',nL('Chapters','課次'),[['all',nL('All','全部')],['3',nL('Chapter 3','第3課')],['4',nL('Chapter 4','第4課')]],state.quiz2Chapter,true)}</div>`:'';
 return `<section class="study-wrap quiz2-home"><h1 class="sr-only">${esc(nL('Quiz 2 Revision','小測二複習'))}</h1><div class="filter-chip-group"><div class="filter-chip-options" role="group" aria-label="${esc(nL('Practice method','練習方式'))}">${chips}</div></div><div class="card-actions quiz2-start"><button type="button" class="button primary" data-quiz2="start" ${count?'':'disabled'}>${nL('Start','開始')}</button></div>${below}</section>`;
}
function prepareQuiz2Rebuild(){
 const r=state.round;if(!r||r.index>=r.ids.length)return;const w=wordBy(r.ids[r.index]);
 r.checked=false;r.result=false;r.attempted=false;r.hadMiss=false;r.luluFeedback=null;r.chosen=[];r.tries=0;r.tileBank=vocabularyTileBank(w);
}
function startQuiz2Rebuild(group){
 const id=quiz2GroupsLive().some(([item])=>item===group)?group:quiz2ActiveGroup(),rows=quiz2Rows(id);if(!rows.length)return;
 state.quiz2Method='rebuild';state.quiz2Group=id;state.learningReturn='quiz2';
 state.round={mode:'quiz2-rebuild',group:id,ids:shuffle(rows).flat().map(w=>w.id),index:0,correct:0,missed:[],checked:false,result:false,chosen:[],tileBank:[],tries:0};
 prepareQuiz2Rebuild();state.view='quiz2-rebuild';save();render();window.scrollTo({top:0,behavior:'auto'});
}
function startQuiz2(method){
 method=['rebuild','questions','particles'].includes(method)?method:state.quiz2Method||'rebuild';
 state.quiz2Method=method;state.learningReturn='quiz2';
 if(method==='rebuild'){startQuiz2Rebuild(state.quiz2Group);return;}
 if(method==='questions'){const ids=quiz2QuestionScenes().map(q=>q.id);if(!ids.length)return;save();startActivity('dialogue-choice',ids,null,{ids,learningHome:'quiz2'});return;}
 if(method==='particles'){startParticle();return;}
}
function quiz2Slots(r,limit){return Array.from({length:limit},(_,position)=>{
 const index=r.chosen[position];
 if(index===undefined)return `<span class="vocabulary-slot empty" aria-label="${esc(nL('Empty slot','空格'))} ${position+1}"><span aria-hidden="true">${position+1}</span></span>`;
 const unit=r.tileBank[index];
 return `<button type="button" class="tile jp vocabulary-slot filled" lang="ja" data-quiz2="return" data-quiz2-index="${position}" ${r.result?'disabled':''} aria-label="${esc(nL('Return to the tile bank','放回假名'))} ${esc(unit)}">${esc(unit)}</button>`;
}).join('');}
function quiz2RebuildGame(){
 const r=state.round;if(!r||r.mode!=='quiz2-rebuild')return quiz2Menu();if(r.index>=r.ids.length)return quiz2Complete(r);
 const w=wordBy(r.ids[r.index]),target=vocabularyReading(w),kanji=hasKanji(w),limit=kanaUnits(target).length,ready=rebuildReady(vocabularyAnswer(),target);
 const [,en,zh]=quiz2GroupMeta(r.group),title=kanji?w.c:w.zh,gloss=kanji?`${w.zh} · ${w.en}`:w.en;
 const feedback=r.attempted?`<div class="reply-feedback ${r.result?'correct':'wrong'}" role="status">${luluFeedbackArt(r)}<div class="feedback-copy"><p class="lulu-outcome-label">${esc(r.result?nL('Correct','正確'):nL('Not quite — edit the tiles and check again.','還不對——修改假名後再核對。'))}</p>${r.result?`<p class="jp" lang="ja">${esc(target)}</p>`:''}</div></div>`:'';
 const bank=r.result?'':`<div class="token-bank vocabulary-tile-bank" role="group" aria-label="${esc(nL('Hiragana bank','平假名'))}">${r.tileBank.map((unit,index)=>`<button type="button" class="tile jp ${r.chosen.includes(index)?'selected':''}" lang="ja" data-quiz2="tile" data-quiz2-index="${index}" ${r.chosen.includes(index)?'disabled':''}>${esc(unit)}</button>`).join('')}</div>`;
 const actions=r.result?`<button type="button" class="button primary" data-quiz2="next">${nL('Next Word','下一個詞')}</button>`:`<button type="button" class="button ghost" data-quiz2="clear">${nL('Clear','清除')}</button><button type="button" class="button ghost" data-quiz2="undo" ${r.chosen.length?'':'disabled'}>${nL('Undo','復原')}</button><button type="button" class="button primary" data-quiz2="check" ${ready?'':'disabled'}>${nL('Check answer','核對答案')}</button>`;
 return `<section class="study-wrap quiz2-rebuild"><h1 class="sr-only">${esc(nL('Rebuild','重組'))}</h1><p class="eyebrow">${esc(nL(en,zh))} · ${r.index+1} / ${r.ids.length}</p><h2 class="quiz2-prompt ${kanji?'jp':''}" ${kanji?'lang="ja"':''}>${esc(title)}</h2><p class="quiz2-gloss">${esc(gloss)}</p><div class="token-area vocabulary-answer-slots ${r.chosen.length?'filled':''}" role="group" aria-label="${esc(nL('Your hiragana answer','你的平假名答案'))}">${quiz2Slots(r,limit)}</div>${feedback}${bank}<div class="card-actions">${actions}</div></section>`;
}
function quiz2Complete(r){
 const [,en,zh]=quiz2GroupMeta(r.group),name=nL(en,zh),next=quiz2NextGroup(r.group),selected=quiz2ActiveGroup();
 return `<section class="study-wrap quiz2-done"><h1 class="sr-only">${esc(nL('Group complete','組別完成'))}</h1>${luluSummaryArt(r)}<h2 class="quiz2-done-label">${esc(name)} ${esc(nL('complete','完成'))}</h2><p class="result-score">${r.correct}<small> / ${r.ids.length}</small></p>${r.missed.length?`<p class="muted">${r.missed.length} ${esc(nL('needed another try','需要再試一次'))}</p>`:''}<p class="muted">${esc(nL('Choose a group, then start it here.','在這裡選擇組別並開始。'))}</p>${quiz2GroupChips(selected,r.group)}<div class="card-actions quiz2-start">${next?`<button type="button" class="button soft" data-quiz2="next-group">${nL('Select next group','選擇下一組')}</button>`:''}<button type="button" class="button primary" data-quiz2="start">${nL('Start','開始')}</button></div>${quiz2Preview(selected,'h3')}</section>`;
}
function quiz2ForgetFeedback(r){if(!r?.result){r.attempted=false;r.luluFeedback=null;}}
function quiz2RebuildCheck(){
 const r=state.round;if(!r||r.mode!=='quiz2-rebuild'||r.result||r.index>=r.ids.length)return;
 const w=wordBy(r.ids[r.index]),target=vocabularyReading(w);if(!rebuildReady(vocabularyAnswer(),target))return;
 const ok=rebuildCorrect(vocabularyAnswer(),target);r.tries=(r.tries||0)+1;r.attempted=true;r.result=ok;
 if(ok){r.checked=true;if(!r.hadMiss)r.correct++;record('vocabularyRebuild',w.id,true);luluCommitFeedback(r,{key:r.index+':'+r.tries,correct:1});if(r.index===r.ids.length-1)luluPrepareSummary(r,r.correct,r.ids.length);}
 else{r.hadMiss=true;r.checked=false;if(!r.missed.includes(w.id))r.missed.push(w.id);record('vocabularyRebuild',w.id,false);luluCommitFeedback(r,{key:r.index+':'+r.tries,correct:0});}
 render();
}
function quiz2RebuildEdit(kind,index){
 const r=state.round;if(!r||r.mode!=='quiz2-rebuild'||r.result||r.index>=r.ids.length)return;
 const limit=kanaUnits(vocabularyReading(wordBy(r.ids[r.index]))).length;
 if(kind==='clear')r.chosen=[];
 else if(kind==='undo')r.chosen.pop();
 else if(kind==='tile'&&Number.isInteger(index)&&index>=0&&index<r.tileBank.length&&!r.chosen.includes(index)&&r.chosen.length<limit)r.chosen.push(index);
 else if(kind==='return'&&Number.isInteger(index)&&index>=0&&index<r.chosen.length)r.chosen.splice(index,1);
 else return;
 quiz2ForgetFeedback(r);render();
}
function startParticle(ids=null){
 const pool=particlePool(),chosen=(ids||pool.map(item=>item.id)).filter(id=>pool.some(item=>item.id===id));if(!chosen.length)return;
 state.quiz2Method='particles';state.learningReturn='quiz2';
 state.round={mode:'particle',ids:ids?chosen:shuffle(chosen),index:0,correct:0,missed:[],checked:false,blanks:[],active:0,choices:particleChoices(pool),chapter:[...state.quiz2Chapter]};
 prepareParticle();state.view='particle-game';save();render();window.scrollTo({top:0,behavior:'auto'});
}
function particleCurrent(){return PARTICLE_ITEMS.find(item=>item.id===state.round?.ids?.[state.round.index]);}
function prepareParticle(){const item=particleCurrent(),r=state.round;if(!item)return;r.checked=false;r.result=false;r.results=null;r.luluFeedback=null;r.blanks=item.answers.map(()=>null);r.active=0;}
function particleReady(){return state.round.blanks.every(Boolean);}
function particleSentence(item,r){
 return item.parts.map((part,i)=>{const blank=i<item.answers.length?`<button type="button" class="particle-blank${r.active===i?' active':''}${r.checked?(r.results[i]?' correct':' wrong'):''}" data-quiz2="blank" data-quiz2-index="${i}" ${r.checked?'disabled':''} aria-label="${nL('Blank','空格')} ${i+1}">${r.blanks[i]?`<span class="jp" lang="ja">${esc(r.blanks[i])}</span>`:'<span aria-hidden="true">　　</span>'}</button>`:'';return `<span class="jp" lang="ja">${esc(part)}</span>${blank}`;}).join('');
}
function particleGame(){const r=state.round;if(!r||r.mode!=='particle')return quiz2Menu();if(r.index>=r.ids.length)return `<section class="study-wrap paper result-center">${luluSummaryArt(r)}<div class="result-score">${r.correct}<small> / ${r.ids.length}</small></div><div class="card-actions">${r.missed.length?`<button class="button coral" data-quiz2="retry">${nL('Practise missed items','再練習錯過的項目')}</button>`:''}<button class="button primary" data-quiz2="start">${nL('New round','新的一輪')}</button></div></section>`;
 const item=particleCurrent(),done=particlePlain(item,item.answers);
 const explain=item.answers.map((answer,i)=>`<p>${i+1}. <span class="jp" lang="ja">${esc(answer)}</span> — ${esc(nL(...(PARTICLE_ROLES[answer]||['Particle.','助詞。'])))}</p>`).join('');
 return `<section class="study-wrap particle-exercise"><h1 class="sr-only">${nL('Particle Matching','助詞配對')}</h1><p class="exercise-situation">${esc(nL(...item.context))}</p><div class="particle-sentence" lang="ja">${particleSentence(item,r)}</div><div class="particle-options" role="group" aria-label="${nL('Particles','助詞')}">${r.choices.map(p=>`<button type="button" class="filter-chip particle-chip jp" lang="ja" data-quiz2="option" data-quiz2-particle="${p}" ${r.checked?'disabled':''}>${esc(p)}</button>`).join('')}</div>${r.checked?`<div class="reply-feedback ${r.result?'correct':'wrong'}" role="status">${luluFeedbackArt(r)}<div class="feedback-copy"><p class="lulu-outcome-label">${luluFeedbackLabel(r)}</p><p class="jp" lang="ja">${esc(done)}</p>${explain}</div></div><div class="card-actions"><button class="button primary" data-quiz2="next">${nL('Next','下一題')}</button></div>`:`${luluFeedbackPlaceholder()}<div class="card-actions"><button class="button primary" data-quiz2="check" ${particleReady()?'':'disabled'}>${nL('Check answer','核對答案')}</button></div>`}</section>`;
}
function quiz2Check(){const r=state.round;if(!r||r.checked||r.mode!=='particle')return;
 const item=particleCurrent();if(!item||!particleReady())return;r.results=item.answers.map((answer,i)=>answer===r.blanks[i]);r.result=r.results.every(Boolean);r.checked=true;if(r.result)r.correct++;else if(!r.missed.includes(item.id))r.missed.push(item.id);record('particleMatching',item.id,r.result);luluCommitFeedback(r,{key:String(r.index),correct:Number(r.result),total:1});if(r.index===r.ids.length-1)luluPrepareSummary(r,r.correct,r.ids.length);render();
}
document.addEventListener('click',event=>{
 const t=event.target.closest('[data-quiz2]');if(!t||t.disabled)return;
 event.stopPropagation();event.preventDefault();
 const kind=t.dataset.quiz2,r=state.round;
 if(kind==='method'){const method=t.dataset.quiz2Method;if(!['rebuild','questions','particles'].includes(method))return;state.quiz2Method=method;save();render();return;}
 if(kind==='group'){const id=t.dataset.quiz2Group;if(quiz2GroupsLive().some(([group])=>group===id)){state.quiz2Group=id;save();render();}return;}
 if(kind==='next-group'&&r?.mode==='quiz2-rebuild'){const next=quiz2NextGroup(r.group);if(next){state.quiz2Group=next;save();render();}return;}
 if(kind==='start'){startQuiz2(state.quiz2Method||'rebuild');return;}
 if(kind==='retry'&&r?.mode==='particle'){startParticle(r.missed);return;}
 if(['tile','return','clear','undo'].includes(kind)&&r?.mode==='quiz2-rebuild'){quiz2RebuildEdit(kind,Number(t.dataset.quiz2Index));return;}
 if(kind==='blank'&&r&&!r.checked){r.active=Number(t.dataset.quiz2Index);render();return;}
 if(kind==='option'&&r&&!r.checked){r.blanks[r.active]=t.dataset.quiz2Particle;const next=r.blanks.findIndex(v=>!v);if(next>=0)r.active=next;render();return;}
 if(kind==='check'){if(r?.mode==='quiz2-rebuild')quiz2RebuildCheck();else quiz2Check();return;}
 if(kind==='next'&&r?.checked){if(r.mode==='quiz2-rebuild'){r.index++;prepareQuiz2Rebuild();render();window.scrollTo({top:0,behavior:'auto'});return;}r.index++;prepareParticle();render();}
},true);
Object.assign(ZH_HANT,{
 'Quiz 2 Revision':'小測二複習',
 'Revise Chapters 3 and 4 vocabulary, question words and particles.':'複習第3及第4課的詞彙、疑問詞與助詞。',
 'Rebuild, Question Words, Particles':'重組、疑問詞、助詞',
 'Question Words':'疑問詞',
 'Learn question words, readings, kanji and examples.':'學習疑問詞的讀音、漢字與例句。',
 'Question Word':'疑問詞',
 'Particle Matching':'助詞配對',
 'question words':'疑問詞',
 'Word groups':'詞彙組別',
 'Next Word':'下一個詞',
 'Select next group':'選擇下一組',
 'Not quite — edit the tiles and check again.':'還不對——修改假名後再核對。',
 'Choose a group, then start it here.':'在這裡選擇組別並開始。',
 'Group complete':'組別完成',
 'Done':'完成'
});
