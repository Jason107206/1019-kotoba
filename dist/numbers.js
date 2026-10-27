'use strict';
// Number content and both games share one bank and database-backed curriculum scopes.
const NUMBER_TYPES=[['ones','Ones','個位數'],['tens','Tens','十位數'],['hundreds','Hundreds','百位數'],['thousands','Thousands','千位數'],['dates','Dates','日期'],['fractions','Fractions','分數'],['ages','Ages','年齡'],['floors','Floors','樓層'],['clock','Clock times','時刻'],['weekdays','Weekdays','星期'],['money','Money','金額'],['relative','Relative time','相對時間'],['decimals','Decimals','小數']];
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
// Add varied values; database-backed chapter rules resolve their scopes below.
const wholeValues=[...Array.from({length:40},(_,i)=>i),42,55,64,70,77,88,99,101,125,215,333,468,600,800,999,1001,1250,3333,8008];
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
// Keep whole-number IDs and reading rules stable; browsing uses place-value groups.
function numberCategory(q){return q.type==='whole'?(q.value<10?'ones':q.value<100?'tens':q.value<1000?'hundreds':'thousands'):q.type;}
function numberTypeLabel(type){const row=NUMBER_TYPES.find(t=>t[0]===type);return row?.[state.language==='zh-Hant'?2:1]||'All';}
// Chapter rules require actual source records with a common chapter membership.
// A source example and a curriculum-derived membership retain separate provenance.
const NUMBER_CHAPTER_SCOPES=[];
function numberChapterRule(id,type,sourceIds,supports){
 const words=sourceIds.map(id=>WORDS.find(w=>w.id===id));if(!words.length||words.some(w=>!w))return;
 const chapters=wordChapters(words[0]).filter(ch=>words.every(w=>wordChapters(w).includes(ch)));
 if(!chapters.length)return;
 const rule={id,type,sourceIds,chapters};NUMBER_CHAPTER_SCOPES.push(rule);
 for(const q of NUMBER_QUESTIONS)if(q.type===type&&supports(q.value)){
  q.chapters=[...new Set([...q.chapters,...chapters])].sort();q.chapterRules=[...(q.chapterRules||[]),id];
 }
}
numberChapterRule('age-counter','ages',['1-18','1-19a'],n=>n>=1&&n<=99);
numberChapterRule('cardinal-units','whole',['3-34','3-35','3-36'],n=>n>=1&&n<=99999999);
numberChapterRule('floor-counter','floors',['3-30a','3-30b'],n=>n>=1&&n<=30);
numberChapterRule('yen-prices','money',['3-32','3-34','3-35','3-36'],n=>n>=1&&n<=99999999);
numberChapterRule('clock-counters','clock',['4-13','4-14a','4-14b','4-18','4-19'],v=>v[0]>=1&&v[0]<=12&&v[1]>=0&&v[1]<=59);
const monthSource=WORDS.find(w=>w.c.replace(/[….～]/gu,'')==='月');
const dateSources=WORDS.filter(w=>/^(1|4|14|20|24)日$/u.test(w.c)&&w.kana);
if(monthSource&&dateSources.length===5)numberChapterRule('calendar-readings','dates',[monthSource.id,...dateSources.map(w=>w.id)],()=>true);

function numberReadings(q){
 const readings=[q.kana,...(q.acceptedReadings||[])];
 for(const [base,alternatives] of Object.entries(READING_ALTERNATIVES))for(const reading of [...readings])if(reading.includes(base))for(const alt of alternatives)readings.push(reading.replace(base,alt));
 if(q.type==='floors'&&q.value===3)readings.push(...(CHAPTER_DIALOGUES.find(x=>x.id==='ch3-floor-answer')?.acceptedReadings||[]));
 return [...new Set(readings.map(rebuildText))];
}
function integerSegments(n){
 if(n===0)return ['ぜろ'];
 if(n>=10000){const high=Math.floor(n/10000),low=n%10000;return [...integerSegments(high),'まん',...(low?integerSegments(low):[])];}
 const result=[];let rest=n;
 for(const unit of [1000,100,10]){const digit=Math.floor(rest/unit);rest%=unit;if(digit)result.push(integerReading(digit*unit));}
 if(rest)result.push(NUMBER_DIGITS[rest]);return result;
}
function counterSegments(n,reading){
 const last=n%10;
 if(last){const prefix=n-last?integerReading(n-last):'',piece=reading.slice(prefix.length),units=prefix?integerSegments(n-last):[];
  if(piece.includes('っ'))return [...units,piece];
  const suffix=['さい','かい','がい','ふん','ぷん'].find(s=>piece.endsWith(s));
  return [...units,...(suffix?[piece.slice(0,-suffix.length),suffix]:[piece])].filter(Boolean);
 }
 // Contracted tens stay with the counter, including accepted じっ variants.
 const marker=reading.match(/じゅっ|じっ/u);return marker?[reading.slice(0,marker.index),reading.slice(marker.index)].filter(Boolean):[...integerSegments(n),reading.slice(integerReading(n).length)].filter(Boolean);
}
function numberSegments(q,reading=q.kana){
 const v=q.value;let units;
 if(q.type==='whole')units=integerSegments(v);
 else if(q.type==='money')units=[...integerSegments(v),'えん'];
 else if(q.type==='dates')units=[MONTH_READINGS[v[0]-1],q.kana.slice(MONTH_READINGS[v[0]-1].length)];
 else if(q.type==='fractions')units=[...integerSegments(v[1]),'ぶんの',...integerSegments(v[0])];
 else if(q.type==='ages')units=v===20?['はたち']:counterSegments(v,q.kana);
 else if(q.type==='floors')units=counterSegments(v,q.kana);
 else if(q.type==='clock')units=[v[2]==='AM'?'ごぜん':'ごご',v[0]===12?'れいじ':HOUR_READINGS[v[0]-1],...(v[1]?counterSegments(v[1],minuteReading(v[1])):[])];
 else if(q.type==='weekdays')units=[q.kana.slice(0,-3),'ようび'];
 else if(q.type==='decimals'){const [whole,digits]=v.split('.');units=[...(whole==='0'?['れい']:integerSegments(Number(whole))),'てん',...[...digits].map(d=>NUMBER_DIGITS[Number(d)])];}
 else if(q.type==='relative'&&q.sourceIds.length)units=[q.kana];
 else if(q.type==='relative')units=[...integerSegments(Math.abs(v[1])),'しゅうかん',v[1]<0?'まえ':'ご'];
 else units=[q.kana];
 units=units.filter(Boolean);
 if(reading===q.kana)return units;
 if(q.type==='floors')return counterSegments(q.value,reading);
 if(q.type==='clock'){const prefix=v[2]==='AM'?'ごぜん':'ごご',hour=v[0]===12?'れいじ':HOUR_READINGS[v[0]-1];return [prefix,hour,...(v[1]?counterSegments(v[1],reading.slice(prefix.length+hour.length)):[])];}
 for(const [base,alternatives] of Object.entries(READING_ALTERNATIVES))for(const alt of alternatives)if(q.kana.replace(base,alt)===reading)return units.map(unit=>unit.replace(base,alt));
 if(q.type==='floors'&&q.value===3&&reading==='さんかい')return ['さんかい'];
 throw Error('Unsegmented accepted number reading');
}
// NFC composes voiced kana; remaining combining marks stay attached to their base.
// Small kana are individual characters in Rebuild, not syllable-sized kanaUnits.
function numberCharacters(text){const chars=[];for(const c of [...rebuildText(text)]){if(/\p{M}/u.test(c)&&chars.length)chars[chars.length-1]+=c;else chars.push(c);}return chars;}
function numberTileBank(q,mode){
 const counts=new Map();for(const reading of numberReadings(q)){const own=new Map();for(const unit of mode==='rebuild'?numberCharacters(reading):numberSegments(q,reading))own.set(unit,(own.get(unit)||0)+1);for(const [unit,count] of own)counts.set(unit,Math.max(count,counts.get(unit)||0));}
 const bank=shuffle([...counts].flatMap(([unit,count])=>Array(count).fill(unit)));
 if(bank.length>1&&bank.join('')===q.kana)bank.push(bank.shift());return bank;
}
function numberSelection(){
 if(!['all','category','chapter'].includes(state.numberBrowse))state.numberBrowse='all';
 if(state.numberType==='whole')state.numberType='ones';
 if(!NUMBER_TYPES.some(t=>t[0]===state.numberType))state.numberType=NUMBER_TYPES[0][0];
 const available=[...new Set(NUMBER_QUESTIONS.flatMap(q=>q.chapters))].sort();
 if(!available.map(String).includes(state.numberChapter))state.numberChapter=String(available[0]);
 const items=NUMBER_QUESTIONS.filter(q=>state.numberBrowse==='all'||(state.numberBrowse==='category'?numberCategory(q)===state.numberType:q.chapters.includes(Number(state.numberChapter)))).sort((a,b)=>NUMBER_TYPES.findIndex(t=>t[0]===numberCategory(a))-NUMBER_TYPES.findIndex(t=>t[0]===numberCategory(b))||(a.type==='whole'&&b.type==='whole'?a.value-b.value:0));
 return {items,available,key:state.numberBrowse==='all'?'all':state.numberBrowse==='category'?`category-${state.numberType}`:`chapter-${state.numberChapter}`,label:state.numberBrowse==='all'?'Numbers':state.numberBrowse==='category'?numberTypeLabel(state.numberType):chapterLabel(state.numberChapter)};
}
const NUMBER_NOTES={
 whole:['Read the large units before the smaller ones. Watch hundred and thousand sound changes.','先讀大單位，再讀小單位。留意百與千的音變。'],
 dates:['Read the month, then the day. Some month and day names have irregular readings.','先讀月份，再讀日期。部分月份與日期有特殊讀音。'],
 fractions:['Read the denominator, then ぶんの, then the numerator. Keep the displayed fraction.','先讀分母，再讀「ぶんの」，最後讀分子。保留畫面上的分數形式。'],
 ages:['Use さい for age; contractions and はたち are important exceptions.','年齡使用「さい」；留意促音及「はたち」等特殊讀法。'],
 floors:['The floor counter changes sound in readings such as いっかい and さんがい.','樓層量詞會音變，例如「いっかい」及「さんがい」。'],
 clock:['Include a.m. or p.m.; hours and minutes have their own counter readings.','讀出上午或下午；時與分各有不同的量詞讀法。'],
 weekdays:['Keep the full ようび ending when naming a weekday.','說星期時要保留完整的「ようび」。'],
 money:['Read the amount in Japanese units, then add えん.','以日語數字單位讀出金額，再加上「えん」。'],
 relative:['Read the highlighted time relative to today.','讀出標示的時間與今天的相對關係。'],
 decimals:['Read てん for the point, then read each digit in order, including zeros.','小數點讀「てん」，之後逐位順序讀出數字，包括零。']
};
function numberNotes(q){return NUMBER_NOTES[q.type][state.language==='zh-Hant'?1:0];}
// Compact study notes are specific to the row; longer guidance remains in feedback.
function numberContentDetail(q){
 const v=q.value,zh=state.language==='zh-Hant';let note='',irregular=false;
 const set=(en,cn,special=false)=>{note=zh?cn:en;irregular=special;};
 if(q.type==='whole'){
  const changes=[300,600,800,3000,8000].filter(n=>integerSegments(v).includes(integerReading(n)));
  if(changes.length)set('Sound change: '+changes.map(n=>integerReading(n)).join(' / '),'音變：'+changes.map(n=>integerReading(n)).join('／'),true);
  else if(v===10000)set('万 = 10,000.','萬：10,000。');
 }
 else if(q.type==='dates'&&([4,7,9].includes(v[0])||[1,2,3,4,5,6,7,8,9,10,14,17,19,20,24,27,29].includes(v[1])))set('Irregular month or day reading.','月份或日期的特殊讀音。',true);
 else if(q.type==='fractions')set('Denominator + ぶんの + numerator.','分母＋ぶんの＋分子。');
 else if(q.type==='ages'&&(v===20||[1,8].includes(v%10)||v%10===0&&v<100))set(v===20?'20 years old: はたち.':'Contracted さい ending.',v===20?'20 歲：はたち。':'さい 前有促音。',true);
 else if(q.type==='floors'&&[0,1,3,6,8].includes(v%10))set('Floor counter sound change.','樓層量詞的音變。',true);
 else if(q.type==='clock'){
  const special=[4,7,9,12].includes(v[0])||v[1]>0&&[0,1,3,4,6,8].includes(v[1]%10);
  if(special)set(v[0]===12?'12 AM / PM uses れいじ.':'Hour or minute counter reading.',v[0]===12?'12 AM／PM 使用 れいじ。':'時或分量詞的特殊讀法。',true);
 }
 else if(q.type==='money')set('Amount + えん (Japanese yen).','金額＋えん（日圓）。');
 else if(q.type==='decimals')set('After てん, read every digit.','てん 後逐位讀出數字。');
 return {note,irregular};
}
function numberTableExpression(q){
 const v=q.value,zh=state.language==='zh-Hant',number=n=>n.toLocaleString('en-US');
 if(q.type==='whole')return number(v);
 if(q.type==='decimals')return v;
 if(q.type==='dates')return zh?`${v[0]}月${v[1]}日`:`${NUMBER_MONTH_NAMES[v[0]-1]} ${v[1]}`;
 if(q.type==='fractions')return `<span class="number-table-fraction" aria-label="${esc(zh?`${v[0]} 分子，${v[1]} 分母`:`Numerator ${v[0]}, denominator ${v[1]}`)}"><span>${number(v[0])}</span><span>${number(v[1])}</span></span>`;
 if(q.type==='ages')return zh?`${v}歲`:`${v} years old`;
 if(q.type==='floors')return `${v}F`;
 if(q.type==='clock')return `${v[0]}:${String(v[1]).padStart(2,'0')} ${v[2]}${zh?(v[2]==='AM'?'（上午）':'（下午）'):''}`;
 if(q.type==='weekdays')return (zh?['星期一','星期二','星期三','星期四','星期五','星期六','星期日']:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'])[v-1];
 if(q.type==='money')return `¥${number(v)} <span class="number-expression-unit">${zh?'日圓':'JPY'}</span>`;
 return esc(relativeLabel(v));
}
function numberContentTable(items,shown){
 const notes=items.some(q=>numberContentDetail(q).note),columns=notes?3:2;
 const groups=NUMBER_TYPES.map(([id])=>{
  const entries=shown.filter(q=>numberCategory(q)===id);if(!entries.length)return '';
  return `<tbody data-number-group="${id}">${state.numberBrowse==='category'?'':`<tr class="number-group-row"><th scope="rowgroup" colspan="${columns}">${esc(numberTypeLabel(id))}</th></tr>`}${entries.map(q=>{
   const detail=numberContentDetail(q),alternatives=numberReadings(q).filter(r=>r!==q.kana);
   return `<tr data-number-guide="${esc(q.id)}"><th scope="row" class="number-expression">${numberTableExpression(q)}</th><td lang="ja" class="jp"><span class="number-reading${detail.irregular?' number-irregular':''}">${esc(q.kana)}</span>${alternatives.length?`<span class="number-variants">${alternatives.map(esc).join(' / ')}</span>`:''}</td>${notes?`<td class="number-note">${esc(detail.note)}</td>`:''}</tr>`;
  }).join('')}</tbody>`;
 }).join('');
 return `<table class="number-table${notes?' has-notes':''}"><caption class="sr-only">${esc(translateText('Number expressions and readings'))}</caption><thead><tr><th scope="col">Number / Expression</th><th scope="col">Hiragana</th>${notes?'<th scope="col">Usage / Reading Note</th>':''}</tr></thead>${groups}</table>`;
}
function numberMenu(){
 const set=numberSelection(),chips=(entries,attribute,selected)=>entries.map(([id,label])=>`<button class="dialogue-chip${id===selected?' selected':''}" data-${attribute}="${id}" aria-pressed="${id===selected}">${esc(label)}</button>`).join('');
 const entries=state.numberBrowse==='category'?NUMBER_TYPES.map(t=>[t[0],numberTypeLabel(t[0])]):set.available.map(ch=>[String(ch),chapterLabel(ch)]);
 const label=state.numberBrowse==='category'?'Category':'Chapter';
 const pageSize=12,last=Math.max(0,Math.ceil(set.items.length/pageSize)-1);state.numberPage=Math.max(0,Math.min(last,Number(state.numberPage)||0));
 const shown=set.items.slice(state.numberPage*pageSize,(state.numberPage+1)*pageSize);
 return `<section class="study-wrap dialogue-selector number-selector"><div class="dialogue-chip-row number-mode-row" role="group" aria-label="Number selection">${chips([['all','All'],['category','By category'],['chapter','By chapter']],'number-browse',state.numberBrowse)}</div>${state.numberBrowse==='all'?'':`<div class="field-label number-filter-label">${label}</div><div class="dialogue-chip-row number-filter-row" data-chip-group="${state.numberBrowse}" role="group" aria-label="${label}">${chips(entries,state.numberBrowse==='category'?'number-type':'number-chapter',state.numberBrowse==='category'?state.numberType:state.numberChapter)}</div>`}<div class="dialogue-intro"><h1>${esc(set.label)}</h1><p>Explore numerical expressions and their readings.</p></div><div class="dialogue-guide-actions"><button class="button primary" data-number-practice="matching">Matching ${icon('arrow')}</button><button class="button soft" data-number-practice="rebuild">Rebuild ${icon('arrow')}</button></div><p class="small muted">${set.items.length} forms</p></section><section class="study-wrap number-content">${numberContentTable(set.items,shown)}<div class="card-actions number-pagination">${button('Previous page','numberPreviousPage','ghost',state.numberPage?'':'disabled')}<span>${state.numberPage+1} / ${last+1}</span>${button('Next page','numberNextPage','ghost',state.numberPage<last?'':'disabled')}</div></section>`;
}
function startNumberPractice(mode='matching',ids=null,scope=null){
 if(!['matching','rebuild'].includes(mode))return;
 if(scope)Object.assign(state,scope);
 const selection=numberSelection(),items=selection.items,chosen=ids?.filter(id=>items.some(q=>q.id===id));if(!items.length)return;
 const currentScope={numberBrowse:state.numberBrowse,numberType:state.numberType,numberChapter:state.numberChapter,numberPage:state.numberPage};
 rememberPage();state.numberRound={mode,scope:currentScope,ids:chosen?.length?chosen:shuffle(items.map(q=>q.id)),index:0,correct:0,missed:[],checked:false,chosen:[]};state.view='number-game';prepareNumberMatching();render();window.scrollTo({top:0,behavior:'auto'});
}
function startNumberMatching(ids=null){startNumberPractice('matching',ids);}
function numberCurrent(){const r=state.numberRound;return r&&NUMBER_QUESTIONS.find(q=>q.id===r.ids[r.index]);}
function prepareNumberMatching(){const r=state.numberRound,q=numberCurrent();if(!q)return;r.checked=false;r.result=false;r.revealed=false;r.chosen=[];r.tileBank=numberTileBank(q,r.mode);}
function numberAnswer(){const r=state.numberRound;return r.chosen.map(i=>r.tileBank[i]).join('');}
function numberAnswerReady(){const answer=rebuildText(numberAnswer());return numberReadings(numberCurrent()).some(reading=>reading.length===answer.length);}
function checkNumberMatching(reveal=false){const r=state.numberRound,q=numberCurrent();if(!q||r.checked||(!reveal&&!numberAnswerReady()))return;r.result=!reveal&&numberReadings(q).some(reading=>rebuildCorrect(numberAnswer(),reading));r.checked=true;r.revealed=reveal;if(r.result)r.correct++;else if(!r.missed.includes(q.id))r.missed.push(q.id);record(r.mode==='rebuild'?'numberRebuild':'numberMatching',q.id,r.result);render();}
function relativeLabel(value){const [unit,offset]=value,zh=state.language==='zh-Hant';if(unit==='day'&&Math.abs(offset)<=2)return (zh?{'-2':'前天','-1':'昨天','0':'今天','1':'明天','2':'後天'}:{'-2':'The day before yesterday','-1':'Yesterday','0':'Today','1':'Tomorrow','2':'The day after tomorrow'})[offset];if(unit!=='day'&&Math.abs(offset)===1)return zh?({week:offset<0?'上週':'下週',month:offset<0?'上個月':'下個月',year:offset<0?'去年':'明年'})[unit]:`${offset<0?'Last':'Next'} ${unit}`;if(!offset)return zh?({day:'今天',week:'本週',month:'本月',year:'今年'})[unit]:({day:'Today',week:'This week',month:'This month',year:'This year'})[unit];const n=Math.abs(offset);return zh?`${n}${({day:'天',week:'週',month:'個月',year:'年'})[unit]}${offset<0?'前':'後'}`:offset<0?`${n} ${unit}${n===1?'':'s'} ago`:`In ${n} ${unit}${n===1?'':'s'}`;}
const NUMBER_MONTH_NAMES=['January','February','March','April','May','June','July','August','September','October','November','December'];
function numberPrompt(q){
 const v=q.value,zh=state.language==='zh-Hant',label=numberTypeLabel(numberCategory(q)),number=n=>n.toLocaleString('en-US');let visual='';
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
 const q=numberCurrent();return `<section class="study-wrap number-exercise"><h1 class="sr-only">${r.mode==='rebuild'?'Rebuild':'Matching'}</h1>${numberPrompt(q)}<div class="token-area number-answer ${r.chosen.length?'filled':''}" role="group" aria-label="Your hiragana answer">${r.chosen.length?r.chosen.map((id,position)=>`<button class="tile jp" lang="ja" data-number-return="${position}" ${r.checked?'disabled':''}>${esc(r.tileBank[id])}</button>`).join(''):'<span class="muted">Arrange your answer</span>'}</div><div class="token-bank number-tile-bank" role="group" aria-label="Hiragana bank">${r.tileBank.map((unit,index)=>`<button class="tile jp ${r.chosen.includes(index)?'selected':''}" lang="ja" data-number-tile="${index}" ${r.checked||r.chosen.includes(index)?'disabled':''}>${esc(unit)}</button>`).join('')}</div>${r.checked?`<div class="reply-feedback ${r.result?'correct':'wrong'}" role="status"><span class="feedback-lulu ${r.result?'happy':'encouraging'}" aria-hidden="true"></span><div class="feedback-copy"><strong>${r.result?'Correct!':'The correct answer is:'}</strong><p class="jp" lang="ja">${esc(q.kana)}</p><p class="small">${esc(numberNotes(q))}</p></div></div><div class="card-actions">${button('Next '+icon('arrow'),'numberNext','primary')}</div>`:`<div class="card-actions">${button('Undo','numberUndo','ghost',r.chosen.length?'':'disabled')}${button('Clear','numberClear','ghost',r.chosen.length?'':'disabled')}${button('Check answer','numberCheck','primary',numberAnswerReady()?'':'disabled')}</div><div class="activity-reveal"><button class="scope-link" data-action="numberReveal">Show answer & mark for review</button></div>`}</section>`;
}
function numberClick(d){
 if(d.numberBrowse){state.numberBrowse=d.numberBrowse;state.numberPage=0;numberSelection();save();render();return true;}
 if(d.numberType||d.numberChapter){if(d.numberType)state.numberType=d.numberType;if(d.numberChapter)state.numberChapter=d.numberChapter;state.numberPage=0;numberSelection();save();render();return true;}
 if(d.numberPractice){startNumberPractice(d.numberPractice);return true;}
 const r=state.numberRound;
 if(d.numberTile!==undefined||d.numberReturn!==undefined){if(state.view!=='number-game'||!r||r.checked||!numberCurrent())return true;if(d.numberTile!==undefined){const index=Number(d.numberTile),limit=Math.max(...numberReadings(numberCurrent()).map(reading=>reading.length));if(Number.isInteger(index)&&index>=0&&index<r.tileBank.length&&!r.chosen.includes(index)&&rebuildText(numberAnswer()+r.tileBank[index]).length<=limit)r.chosen.push(index);}else{const position=Number(d.numberReturn);if(Number.isInteger(position)&&position>=0&&position<r.chosen.length)r.chosen.splice(position,1);}render();return true;}
 if(!d.action?.startsWith('number'))return false;
 if(d.action==='numberStart')startNumberPractice(r?.mode||'matching',null,r?.scope);
 else if(d.action==='numberRetry'&&r)startNumberPractice(r.mode,r.missed,r.scope);
 else if(d.action==='numberNext'&&r?.checked){r.index++;prepareNumberMatching();render();}
 else if(['numberClear','numberUndo','numberCheck','numberReveal'].includes(d.action)&&r&&!r.checked&&numberCurrent()){if(d.action==='numberClear')r.chosen=[];else if(d.action==='numberUndo')r.chosen.pop();else {checkNumberMatching(d.action==='numberReveal');return true;}render();}
 else if(d.action==='numberPreviousPage'||d.action==='numberNextPage'){state.numberPage+=(d.action==='numberPreviousPage'?-1:1);render();document.querySelector('.number-content')?.scrollIntoView({block:'start'});}
 return true;
}
