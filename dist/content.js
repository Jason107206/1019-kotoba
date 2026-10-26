/* Transcribed from the supplied PDF, PDF pp.1 and 6 (printed pp.28–29 and 38–39).
   Japanese C forms are limited to the printed vocabulary columns. */
const WORDS = [];
function V(id,ch,group,zh,en,jp,c='X',note='') {
  const kana=jp.replace(/[ァ-ヶ]/g,x=>String.fromCharCode(x.charCodeAt(0)-0x60));
  WORDS.push({id,ch,group,zh,en,jp,kana,c,note,page:ch===1?1:6});
}
V('1-01',1,'core','我','I / me','わたし');
V('1-02',1,'core','你、您','you','あなた');
V('1-03a',1,'core','那個人','that person','あのひと','あの人');
V('1-03b',1,'core','那位（禮貌說法）','that person (polite)','あのかた','あの方');
V('1-04',1,'core','～先生／小姐／女士（姓名後）','Mr / Ms (name suffix)','さん','X','A suffix after a person’s name.');
V('1-05',1,'core','～（小孩名字後的稱呼）','affectionate name suffix for children','ちゃん','X','A suffix after a child’s name.');
V('1-06',1,'core','～人（國籍後綴）','nationality suffix','じん','人','Learn the suffix; the ～ is a placeholder.');
V('1-07',1,'core','老師（稱呼別人）','teacher (when referring to someone else)','せんせい','先生');
V('1-08',1,'core','教師（職業）','teacher (occupation)','きょうし','教師');
V('1-09',1,'core','學生','student','がくせい','学生');
V('1-10',1,'core','公司職員','company employee','かいしゃいん','会社員');
V('1-11',1,'core','職員（配合公司名稱）','employee of a named company','しゃいん','社員','Used with a company name.');
V('1-12',1,'core','銀行行員','bank employee','ぎんこういん','銀行員');
V('1-13',1,'core','醫生','doctor','いしゃ','医者');
V('1-14',1,'core','研究人員','researcher','けんきゅうしゃ','研究者');
V('1-15',1,'core','大學','university','だいがく','大学');
V('1-16',1,'core','醫院','hospital','びょういん','病院');
V('1-17a',1,'core','誰','who','だれ');
V('1-17b',1,'core','哪位（禮貌說法）','who (polite)','どなた');
V('1-18',1,'core','～歲（年齡後綴）','years old (suffix)','さい','歳');
V('1-19a',1,'core','幾歲','how old','なんさい','何歳');
V('1-19b',1,'core','幾歲（禮貌說法）','how old (polite)','おいくつ');
V('1-20',1,'core','是、對','yes','はい');
V('1-21',1,'core','不、不是','no','いいえ');
V('1-c1',1,'phrases','初次見面','nice to meet you','はじめまして','初めまして');
V('1-c2',1,'phrases','從～來的','came from …','～からきました','～から来ました','The place before から is a placeholder, not part of this card’s answer.');
V('1-c3a',1,'phrases','請多指教（簡短）','pleased to meet you (short form)','よろしく');
V('1-c3b',1,'phrases','請多指教（加「どうぞ」）','pleased to meet you (with どうぞ)','どうぞよろしく');
V('1-c3c',1,'phrases','請多指教（加「おねがいします」）','pleased to meet you (with おねがいします)','よろしくおねがいします','よろしくお願いします');
V('1-c3d',1,'phrases','請多指教（完整形式）','pleased to meet you (full form)','どうぞよろしくおねがいします','どうぞよろしくお願いします');
V('1-c4',1,'phrases','抱歉，請問……','excuse me, but …','しつれいですが','失礼ですが');
V('1-c5',1,'phrases','請問您貴姓？','your name, please?','おなまえは','お名前は','The final は is the particle は. Punctuation is optional in practice.');
V('1-c6',1,'phrases','這位是～先生／小姐','this is Mr / Ms …','こちらは～さんです','X','Book template: こちらは ～さんです。The name placeholder is omitted from the answer.');
V('1-r1',1,'related','美國','USA','アメリカ');
V('1-r2',1,'related','英國','UK','イギリス');
V('1-r3',1,'related','印度','India','インド');
V('1-r4',1,'related','印尼','Indonesia','インドネシア');
V('1-r5',1,'related','韓國','South Korea','かんこく','韓国');
V('1-r6',1,'related','泰國','Thailand','タイ');
V('1-r7',1,'related','中國','China','ちゅうごく','中国');
V('1-r8',1,'related','德國','Germany','ドイツ');
V('1-r9',1,'related','日本','Japan','にほん','日本');
V('1-r10',1,'related','巴西','Brazil','ブラジル');
V('2-01',2,'core','這（靠近說話者）','this (near speaker)','これ');
V('2-02',2,'core','那（靠近聽話者）','that (near listener)','それ');
V('2-03',2,'core','那（離雙方都遠）','that over there (far from both)','あれ');
V('2-04',2,'core','這個～（後接名詞）','this … (before a noun)','この');
V('2-05',2,'core','那個～（靠近聽話者，後接名詞）','that … (before a noun, near listener)','その');
V('2-06',2,'core','那個～（離雙方遠，後接名詞）','that … over there (before a noun)','あの');
V('2-07',2,'core','書','book','ほん','本');
V('2-08',2,'core','字典','dictionary','じしょ','辞書');
V('2-09',2,'core','雜誌','magazine','ざっし','雑誌');
V('2-10',2,'core','報紙','newspaper','しんぶん','新聞');
V('2-11',2,'core','筆記本','notebook','ノート');
V('2-12',2,'core','記事本','personal organiser','てちょう','手帳');
V('2-13',2,'core','名片','business card','めいし','名刺');
V('2-14',2,'core','卡片','card','カード');
V('2-15',2,'core','鉛筆','pencil','えんぴつ','鉛筆');
V('2-16',2,'core','原子筆','ballpoint pen','ボールペン');
V('2-17',2,'core','自動鉛筆','mechanical pencil','シャープペンシル');
V('2-18',2,'core','鑰匙','key','かぎ');
V('2-19',2,'core','鐘錶','clock / watch','とけい','時計');
V('2-20',2,'core','傘','umbrella','かさ','傘');
V('2-21',2,'core','皮包、提包','bag','かばん');
V('2-22',2,'core','CD、光碟','CD','シーディー','X','The book also prints CD.');
V('2-23',2,'core','電視','television','テレビ');
V('2-24',2,'core','收音機','radio','ラジオ');
V('2-25',2,'core','照相機','camera','カメラ');
V('2-26',2,'core','電腦','computer','コンピューター');
V('2-27',2,'core','汽車','car','くるま','車');
V('2-28',2,'core','桌子','desk','つくえ','机');
V('2-29',2,'core','椅子','chair','いす');
V('2-30',2,'core','巧克力','chocolate','チョコレート');
V('2-31',2,'core','咖啡','coffee','コーヒー');
V('2-32a',2,'core','伴手禮、土產（無「お」）','souvenir (without お)','みやげ','土産');
V('2-32b',2,'core','伴手禮、土產（加「お」）','souvenir (with お)','おみやげ','お土産');
V('2-33',2,'core','英語','English language','えいご','英語');
V('2-34',2,'core','日語','Japanese language','にほんご','日本語');
V('2-35',2,'core','～語（語言後綴）','language suffix','ご','語');
V('2-36',2,'core','什麼','what','なん','何');
V('2-37',2,'core','是的（表示同意）','so / that is right','そう');
V('2-d1',2,'phrases','今後將承蒙您的照顧','I look forward to your kindness','これからおせわになります','これからお世話になります');
V('2-d2a',2,'phrases','哪裡哪裡，也請多多指教（簡短）','the pleasure is mine (short)','こちらこそよろしく');
V('2-d2b',2,'phrases','也請多多指教（加「どうぞ」）','the pleasure is mine (with どうぞ)','こちらこそどうぞよろしく');
V('2-d2c',2,'phrases','也請多多指教（加「おねがいします」）','the pleasure is mine (with おねがいします)','こちらこそよろしくおねがいします','こちらこそよろしくお願いします');
V('2-d2d',2,'phrases','也請多多指教（完整形式）','the pleasure is mine (full form)','こちらこそどうぞよろしくおねがいします','こちらこそどうぞよろしくお願いします');
V('2-c1',2,'phrases','那個……（客氣地打招呼）','um / excuse me …','あのう');
V('2-c2',2,'phrases','咦！（驚訝時）','oh! / what? (surprise)','えっ');
V('2-c3',2,'phrases','請（讓別人做某事時）','please / here you are','どうぞ');
V('2-c4a',2,'phrases','謝謝（簡短）','thank you (short)','ありがとう');
V('2-c4b',2,'phrases','謝謝（加「どうも」）','thank you (with どうも)','どうもありがとう');
V('2-c4c',2,'phrases','謝謝（禮貌形式）','thank you (polite)','ありがとうございます');
V('2-c4d',2,'phrases','非常感謝（完整形式）','thank you very much (full form)','どうもありがとうございます');
V('2-c5',2,'phrases','這樣啊','I see','そうですか');
V('2-c6',2,'phrases','不是／不對','that is not correct','ちがいます','違います');
V('2-c7',2,'phrases','啊（意識到某事時）','ah (realisation)','あ');

// Each syllabus form has one study category. Printed source groups stay unchanged for quiz sampling.
const VOCAB_CATEGORIES=[
  {id:'people',label:'People & forms of address',description:'Pronouns, ways to refer to people, and name endings.',ids:['1-01','1-02','1-03a','1-03b','1-04','1-05']},
  {id:'occupations',label:'Jobs & roles',description:'Teachers, students and other occupations.',ids:['1-07','1-08','1-09','1-10','1-11','1-12','1-13','1-14']},
  {id:'places',label:'Places',description:'University and hospital.',ids:['1-15','1-16']},
  {id:'nationality',label:'Countries & nationality',description:'Country names and the nationality ending.',ids:['1-06','1-r1','1-r2','1-r3','1-r4','1-r5','1-r6','1-r7','1-r8','1-r9','1-r10']},
  {id:'questions',label:'Questions & age',description:'Who, what, how old, and the age ending.',ids:['1-17a','1-17b','1-18','1-19a','1-19b','2-36']},
  {id:'demonstratives',label:'This and that',description:'Words that point to things near you, near the listener, or far away.',ids:['2-01','2-02','2-03','2-04','2-05','2-06']},
  {id:'objects',label:'Objects',description:'Books, stationery, electronics, furniture and other everyday things.',ids:['2-07','2-08','2-09','2-10','2-11','2-12','2-13','2-14','2-15','2-16','2-17','2-18','2-19','2-20','2-21','2-22','2-23','2-24','2-25','2-26','2-27','2-28','2-29','2-32a','2-32b']},
  {id:'food',label:'Food & drinks',description:'Chocolate and coffee.',ids:['2-30','2-31']},
  {id:'languages',label:'Languages',description:'English, Japanese and the language ending.',ids:['2-33','2-34','2-35']},
  {id:'introductions',label:'Introductions & greetings',description:'Meeting people, asking names and making introductions.',ids:['1-c1','1-c2','1-c3a','1-c3b','1-c3c','1-c3d','1-c5','1-c6','2-d1','2-d2a','2-d2b','2-d2c','2-d2d']},
  {id:'courtesy',label:'Polite expressions & thanks',description:'Getting attention, offering something and saying thank you.',ids:['1-c4','2-c1','2-c3','2-c4a','2-c4b','2-c4c','2-c4d']},
  {id:'replies',label:'Replies & reactions',description:'Yes and no, agreement, surprise and understanding.',ids:['1-20','1-21','2-37','2-c2','2-c5','2-c6','2-c7']}
];
const VOCAB_CATEGORY_BY_WORD=new Map(VOCAB_CATEGORIES.flatMap(category=>category.ids.map(id=>[id,category])));
function vocabularySection(w){return VOCAB_CATEGORY_BY_WORD.get(w.id)?.id;}

const PATTERNS=[
{id:'p1',ch:1,title:'Name, job & nationality',formula:'N₁ は N₂ です',source:'PDF p.2 文型1; p.3 練習A1',tip:'は marks the topic. です completes the statement.'},
{id:'p2',ch:1,title:'Negative statements',formula:'N₁ は N₂ じゃ ありません',source:'PDF p.2 文型2; p.3 練習A2',tip:'Keep じゃ → ありません together in this order. The page also shows では ありません.'},
{id:'p3',ch:1,title:'Yes / no questions & replies',formula:'N₁ は N₂ ですか',source:'PDF p.2 文型3 / 例文1–3; p.3 練習B4',tip:'か turns the statement into a question. は follows the topic.'},
{id:'p4',ch:1,title:'Who is that?',formula:'あの人 は だれ ですか',source:'PDF p.2 例文4; p.3 練習A3',tip:'Use だれ or the polite どなた. あの must be followed by 人 or 方 here.'},
{id:'p5',ch:1,title:'Company / university affiliation',formula:'N₁ は organisation の role です',source:'PDF p.3 練習A4',tip:'Put the organisation before の and the role after の.'},
{id:'p6',ch:1,title:'Also / too',formula:'N₁ も N₂ です',source:'PDF p.2 文型4; p.3 練習A5',tip:'も follows the person who is also in the same category. Do not add は next to it.'},
{id:'p7',ch:1,title:'Age & asking age',formula:'person は 何歳 ですか',source:'PDF p.2 例文6; p.3 練習A6',tip:'何歳 asks age. The polite alternative on the page is おいくつ.'},
{id:'p8',ch:1,title:'Self-introduction expressions',formula:'place から 来ました',source:'PDF p.1 練習C; p.4 練習C1–3',tip:'These are fixed expressions from the supplied pages. Learn each as a whole.'},
{id:'p9',ch:2,title:'This / that is an object',formula:'これ／それ／あれ は N です',source:'PDF p.7 文型1; p.8 練習A1',tip:'これ・それ・あれ stand alone. They do not need a noun immediately after them.'},
{id:'p10',ch:2,title:'Object questions & short replies',formula:'これは N ですか',source:'PDF p.7 例文1–2; p.8 練習B2',tip:'Use はい、そうです for agreement; いいえ、違います is a taught negative reply.'},
{id:'p11',ch:2,title:'What is it?',formula:'これ は 何 ですか',source:'PDF p.7 例文3; p.8 練習A1 / B3',tip:'何 is read なん before ですか.'},
{id:'p12',ch:2,title:'A or B?',formula:'N₁ ですか、N₂ ですか',source:'PDF p.7 例文4; p.8 練習A2',tip:'Both alternatives end with ですか. Answer with the chosen noun + です.'},
{id:'p13',ch:2,title:'Type / topic / language',formula:'N₁ の N₂',source:'PDF p.7 例文5; p.8 練習A3',tip:'The first noun tells the subject, type or language of the second noun. 何の asks which type.'},
{id:'p14',ch:2,title:'Whose object?',formula:'owner の object',source:'PDF p.7 例文6; p.8 練習A4',tip:'だれの asks whose. Keep the owner before の and the object after it.'},
{id:'p15',ch:2,title:'Possession with the noun omitted',formula:'これ は owner の です',source:'PDF p.7 例文7; p.8 練習A5',tip:'の can stand for an already understood object. Keep の before です or じゃありません.'},
{id:'p16',ch:2,title:'This / that + noun',formula:'この N は owner の です',source:'PDF p.7 文型3 / 例文8; p.8 練習A6',tip:'この・その・あの must be immediately followed by a noun. これは and この本は are different structures.'}
];
const SENTENCES=[];
function S(id,prompt,tokens,note='') {const p=PATTERNS.find(x=>x.id===id);SENTENCES.push({id:`${id}-${SENTENCES.filter(s=>s.pattern===id).length+1}`,pattern:id,ch:p.ch,prompt,tokens:tokens.split('|'),note});}
S('p1','I am a student.','わたし|は|学生|です|。');
S('p1','That person is a doctor.','あの|人|は|医者|です|。');
S('p1','I am American.','わたし|は|アメリカ人|です|。');
S('p2','That person is not a student.','あの|人|は|学生|じゃ|ありません|。');
S('p2','I am not a teacher.','わたし|は|教師|では|ありません|。','では ありません is explicitly printed as the alternative in 練習A2.');
S('p2','I am not British.','わたし|は|イギリス人|じゃ|ありません|。');
S('p3','Are you a company employee?','あなた|は|会社員|です|か|。');
S('p3','Yes, I am a student.','はい|、|わたし|は|学生|です|。');
S('p3','No, I am not a student.','いいえ|、|わたし|は|学生|じゃ|ありません|。');
S('p4','Who is that person?','あの|人|は|だれ|です|か|。');
S('p4','Who is that person? (polite)','あの|方|は|どなた|です|か|。');
S('p5','I am a university student.','わたし|は|大学|の|学生|です|。');
S('p5','That person is a university teacher.','あの|人|は|大学|の|先生|です|。');
S('p5','I am a researcher at a hospital.','わたし|は|病院|の|研究者|です|。');
S('p6','I am also a company employee.','わたし|も|会社員|です|。');
S('p6','Are you also a student?','あなた|も|学生|です|か|。');
S('p6','That person is also Indian.','あの|人|も|インド人|です|。');
S('p7','How old are you?','あなた|は|何歳|です|か|。');
S('p7','How old is that person? (polite age question)','あの|人|は|おいくつ|です|か|。');
S('p7','That person is nine years old.','あの|人|は|9歳|です|。','Nine years old appears in Chapter 1 練習A6.');
S('p8','I came from the USA. (omit “I”)','アメリカ|から|来ました|。');
S('p8','This is the teacher.','こちら|は|先生|です|。');
S('p8','Excuse me, your name please?','失礼ですが|、|お名前|は|？');
S('p9','This is a dictionary.','これ|は|辞書|です|。');
S('p9','That is a notebook.','それ|は|ノート|です|。');
S('p9','That over there is a desk.','あれ|は|机|です|。');
S('p10','Is this a ballpoint pen?','これ|は|ボールペン|です|か|。');
S('p10','Yes, that is right.','はい|、|そう|です|。');
S('p10','No, that is not correct.','いいえ|、|違います|。');
S('p10','No, it is a personal organiser.','いいえ|、|手帳|です|。');
S('p11','What is that?','それ|は|何|です|か|。');
S('p11','What is this?','これ|は|何|です|か|。');
S('p11','It is a business card. (short answer)','名刺|です|。');
S('p12','Is that a ballpoint pen or a mechanical pencil?','それ|は|ボールペン|ですか|、|シャープペンシル|ですか|。');
S('p12','Is this a book or a magazine?','これ|は|本|ですか|、|雑誌|ですか|。');
S('p13','This is a Japanese-language book.','これ|は|日本語|の|本|です|。');
S('p13','What is that magazine about?','それ|は|何|の|雑誌|です|か|。');
S('p13','It is a computer magazine. (short answer)','コンピューター|の|雑誌|です|。');
S('p13','That is a car key.','それ|は|車|の|かぎ|です|。');
S('p14','Whose bag is that over there?','あれ|は|だれ|の|かばん|です|か|。');
S('p14','That is my umbrella.','それ|は|わたし|の|傘|です|。');
S('p14','That over there is the teacher’s bag.','あれ|は|先生|の|かばん|です|。');
S('p15','Is this yours?','これ|は|あなた|の|です|か|。');
S('p15','That over there is mine.','あれ|は|わたし|の|です|。');
S('p15','No, it is not mine. (short answer)','いいえ|、|わたし|の|じゃ|ありません|。');
S('p15','Whose is that over there?','あれ|は|だれ|の|です|か|。');
S('p16','This book is mine.','この|本|は|わたし|の|です|。');
S('p16','Whose is this key?','この|かぎ|は|だれ|の|です|か|。');
S('p16','That umbrella is the teacher’s.','その|傘|は|先生|の|です|。');
S('p16','That book over there is mine.','あの|本|は|わたし|の|です|。');
if(typeof module!=='undefined') module.exports={WORDS,PATTERNS,SENTENCES};

// BEGIN CHAPTER CSV IMPORT
// Generated by scripts/import-chapters.cjs; source spelling is retained in sources.
const CHAPTER_IMPORT_WORDS=[
  {
    "id": "1-01",
    "ch": 1,
    "group": "core",
    "zh": "我",
    "en": "I / me",
    "jp": "わたし",
    "kana": "わたし",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "5cb2a95d44aa80b6"
    ],
    "sources": [
      {
        "key": "5cb2a95d44aa80b6",
        "japanese": "わたし",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-02",
    "ch": 1,
    "group": "core",
    "zh": "你、您",
    "en": "you",
    "jp": "あなた",
    "kana": "あなた",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "18d84a80f441c335"
    ],
    "sources": [
      {
        "key": "18d84a80f441c335",
        "japanese": "あなた",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-03a",
    "ch": 1,
    "group": "core",
    "zh": "那個人",
    "en": "that person",
    "jp": "あのひと",
    "kana": "あのひと",
    "c": "あの人",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "7e17c14f11bda279"
    ],
    "sources": [
      {
        "key": "7e17c14f11bda279",
        "japanese": "あの ひと",
        "kanji": "あの 人",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-03b",
    "ch": 1,
    "group": "core",
    "zh": "那位（禮貌說法）",
    "en": "that person (polite)",
    "jp": "あのかた",
    "kana": "あのかた",
    "c": "あの方",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "7d5d4abb154f0198"
    ],
    "sources": [
      {
        "key": "7d5d4abb154f0198",
        "japanese": "あの かた",
        "kanji": "あの 方",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-04",
    "ch": 1,
    "group": "core",
    "zh": "～先生／小姐／女士（姓名後）",
    "en": "Mr / Ms (name suffix)",
    "jp": "さん",
    "kana": "さん",
    "c": "X",
    "note": "A suffix after a person’s name.",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "6ed384e8b3dc97dd"
    ],
    "sources": [
      {
        "key": "6ed384e8b3dc97dd",
        "japanese": "～さん",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-05",
    "ch": 1,
    "group": "core",
    "zh": "～（小孩名字後的稱呼）",
    "en": "affectionate name suffix for children",
    "jp": "ちゃん",
    "kana": "ちゃん",
    "c": "X",
    "note": "A suffix after a child’s name.",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "a216ec72bf097a6a"
    ],
    "sources": [
      {
        "key": "a216ec72bf097a6a",
        "japanese": "～ちゃん",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-06",
    "ch": 1,
    "group": "core",
    "zh": "～人（國籍後綴）",
    "en": "nationality suffix",
    "jp": "じん",
    "kana": "じん",
    "c": "人",
    "note": "Learn the suffix; the ～ is a placeholder.",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "7923bf9a80ffd8ae"
    ],
    "sources": [
      {
        "key": "7923bf9a80ffd8ae",
        "japanese": "～じん",
        "kanji": "～人",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-07",
    "ch": 1,
    "group": "core",
    "zh": "老師（稱呼別人）",
    "en": "teacher (when referring to someone else)",
    "jp": "せんせい",
    "kana": "せんせい",
    "c": "先生",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "d45339534b9353be"
    ],
    "sources": [
      {
        "key": "d45339534b9353be",
        "japanese": "せんせい",
        "kanji": "先生",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-08",
    "ch": 1,
    "group": "core",
    "zh": "教師（職業）",
    "en": "teacher (occupation)",
    "jp": "きょうし",
    "kana": "きょうし",
    "c": "教師",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "af797490c8d9ba68"
    ],
    "sources": [
      {
        "key": "af797490c8d9ba68",
        "japanese": "きょうし",
        "kanji": "教師",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-09",
    "ch": 1,
    "group": "core",
    "zh": "學生",
    "en": "student",
    "jp": "がくせい",
    "kana": "がくせい",
    "c": "学生",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "bae31b349a59d900"
    ],
    "sources": [
      {
        "key": "bae31b349a59d900",
        "japanese": "がくせい",
        "kanji": "学生",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-10",
    "ch": 1,
    "group": "core",
    "zh": "公司職員",
    "en": "company employee",
    "jp": "かいしゃいん",
    "kana": "かいしゃいん",
    "c": "会社員",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "1a6a557ea348152d"
    ],
    "sources": [
      {
        "key": "1a6a557ea348152d",
        "japanese": "かいしゃいん",
        "kanji": "会社員",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-11",
    "ch": 1,
    "group": "core",
    "zh": "職員（配合公司名稱）",
    "en": "employee of a named company",
    "jp": "しゃいん",
    "kana": "しゃいん",
    "c": "社員",
    "note": "Used with a company name.",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "fb5a72245fda2b36"
    ],
    "sources": [
      {
        "key": "fb5a72245fda2b36",
        "japanese": "しゃいん",
        "kanji": "社員",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-12",
    "ch": 1,
    "group": "core",
    "zh": "銀行行員",
    "en": "bank employee",
    "jp": "ぎんこういん",
    "kana": "ぎんこういん",
    "c": "銀行員",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "1e679ef3fdff3987"
    ],
    "sources": [
      {
        "key": "1e679ef3fdff3987",
        "japanese": "ぎんこういん",
        "kanji": "銀行員",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-13",
    "ch": 1,
    "group": "core",
    "zh": "醫生",
    "en": "doctor",
    "jp": "いしゃ",
    "kana": "いしゃ",
    "c": "医者",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "5c6b2d65aa3b0ab4"
    ],
    "sources": [
      {
        "key": "5c6b2d65aa3b0ab4",
        "japanese": "いしゃ",
        "kanji": "医者",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-14",
    "ch": 1,
    "group": "core",
    "zh": "研究人員",
    "en": "researcher",
    "jp": "けんきゅうしゃ",
    "kana": "けんきゅうしゃ",
    "c": "研究者",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "af01764d4908b28b"
    ],
    "sources": [
      {
        "key": "af01764d4908b28b",
        "japanese": "けんきゅうしゃ",
        "kanji": "研究者",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-15",
    "ch": 1,
    "group": "core",
    "zh": "大學",
    "en": "university",
    "jp": "だいがく",
    "kana": "だいがく",
    "c": "大学",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "987dcb74d12252cd"
    ],
    "sources": [
      {
        "key": "987dcb74d12252cd",
        "japanese": "だいがく",
        "kanji": "大学",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-16",
    "ch": 1,
    "group": "core",
    "zh": "醫院",
    "en": "hospital",
    "jp": "びょういん",
    "kana": "びょういん",
    "c": "病院",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "802fdecd61b640ee"
    ],
    "sources": [
      {
        "key": "802fdecd61b640ee",
        "japanese": "びょういん",
        "kanji": "病院",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-17a",
    "ch": 1,
    "group": "core",
    "zh": "誰",
    "en": "who",
    "jp": "だれ",
    "kana": "だれ",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "b11af3449d5b847e"
    ],
    "sources": [
      {
        "key": "b11af3449d5b847e",
        "japanese": "だれ",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-17b",
    "ch": 1,
    "group": "core",
    "zh": "哪位（禮貌說法）",
    "en": "who (polite)",
    "jp": "どなた",
    "kana": "どなた",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "30e5317d232c66c2"
    ],
    "sources": [
      {
        "key": "30e5317d232c66c2",
        "japanese": "どなた",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-18",
    "ch": 1,
    "group": "core",
    "zh": "～歲（年齡後綴）",
    "en": "years old (suffix)",
    "jp": "さい",
    "kana": "さい",
    "c": "歳",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "d6bf9310dda3d271"
    ],
    "sources": [
      {
        "key": "d6bf9310dda3d271",
        "japanese": "…さい",
        "kanji": "…歳",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-19a",
    "ch": 1,
    "group": "core",
    "zh": "幾歲",
    "en": "how old",
    "jp": "なんさい",
    "kana": "なんさい",
    "c": "何歳",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "4b81494c6c734fac"
    ],
    "sources": [
      {
        "key": "4b81494c6c734fac",
        "japanese": "なんさい",
        "kanji": "何歳",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-19b",
    "ch": 1,
    "group": "core",
    "zh": "幾歲（禮貌說法）",
    "en": "how old (polite)",
    "jp": "おいくつ",
    "kana": "おいくつ",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "16f7ad2d7d4a3625"
    ],
    "sources": [
      {
        "key": "16f7ad2d7d4a3625",
        "japanese": "おいくつ",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-20",
    "ch": 1,
    "group": "core",
    "zh": "是、對",
    "en": "yes",
    "jp": "はい",
    "kana": "はい",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "31db6e7b4d696259"
    ],
    "sources": [
      {
        "key": "31db6e7b4d696259",
        "japanese": "はい",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-21",
    "ch": 1,
    "group": "core",
    "zh": "不、不是",
    "en": "no",
    "jp": "いいえ",
    "kana": "いいえ",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "17606cdd831685a5"
    ],
    "sources": [
      {
        "key": "17606cdd831685a5",
        "japanese": "いいえ",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-c1",
    "ch": 1,
    "group": "phrases",
    "zh": "初次見面",
    "en": "nice to meet you",
    "jp": "はじめまして",
    "kana": "はじめまして",
    "c": "初めまして",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "c51b3ef7520b5373"
    ],
    "sources": [
      {
        "key": "c51b3ef7520b5373",
        "japanese": "はじめまして。",
        "kanji": "初めまして。",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-c2",
    "ch": 1,
    "group": "phrases",
    "zh": "從～來的",
    "en": "came from …",
    "jp": "～からきました",
    "kana": "～からきました",
    "c": "～から来ました",
    "note": "The place before から is a placeholder, not part of this card’s answer.",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "53d45d8a22601b0a"
    ],
    "sources": [
      {
        "key": "53d45d8a22601b0a",
        "japanese": "～から きました。",
        "kanji": "～から 来ました。",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-c3a",
    "ch": 1,
    "group": "phrases",
    "zh": "請多指教（簡短）",
    "en": "pleased to meet you (short form)",
    "jp": "よろしく",
    "kana": "よろしく",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "ef902d0677063d33",
      "79701d45dc9c2307"
    ],
    "sources": [
      {
        "key": "ef902d0677063d33",
        "japanese": "[どうぞ] よろしく [おねがいします]。",
        "kanji": "[どうぞ] よろしく [お願いします]。",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      },
      {
        "key": "79701d45dc9c2307",
        "japanese": "よろしく [おねがいします]",
        "kanji": "よろしく [お願いします]",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-c3b",
    "ch": 1,
    "group": "phrases",
    "zh": "請多指教（加「どうぞ」）",
    "en": "pleased to meet you (with どうぞ)",
    "jp": "どうぞよろしく",
    "kana": "どうぞよろしく",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "ef902d0677063d33"
    ],
    "sources": [
      {
        "key": "ef902d0677063d33",
        "japanese": "[どうぞ] よろしく [おねがいします]。",
        "kanji": "[どうぞ] よろしく [お願いします]。",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-c3c",
    "ch": 1,
    "group": "phrases",
    "zh": "請多指教（加「おねがいします」）",
    "en": "pleased to meet you (with おねがいします)",
    "jp": "よろしくおねがいします",
    "kana": "よろしくおねがいします",
    "c": "よろしくお願いします",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "ef902d0677063d33",
      "79701d45dc9c2307"
    ],
    "sources": [
      {
        "key": "ef902d0677063d33",
        "japanese": "[どうぞ] よろしく [おねがいします]。",
        "kanji": "[どうぞ] よろしく [お願いします]。",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      },
      {
        "key": "79701d45dc9c2307",
        "japanese": "よろしく [おねがいします]",
        "kanji": "よろしく [お願いします]",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-c3d",
    "ch": 1,
    "group": "phrases",
    "zh": "請多指教（完整形式）",
    "en": "pleased to meet you (full form)",
    "jp": "どうぞよろしくおねがいします",
    "kana": "どうぞよろしくおねがいします",
    "c": "どうぞよろしくお願いします",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "ef902d0677063d33"
    ],
    "sources": [
      {
        "key": "ef902d0677063d33",
        "japanese": "[どうぞ] よろしく [おねがいします]。",
        "kanji": "[どうぞ] よろしく [お願いします]。",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-c4",
    "ch": 1,
    "group": "phrases",
    "zh": "抱歉，請問……",
    "en": "excuse me, but …",
    "jp": "しつれいですが",
    "kana": "しつれいですが",
    "c": "失礼ですが",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "f91bea684069793a"
    ],
    "sources": [
      {
        "key": "f91bea684069793a",
        "japanese": "しつれいですが",
        "kanji": "失礼ですが",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-c5",
    "ch": 1,
    "group": "phrases",
    "zh": "請問您貴姓？",
    "en": "your name, please?",
    "jp": "おなまえは",
    "kana": "おなまえは",
    "c": "お名前は",
    "note": "The final は is the particle は. Punctuation is optional in practice.",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "718620198081eaed"
    ],
    "sources": [
      {
        "key": "718620198081eaed",
        "japanese": "おなまえは？",
        "kanji": "お名前は？",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-c6",
    "ch": 1,
    "group": "phrases",
    "zh": "這位是～先生／小姐",
    "en": "this is Mr / Ms …",
    "jp": "こちらは～さんです",
    "kana": "こちらは～さんです",
    "c": "X",
    "note": "Book template: こちらは ～さんです。The name placeholder is omitted from the answer.",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "61a4cdbe6664dfc4"
    ],
    "sources": [
      {
        "key": "61a4cdbe6664dfc4",
        "japanese": "こちらは ～さんです。",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-r1",
    "ch": 1,
    "group": "related",
    "zh": "美國",
    "en": "USA",
    "jp": "アメリカ",
    "kana": "あめりか",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "2e32fa331065bab8"
    ],
    "sources": [
      {
        "key": "2e32fa331065bab8",
        "japanese": "アメリカ",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-r2",
    "ch": 1,
    "group": "related",
    "zh": "英國",
    "en": "UK",
    "jp": "イギリス",
    "kana": "いぎりす",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "3fca01660666d979"
    ],
    "sources": [
      {
        "key": "3fca01660666d979",
        "japanese": "イギリス",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-r3",
    "ch": 1,
    "group": "related",
    "zh": "印度",
    "en": "India",
    "jp": "インド",
    "kana": "いんど",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "d51cde1829c0d31e"
    ],
    "sources": [
      {
        "key": "d51cde1829c0d31e",
        "japanese": "インド",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-r4",
    "ch": 1,
    "group": "related",
    "zh": "印尼",
    "en": "Indonesia",
    "jp": "インドネシア",
    "kana": "いんどねしあ",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "fc3a2f6e553d17a7"
    ],
    "sources": [
      {
        "key": "fc3a2f6e553d17a7",
        "japanese": "インドネシア",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-r5",
    "ch": 1,
    "group": "related",
    "zh": "韓國",
    "en": "South Korea",
    "jp": "かんこく",
    "kana": "かんこく",
    "c": "韓国",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "a3c3b9dd3a5c1b4f"
    ],
    "sources": [
      {
        "key": "a3c3b9dd3a5c1b4f",
        "japanese": "かんこく",
        "kanji": "韓国",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-r6",
    "ch": 1,
    "group": "related",
    "zh": "泰國",
    "en": "Thailand",
    "jp": "タイ",
    "kana": "たい",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "3e921ad5218f08b7"
    ],
    "sources": [
      {
        "key": "3e921ad5218f08b7",
        "japanese": "タイ",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-r7",
    "ch": 1,
    "group": "related",
    "zh": "中國",
    "en": "China",
    "jp": "ちゅうごく",
    "kana": "ちゅうごく",
    "c": "中国",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "b0c8c285237a8d9f"
    ],
    "sources": [
      {
        "key": "b0c8c285237a8d9f",
        "japanese": "ちゅうごく",
        "kanji": "中国",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-r8",
    "ch": 1,
    "group": "related",
    "zh": "德國",
    "en": "Germany",
    "jp": "ドイツ",
    "kana": "どいつ",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "8b81c39bd7755c81"
    ],
    "sources": [
      {
        "key": "8b81c39bd7755c81",
        "japanese": "ドイツ",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-r9",
    "ch": 1,
    "group": "related",
    "zh": "日本",
    "en": "Japan",
    "jp": "にほん",
    "kana": "にほん",
    "c": "日本",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "755deff93bb4f6f2"
    ],
    "sources": [
      {
        "key": "755deff93bb4f6f2",
        "japanese": "にほん",
        "kanji": "日本",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "1-r10",
    "ch": 1,
    "group": "related",
    "zh": "巴西",
    "en": "Brazil",
    "jp": "ブラジル",
    "kana": "ぶらじる",
    "c": "X",
    "note": "",
    "page": 1,
    "chapters": [
      1
    ],
    "csvKeys": [
      "bc01c0fd2afcf149"
    ],
    "sources": [
      {
        "key": "bc01c0fd2afcf149",
        "japanese": "ブラジル",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-01",
    "ch": 2,
    "group": "core",
    "zh": "這（靠近說話者）",
    "en": "this (near speaker)",
    "jp": "これ",
    "kana": "これ",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "f5d4ba1e011d4b9e"
    ],
    "sources": [
      {
        "key": "f5d4ba1e011d4b9e",
        "japanese": "これ",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-02",
    "ch": 2,
    "group": "core",
    "zh": "那（靠近聽話者）",
    "en": "that (near listener)",
    "jp": "それ",
    "kana": "それ",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "cbd682eb4e56ebee"
    ],
    "sources": [
      {
        "key": "cbd682eb4e56ebee",
        "japanese": "それ",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-03",
    "ch": 2,
    "group": "core",
    "zh": "那（離雙方都遠）",
    "en": "that over there (far from both)",
    "jp": "あれ",
    "kana": "あれ",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "6a112311b420147e"
    ],
    "sources": [
      {
        "key": "6a112311b420147e",
        "japanese": "あれ",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-04",
    "ch": 2,
    "group": "core",
    "zh": "這個～（後接名詞）",
    "en": "this … (before a noun)",
    "jp": "この",
    "kana": "この",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "34da4f2b402f5474"
    ],
    "sources": [
      {
        "key": "34da4f2b402f5474",
        "japanese": "この～",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-05",
    "ch": 2,
    "group": "core",
    "zh": "那個～（靠近聽話者，後接名詞）",
    "en": "that … (before a noun, near listener)",
    "jp": "その",
    "kana": "その",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "dedbea504fafbae2"
    ],
    "sources": [
      {
        "key": "dedbea504fafbae2",
        "japanese": "その～",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-06",
    "ch": 2,
    "group": "core",
    "zh": "那個～（離雙方遠，後接名詞）",
    "en": "that … over there (before a noun)",
    "jp": "あの",
    "kana": "あの",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "a199691dd3701b11"
    ],
    "sources": [
      {
        "key": "a199691dd3701b11",
        "japanese": "あの～",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-07",
    "ch": 2,
    "group": "core",
    "zh": "書",
    "en": "book",
    "jp": "ほん",
    "kana": "ほん",
    "c": "本",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "bd3ae96755c4926a"
    ],
    "sources": [
      {
        "key": "bd3ae96755c4926a",
        "japanese": "ほん",
        "kanji": "本",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-08",
    "ch": 2,
    "group": "core",
    "zh": "字典",
    "en": "dictionary",
    "jp": "じしょ",
    "kana": "じしょ",
    "c": "辞書",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "74c5059c028efe5a"
    ],
    "sources": [
      {
        "key": "74c5059c028efe5a",
        "japanese": "じしょ",
        "kanji": "辞書",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-09",
    "ch": 2,
    "group": "core",
    "zh": "雜誌",
    "en": "magazine",
    "jp": "ざっし",
    "kana": "ざっし",
    "c": "雑誌",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "c050750f714680da"
    ],
    "sources": [
      {
        "key": "c050750f714680da",
        "japanese": "ざっし",
        "kanji": "雑誌",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-10",
    "ch": 2,
    "group": "core",
    "zh": "報紙",
    "en": "newspaper",
    "jp": "しんぶん",
    "kana": "しんぶん",
    "c": "新聞",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "3ac20e7d7ef68fd2"
    ],
    "sources": [
      {
        "key": "3ac20e7d7ef68fd2",
        "japanese": "しんぶん",
        "kanji": "新聞",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-11",
    "ch": 2,
    "group": "core",
    "zh": "筆記本",
    "en": "notebook",
    "jp": "ノート",
    "kana": "のーと",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "0960ee3637024f60"
    ],
    "sources": [
      {
        "key": "0960ee3637024f60",
        "japanese": "ノート",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-12",
    "ch": 2,
    "group": "core",
    "zh": "記事本",
    "en": "personal organiser",
    "jp": "てちょう",
    "kana": "てちょう",
    "c": "手帳",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "fdcca4f525b6d797"
    ],
    "sources": [
      {
        "key": "fdcca4f525b6d797",
        "japanese": "てちょう",
        "kanji": "手帳",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-13",
    "ch": 2,
    "group": "core",
    "zh": "名片",
    "en": "business card",
    "jp": "めいし",
    "kana": "めいし",
    "c": "名刺",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "7e805a2fa1d38faa"
    ],
    "sources": [
      {
        "key": "7e805a2fa1d38faa",
        "japanese": "めいし",
        "kanji": "名刺",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-14",
    "ch": 2,
    "group": "core",
    "zh": "卡片",
    "en": "card",
    "jp": "カード",
    "kana": "かーど",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "2d75f6792a4271f2"
    ],
    "sources": [
      {
        "key": "2d75f6792a4271f2",
        "japanese": "カード",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-15",
    "ch": 2,
    "group": "core",
    "zh": "鉛筆",
    "en": "pencil",
    "jp": "えんぴつ",
    "kana": "えんぴつ",
    "c": "鉛筆",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "06cb1a497a204535"
    ],
    "sources": [
      {
        "key": "06cb1a497a204535",
        "japanese": "えんぴつ",
        "kanji": "鉛筆",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-16",
    "ch": 2,
    "group": "core",
    "zh": "原子筆",
    "en": "ballpoint pen",
    "jp": "ボールペン",
    "kana": "ぼーるぺん",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "2d4934f73d66daf1"
    ],
    "sources": [
      {
        "key": "2d4934f73d66daf1",
        "japanese": "ボールペン",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-17",
    "ch": 2,
    "group": "core",
    "zh": "自動鉛筆",
    "en": "mechanical pencil",
    "jp": "シャープペンシル",
    "kana": "しゃーぷぺんしる",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "1b5c50617bb61654"
    ],
    "sources": [
      {
        "key": "1b5c50617bb61654",
        "japanese": "シャープペンシル",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-18",
    "ch": 2,
    "group": "core",
    "zh": "鑰匙",
    "en": "key",
    "jp": "かぎ",
    "kana": "かぎ",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "7ebd93fd4b02a61d"
    ],
    "sources": [
      {
        "key": "7ebd93fd4b02a61d",
        "japanese": "かぎ",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-19",
    "ch": 2,
    "group": "core",
    "zh": "鐘錶",
    "en": "clock / watch",
    "jp": "とけい",
    "kana": "とけい",
    "c": "時計",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "eac539909572a77c"
    ],
    "sources": [
      {
        "key": "eac539909572a77c",
        "japanese": "とけい",
        "kanji": "時計",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-20",
    "ch": 2,
    "group": "core",
    "zh": "傘",
    "en": "umbrella",
    "jp": "かさ",
    "kana": "かさ",
    "c": "傘",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "36e9f822625987c1"
    ],
    "sources": [
      {
        "key": "36e9f822625987c1",
        "japanese": "かさ",
        "kanji": "傘",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-21",
    "ch": 2,
    "group": "core",
    "zh": "皮包、提包",
    "en": "bag",
    "jp": "かばん",
    "kana": "かばん",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "6fcb7aeab3e58b9a"
    ],
    "sources": [
      {
        "key": "6fcb7aeab3e58b9a",
        "japanese": "かばん",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-22",
    "ch": 2,
    "group": "core",
    "zh": "CD、光碟",
    "en": "CD",
    "jp": "シーディー",
    "kana": "しーでぃー",
    "c": "X",
    "note": "The book also prints CD.",
    "page": 6
  },
  {
    "id": "2-23",
    "ch": 2,
    "group": "core",
    "zh": "電視",
    "en": "television",
    "jp": "テレビ",
    "kana": "てれび",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "0ead62107c8b4266"
    ],
    "sources": [
      {
        "key": "0ead62107c8b4266",
        "japanese": "テレビ",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-24",
    "ch": 2,
    "group": "core",
    "zh": "收音機",
    "en": "radio",
    "jp": "ラジオ",
    "kana": "らじお",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "4159b6b97b7bd66f"
    ],
    "sources": [
      {
        "key": "4159b6b97b7bd66f",
        "japanese": "ラジオ",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-25",
    "ch": 2,
    "group": "core",
    "zh": "照相機",
    "en": "camera",
    "jp": "カメラ",
    "kana": "かめら",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "c494043cd132a433"
    ],
    "sources": [
      {
        "key": "c494043cd132a433",
        "japanese": "カメラ",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-26",
    "ch": 2,
    "group": "core",
    "zh": "電腦",
    "en": "computer",
    "jp": "コンピューター",
    "kana": "こんぴゅーたー",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "896594742570bce2"
    ],
    "sources": [
      {
        "key": "896594742570bce2",
        "japanese": "コンピューター",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-27",
    "ch": 2,
    "group": "core",
    "zh": "汽車",
    "en": "car",
    "jp": "くるま",
    "kana": "くるま",
    "c": "車",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "3d1d6539e166dfa5"
    ],
    "sources": [
      {
        "key": "3d1d6539e166dfa5",
        "japanese": "くるま",
        "kanji": "車",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-28",
    "ch": 2,
    "group": "core",
    "zh": "桌子",
    "en": "desk",
    "jp": "つくえ",
    "kana": "つくえ",
    "c": "机",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "379ac285dbeb08d1"
    ],
    "sources": [
      {
        "key": "379ac285dbeb08d1",
        "japanese": "つくえ",
        "kanji": "机",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-29",
    "ch": 2,
    "group": "core",
    "zh": "椅子",
    "en": "chair",
    "jp": "いす",
    "kana": "いす",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "012749d3c63a6baf"
    ],
    "sources": [
      {
        "key": "012749d3c63a6baf",
        "japanese": "いす",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-30",
    "ch": 2,
    "group": "core",
    "zh": "巧克力",
    "en": "chocolate",
    "jp": "チョコレート",
    "kana": "ちょこれーと",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "b08c8de1c01eb7d8"
    ],
    "sources": [
      {
        "key": "b08c8de1c01eb7d8",
        "japanese": "チョコレート",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-31",
    "ch": 2,
    "group": "core",
    "zh": "咖啡",
    "en": "coffee",
    "jp": "コーヒー",
    "kana": "こーひー",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "260ab5b2ee741327"
    ],
    "sources": [
      {
        "key": "260ab5b2ee741327",
        "japanese": "コーヒー",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-32a",
    "ch": 2,
    "group": "core",
    "zh": "伴手禮、土產（無「お」）",
    "en": "souvenir (without お)",
    "jp": "みやげ",
    "kana": "みやげ",
    "c": "土産",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "d591980e1a5db783"
    ],
    "sources": [
      {
        "key": "d591980e1a5db783",
        "japanese": "みやげ",
        "kanji": "土産",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-32b",
    "ch": 2,
    "group": "core",
    "zh": "伴手禮、土產（加「お」）",
    "en": "souvenir (with お)",
    "jp": "おみやげ",
    "kana": "おみやげ",
    "c": "お土産",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "1929b8e38c24259e"
    ],
    "sources": [
      {
        "key": "1929b8e38c24259e",
        "japanese": "おみやげ",
        "kanji": "お土産",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-33",
    "ch": 2,
    "group": "core",
    "zh": "英語",
    "en": "English language",
    "jp": "えいご",
    "kana": "えいご",
    "c": "英語",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "42c97cbe21fb5580"
    ],
    "sources": [
      {
        "key": "42c97cbe21fb5580",
        "japanese": "えいご",
        "kanji": "英語",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-34",
    "ch": 2,
    "group": "core",
    "zh": "日語",
    "en": "Japanese language",
    "jp": "にほんご",
    "kana": "にほんご",
    "c": "日本語",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "5f55b8121cd43e3c"
    ],
    "sources": [
      {
        "key": "5f55b8121cd43e3c",
        "japanese": "にほんご",
        "kanji": "日本語",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-35",
    "ch": 2,
    "group": "core",
    "zh": "～語（語言後綴）",
    "en": "language suffix",
    "jp": "ご",
    "kana": "ご",
    "c": "語",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "7838dde1bf0e354b"
    ],
    "sources": [
      {
        "key": "7838dde1bf0e354b",
        "japanese": "～ご",
        "kanji": "～語",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-36",
    "ch": 2,
    "group": "core",
    "zh": "什麼",
    "en": "what",
    "jp": "なん",
    "kana": "なん",
    "c": "何",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "92bfa4c96fef7edb"
    ],
    "sources": [
      {
        "key": "92bfa4c96fef7edb",
        "japanese": "なん",
        "kanji": "何",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-37",
    "ch": 2,
    "group": "core",
    "zh": "是的（表示同意）",
    "en": "so / that is right",
    "jp": "そう",
    "kana": "そう",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "96461fb84add5417"
    ],
    "sources": [
      {
        "key": "96461fb84add5417",
        "japanese": "そう",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-d1",
    "ch": 2,
    "group": "phrases",
    "zh": "今後將承蒙您的照顧",
    "en": "I look forward to your kindness",
    "jp": "これからおせわになります",
    "kana": "これからおせわになります",
    "c": "これからお世話になります",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "9467faf8f054b7b7"
    ],
    "sources": [
      {
        "key": "9467faf8f054b7b7",
        "japanese": "これから おせわに なります。",
        "kanji": "これから お世話に なります。",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-d2a",
    "ch": 2,
    "group": "phrases",
    "zh": "哪裡哪裡，也請多多指教（簡短）",
    "en": "the pleasure is mine (short)",
    "jp": "こちらこそよろしく",
    "kana": "こちらこそよろしく",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "607700a9870de87d"
    ],
    "sources": [
      {
        "key": "607700a9870de87d",
        "japanese": "こちらこそ [どうぞ] よろしく [おねがいします]。",
        "kanji": "こちらこそ [どうぞ] よろしく [お願いします]。",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-d2b",
    "ch": 2,
    "group": "phrases",
    "zh": "也請多多指教（加「どうぞ」）",
    "en": "the pleasure is mine (with どうぞ)",
    "jp": "こちらこそどうぞよろしく",
    "kana": "こちらこそどうぞよろしく",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "607700a9870de87d"
    ],
    "sources": [
      {
        "key": "607700a9870de87d",
        "japanese": "こちらこそ [どうぞ] よろしく [おねがいします]。",
        "kanji": "こちらこそ [どうぞ] よろしく [お願いします]。",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-d2c",
    "ch": 2,
    "group": "phrases",
    "zh": "也請多多指教（加「おねがいします」）",
    "en": "the pleasure is mine (with おねがいします)",
    "jp": "こちらこそよろしくおねがいします",
    "kana": "こちらこそよろしくおねがいします",
    "c": "こちらこそよろしくお願いします",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "607700a9870de87d"
    ],
    "sources": [
      {
        "key": "607700a9870de87d",
        "japanese": "こちらこそ [どうぞ] よろしく [おねがいします]。",
        "kanji": "こちらこそ [どうぞ] よろしく [お願いします]。",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-d2d",
    "ch": 2,
    "group": "phrases",
    "zh": "也請多多指教（完整形式）",
    "en": "the pleasure is mine (full form)",
    "jp": "こちらこそどうぞよろしくおねがいします",
    "kana": "こちらこそどうぞよろしくおねがいします",
    "c": "こちらこそどうぞよろしくお願いします",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "607700a9870de87d"
    ],
    "sources": [
      {
        "key": "607700a9870de87d",
        "japanese": "こちらこそ [どうぞ] よろしく [おねがいします]。",
        "kanji": "こちらこそ [どうぞ] よろしく [お願いします]。",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-c1",
    "ch": 2,
    "group": "phrases",
    "zh": "那個……（客氣地打招呼）",
    "en": "um / excuse me …",
    "jp": "あのう",
    "kana": "あのう",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "a9abb8fd8d23836d"
    ],
    "sources": [
      {
        "key": "a9abb8fd8d23836d",
        "japanese": "あのう",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-c2",
    "ch": 2,
    "group": "phrases",
    "zh": "咦！（驚訝時）",
    "en": "oh! / what? (surprise)",
    "jp": "えっ",
    "kana": "えっ",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "23a5e8a76ba7128f"
    ],
    "sources": [
      {
        "key": "23a5e8a76ba7128f",
        "japanese": "えっ",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-c3",
    "ch": 2,
    "group": "phrases",
    "zh": "請（讓別人做某事時）",
    "en": "please / here you are",
    "jp": "どうぞ",
    "kana": "どうぞ",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "9955f303f18b3bbf"
    ],
    "sources": [
      {
        "key": "9955f303f18b3bbf",
        "japanese": "どうぞ。",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-c4a",
    "ch": 2,
    "group": "phrases",
    "zh": "謝謝（簡短）",
    "en": "thank you (short)",
    "jp": "ありがとう",
    "kana": "ありがとう",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "b0b17df8cc17ef70",
      "ae9cef3f7d7eafa8"
    ],
    "sources": [
      {
        "key": "b0b17df8cc17ef70",
        "japanese": "ありがとう [ございます]。",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      },
      {
        "key": "ae9cef3f7d7eafa8",
        "japanese": "[どうも] ありがとう [ございます]。",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-c4b",
    "ch": 2,
    "group": "phrases",
    "zh": "謝謝（加「どうも」）",
    "en": "thank you (with どうも)",
    "jp": "どうもありがとう",
    "kana": "どうもありがとう",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "ae9cef3f7d7eafa8"
    ],
    "sources": [
      {
        "key": "ae9cef3f7d7eafa8",
        "japanese": "[どうも] ありがとう [ございます]。",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-c4c",
    "ch": 2,
    "group": "phrases",
    "zh": "謝謝（禮貌形式）",
    "en": "thank you (polite)",
    "jp": "ありがとうございます",
    "kana": "ありがとうございます",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "b0b17df8cc17ef70",
      "ae9cef3f7d7eafa8"
    ],
    "sources": [
      {
        "key": "b0b17df8cc17ef70",
        "japanese": "ありがとう [ございます]。",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      },
      {
        "key": "ae9cef3f7d7eafa8",
        "japanese": "[どうも] ありがとう [ございます]。",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-c4d",
    "ch": 2,
    "group": "phrases",
    "zh": "非常感謝（完整形式）",
    "en": "thank you very much (full form)",
    "jp": "どうもありがとうございます",
    "kana": "どうもありがとうございます",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "ae9cef3f7d7eafa8"
    ],
    "sources": [
      {
        "key": "ae9cef3f7d7eafa8",
        "japanese": "[どうも] ありがとう [ございます]。",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-c5",
    "ch": 2,
    "group": "phrases",
    "zh": "這樣啊",
    "en": "I see",
    "jp": "そうですか",
    "kana": "そうですか",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "3e3035d202e8470e"
    ],
    "sources": [
      {
        "key": "3e3035d202e8470e",
        "japanese": "そうですか。",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-c6",
    "ch": 2,
    "group": "phrases",
    "zh": "不是／不對",
    "en": "that is not correct",
    "jp": "ちがいます",
    "kana": "ちがいます",
    "c": "違います",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "f0dabcd02d76ec17"
    ],
    "sources": [
      {
        "key": "f0dabcd02d76ec17",
        "japanese": "ちがいます。",
        "kanji": "違います。",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "2-c7",
    "ch": 2,
    "group": "phrases",
    "zh": "啊（意識到某事時）",
    "en": "ah (realisation)",
    "jp": "あ",
    "kana": "あ",
    "c": "X",
    "note": "",
    "page": 6,
    "chapters": [
      2
    ],
    "csvKeys": [
      "7754ab78818956ad"
    ],
    "sources": [
      {
        "key": "7754ab78818956ad",
        "japanese": "あ",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": []
  },
  {
    "id": "csv-3c7d4b08462bc4f1",
    "ch": 1,
    "chapters": [
      1
    ],
    "group": "core",
    "jp": "アイエムシー(IMC)",
    "kana": "",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "3c7d4b08462bc4f1"
    ],
    "sources": [
      {
        "key": "3c7d4b08462bc4f1",
        "japanese": "アイエムシー(IMC)",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-7177af3f64881d19",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "あいます[ともだちに～]",
    "kana": "",
    "c": "会います[友達に～]",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "7177af3f64881d19"
    ],
    "sources": [
      {
        "key": "7177af3f64881d19",
        "japanese": "あいます[ともだちに～]",
        "kanji": "会います[友達に～]",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-388af0640c608442",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "あさ",
    "kana": "あさ",
    "c": "朝",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "388af0640c608442"
    ],
    "sources": [
      {
        "key": "388af0640c608442",
        "japanese": "あさ",
        "kanji": "朝",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-49dbdb19c4ed703b",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "あさごはん",
    "kana": "あさごはん",
    "c": "朝ごはん",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "49dbdb19c4ed703b"
    ],
    "sources": [
      {
        "key": "49dbdb19c4ed703b",
        "japanese": "あさごはん",
        "kanji": "朝ごはん",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-86033a7fcffd7a42",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "あさって",
    "kana": "あさって",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "86033a7fcffd7a42"
    ],
    "sources": [
      {
        "key": "86033a7fcffd7a42",
        "japanese": "あさって",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-20a18f0fe3a79474",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "あした",
    "kana": "あした",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "20a18f0fe3a79474"
    ],
    "sources": [
      {
        "key": "20a18f0fe3a79474",
        "japanese": "あした",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-ed0fd250bb393be6",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "あすか",
    "kana": "あすか",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "ed0fd250bb393be6"
    ],
    "sources": [
      {
        "key": "ed0fd250bb393be6",
        "japanese": "あすか",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-2149fde02ce70ba4",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "あそこ",
    "kana": "あそこ",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "demonstratives",
    "csvKeys": [
      "2149fde02ce70ba4"
    ],
    "sources": [
      {
        "key": "2149fde02ce70ba4",
        "japanese": "あそこ",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-dcbf18e73d466200",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "あちら",
    "kana": "あちら",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "demonstratives",
    "csvKeys": [
      "dcbf18e73d466200"
    ],
    "sources": [
      {
        "key": "dcbf18e73d466200",
        "japanese": "あちら",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-a20e75f39da44b49",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "アップルぎんこう",
    "kana": "あっぷるぎんこう",
    "c": "アップル銀行",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "a20e75f39da44b49"
    ],
    "sources": [
      {
        "key": "a20e75f39da44b49",
        "japanese": "アップルぎんこう",
        "kanji": "アップル銀行",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-9eebca0faf03e6d1",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "phrases",
    "jp": "ありがとう ございました。",
    "kana": "ありがとうございました",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "9eebca0faf03e6d1",
      "66dc0bd9accfc7a4"
    ],
    "sources": [
      {
        "key": "9eebca0faf03e6d1",
        "japanese": "ありがとう ございました。",
        "kanji": "",
        "chapter": "5",
        "page": "",
        "category": "Expression"
      },
      {
        "key": "66dc0bd9accfc7a4",
        "japanese": "[どうも] ありがとう ございました。",
        "kanji": "",
        "chapter": "5",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-f50227659b484b36",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "あるいて",
    "kana": "あるいて",
    "c": "歩いて",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "f50227659b484b36"
    ],
    "sources": [
      {
        "key": "f50227659b484b36",
        "japanese": "あるいて",
        "kanji": "歩いて",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-8b77245faf60fc4f",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "phrases",
    "jp": "いいですね。",
    "kana": "いいですね",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "8b77245faf60fc4f"
    ],
    "sources": [
      {
        "key": "8b77245faf60fc4f",
        "japanese": "いいですね。",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-e5f8b4417ebfe19c",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "いきます",
    "kana": "いきます",
    "c": "行きます",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "e5f8b4417ebfe19c"
    ],
    "sources": [
      {
        "key": "e5f8b4417ebfe19c",
        "japanese": "いきます",
        "kanji": "行きます",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-5820ce9c10bf95fb",
    "ch": 1,
    "chapters": [
      1
    ],
    "group": "core",
    "jp": "いくつ",
    "kana": "いくつ",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "questions",
    "csvKeys": [
      "5820ce9c10bf95fb"
    ],
    "sources": [
      {
        "key": "5820ce9c10bf95fb",
        "japanese": "いくつ",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-ab968e2cd360cb94",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "いくら",
    "kana": "いくら",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "questions",
    "csvKeys": [
      "ab968e2cd360cb94"
    ],
    "sources": [
      {
        "key": "ab968e2cd360cb94",
        "japanese": "いくら",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-7b7a65b97e017a61",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "イタリア",
    "kana": "いたりあ",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "7b7a65b97e017a61"
    ],
    "sources": [
      {
        "key": "7b7a65b97e017a61",
        "japanese": "イタリア",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-da275c2671ca3790",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "いつ",
    "kana": "いつ",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "questions",
    "csvKeys": [
      "da275c2671ca3790"
    ],
    "sources": [
      {
        "key": "da275c2671ca3790",
        "japanese": "いつ",
        "kanji": "",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-5c0a9a882b9d9a39",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "いつか",
    "kana": "いつか",
    "c": "5日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "5c0a9a882b9d9a39"
    ],
    "sources": [
      {
        "key": "5c0a9a882b9d9a39",
        "japanese": "いつか",
        "kanji": "5日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-ddb642595b09a8d7",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "いっしょに",
    "kana": "いっしょに",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "ddb642595b09a8d7"
    ],
    "sources": [
      {
        "key": "ddb642595b09a8d7",
        "japanese": "いっしょに",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-c3c059abac5ad613",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "いつも",
    "kana": "いつも",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "c3c059abac5ad613"
    ],
    "sources": [
      {
        "key": "c3c059abac5ad613",
        "japanese": "いつも",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-7f048f05fae2b351",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "いま",
    "kana": "いま",
    "c": "今",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "7f048f05fae2b351"
    ],
    "sources": [
      {
        "key": "7f048f05fae2b351",
        "japanese": "いま",
        "kanji": "今",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-d9340bfd67eb4f1c",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "phrases",
    "jp": "いらっしゃいませ。",
    "kana": "いらっしゃいませ",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "d9340bfd67eb4f1c"
    ],
    "sources": [
      {
        "key": "d9340bfd67eb4f1c",
        "japanese": "いらっしゃいませ。",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-47abc6e5208cad6d",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "うけつけ",
    "kana": "うけつけ",
    "c": "受付",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "47abc6e5208cad6d"
    ],
    "sources": [
      {
        "key": "47abc6e5208cad6d",
        "japanese": "うけつけ",
        "kanji": "受付",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-9ee89070e9ecd580",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "うち",
    "kana": "うち",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "9ee89070e9ecd580"
    ],
    "sources": [
      {
        "key": "9ee89070e9ecd580",
        "japanese": "うち",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-c7b62612eee2fd68",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "うりば",
    "kana": "うりば",
    "c": "売り場",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "c7b62612eee2fd68"
    ],
    "sources": [
      {
        "key": "c7b62612eee2fd68",
        "japanese": "うりば",
        "kanji": "売り場",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-31d9b81b01c8caf1",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "えいが",
    "kana": "えいが",
    "c": "映画",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "31d9b81b01c8caf1"
    ],
    "sources": [
      {
        "key": "31d9b81b01c8caf1",
        "japanese": "えいが",
        "kanji": "映画",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-9a3a4421ce87643e",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "phrases",
    "jp": "ええ",
    "kana": "ええ",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "9a3a4421ce87643e"
    ],
    "sources": [
      {
        "key": "9a3a4421ce87643e",
        "japanese": "ええ",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-bd7ed3e561d8f856",
    "ch": 1,
    "chapters": [
      1
    ],
    "group": "core",
    "jp": "エーケーシー(AKC)",
    "kana": "",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "bd7ed3e561d8f856"
    ],
    "sources": [
      {
        "key": "bd7ed3e561d8f856",
        "japanese": "エーケーシー(AKC)",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-96faf26ff6e24abe",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "えき",
    "kana": "えき",
    "c": "駅",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "96faf26ff6e24abe"
    ],
    "sources": [
      {
        "key": "96faf26ff6e24abe",
        "japanese": "えき",
        "kanji": "駅",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-59ad683a4f84dd5e",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "エスカレーター",
    "kana": "えすかれーたー",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "59ad683a4f84dd5e"
    ],
    "sources": [
      {
        "key": "59ad683a4f84dd5e",
        "japanese": "エスカレーター",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-357a6ee57f2f4f5e",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "エレベーター",
    "kana": "えれべーたー",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "357a6ee57f2f4f5e"
    ],
    "sources": [
      {
        "key": "357a6ee57f2f4f5e",
        "japanese": "エレベーター",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-89e7a999c484607d",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "phrases",
    "jp": "…えん",
    "kana": "",
    "c": "…円",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "89e7a999c484607d"
    ],
    "sources": [
      {
        "key": "89e7a999c484607d",
        "japanese": "…えん",
        "kanji": "…円",
        "chapter": "3",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-f0a8ad38c4b26077",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "おおさかじょう",
    "kana": "おおさかじょう",
    "c": "大阪城",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "f0a8ad38c4b26077"
    ],
    "sources": [
      {
        "key": "f0a8ad38c4b26077",
        "japanese": "おおさかじょう",
        "kanji": "大阪城",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-a22105b120419229",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "おおさかデパート",
    "kana": "おおさかでぱーと",
    "c": "大阪デパート",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "a22105b120419229"
    ],
    "sources": [
      {
        "key": "a22105b120419229",
        "japanese": "おおさかデパート",
        "kanji": "大阪デパート",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-5e7d0ce40b26cb2b",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "おきます",
    "kana": "おきます",
    "c": "起きます",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "5e7d0ce40b26cb2b"
    ],
    "sources": [
      {
        "key": "5e7d0ce40b26cb2b",
        "japanese": "おきます",
        "kanji": "起きます",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-8976cfb218dc9695",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "おくに",
    "kana": "おくに",
    "c": "お国",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "8976cfb218dc9695"
    ],
    "sources": [
      {
        "key": "8976cfb218dc9695",
        "japanese": "おくに",
        "kanji": "お国",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-466ef427aeaa04c0",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "おさけ",
    "kana": "おさけ",
    "c": "お酒",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "466ef427aeaa04c0"
    ],
    "sources": [
      {
        "key": "466ef427aeaa04c0",
        "japanese": "おさけ",
        "kanji": "お酒",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-73d6ed4fb078beac",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "おちゃ",
    "kana": "おちゃ",
    "c": "お茶",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "73d6ed4fb078beac"
    ],
    "sources": [
      {
        "key": "73d6ed4fb078beac",
        "japanese": "おちゃ",
        "kanji": "お茶",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-5c19674bccff38cc",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "おてあらい",
    "kana": "おてあらい",
    "c": "お手洗い",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "5c19674bccff38cc"
    ],
    "sources": [
      {
        "key": "5c19674bccff38cc",
        "japanese": "おてあらい",
        "kanji": "お手洗い",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-eac5be1a132a8628",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "おととい／おととい",
    "kana": "",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "eac5be1a132a8628"
    ],
    "sources": [
      {
        "key": "eac5be1a132a8628",
        "japanese": "おととい／おととい",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-36a14c686f5072d1",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "おはなみ",
    "kana": "おはなみ",
    "c": "お花見",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "36a14c686f5072d1"
    ],
    "sources": [
      {
        "key": "36a14c686f5072d1",
        "japanese": "おはなみ",
        "kanji": "お花見",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-8ad6592be9552403",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "おわります",
    "kana": "おわります",
    "c": "終わります",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "8ad6592be9552403"
    ],
    "sources": [
      {
        "key": "8ad6592be9552403",
        "japanese": "おわります",
        "kanji": "終わります",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-edd304f5c1f4ba4d",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "phrases",
    "jp": "…かい(がい)",
    "kana": "",
    "c": "…階",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "edd304f5c1f4ba4d"
    ],
    "sources": [
      {
        "key": "edd304f5c1f4ba4d",
        "japanese": "…かい(がい)",
        "kanji": "…階",
        "chapter": "3",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-c9f11c91beceba8f",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "かいぎ",
    "kana": "かいぎ",
    "c": "会議",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "c9f11c91beceba8f"
    ],
    "sources": [
      {
        "key": "c9f11c91beceba8f",
        "japanese": "かいぎ",
        "kanji": "会議",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-a3c7305e35ec0bb3",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "かいぎしつ",
    "kana": "かいぎしつ",
    "c": "会議室",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "a3c7305e35ec0bb3"
    ],
    "sources": [
      {
        "key": "a3c7305e35ec0bb3",
        "japanese": "かいぎしつ",
        "kanji": "会議室",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-42c30b5cfe318433",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "かいしゃ",
    "kana": "かいしゃ",
    "c": "会社",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "42c30b5cfe318433"
    ],
    "sources": [
      {
        "key": "42c30b5cfe318433",
        "japanese": "かいしゃ",
        "kanji": "会社",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-c04f54886314a802",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "かいだん",
    "kana": "かいだん",
    "c": "階段",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "c04f54886314a802"
    ],
    "sources": [
      {
        "key": "c04f54886314a802",
        "japanese": "かいだん",
        "kanji": "階段",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-df823f0054e95444",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "かいます",
    "kana": "かいます",
    "c": "買います",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "df823f0054e95444"
    ],
    "sources": [
      {
        "key": "df823f0054e95444",
        "japanese": "かいます",
        "kanji": "買います",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-a24023d5cf432e72",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "かえります",
    "kana": "かえります",
    "c": "帰ります",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "a24023d5cf432e72"
    ],
    "sources": [
      {
        "key": "a24023d5cf432e72",
        "japanese": "かえります",
        "kanji": "帰ります",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-d0b1c1b9cff1afa8",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "かきます",
    "kana": "かきます",
    "c": "書きます",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "d0b1c1b9cff1afa8"
    ],
    "sources": [
      {
        "key": "d0b1c1b9cff1afa8",
        "japanese": "かきます",
        "kanji": "書きます",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-85fc29e4499613fa",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "かぞく",
    "kana": "かぞく",
    "c": "家族",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "people",
    "csvKeys": [
      "85fc29e4499613fa"
    ],
    "sources": [
      {
        "key": "85fc29e4499613fa",
        "japanese": "かぞく",
        "kanji": "家族",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-a0827d7777003ef6",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "phrases",
    "jp": "…がつ",
    "kana": "",
    "c": "…月",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "a0827d7777003ef6"
    ],
    "sources": [
      {
        "key": "a0827d7777003ef6",
        "japanese": "…がつ",
        "kanji": "…月",
        "chapter": "5",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-3b693859f9dedc50",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "がっこう",
    "kana": "がっこう",
    "c": "学校",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "3b693859f9dedc50"
    ],
    "sources": [
      {
        "key": "3b693859f9dedc50",
        "japanese": "がっこう",
        "kanji": "学校",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-3ba73c6ea36b4989",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "かのじょ",
    "kana": "かのじょ",
    "c": "彼女",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "people",
    "csvKeys": [
      "3ba73c6ea36b4989"
    ],
    "sources": [
      {
        "key": "3ba73c6ea36b4989",
        "japanese": "かのじょ",
        "kanji": "彼女",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-8c5648c4373536d6",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "かようび",
    "kana": "かようび",
    "c": "火曜日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "8c5648c4373536d6"
    ],
    "sources": [
      {
        "key": "8c5648c4373536d6",
        "japanese": "かようび",
        "kanji": "火曜日",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-bc24d192836412e5",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "phrases",
    "jp": "～から",
    "kana": "",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "bc24d192836412e5"
    ],
    "sources": [
      {
        "key": "bc24d192836412e5",
        "japanese": "～から",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-d4dffb5a5b803637",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "かれ",
    "kana": "かれ",
    "c": "彼",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "people",
    "csvKeys": [
      "d4dffb5a5b803637"
    ],
    "sources": [
      {
        "key": "d4dffb5a5b803637",
        "japanese": "かれ",
        "kanji": "彼",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-75b0e4c01e1d84c5",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "ききます",
    "kana": "ききます",
    "c": "聞きます",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "75b0e4c01e1d84c5"
    ],
    "sources": [
      {
        "key": "75b0e4c01e1d84c5",
        "japanese": "ききます",
        "kanji": "聞きます",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-0ade0376ffe6e67d",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "きのう／きのう",
    "kana": "",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "0ade0376ffe6e67d"
    ],
    "sources": [
      {
        "key": "0ade0376ffe6e67d",
        "japanese": "きのう／きのう",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-d210788ec91c38a2",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "きます",
    "kana": "きます",
    "c": "来ます",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "d210788ec91c38a2"
    ],
    "sources": [
      {
        "key": "d210788ec91c38a2",
        "japanese": "きます",
        "kanji": "来ます",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-97d70ee391716129",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "きゅうこう",
    "kana": "きゅうこう",
    "c": "急行",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "97d70ee391716129"
    ],
    "sources": [
      {
        "key": "97d70ee391716129",
        "japanese": "きゅうこう",
        "kanji": "急行",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-c5e1b6f79ac06f78",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "ぎゅうにゅう",
    "kana": "ぎゅうにゅう",
    "c": "牛乳",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "c5e1b6f79ac06f78"
    ],
    "sources": [
      {
        "key": "c5e1b6f79ac06f78",
        "japanese": "ぎゅうにゅう",
        "kanji": "牛乳",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-0399b8dc98b5e1f7",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "きょう",
    "kana": "きょう",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "0399b8dc98b5e1f7"
    ],
    "sources": [
      {
        "key": "0399b8dc98b5e1f7",
        "japanese": "きょう",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-ec4cba5d7986cb2e",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "きょうしつ",
    "kana": "きょうしつ",
    "c": "教室",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "ec4cba5d7986cb2e"
    ],
    "sources": [
      {
        "key": "ec4cba5d7986cb2e",
        "japanese": "きょうしつ",
        "kanji": "教室",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-a868b59281a163d0",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "きょねん",
    "kana": "きょねん",
    "c": "去年",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "a868b59281a163d0"
    ],
    "sources": [
      {
        "key": "a868b59281a163d0",
        "japanese": "きょねん",
        "kanji": "去年",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-97ecc501b1cb7c5c",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "ぎんこう",
    "kana": "ぎんこう",
    "c": "銀行",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "97ecc501b1cb7c5c"
    ],
    "sources": [
      {
        "key": "97ecc501b1cb7c5c",
        "japanese": "ぎんこう",
        "kanji": "銀行",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-ef428a083ebfc416",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "きんようび",
    "kana": "きんようび",
    "c": "金曜日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "ef428a083ebfc416"
    ],
    "sources": [
      {
        "key": "ef428a083ebfc416",
        "japanese": "きんようび",
        "kanji": "金曜日",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-7429b0353d78ce6c",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "phrases",
    "jp": "[～を] ください。",
    "kana": "",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "7429b0353d78ce6c"
    ],
    "sources": [
      {
        "key": "7429b0353d78ce6c",
        "japanese": "[～を] ください。",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-c95c5a42a2c4dc0f",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "くだもの",
    "kana": "くだもの",
    "c": "果物",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "c95c5a42a2c4dc0f"
    ],
    "sources": [
      {
        "key": "c95c5a42a2c4dc0f",
        "japanese": "くだもの",
        "kanji": "果物",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-a8af0a9b35d000ee",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "くつ",
    "kana": "くつ",
    "c": "靴",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "a8af0a9b35d000ee"
    ],
    "sources": [
      {
        "key": "a8af0a9b35d000ee",
        "japanese": "くつ",
        "kanji": "靴",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-8471042aadac7ed5",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "くに",
    "kana": "くに",
    "c": "国",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "8471042aadac7ed5"
    ],
    "sources": [
      {
        "key": "8471042aadac7ed5",
        "japanese": "くに",
        "kanji": "国",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-20cc9112529e17dc",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "けさ",
    "kana": "けさ",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "20cc9112529e17dc"
    ],
    "sources": [
      {
        "key": "20cc9112529e17dc",
        "japanese": "けさ",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-fd367b096e229af0",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "げつようび",
    "kana": "げつようび",
    "c": "月曜日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "fd367b096e229af0"
    ],
    "sources": [
      {
        "key": "fd367b096e229af0",
        "japanese": "げつようび",
        "kanji": "月曜日",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-28e2535376fd8952",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "こうしえん",
    "kana": "こうしえん",
    "c": "甲子園",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "28e2535376fd8952"
    ],
    "sources": [
      {
        "key": "28e2535376fd8952",
        "japanese": "こうしえん",
        "kanji": "甲子園",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-8f8245c5ed921c82",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "こうちゃ",
    "kana": "こうちゃ",
    "c": "紅茶",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "8f8245c5ed921c82"
    ],
    "sources": [
      {
        "key": "8f8245c5ed921c82",
        "japanese": "こうちゃ",
        "kanji": "紅茶",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-24110f167642a49c",
    "ch": 1,
    "chapters": [
      1
    ],
    "group": "core",
    "jp": "こうべびょういん",
    "kana": "こうべびょういん",
    "c": "神戸病院",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "24110f167642a49c"
    ],
    "sources": [
      {
        "key": "24110f167642a49c",
        "japanese": "こうべびょういん",
        "kanji": "神戸病院",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-736ca436d91bce5f",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "ここ",
    "kana": "ここ",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "demonstratives",
    "csvKeys": [
      "736ca436d91bce5f"
    ],
    "sources": [
      {
        "key": "736ca436d91bce5f",
        "japanese": "ここ",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-88e16b624f08ea7d",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "ごご",
    "kana": "ごご",
    "c": "午後",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "88e16b624f08ea7d"
    ],
    "sources": [
      {
        "key": "88e16b624f08ea7d",
        "japanese": "ごご",
        "kanji": "午後",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-c221dba0167ae1e9",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "ここのか",
    "kana": "ここのか",
    "c": "9日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "c221dba0167ae1e9"
    ],
    "sources": [
      {
        "key": "c221dba0167ae1e9",
        "japanese": "ここのか",
        "kanji": "9日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-22ae083e6a1b254f",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "ごぜん",
    "kana": "ごぜん",
    "c": "午前",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "22ae083e6a1b254f"
    ],
    "sources": [
      {
        "key": "22ae083e6a1b254f",
        "japanese": "ごぜん",
        "kanji": "午前",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-5b6dad8bf63aea6d",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "こちら",
    "kana": "こちら",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "demonstratives",
    "csvKeys": [
      "5b6dad8bf63aea6d"
    ],
    "sources": [
      {
        "key": "5b6dad8bf63aea6d",
        "japanese": "こちら",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-30b189ebcd7003c3",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "ことし",
    "kana": "ことし",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "30b189ebcd7003c3"
    ],
    "sources": [
      {
        "key": "30b189ebcd7003c3",
        "japanese": "ことし",
        "kanji": "",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-6bcbca4ff9d1339c",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "ごはん",
    "kana": "ごはん",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "6bcbca4ff9d1339c"
    ],
    "sources": [
      {
        "key": "6bcbca4ff9d1339c",
        "japanese": "ごはん",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-c803b519e3fc772d",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "こんげつ",
    "kana": "こんげつ",
    "c": "今月",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "c803b519e3fc772d"
    ],
    "sources": [
      {
        "key": "c803b519e3fc772d",
        "japanese": "こんげつ",
        "kanji": "今月",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-17a1e9fa6d674c24",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "こんしゅう",
    "kana": "こんしゅう",
    "c": "今週",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "17a1e9fa6d674c24"
    ],
    "sources": [
      {
        "key": "17a1e9fa6d674c24",
        "japanese": "こんしゅう",
        "kanji": "今週",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-ac175b9b3739e283",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "こんばん",
    "kana": "こんばん",
    "c": "今晩",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "ac175b9b3739e283"
    ],
    "sources": [
      {
        "key": "ac175b9b3739e283",
        "japanese": "こんばん",
        "kanji": "今晩",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-5d4309a567cd471b",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "さかな",
    "kana": "さかな",
    "c": "魚",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "5d4309a567cd471b"
    ],
    "sources": [
      {
        "key": "5d4309a567cd471b",
        "japanese": "さかな",
        "kanji": "魚",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-5babde796c69ee99",
    "ch": 1,
    "chapters": [
      1
    ],
    "group": "core",
    "jp": "さくらだいがく",
    "kana": "さくらだいがく",
    "c": "さくら大学",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "5babde796c69ee99"
    ],
    "sources": [
      {
        "key": "5babde796c69ee99",
        "japanese": "さくらだいがく",
        "kanji": "さくら大学",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-b4278971fe60aaba",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "さけ",
    "kana": "さけ",
    "c": "酒",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "b4278971fe60aaba"
    ],
    "sources": [
      {
        "key": "b4278971fe60aaba",
        "japanese": "さけ",
        "kanji": "酒",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-7dc41055c5283da3",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "サッカー",
    "kana": "さっかー",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "7dc41055c5283da3"
    ],
    "sources": [
      {
        "key": "7dc41055c5283da3",
        "japanese": "サッカー",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-2d18eee2beaa33a9",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "phrases",
    "jp": "…じ",
    "kana": "",
    "c": "…時",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "2d18eee2beaa33a9"
    ],
    "sources": [
      {
        "key": "2d18eee2beaa33a9",
        "japanese": "…じ",
        "kanji": "…時",
        "chapter": "4",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-5f75683c732e90c5",
    "ch": 2,
    "chapters": [
      2
    ],
    "group": "core",
    "jp": "シーディー(CD)",
    "kana": "",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "5f75683c732e90c5"
    ],
    "sources": [
      {
        "key": "5f75683c732e90c5",
        "japanese": "シーディー(CD)",
        "kanji": "",
        "chapter": "2",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-50f1e3f0d55ae59e",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "しけん",
    "kana": "しけん",
    "c": "試験",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "50f1e3f0d55ae59e"
    ],
    "sources": [
      {
        "key": "50f1e3f0d55ae59e",
        "japanese": "しけん",
        "kanji": "試験",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-5a10eafbbd35a055",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "じてんしゃ",
    "kana": "じてんしゃ",
    "c": "自転車",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "5a10eafbbd35a055"
    ],
    "sources": [
      {
        "key": "5a10eafbbd35a055",
        "japanese": "じてんしゃ",
        "kanji": "自転車",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-f47438960f134c01",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "じどうはんばいき",
    "kana": "じどうはんばいき",
    "c": "自動販売機",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "f47438960f134c01"
    ],
    "sources": [
      {
        "key": "f47438960f134c01",
        "japanese": "じどうはんばいき",
        "kanji": "自動販売機",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-e1fe9fe823893e71",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "します",
    "kana": "します",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "e1fe9fe823893e71"
    ],
    "sources": [
      {
        "key": "e1fe9fe823893e71",
        "japanese": "します",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-b630f288931b1e0d",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "じむしょ",
    "kana": "じむしょ",
    "c": "事務所",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "b630f288931b1e0d"
    ],
    "sources": [
      {
        "key": "b630f288931b1e0d",
        "japanese": "じむしょ",
        "kanji": "事務所",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-e0254d6a929be2c4",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "phrases",
    "jp": "じゃ",
    "kana": "じゃ",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "e0254d6a929be2c4"
    ],
    "sources": [
      {
        "key": "e0254d6a929be2c4",
        "japanese": "じゃ",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-6108692c5a4192be",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "ジャカルタ",
    "kana": "じゃかるた",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "6108692c5a4192be"
    ],
    "sources": [
      {
        "key": "6108692c5a4192be",
        "japanese": "ジャカルタ",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-636d771fbcf06c13",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "しゃしん",
    "kana": "しゃしん",
    "c": "写真",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "636d771fbcf06c13"
    ],
    "sources": [
      {
        "key": "636d771fbcf06c13",
        "japanese": "しゃしん",
        "kanji": "写真",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-e71873a7c50a3455",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "phrases",
    "jp": "じゃ、また [あした]。",
    "kana": "",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "e71873a7c50a3455"
    ],
    "sources": [
      {
        "key": "e71873a7c50a3455",
        "japanese": "じゃ、また [あした]。",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-59fc344c5d6c0e5b",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "ジュース",
    "kana": "じゅーす",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "59fc344c5d6c0e5b"
    ],
    "sources": [
      {
        "key": "59fc344c5d6c0e5b",
        "japanese": "ジュース",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-b18a5ba6256ca74e",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "じゅうよっか",
    "kana": "じゅうよっか",
    "c": "14日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "b18a5ba6256ca74e"
    ],
    "sources": [
      {
        "key": "b18a5ba6256ca74e",
        "japanese": "じゅうよっか",
        "kanji": "14日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-e8e2f46fabc20cd4",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "しゅくだい",
    "kana": "しゅくだい",
    "c": "宿題",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "e8e2f46fabc20cd4"
    ],
    "sources": [
      {
        "key": "e8e2f46fabc20cd4",
        "japanese": "しゅくだい",
        "kanji": "宿題",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-9f28616c1abd0df0",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "しょくどう",
    "kana": "しょくどう",
    "c": "食堂",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "9f28616c1abd0df0"
    ],
    "sources": [
      {
        "key": "9f28616c1abd0df0",
        "japanese": "しょくどう",
        "kanji": "食堂",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-c91023ffad8c20d9",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "しんおおさか",
    "kana": "しんおおさか",
    "c": "新大阪",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "c91023ffad8c20d9"
    ],
    "sources": [
      {
        "key": "c91023ffad8c20d9",
        "japanese": "しんおおさか",
        "kanji": "新大阪",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-75cc337163f92d4a",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "しんかんせん",
    "kana": "しんかんせん",
    "c": "新幹線",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "75cc337163f92d4a"
    ],
    "sources": [
      {
        "key": "75cc337163f92d4a",
        "japanese": "しんかんせん",
        "kanji": "新幹線",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-2fc9f222399f3db8",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "スイス",
    "kana": "すいす",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "2fc9f222399f3db8"
    ],
    "sources": [
      {
        "key": "2fc9f222399f3db8",
        "japanese": "スイス",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-8c8770a8bd199980",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "すいます[たばこを～]",
    "kana": "",
    "c": "吸います",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "8c8770a8bd199980"
    ],
    "sources": [
      {
        "key": "8c8770a8bd199980",
        "japanese": "すいます[たばこを～]",
        "kanji": "吸います",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-af1a037008532065",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "すいようび",
    "kana": "すいようび",
    "c": "水曜日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "af1a037008532065"
    ],
    "sources": [
      {
        "key": "af1a037008532065",
        "japanese": "すいようび",
        "kanji": "水曜日",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-3e715ed68e25a4b2",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "スーパー",
    "kana": "すーぱー",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "3e715ed68e25a4b2"
    ],
    "sources": [
      {
        "key": "3e715ed68e25a4b2",
        "japanese": "スーパー",
        "kanji": "",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-47173ba7dbcc1ba8",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "phrases",
    "jp": "すみません",
    "kana": "すみません",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "47173ba7dbcc1ba8"
    ],
    "sources": [
      {
        "key": "47173ba7dbcc1ba8",
        "japanese": "すみません",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-3121bf370e394d08",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "せん",
    "kana": "せん",
    "c": "千",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "3121bf370e394d08"
    ],
    "sources": [
      {
        "key": "3121bf370e394d08",
        "japanese": "せん",
        "kanji": "千",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-23b4d2461d6440ab",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "せんげつ",
    "kana": "せんげつ",
    "c": "先月",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "23b4d2461d6440ab"
    ],
    "sources": [
      {
        "key": "23b4d2461d6440ab",
        "japanese": "せんげつ",
        "kanji": "先月",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-3c6769841cb20689",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "せんしゅう",
    "kana": "せんしゅう",
    "c": "先週",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "3c6769841cb20689"
    ],
    "sources": [
      {
        "key": "3c6769841cb20689",
        "japanese": "せんしゅう",
        "kanji": "先週",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-626cfb072a80fcbb",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "phrases",
    "jp": "そうですね。",
    "kana": "そうですね",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "626cfb072a80fcbb"
    ],
    "sources": [
      {
        "key": "626cfb072a80fcbb",
        "japanese": "そうですね。",
        "kanji": "",
        "chapter": "5",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-ab7df75a603e51de",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "そこ",
    "kana": "そこ",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "demonstratives",
    "csvKeys": [
      "ab7df75a603e51de"
    ],
    "sources": [
      {
        "key": "ab7df75a603e51de",
        "japanese": "そこ",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-9f118c1d866c7b12",
    "ch": 3,
    "chapters": [
      3,
      4
    ],
    "group": "core",
    "jp": "そちら",
    "kana": "そちら",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "demonstratives",
    "csvKeys": [
      "9f118c1d866c7b12"
    ],
    "sources": [
      {
        "key": "9f118c1d866c7b12",
        "japanese": "そちら",
        "kanji": "",
        "chapter": "3, 4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-1d44190694449872",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "それから",
    "kana": "それから",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "1d44190694449872"
    ],
    "sources": [
      {
        "key": "1d44190694449872",
        "japanese": "それから",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-fe800f6d19179334",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "phrases",
    "jp": "たいへんですね。",
    "kana": "たいへんですね",
    "c": "大変ですね。",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "fe800f6d19179334"
    ],
    "sources": [
      {
        "key": "fe800f6d19179334",
        "japanese": "たいへんですね。",
        "kanji": "大変ですね。",
        "chapter": "4",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-6cec773780557979",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "タクシー",
    "kana": "たくしー",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "6cec773780557979"
    ],
    "sources": [
      {
        "key": "6cec773780557979",
        "japanese": "タクシー",
        "kanji": "",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-39827ceb3d02520a",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "たばこ",
    "kana": "たばこ",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "39827ceb3d02520a"
    ],
    "sources": [
      {
        "key": "39827ceb3d02520a",
        "japanese": "たばこ",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-47e0d02b093eaa10",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "たべます",
    "kana": "たべます",
    "c": "食べます",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "47e0d02b093eaa10"
    ],
    "sources": [
      {
        "key": "47e0d02b093eaa10",
        "japanese": "たべます",
        "kanji": "食べます",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-9d3438acae746a2b",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "たまご",
    "kana": "たまご",
    "c": "卵",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "9d3438acae746a2b"
    ],
    "sources": [
      {
        "key": "9d3438acae746a2b",
        "japanese": "たまご",
        "kanji": "卵",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-9c2a0dad1676a16c",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "たんじょうび",
    "kana": "たんじょうび",
    "c": "誕生日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "9c2a0dad1676a16c"
    ],
    "sources": [
      {
        "key": "9c2a0dad1676a16c",
        "japanese": "たんじょうび",
        "kanji": "誕生日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-15fcfa0f2e316f12",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "ちか",
    "kana": "ちか",
    "c": "地下",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "15fcfa0f2e316f12"
    ],
    "sources": [
      {
        "key": "15fcfa0f2e316f12",
        "japanese": "ちか",
        "kanji": "地下",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-8fea79d5439bf91d",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "ちかてつ",
    "kana": "ちかてつ",
    "c": "地下鉄",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "8fea79d5439bf91d"
    ],
    "sources": [
      {
        "key": "8fea79d5439bf91d",
        "japanese": "ちかてつ",
        "kanji": "地下鉄",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-f66659321ab61768",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "ちょっと",
    "kana": "ちょっと",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "f66659321ab61768"
    ],
    "sources": [
      {
        "key": "f66659321ab61768",
        "japanese": "ちょっと",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-c2a089d9c108210d",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "ついたち",
    "kana": "ついたち",
    "c": "1日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "c2a089d9c108210d"
    ],
    "sources": [
      {
        "key": "c2a089d9c108210d",
        "japanese": "ついたち",
        "kanji": "1日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-184a04e7c5d4fccd",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "つぎの",
    "kana": "つぎの",
    "c": "次の",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "184a04e7c5d4fccd"
    ],
    "sources": [
      {
        "key": "184a04e7c5d4fccd",
        "japanese": "つぎの",
        "kanji": "次の",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-e0ef263ea957a0ed",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "つるや",
    "kana": "つるや",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "e0ef263ea957a0ed"
    ],
    "sources": [
      {
        "key": "e0ef263ea957a0ed",
        "japanese": "つるや",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-c11a3275fec09a2b",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "てがみ",
    "kana": "てがみ",
    "c": "手紙",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "c11a3275fec09a2b"
    ],
    "sources": [
      {
        "key": "c11a3275fec09a2b",
        "japanese": "てがみ",
        "kanji": "手紙",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-1981cf9bdbeb6a22",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "テニス",
    "kana": "てにす",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "1981cf9bdbeb6a22"
    ],
    "sources": [
      {
        "key": "1981cf9bdbeb6a22",
        "japanese": "テニス",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-b39f72fcf4f7e700",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "デパート",
    "kana": "でぱーと",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "b39f72fcf4f7e700"
    ],
    "sources": [
      {
        "key": "b39f72fcf4f7e700",
        "japanese": "デパート",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-877ca5f99e8338a8",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "でんしゃ",
    "kana": "でんしゃ",
    "c": "電車",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "877ca5f99e8338a8"
    ],
    "sources": [
      {
        "key": "877ca5f99e8338a8",
        "japanese": "でんしゃ",
        "kanji": "電車",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-f20e55f3aa3b9c16",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "でんわ",
    "kana": "でんわ",
    "c": "電話",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "f20e55f3aa3b9c16"
    ],
    "sources": [
      {
        "key": "f20e55f3aa3b9c16",
        "japanese": "でんわ",
        "kanji": "電話",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-09ef7fdadc105ce9",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "phrases",
    "jp": "～と～",
    "kana": "",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "09ef7fdadc105ce9"
    ],
    "sources": [
      {
        "key": "09ef7fdadc105ce9",
        "japanese": "～と～",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-257eb66feb0a09a6",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "トイレ",
    "kana": "といれ",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "257eb66feb0a09a6"
    ],
    "sources": [
      {
        "key": "257eb66feb0a09a6",
        "japanese": "トイレ",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-1d26a3f31f546046",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "phrases",
    "jp": "どう いたしまして。",
    "kana": "どういたしまして",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "1d26a3f31f546046"
    ],
    "sources": [
      {
        "key": "1d26a3f31f546046",
        "japanese": "どう いたしまして。",
        "kanji": "",
        "chapter": "5",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-db54bd3debae83c5",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "phrases",
    "jp": "どうも。",
    "kana": "どうも",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "db54bd3debae83c5"
    ],
    "sources": [
      {
        "key": "db54bd3debae83c5",
        "japanese": "どうも。",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-9c701220455cac91",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "とおか",
    "kana": "とおか",
    "c": "10日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "9c701220455cac91"
    ],
    "sources": [
      {
        "key": "9c701220455cac91",
        "japanese": "とおか",
        "kanji": "10日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-6b187d085f20d980",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "ときどき",
    "kana": "ときどき",
    "c": "時々",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "6b187d085f20d980"
    ],
    "sources": [
      {
        "key": "6b187d085f20d980",
        "japanese": "ときどき",
        "kanji": "時々",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-eeb21f6be3d69376",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "どこ",
    "kana": "どこ",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "questions",
    "csvKeys": [
      "eeb21f6be3d69376"
    ],
    "sources": [
      {
        "key": "eeb21f6be3d69376",
        "japanese": "どこ",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-a49f4fd74e4b776a",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "としょかん",
    "kana": "としょかん",
    "c": "図書館",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "a49f4fd74e4b776a"
    ],
    "sources": [
      {
        "key": "a49f4fd74e4b776a",
        "japanese": "としょかん",
        "kanji": "図書館",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-804aba7ce89c0b43",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "どちら",
    "kana": "どちら",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "questions",
    "csvKeys": [
      "804aba7ce89c0b43"
    ],
    "sources": [
      {
        "key": "804aba7ce89c0b43",
        "japanese": "どちら",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-ee51b3e0ae0fd355",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "とっきゅう",
    "kana": "とっきゅう",
    "c": "特急",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "ee51b3e0ae0fd355"
    ],
    "sources": [
      {
        "key": "ee51b3e0ae0fd355",
        "japanese": "とっきゅう",
        "kanji": "特急",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-66356e973c57c474",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "ともだち",
    "kana": "ともだち",
    "c": "友達",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "people",
    "csvKeys": [
      "66356e973c57c474"
    ],
    "sources": [
      {
        "key": "66356e973c57c474",
        "japanese": "ともだち",
        "kanji": "友達",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-0f0af44cce4a281f",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "どようび",
    "kana": "どようび",
    "c": "土曜日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "0f0af44cce4a281f"
    ],
    "sources": [
      {
        "key": "0f0af44cce4a281f",
        "japanese": "どようび",
        "kanji": "土曜日",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-cc1157bdb7daec7d",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "とります[しゃしんを～]",
    "kana": "",
    "c": "撮ります[写真を～]",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "cc1157bdb7daec7d"
    ],
    "sources": [
      {
        "key": "cc1157bdb7daec7d",
        "japanese": "とります[しゃしんを～]",
        "kanji": "撮ります[写真を～]",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-61d84228493517e8",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "なに",
    "kana": "なに",
    "c": "何",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "questions",
    "csvKeys": [
      "61d84228493517e8"
    ],
    "sources": [
      {
        "key": "61d84228493517e8",
        "japanese": "なに",
        "kanji": "何",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-5702f6977f743b93",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "なのか",
    "kana": "なのか",
    "c": "7日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "5702f6977f743b93"
    ],
    "sources": [
      {
        "key": "5702f6977f743b93",
        "japanese": "なのか",
        "kanji": "7日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-6c2b8b903cb99e2e",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "なんがい",
    "kana": "なんがい",
    "c": "何階",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "6c2b8b903cb99e2e"
    ],
    "sources": [
      {
        "key": "6c2b8b903cb99e2e",
        "japanese": "なんがい",
        "kanji": "何階",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-c8125aa6b2d08005",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "なんがつ",
    "kana": "なんがつ",
    "c": "何月",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "questions",
    "csvKeys": [
      "c8125aa6b2d08005"
    ],
    "sources": [
      {
        "key": "c8125aa6b2d08005",
        "japanese": "なんがつ",
        "kanji": "何月",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-02f9970a520aca34",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "なんじ",
    "kana": "なんじ",
    "c": "何時",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "questions",
    "csvKeys": [
      "02f9970a520aca34"
    ],
    "sources": [
      {
        "key": "02f9970a520aca34",
        "japanese": "なんじ",
        "kanji": "何時",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-5b2bd2f1b059a707",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "phrases",
    "jp": "なんですか。",
    "kana": "なんですか",
    "c": "何ですか。",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "questions",
    "csvKeys": [
      "5b2bd2f1b059a707"
    ],
    "sources": [
      {
        "key": "5b2bd2f1b059a707",
        "japanese": "なんですか。",
        "kanji": "何ですか。",
        "chapter": "6",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-9211080b604c7214",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "なんにち",
    "kana": "なんにち",
    "c": "何日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "questions",
    "csvKeys": [
      "9211080b604c7214"
    ],
    "sources": [
      {
        "key": "9211080b604c7214",
        "japanese": "なんにち",
        "kanji": "何日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-37a34299f8aac5ba",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "なんねん",
    "kana": "なんねん",
    "c": "何年",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "37a34299f8aac5ba"
    ],
    "sources": [
      {
        "key": "37a34299f8aac5ba",
        "japanese": "なんねん",
        "kanji": "何年",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-9eed675097e32f3a",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "なんばん",
    "kana": "なんばん",
    "c": "何番",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "9eed675097e32f3a"
    ],
    "sources": [
      {
        "key": "9eed675097e32f3a",
        "japanese": "なんばん",
        "kanji": "何番",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-cf9d68d877adf1cd",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "なんぷん",
    "kana": "なんぷん",
    "c": "何分",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "cf9d68d877adf1cd"
    ],
    "sources": [
      {
        "key": "cf9d68d877adf1cd",
        "japanese": "なんぷん",
        "kanji": "何分",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-709bbe360bfb0610",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "なんようび",
    "kana": "なんようび",
    "c": "何曜日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "questions",
    "csvKeys": [
      "709bbe360bfb0610"
    ],
    "sources": [
      {
        "key": "709bbe360bfb0610",
        "japanese": "なんようび",
        "kanji": "何曜日",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-b7e64825c6bfc605",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "にく",
    "kana": "にく",
    "c": "肉",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "b7e64825c6bfc605"
    ],
    "sources": [
      {
        "key": "b7e64825c6bfc605",
        "japanese": "にく",
        "kanji": "肉",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-80e2b972cd3e2a7b",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "にじゅうよっか",
    "kana": "にじゅうよっか",
    "c": "24日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "80e2b972cd3e2a7b"
    ],
    "sources": [
      {
        "key": "80e2b972cd3e2a7b",
        "japanese": "にじゅうよっか",
        "kanji": "24日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-7102dff50ca5a822",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "phrases",
    "jp": "…にち",
    "kana": "",
    "c": "…日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "7102dff50ca5a822"
    ],
    "sources": [
      {
        "key": "7102dff50ca5a822",
        "japanese": "…にち",
        "kanji": "…日",
        "chapter": "5",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-4079e2a4d9c90208",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "にちようび",
    "kana": "にちようび",
    "c": "日曜日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "4079e2a4d9c90208"
    ],
    "sources": [
      {
        "key": "4079e2a4d9c90208",
        "japanese": "にちようび",
        "kanji": "日曜日",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-d5eb58bc9fda4560",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "ニューヨーク",
    "kana": "にゅーよーく",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "d5eb58bc9fda4560"
    ],
    "sources": [
      {
        "key": "d5eb58bc9fda4560",
        "japanese": "ニューヨーク",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-fe19f59584c74922",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "にわ",
    "kana": "にわ",
    "c": "庭",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "fe19f59584c74922"
    ],
    "sources": [
      {
        "key": "fe19f59584c74922",
        "japanese": "にわ",
        "kanji": "庭",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-53301c9bbfca67e7",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "ネクタイ",
    "kana": "ねくたい",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "53301c9bbfca67e7"
    ],
    "sources": [
      {
        "key": "53301c9bbfca67e7",
        "japanese": "ネクタイ",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-8605d60ced6fcfc3",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "ねます",
    "kana": "ねます",
    "c": "寝ます",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "8605d60ced6fcfc3"
    ],
    "sources": [
      {
        "key": "8605d60ced6fcfc3",
        "japanese": "ねます",
        "kanji": "寝ます",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-7b39f2af6e32e892",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "phrases",
    "jp": "…ねん",
    "kana": "",
    "c": "…年",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "7b39f2af6e32e892"
    ],
    "sources": [
      {
        "key": "7b39f2af6e32e892",
        "japanese": "…ねん",
        "kanji": "…年",
        "chapter": "5",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-94a36930bfbb9722",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "のみます",
    "kana": "のみます",
    "c": "飲みます",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "94a36930bfbb9722"
    ],
    "sources": [
      {
        "key": "94a36930bfbb9722",
        "japanese": "のみます",
        "kanji": "飲みます",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-866bfdb4796056e3",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "バス",
    "kana": "ばす",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "866bfdb4796056e3"
    ],
    "sources": [
      {
        "key": "866bfdb4796056e3",
        "japanese": "バス",
        "kanji": "",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-ed8b2091e64b9057",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "はたらきます",
    "kana": "はたらきます",
    "c": "働きます",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "ed8b2091e64b9057"
    ],
    "sources": [
      {
        "key": "ed8b2091e64b9057",
        "japanese": "はたらきます",
        "kanji": "働きます",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-baf16aec6f47fddc",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "はつか",
    "kana": "はつか",
    "c": "20日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "baf16aec6f47fddc"
    ],
    "sources": [
      {
        "key": "baf16aec6f47fddc",
        "japanese": "はつか",
        "kanji": "20日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-59357d2a2ba16d1d",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "はなみ",
    "kana": "はなみ",
    "c": "花見",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "59357d2a2ba16d1d"
    ],
    "sources": [
      {
        "key": "59357d2a2ba16d1d",
        "japanese": "はなみ",
        "kanji": "花見",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-28b35d9b1a29e3bd",
    "ch": 1,
    "chapters": [
      1
    ],
    "group": "core",
    "jp": "パワーでんき",
    "kana": "ぱわーでんき",
    "c": "パワー電気",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "28b35d9b1a29e3bd"
    ],
    "sources": [
      {
        "key": "28b35d9b1a29e3bd",
        "japanese": "パワーでんき",
        "kanji": "パワー電気",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-65b30d156c2fe4df",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "はん",
    "kana": "はん",
    "c": "半",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "65b30d156c2fe4df"
    ],
    "sources": [
      {
        "key": "65b30d156c2fe4df",
        "japanese": "はん",
        "kanji": "半",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-ff36cec9ccb3b7f6",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "ばん",
    "kana": "ばん",
    "c": "晩",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "ff36cec9ccb3b7f6"
    ],
    "sources": [
      {
        "key": "ff36cec9ccb3b7f6",
        "japanese": "ばん",
        "kanji": "晩",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-de32617ea8103232",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "パン",
    "kana": "ぱん",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "de32617ea8103232"
    ],
    "sources": [
      {
        "key": "de32617ea8103232",
        "japanese": "パン",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-d4c367f50c5fdddb",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "ばんごう",
    "kana": "ばんごう",
    "c": "番号",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "d4c367f50c5fdddb"
    ],
    "sources": [
      {
        "key": "d4c367f50c5fdddb",
        "japanese": "ばんごう",
        "kanji": "番号",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-f8aa1519a9a40a91",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "バンコク",
    "kana": "ばんこく",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "f8aa1519a9a40a91"
    ],
    "sources": [
      {
        "key": "f8aa1519a9a40a91",
        "japanese": "バンコク",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-affaad7513b5d4c8",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "ばんごはん",
    "kana": "ばんごはん",
    "c": "晩ごはん",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "affaad7513b5d4c8"
    ],
    "sources": [
      {
        "key": "affaad7513b5d4c8",
        "japanese": "ばんごはん",
        "kanji": "晩ごはん",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-4f20834e51a03b0c",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "phrases",
    "jp": "…ばんせん",
    "kana": "",
    "c": "…番線",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "4f20834e51a03b0c"
    ],
    "sources": [
      {
        "key": "4f20834e51a03b0c",
        "japanese": "…ばんせん",
        "kanji": "…番線",
        "chapter": "5",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-c90996b5e92d7c1e",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "ビール",
    "kana": "びーる",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "c90996b5e92d7c1e"
    ],
    "sources": [
      {
        "key": "c90996b5e92d7c1e",
        "japanese": "ビール",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-c98d6b858839265e",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "ひこうき",
    "kana": "ひこうき",
    "c": "飛行機",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "c98d6b858839265e"
    ],
    "sources": [
      {
        "key": "c98d6b858839265e",
        "japanese": "ひこうき",
        "kanji": "飛行機",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-c0f29d3056decb53",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "びじゅつかん",
    "kana": "びじゅつかん",
    "c": "美術館",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "c0f29d3056decb53"
    ],
    "sources": [
      {
        "key": "c0f29d3056decb53",
        "japanese": "びじゅつかん",
        "kanji": "美術館",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-a21d0ee87a3c3deb",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "ビデオ",
    "kana": "びでお",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "a21d0ee87a3c3deb"
    ],
    "sources": [
      {
        "key": "a21d0ee87a3c3deb",
        "japanese": "ビデオ",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-d174a32922550b37",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "ひと",
    "kana": "ひと",
    "c": "人",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "d174a32922550b37"
    ],
    "sources": [
      {
        "key": "d174a32922550b37",
        "japanese": "ひと",
        "kanji": "人",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-ad4bed84d1d20277",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "ひとりで",
    "kana": "ひとりで",
    "c": "一人で",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "ad4bed84d1d20277"
    ],
    "sources": [
      {
        "key": "ad4bed84d1d20277",
        "japanese": "ひとりで",
        "kanji": "一人で",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-fabae63a62509b27",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "ひゃく",
    "kana": "ひゃく",
    "c": "百",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "fabae63a62509b27"
    ],
    "sources": [
      {
        "key": "fabae63a62509b27",
        "japanese": "ひゃく",
        "kanji": "百",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-f0808db02826751c",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "ひる",
    "kana": "ひる",
    "c": "昼",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "f0808db02826751c"
    ],
    "sources": [
      {
        "key": "f0808db02826751c",
        "japanese": "ひる",
        "kanji": "昼",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-1e0b486bbcdc48d6",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "ひるごはん",
    "kana": "ひるごはん",
    "c": "昼ごはん",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "1e0b486bbcdc48d6"
    ],
    "sources": [
      {
        "key": "1e0b486bbcdc48d6",
        "japanese": "ひるごはん",
        "kanji": "昼ごはん",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-2027eb0abebd2ddc",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "ひるやすみ",
    "kana": "ひるやすみ",
    "c": "昼休み",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "2027eb0abebd2ddc"
    ],
    "sources": [
      {
        "key": "2027eb0abebd2ddc",
        "japanese": "ひるやすみ",
        "kanji": "昼休み",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-1c673828b19f140f",
    "ch": 1,
    "chapters": [
      1
    ],
    "group": "core",
    "jp": "ふじだいがく",
    "kana": "ふじだいがく",
    "c": "富士大学",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "1c673828b19f140f"
    ],
    "sources": [
      {
        "key": "1c673828b19f140f",
        "japanese": "ふじだいがく",
        "kanji": "富士大学",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-3236ade61764e870",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "ふつう",
    "kana": "ふつう",
    "c": "普通",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "3236ade61764e870"
    ],
    "sources": [
      {
        "key": "3236ade61764e870",
        "japanese": "ふつう",
        "kanji": "普通",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-7048eafe3ccb9af5",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "ふつか",
    "kana": "ふつか",
    "c": "2日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "7048eafe3ccb9af5"
    ],
    "sources": [
      {
        "key": "7048eafe3ccb9af5",
        "japanese": "ふつか",
        "kanji": "2日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-337bdbc7d43ef9ad",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "ふね",
    "kana": "ふね",
    "c": "船",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "337bdbc7d43ef9ad"
    ],
    "sources": [
      {
        "key": "337bdbc7d43ef9ad",
        "japanese": "ふね",
        "kanji": "船",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-7397e594beb9d693",
    "ch": 1,
    "chapters": [
      1
    ],
    "group": "core",
    "jp": "ブラジルエアー",
    "kana": "ぶらじるえあー",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "7397e594beb9d693"
    ],
    "sources": [
      {
        "key": "7397e594beb9d693",
        "japanese": "ブラジルエアー",
        "kanji": "",
        "chapter": "1",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-2b5c2978ec80433f",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "フランス",
    "kana": "ふらんす",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "2b5c2978ec80433f"
    ],
    "sources": [
      {
        "key": "2b5c2978ec80433f",
        "japanese": "フランス",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-b199fcf6b483fa68",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "フランスや",
    "kana": "ふらんすや",
    "c": "フランス屋",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "b199fcf6b483fa68"
    ],
    "sources": [
      {
        "key": "b199fcf6b483fa68",
        "japanese": "フランスや",
        "kanji": "フランス屋",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-1e29ff5690e69b84",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "phrases",
    "jp": "…ふん(…ぷん)",
    "kana": "",
    "c": "…分",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "1e29ff5690e69b84"
    ],
    "sources": [
      {
        "key": "1e29ff5690e69b84",
        "japanese": "…ふん(…ぷん)",
        "kanji": "…分",
        "chapter": "4",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-34928d4434867cd0",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "ペキン",
    "kana": "ぺきん",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "34928d4434867cd0"
    ],
    "sources": [
      {
        "key": "34928d4434867cd0",
        "japanese": "ペキン",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-40d939631b618203",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "へや",
    "kana": "へや",
    "c": "部屋",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "40d939631b618203"
    ],
    "sources": [
      {
        "key": "40d939631b618203",
        "japanese": "へや",
        "kanji": "部屋",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-5d624a3f65c5328e",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "ベルリン",
    "kana": "べるりん",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "5d624a3f65c5328e"
    ],
    "sources": [
      {
        "key": "5d624a3f65c5328e",
        "japanese": "ベルリン",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-453767b05cb5e14e",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "べんきょうします",
    "kana": "べんきょうします",
    "c": "勉強します",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "453767b05cb5e14e"
    ],
    "sources": [
      {
        "key": "453767b05cb5e14e",
        "japanese": "べんきょうします",
        "kanji": "勉強します",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-1a940afe26c9027e",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "まいあさ",
    "kana": "まいあさ",
    "c": "毎朝",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "1a940afe26c9027e"
    ],
    "sources": [
      {
        "key": "1a940afe26c9027e",
        "japanese": "まいあさ",
        "kanji": "毎朝",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-6fde4246c2fe47b2",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "まいにち",
    "kana": "まいにち",
    "c": "毎日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "6fde4246c2fe47b2"
    ],
    "sources": [
      {
        "key": "6fde4246c2fe47b2",
        "japanese": "まいにち",
        "kanji": "毎日",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-3395ecf63186e543",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "まいにちや",
    "kana": "まいにちや",
    "c": "毎日屋",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "3395ecf63186e543"
    ],
    "sources": [
      {
        "key": "3395ecf63186e543",
        "japanese": "まいにちや",
        "kanji": "毎日屋",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-6ebd4ea5ad7d225d",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "まいばん",
    "kana": "まいばん",
    "c": "毎晩",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "6ebd4ea5ad7d225d"
    ],
    "sources": [
      {
        "key": "6ebd4ea5ad7d225d",
        "japanese": "まいばん",
        "kanji": "毎晩",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-cb864db04f6b762e",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "phrases",
    "jp": "～まで",
    "kana": "",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "cb864db04f6b762e"
    ],
    "sources": [
      {
        "key": "cb864db04f6b762e",
        "japanese": "～まで",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-d8eedc840c49b87b",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "まん",
    "kana": "まん",
    "c": "万",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "d8eedc840c49b87b"
    ],
    "sources": [
      {
        "key": "d8eedc840c49b87b",
        "japanese": "まん",
        "kanji": "万",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-4eb49f0d02d973b0",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "みず",
    "kana": "みず",
    "c": "水",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "4eb49f0d02d973b0"
    ],
    "sources": [
      {
        "key": "4eb49f0d02d973b0",
        "japanese": "みず",
        "kanji": "水",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-c1bbf30546c0876e",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "みせ",
    "kana": "みせ",
    "c": "店",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "c1bbf30546c0876e"
    ],
    "sources": [
      {
        "key": "c1bbf30546c0876e",
        "japanese": "みせ",
        "kanji": "店",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-468ba0b25a9e4eec",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "phrases",
    "jp": "[～を] みせて ください。",
    "kana": "",
    "c": "[～を] 見せて ください。",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "468ba0b25a9e4eec"
    ],
    "sources": [
      {
        "key": "468ba0b25a9e4eec",
        "japanese": "[～を] みせて ください。",
        "kanji": "[～を] 見せて ください。",
        "chapter": "3",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV",
      "Reading requires review (annotated or mixed form)"
    ]
  },
  {
    "id": "csv-4da5f65019726165",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "みっか",
    "kana": "みっか",
    "c": "3日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "4da5f65019726165"
    ],
    "sources": [
      {
        "key": "4da5f65019726165",
        "japanese": "みっか",
        "kanji": "3日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-66de446833eb258e",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "みどりとしょかん",
    "kana": "みどりとしょかん",
    "c": "みどり図書館",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "66de446833eb258e"
    ],
    "sources": [
      {
        "key": "66de446833eb258e",
        "japanese": "みどりとしょかん",
        "kanji": "みどり図書館",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-1ff1d8b46cf7910c",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "みます",
    "kana": "みます",
    "c": "見ます",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "1ff1d8b46cf7910c"
    ],
    "sources": [
      {
        "key": "1ff1d8b46cf7910c",
        "japanese": "みます",
        "kanji": "見ます",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-bc3c569041e86eb6",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "ミルク",
    "kana": "みるく",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "bc3c569041e86eb6"
    ],
    "sources": [
      {
        "key": "bc3c569041e86eb6",
        "japanese": "ミルク",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-b65570a0efd59fe4",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "むいか",
    "kana": "むいか",
    "c": "6日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "b65570a0efd59fe4"
    ],
    "sources": [
      {
        "key": "b65570a0efd59fe4",
        "japanese": "むいか",
        "kanji": "6日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-15a68a335b8ce750",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "メキシコ",
    "kana": "めきしこ",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "15a68a335b8ce750"
    ],
    "sources": [
      {
        "key": "15a68a335b8ce750",
        "japanese": "メキシコ",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-f993b8b74d1919f7",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "もくようび",
    "kana": "もくようび",
    "c": "木曜日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "f993b8b74d1919f7"
    ],
    "sources": [
      {
        "key": "f993b8b74d1919f7",
        "japanese": "もくようび",
        "kanji": "木曜日",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-0bad5ff77209d4f0",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "やさい",
    "kana": "やさい",
    "c": "野菜",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "0bad5ff77209d4f0"
    ],
    "sources": [
      {
        "key": "0bad5ff77209d4f0",
        "japanese": "やさい",
        "kanji": "野菜",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-0b01393623a71f8d",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "やすみ",
    "kana": "やすみ",
    "c": "休み",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "0b01393623a71f8d"
    ],
    "sources": [
      {
        "key": "0b01393623a71f8d",
        "japanese": "やすみ",
        "kanji": "休み",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-7e477c4b4eb8f05a",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "やすみます",
    "kana": "やすみます",
    "c": "休みます",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "7e477c4b4eb8f05a"
    ],
    "sources": [
      {
        "key": "7e477c4b4eb8f05a",
        "japanese": "やすみます",
        "kanji": "休みます",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-1e3eb74820c8a86e",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "やまとびじゅつかん",
    "kana": "やまとびじゅつかん",
    "c": "やまと美術館",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "1e3eb74820c8a86e"
    ],
    "sources": [
      {
        "key": "1e3eb74820c8a86e",
        "japanese": "やまとびじゅつかん",
        "kanji": "やまと美術館",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-b11fbdb1483f75a8",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "ゆうびんきょく",
    "kana": "ゆうびんきょく",
    "c": "郵便局",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "b11fbdb1483f75a8"
    ],
    "sources": [
      {
        "key": "b11fbdb1483f75a8",
        "japanese": "ゆうびんきょく",
        "kanji": "郵便局",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-98d3825988ce5f0a",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "ようか",
    "kana": "ようか",
    "c": "8日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "98d3825988ce5f0a"
    ],
    "sources": [
      {
        "key": "98d3825988ce5f0a",
        "japanese": "ようか",
        "kanji": "8日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-db95619e9dabec3f",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "よっか",
    "kana": "よっか",
    "c": "4日",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "db95619e9dabec3f"
    ],
    "sources": [
      {
        "key": "db95619e9dabec3f",
        "japanese": "よっか",
        "kanji": "4日",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-41e7fb780375c38e",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "よみます",
    "kana": "よみます",
    "c": "読みます",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "41e7fb780375c38e"
    ],
    "sources": [
      {
        "key": "41e7fb780375c38e",
        "japanese": "よみます",
        "kanji": "読みます",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-36fa32ead5a6c7e0",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "よる",
    "kana": "よる",
    "c": "夜",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "36fa32ead5a6c7e0"
    ],
    "sources": [
      {
        "key": "36fa32ead5a6c7e0",
        "japanese": "よる",
        "kanji": "夜",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-9263b75441c6fb63",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "らいげつ",
    "kana": "らいげつ",
    "c": "来月",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "9263b75441c6fb63"
    ],
    "sources": [
      {
        "key": "9263b75441c6fb63",
        "japanese": "らいげつ",
        "kanji": "来月",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-3fd555b0c01ae8b3",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "らいしゅう",
    "kana": "らいしゅう",
    "c": "来週",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "3fd555b0c01ae8b3"
    ],
    "sources": [
      {
        "key": "3fd555b0c01ae8b3",
        "japanese": "らいしゅう",
        "kanji": "来週",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-07d7f60a32c5d106",
    "ch": 5,
    "chapters": [
      5
    ],
    "group": "core",
    "jp": "らいねん",
    "kana": "らいねん",
    "c": "来年",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "07d7f60a32c5d106"
    ],
    "sources": [
      {
        "key": "07d7f60a32c5d106",
        "japanese": "らいねん",
        "kanji": "来年",
        "chapter": "5",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-1dcf2c3f1c019d5f",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "core",
    "jp": "レポート",
    "kana": "れぽーと",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "1dcf2c3f1c019d5f"
    ],
    "sources": [
      {
        "key": "1dcf2c3f1c019d5f",
        "japanese": "レポート",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-da11587177383cd6",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "ロサンゼルス",
    "kana": "ろさんぜるす",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "da11587177383cd6"
    ],
    "sources": [
      {
        "key": "da11587177383cd6",
        "japanese": "ロサンゼルス",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-55da2a85702fd5bb",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "ロビー",
    "kana": "ろびー",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "places",
    "csvKeys": [
      "55da2a85702fd5bb"
    ],
    "sources": [
      {
        "key": "55da2a85702fd5bb",
        "japanese": "ロビー",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-78cc2edda06fb703",
    "ch": 4,
    "chapters": [
      4
    ],
    "group": "core",
    "jp": "ロンドン",
    "kana": "ろんどん",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-vocabulary",
    "csvKeys": [
      "78cc2edda06fb703"
    ],
    "sources": [
      {
        "key": "78cc2edda06fb703",
        "japanese": "ロンドン",
        "kanji": "",
        "chapter": "4",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-f830be35a53680d5",
    "ch": 3,
    "chapters": [
      3
    ],
    "group": "core",
    "jp": "ワイン",
    "kana": "わいん",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "food",
    "csvKeys": [
      "f830be35a53680d5"
    ],
    "sources": [
      {
        "key": "f830be35a53680d5",
        "japanese": "ワイン",
        "kanji": "",
        "chapter": "3",
        "page": "",
        "category": "Vocabulary"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  },
  {
    "id": "csv-43dcdb53d41a80e5",
    "ch": 6,
    "chapters": [
      6
    ],
    "group": "phrases",
    "jp": "わかりました。",
    "kana": "わかりました",
    "c": "X",
    "en": "",
    "zh": "",
    "page": null,
    "note": "",
    "category": "source-expressions",
    "csvKeys": [
      "43dcdb53d41a80e5"
    ],
    "sources": [
      {
        "key": "43dcdb53d41a80e5",
        "japanese": "わかりました。",
        "kanji": "",
        "chapter": "6",
        "page": "",
        "category": "Expression"
      }
    ],
    "reviewIssues": [
      "Meaning and translations absent from CSV"
    ]
  }
];
for(const incoming of CHAPTER_IMPORT_WORDS){const existing=WORDS.find(w=>w.id===incoming.id);if(existing)Object.assign(existing,incoming);else WORDS.push(incoming);}
const CHAPTER_IMPORT_CATEGORIES=[
  {
    "id": "people",
    "label": "People & forms of address",
    "description": "Pronouns, ways to refer to people, and name endings.",
    "ids": [
      "1-01",
      "1-02",
      "1-03a",
      "1-03b",
      "1-04",
      "1-05",
      "csv-85fc29e4499613fa",
      "csv-3ba73c6ea36b4989",
      "csv-d4dffb5a5b803637",
      "csv-66356e973c57c474"
    ]
  },
  {
    "id": "occupations",
    "label": "Jobs & roles",
    "description": "Teachers, students and other occupations.",
    "ids": [
      "1-07",
      "1-08",
      "1-09",
      "1-10",
      "1-11",
      "1-12",
      "1-13",
      "1-14"
    ]
  },
  {
    "id": "places",
    "label": "Places",
    "description": "University and hospital.",
    "ids": [
      "1-15",
      "1-16",
      "csv-47abc6e5208cad6d",
      "csv-c7b62612eee2fd68",
      "csv-96faf26ff6e24abe",
      "csv-5c19674bccff38cc",
      "csv-a3c7305e35ec0bb3",
      "csv-42c30b5cfe318433",
      "csv-3b693859f9dedc50",
      "csv-ec4cba5d7986cb2e",
      "csv-97ecc501b1cb7c5c",
      "csv-b630f288931b1e0d",
      "csv-9f28616c1abd0df0",
      "csv-3e715ed68e25a4b2",
      "csv-b39f72fcf4f7e700",
      "csv-257eb66feb0a09a6",
      "csv-a49f4fd74e4b776a",
      "csv-b11fbdb1483f75a8",
      "csv-55da2a85702fd5bb"
    ]
  },
  {
    "id": "nationality",
    "label": "Countries & nationality",
    "description": "Country names and the nationality ending.",
    "ids": [
      "1-06",
      "1-r1",
      "1-r2",
      "1-r3",
      "1-r4",
      "1-r5",
      "1-r6",
      "1-r7",
      "1-r8",
      "1-r9",
      "1-r10"
    ]
  },
  {
    "id": "questions",
    "label": "Questions & age",
    "description": "Who, what, how old, and the age ending.",
    "ids": [
      "1-17a",
      "1-17b",
      "1-18",
      "1-19a",
      "1-19b",
      "2-36",
      "csv-5820ce9c10bf95fb",
      "csv-ab968e2cd360cb94",
      "csv-da275c2671ca3790",
      "csv-eeb21f6be3d69376",
      "csv-804aba7ce89c0b43",
      "csv-61d84228493517e8",
      "csv-c8125aa6b2d08005",
      "csv-02f9970a520aca34",
      "csv-5b2bd2f1b059a707",
      "csv-9211080b604c7214",
      "csv-709bbe360bfb0610"
    ]
  },
  {
    "id": "demonstratives",
    "label": "This and that",
    "description": "Words that point to things near you, near the listener, or far away.",
    "ids": [
      "2-01",
      "2-02",
      "2-03",
      "2-04",
      "2-05",
      "2-06",
      "csv-2149fde02ce70ba4",
      "csv-dcbf18e73d466200",
      "csv-736ca436d91bce5f",
      "csv-5b6dad8bf63aea6d",
      "csv-ab7df75a603e51de",
      "csv-9f118c1d866c7b12"
    ]
  },
  {
    "id": "objects",
    "label": "Objects",
    "description": "Books, stationery, electronics, furniture and other everyday things.",
    "ids": [
      "2-07",
      "2-08",
      "2-09",
      "2-10",
      "2-11",
      "2-12",
      "2-13",
      "2-14",
      "2-15",
      "2-16",
      "2-17",
      "2-18",
      "2-19",
      "2-20",
      "2-21",
      "2-22",
      "2-23",
      "2-24",
      "2-25",
      "2-26",
      "2-27",
      "2-28",
      "2-29",
      "2-32a",
      "2-32b"
    ]
  },
  {
    "id": "food",
    "label": "Food & drinks",
    "description": "Chocolate and coffee.",
    "ids": [
      "2-30",
      "2-31",
      "csv-49dbdb19c4ed703b",
      "csv-466ef427aeaa04c0",
      "csv-73d6ed4fb078beac",
      "csv-c5e1b6f79ac06f78",
      "csv-c95c5a42a2c4dc0f",
      "csv-8f8245c5ed921c82",
      "csv-6bcbca4ff9d1339c",
      "csv-5d4309a567cd471b",
      "csv-b4278971fe60aaba",
      "csv-59fc344c5d6c0e5b",
      "csv-9d3438acae746a2b",
      "csv-b7e64825c6bfc605",
      "csv-de32617ea8103232",
      "csv-affaad7513b5d4c8",
      "csv-c90996b5e92d7c1e",
      "csv-1e0b486bbcdc48d6",
      "csv-4eb49f0d02d973b0",
      "csv-bc3c569041e86eb6",
      "csv-0bad5ff77209d4f0",
      "csv-f830be35a53680d5"
    ]
  },
  {
    "id": "languages",
    "label": "Languages",
    "description": "English, Japanese and the language ending.",
    "ids": [
      "2-33",
      "2-34",
      "2-35"
    ]
  },
  {
    "id": "introductions",
    "label": "Introductions & greetings",
    "description": "Meeting people, asking names and making introductions.",
    "ids": [
      "1-c1",
      "1-c2",
      "1-c3a",
      "1-c3b",
      "1-c3c",
      "1-c3d",
      "1-c5",
      "1-c6",
      "2-d1",
      "2-d2a",
      "2-d2b",
      "2-d2c",
      "2-d2d"
    ]
  },
  {
    "id": "courtesy",
    "label": "Polite expressions & thanks",
    "description": "Getting attention, offering something and saying thank you.",
    "ids": [
      "1-c4",
      "2-c1",
      "2-c3",
      "2-c4a",
      "2-c4b",
      "2-c4c",
      "2-c4d"
    ]
  },
  {
    "id": "replies",
    "label": "Replies & reactions",
    "description": "Yes and no, agreement, surprise and understanding.",
    "ids": [
      "1-20",
      "1-21",
      "2-37",
      "2-c2",
      "2-c5",
      "2-c6",
      "2-c7"
    ]
  },
  {
    "id": "source-vocabulary",
    "label": "Vocabulary",
    "description": "Imported content awaiting meaning review.",
    "ids": [
      "csv-3c7d4b08462bc4f1",
      "csv-7177af3f64881d19",
      "csv-388af0640c608442",
      "csv-86033a7fcffd7a42",
      "csv-20a18f0fe3a79474",
      "csv-ed0fd250bb393be6",
      "csv-a20e75f39da44b49",
      "csv-f50227659b484b36",
      "csv-e5f8b4417ebfe19c",
      "csv-7b7a65b97e017a61",
      "csv-5c0a9a882b9d9a39",
      "csv-ddb642595b09a8d7",
      "csv-c3c059abac5ad613",
      "csv-7f048f05fae2b351",
      "csv-9ee89070e9ecd580",
      "csv-31d9b81b01c8caf1",
      "csv-bd7ed3e561d8f856",
      "csv-59ad683a4f84dd5e",
      "csv-357a6ee57f2f4f5e",
      "csv-f0a8ad38c4b26077",
      "csv-a22105b120419229",
      "csv-5e7d0ce40b26cb2b",
      "csv-8976cfb218dc9695",
      "csv-eac5be1a132a8628",
      "csv-36a14c686f5072d1",
      "csv-8ad6592be9552403",
      "csv-c9f11c91beceba8f",
      "csv-c04f54886314a802",
      "csv-df823f0054e95444",
      "csv-a24023d5cf432e72",
      "csv-d0b1c1b9cff1afa8",
      "csv-8c5648c4373536d6",
      "csv-75b0e4c01e1d84c5",
      "csv-0ade0376ffe6e67d",
      "csv-d210788ec91c38a2",
      "csv-97d70ee391716129",
      "csv-0399b8dc98b5e1f7",
      "csv-a868b59281a163d0",
      "csv-ef428a083ebfc416",
      "csv-a8af0a9b35d000ee",
      "csv-8471042aadac7ed5",
      "csv-20cc9112529e17dc",
      "csv-fd367b096e229af0",
      "csv-28e2535376fd8952",
      "csv-24110f167642a49c",
      "csv-88e16b624f08ea7d",
      "csv-c221dba0167ae1e9",
      "csv-22ae083e6a1b254f",
      "csv-30b189ebcd7003c3",
      "csv-c803b519e3fc772d",
      "csv-17a1e9fa6d674c24",
      "csv-ac175b9b3739e283",
      "csv-5babde796c69ee99",
      "csv-7dc41055c5283da3",
      "csv-5f75683c732e90c5",
      "csv-50f1e3f0d55ae59e",
      "csv-5a10eafbbd35a055",
      "csv-f47438960f134c01",
      "csv-e1fe9fe823893e71",
      "csv-6108692c5a4192be",
      "csv-636d771fbcf06c13",
      "csv-b18a5ba6256ca74e",
      "csv-e8e2f46fabc20cd4",
      "csv-c91023ffad8c20d9",
      "csv-75cc337163f92d4a",
      "csv-2fc9f222399f3db8",
      "csv-8c8770a8bd199980",
      "csv-af1a037008532065",
      "csv-3121bf370e394d08",
      "csv-23b4d2461d6440ab",
      "csv-3c6769841cb20689",
      "csv-1d44190694449872",
      "csv-6cec773780557979",
      "csv-39827ceb3d02520a",
      "csv-47e0d02b093eaa10",
      "csv-9c2a0dad1676a16c",
      "csv-15fcfa0f2e316f12",
      "csv-8fea79d5439bf91d",
      "csv-f66659321ab61768",
      "csv-c2a089d9c108210d",
      "csv-184a04e7c5d4fccd",
      "csv-e0ef263ea957a0ed",
      "csv-c11a3275fec09a2b",
      "csv-1981cf9bdbeb6a22",
      "csv-877ca5f99e8338a8",
      "csv-f20e55f3aa3b9c16",
      "csv-9c701220455cac91",
      "csv-6b187d085f20d980",
      "csv-ee51b3e0ae0fd355",
      "csv-0f0af44cce4a281f",
      "csv-cc1157bdb7daec7d",
      "csv-5702f6977f743b93",
      "csv-6c2b8b903cb99e2e",
      "csv-37a34299f8aac5ba",
      "csv-9eed675097e32f3a",
      "csv-cf9d68d877adf1cd",
      "csv-80e2b972cd3e2a7b",
      "csv-4079e2a4d9c90208",
      "csv-d5eb58bc9fda4560",
      "csv-fe19f59584c74922",
      "csv-53301c9bbfca67e7",
      "csv-8605d60ced6fcfc3",
      "csv-94a36930bfbb9722",
      "csv-866bfdb4796056e3",
      "csv-ed8b2091e64b9057",
      "csv-baf16aec6f47fddc",
      "csv-59357d2a2ba16d1d",
      "csv-28b35d9b1a29e3bd",
      "csv-65b30d156c2fe4df",
      "csv-ff36cec9ccb3b7f6",
      "csv-d4c367f50c5fdddb",
      "csv-f8aa1519a9a40a91",
      "csv-c98d6b858839265e",
      "csv-c0f29d3056decb53",
      "csv-a21d0ee87a3c3deb",
      "csv-d174a32922550b37",
      "csv-ad4bed84d1d20277",
      "csv-fabae63a62509b27",
      "csv-f0808db02826751c",
      "csv-2027eb0abebd2ddc",
      "csv-1c673828b19f140f",
      "csv-3236ade61764e870",
      "csv-7048eafe3ccb9af5",
      "csv-337bdbc7d43ef9ad",
      "csv-7397e594beb9d693",
      "csv-2b5c2978ec80433f",
      "csv-b199fcf6b483fa68",
      "csv-34928d4434867cd0",
      "csv-40d939631b618203",
      "csv-5d624a3f65c5328e",
      "csv-453767b05cb5e14e",
      "csv-1a940afe26c9027e",
      "csv-6fde4246c2fe47b2",
      "csv-3395ecf63186e543",
      "csv-6ebd4ea5ad7d225d",
      "csv-d8eedc840c49b87b",
      "csv-c1bbf30546c0876e",
      "csv-4da5f65019726165",
      "csv-66de446833eb258e",
      "csv-1ff1d8b46cf7910c",
      "csv-b65570a0efd59fe4",
      "csv-15a68a335b8ce750",
      "csv-f993b8b74d1919f7",
      "csv-0b01393623a71f8d",
      "csv-7e477c4b4eb8f05a",
      "csv-1e3eb74820c8a86e",
      "csv-98d3825988ce5f0a",
      "csv-db95619e9dabec3f",
      "csv-41e7fb780375c38e",
      "csv-36fa32ead5a6c7e0",
      "csv-9263b75441c6fb63",
      "csv-3fd555b0c01ae8b3",
      "csv-07d7f60a32c5d106",
      "csv-1dcf2c3f1c019d5f",
      "csv-da11587177383cd6",
      "csv-78cc2edda06fb703"
    ]
  },
  {
    "id": "source-expressions",
    "label": "Expressions",
    "description": "Imported content awaiting meaning review.",
    "ids": [
      "csv-9eebca0faf03e6d1",
      "csv-8b77245faf60fc4f",
      "csv-d9340bfd67eb4f1c",
      "csv-9a3a4421ce87643e",
      "csv-89e7a999c484607d",
      "csv-edd304f5c1f4ba4d",
      "csv-a0827d7777003ef6",
      "csv-bc24d192836412e5",
      "csv-7429b0353d78ce6c",
      "csv-2d18eee2beaa33a9",
      "csv-e0254d6a929be2c4",
      "csv-e71873a7c50a3455",
      "csv-47173ba7dbcc1ba8",
      "csv-626cfb072a80fcbb",
      "csv-fe800f6d19179334",
      "csv-09ef7fdadc105ce9",
      "csv-1d26a3f31f546046",
      "csv-db54bd3debae83c5",
      "csv-7102dff50ca5a822",
      "csv-7b39f2af6e32e892",
      "csv-4f20834e51a03b0c",
      "csv-1e29ff5690e69b84",
      "csv-cb864db04f6b762e",
      "csv-468ba0b25a9e4eec",
      "csv-43dcdb53d41a80e5"
    ]
  }
];
for(const incoming of CHAPTER_IMPORT_CATEGORIES){const existing=VOCAB_CATEGORIES.find(c=>c.id===incoming.id);if(existing)Object.assign(existing,incoming);else VOCAB_CATEGORIES.push(incoming);}
VOCAB_CATEGORY_BY_WORD.clear();for(const category of VOCAB_CATEGORIES)for(const id of category.ids)VOCAB_CATEGORY_BY_WORD.set(id,category);
const EXPRESSIONS=WORDS.filter(w=>w.group==='phrases'||w.sources?.some(s=>s.category==='Expression'));
const wordChapters=w=>w.chapters||[w.ch];
const wordGameReady=w=>!!w?.kana&&!!w.en&&!!w.zh&&!w.reviewIssues?.length;
