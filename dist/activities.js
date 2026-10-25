'use strict';
// Matching and dialogue content uses the existing quiz-page vocabulary.
const demonstrativeWords=[
  {
    "word": "1-17a",
    "meaning": "Who",
    "clue": "Ask who that person is, using the standard form.",
    "why": "だれ asks who someone is. Use どなた for the polite form.",
    "sentence": "あの人は {word} ですか。",
    "symbol": "?"
  },
  {
    "word": "1-17b",
    "meaning": "Who · polite",
    "clue": "Ask who that person is, using the polite form.",
    "why": "どなた is the polite way to ask who someone is.",
    "sentence": "あの方は {word} ですか。",
    "symbol": "?"
  },
  {
    "word": "1-19a",
    "meaning": "How old",
    "clue": "Ask someone’s age, using the standard form.",
    "why": "なんさい asks how old someone is. Use おいくつ for the polite form.",
    "sentence": "あなたは {word} ですか。",
    "symbol": "18?"
  },
  {
    "word": "1-19b",
    "meaning": "How old · polite",
    "clue": "Ask someone’s age, using the polite form.",
    "why": "おいくつ is the polite way to ask someone’s age.",
    "sentence": "あなたは {word} ですか。",
    "symbol": "18?"
  },
  {
    "word": "2-36",
    "meaning": "What",
    "clue": "Ask what this object is.",
    "why": "なん means what before ですか.",
    "sentence": "これは {word} ですか。",
    "symbol": "?"
  }
];
function demonstrativeItems(){return demonstrativeWords.map(q=>{const w=wordBy(q.word);return {...q,id:`wh-words-${w.id}`,kana:w.kana,zh:w.zh};});}
const NOTICE_SITUATION=['Suddenly notice something','突然注意到某件事'];
const DIALOGUES=[
  {
    "id": "meet",
    "word": "1-c1",
    "family": "first-meeting",
    "scene": "You meet someone for the first time.",
    "why": "Use はじめまして when you first meet someone."
  },
  {
    "id": "intro",
    "word": "1-c3d",
    "family": "introduction",
    "scene": "You have just said your name. End with a polite greeting. Use the full phrase.",
    "why": "どうぞよろしくおねがいします is a polite way to end an introduction."
  },
  {
    "id": "likewise",
    "word": "2-d2c",
    "family": "likewise",
    "incoming": "よろしくおねがいします",
    "why": "こちらこそ means “likewise”. Here, add よろしくおねがいします after it."
  },
  {
    "id": "excuse",
    "word": "1-c4",
    "family": "excuse",
    "scene": "You want to ask a stranger their name. What do you say before asking?",
    "why": "Use しつれいですが before asking a personal question, such as someone’s name."
  },
  {
    "id": "name",
    "word": "1-c5",
    "family": "name",
    "scene": "You want to know someone’s name. Ask politely.",
    "why": "おなまえは asks someone’s name. The last は is a particle."
  },
  {
    "id": "attention",
    "word": "2-c1",
    "family": "attention",
    "scene": "You want to speak to someone but are unsure how to start.",
    "why": "あのう gets attention or shows hesitation. The final う distinguishes it from the noun modifier あの."
  },
  {
    "id": "offer",
    "word": "2-c3",
    "family": "offer",
    "scene": "You give someone a pen.",
    "why": "Use どうぞ when you give someone something."
  },
  {
    "id": "thanks",
    "word": "2-c4c",
    "family": "thanks",
    "scene": "Someone gives you a gift. Say thank you politely.",
    "why": "ありがとうございます is a polite way to say thank you."
  },
  {
    "id": "thanks-full",
    "word": "2-c4d",
    "family": "thanks",
    "scene": "Someone helps you a lot. Thank them using the full phrase.",
    "why": "どうもありがとうございます means “thank you very much”."
  },
  {
    "id": "understand",
    "word": "2-c5",
    "family": "understand",
    "scene": "Someone tells you something you did not know. Show that you understand.",
    "why": "そうですか means “I see” here."
  },
  {
    "id": "incorrect",
    "word": "2-c6",
    "family": "incorrect",
    "scene": "Someone says your book is a dictionary. They are wrong.",
    "why": "Use ちがいます to say that something is not correct."
  },
  {
    "id": "surprise",
    "word": "2-c2",
    "family": "surprise",
    "scene": "You hear some news and are surprised.",
    "why": "えっ shows surprise. Remember the small っ."
  },
  {
    "id": "realise",
    "word": "2-c7",
    "family": "realisation",
    "scene": NOTICE_SITUATION[0],
    "why": "Use あ when you suddenly notice something."
  },
  {
    "id": "neighbour",
    "word": "2-d1",
    "family": "neighbour",
    "scene": "Greeting your colleagues for the first time.",
    "why": "これからおせわになります asks for someone’s kindness or help from now on."
  }
];
function guideCards(cards,label){
  return `<section class="expression-guide" aria-label="${esc(label)}"><div class="guide-heading"><h2>${label}</h2></div><div class="guide-cards">${cards.join('')}</div></section>`;
}
// Each cell of the transparent 3 × 3 atlas shows Lulu performing an action.
// The original idle image remains available for listener and neutral scenes.
const LULU_POSES={wave:[0,0],point:[1,0],bow:[2,0],reading:[0,1],teacher:[1,1],doctor:[2,1],thinking:[0,2],gift:[1,2],speaking:[2,2]};
function luluPiggy(x,y,scale=1,pose='idle'){
  const cell=LULU_POSES[pose];
  if(cell)return `<svg class="lulu-piggy" x="${x-50*scale}" y="${y-50*scale}" width="${100*scale}" height="${100*scale}" viewBox="${cell[0]*418} ${cell[1]*418} 418 418" aria-hidden="true"><image href="icons/lulu-poses.png" width="1254" height="1254"/></svg>`;
  return `<image class="lulu-piggy" href="icons/lulu-piggy.png" x="${x-41*scale}" y="${y-50*scale}" width="${82*scale}" height="${100*scale}" preserveAspectRatio="xMidYMid meet" aria-hidden="true"/>`;
}
function lessonBackdrop(height=225,floor=185){
  return `<rect x="5" y="5" width="490" height="${height-10}" rx="24" fill="#fff1d4"/>
    <path d="M5 53h490M5 101h490M5 149h490M70 5v48m116 0v48m119-96v48m116 0v48M125 101v48m154-48v48m147-48v48" stroke="#f5d8a2" stroke-width="7" opacity=".55"/>
    <path d="M5 ${floor}h490v${height-floor-29}q0 24-24 24H29q-24 0-24-24Z" fill="#edbc81"/>
    <path d="M5 ${floor}h490" stroke="#aa714a" stroke-width="3"/>`;
}
function dialogueGraphic(q){
  const bubble=(x,symbol)=>`<g transform="translate(${x} 0)"><path d="M-37 28h74a12 12 0 0 1 12 12v26a12 12 0 0 1-12 12H9L-5 94l2-16h-34a12 12 0 0 1-12-12V40a12 12 0 0 1 12-12" fill="#fffaf0" stroke="#a36843" stroke-width="2"/><text y="62" text-anchor="middle" font-size="29" fill="#7e4a30">${symbol}</text></g>`;
  const gift='<rect x="219" y="123" width="62" height="49" rx="4" fill="#f4d780" stroke="#876d35" stroke-width="2"/><path d="M250 123v49m-33-39h66m-33-10c-27-1-23-26-8-18l8 18c25-1 25-25 9-18Z" fill="none" stroke="#d36f55" stroke-width="5"/>';
  const badge='<rect x="211" y="113" width="78" height="54" rx="7" fill="#fff" stroke="#698a96" stroke-width="2"/><circle cx="230" cy="132" r="8" fill="#e3eada"/><path d="M220 152q10-17 20 0m8-25h29m-29 12h21" stroke="#698a96" stroke-width="3" fill="none"/>';
  const pen='<g transform="rotate(25 250 148)"><rect x="244" y="110" width="12" height="64" rx="4" fill="#557a88"/><path d="m244 174 6 14 6-14" fill="#d5b975"/></g><path d="M184 151h42m-11-9 11 9-11 9" stroke="#d36f55" stroke-width="4" fill="none"/>';
  const books='<path d="M212 172v-51h34v51Zm42 0v-62h34v62Z" fill="#f4d780" stroke="#8c7851" stroke-width="2"/><path d="m239 91 22 22m0-22-22 22" stroke="#c36b53" stroke-width="4"/>';
  const bulb='<circle cx="250" cy="126" r="24" fill="#f7df86" stroke="#b18a39" stroke-width="2"/><path d="M237 149v15h26v-15m-22 22h18m-9-85V76m-39 45h-12m90 0h12m-78-27-8-8m69 8 8-8" stroke="#b18a39" stroke-width="3" fill="none"/>';
  const umbrella='<path d="M212 133a38 38 0 0 1 76 0Z" fill="#d8e9f1" stroke="#557a88" stroke-width="2"/><path d="M250 132v43c0 17 20 17 20 0" fill="none" stroke="#557a88" stroke-width="4"/>';
  const props={meet:badge,intro:badge,likewise:badge,excuse:badge,name:badge,attention:'',offer:pen,thanks:gift,'thanks-full':gift,understand:bulb,incorrect:books,surprise:bulb,realise:umbrella,neighbour:badge};
  const symbols={meet:'…',intro:'…',likewise:'↔',excuse:'?',name:'?',attention:'…',offer:'→',thanks:'♡','thanks-full':'♡',understand:'!',incorrect:'×',surprise:'!',realise:'!',neighbour:'…'};
  const pose={meet:'wave',intro:'bow',likewise:'bow',excuse:'speaking',name:'thinking',attention:'wave',offer:'point',thanks:'gift','thanks-full':'bow',understand:'teacher',incorrect:'point',surprise:'thinking',realise:'thinking',neighbour:'wave'}[q.id]||'speaking';
  return `<figure class="expression-figure"><svg viewBox="0 0 500 225" role="img" aria-labelledby="expression-scene-${q.id}"><title id="expression-scene-${q.id}">${esc(q.scene||'Reply to a greeting.')}</title>${lessonBackdrop()}${luluPiggy(105,137,1.08,q.incoming?'thinking':pose)}${luluPiggy(395,137,1.08,q.incoming?'speaking':'idle')}${bubble(105,symbols[q.id]||'…')}${q.id==='likewise'?bubble(395,'↔'):''}${props[q.id]||''}<text x="105" y="207" text-anchor="middle" fill="#8e4936" font-size="14">You</text><text x="395" y="207" text-anchor="middle" fill="#3f6676" font-size="14">${q.id==='neighbour'?'Colleague':'Listener'}</text></svg></figure>`;
}

const DIALOGUE_CATEGORIES=[
  {id:'introductions',label:'Introduction',description:'Meeting people, asking names and making introductions.'},
  {id:'courtesy',label:'Polite expressions',description:'Politely interrupting, offering something and saying thank you.',excludedWords:['2-c1']},
  {id:'replies',label:'Replies',description:'Responding, showing surprise and correcting a misunderstanding.'},
  {...VOCAB_CATEGORIES.find(c=>c.id==='demonstratives'),label:'This and That',includedWords:['2-c1']}
];
// Each expression has a short exchange rather than a repeated generic reply.
const CONVERSATIONS={
  meet:['Meeting someone for the first time.','初次見面。',[['you','はじめまして。','Nice to meet you.','初次見面。'],['listener','はじめまして。','Nice to meet you too.','很高興認識你。']]],
  intro:['Ending an introduction.','結束自我介紹。',[['you','どうぞよろしくおねがいします。','I look forward to knowing you.','請多多指教。'],['listener','こちらこそ、よろしくおねがいします。','Likewise.','我也是，請多多指教。']]],
  likewise:['Returning a greeting.','回應問候。',[['listener','よろしくおねがいします。','I look forward to knowing you.','請多多指教。'],['you','こちらこそよろしくおねがいします。','Likewise, I look forward to knowing you.','我也是，請多多指教。']]],
  excuse:['Politely interrupting someone.','禮貌地打擾對方。',[['you','しつれいですが。','Excuse me.','不好意思。'],['listener','はい。','Yes?','請說。']]],
  name:['Asking someone’s name.','詢問對方的名字。',[['you','おなまえは。','What is your name?','請問你叫什麼名字？'],['listener','たなかです。','I’m Tanaka.','我姓田中。']]],
  attention:['Getting someone’s attention.','引起對方注意。',[['you','あのう。','Um, excuse me.','那個，不好意思。'],['listener','はい。','Yes?','請說。']]],
  offer:['Offering someone a pen.','遞筆給對方。',[['you','どうぞ。','Here you go.','請收下。'],['listener','ありがとうございます。','Thank you.','謝謝。']]],
  thanks:['Receiving a gift.','收到禮物。',[['listener','どうぞ。','Here you go.','請收下。'],['you','ありがとうございます。','Thank you very much.','非常感謝。']]],
  'thanks-full':['Thanking someone for their help.','感謝對方的幫忙。',[['listener','おてつだいします。','I’ll help you.','我來幫你。'],['you','どうもありがとうございます。','Thank you very much.','真的非常感謝。']]],
  understand:['Learning something new.','得知新消息。',[['listener','あの人はせんせいです。','That person is a teacher.','那個人是老師。'],['you','そうですか。','I see.','原來如此。']]],
  incorrect:['Correcting a misunderstanding.','更正誤會。',[['listener','これはじしょですか。','Is this a dictionary?','這是字典嗎？'],['you','ちがいます。','No, that’s not right.','不是的。']]],
  surprise:['Hearing surprising news.','聽到意外消息。',[['listener','あの人はせんせいです。','That person is a teacher.','那個人是老師。'],['you','えっ。','What? Really?','咦？真的嗎？']]],
  realise:[...NOTICE_SITUATION,[['listener','これはあなたのかさですか。','Is this your umbrella?','這是你的雨傘嗎？'],['you','あ、わたしのかさです。','Oh, it’s my umbrella.','啊，是我的雨傘。']]],
  neighbour:[DIALOGUES.find(q=>q.id==='neighbour').scene,'初次向同事打招呼。',[['you','これからおせわになります。','I look forward to your kindness.','今後請多多關照。'],['listener','こちらこそよろしくおねがいします。','Likewise, nice to meet you.','我也是，請多多指教。']]]
};
// Reuse the six Chapter 2 vocabulary entries and their standalone / noun-modifier distinction.
const THIS_THAT_SCENES=[
 ['2-01','Name an object near you','說出靠近自己的物品','それはなんですか。','What is that?','那是什麼？','{word}はほんです。','This is a book.','這是書。','これ stands alone and refers to something near the speaker. この must come before a noun.'],
 ['2-02','Name an object near the listener','說出靠近對方的物品','これはなんですか。','What is this?','這是什麼？','{word}はほんです。','That is a book.','那是書。','それ stands alone and refers to something near the listener. その must come before a noun.'],
 ['2-03','Name an object far from both people','說出離雙方都遠的物品','あれはなんですか。','What is that over there?','那邊的是什麼？','{word}はほんです。','That over there is a book.','那邊的是書。','あれ stands alone and refers to something far from both people. あの must come before a noun.'],
 ['2-04','Identify the owner of a book near you','指出靠近自己的書的主人','それはだれのほんですか。','Whose book is that?','那是誰的書？','{word}ほんはわたしのです。','This book is mine.','這本書是我的。','この comes directly before a noun and points to something near the speaker.'],
 ['2-05','Identify the owner of a book near the listener','指出靠近對方的書的主人','これはだれのほんですか。','Whose book is this?','這是誰的書？','{word}ほんはわたしのです。','That book is mine.','那本書是我的。','その comes directly before a noun and points to something near the listener.'],
 ['2-06','Identify the owner of a book far from both people','指出離雙方都遠的書的主人','あれはだれのほんですか。','Whose book is that over there?','那邊的是誰的書？','{word}ほんはわたしのです。','That book over there is mine.','那邊那本書是我的。','あの comes directly before a noun and points to something far from both people. あのう gets attention.']
];
// Scene locations are relative to the learner; the opening speaker sees the same book
// from the opposite side. Keep labels and geometry attached to the vocabulary IDs.
const THIS_THAT_VISUALS={
  '2-01':{location:'you',labels:['This','這個']},
  '2-02':{location:'listener',labels:['That','那個']},
  '2-03':{location:'far',labels:['That over there','那個（遠處）']},
  '2-04':{location:'you',labels:['This · Noun','這 · 名詞']},
  '2-05':{location:'listener',labels:['That · Noun','那 · 名詞']},
  '2-06':{location:'far',labels:['That over there · Noun','那（遠處）· 名詞']},
  '2-c1':{location:'attention',labels:['Get attention','引起注意']}
};
const THIS_THAT_LOCATIONS={
  you:['The book is beside you.','書本在你身旁。'],
  listener:['The book is beside the listener.','書本在聽者身旁。'],
  far:['The book is far from both people.','書本離雙方都遠。']
};
function attentionScene(q){
  const caption=state.language==='zh-Hant'?'揮手引起聽話者的注意。':'Wave to get the listener’s attention.';
  return `<figure class="demonstrative-scene attention-scene" data-scene-expression="${q.id}"><svg viewBox="0 0 500 260" role="img" aria-labelledby="attention-title-${q.id}"><title id="attention-title-${q.id}">${esc(caption)}</title><rect width="500" height="260" rx="16" fill="#fff6e7"/><ellipse cx="110" cy="205" rx="65" ry="14" fill="#eee3fa"/><ellipse cx="390" cy="205" rx="65" ry="14" fill="#f8e3e8"/><g data-scene-person="you">${luluPiggy(110,157,1.3,'wave')}</g><g data-scene-person="listener">${luluPiggy(390,157,1.3,'idle')}</g><path d="M46 12h128q16 0 16 16v33q0 16-16 16h-43l-21 17 3-17H46q-16 0-16-16V28q0-16 16-16Z" fill="#eee3fa" stroke="#84619c" stroke-width="2"/><path d="M335 12h110q16 0 16 16v33q0 16-16 16h-34l-21 17 3-17h-58q-16 0-16-16V28q0-16 16-16Z" fill="#f8e3e8" stroke="#b57c90" stroke-width="2"/><text x="110" y="55" text-anchor="middle" fill="#582686" font-size="30" lang="ja">あのう</text><text x="390" y="55" text-anchor="middle" fill="#74465e" font-size="30" lang="ja">はい。</text><text x="110" y="247" text-anchor="middle" fill="#582686" font-size="20">${esc(translateText('You'))}</text><text x="390" y="247" text-anchor="middle" fill="#74465e" font-size="20">${esc(translateText('Listener'))}</text></svg><figcaption>${esc(caption)}</figcaption></figure>`;
}
function demonstrativeScene(q){
  const scene=THIS_THAT_VISUALS[q.word];if(!scene)return '';
  if(scene.location==='attention')return attentionScene(q);
  const location=scene.location,far=location==='far',x=far?250:location==='you'?165:335,y=far?65:165;
  const zh=state.language==='zh-Hant',caption=THIS_THAT_LOCATIONS[location][zh?1:0];
  const nearZone=far?'':`<ellipse cx="${location==='you'?116:384}" cy="181" rx="105" ry="53" fill="#eee3fa" opacity=".65"/>`;
  const learnerPose=location==='you'?'idle':'point',listenerPose=location==='listener'?'idle':'point';
  const path=far?'M120 166 Q155 95 211 77 M380 166 Q345 95 289 77':location==='you'?'M380 173 Q305 128 208 160':'M120 173 Q195 128 292 160';
  return `<figure class="demonstrative-scene" data-object-location="${location}"><svg viewBox="0 ${far?0:85} 500 ${far?275:190}" role="img" aria-labelledby="distance-title-${q.id}"><title id="distance-title-${q.id}">${esc(caption)}</title><rect width="500" height="275" rx="16" fill="#fff6e7"/>${far?'<path d="M25 115h450" stroke="#eadbc5" stroke-width="2"/>':''}${nearZone}<path d="${path}" fill="none" stroke="#84619c" stroke-width="3" stroke-dasharray="5 7" stroke-linecap="round"/><ellipse cx="${x}" cy="${y+5}" rx="49" ry="43" fill="#f8e8a9" stroke="#c5a355" stroke-width="2"/><g class="scene-book" data-x="${x}" data-y="${y}" transform="translate(${x} ${y}) rotate(-8)"><path d="M-31-31H25Q31-31 31-25V30H-25Q-31 30-31 24Z" fill="#90ac94" stroke="#845537" stroke-width="4" stroke-linejoin="round"/><path d="M-23 21H30V30H-23Q-30 26-23 21Z" fill="#fff7df" stroke="#845537" stroke-width="3"/><path d="M-20-29V19M-9-17H18M-9-7H12" fill="none" stroke="#566e55" stroke-width="3" stroke-linecap="round"/></g><g data-scene-person="you">${luluPiggy(70,175,1.3,learnerPose)}</g><g data-scene-person="listener" transform="translate(860 0) scale(-1 1)">${luluPiggy(430,175,1.3,listenerPose)}</g><text x="70" y="260" text-anchor="middle" fill="#582686" font-size="20">${zh?'你':'You'}</text><text x="430" y="260" text-anchor="middle" fill="#74465e" font-size="20">${zh?'聽者':'Listener'}</text></svg><figcaption>${esc(caption)} <span>${zh?'指示詞隨說話者的位置改變。':'The demonstrative depends on who is speaking.'}</span></figcaption></figure>`;
}
function dialogueExpressionLabel(q){
  const labels=THIS_THAT_VISUALS[q.word]?.labels||CONVERSATIONS[q.id];
  return labels?labels[state.language==='zh-Hant'?1:0].replace(/[。.!?？]+$/u,''):translateText(q.meaning);
}
for(const [word,en,zh,opening,openingEn,openingZh,sentence,replyEn,replyZh,why] of THIS_THAT_SCENES){
  const id=`this-that-${word}`,entry=WORDS.find(w=>w.id===word);
  DIALOGUES.push({id,word,family:id,scene:en,sentence,why});
  CONVERSATIONS[id]=[en,zh,[['listener',opening,openingEn,openingZh],['you',sentence.replace('{word}',entry.kana),replyEn,replyZh]]];
}
const WH_CONVERSATIONS={
  '1-17a':[['you','あの人はだれですか。','Who is that person?','那個人是誰？'],['listener','せんせいです。','That is a teacher.','那是老師。']],
  '1-17b':[['you','あの方はどなたですか。','Who is that person? (polite)','那位是誰？（禮貌）'],['listener','せんせいです。','That is a teacher.','那是老師。']],
  '1-19a':[['you','あなたはなんさいですか。','How old are you?','你幾歲？'],['listener','じゅうはっさいです。','I’m eighteen.','我十八歲。']],
  '1-19b':[['you','あなたはおいくつですか。','How old are you? (polite)','請問您幾歲？（禮貌）'],['listener','じゅうはっさいです。','I’m eighteen.','我十八歲。']],
  '2-36':[['you','これはなんですか。','What is this?','這是什麼？'],['listener','ほんです。','It’s a book.','這是書。']]
};
let selectedWhExpression=null;
function selectWhExpression(id){selectedWhExpression=id;selectDialogueExpression(id);}
const EXERCISE_OPENINGS={
  meet:['listener','たなかです。','I’m Tanaka.','我姓田中。'],
  intro:['listener','わたしはたなかです。','I’m Tanaka.','我是田中。'],
  excuse:['listener','こんにちは。','Hello.','你好。'],
  name:['listener','はじめまして。','Nice to meet you.','初次見面。'],
  attention:['listener','こんにちは。','Hello.','你好。'],
  offer:['listener','ペンがありません。','I don’t have a pen.','我沒有筆。'],
  neighbour:['listener','こんにちは。','Hello.','你好。']
};
const CONVERSATION_POSES={meet:'wave',intro:'bow',likewise:'bow',excuse:'bow',name:'thinking',attention:'wave',offer:'point',thanks:'gift','thanks-full':'bow',understand:'thinking',incorrect:'point',surprise:'thinking',realise:'thinking',neighbour:'wave'};
function conversationPig(speaker,pose){return `<svg class="conversation-pig" viewBox="0 0 120 120" aria-hidden="true">${luluPiggy(60,60,1,speaker==='you'?pose:'idle')}</svg>`;}
function conversationSpeaker(q,speaker){return speaker==='you'?'You':q.id==='neighbour'?'Colleague':'Listener';}
let selectedDialogueExpression=null;
function updateSelectedChips(row,attribute,id){row.querySelectorAll(`[${attribute}]`).forEach(chip=>{const selected=chip.getAttribute(attribute)===id;chip.classList.toggle('selected',selected);chip.setAttribute('aria-pressed',String(selected));});}
function selectDialogueExpression(id){
  const q=dialogueStudySet().items.find(item=>item.id===id);if(!q)return;
  selectedDialogueExpression=id;
  const row=document.querySelector('.expression-chip-row'),cards=document.querySelector('.expression-guide .guide-cards');
  if(!row||!cards){render();return;}
  const scroll=row.scrollLeft;updateSelectedChips(row,'data-dialogue-expression',id);
  cards.innerHTML=localizeMarkup(conversationCard(q));row.scrollLeft=scroll;
}
// Highlight the complete selected vocabulary expression, escaping surrounding Japanese.
function expressionDialogueText(text,q){
  const target=wordBy(q.word)?.kana;
  const index=target?text.indexOf(target):-1;
  return index<0?esc(text):`${esc(text.slice(0,index))}<strong class="wh-target">${esc(target)}</strong>${esc(text.slice(index+target.length))}`;
}
function conversationCard(q){
  const turns=CONVERSATIONS[q.id]?.[2]||WH_CONVERSATIONS[q.word],zh=state.language==='zh-Hant';
  const dialogue=turns.map(([speaker,ja,en,translation])=>`<div class="conversation-turn ${speaker}">${conversationPig(speaker,CONVERSATION_POSES[q.id])}<div class="conversation-bubble"><span class="dialogue-role">${conversationSpeaker(q,speaker)}</span><p class="jp" lang="ja">${speaker==='you'?expressionDialogueText(ja,q):esc(ja)}</p><p class="conversation-translation">${esc(zh?translation:en)}</p></div></div>`).join('');
  return `<article class="paper guide-card conversation-card" data-dialogue-guide="${q.id}">${demonstrativeScene(q)}<div class="guide-card-body"><div class="conversation-stage" aria-label="Conversation">${dialogue}</div><p class="conversation-notes muted">${esc(q.why)}</p></div></article>`;
}
function dialogueInCategory(q,category){const group=DIALOGUE_CATEGORIES.find(c=>c.id===category);return (vocabularySection(wordBy(q.word))===category||group?.includedWords?.includes(q.word))&&!group?.excludedWords?.includes(q.word);}
function dialogueItems(category=null){return DIALOGUES.filter(d=>!category||dialogueInCategory(d,category)).map(d=>({...d,kana:wordBy(d.word).kana}));}
function openDialogueCategory(category){selectDialogueCategory(category);}
function allDialogueItems(){return [...dialogueItems(),...demonstrativeItems().map(q=>({...q,family:q.id}))];}
function dialogueCategories(){return [...DIALOGUE_CATEGORIES,{id:'wh-words',label:'WH-words',description:'Practise standard and polite questions about age, people and “what”.'}];}
function dialogueStudySet(){
  const mode=state.dialogueBrowse||'all',all=allDialogueItems();
  if(mode==='category'){
    const category=dialogueCategories().find(c=>c.id===state.dialogueCategory)||dialogueCategories()[0];
    return {key:`category-${category.id}`,label:category.label,description:category.description,items:all.filter(q=>category.id==='wh-words'?!!WH_CONVERSATIONS[q.word]:!WH_CONVERSATIONS[q.word]&&dialogueInCategory(q,category.id))};
  }
  if(mode==='chapter')return {key:`chapter-${state.dialogueChapter}`,label:`Chapter ${state.dialogueChapter} · p.${state.dialogueChapter===1?1:6}`,description:'Practise the dialogue expressions from this chapter.',items:all.filter(q=>wordBy(q.word).ch===state.dialogueChapter)};
  return {key:'all',label:'Dialogue',description:'Practise expressions, replies and question words.',items:all};
}
function dialogueBrowse(mode){if(!['all','category','chapter'].includes(mode))return;rememberPage();state.dialogueBrowse=mode;state.view='dialogue-content';render();}
function selectDialogueChapter(chapter){if(!allDialogueItems().some(q=>wordBy(q.word).ch===Number(chapter)))return;rememberPage();state.dialogueBrowse='chapter';state.dialogueChapter=Number(chapter);state.view='dialogue-content';render();}
function startDialoguePractice(kind){
  const set=dialogueStudySet(),wh=state.dialogueBrowse==='category'&&state.dialogueCategory==='wh-words';
  const scope={browse:state.dialogueBrowse,chapter:state.dialogueChapter,category:state.dialogueCategory,selected:selectedDialogueExpression,ids:set.items.map(q=>q.id)};
  startActivity(wh?(kind==='dialogue-choice'?'demonstratives':'wh-tiles'):kind,undefined,state.dialogueBrowse==='category'?state.dialogueCategory:null,scope);
}

function kanaUnits(text){const units=[];for(const c of [...rebuildText(text)]){if(/[ゃゅょぁぃぅぇぉゎ]/u.test(c)&&units.length)units[units.length-1]+=c;else units.push(c);}return units;}
function activityNav(){if(state.view==='sentence-menu')return 'sentences';if(state.view==='mock-menu')return 'mock';if(state.view==='handwriting-menu'||state.view==='kanji-writing')return 'handwriting-menu';if(state.view==='dialogue-content'||state.view==='demonstratives-content')return 'dialogue';if(['vocabulary-menu','vocabulary-content','vocabulary-rebuild','write','write-menu'].includes(state.view))return 'vocabulary-menu';if(state.view==='activity')return state.activity?.kind.startsWith('dialogue')||state.activity?.kind==='demonstratives'?'dialogue':'dialogue';return state.view;}
function activityCard(title,copy,label,attr,tone='',action='',symbol=''){return `<button class="mode-card ${tone}" ${attr}><span class="activity-icon">${icon(symbol||'bank')}</span><span class="card-copy"><span class="eyebrow muted">${label}</span><h2>${title}</h2><p>${copy}</p></span><span class="card-arrow" aria-hidden="true">${icon('arrow')}</span></button>`;}
function demonstrativesContent(){return dialogueContent();}
function dialogueSelector(){
  const mode=state.dialogueBrowse,set=dialogueStudySet();
  const chips=(entries,attribute,selected)=>entries.map(([key,label])=>`<button class="dialogue-chip${key===selected?' selected':''}" data-${attribute}="${key}" aria-pressed="${key===selected}">${esc(label)}</button>`).join('');
  const chapters=[...new Set(allDialogueItems().map(q=>wordBy(q.word).ch))].sort();
  const entries=mode==='category'?dialogueCategories().map(c=>[c.id,c.label]):chapters.map(ch=>[String(ch),`Chapter ${ch} · p.${ch===1?1:6}`]);
  return `<div class="study-wrap dialogue-selector"><div class="dialogue-chip-row dialogue-mode-row" role="group" aria-label="Dialogue selection">${chips([['all','All'],['category','By category'],['chapter','By chapter']],'dialogue-browse',mode)}</div>${mode==='all'?'':`<div class="field-label dialogue-filter-label" id="dialogue-filter-label">${mode==='category'?'Category':'Chapter'}</div><div class="dialogue-chip-row dialogue-filter-row" data-chip-group="${mode}" role="group" aria-labelledby="dialogue-filter-label">${chips(entries,mode==='category'?'dialogue-category':'dialogue-chapter',mode==='category'?state.dialogueCategory:String(state.dialogueChapter))}</div>`}<div class="dialogue-intro"><h1>${esc(set.label)}</h1><p>${esc(set.description)}</p></div></div>`;
}
function selectDialogueCategory(category){
  if(!dialogueCategories().some(c=>c.id===category))return;
  rememberPage();state.dialogueBrowse='category';state.dialogueCategory=category;state.view=category==='wh-words'?'demonstratives-content':'dialogue-content';render();
}
function dialogueMenu(){return dialogueContent();}
function dialogueContent(){
  const set=dialogueStudySet(),items=set.items,selected=items.find(q=>q.id===selectedDialogueExpression)||items[0];selectedDialogueExpression=selected.id;
  const wh=state.dialogueBrowse==='category'&&state.dialogueCategory==='wh-words';if(wh)selectedWhExpression=selected.id;
  const selector=`<div class="expression-selector"><div class="expression-chip-row${wh?' wh-chip-row':''}" data-chip-group="${set.key}" role="group" aria-label="Expression">${items.map(q=>`<button class="dialogue-chip${q.id===selected.id?' selected':''}" data-${wh?'wh-expression':'dialogue-expression'}="${q.id}" aria-pressed="${q.id===selected.id}">${esc(dialogueExpressionLabel(q))}</button>`).join('')}</div></div>`;
  return dialogueSelector()+`<div class="study-wrap dialogue-content"><div class="dialogue-guide-actions"><button class="button primary" data-open-dialogue="dialogue-choice">Matching ${icon('arrow')}</button><button class="button soft" data-open-dialogue="dialogue-tiles">Rebuild ${icon('arrow')}</button></div><section class="expression-guide" aria-label="Expression guide"><div class="guide-heading"><h2>${wh?'WH-words guide':'Expression guide'}</h2></div>${selector}<div class="guide-cards">${conversationCard(selected)}</div></section></div>`;
}

function isActivityRebuild(activity){return ['dialogue-tiles','wh-tiles'].includes(activity?.kind);}
function startActivity(kind,ids,category=null,scope=null){if(!['demonstratives','dialogue-choice','dialogue-tiles','wh-tiles'].includes(kind))return;if(state.view!=='activity')rememberPage();const dialogue=kind.startsWith('dialogue');const items=scope?allDialogueItems().filter(q=>scope.ids.includes(q.id)):dialogue?dialogueItems(category):demonstrativeItems();state.activity={kind,category,scope,items,ids:ids||shuffle(items.map(x=>x.id)),index:0,correct:0,missed:[],checked:false,selected:null,chosen:[],tileBank:[],choices:[],result:false};state.view='activity';prepareActivity();render();window.scrollTo({top:0,behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
function activityCurrent(){const a=state.activity;return a?.items.find(x=>x.id===a.ids[a.index]);}
function relatedActivityItems(a,q){
  const category=vocabularySection(wordBy(q.word));
  const candidates=a.items.filter(item=>item.id!==q.id&&(vocabularySection(wordBy(item.word))===category||[q.word,item.word].sort().join(',')==='2-06,2-c1')&&(!a.kind.startsWith('dialogue')||item.family!==q.family));
  if(a.scope&&candidates.length<3)candidates.push(...a.items.filter(item=>item.id!==q.id&&!candidates.includes(item)&&item.family!==q.family));
  const seen=new Set();return shuffle(candidates).filter(item=>{const key=item.family||item.kana;if(seen.has(key))return false;seen.add(key);return true;});
}
function prepareActivity(){const a=state.activity,q=activityCurrent();if(!q)return;a.checked=false;a.selected=null;a.chosen=[];a.result=false;a.choices=shuffle([q,...relatedActivityItems(a,q).slice(0,3)]);a.revealed=false;if(isActivityRebuild(a))a.tileBank=vocabularyTileBank(q);}
function activityAnswer(){const a=state.activity;return a.chosen.map(id=>a.tileBank[id]).join('');}
function checkActivity(choice=null,reveal=false){
  const a=state.activity,q=activityCurrent();if(!q||a.checked)return;
  const tiles=isActivityRebuild(a);
  if(reveal&&!tiles)return;
  if(tiles&&!reveal&&!rebuildReady(activityAnswer(),vocabularyReading(q)))return;
  if(!tiles&&!a.choices.some(c=>c.id===choice))return;
  a.selected=choice;a.revealed=reveal;a.result=!reveal&&(tiles?rebuildCorrect(activityAnswer(),vocabularyReading(q)):choice===q.id);a.checked=true;
  if(a.result)a.correct++;else if(!a.missed.includes(q.id))a.missed.push(q.id);
  record('activities',`${WH_CONVERSATIONS[q.word]?(tiles?'wh-tiles':'demonstratives'):a.kind}-${q.id}`,a.result);render();
}
function dialoguePrompt(q){
  const situation=q.scene?`<div class="dialogue-situation"><span class="dialogue-role">Situation</span><p class="dialogue-scene">${esc(q.scene)}</p></div>`:'';
  const incoming=q.incoming?`<blockquote class="dialogue-incoming"><div class="dialogue-speaker"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 3v-3a2 2 0 0 1-2-2V6a2 2 0 0 1 3-2Z"/><path d="M7 9h10M7 13h6"/></svg><span class="dialogue-role">They say</span></div><p class="dialogue-scene jp" lang="ja">${esc(q.incoming)}</p></blockquote>`:'';
  return situation+incoming;
}
function dialogueExercise(q,tileMode){
  const a=state.activity,zh=state.language==='zh-Hant',wh=!!WH_CONVERSATIONS[q.word],opening=wh?['listener','こんにちは。','Hello.','你好。']:EXERCISE_OPENINGS[q.id]||CONVERSATIONS[q.id][2][0],word=wordBy(q.word);
  const situation=wh?q.clue:zh?CONVERSATIONS[q.id][1]:CONVERSATIONS[q.id][0];
  const response=tileMode?`<div class="reply-tokens" role="group" aria-label="Your hiragana answer">${a.chosen.length?a.chosen.map((id,index)=>`<button class="reply-token jp" lang="ja" data-activity-return="${index}" aria-label="Return ${esc(a.tileBank[id])} to word bank" ${a.checked?'disabled':''}>${esc(a.tileBank[id])}</button>`).join(''):'<span class="reply-placeholder">Build your reply</span>'}</div>`:a.checked?`<p class="jp" lang="ja">${esc(a.choices.find(item=>item.id===a.selected)?.kana||'—')}</p>`:'<p class="reply-placeholder">Choose your reply</p>';
  const feedback=a.checked?`<div class="reply-feedback ${a.result?'correct':'wrong'}" role="status"><span class="feedback-lulu ${a.result?'happy':'encouraging'}" aria-hidden="true"></span><div class="feedback-copy"><div><span aria-hidden="true">${a.result?'✓':'✕'}</span> <strong>${a.result?'Correct!':'The correct answer is:'}</strong></div>${a.result?'':`<p class="jp" lang="ja">${esc(q.kana)}</p>`}<p>${esc(zh?word.zh:word.en)}</p></div><p class="activity-explanation">${esc(q.why)}</p></div>`:'';
  const bank=tileMode?`<div class="activity-tile-bank" role="group" aria-label="Hiragana bank">${a.tileBank.map((unit,index)=>`<button class="tile jp ${a.chosen.includes(index)?'selected':''}" lang="ja" data-activity-tile="${index}" ${a.checked||a.chosen.includes(index)?'disabled':''}>${esc(unit)}</button>`).join('')}</div>`:`<div class="options activity-options">${a.choices.map((item,index)=>`<button class="option jp ${a.checked&&item.id===q.id?'correct':a.checked&&item.id===a.selected?'wrong':''}" data-activity-choice="${item.id}" ${a.checked?'disabled':''}><span class="number">${index+1}</span><span>${esc(item.kana)}</span>${a.checked&&item.id===q.id?'<span class="option-state"><span aria-hidden="true">✓</span> Correct</span>':a.checked&&item.id===a.selected?'<span class="option-state"><span aria-hidden="true">✕</span> Your choice</span>':''}</button>`).join('')}</div>`;
  const controls=a.checked?button('Next '+icon('arrow'),'activityNext','primary'):tileMode?button('Undo','activityUndo','ghost',a.chosen.length?'':'disabled')+button('Clear','activityClear','ghost',a.chosen.length?'':'disabled')+button('Check answer','activityCheck','primary',rebuildReady(activityAnswer(),vocabularyReading(q))?'':'disabled'):'';
  return `<h1 class="sr-only">${tileMode?'Rebuild':'Matching'}</h1><section class="study-wrap conversation-exercise">${roundBar(a)}<div class="exercise-body"><p class="exercise-situation">${esc(situation)}</p><div class="conversation-stage"><div class="conversation-turn listener">${conversationPig('listener')}<div class="conversation-bubble"><span class="dialogue-role">${conversationSpeaker(q,'listener')}</span><p class="jp" lang="ja">${esc(opening[1])}</p><p class="conversation-translation">${esc(zh?opening[3]:opening[2])}</p></div></div><div class="conversation-turn you">${conversationPig('you',CONVERSATION_POSES[q.id])}<div class="conversation-bubble reply-bubble ${a.checked?(a.result?'correct':'wrong'):''}"><span class="dialogue-role">You</span>${wh||q.sentence?`<p class="jp" lang="ja">${esc(q.sentence).replace('{word}','_____')}</p>`:''}${response}</div></div></div>${bank}${feedback}${controls?`<div class="card-actions activity-controls">${controls}</div>`:''}${tileMode&&!a.checked?'<div class="activity-reveal"><button class="scope-link" data-action="activityReveal">Show answer & mark for review</button></div>':''}</div></section>`;
}
function activityPage(){const a=state.activity;if(!a)return dialogueMenu();const dialogue=a.kind.startsWith('dialogue');if(a.index>=a.ids.length)return header('Round complete.','Give yourself another chance with the items you missed.')+`<div class="study-wrap paper result-center"><div class="result-score">${a.correct}<small> / ${a.ids.length}</small></div><p class="muted" style="margin-top:var(--space-4)">${a.missed.length?`${a.missed.length} items are ready for another look.`:'Every answer correct in this round.'}</p><div class="card-actions">${a.missed.length?button('Practise missed items','activityMissed','coral'):''}${button('New round','activityRestart','primary')}</div><div class="result-back">${button('Go back','activityBack','ghost')}</div></div>`;
const q=activityCurrent(),tileMode=isActivityRebuild(a);
return dialogueExercise(q,tileMode);}
function activityChoices(){const a=state.activity;return `<div class="options activity-options">${a.choices.map((q,i)=>`<button class="option jp ${a.checked&&q.id===activityCurrent().id?'correct':a.checked&&q.id===a.selected?'wrong':''}" data-activity-choice="${q.id}" ${a.checked?'disabled':''}><span class="number">${i+1}</span>${esc(q.kana)}</button>`).join('')}</div>`;}
function activityTiles(q){
  const a=state.activity,target=vocabularyReading(q);
  return rebuildTileInputs(a,target,'activity')+(a.checked?'':rebuildTileControls(a,target,'activity'));
}
function activityAction(action){const a=state.activity;if(!a)return;switch(action){case'activityBack':if(a.scope){state.dialogueBrowse=a.scope.browse;state.dialogueChapter=a.scope.chapter;state.dialogueCategory=a.scope.category;selectedDialogueExpression=a.scope.selected;}else{state.dialogueBrowse='category';state.dialogueCategory=a.kind.startsWith('dialogue')?a.category||'introductions':'wh-words';}navigate('dialogue',false);break;case'activityNext':a.index++;prepareActivity();render();break;case'activityRestart':startActivity(a.kind,undefined,a.category,a.scope);break;case'activityMissed':startActivity(a.kind,shuffle(a.missed),a.category,a.scope);break;case'activityClear':if(!a.checked)a.chosen=[];render();break;case'activityUndo':if(!a.checked)a.chosen.pop();render();break;case'activityCheck':checkActivity();break;case'activityReveal':checkActivity(null,true);break;}}
function activityClick(target){const d=target.dataset;if(d.dialogueBrowse){dialogueBrowse(d.dialogueBrowse);return true;}if(d.dialogueChapter){selectDialogueChapter(d.dialogueChapter);return true;}if(d.openDemonstratives){if(d.openDemonstratives==='guide'){selectDialogueCategory('wh-words');}else if(d.openDemonstratives==='practice')startActivity('demonstratives');else if(d.openDemonstratives==='rebuild')startActivity('wh-tiles');return true;}if(d.dialogueCategory){selectDialogueCategory(d.dialogueCategory);return true;}if(d.whExpression){selectWhExpression(d.whExpression);return true;}if(d.dialogueExpression){selectDialogueExpression(d.dialogueExpression);return true;}if(d.openDialogue){startDialoguePractice(d.openDialogue);return true;}if(d.activityChoice){checkActivity(d.activityChoice);return true;}if(d.activityTile!==undefined){const a=state.activity;if(!a||a.checked||!isActivityRebuild(a)||!activityCurrent())return true;const i=Number(d.activityTile),limit=kanaUnits(vocabularyReading(activityCurrent())).length;if(Number.isInteger(i)&&i>=0&&i<a.tileBank.length&&!a.chosen.includes(i)&&a.chosen.length<limit)a.chosen.push(i);render();return true;}if(d.activityReturn!==undefined){const a=state.activity;const i=Number(d.activityReturn);if(a&&!a.checked&&isActivityRebuild(a)&&Number.isInteger(i)&&i>=0&&i<a.chosen.length)a.chosen.splice(i,1);render();return true;}if(d.action?.startsWith('activity')){activityAction(d.action);return true;}return false;}

function demonstrativeGraphic(q,compact=false){
  const age=q.word.startsWith('1-19'),object=q.word==='2-36';
  const figure=object?'<rect x="225" y="93" width="50" height="58" rx="5" fill="#f5d577" stroke="#8c7039" stroke-width="2"/><path d="M234 94v56m8-40h25m-25 12h20" stroke="#8c7039" stroke-width="2"/>':luluPiggy(250,122,1.24,'thinking');
  return `<figure class="expression-figure"><svg viewBox="0 0 500 225" role="img" aria-labelledby="wh-scene-${q.id}${compact?'-guide':''}"><title id="wh-scene-${q.id}${compact?'-guide':''}">${esc(q.clue)}</title>${lessonBackdrop()}${figure}<rect x="315" y="35" width="110" height="66" rx="16" fill="#fffaf0" stroke="#a36843" stroke-width="2"/><text x="370" y="79" text-anchor="middle" font-size="30" fill="#7e4a30">${age?'18?':'?'}</text></svg></figure>`;
}
function demonstrativeQuestion(q){
  return `${demonstrativeGraphic(q)}<div class="scene-sentence"><span class="eyebrow muted">${esc(q.clue)}</span><div class="jp" lang="ja">${esc(q.sentence).replace('{word}','<span class="scene-blank">_____</span>')}</div></div>`;
}
