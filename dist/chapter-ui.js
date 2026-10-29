'use strict';
Object.assign(ZH_HANT,CHAPTER_TRANSLATIONS,{
 'Chapter 1':'第 1 課','Chapter 2':'第 2 課','Chapter 3':'第 3 課','Chapter 4':'第 4 課',
 'Chapters 1–6':'第 1–6 課','All chapters':'全部課次','4 chapters':'4 課',
 'Choose a chapter.':'選擇課次。','Study vocabulary from Chapters 1–6.':'溫習第 1 至 6 課的詞彙。',
 'Textbook Chapters 1–4 · Mock: Chapters 1–2':'課本第 1–4 課 · 模擬測驗：第 1–2 課',
 'Number & counter readings':'數字與量詞讀音','Hours':'時刻','Minutes':'分鐘','Floors':'樓層','Large numbers':'較大數字',
 'Speaker':'說話者','Today':'今天','Practice timetable':'練習時間表',
 'Choose a mode to practise vocabulary and sentence patterns from Chapters 1–4.':'選擇模式，溫習第 1 至 4 課的詞彙及句型。',
 'Choose a chapter from 1 to 4.':'選擇第 1 至 4 課。',
 'Recall every vocabulary form.':'回想所有詞彙。','Draw all taught kanji forms.':'練習所有已學漢字。',
 'All sentence groups':'全部句型',
 'Sentence Rebuild and the timed mock retain their Chapter 1–2 assessment scope.':'句子重組及計時模擬測驗維持第1至2課的評核範圍。',
 'Vocabulary Recall, Vocabulary Rebuild, Dialogue Matching and Dialogue Rebuild use your selected chapter or category.':'詞彙回想、詞彙重組、對話配對及對話重組使用你選擇的課次或分類。',
 'The mock remains limited to Chapters 1–2. Listening recordings and transcripts were not supplied, so no listening answers are invented.':'模擬測驗只涵蓋第1至2課。未提供聆聽錄音或逐字稿，因此不補寫聆聽答案。',
});
function lessonScene(q){
 const v=q.visual;if(!v)return '';const zh=state.language==='zh-Hant';let content='';
 const pig=`<svg class="lesson-lulu" viewBox="0 0 120 120" aria-hidden="true">${luluPiggy(60,60,1,'point')}</svg>`;
 if(v.type==='clock'){
   const minuteAngle=v.minute*6,hourAngle=(v.hour%12)*30+v.minute*.5;
   const hour=String(v.hour).padStart(2,'0'),minute=String(v.minute).padStart(2,'0');
   content=`<svg class="lesson-clock" viewBox="0 0 200 200" role="img" aria-label="${hour}:${minute}${v.period?' '+v.period:''}" data-hour="${v.hour}" data-minute="${v.minute}"><circle cx="100" cy="100" r="91" fill="var(--md-surface)" stroke="var(--md-primary)" stroke-width="3"/>${Array.from({length:12},(_,i)=>{const n=i+1,angle=n*Math.PI/6;return `<text x="${100+73*Math.sin(angle)}" y="${106-73*Math.cos(angle)}" text-anchor="middle" font-size="16" fill="currentColor">${n}</text>`;}).join('')}<line data-hand="hour" x1="100" y1="100" x2="100" y2="53" transform="rotate(${hourAngle} 100 100)" stroke="var(--md-primary)" stroke-width="7" stroke-linecap="round"/><line data-hand="minute" x1="100" y1="100" x2="100" y2="33" transform="rotate(${minuteAngle} 100 100)" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="100" r="5" fill="var(--md-primary)"/></svg><div class="lesson-digital">${v.period?`<span>${v.period}</span>`:''}<strong>${hour}:${minute}</strong></div>`;
 }else if(v.type==='location'){
   const x=v.location==='speaker'?100:v.location==='listener'?400:250,y=v.location==='far'?24:125;
   content=`<svg class="lesson-location" viewBox="0 0 500 300" role="img" aria-label="${esc(q.scene)}" data-place-location="${v.location}"><rect width="500" height="300" rx="20" fill="var(--md-surface)"/><rect x="${x-62}" y="${y}" width="124" height="48" rx="9" fill="var(--md-secondary-container)"/><text x="${x}" y="${y+32}" text-anchor="middle" font-size="24" fill="currentColor">${esc(v.label)}</text><path d="M85 210 Q${x} 180 ${x} ${y+50}" fill="none" stroke="var(--md-primary)" stroke-width="3" stroke-dasharray="6 7"/>${luluScenePerson(85,222,1.1,'speaker','point')}${luluScenePerson(415,222,1.1,'listener','speaking')}<text x="85" y="287" text-anchor="middle" font-size="21" fill="currentColor">${zh?'你 · 說話者':'You · Speaker'}</text><text x="415" y="287" text-anchor="middle" font-size="21" fill="currentColor">${zh?'聽者':'Listener'}</text></svg>`;
 }else if(v.type==='calendar'){
   content=`<div class="lesson-calendar"><strong>${zh?'今天':'Today'}</strong><div class="lesson-week">${['月','火','水','木','金','土','日'].map((d,i)=>`<span class="${i+1===v.day?'today':''}" ${i+1===v.day?'aria-current="date"':''}>${d}</span>`).join('')}</div></div>`;
 }else if(v.type==='floors'||v.type==='schedule'){
   content=`<div class="lesson-timetable"><strong>${esc(v.title||(zh?'樓層指南':'Floor guide'))}</strong><table aria-label="${esc(v.title||'Floors')}"><tbody>${v.rows.map(([a,b])=>`<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join('')}</tbody></table></div>`;
 }else if(v.type==='product'){
   content=`<div class="lesson-product"><span class="lesson-product-symbol" aria-hidden="true">${luluObject(v.name==='ワイン'?'wine':v.name==='コーヒー'?'coffee':'tie',0,0,96)}</span><strong lang="ja">${esc(v.name)}</strong>${v.origin?`<span lang="ja">${esc(v.origin)}</span>`:''}<span class="lesson-price" data-price="${v.price}">¥${v.price.toLocaleString('en-US')}</span></div>`;
 }else if(v.type==='phone'){
   content=`<div class="lesson-phone"><span aria-hidden="true">${luluObject('phone',0,0,64)}</span><strong>${esc(v.number)}</strong></div>`;
 }else content=`<div class="lesson-fact"><span lang="ja">${esc(v.heading)}</span><strong lang="ja">${esc(v.value)}</strong></div>`;
 return `<figure class="lesson-scene lesson-scene-${v.type}">${v.type==='location'?'':pig}${content}</figure>`;
}
function lessonNotes(q){return state.language==='zh-Hant'?q.whyZh:q.why;}
function lessonConversationCard(q){
 const zh=state.language==='zh-Hant';
 const turns=q.turns.map(([speaker,ja,en,cn])=>`<div class="conversation-turn ${speaker}">${conversationPig(speaker,'speaking')}<div class="conversation-bubble"><span class="dialogue-role">${conversationSpeaker(q,speaker)}</span><p class="jp" lang="ja">${speaker==='you'?expressionDialogueText(ja,q):esc(ja)}</p><p class="conversation-translation">${esc(zh?cn:en)}</p></div></div>`).join('');
 return `<article class="paper guide-card conversation-card" data-dialogue-guide="${q.id}">${lessonScene(q)}<div class="guide-card-body"><div class="conversation-stage" aria-label="Conversation">${turns}</div><p class="conversation-notes muted">${esc(lessonNotes(q))}</p>${lessonReadingGuide(q)}${dialogueExamples(q)}</div></article>`;
}
function lessonReadingGuide(q){
 if(!['numbers','time'].includes(q.originalCategory||q.category))return '';
 const tables=q.ch===3?[['Floors',FLOOR_READINGS.map((r,i)=>[`${i+1}F`,r])],['Large numbers',Object.entries(NUMBER_READINGS)]]:[['Hours',HOUR_READINGS.map((r,i)=>[`${i+1}:00`,r])],['Minutes',Object.entries(MINUTE_READINGS)]];
 return `<details class="lesson-readings"><summary>Number &amp; counter readings</summary>${tables.map(([label,rows])=>`<h3>${label}</h3><div class="reading-grid">${rows.map(([n,r])=>`<div><strong>${esc(n)}</strong><span class="jp" lang="ja">${esc(r)}${READING_ALTERNATIVES[r]?` / ${READING_ALTERNATIVES[r].map(esc).join(' / ')}`:''}</span></div>`).join('')}</div>`).join('')}</details>`;
}
// Add clear visual identities without rendering any Japanese answer in Recall artwork.
const CHAPTER_CATEGORY_ICONS={places:'🏢',locations:'📍',numbers:'🔢',activities:'📖',time:'🕒',days:'📅',schedules:'🗓️',geography:'🌏',nationality:'🌏',objects:'📦',food:'🍷',courtesy:'💬',replies:'💬'};
WORDS.filter(w=>w.ch>=3).forEach(w=>{VOCAB_VISUALS[w.id]=CHAPTER_CATEGORY_ICONS[vocabularySection(w)]||'📚';});
Object.assign(VOCAB_VISUALS,{'3-09':'🏫','3-10':'🍽️','3-12':'🪑','3-16a':'🚻','3-16b':'🚻','3-17':'🪜','3-18':'🛗','3-20':'🥤','3-21':'☎️','3-24':'🏠','3-25':'👞','3-26':'👔','4-01':'🌅','4-02':'🛏️','4-03':'💼','4-04':'🌿','4-05':'📚','4-06':'🏁','4-08':'🏦','4-09':'📮','4-10':'📚','4-11':'🖼️'});
