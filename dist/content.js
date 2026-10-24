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

// Study categories within the printed main vocabulary; the source group remains core.
const MAIN_VOCAB_CATEGORIES={
  occupations:['1-07','1-08','1-09','1-10','1-11','1-12','1-13','1-14'],
  places:['1-15','1-16'],
  demonstratives:['2-01','2-02','2-03','2-04','2-05','2-06'],
  objects:['2-07','2-08','2-09','2-10','2-11','2-12','2-13','2-14','2-15','2-16','2-17','2-18','2-19','2-20','2-21','2-22','2-23','2-24','2-25','2-26','2-27','2-28','2-29','2-30','2-31','2-32a','2-32b']
};
const MAIN_VOCAB_CATEGORY_BY_ID=new Map(Object.entries(MAIN_VOCAB_CATEGORIES).flatMap(([category,ids])=>ids.map(id=>[id,category])));
function vocabularySection(w){return w.group==='core'?(MAIN_VOCAB_CATEGORY_BY_ID.get(w.id)||'core'):w.group;}

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
