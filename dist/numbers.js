'use strict';
// Number practice has its own database. Generated combinations carry no chapter
// unless the complete value occurs in the existing words, tables or lessons.
const NUMBER_TYPES=[['whole','Whole numbers','整數'],['dates','Dates','日期'],['fractions','Fractions','分數'],['ages','Ages','年齡'],['floors','Floors','樓層'],['clock','Clock times','時刻'],['weekdays','Weekdays','星期'],['money','Money','金額'],['relative','Relative time','相對時間'],['decimals','Decimals','小數']];
const NUMBER_DIGITS=['ぜろ','いち','に','さん','よん','ご','ろく','なな','はち','きゅう'];
function integerReading(value){
 if(!Number.isSafeInteger(value)||value<0||value>99999999)throw RangeError('Integer outside verified range');
 if(value===0)return NUMBER_DIGITS[0];
 if(value>=10000){const high=Math.floor(value/10000),low=value%10000;return integerReading(high)+'まん'+(low?integerReading(low):'');}
 let rest=value,result='';
 for(const unit of [1000,100,10]){const digit=Math.floor(rest/unit);rest%=unit;if(!digit)continue;
  result+=unit===10?(digit===1?'じゅう':NUMBER_DIGITS[digit]+'じゅう'):NUMBER_READINGS[digit*unit];
 }
 return result+(rest?NUMBER_DIGITS[rest]:'');
}
const numericBase=n=>n?integerReading(n):'';
function ageReading(n){if(!Number.isInteger(n)||n<1||n>100)throw RangeError('Age');if(n===20)return 'はたち';const last=n%10,prefix=numericBase(n-last);return last===1?prefix+'いっさい':last===8?prefix+'はっさい':last===0?integerReading(n).replace(/じゅう$/,'じゅっ')+'さい':integerReading(n)+'さい';}
function floorReading(n){if(!Number.isInteger(n)||n<1||n>30)throw RangeError('Floor');if(n%10===0)return integerReading(n).replace(/じゅう$/,'じゅっ')+'かい';if(n<=10)return FLOOR_READINGS[n-1];const last=n%10,prefix=numericBase(n-last);return prefix+(last?FLOOR_READINGS[last-1]:'').replace(/^$/,'かい');}
// Multiples of ten use the contracted counter ending, e.g. 20F にじゅっかい.
function floorNumberReading(n){return n%10===0?integerReading(n).replace(/じゅう$/,'じゅっ')+'かい':floorReading(n);}
function minuteReading(n){if(!Number.isInteger(n)||n<1||n>59)throw RangeError('Minute');const last=n%10,prefix=numericBase(n-last);return last?prefix+MINUTE_READINGS[last]:integerReading(n).replace(/じゅう$/,'じゅっ')+'ぷん';}
const MONTH_READINGS=['いちがつ','にがつ','さんがつ','しがつ','ごがつ','ろくがつ','しちがつ','はちがつ','くがつ','じゅうがつ','じゅういちがつ','じゅうにがつ'];
const DATE_READINGS={1:'ついたち',2:'ふつか',3:'みっか',4:'よっか',5:'いつか',6:'むいか',7:'なのか',8:'ようか',9:'ここのか',10:'とおか',14:'じゅうよっか',17:'じゅうしちにち',19:'じゅうくにち',27:'にじゅうしちにち',29:'にじゅうくにち',20:'はつか',24:'にじゅうよっか'};
// CSV date readings are authoritative; no translations or Vocabulary fields change.
for(const w of WORDS){const m=w.c.match(/^(\d+)日$/u);if(m&&w.kana)DATE_READINGS[Number(m[1])]=w.kana;}
function dateReading(month,day){const max=[31,28,31,30,31,30,31,31,30,31,30,31][month-1];if(!max||!Number.isInteger(day)||day<1||day>max)throw RangeError('Date');return MONTH_READINGS[month-1]+(DATE_READINGS[day]||integerReading(day)+'にち');}
function fractionReading(numerator,denominator){if(!Number.isInteger(numerator)||numerator<1||!Number.isInteger(denominator)||denominator<1)throw RangeError('Fraction');return integerReading(denominator)+'ぶんの'+integerReading(numerator);}
function decimalReading(value){if(!/^(0|[1-9]\d*)\.\d{1,6}$/u.test(value))throw RangeError('Decimal');const [whole,digits]=value.split('.');return (whole==='0'?'れい':integerReading(Number(whole)))+'てん'+[...digits].map(n=>NUMBER_DIGITS[Number(n)]).join('');}
function clockReading(hour,minute,period){if(!Number.isInteger(hour)||hour<1||hour>12||!Number.isInteger(minute)||minute<0||minute>59||!['AM','PM'].includes(period))throw RangeError('Clock');return (period==='AM'?'ごぜん':'ごご')+(hour===12?'れいじ':HOUR_READINGS[hour-1])+(minute?minuteReading(minute):'');}
const NUMBER_RULES=[
 {id:'integer',range:'0–99,999,999',sources:['3-34','3-35','3-36'],chapters:[]},
 {id:'date',sources:WORDS.filter(w=>/^\d+日$/u.test(w.c)).map(w=>w.id),chapters:[]},
 {id:'fraction',formula:'denominator + ぶんの + numerator',sources:[],chapters:[]},
 {id:'decimal',formula:'whole + てん + each displayed digit',sources:[],chapters:[]},
 {id:'age',sources:['1-18'],chapters:[]},{id:'floor',sources:['3-30a','3-30b'],chapters:[]},
 {id:'clock',sources:['4-13','4-14a','4-14b','4-18','4-19'],chapters:[]},
 {id:'week-offset',formula:'number + しゅうかん + まえ / ご (with 1-week contraction)',sources:[],chapters:[]}
];
const NUMBER_QUESTIONS=[];
function addNumberQuestion(type,value,kana,sourceIds=[],chapters=[]){
 const id=`number-${type}-${JSON.stringify(value)}`,existing=NUMBER_QUESTIONS.find(q=>q.id===id);
 if(existing){existing.sourceIds=[...new Set([...existing.sourceIds,...sourceIds])];existing.chapters=[...new Set([...existing.chapters,...chapters])].sort();return existing;}
 const q={id,type,value,kana,sourceIds,chapters:[...new Set(chapters)].sort()};NUMBER_QUESTIONS.push(q);return q;
}
function numberSource(type,value,kana,word){return addNumberQuestion(type,value,kana,[word.id],wordChapters(word));}
// Reuse exact numerical tables and complete values from existing lesson scenes.
for(const [value,kana] of Object.entries(NUMBER_READINGS))addNumberQuestion('whole',Number(value),kana,['3-34','3-35','3-36'],[3]);
FLOOR_READINGS.forEach((kana,i)=>addNumberQuestion('floors',i+1,kana,['3-30a','3-30b'],[3]));
for(const q of CHAPTER_DIALOGUES){const v=q.visual;if(!v)continue;if(v.type==='clock'&&q.originalCategory==='time')for(const period of v.period?[v.period]:[]){addNumberQuestion('clock',[v.hour,v.minute,period],clockReading(v.hour,v.minute,period),[q.word],[q.ch]);}if(v.type==='product'&&v.price)addNumberQuestion('money',v.price,integerReading(v.price)+'えん',[q.word],[q.ch]);}
for(const w of WORDS){const match=w.c.match(/^([月火水木金土日])曜日$/u);if(match&&w.kana)numberSource('weekdays','月火水木金土日'.indexOf(match[1])+1,w.kana,w);}
// Existing age examples: 9歳 in p7 and じゅうはっさい in the age conversations.
addNumberQuestion('ages',9,ageReading(9),['1-18'],[1]);addNumberQuestion('ages',18,ageReading(18),['1-19a','1-19b'],[1]);
// Rule-derived combinations are deliberately unassigned to chapters.
const wholeValues=[...Array.from({length:40},(_,i)=>i),42,55,64,70,77,88,99,101,125,215,333,468,600,800,999,1001,1250,3333,8008,10001,98765,8750000,10000000,99999999];
wholeValues.forEach(n=>addNumberQuestion('whole',n,integerReading(n)));
for(let month=1;month<=12;month++)for(let day=1;day<=(month===4?30:28);day++)if(month===4||[1,4,7,14,20,24,28].includes(day))addNumberQuestion('dates',[month,day],dateReading(month,day));
for(const denominator of [2,3,4,8,10,100])for(const numerator of [1,2,3,5,15])addNumberQuestion('fractions',[numerator,denominator],fractionReading(numerator,denominator));
for(let n=1;n<=40;n++)addNumberQuestion('ages',n,ageReading(n));
for(const n of [48,60,80,88,99,100])addNumberQuestion('ages',n,ageReading(n));
for(let n=1;n<=30;n++)addNumberQuestion('floors',n,floorNumberReading(n));
for(let hour=1;hour<=12;hour++)for(const minute of [0,8,15,30,45])for(const period of ['AM','PM'])addNumberQuestion('clock',[hour,minute,period],clockReading(hour,minute,period));
for(const minute of [1,4,6,10,59])addNumberQuestion('clock',[6,minute,'AM'],clockReading(6,minute,'AM'));
for(const n of [...Object.keys(NUMBER_READINGS).map(Number),1500,2500,9800,12345,123456,8750000,10000000])addNumberQuestion('money',n,integerReading(n)+'えん');
const relativeWords=[['おととい','day',-2],['きのう','day',-1],['きょう','day',0],['あした','day',1],['あさって','day',2],['先週','week',-1],['今週','week',0],['来週','week',1],['先月','month',-1],['今月','month',0],['来月','month',1],['去年','year',-1],['ことし','year',0],['来年','year',1]];
for(const [form,unit,offset] of relativeWords){const w=WORDS.find(w=>w.c===form||w.kana===form);if(w?.kana)numberSource('relative',[unit,offset],w.kana,w);}
for(const offset of [-4,-3,-2,2,3,4])addNumberQuestion('relative',['week',offset],integerReading(Math.abs(offset))+'しゅうかん'+(offset<0?'まえ':'ご'));
for(const whole of [0,1,2,3,10,12])for(const digits of ['05','30','368','007','101']){const value=`${whole}.${digits}`;addNumberQuestion('decimals',value,decimalReading(value));}
function numberTypeLabel(type){const row=NUMBER_TYPES.find(t=>t[0]===type);return row?.[state.language==='zh-Hant'?2:1]||'All';}
function numberSelection(){
 if(!['all',...NUMBER_TYPES.map(t=>t[0])].includes(state.numberType))state.numberType='all';
 const typed=NUMBER_QUESTIONS.filter(q=>state.numberType==='all'||q.type===state.numberType);
 const available=[...new Set(typed.flatMap(q=>q.chapters))].sort();
 if(!['all',...(typed.some(q=>!q.chapters.length)?['general']:[]),...available.map(String)].includes(state.numberChapter))state.numberChapter='all';
 const items=typed.filter(q=>state.numberChapter==='all'||(state.numberChapter==='general'?!q.chapters.length:q.chapters.includes(Number(state.numberChapter))));
 return {items,available,general:typed.some(q=>!q.chapters.length)};
}
function numberMenu(){
 const set=numberSelection(),chips=(entries,attribute,selected)=>entries.map(([id,label])=>`<button class="dialogue-chip${id===selected?' selected':''}" data-${attribute}="${id}" aria-pressed="${id===selected}">${esc(label)}</button>`).join('');
 const chapters=[['all','All chapters'],...(set.general?[['general','General practice']]:[]),...set.available.map(ch=>[String(ch),chapterLabel(ch)])];
 return `<section class="study-wrap dialogue-selector number-selector"><div class="dialogue-intro"><h1>Number Matching</h1><p>Match the expression with its hiragana reading.</p></div><div class="field-label">Expression type</div><div class="dialogue-chip-row number-type-row" role="group" aria-label="Expression type">${chips([['all','All'],...NUMBER_TYPES.map(t=>[t[0],numberTypeLabel(t[0])])],'number-type',state.numberType)}</div><div class="field-label">Chapter</div><div class="dialogue-chip-row number-chapter-row" data-chip-group="${state.numberType}" role="group" aria-label="Chapter">${chips(chapters,'number-chapter',state.numberChapter)}</div><p class="small muted">Generated combinations without chapter references appear in General practice.</p><p class="small muted">${set.items.length} forms</p><div class="card-actions">${button('Start matching','numberStart','primary',set.items.length?'':'disabled')}</div></section>`;
}
function startNumberMatching(ids=null){const selection=numberSelection(),items=selection.items;const chosen=ids?.filter(id=>items.some(q=>q.id===id));if(!items.length)return;rememberPage();state.numberRound={ids:chosen?.length?chosen:shuffle(items.map(q=>q.id)),index:0,correct:0,missed:[],checked:false,selected:null};state.view='number-game';prepareNumberMatching();render();window.scrollTo({top:0,behavior:'auto'});}
function numberCurrent(){const r=state.numberRound;return r&&NUMBER_QUESTIONS.find(q=>q.id===r.ids[r.index]);}
function numberDistractorDistance(q,c){
 const a=q.value,b=c.value;
 if(['whole','money','ages','floors'].includes(q.type))return Math.abs(a-b)/Math.max(a,1);
 if(q.type==='dates')return (a[0]===b[0]?0:3)+Math.abs(a[1]-b[1])/31;
 if(q.type==='fractions')return (a[1]===b[1]?0:3)+Math.abs(a[0]-b[0])/Math.max(a[1],1);
 if(q.type==='clock')return Math.abs(a[0]-b[0])*4+Math.abs(a[1]-b[1])/10+(a[2]===b[2]?0:1);
 if(q.type==='relative')return (a[0]===b[0]?0:5)+Math.abs(a[1]-b[1]);
 if(q.type==='decimals')return Math.abs(Number(a)-Number(b))+(a.split('.')[1].length===b.split('.')[1].length?0:3);
 return Math.abs(a-b);
}
function prepareNumberMatching(){const r=state.numberRound,q=numberCurrent();if(!q)return;r.checked=false;r.selected=null;r.result=false;const seen=new Set([q.kana]);const candidates=shuffle(NUMBER_QUESTIONS.filter(x=>x.type===q.type&&x.id!==q.id)).sort((a,b)=>numberDistractorDistance(q,a)-numberDistractorDistance(q,b));r.choices=shuffle([q,...candidates.filter(x=>{if(seen.has(x.kana))return false;seen.add(x.kana);return true;}).slice(0,3)]);}
function checkNumberMatching(id){const r=state.numberRound,q=numberCurrent();if(!q||r.checked||!r.choices.some(c=>c.id===id))return;r.selected=id;r.result=id===q.id;r.checked=true;if(r.result)r.correct++;else if(!r.missed.includes(q.id))r.missed.push(q.id);record('numberMatching',q.id,r.result);render();}
function relativeLabel(value){const [unit,offset]=value,zh=state.language==='zh-Hant';if(unit==='day'&&Math.abs(offset)<=2)return (zh?{'-2':'前天','-1':'昨天','0':'今天','1':'明天','2':'後天'}:{'-2':'The day before yesterday','-1':'Yesterday','0':'Today','1':'Tomorrow','2':'The day after tomorrow'})[offset];if(unit!=='day'&&Math.abs(offset)===1)return zh?({week:offset<0?'上週':'下週',month:offset<0?'上個月':'下個月',year:offset<0?'去年':'明年'})[unit]:`${offset<0?'Last':'Next'} ${unit}`;if(!offset)return zh?({day:'今天',week:'本週',month:'本月',year:'今年'})[unit]:({day:'Today',week:'This week',month:'This month',year:'This year'})[unit];const n=Math.abs(offset);return zh?`${n}${({day:'天',week:'週',month:'個月',year:'年'})[unit]}${offset<0?'前':'後'}`:offset<0?`${n} ${unit}${n===1?'':'s'} ago`:`In ${n} ${unit}${n===1?'':'s'}`;}
const NUMBER_MONTH_NAMES=['January','February','March','April','May','June','July','August','September','October','November','December'];
function numberPrompt(q){
 const v=q.value,zh=state.language==='zh-Hant',label=numberTypeLabel(q.type),number=n=>n.toLocaleString('en-US');let visual='';
 if(q.type==='whole'||q.type==='decimals')visual=`<strong class="number-value">${esc(q.type==='whole'?number(v):v)}</strong>`;
 if(q.type==='dates'){const [month,day]=v;visual=`<div class="number-calendar"><span>${zh?`${month}月`:NUMBER_MONTH_NAMES[month-1]}</span><strong>${day}</strong><span>${zh?'日':'Day'}</span></div>`;}
 if(q.type==='fractions')visual=`<div class="number-fraction" aria-label="${esc(zh?`${v[0]} 分子，${v[1]} 分母`:`Numerator ${v[0]}, denominator ${v[1]}`)}"><span>${number(v[0])}</span><span>${number(v[1])}</span></div>`;
 if(q.type==='ages')visual=`<div class="number-age">${icon('people')}<strong class="number-value">${v}<small>${zh?'歲':' years old'}</small></strong></div>`;
 if(q.type==='floors')visual=`<div class="number-floor"><span aria-hidden="true">↑ ↓</span><strong class="number-value">${v}F</strong><span>${zh?'樓層':'Floor'}</span></div>`;
 if(q.type==='clock')visual=`<div class="number-clock"><strong class="number-value">${v[0]}:${String(v[1]).padStart(2,'0')}</strong><span>${v[2]}${zh?(v[2]==='AM'?' · 上午':' · 下午'):''}</span></div>`;
 if(q.type==='weekdays')visual=`<div class="number-week"><span class="number-week-label">${zh?'星期':'Weekday'}</span><div>${(zh?['一','二','三','四','五','六','日']:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']).map((d,i)=>`<span ${i+1===v?'aria-current="date" class="active"':''}>${d}</span>`).join('')}</div><strong>${(zh?['星期一','星期二','星期三','星期四','星期五','星期六','星期日']:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'])[v-1]}</strong></div>`;
 if(q.type==='money')visual=`<div class="number-price"><strong class="number-value">¥${number(v)}</strong><span>${zh?'日圓（JPY）':'Japanese yen (JPY)'}</span></div>`;
 if(q.type==='relative'&&v[0]==='day'&&v[1]===0)visual=`<div class="number-timeline"><div class="timeline-point target">${zh?'今天':'Today'}</div></div>`;
 else if(q.type==='relative'){const before=v[1]<0;visual=`<div class="number-timeline"><div class="timeline-point ${before?'target':''}">${before?esc(relativeLabel(v)):(zh?'今天':'Today')}</div><span class="timeline-track" aria-hidden="true"></span><div class="timeline-point ${before?'':'target'}">${before?(zh?'今天':'Today'):esc(relativeLabel(v))}</div></div>`;}
 return `<figure class="number-prompt number-prompt-${q.type}"><figcaption>${esc(q.type==='fractions'?translateText('Fraction'):label)}</figcaption>${visual}</figure>`;
}
function numberGame(){const r=state.numberRound;if(!r)return numberMenu();if(r.index>=r.ids.length)return header('Round complete.','Give yourself another chance with the items you missed.')+`<section class="study-wrap paper result-center"><div class="result-score">${r.correct}<small> / ${r.ids.length}</small></div><div class="card-actions">${r.missed.length?button('Practise missed items','numberRetry','coral'):''}${button('New round','numberStart','primary')}${button('Go back','gameBack','ghost')}</div></section>`;
 const q=numberCurrent();return `<section class="study-wrap number-exercise"><h1 class="sr-only">Number Matching</h1>${numberPrompt(q)}<div class="options activity-options">${r.choices.map((c,i)=>`<button class="option jp ${r.checked&&c.id===q.id?'correct':r.checked&&c.id===r.selected?'wrong':''}" lang="ja" data-number-choice="${esc(c.id)}" ${r.checked?'disabled':''}><span class="number">${i+1}</span><span>${esc(c.kana)}</span>${r.checked&&c.id===q.id?'<span class="option-state">✓ Correct</span>':r.checked&&c.id===r.selected?'<span class="option-state">✕ Your choice</span>':''}</button>`).join('')}</div>${r.checked?`<div class="reply-feedback ${r.result?'correct':'wrong'}" role="status"><span class="feedback-lulu ${r.result?'happy':'encouraging'}" aria-hidden="true"></span><div class="feedback-copy"><strong>${r.result?'Correct!':'The correct answer is:'}</strong><p class="jp" lang="ja">${esc(q.kana)}</p></div></div><div class="card-actions">${button('Next '+icon('arrow'),'numberNext','primary')}</div>`:''}</section>`;
}
function numberClick(d){if(d.numberType){state.numberType=d.numberType;state.numberChapter='all';numberSelection();save();render();return true;}if(d.numberChapter){state.numberChapter=d.numberChapter;numberSelection();save();render();return true;}if(d.numberChoice){checkNumberMatching(d.numberChoice);return true;}if(!d.action?.startsWith('number'))return false;if(d.action==='numberStart')startNumberMatching();else if(d.action==='numberNext'&&state.numberRound?.checked){state.numberRound.index++;prepareNumberMatching();render();}else if(d.action==='numberRetry')startNumberMatching(state.numberRound.missed);return true;}
