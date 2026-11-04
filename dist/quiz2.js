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
function particlePool(){const selected=new Set(quiz2Selected('particles'));return PARTICLE_ITEMS.filter(item=>item.chapters.some(ch=>selected.has(String(ch))));}
function particleChoices(items){const used=new Set(items.flatMap(item=>item.answers));return PARTICLE_ORDER.filter(p=>used.has(p));}
function particlePlain(item,values){return item.parts.map((part,i)=>{const a=values[i];return part+(a&&a!=='×'?a:'');}).join('');}
function quiz2PairRows(words){
 const byId=new Map(words.map(w=>[w.id,w])),seen=new Set(),rows=[];
 for(const w of words){if(seen.has(w.id))continue;seen.add(w.id);const mate=byId.get(QUIZ2_PAIR.get(w.id)||'');if(mate&&!seen.has(mate.id)){seen.add(mate.id);rows.push([w,mate].sort((a,b)=>a.id.localeCompare(b.id,'en',{numeric:true})));}else rows.push([w]);}
 return rows;
}
function quiz2KatakanaOnly(w){
 if(hasKanji(w))return false;
 const written=(w.c&&w.c!=='X'?w.c:w.jp||w.kana||'');
 const core=[...written].filter(ch=>!/[\s\u3000・･.,。、！？!?()（）「」『』\-—–/／ーｰ]/.test(ch));
 return core.length>0&&core.every(ch=>/\p{Script=Katakana}/u.test(ch));
}
function quiz2Rows(group){return quiz2PairRows(quiz2Words().filter(w=>quiz2Bucket(w)===group&&!quiz2KatakanaOnly(w)));}
function quiz2CombinedRows(groupIds){
 const seen=new Set(),rows=[];
 for(const row of groupIds.flatMap(id=>quiz2Rows(id))){const fresh=row.filter(w=>!seen.has(w.id));fresh.forEach(w=>seen.add(w.id));if(fresh.length)rows.push(fresh);}
 return rows;
}
function quiz2Mode(){const method=state.quiz2Method==='rebuild'||state.quiz2Method==='recall'?'vocab':state.quiz2Method;return ['vocab','questions','particles'].includes(method)?method:'vocab';}
function quiz2CategoryOptions(method=quiz2Mode()){
 if(method==='questions'){
  const group=LEARNING_TAXONOMY.find(item=>item.id==='questions');
  const words=quiz2Words().filter(w=>quiz2Bucket(w)==='questions');
  return (group?.subgroups||[]).filter(item=>words.some(w=>WORD_CLASSIFICATION.get(w.id)?.subgroup===item.id)).map(item=>[item.id,item.label,item.zh]);
 }
 if(method==='particles')return [['3','Chapter 3','第3課'],['4','Chapter 4','第4課']].filter(([id])=>PARTICLE_ITEMS.some(item=>item.chapters.includes(Number(id))));
 return quiz2GroupsLive();
}
function quiz2NormalizeCategories(){
 const stored=state.quiz2Categories&&typeof state.quiz2Categories==='object'?state.quiz2Categories:{};
 const next={};
 for(const method of ['vocab','rebuild','recall','questions','particles']){
  const available=quiz2CategoryOptions(method).map(item=>item[0]);
  let selected=Array.isArray(stored[method])?stored[method].map(String):null;
  if(!selected){
   if(method==='vocab'||method==='rebuild'||method==='recall')selected=available.includes(state.quiz2Group)?[state.quiz2Group]:method==='vocab'?available.slice(0,1):[...available];
   else if(method==='particles'){const chapters=normalizeChapters(state.quiz2Chapter,['3','4']);selected=chapters.includes('all')?[...available]:chapters;}
   else selected=[...available];
  }
  next[method]=available.filter(id=>selected.includes(id));
  if(method==='vocab')next[method]=(next[method][0]?[next[method][0]]:available.slice(0,1));
 }
 state.quiz2Categories=next;
 if(next.vocab?.length)state.quiz2Group=next.vocab[0];
 else if(next.rebuild.length)state.quiz2Group=next.rebuild[0];
 state.quiz2Chapter=next.particles.length?[...next.particles]:['3','4'];
}
function quiz2Selected(method=quiz2Mode()){quiz2NormalizeCategories();return state.quiz2Categories[method];}
function quiz2QuestionWords(categoryIds){
 const ids=new Set(categoryIds),seen=new Set();
 return quiz2Words().filter(w=>{const sub=WORD_CLASSIFICATION.get(w.id)?.subgroup;if(quiz2Bucket(w)!=='questions'||!ids.has(sub)||seen.has(w.id))return false;seen.add(w.id);return true;});
}
function quiz2QuestionRows(categoryIds){return quiz2PairRows(quiz2QuestionWords(categoryIds));}
function quiz2SceneCategory(q){
 const subs=new Set(dialogueForms(q).map(form=>form.word&&WORD_CLASSIFICATION.get(form.word)?.subgroup).filter(Boolean));
 return subs.has('location')?'location':'question';
}
function quiz2QuestionScenesFor(categoryIds){
 const selected=new Set(categoryIds),seen=new Set();
 return quiz2QuestionScenes().filter(q=>{if(seen.has(q.id)||!selected.has(quiz2SceneCategory(q)))return false;seen.add(q.id);return true;});
}
function quiz2PracticeCount(method=quiz2Mode()){
 const selected=quiz2Selected(method);if(!selected.length)return 0;
 if(method==='questions')return quiz2QuestionScenesFor(selected).length||quiz2QuestionRows(selected).length;
 if(method==='particles')return particlePool().length;
 if(method==='recall')return new Set(quiz2CombinedRows(selected).flat().map(w=>w.id)).size;
 return quiz2CombinedRows(selected).length;
}
function quiz2CheckIcon(){return `<svg class="quiz2-check" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M9.55 17.6 4.4 12.45l1.4-1.4 3.75 3.75 8.65-8.65 1.4 1.4z"/></svg>`;}
function quiz2ToggleCategory(id){
 const method=quiz2Mode(),available=quiz2CategoryOptions(method).map(item=>item[0]);
 if(method==='vocab'){if(available.includes(id))state.quiz2Categories.vocab=[id];return;}
 if(id==='all'){const allOn=available.every(item=>quiz2Selected(method).includes(item));state.quiz2Categories[method]=allOn?[]:[...available];}
 else if(available.includes(id)){const selected=new Set(quiz2Selected(method));if(selected.has(id))selected.delete(id);else selected.add(id);state.quiz2Categories[method]=available.filter(item=>selected.has(item));}
 if((method==='vocab'||method==='rebuild')&&state.quiz2Categories[method]?.length)state.quiz2Group=state.quiz2Categories[method][0];
 if(method==='particles')state.quiz2Chapter=state.quiz2Categories.particles.length?[...state.quiz2Categories.particles]:['3','4'];
}
function quiz2CategoryField(){
 const options=quiz2CategoryOptions(),selected=new Set(quiz2Selected()),vocab=quiz2Mode()==='vocab',allOn=!vocab&&options.length>0&&options.every(([id])=>selected.has(id));
 const tab=allOn?'all':options.find(([id])=>selected.has(id))?.[0]||options[0]?.[0]||'all';
 const chip=(id,label,pressed)=>`<button type="button" class="filter-chip quiz2-category" data-quiz2="category" data-quiz2-category="${esc(id)}" aria-pressed="${pressed}" tabindex="${tab===id?0:-1}">${pressed?quiz2CheckIcon():''}${esc(label)}</button>`;
 return `<fieldset class="filter-chip-group quiz2-categories"><legend>${esc(nL('Categories','組別'))}</legend><div class="filter-chip-options" role="group" aria-label="${esc(nL('Categories','組別'))}">${vocab?'':chip('all',nL('All','全部'),allOn)}${options.map(([id,en,zh])=>chip(id,nL(en,zh),selected.has(id))).join('')}</div></fieldset>`;
}
function quiz2VocabWords(){const id=quiz2Selected('vocab')[0];return id?quiz2Rows(id).flat():[];}
function quiz2VocabActions(){
 const words=quiz2VocabWords(),kanji=words.some(w=>vocabEligibleKanji(w).length),off=words.length?'':'disabled';
 const button=(kind,en,zh,tone='')=>`<button type="button" class="button${tone?` ${tone}`:''}" data-quiz2="${kind}" ${off}>${nL(en,zh)}</button>`;
 return `<div class="card-actions quiz2-start quiz2-mode-menu" role="group" aria-label="${esc(nL('Practice method','練習方式'))}">${button('adaptive','Adaptive revision','自適應溫習','primary')}${button('matching','Matching','配對')}${kanji?button('kanji','Choose the correct kanji','選擇正確漢字'):''}${button('rebuild','Rebuild','重組')}${button('recall','Recall','回想')}</div>`;
}
function quiz2GroupMeta(id){return QUIZ2_GROUPS.find(group=>group[0]===id)||QUIZ2_GROUPS[0];}
function quiz2GroupsLive(){return QUIZ2_GROUPS.filter(([id])=>quiz2Rows(id).length);}
function quiz2ActiveGroup(){const live=quiz2GroupsLive();return live.some(([id])=>id===state.quiz2Group)?state.quiz2Group:live[0]?.[0]||'facilities';}
function quiz2NextGroup(after){const ids=QUIZ2_GROUPS.map(group=>group[0]),start=ids.indexOf(after);for(let i=start+1;i<ids.length;i++)if(quiz2Rows(ids[i]).length)return ids[i];return null;}
function quiz2FormCopy(w){
 const note=learningWordNote(w),kana=w.kana||w.jp||'',kanji=hasKanji(w)&&w.c&&w.c!=='X'&&w.c!==kana?w.c:'';
 const head=kanji?`<span class="quiz2-kana jp" lang="ja">${esc(kana)}</span><span class="quiz2-sep" aria-hidden="true"> • </span><span class="quiz2-kanji jp" lang="ja">${esc(kanji)}</span>`:`<span class="quiz2-kana jp" lang="ja">${esc(kana)}</span>`;
 return `<div class="quiz2-form"><p class="quiz2-head">${head}</p><p class="quiz2-meaning">${esc(nL(w.en,w.zh))}</p>${note?`<p class="small quiz2-note">${esc(note)}</p>`:''}</div>`;
}
function quiz2WideScene(word){
 const plan=LULU_WORD_PLANS[word.id];if(!plan)return false;
 if(plan.strategy==='action-context'&&['listening','watching','photographing','smoking','finishing','resting'].includes(plan.action))return false;
 if(plan.strategy==='spatial'||plan.strategy==='action-context'||plan.strategy==='conversation'||plan.strategy==='occupation')return true;
 return plan.strategy==='context'&&['family','together','person','address','alone','languages','break','morning','night'].includes(plan.context);
}
function quiz2Card(row){
 const ids=row.map(w=>w.id).join(' '),banner=row.some(w=>['3-01','3-02','3-03'].includes(w.id));
 return `<article class="paper lexical-card quiz2-card${row.length>1?' quiz2-card-pair':''}${quiz2WideScene(row[0])?' quiz2-card-scene':''}${banner?' quiz2-card-banner':''}" data-lexical-id="${ids}"><div class="lexical-card-visual">${luluPreviewVisual(row[0])}</div><div class="lexical-card-copy">${row.map(quiz2FormCopy).join('')}</div></article>`;
}
function quiz2Preview(group,tag='h2'){
 const [,en,zh]=quiz2GroupMeta(group),rows=quiz2Rows(group);if(!rows.length)return '';
 const name=nL(en,zh);
 return `<${tag} class="quiz2-preview-title">${esc(name)} <span class="quiz2-count">${rows.flat().length}</span></${tag}><div class="quiz2-preview">${rows.map(quiz2Card).join('')}</div>`;
}
function quiz2ModePreview(tag='h2'){
 const method=quiz2Mode(),selected=quiz2Selected(method);
 if(!selected.length)return `<p class="quiz2-category-empty" role="status">${esc(nL('Select at least one category','請至少選擇一個組別'))}</p>`;
 if(method==='particles')return quiz2ParticlePreview();
 if(method==='questions')return selected.map(id=>{const meta=quiz2CategoryOptions('questions').find(item=>item[0]===id),rows=quiz2QuestionRows([id]);if(!meta||!rows.length)return '';return `<${tag} class="quiz2-preview-title">${esc(nL(meta[1],meta[2]))} <span class="quiz2-count">${rows.flat().length}</span></${tag}><div class="quiz2-preview">${rows.map(quiz2Card).join('')}</div>`;}).join('');
 return selected.map(id=>quiz2Preview(id,tag)).join('');
}
function quiz2ParticleLine(item){
 return item.parts.map((part,i)=>{const answer=item.answers[i],mark=answer&&answer!=='×'?`<span class="quiz2-particle jp" lang="ja">${esc(answer)}</span>`:'';return `<span class="jp" lang="ja">${esc(part)}</span>${mark}`;}).join('');
}
function quiz2ParticlePreview(){
 const items=particlePool();if(!items.length)return '';
 const cards=items.map(item=>`<article class="paper quiz2-particle-card"><p class="quiz2-particle-situation">${esc(nL(...item.context))}</p><p class="quiz2-particle-line" lang="ja">${quiz2ParticleLine(item)}</p><p class="quiz2-particle-keys">${item.answers.map(answer=>`<span class="jp" lang="ja">${esc(answer)}</span>`).join('')}</p></article>`).join('');
 return `<h2 class="quiz2-preview-title">${esc(nL('Sentences','句子'))} <span class="quiz2-count">${items.length}</span></h2><p class="quiz2-particle-note">${esc(nL('Highlighted particles are the answers. × means no particle.','標示的助詞是答案。× 表示不加助詞。'))}</p><div class="quiz2-preview quiz2-particle-preview">${cards}</div>`;
}
function quiz2Menu(){
 const method=quiz2Mode();
 const methods=[['vocab','Vocab','詞彙'],['questions','Question Words','疑問詞'],['particles','Particle Matching','助詞配對']];
 const chips=methods.map(([id,en,zh])=>`<button type="button" class="filter-chip" data-quiz2="method" data-quiz2-method="${id}" aria-pressed="${method===id}" tabindex="${method===id?0:-1}">${nL(en,zh)}</button>`).join('');
 const count=quiz2PracticeCount(method);
 const start=method==='vocab'?quiz2VocabActions():`<div class="card-actions quiz2-start"><button type="button" class="button primary" data-quiz2="start" ${count?'':'disabled'}>${nL('Start','開始')}</button></div>`;
 return `<section class="study-wrap quiz2-home"><h1 class="sr-only">${esc(nL('Quiz 2 Revision','測驗二溫習'))}</h1><div class="filter-chip-group"><div class="filter-chip-options" role="group" aria-label="${esc(nL('Practice method','練習方式'))}">${chips}</div></div>${quiz2CategoryField()}${start}${quiz2ModePreview()}</section>`;
}
function quiz2Item(row){const ids=row.map(word=>word.id);return {key:ids.join('+'),ids,solved:[],missed:false};}
function quiz2CurrentItem(round){return round?.items?.[round.index]||null;}
function quiz2FormId(round){const item=quiz2CurrentItem(round);return item?.ids.find(id=>!item.solved.includes(id)&&!(item.closed||[]).includes(id))||null;}
function prepareQuiz2Rebuild(){
 const round=state.round,id=quiz2FormId(round);if(!id)return;
 const word=wordBy(id);
 round.formId=id;round.hold=false;round.checked=false;round.result=false;round.final=false;round.requeue=false;round.attempts=0;round.feedbackKind=null;round.attempted=false;round.luluFeedback=null;round.chosen=[];round.tries=0;round.tileBank=vocabularyTileBank(word);
}
function startQuiz2Rebuild(){
 const ids=quiz2Selected('rebuild'),rows=quiz2CombinedRows(ids);if(!rows.length)return;
 const items=shuffle(rows).map(quiz2Item);
 state.quiz2Method='rebuild';state.quiz2Group=ids[0];state.learningReturn='quiz2';
 state.round={mode:'quiz2-rebuild',group:ids[0],groups:ids,items,total:items.length,done:0,index:0,correct:0,missed:[],hold:false,skipNote:false,checked:false,result:false,chosen:[],tileBank:[],tries:0};
 prepareQuiz2Rebuild();state.view='quiz2-rebuild';save();render();window.scrollTo({top:0,behavior:'auto'});
}
function startQuiz2Recall(){
 const ids=[...new Set(quiz2CombinedRows(quiz2Selected('recall')).flat().map(w=>w.id))];if(!ids.length)return;
 state.quiz2Method='recall';state.learningReturn='quiz2';
 startWordPractice('write',ids,nL('Quiz 2 Recall','測驗二回想'));
}
function startQuiz2(method){
 method=['rebuild','recall','questions','particles'].includes(method)?method:state.quiz2Method||'rebuild';
 state.quiz2Method=method;state.learningReturn='quiz2';
 if(method==='rebuild'){startQuiz2Rebuild();return;}
 if(method==='recall'){startQuiz2Recall();return;}
 if(method==='questions'){
  const selected=quiz2Selected('questions'),ids=quiz2QuestionScenesFor(selected).map(q=>q.id);
  if(ids.length){save();startActivity('dialogue-choice',ids,null,{ids,learningHome:'quiz2'});return;}
  const rows=quiz2QuestionRows(selected);if(!rows.length)return;
  const items=shuffle(rows).map(quiz2Item);
  state.quiz2Method='questions';state.learningReturn='quiz2';
  state.round={mode:'quiz2-rebuild',group:'questions',groups:selected,items,total:items.length,done:0,index:0,correct:0,missed:[],hold:false,skipNote:false,checked:false,result:false,chosen:[],tileBank:[],tries:0};
  prepareQuiz2Rebuild();state.view='quiz2-rebuild';save();render();window.scrollTo({top:0,behavior:'auto'});return;
 }
 if(method==='particles'){startParticle();return;}
}
function quiz2Slots(r,limit){return Array.from({length:limit},(_,position)=>{
 const index=r.chosen[position];
 if(!Number.isInteger(index))return `<span class="vocabulary-slot empty" aria-label="${esc(nL('Empty slot','空格'))} ${position+1}"><span aria-hidden="true">${position+1}</span></span>`;
 const unit=r.tileBank[index];
 return `<button type="button" class="tile jp vocabulary-slot filled" lang="ja" data-quiz2="return" data-quiz2-index="${position}" ${r.final?'disabled':''} aria-label="${esc(nL('Return to the tile bank','放回假名'))} ${esc(unit)}">${esc(unit)}</button>`;
}).join('');}
function quiz2Notice(kind,holder,extra=''){const label=kind==='correct'?nL('Correct','正確'):kind==='retry'?nL('Not quite. Check again.','未完全正確，請再檢查。'):nL('Wrong','答錯了');const tone=kind==='correct'?'correct':'wrong';return `<div class="lulu-bubble-row ${tone}" role="status">${luluFeedbackArt(holder)}<div class="lulu-speech ${tone}"><p class="lulu-outcome-label">${esc(label)}</p>${extra}</div></div>`;}
function quiz2SubmitButton(){return `<button type="button" class="button primary" data-quiz2="check">${nL('Submit','提交')}</button>`;}
function quiz2QuestionVisual(word){if(!word||!LULU_WORD_PLANS[word.id])return '';return `<div class="quiz2-q-visual">${luluPreviewVisual(word)}</div>`;}
function quiz2QuestionHeader(word,title,gloss,{jp=false}={}){const visual=quiz2QuestionVisual(word);return `<div class="quiz2-q-header">${visual}<div class="quiz2-q-copy"><h2 class="quiz2-prompt ${jp?'jp':''}" ${jp?'lang="ja"':''}>${esc(title)}</h2><p class="quiz2-gloss">${esc(gloss)}</p></div></div>`;}
function quiz2RebuildGame(){
 const r=state.round;if(!r||r.mode!=='quiz2-rebuild'||!r.items)return quiz2Menu();if(!r.items.length)return quiz2Complete(r);
 const w=wordBy(r.formId),target=vocabularyReading(w),kanji=hasKanji(w),limit=kanaUnits(target).length;
 const title=kanji?w.c:w.zh,gloss=kanji?`${w.zh} · ${w.en}`:w.en;
 const feedback=r.feedbackKind?`<div class="quiz2-result">${quiz2Notice(r.feedbackKind,r,r.feedbackKind==='wrong'||r.feedbackKind==='correct'?`<p class="jp" lang="ja">${esc(target)}</p>`:'')}</div>`:'';
 const bank=r.final?'':`<div class="token-bank vocabulary-tile-bank" role="group" aria-label="${esc(nL('Hiragana bank','平假名'))}">${r.tileBank.map((unit,index)=>`<button type="button" class="tile jp ${r.chosen.includes(index)?'selected':''}" lang="ja" data-quiz2="tile" data-quiz2-index="${index}" ${r.chosen.includes(index)?'disabled':''}>${esc(unit)}</button>`).join('')}</div>`;
 const actions=r.final?`<button type="button" class="button primary" data-quiz2="next">${nL('Next Word','下一個詞')}</button>`:quiz2SubmitButton();
 return `<section class="study-wrap quiz2-rebuild"><h1 class="sr-only">${esc(nL('Rebuild','重組'))}</h1>${quiz2QuestionHeader(w,title,gloss,{jp:kanji})}<div class="token-area vocabulary-answer-slots ${r.chosen.length?'filled':''}" role="group" aria-label="${esc(nL('Your hiragana answer','你的平假名答案'))}">${quiz2Slots(r,limit)}</div>${feedback}${bank}<div class="card-actions">${actions}</div></section>`;
}
function quiz2Complete(r){
 const names=(r.groups||[r.group]).map(id=>nL(...quiz2GroupMeta(id).slice(1))),name=names.length>1?nL('Selected categories','已選組別'):names[0]||'';
 return `<section class="study-wrap quiz2-done"><h1 class="sr-only">${esc(nL('Group complete','組別完成'))}</h1>${luluSummaryArt(r)}<h2 class="quiz2-done-label">${esc(name)} ${esc(nL('complete','完成'))}</h2><p class="result-score">${r.correct}<small> / ${r.total}</small></p>${r.missed.length?`<p class="muted">${r.missed.length} ${esc(nL('needed another try','需要再試一次'))}</p>`:''}${quiz2CategoryField()}<div class="card-actions quiz2-start"><button type="button" class="button primary" data-quiz2="start" ${quiz2PracticeCount('rebuild')?'':'disabled'}>${nL('Start','開始')}</button></div>${quiz2ModePreview('h3')}</section>`;
}
function quiz2ForgetFeedback(r){if(!r?.result){r.attempted=false;r.luluFeedback=null;r.skipNote=false;}}
function quiz2RebuildCheck(){
 const r=state.round;if(!r||r.mode!=='quiz2-rebuild'||r.final||!quiz2CurrentItem(r))return;
 const w=wordBy(r.formId),target=vocabularyReading(w),item=quiz2CurrentItem(r);
 const complete=r.chosen.filter(slot=>Number.isInteger(slot)).length===kanaUnits(target).length;
 const ok=complete&&rebuildCorrect(vocabularyAnswer(),target);
 r.attempts=(r.attempts||0)+1;r.skipNote=false;
 if(ok){r.final=true;r.checked=true;r.result=true;r.feedbackKind='correct';record('vocabularyRebuild',w.id,true);luluCommitFeedback(r,{key:item.key+':'+w.id+':correct',correct:1});}
 else if(!complete||r.attempts>1){r.final=true;r.checked=true;r.result=false;r.feedbackKind='wrong';item.missed=true;if(!r.missed.includes(item.key))r.missed.push(item.key);if(!complete&&!item.reviewed){item.reviewed=true;r.requeue=true;}record('vocabularyRebuild',w.id,false);luluCommitFeedback(r,{key:item.key+':'+w.id+':wrong',correct:0});}
 else{r.final=false;r.checked=false;r.result=false;r.feedbackKind='retry';luluCommitFeedback(r,{key:item.key+':'+w.id+':retry',correct:0});}
 render();
}
function quiz2RebuildAdvance(){
 const r=state.round,item=quiz2CurrentItem(r);if(!r?.final||!item)return;
 if(r.requeue){const key=item.key;r.items.splice(r.index,1);if(!r.items.some(other=>other.key===key))r.items.push(item);if(r.index>=r.items.length)r.index=0;r.requeue=false;prepareQuiz2Rebuild();render();window.scrollTo({top:0,behavior:'auto'});return;}
 if(r.result){if(!item.solved.includes(r.formId))item.solved.push(r.formId);}
 else{item.closed=item.closed||[];if(!item.closed.includes(r.formId))item.closed.push(r.formId);}
 if(quiz2FormId(r)){prepareQuiz2Rebuild();render();window.scrollTo({top:0,behavior:'auto'});return;}
 r.done=(r.done||0)+1;if(!item.missed)r.correct++;
 r.items.splice(r.index,1);if(r.index>=r.items.length)r.index=0;
 if(!r.items.length){luluPrepareSummary(r,r.correct,r.total);render();window.scrollTo({top:0,behavior:'auto'});return;}
 prepareQuiz2Rebuild();render();window.scrollTo({top:0,behavior:'auto'});
}
function quiz2RebuildSkip(){
 const r=state.round;if(!r||r.mode!=='quiz2-rebuild'||r.result||r.hold||!quiz2CurrentItem(r))return;
 if(r.items.length<=1){r.hold=true;r.skipNote=true;r.chosen=[];r.attempted=false;r.result=false;r.checked=false;r.luluFeedback=null;render();window.scrollTo({top:0,behavior:'auto'});return;}
 const item=r.items[r.index];
 r.items.splice(r.index,1);if(!r.items.some(other=>other.key===item.key))r.items.push(item);
 if(r.index>=r.items.length)r.index=0;
 r.skipNote=true;prepareQuiz2Rebuild();render();window.scrollTo({top:0,behavior:'auto'});
}
function quiz2RebuildEdit(kind,index){
 const r=state.round;if(!r||r.mode!=='quiz2-rebuild'||r.final||!quiz2FormId(r))return;
 const limit=kanaUnits(vocabularyReading(wordBy(r.formId))).length;
 if(kind==='clear')r.chosen=[];
 else if(kind==='tile'&&Number.isInteger(index)&&index>=0&&index<r.tileBank.length&&!r.chosen.includes(index)){
  const filled=r.chosen.filter(slot=>Number.isInteger(slot)).length;
  if(filled>=limit)return;
  const hole=r.chosen.findIndex(slot=>!Number.isInteger(slot));
  if(hole>=0)r.chosen[hole]=index;else r.chosen.push(index);
 }
 else if(kind==='return'&&Number.isInteger(index)&&index>=0&&index<r.chosen.length&&Number.isInteger(r.chosen[index]))r.chosen[index]=null;
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
function prepareParticle(){const item=particleCurrent(),r=state.round;if(!item)return;r.checked=false;r.result=false;r.final=false;r.requeue=false;r.attempts=0;r.feedbackKind=null;r.results=null;r.luluFeedback=null;r.blanks=item.answers.map(()=>null);r.active=0;}
function particleReady(){return state.round.blanks.every(Boolean);}
function particleSentence(item,r){
 return item.parts.map((part,i)=>{const blank=i<item.answers.length?`<button type="button" class="particle-blank${r.active===i?' active':''}${r.checked?(r.results[i]?' correct':' wrong'):''}" data-quiz2="blank" data-quiz2-index="${i}" ${r.checked?'disabled':''} aria-label="${nL('Blank','空格')} ${i+1}">${r.blanks[i]?`<span class="jp" lang="ja">${esc(r.blanks[i])}</span>`:'<span aria-hidden="true">　　</span>'}</button>`:'';return `<span class="jp" lang="ja">${esc(part)}</span>${blank}`;}).join('');
}
function particleGame(){const r=state.round;if(!r||r.mode!=='particle')return quiz2Menu();if(r.index>=r.ids.length)return `<section class="study-wrap paper result-center">${luluSummaryArt(r)}<div class="result-score">${r.correct}<small> / ${r.ids.length}</small></div><div class="card-actions">${r.missed.length?`<button class="button coral" data-quiz2="retry">${nL('Practise missed items','再練習錯過的項目')}</button>`:''}<button class="button primary" data-quiz2="start">${nL('New round','新的一輪')}</button></div></section>`;
 const item=particleCurrent(),done=particlePlain(item,item.answers);
 const explain=item.answers.map((answer,i)=>`<p>${i+1}. <span class="jp" lang="ja">${esc(answer)}</span> — ${esc(nL(...(PARTICLE_ROLES[answer]||['Particle.','助詞。'])))}</p>`).join('');
 const reveal=r.feedbackKind==='correct'||r.feedbackKind==='wrong';
 const feedback=r.feedbackKind?quiz2Notice(r.feedbackKind,r,reveal?`<p class="jp" lang="ja">${esc(done)}</p>${explain}`:''):'';
 const selector=r.final&&r.result?'':`<div class="particle-options" role="group" aria-label="${nL('Particles','助詞')}">${r.choices.map(p=>`<button type="button" class="filter-chip particle-chip jp" lang="ja" data-quiz2="option" data-quiz2-particle="${p}" ${r.final?'disabled':''}>${esc(p)}</button>`).join('')}</div>`;
 return `<section class="study-wrap particle-exercise"><h1 class="sr-only">${nL('Particle Matching','助詞配對')}</h1><p class="exercise-situation">${esc(nL(...item.context))}</p><div class="particle-sentence" lang="ja">${particleSentence(item,r)}</div><div class="particle-result">${feedback}${selector}</div><div class="card-actions">${r.final?`<button class="button primary" data-quiz2="next">${nL('Next','下一題')}</button>`:quiz2SubmitButton()}</div></section>`;
}
function quiz2Check(){const r=state.round;if(!r||r.final||r.mode!=='particle')return;
 const item=particleCurrent();if(!item)return;
 const complete=particleReady(),results=item.answers.map((answer,i)=>answer===r.blanks[i]),ok=complete&&results.every(Boolean);
 r.attempts=(r.attempts||0)+1;r.results=results;
 if(ok){r.final=true;r.checked=true;r.result=true;r.feedbackKind='correct';r.correct++;record('particleMatching',item.id,true);luluCommitFeedback(r,{key:item.id+':correct',correct:1});}
 else if(!complete||r.attempts>1){r.final=true;r.checked=true;r.result=false;r.feedbackKind='wrong';if(!r.missed.includes(item.id))r.missed.push(item.id);if(!complete&&!(r.reviewed||[]).includes(item.id)){r.reviewed=r.reviewed||[];r.reviewed.push(item.id);r.requeue=true;}record('particleMatching',item.id,false);luluCommitFeedback(r,{key:item.id+':wrong',correct:0});}
 else{r.final=false;r.checked=false;r.result=false;r.feedbackKind='retry';luluCommitFeedback(r,{key:item.id+':retry',correct:0});}
 if(r.final&&r.index===r.ids.length-1&&!r.requeue)luluPrepareSummary(r,r.correct,r.ids.length);render();
}
function quiz2ParticleAdvance(){const r=state.round;if(!r?.final)return;if(r.requeue){const id=r.ids[r.index];r.ids.splice(r.index,1);r.ids.push(id);if(r.index>=r.ids.length)r.index=0;r.requeue=false;prepareParticle();render();return;}r.index++;prepareParticle();render();}
function quiz2RecallMissing(word,round){if(!String(round.b||'').trim())return true;return word.c!=='X'&&!String(round.c||'').trim();}
function quiz2RecallSubmit(){const r=state.round,w=wordBy(current());if(!r||r.final||!w)return;const missing=quiz2RecallMissing(w,r),result=gradeWord(w,r.b,r.c,true),ok=!missing&&result.score===1;r.attempts=(r.attempts||0)+1;r.result=result;
 if(ok){r.final=true;r.checked=true;r.feedbackKind='correct';r.correct++;record('words',w.id,true);luluCommitFeedback(r,{key:w.id+':correct',correct:1});}
 else if(missing||r.attempts>1){r.final=true;r.checked=true;r.feedbackKind='wrong';if(!r.missed.includes(w.id))r.missed.push(w.id);if(missing&&!(r.reviewed||[]).includes(w.id)){r.reviewed=r.reviewed||[];r.reviewed.push(w.id);r.requeue=true;}record('words',w.id,false);luluCommitFeedback(r,{key:w.id+':wrong',correct:0});}
 else{r.final=false;r.checked=false;r.feedbackKind='retry';luluCommitFeedback(r,{key:w.id+':retry',correct:0});}
 render();
}
function quiz2RecallAdvance(){const r=state.round;if(!r?.final)return;if(r.requeue){const id=r.ids[r.index];r.ids.splice(r.index,1);r.ids.push(id);if(r.index>=r.ids.length)r.index=0;r.requeue=false;}else r.index++;prepareQuestion();r.attempts=0;r.final=false;r.feedbackKind=null;render();}
function quiz2ActivitySubmit(){const a=state.activity,q=activityCurrent();if(!a||a.final||!q||a.questionId&&a.questionId!==q.id)return;
 const paired=!!q.forms;
 const complete=paired?a.selections?.length===q.forms.length:!!a.selected;
 const results=paired?pairedActivityResults(q,false):null;
 const ok=complete&&(paired?Object.values(results).every(Boolean):a.selected===q.id);
 a.attempts=(a.attempts||0)+1;
 if(ok){a.final=true;a.checked=true;a.result=true;a.formResults=results;a.feedbackKind='correct';a.correct++;luluCommitFeedback(a,{key:q.id+':correct',correct:1});}
 else if(!complete||a.attempts>1){a.final=true;a.checked=true;a.result=false;a.revealed=true;a.formResults=results||(paired?Object.fromEntries(q.forms.map(form=>[form.role,false])):null);a.feedbackKind='wrong';if(!a.missed.includes(q.id))a.missed.push(q.id);if(!complete&&!(a.reviewed||[]).includes(q.id)){a.reviewed=a.reviewed||[];a.reviewed.push(q.id);a.requeue=true;}luluCommitFeedback(a,{key:q.id+':wrong',correct:0});}
 else{a.final=false;a.checked=false;a.result=false;a.formResults=null;a.feedbackKind='retry';luluCommitFeedback(a,{key:q.id+':retry',correct:0});}
 render();
}
function quiz2ActivityAdvance(){const a=state.activity;if(!a?.final)return;if(a.requeue){const id=a.ids[a.index];a.ids.splice(a.index,1);a.ids.push(id);if(a.index>=a.ids.length)a.index=0;a.requeue=false;}else a.index++;a.selected=null;a.checked=false;a.result=false;a.revealed=false;a.final=false;a.feedbackKind=null;a.attempts=0;a.luluFeedback=null;a.formResults=null;a.selections=[];prepareActivity();render();}
document.addEventListener('click',event=>{
 const t=event.target.closest('[data-quiz2]');if(!t||t.disabled)return;
 event.stopPropagation();event.preventDefault();
 const kind=t.dataset.quiz2,r=state.round;
 if(kind==='method'){const method=t.dataset.quiz2Method;if(!['vocab','rebuild','recall','questions','particles'].includes(method))return;state.quiz2Method=method;save();render();const chip=document.querySelector(`[data-quiz2-method="${method}"]`);if(chip){focusFilterChip(chip);chip.focus({preventScroll:true});revealFilterChip(chip);}return;}
 if(kind==='category'){quiz2ToggleCategory(t.dataset.quiz2Category);save();render();const chip=document.querySelector(`[data-quiz2-category="${t.dataset.quiz2Category}"]`);if(chip){focusFilterChip(chip);chip.focus({preventScroll:true});revealFilterChip(chip);}return;}
 if(kind==='start'){startQuiz2(state.quiz2Method||'questions');return;} if(['adaptive','matching','kanji','rebuild','recall'].includes(kind)&&quiz2Mode()==='vocab'){const words=quiz2VocabWords();if(!words.length)return;state.quiz2Method='vocab';state.learningReturn='quiz2';if(kind==='adaptive')vocabStartAdaptive(words,'quiz2');else if(kind==='matching')vocabStartIndependent('match',words,'quiz2');else if(kind==='kanji')vocabStartIndependent('kanji',words.filter(w=>vocabEligibleKanji(w).length),'quiz2');else vocabStartIndependent(kind,words,'quiz2');return;}
 if(kind==='retry'&&r?.mode==='particle'){startParticle(r.missed);return;}
 if(['tile','return','clear'].includes(kind)&&r?.mode==='quiz2-rebuild'){quiz2RebuildEdit(kind,Number(t.dataset.quiz2Index));return;}
 if(kind==='blank'&&r&&!r.checked){r.active=Number(t.dataset.quiz2Index);render();return;}
 if(kind==='option'&&r&&!r.checked){r.blanks[r.active]=t.dataset.quiz2Particle;const next=r.blanks.findIndex(v=>!v);if(next>=0)r.active=next;render();return;}
 if(kind==='skip'&&r?.mode==='quiz2-rebuild'){quiz2RebuildSkip();return;}
 if(kind==='resume'&&r?.mode==='quiz2-rebuild'&&r.hold){r.skipNote=false;prepareQuiz2Rebuild();render();window.scrollTo({top:0,behavior:'auto'});return;}
 if(kind==='check'){if(r?.mode==='quiz2-rebuild')quiz2RebuildCheck();else quiz2Check();return;}
 if(kind==='next'&&r?.final){if(r.mode==='quiz2-rebuild'){quiz2RebuildAdvance();return;}quiz2ParticleAdvance();return;}
},true);
Object.assign(ZH_HANT,{
 'Quiz 2 Revision':'測驗二溫習',
 'Revise Chapters 3 and 4 vocabulary, question words and particles.':'溫習第 3 及第 4 課的詞彙、疑問詞及助詞。',
 'Vocab':'詞彙',
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
 'Done':'完成',
 'Skip':'略過',
 "Skipped — we'll ask again later.":'已略過——稍後再問。',
 'Try again':'再試一次',
 'Submit':'提交',
 'Not quite. Check again.':'未完全正確，請再檢查。',
 'Wrong':'答錯了'
});

if(typeof document!=='undefined'&&typeof document.getElementById==='function'&&document.getElementById('app')?.childElementCount)render();
