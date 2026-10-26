'use strict';
// Audited against printed pp.48–57 and 60–69 of the supplied scans.
// Keep legacy IDs/ch intact: progress and the Chapter 1–2 mock depend on them.
const CHAPTERS=[1,2,3,4];
const CHAPTER_PAGES={1:'28–37',2:'38–47',3:'48–57',4:'60–69'};
const wordChapters=w=>w.chapters||[w.ch];
const inChapter=(w,ch)=>wordChapters(w).includes(Number(ch));
const chapterLabel=ch=>`Chapter ${ch}`;
const CHAPTER_SOURCE_ROWS={3:[],4:[]};
const CHAPTER_TRANSLATIONS={};
function chapterCategory(id,label,zh,description,descriptionZh){
  let category=VOCAB_CATEGORIES.find(c=>c.id===id);
  if(!category){category={id,label,description,ids:[]};VOCAB_CATEGORIES.push(category);}
  else {category.label=label;category.description=description;}
  CHAPTER_TRANSLATIONS[label]=zh;CHAPTER_TRANSLATIONS[description]=descriptionZh;
  return category;
}
chapterCategory('places','Places','場所','Rooms, facilities, buildings and household locations.','房間、設施、建築物及家中場所。');
chapterCategory('locations','Locations & directions','位置與方向','Here, there and polite ways to indicate a place.','這裡、那裡及指出位置的禮貌說法。');
chapterCategory('numbers','Numbers, floors & prices','數字、樓層與價格','Number units, floor counters and prices.','數字單位、樓層量詞及價格。');
chapterCategory('activities','Daily activities','日常活動','Wake up, sleep, work, rest, study and finish.','起床、睡覺、工作、休息、讀書及結束。');
chapterCategory('time','Time','時間','Hours, minutes and periods of the day.','時、分及一天中的時段。');
chapterCategory('days','Days & weekdays','日子與星期','Relative days, weekdays and daily frequency.','相對日期、星期及每日頻率。');
chapterCategory('schedules','Schedules & events','日程與活動','Opening hours, meetings, tests and holidays.','營業時間、會議、考試及假日。');
chapterCategory('geography','Cities & named places','城市與地名','Cities and named institutions printed in the related vocabulary.','相關單詞中列出的城市及機構名稱。');
function chapterWord(ch,row,category,zh,en,jp,c='X',note='',noteZh=''){
  const kana=jp.replace(/[ァ-ヶ]/g,x=>String.fromCharCode(x.charCodeAt(0)-0x60));
  let word=WORDS.find(w=>w.kana===kana&&w.c===c);
  const group=/^\d/.test(String(row))?'core':String(row).startsWith('r')?'related':'phrases';
  if(!word){
    word={id:`${ch}-${row}`,ch,chapters:[ch],group,jp,kana,c,zh,en,note,page:1,printedPage:ch===3?48:60};
    WORDS.push(word);const cat=VOCAB_CATEGORIES.find(c=>c.id===category);cat.ids.push(word.id);VOCAB_CATEGORY_BY_WORD.set(word.id,cat);
  }else word.chapters=[...new Set([...wordChapters(word),ch])];
  word.sources||=[];word.sources.push({ch,row:String(row),printedPages:ch===3?'48–49':'60–61'});
  if(note&&noteZh)CHAPTER_TRANSLATIONS[note]=noteZh;
  CHAPTER_SOURCE_ROWS[ch].push({row:String(row),word:word.id,category});
  return word;
}
const C3=[
 ['01','locations','這裡（近說話者）','here (near the speaker)','ここ'],
 ['02','locations','那裡（近聽者）','there (near the listener)','そこ'],
 ['03','locations','那邊（離雙方遠）','over there (far from both)','あそこ'],
 ['04','locations','哪裡','where','どこ'],
 ['05','locations','這邊（禮貌）','here / this way (polite)','こちら'],
 ['06','locations','那邊（近聽者；禮貌）','there / that way (polite)','そちら'],
 ['07','locations','那邊（離雙方遠；禮貌）','over there / that way (polite)','あちら'],
 ['08','locations','哪邊（禮貌）','where / which way (polite)','どちら'],
 ['09','places','教室','classroom','きょうしつ','教室'],
 ['10','places','食堂、餐廳','dining hall / cafeteria','しょくどう','食堂'],
 ['11','places','辦公室、事務所','office','じむしょ','事務所'],
 ['12','places','會議室','meeting room','かいぎしつ','会議室'],
 ['13','places','接待處、服務台','reception','うけつけ','受付'],
 ['14','places','大廳、休息室','lobby','ロビー'],
 ['15','places','房間','room','へや','部屋'],
 ['16a','places','廁所','toilet','トイレ'],
 ['16b','places','洗手間（禮貌）','restroom (polite)','おてあらい','お手洗い'],
 ['17','places','樓梯','stairs','かいだん','階段'],
 ['18','places','電梯','lift / elevator','エレベーター'],
 ['19','places','電扶梯','escalator','エスカレーター'],
 ['20','objects','自動販賣機','vending machine','じどうはんばいき','自動販売機'],
 ['21','objects','電話','telephone','でんわ','電話'],
 ['22a','nationality','國家、故鄉（無「お」）','country / home country (plain)','くに','国'],
 ['22b','nationality','國家、故鄉（加「お」）','country / home country (polite)','おくに','お国'],
 ['23','places','公司','company','かいしゃ','会社'],
 ['24','places','家','home','うち'],
 ['25','objects','鞋子','shoes','くつ','靴'],
 ['26','objects','領帶','necktie','ネクタイ'],
 ['27','food','葡萄酒','wine','ワイン'],
 ['28','places','賣場、專櫃','sales department / counter','うりば','売り場'],
 ['29','places','地下','basement','ちか','地下'],
 ['30a','numbers','～樓（一般讀音）','floor suffix (after 2, 4, 5, 7 or 9)','かい','階','A counter after a floor number; its reading changes with the number.','接在樓層數字後；讀音會隨數字改變。'],
 ['30b','numbers','～樓（接3或疑問詞後）','floor suffix (after 3 or the question word)','がい','階','Use がい in さんがい and なんがい.','さんがい、なんがい使用「がい」。'],
 ['31','numbers','幾樓','which floor','なんがい','何階'],
 ['32','numbers','～日圓','yen suffix','えん','円'],
 ['33','numbers','多少錢','how much','いくら'],
 ['34','numbers','百','hundred','ひゃく','百'],
 ['35','numbers','千','thousand','せん','千'],
 ['36','numbers','萬','ten thousand','まん','万'],
 ['c1','courtesy','歡迎光臨','welcome (to a shop)','いらっしゃいませ'],
 ['c2','courtesy','請讓我看一下～','please show me …','～をみせてください','～を見せてください','Put the item before を; it can be omitted when understood.','在「を」前加上物品；已知物品時可省略。'],
 ['c2b','courtesy','請讓我看一下（省略物品）','please show me (item understood)','みせてください','見せてください'],
 ['c3','replies','那麼','well then','じゃ'],
 ['c4','courtesy','請給我～','please give me …','～をください','X','A shopping expression: put the item before を.','購物用語：在「を」前加上物品。'],
 ['c4b','courtesy','請給我（省略物品）','please give me (item understood)','ください'],
 ['p1','courtesy','對不起、不好意思','excuse me / sorry','すみません'],
 ['p2','courtesy','謝謝（簡短）','thanks (brief)','どうも'],
 ['r1','nationality','義大利','Italy','イタリア'],
 ['r2','nationality','瑞士','Switzerland','スイス'],
 ['r3','nationality','法國','France','フランス'],
 ['r4','geography','雅加達','Jakarta','ジャカルタ'],
 ['r5','geography','曼谷','Bangkok','バンコク'],
 ['r6','geography','柏林','Berlin','ベルリン'],
 ['r7','geography','新大阪（車站名）','Shin-Osaka (station)','しんおおさか','新大阪']
];
C3.forEach(row=>chapterWord(3,...row));
// Explicit reading references, also used to construct deterministic exercise answers.
const NUMBER_READINGS={100:'ひゃく',200:'にひゃく',300:'さんびゃく',400:'よんひゃく',500:'ごひゃく',600:'ろっぴゃく',700:'ななひゃく',800:'はっぴゃく',900:'きゅうひゃく',1000:'せん',2000:'にせん',3000:'さんぜん',4000:'よんせん',5000:'ごせん',6000:'ろくせん',7000:'ななせん',8000:'はっせん',9000:'きゅうせん',10000:'いちまん'};
const FLOOR_READINGS=['いっかい','にかい','さんがい','よんかい','ごかい','ろっかい','ななかい','はちかい','きゅうかい','じゅっかい'];
const HOUR_READINGS=['いちじ','にじ','さんじ','よじ','ごじ','ろくじ','しちじ','はちじ','くじ','じゅうじ','じゅういちじ','じゅうにじ'];
const MINUTE_READINGS={1:'いっぷん',2:'にふん',3:'さんぷん',4:'よんぷん',5:'ごふん',6:'ろっぷん',7:'ななふん',8:'はっぷん',9:'きゅうふん',10:'じゅっぷん',15:'じゅうごふん',20:'にじゅっぷん',25:'にじゅうごふん',30:'さんじゅっぷん',35:'さんじゅうごふん',40:'よんじゅっぷん',45:'よんじゅうごふん',50:'ごじゅっぷん',55:'ごじゅうごふん',60:'ろくじゅっぷん'};
const READING_ALTERNATIVES={はちかい:['はっかい'],じゅっかい:['じっかい'],じゅっぷん:['じっぷん']};
function timeReading(hour,minute=0,period='',half=false){return period+(HOUR_READINGS[(hour+11)%12])+(half?'はん':minute?MINUTE_READINGS[minute]:'');}

const C4=[
  {
    "row": 1,
    "jp": "おきます",
    "c": "起きます",
    "en": "get up; wake up",
    "zh": "起床",
    "category": "activities",
    "note": "Polite non-past verb.",
    "noteZh": "動詞的禮貌非過去式。"
  },
  {
    "row": 2,
    "jp": "ねます",
    "c": "寝ます",
    "en": "sleep; go to bed",
    "zh": "睡覺；就寢",
    "category": "activities",
    "note": "Polite non-past verb.",
    "noteZh": "動詞的禮貌非過去式。"
  },
  {
    "row": 3,
    "jp": "はたらきます",
    "c": "働きます",
    "en": "work",
    "zh": "工作",
    "category": "activities",
    "note": "Polite non-past verb.",
    "noteZh": "動詞的禮貌非過去式。"
  },
  {
    "row": 4,
    "jp": "やすみます",
    "c": "休みます",
    "en": "rest; take a day off",
    "zh": "休息；休假",
    "category": "activities",
    "note": "Polite non-past verb; distinguish the noun やすみ.",
    "noteZh": "動詞的禮貌非過去式；與名詞「やすみ」不同。"
  },
  {
    "row": 5,
    "jp": "べんきょうします",
    "c": "勉強します",
    "en": "study",
    "zh": "念書；學習",
    "category": "activities",
    "note": "Polite non-past verb.",
    "noteZh": "動詞的禮貌非過去式。"
  },
  {
    "row": 6,
    "jp": "おわります",
    "c": "終わります",
    "en": "finish; end",
    "zh": "結束",
    "category": "activities",
    "note": "Polite non-past verb.",
    "noteZh": "動詞的禮貌非過去式。"
  },
  {
    "row": 7,
    "jp": "デパート",
    "c": "X",
    "en": "department store",
    "zh": "百貨公司",
    "category": "places",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 8,
    "jp": "ぎんこう",
    "c": "銀行",
    "en": "bank",
    "zh": "銀行",
    "category": "places",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 9,
    "jp": "ゆうびんきょく",
    "c": "郵便局",
    "en": "post office",
    "zh": "郵局",
    "category": "places",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 10,
    "jp": "としょかん",
    "c": "図書館",
    "en": "library",
    "zh": "圖書館",
    "category": "places",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 11,
    "jp": "びじゅつかん",
    "c": "美術館",
    "en": "art museum",
    "zh": "美術館",
    "category": "places",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 12,
    "jp": "いま",
    "c": "今",
    "en": "now",
    "zh": "現在",
    "category": "time",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 13,
    "jp": "～じ",
    "c": "～時",
    "en": "o’clock; hour suffix",
    "zh": "～點；時刻後綴",
    "category": "time",
    "note": "A suffix after an hour number, not an independent noun. The printed row uses …じ.",
    "noteZh": "接在時數後的後綴，不是獨立名詞；課本印作「…じ」。"
  },
  {
    "row": "14a",
    "jp": "～ふん",
    "c": "～分",
    "en": "minute suffix (after 2, 5, 7 or 9)",
    "zh": "～分（接2、5、7或9後）",
    "category": "time",
    "note": "One of the two printed readings of 分, selected by the preceding number. The printed row is …ふん（…ぷん）.",
    "noteZh": "「分」的其中一種讀法，依前面的數字而定；課本列作「…ふん（…ぷん）」。"
  },
  {
    "row": "14b",
    "jp": "～ぷん",
    "c": "～分",
    "en": "minute suffix (after 1, 3, 4 or 6)",
    "zh": "～分（接1、3、4或6後）",
    "category": "time",
    "note": "Alternative counter reading in the same numbered row as ～ふん; selected by the preceding number.",
    "noteZh": "與「～ふん」屬同一編號的另一個量詞讀法，依前面的數字而定。"
  },
  {
    "row": 15,
    "jp": "はん",
    "c": "半",
    "en": "half past",
    "zh": "半（半小時）",
    "category": "time",
    "note": "Use after an hour: 9時半, half past nine.",
    "noteZh": "接在時刻後，例如「9時半」是九點半。"
  },
  {
    "row": 16,
    "jp": "なんじ",
    "c": "何時",
    "en": "what time; what hour",
    "zh": "幾點",
    "category": "time",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 17,
    "jp": "なんぷん",
    "c": "何分",
    "en": "how many minutes; what minute",
    "zh": "幾分",
    "category": "time",
    "note": "The printed reading is なんぷん, not なんふん.",
    "noteZh": "課本讀音是「なんぷん」，不是「なんふん」。"
  },
  {
    "row": 18,
    "jp": "ごぜん",
    "c": "午前",
    "en": "a.m.; before noon",
    "zh": "上午",
    "category": "time",
    "note": "Placed before a time.",
    "noteZh": "放在時刻前。"
  },
  {
    "row": 19,
    "jp": "ごご",
    "c": "午後",
    "en": "p.m.; after noon",
    "zh": "下午",
    "category": "time",
    "note": "Placed before a time.",
    "noteZh": "放在時刻前。"
  },
  {
    "row": 20,
    "jp": "あさ",
    "c": "朝",
    "en": "morning",
    "zh": "早上",
    "category": "time",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 21,
    "jp": "ひる",
    "c": "昼",
    "en": "daytime; noon",
    "zh": "白天；中午",
    "category": "time",
    "note": "",
    "noteZh": ""
  },
  {
    "row": "22a",
    "jp": "ばん",
    "c": "晩",
    "en": "evening",
    "zh": "晚上",
    "category": "time",
    "note": "The printed row gives ばん（よる） and 晩（夜）; these are alternative forms, not optional kana.",
    "noteZh": "課本同列「ばん（よる）」及「晩（夜）」；這是兩個詞形，不是可省略的假名。"
  },
  {
    "row": "22b",
    "jp": "よる",
    "c": "夜",
    "en": "night",
    "zh": "夜晚",
    "category": "time",
    "note": "Alternative form listed with ばん in numbered row 22.",
    "noteZh": "與「ばん」同列於第22項的另一個詞形。"
  },
  {
    "row": 23,
    "jp": "おととい",
    "c": "X",
    "en": "the day before yesterday",
    "zh": "前天",
    "category": "days",
    "note": "The two printed forms have identical kana and different pitch-accent marks; keep one textual entry. No に for this relative-day expression.",
    "noteZh": "課本的兩個寫法只有音調標記不同，假名相同，文字項目只保留一個。這個相對日期詞不加「に」。"
  },
  {
    "row": 24,
    "jp": "きのう",
    "c": "X",
    "en": "yesterday",
    "zh": "昨天",
    "category": "days",
    "note": "The two printed forms have identical kana and different pitch-accent marks; keep one textual entry. No に for this relative-day expression.",
    "noteZh": "課本的兩個寫法只有音調標記不同，假名相同，文字項目只保留一個。這個相對日期詞不加「に」。"
  },
  {
    "row": 25,
    "jp": "きょう",
    "c": "X",
    "en": "today",
    "zh": "今天",
    "category": "days",
    "note": "Relative-day expression: no に.",
    "noteZh": "相對日期詞，不加「に」。"
  },
  {
    "row": 26,
    "jp": "あした",
    "c": "X",
    "en": "tomorrow",
    "zh": "明天",
    "category": "days",
    "note": "Relative-day expression: no に.",
    "noteZh": "相對日期詞，不加「に」。"
  },
  {
    "row": 27,
    "jp": "あさって",
    "c": "X",
    "en": "the day after tomorrow",
    "zh": "後天",
    "category": "days",
    "note": "Relative-day expression: no に.",
    "noteZh": "相對日期詞，不加「に」。"
  },
  {
    "row": 28,
    "jp": "けさ",
    "c": "X",
    "en": "this morning",
    "zh": "今天早上",
    "category": "days",
    "note": "Relative-time expression: no に. No kanji form is printed in the vocabulary row.",
    "noteZh": "相對時間詞，不加「に」。詞彙表沒有列出漢字寫法。"
  },
  {
    "row": 29,
    "jp": "こんばん",
    "c": "今晩",
    "en": "tonight; this evening",
    "zh": "今晚",
    "category": "days",
    "note": "Relative-time expression: no に.",
    "noteZh": "相對時間詞，不加「に」。"
  },
  {
    "row": 30,
    "jp": "やすみ",
    "c": "休み",
    "en": "rest; day off; holiday",
    "zh": "休息；休假",
    "category": "days",
    "note": "Noun; distinguish the verb やすみます.",
    "noteZh": "名詞；與動詞「やすみます」不同。"
  },
  {
    "row": 31,
    "jp": "ひるやすみ",
    "c": "昼休み",
    "en": "lunch break",
    "zh": "午休",
    "category": "schedules",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 32,
    "jp": "しけん",
    "c": "試験",
    "en": "exam; test",
    "zh": "考試",
    "category": "schedules",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 33,
    "jp": "かいぎ",
    "c": "会議",
    "en": "meeting; conference",
    "zh": "會議",
    "category": "schedules",
    "note": "The textbook also notes ～をします (hold a meeting); this is not a separate numbered noun.",
    "noteZh": "課本另註「～をします」（開會），不是另一個編號的名詞。"
  },
  {
    "row": 34,
    "jp": "えいが",
    "c": "映画",
    "en": "film; movie",
    "zh": "電影",
    "category": "schedules",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 35,
    "jp": "まいあさ",
    "c": "毎朝",
    "en": "every morning",
    "zh": "每天早上",
    "category": "days",
    "note": "Frequency expression; do not add に.",
    "noteZh": "頻率詞，不加「に」。"
  },
  {
    "row": 36,
    "jp": "まいばん",
    "c": "毎晩",
    "en": "every evening; every night",
    "zh": "每天晚上",
    "category": "days",
    "note": "Frequency expression; do not add に.",
    "noteZh": "頻率詞，不加「に」。"
  },
  {
    "row": 37,
    "jp": "まいにち",
    "c": "毎日",
    "en": "every day",
    "zh": "每天",
    "category": "days",
    "note": "Frequency expression; do not add に.",
    "noteZh": "頻率詞，不加「に」。"
  },
  {
    "row": 38,
    "jp": "げつようび",
    "c": "月曜日",
    "en": "Monday",
    "zh": "星期一",
    "category": "days",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 39,
    "jp": "かようび",
    "c": "火曜日",
    "en": "Tuesday",
    "zh": "星期二",
    "category": "days",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 40,
    "jp": "すいようび",
    "c": "水曜日",
    "en": "Wednesday",
    "zh": "星期三",
    "category": "days",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 41,
    "jp": "もくようび",
    "c": "木曜日",
    "en": "Thursday",
    "zh": "星期四",
    "category": "days",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 42,
    "jp": "きんようび",
    "c": "金曜日",
    "en": "Friday",
    "zh": "星期五",
    "category": "days",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 43,
    "jp": "どようび",
    "c": "土曜日",
    "en": "Saturday",
    "zh": "星期六",
    "category": "days",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 44,
    "jp": "にちようび",
    "c": "日曜日",
    "en": "Sunday",
    "zh": "星期日",
    "category": "days",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 45,
    "jp": "なんようび",
    "c": "何曜日",
    "en": "what day of the week",
    "zh": "星期幾",
    "category": "days",
    "note": "",
    "noteZh": ""
  },
  {
    "row": 46,
    "jp": "～から",
    "c": "X",
    "en": "from …",
    "zh": "從～",
    "category": "schedules",
    "note": "A particle after the starting time or day, not an ordinary noun.",
    "noteZh": "接在開始的時間或日期後的助詞，不是普通名詞。"
  },
  {
    "row": 47,
    "jp": "～まで",
    "c": "X",
    "en": "until …; to …",
    "zh": "到～；直至～",
    "category": "schedules",
    "note": "A particle after the ending time or day, not an ordinary noun.",
    "noteZh": "接在結束的時間或日期後的助詞，不是普通名詞。"
  },
  {
    "row": 48,
    "jp": "～と～",
    "c": "X",
    "en": "… and … (joining nouns)",
    "zh": "～和～（連接名詞）",
    "category": "schedules",
    "note": "Joins nouns, such as 土曜日と日曜日. The placeholders represent two nouns.",
    "noteZh": "連接名詞，例如「土曜日と日曜日」；兩個「～」代表兩個名詞。"
  },
  {
    "row": "c1",
    "jp": "ばんごう",
    "c": "番号",
    "en": "number",
    "zh": "號碼",
    "category": "numbers",
    "note": "Used in 電話番号 (telephone number) in the printed conversation.",
    "noteZh": "課本會話用於「電話番号」（電話號碼）。"
  },
  {
    "row": "c2",
    "jp": "なんばん",
    "c": "何番",
    "en": "what number",
    "zh": "幾號；甚麼號碼",
    "category": "numbers",
    "note": "Asks a number, including a telephone number.",
    "noteZh": "詢問號碼，也可詢問電話號碼。"
  },
  {
    "row": "c3",
    "jp": "そちら",
    "c": "X",
    "en": "there; your place (polite)",
    "zh": "那邊；您那邊",
    "category": "places",
    "note": "Reuses Chapter 3 そちら; here refers to the person or establishment at the other end of the call.",
    "noteZh": "沿用第3課的「そちら」；此處指通話對方那邊或其店舖。"
  },
  {
    "row": "e1",
    "jp": "たいへんですね",
    "c": "大変ですね",
    "en": "That sounds tough.",
    "zh": "真是辛苦啊。",
    "category": "replies",
    "note": "An empathetic response to hearing about a demanding schedule, such as studying late and sleeping at 1 a.m.",
    "noteZh": "聽到辛苦的作息時表達體諒，例如讀書至深夜、凌晨一點才睡。"
  },
  {
    "row": "r1",
    "jp": "ニューヨーク",
    "c": "X",
    "en": "New York",
    "zh": "紐約",
    "category": "geography",
    "note": "",
    "noteZh": ""
  },
  {
    "row": "r2",
    "jp": "ペキン",
    "c": "X",
    "en": "Beijing",
    "zh": "北京",
    "category": "geography",
    "note": "The printed Japanese form is ペキン, not ベイジン.",
    "noteZh": "課本的日語寫法是「ペキン」，不是「ベイジン」。"
  },
  {
    "row": "r3",
    "jp": "ロサンゼルス",
    "c": "X",
    "en": "Los Angeles",
    "zh": "洛杉磯",
    "category": "geography",
    "note": "",
    "noteZh": ""
  },
  {
    "row": "r4",
    "jp": "ロンドン",
    "c": "X",
    "en": "London",
    "zh": "倫敦",
    "category": "geography",
    "note": "",
    "noteZh": ""
  },
  {
    "row": "r5",
    "jp": "あすか",
    "c": "X",
    "en": "Asuka (fictional restaurant)",
    "zh": "明日香（虛構的餐廳名）",
    "category": "places",
    "note": "A fictional restaurant name in the source; no Japanese kanji form is printed.",
    "noteZh": "課本的虛構餐廳名稱，沒有列出日語漢字寫法。"
  },
  {
    "row": "r6",
    "jp": "アップルぎんこう",
    "c": "アップル銀行",
    "en": "Apple Bank (fictional)",
    "zh": "蘋果銀行（虛構的銀行名）",
    "category": "places",
    "note": "Fictional institution from the textbook, not a real opening-hours claim.",
    "noteZh": "課本的虛構機構，並非真實營業時間資料。"
  },
  {
    "row": "r7",
    "jp": "みどりとしょかん",
    "c": "みどり図書館",
    "en": "Midori Library (fictional)",
    "zh": "綠意圖書館（虛構的圖書館名）",
    "category": "places",
    "note": "Fictional institution from the textbook, not a real opening-hours claim.",
    "noteZh": "課本的虛構機構，並非真實營業時間資料。"
  },
  {
    "row": "r8",
    "jp": "やまとびじゅつかん",
    "c": "やまと美術館",
    "en": "Yamato Art Museum (fictional)",
    "zh": "大和美術館（虛構的美術館名）",
    "category": "places",
    "note": "Fictional institution from the textbook, not a real opening-hours claim.",
    "noteZh": "課本的虛構機構，並非真實營業時間資料。"
  }
];
C4.forEach(w=>chapterWord(4,String(w.row).replace(/^(\d)([ab]?)$/,'0$1$2'),w.category,w.zh,w.en,w.jp,w.c,w.note||'',w.noteZh||''));

// そちら has the same form in both chapters; include its telephone sense.
const sharedSochira=WORDS.find(w=>w.id==='3-06');
sharedSochira.en='there / that way / your place (polite)';
sharedSochira.zh='那邊／您那邊（禮貌）';
