'use strict';
// Original short teaching exchanges within the supplied chapters, not listening transcripts.
const CHAPTER_DIALOGUES=[];
const lessonTurn=(speaker,ja,en,zh)=>[speaker,ja,en,zh];
function lesson(ch,id,word,category,labels,scene,opening,answer,frame,reply,note,visual=null,distractors=[]){
  const q={id:`ch${ch}-${id}`,word,ch,category,labels,scene:scene[0],sceneZh:scene[1],kana:answer,sentence:frame,replyEn:reply[0],replyZh:reply[1],why:note[0],whyZh:note[1],visual,distractors,family:`ch${ch}-${id}`,target:answer,lesson:true};
  const turns=[lessonTurn('listener',...opening),lessonTurn('you',frame.replace('{word}',answer),...reply)];
  q.turns=turns;DIALOGUES.push(q);CHAPTER_DIALOGUES.push(q);CONVERSATIONS[q.id]=[...scene,turns];
  CHAPTER_TRANSLATIONS[note[0]]=note[1];CHAPTER_TRANSLATIONS[scene[0]]=scene[1];return q;
}
for(const id of ['locations','numbers','time','days','activities','schedules'])DIALOGUE_CATEGORIES.push({...VOCAB_CATEGORIES.find(c=>c.id===id)});
const LOC_NOTE=['Location words name places. ここ is near the speaker, そこ near the listener, and あそこ far from both. これ・それ・あれ name objects.','位置詞指場所：ここ近說話者、そこ近聽者、あそこ離雙方遠。これ、 それ、あれ指物品。'];
const POLITE_LOC_NOTE=['こちら・そちら・あちら are polite location or direction expressions. The point of reference is the person speaking.','こちら、そちら、あちら是指出位置或方向的禮貌說法，位置以說話者為準。'];
for(const [row,answer,location,en,zh,polite] of [
 ['01','ここ','speaker','Here','這裡',false],['02','そこ','listener','There','那裡',false],['03','あそこ','far','Over there','那邊',false],
 ['05','こちら','speaker','This way','這邊',true],['06','そちら','listener','That way','那邊（近）',true],['07','あちら','far','Over that way','那邊（遠）',true]]){
  const distance={speaker:['near you','靠近你'],listener:['near the listener','靠近聽者'],far:['far from both people','離雙方都遠']}[location];
  lesson(3,`location-${row}`,`3-${row}`,'locations',[en,zh],[`The reception is ${distance[0]}. Reply using the ${polite?'polite':'standard'} location word.`,`接待處${distance[1]}。用${polite?'禮貌':'一般'}位置詞回答。`],['うけつけはどこですか。','Where is reception?','接待處在哪裡？'],answer,'{word}です。',[`It is ${en.toLowerCase()}.`,`在${zh}。`],polite?POLITE_LOC_NOTE:LOC_NOTE,{type:'location',location,label:'受付'},polite?['こちら','そちら','あちら'].filter(x=>x!==answer):['ここ','そこ','あそこ'].filter(x=>x!==answer));
}
lesson(3,'identify','3-09','locations',['This place','這個場所'],['You are in the classroom. Identify the place.','你在教室裡。說出這是甚麼場所。'],['ここはなんですか。','What is this place?','這是甚麼地方？'],'きょうしつ','ここは{word}です。',['This is the classroom.','這裡是教室。'],['ここは～です identifies the place near the speaker.','ここは～です用來介紹說話者所在的地方。'],{type:'location',location:'speaker',label:'教室'},['しょくどう','じむしょ','ロビー']);
lesson(3,'where','3-04','locations',['Where?','在哪裡'],['Ask where the meeting room is, using the standard question word.','用一般說法問會議室在哪裡。'],['こんにちは。','Hello.','你好。'],'どこ','かいぎしつは{word}ですか。',['Where is the meeting room?','會議室在哪裡？'],['～はどこですか asks where a place, person or object is.','～はどこですか可詢問場所、人物或物品的位置。'],null,['なん','だれ','いくら']).turns.push(lessonTurn('listener','あそこです。','It is over there.','在那邊。'));
lesson(3,'where-polite','3-08','locations',['Where · polite','哪邊 · 禮貌'],['Ask where the office is, using the polite question word.','用禮貌說法問辦公室在哪邊。'],['こんにちは。','Hello.','你好。'],'どちら','じむしょは{word}ですか。',['Where is the office? (polite)','請問辦公室在哪邊？'],POLITE_LOC_NOTE,null,['こちら','そちら','あちら']).turns.push(lessonTurn('listener','あちらです。','It is over that way.','在那邊。'));
lesson(3,'person','3-12','locations',['Find a person','找人'],['The teacher is in the meeting room. Answer with the room name.','老師在會議室。用房間名稱回答。'],['せんせいはどこですか。','Where is the teacher?','老師在哪裡？'],'かいぎしつ','{word}です。',['The teacher is in the meeting room.','老師在會議室。'],['A place + です answers a location question about a person here.','這裡可用「場所＋です」回答人物在哪裡。'],{type:'card',heading:'先生',value:'会議室'},['しょくどう','ロビー','うち']);
lesson(3,'object','3-11','locations',['Find an object','找物品'],['The meeting-room key is in the office.','會議室的鑰匙在辦公室。'],['かいぎしつのかぎはどこですか。','Where is the meeting-room key?','會議室的鑰匙在哪裡？'],'じむしょ','{word}です。',['It is in the office.','在辦公室。'],['Use どこ for the location of an object; 何 asks what the object is.','どこ詢問物品的位置；何詢問是甚麼物品。'],{type:'card',heading:'🔑',value:'事務所'},['きょうしつ','しょくどう','うち']);
lesson(3,'floor-question','3-31','numbers',['Which floor?','幾樓'],['Ask which floor the shoe department is on.','問鞋子專櫃在幾樓。'],['いらっしゃいませ。','Welcome.','歡迎光臨。'],'なんがい','くつうりばは{word}ですか。',['Which floor is the shoe department on?','鞋子專櫃在幾樓？'],['何階 is なんがい. Watch 1F いっかい, 3F さんがい and 6F ろっかい.','何階讀作なんがい。留意一樓いっかい、三樓さんがい、六樓ろっかい。'],{type:'floors',rows:[['3F','靴'],['2F','ネクタイ'],['1F','受付'],['B1F','ワイン']]},['いくら','なんじ','なんばん']).turns.push(lessonTurn('listener','さんがいです。','It is on the third floor.','在三樓。'));
lesson(3,'floor-answer','3-30b','numbers',['On the third floor','在三樓'],['The shoe department is marked 3F. Give its floor.','鞋子專櫃標示為3F。回答樓層。'],['くつうりばはなんがいですか。','Which floor is the shoe department on?','鞋子專櫃在幾樓？'],'さんがい','{word}です。',['It is on the third floor.','在三樓。'],['Practise the textbook reading さんがい for 3階. 地下1階 is ちかいっかい.','本課練習3階的さんがい讀音。地下1階讀作ちかいっかい。'],{type:'floors',rows:[['3F','靴'],['2F','ネクタイ'],['1F','受付'],['B1F','ワイン']]},['さんじ','にかい','ちかいっかい']);
for(const [id,word,label,topic,answer,answerEn,answerZh] of [
 ['country','3-22b',['Your country','您的國家'],'おくに','フランス','France','法國'],
 ['company','3-23',['Your company','您的公司'],'かいしゃ','ＩＭＣ','IMC','IMC'],
 ['university','1-15',['Your university','您的大學'],'だいがく','さくらだいがく','Sakura University','櫻花大學']]){
 const q=lesson(3,id,word,'locations',label,[`Ask which ${id} the listener belongs to, politely.`,`禮貌地詢問對方的${label[1].replace('您的','')}。`],['はじめまして。','Nice to meet you.','初次見面。'],'どちら',`${topic}は{word}ですか。`,[`Which ${id} are you from?`,`請問您的${label[1].replace('您的','')}是？`],['どちら politely asks a country or affiliation. 会社／大学はどこですか can ask an affiliation or a location depending on context.','どちら可禮貌地詢問國家或所屬機構。会社／大学はどこですか依語境可問所屬機構或地點。'],null,['こちら','そちら','あちら']);
 q.turns.push(lessonTurn('listener',`${answer}です。`,`I am from ${answerEn}.`,`我來自${answerZh}。`));
}
lesson(3,'origin','3-r1','numbers',['Made where?','哪裡製造'],['Ask which country the wine comes from.','問葡萄酒來自哪個國家。'],['いらっしゃいませ。','Welcome.','歡迎光臨。'],'どこ','これは{word}のワインですか。',['Which country is this wine from?','這是哪個國家的葡萄酒？'],['どこの + product asks where the product comes from. A country + の describes its origin.','どこの＋商品可問產地；「國家＋の」說明來源。'],{type:'product',name:'ワイン',origin:'イタリア',price:2500},['なん','だれ','なんじ']).turns.push(lessonTurn('listener','イタリアのワインです。','It is Italian wine.','是義大利的葡萄酒。'));
lesson(3,'price-question','3-33','numbers',['How much?','多少錢'],['Ask the price of the tie.','詢問領帶的價格。'],['いらっしゃいませ。','Welcome.','歡迎光臨。'],'いくら','このネクタイは{word}ですか。',['How much is this tie?','這條領帶多少錢？'],['いくら asks a price; 円 follows the number.','いくら詢問價格；円放在數字後。'],{type:'product',name:'ネクタイ',price:1500},['どこ','なんがい','なんばん']).turns.push(lessonTurn('listener','せんごひゃくえんです。','It is 1,500 yen.','一千五百日圓。'));
lesson(3,'price-answer','3-34','numbers',['600 yen','六百日圓'],['Read the coffee price tag: ¥600.','讀出咖啡標價：¥600。'],['このコーヒーはいくらですか。','How much is this coffee?','這款咖啡多少錢？'],'ろっぴゃくえん','{word}です。',['It is 600 yen.','六百日圓。'],['600 is ろっぴゃく. Also check 300 さんびゃく, 800 はっぴゃく, 3,000 さんぜん and 8,000 はっせん.','600讀作ろっぴゃく。也要留意300さんびゃく、800はっぴゃく、3000さんぜん、8000はっせん。'],{type:'product',name:'コーヒー',price:600},['ろくひゃくえん','はっぴゃくえん','ろくせんえん']);
lesson(3,'welcome','3-c1','courtesy',['Welcome','歡迎光臨'],['You are the shop assistant. Welcome a customer.','你是店員。歡迎客人。'],['こんにちは。','Hello.','你好。'],'いらっしゃいませ','{word}。',['Welcome.','歡迎光臨。'],['The shop assistant says いらっしゃいませ to a customer.','店員用いらっしゃいませ歡迎客人。'],{type:'product',name:'ネクタイ',price:1500},['どうも','すみません','じゃ']);
lesson(3,'show','3-c2','courtesy',['Show me','讓我看看'],['Ask the assistant to show you the wine near them.','請店員讓你看看靠近他們的葡萄酒。'],['いらっしゃいませ。','Welcome.','歡迎光臨。'],'みせてください','そのワインを{word}。',['Please show me that wine.','請讓我看看那瓶葡萄酒。'],['Learn ～を見せてください as this chapter’s shopping expression. その modifies ワイン.','將～を見せてください當作本課購物用語學習。 その修飾ワイン。'],{type:'product',name:'ワイン',price:2500},['ください','どうも','いらっしゃいませ']).turns.push(lessonTurn('listener','はい、どうぞ。','Yes, here you are.','好的，請看。'));
lesson(3,'buy','3-c4','courtesy',['I’ll take it','請給我'],['You have chosen the tie. Ask to buy it, starting with “well then”.','你選好了領帶。以「那麼」開頭，表示要買這件。'],['せんごひゃくえんです。','It is 1,500 yen.','一千五百日圓。'],'じゃ、これをください','{word}。',['Well then, I will take this.','那麼，請給我這件。'],['じゃ means “well then”. ～をください requests an item.','じゃ是「那麼」。～をください用來索取物品。'],{type:'product',name:'ネクタイ',price:1500},['じゃ、これをみせてください','すみません','どうも']);
lesson(3,'excuse','3-p1','courtesy',['Excuse me','不好意思'],['Politely get someone’s attention before asking where the toilets are.','問廁所位置前，先禮貌地引起對方注意。'],['こんにちは。','Hello.','你好。'],'すみません','{word}。トイレはどこですか。',['Excuse me. Where are the toilets?','不好意思，廁所在哪裡？'],['すみません can get attention or apologise.','すみません可用來引起注意或道歉。'],null,['どうも','いらっしゃいませ','じゃ']).turns.push(lessonTurn('listener','あそこです。','Over there.','在那邊。'));
lesson(3,'thanks','3-p2','courtesy',['Thanks','謝謝'],['Thank someone briefly after they give you directions.','對方告訴你方向後，簡短道謝。'],['トイレはあそこです。','The toilets are over there.','廁所在那邊。'],'どうも','{word}。',['Thanks.','謝謝。'],['どうも is a brief thank-you in this exchange.','這段對話的どうも是簡短道謝。'],null,['すみません','いらっしゃいませ','じゃ']);

const TIME_NOTE=['Hours: 4時 よじ, 7時 しちじ, 9時 くじ. Minutes: 1分 いっぷん, 4分 よんぷん, 6分 ろっぷん, 8分 はっぷん, 10分 じゅっぷん.','時刻：4時よじ、7時しちじ、9時くじ。分鐘：1分いっぷん、4分よんぷん、6分ろっぷん、8分はっぷん、10分じゅっぷん。'];
lesson(4,'time-question','4-16','time',['What time?','幾點'],['Ask what time it is now.','問現在幾點。'],['こんにちは。','Hello.','你好。'],'なんじ','いま{word}ですか。',['What time is it now?','現在幾點？'],TIME_NOTE,{type:'clock',hour:4,minute:0},['なんぷん','なんようび','なんばん']).turns.push(lessonTurn('listener','よじです。','It is four o’clock.','四點。'));
for(const [id,h,m,period,half,label,zh,wrong] of [
 ['four',4,0,'',false,'4 o’clock','四點',['しじ','よんじ','しちじ']],
 ['minutes',7,6,'',false,'7:06','七點六分',['しちじろくふん','しちじごふん','くじろっぷん']],
 ['half',9,30,'',true,'Half past nine','九點半',['しちじはん','よじはん','くじごふん']],
 ['am',7,15,'ごぜん',false,'7:15 a.m.','上午七點十五分',['ごごしちじじゅうごふん','ごぜんしちじごふん','ごぜんよじじゅうごふん']],
 ['pm',4,8,'ごご',false,'4:08 p.m.','下午四點八分',['ごぜんよじはっぷん','ごごよじはん','ごごしちじはっぷん']]]){
 const answer=timeReading(h,m,period,half);
 lesson(4,`time-${id}`,'4-13','time',[label,zh],[`Read the clock${half?' using 半':''}${period?' including a.m. or p.m.':''}.`,`讀出時鐘${half?'，使用「半」':''}${period?'並說明上午或下午':''}。`],['いまなんじですか。','What time is it now?','現在幾點？'],answer,'{word}です。',[`It is ${label.replace(/\.$/,'')}.`,`${zh}。`],TIME_NOTE,{type:'clock',hour:h,minute:m,period:period==='ごぜん'?'AM':period==='ごご'?'PM':''},wrong);
}
lesson(4,'weekday-question','4-45','days',['Which weekday?','星期幾'],['Ask what day of the week it is today.','問今天星期幾。'],['こんにちは。','Hello.','你好。'],'なんようび','きょうは{word}ですか。',['What day is it today?','今天星期幾？'],['何曜日 asks the day of the week; 何時 asks the time.','何曜日問星期幾；何時問幾點。'],{type:'calendar',day:1},['なんじ','なんぷん','なんばん']).turns.push(lessonTurn('listener','げつようびです。','It is Monday.','星期一。'));
lesson(4,'weekday-answer','4-40','days',['Wednesday','星期三'],['The calendar marks Wednesday as today. Answer the question.','日曆標示今天是星期三。回答問題。'],['きょうはなんようびですか。','What day is it today?','今天星期幾？'],'すいようび','{word}です。',['It is Wednesday.','星期三。'],['Keep the full ～ようび ending when naming a weekday.','說星期時要保留完整的～ようび。'],{type:'calendar',day:3},['かようび','もくようび','きんようび']);
lesson(4,'opening','4-46','schedules',['Opening hours','營業時間'],['The bank’s timetable shows 09:00–15:00. Answer in twelve-hour time.','銀行時間表是09:00–15:00。以十二小時制回答。'],['ぎんこうはなんじからなんじまでですか。','From what time to what time is the bank open?','銀行從幾點開到幾點？'],'くじからさんじまで','{word}です。',['It is open from nine to three.','從九點到三點。'],['から marks the beginning and まで the end. Do not add に after either.','から表示開始、まで表示結束，兩者後都不加に。'],{type:'schedule',title:'銀行',rows:[['月–金','09:00–15:00'],['土・日','休み']]},['さんじからくじまで','くじからごじまで','しちじからさんじまで']);
lesson(4,'schedule-question','4-16','schedules',['Ask opening hours','問營業時間'],['Ask the library’s opening and closing times.','詢問圖書館開始及結束營業的時間。'],['はい、みどりとしょかんです。','Hello, this is Midori Library.','您好，這裡是綠意圖書館。'],'なんじからなんじまで','そちらは{word}ですか。',['What are your opening hours?','請問你們從幾點開到幾點？'],['On the phone, そちら refers politely to the establishment you are calling.','電話中，そちら禮貌地指通話對方的機構。'],{type:'schedule',title:'図書館',rows:[['月–金','09:00–18:00']]},['なんようび','なんばん','いくら']).turns.push(lessonTurn('listener','くじからろくじまでです。','From nine to six.','從九點到六點。'));
const NI_NOTE=['Use に after a specific time: ろくじに. Do not add に to きょう, あした, きのう, けさ, まいあさ or まいにち. With weekdays, に is optional.','具體時刻後用に，例如ろくじに。きょう、あした、きのう、けさ、まいあさ、まいにち後不加に。星期後的に可省略。'];
for(const [id,word,verb,en,zh,h,period,wrong] of [
 ['wake','4-01','おきます','get up','起床',6,'AM',['ごじに','しちじに','くじに']],
 ['sleep','4-02','ねます','go to bed','睡覺',11,'PM',['くじに','じゅうじに','しちじに']],
 ['finish','4-06','おわります','finish work','工作結束',5,'PM',['さんじに','よじに','ろくじに']]]){
 lesson(4,id,word,'activities',[en[0].toUpperCase()+en.slice(1),zh],[`Your schedule says ${String(h).padStart(2,'0')}:00 ${period}: ${en}. Include に.`,`你的日程是${period==='AM'?'上午':'下午'}${h}點${zh}。回答須包括に。`],[`なんじに${verb}か。`,`What time do you ${en}?`,`你幾點${zh}？`],`${timeReading(h)}に`,`{word}${verb}。`,[`I ${en} at ${h}.`,`我${h}點${zh}。`],NI_NOTE,{type:'clock',hour:h,minute:0,period},wrong);
}
lesson(4,'time-particle','4-01','activities',['At a time','在某時刻'],['Complete the sentence about getting up at six every morning with the time particle.','填入時間助詞，完成每天早上六點起床的句子。'],['まいあさなんじにおきますか。','What time do you get up every morning?','你每天早上幾點起床？'],'に','まいあさ、ろくじ{word}おきます。',['I get up at six every morning.','我每天早上六點起床。'],NI_NOTE,{type:'clock',hour:6,minute:0,period:'AM'},['から','まで','と']);
const VERB_NOTE=['ます: non-past affirmative; ません: non-past negative; ました: past affirmative; ませんでした: past negative. Keep the time expression and tense consistent.','ます：非過去肯定；ません：非過去否定；ました：過去肯定；ませんでした：過去否定。時間詞和時態須一致。'];
for(const [id,word,day,verb,answer,labels,context,reply,wrong] of [
 ['work','4-03','あした','はたらきます','はたらきます',['Will work','會工作'],['Tomorrow is a working day. Answer yes, including the verb.','明天要工作。以肯定回答並加上動詞。'],['Yes, I will work.','會，我會工作。'],['はたらきません','はたらきました','はたらきませんでした']],
 ['rest','4-04','にちようび','やすみます','やすみます',['Day off','休息日'],['Sunday is your day off. Answer yes, including the verb.','星期日是休息日。以肯定回答並加上動詞。'],['Yes, I rest on Sunday.','是的，星期日休息。'],['やすみません','やすみました','やすみませんでした']],
 ['negative','4-03','あした','はたらきます','はたらきません',['Will not','不會做'],['You have tomorrow off. Answer no, including the verb.','你明天放假。以否定回答並加上動詞。'],['No, I will not work.','不，我不會工作。'],['はたらきます','はたらきました','はたらきませんでした']],
 ['past','4-05','きのう','べんきょうしました','べんきょうしました',['Did','做過'],['You studied yesterday. Answer yes, including the verb.','你昨天讀了書。以肯定回答並加上動詞。'],['Yes, I studied.','是的，我讀了書。'],['べんきょうします','べんきょうしません','べんきょうしませんでした']],
 ['past-negative','4-05','きのう','べんきょうしました','べんきょうしませんでした',['Did not','沒有做'],['You did not study yesterday. Answer no, including the verb.','你昨天沒有讀書。以否定回答並加上動詞。'],['No, I did not study.','不，我沒有讀書。'],['べんきょうします','べんきょうしません','べんきょうしました']]]){
 const negative=id==='negative'||id==='past-negative';
 lesson(4,id,word,'activities',labels,context,[`${day}、${verb}か。`,`${day==='きのう'?'Did':day==='あした'?'Will':'Do'} you ${word==='4-05'?'study':word==='4-04'?'rest':'work'} ${day==='きのう'?'yesterday':day==='あした'?'tomorrow':'on Sunday'}?`,`${day==='きのう'?'昨天':day==='あした'?'明天':'星期日'}${word==='4-05'?'讀書':word==='4-04'?'休息':'工作'}嗎？`],answer,`${negative?'いいえ':'はい'}、{word}。`,reply,VERB_NOTE,{type:'card',heading:day,value:word==='4-05'?(negative?'勉強 ×':'勉強 ✓'):word==='4-04'||negative?'休み':'仕事'},wrong);
}
lesson(4,'study-range','4-05','schedules',['Study hours','讀書時間'],['Your study schedule is 19:00–21:00. Use twelve-hour times.','你的讀書時間是19:00–21:00。以十二小時制回答。'],['まいばん、なんじからなんじまでべんきょうしますか。','From what time to what time do you study every evening?','你每天晚上從幾點讀書到幾點？'],'しちじからくじまで','{word}べんきょうします。',['I study from seven to nine.','我從七點讀書到九點。'],['Use ～から～まで before the activity. 毎晩 does not take に.','活動前可用～から～まで表示時間範圍。毎晩後不加に。'],{type:'schedule',title:'勉強',rows:[['毎晩','19:00–21:00']]},['くじからしちじまで','ごじからくじまで','しちじからじゅうじまで']);
lesson(4,'days-range','4-46','schedules',['Weekday range','星期範圍'],['Your workweek is Monday through Friday.','你從星期一到星期五工作。'],['なんようびからなんようびまではたらきますか。','From which day to which day do you work?','你從星期幾工作到星期幾？'],'げつようびからきんようびまで','{word}はたらきます。',['I work from Monday to Friday.','我從星期一工作到星期五。'],['から and まで also mark a range of weekdays.','から、まで也可表示星期的範圍。'],{type:'schedule',title:'仕事',rows:[['月–金','09:00–17:00'],['土・日','休み']]},['きんようびからげつようびまで','げつようびからにちようびまで','どようびからにちようびまで']);
lesson(4,'and','4-48','schedules',['And','和'],['The days off are Saturday and Sunday. Join the two nouns.','休息日是星期六和星期日。連接這兩個名詞。'],['やすみはなんようびですか。','Which days are your days off?','休息日是星期幾？'],'と','どようび{word}にちようびです。',['Saturday and Sunday.','星期六和星期日。'],['と joins nouns: 土曜日と日曜日. It does not join verbs here.','と連接名詞，例如土曜日と日曜日；這裡不用來連接動詞。'],{type:'schedule',title:'休み',rows:[['土','休み'],['日','休み']]},['に','から','まで']);
lesson(4,'phone-question','4-c2','numbers',['Phone number','電話號碼'],['Ask for a telephone number.','詢問電話號碼。'],['はい。','Yes?','請說。'],'なんばん','でんわばんごうは{word}ですか。',['What is the telephone number?','電話號碼是多少？'],['何番 asks a number. Read telephone digits individually; の separates groups.','何番用來問號碼。電話號碼逐位讀，の分隔數字組。'],{type:'phone',number:'5275-2725'},['なんじ','なんようび','なんがい']).turns.push(lessonTurn('listener','ごにーななごの、にーななにーごです。','It is 5275-2725.','5275-2725。'));
lesson(4,'phone-answer','4-c1','numbers',['Read a number','讀出號碼'],['Read the displayed telephone number. Use の between groups.','讀出顯示的電話號碼。數字組之間用の。'],['でんわばんごうはなんばんですか。','What is the telephone number?','電話號碼是多少？'],'ごにーななごのにーななにーご','{word}です。',['It is 5275-2725.','5275-2725。'],['Read each digit; the stretched にー is common in telephone numbers. の separates the two groups.','逐位讀出數字；電話號碼常把に拉長為にー。の分隔兩組數字。'],{type:'phone',number:'5275-2725'},['ごにーななごのにーななごにー','ごにーななごのにーななさんご']);
lesson(4,'empathy','4-e1','replies',['That sounds tough','真辛苦'],['Your friend studies until midnight and goes to bed at 1 a.m. Show sympathy.','朋友讀書到午夜，凌晨一點才睡。表示體諒。'],['まいばんじゅうにじまでべんきょうします。いちじにねます。','I study until twelve every night. I go to bed at one.','我每天晚上讀書到十二點，一點睡覺。'],'たいへんですね','{word}。',['That sounds tough.','真是辛苦啊。'],['たいへんですね shows sympathy. ね invites shared understanding.','たいへんですね表示體諒。ね帶有希望對方認同的語氣。'],{type:'schedule',title:'毎晩',rows:[['勉強','～00:00'],['寝ます','01:00']]},['いらっしゃいませ','どうも','じゃ']);

// Accept normal spoken variants without weakening kana order or digit-count checks.
CHAPTER_DIALOGUES.find(q=>q.id==='ch3-floor-answer').acceptedReadings=['さんかい'];
const phoneAnswer=CHAPTER_DIALOGUES.find(q=>q.id==='ch4-phone-answer');
phoneAnswer.acceptedReadings=Array.from({length:7},(_,mask)=>{
 let digit=0;return phoneAnswer.kana.replace(/にー/g,()=>mask&(1<<digit++)?'にー':'に');
});

// Migrate existing conversations by their answer reading and communication purpose.
// Vocabulary records alone never create Dialogue content.
const questionAnswer=q=>!!WH_CONVERSATIONS[q.word]||/^(なん|なに)/u.test(q.kana||'')||['どこ','どちら','いくら','いつ','だれ','どなた','おいくつ'].includes(q.kana);
for(const q of CHAPTER_DIALOGUES){
 q.originalCategory=q.category;
 if(questionAnswer(q))q.category='wh-words';
 else if(q.category==='locations')q.category=['ここ','そこ','あそこ','こちら','そちら','あちら'].includes(q.kana)?'demonstratives':'places';
 if(q.kana==='あそこ')q.labels=['Over there','那邊（遠處）'];
}
// Keep the independent Chapter 4 vocabulary record; remove only its Replies scene.
const removedReply=CHAPTER_DIALOGUES.filter(q=>q.category==='replies'&&q.kana==='たいへんですね');
for(const q of removedReply){DIALOGUES.splice(DIALOGUES.indexOf(q),1);CHAPTER_DIALOGUES.splice(CHAPTER_DIALOGUES.indexOf(q),1);delete CONVERSATIONS[q.id];}
for(let i=DIALOGUE_CATEGORIES.length-1;i>=0;i--)if(DIALOGUE_CATEGORIES[i].id==='locations')DIALOGUE_CATEGORIES.splice(i,1);
if(!DIALOGUE_CATEGORIES.some(c=>c.id==='places'))DIALOGUE_CATEGORIES.push({...VOCAB_CATEGORIES.find(c=>c.id==='places')});

const reusableLessonLabels={
 'ch3-floor-answer':['State a floor','說明樓層'], 'ch3-price-answer':['State a price','說明價格'],
 'ch4-time-four':['Tell the time · hour','報時・整點'], 'ch4-time-minutes':['Tell the time · minutes','報時・分鐘'],
 'ch4-time-half':['Tell the time · half past','報時・半點'], 'ch4-time-am':['Tell the time · a.m.','報時・上午'],
 'ch4-time-pm':['Tell the time · p.m.','報時・下午'], 'ch4-weekday-answer':['Name a weekday','說出星期'],
 'ch3-country':['Which country?','哪個國家？'], 'ch3-company':['Which company?','哪家公司？'], 'ch3-university':['Which university?','哪所大學？']
};
for(const q of CHAPTER_DIALOGUES)if(reusableLessonLabels[q.id])q.labels=reusableLessonLabels[q.id];
