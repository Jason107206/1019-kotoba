'use strict';
// Reading keys for the first-hiragana filter. There is no separate grouping page.
const HIRAGANA_SECTIONS = [
  {id:'basic', title:'Basic hiragana', rows:[
    [['あ','a'],['い','i'],['う','u'],['え','e'],['お','o']],
    [['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko']],
    [['さ','sa'],['し','shi'],['す','su'],['せ','se'],['そ','so']],
    [['た','ta'],['ち','chi'],['つ','tsu'],['て','te'],['と','to']],
    [['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no']],
    [['は','ha'],['ひ','hi'],['ふ','fu'],['へ','he'],['ほ','ho']],
    [['ま','ma'],['み','mi'],['む','mu'],['め','me'],['も','mo']],
    [['や','ya'],null,['ゆ','yu'],null,['よ','yo']],
    [['ら','ra'],['り','ri'],['る','ru'],['れ','re'],['ろ','ro']],
    [['わ','wa'],null,null,null,['を','o']],
    [['ん','n'],null,null,null,null]
  ]},
  {id:'voiced', title:'Voiced & p sounds', rows:[
    [['が','ga'],['ぎ','gi'],['ぐ','gu'],['げ','ge'],['ご','go']],
    [['ざ','za'],['じ','ji'],['ず','zu'],['ぜ','ze'],['ぞ','zo']],
    [['だ','da'],['ぢ','ji'],['づ','zu'],['で','de'],['ど','do']],
    [['ば','ba'],['び','bi'],['ぶ','bu'],['べ','be'],['ぼ','bo']],
    [['ぱ','pa'],['ぴ','pi'],['ぷ','pu'],['ぺ','pe'],['ぽ','po']]
  ]}
];
const HIRAGANA_KEYS=HIRAGANA_SECTIONS.flatMap(section=>section.rows.flat().filter(Boolean));
function hiraganaInitial(word){
  const reading=String(word.kana||word.jp||'').normalize('NFKC')
    .replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60))
    .replace(/^[^ぁ-ゖ]*/u,'');
  return [...reading][0]||'';
}

// Prefer spelling traps: voicing, small kana and long vowels, then similar shapes.
function hiraganaDistractors(reading){
  const letters=[...reading],mutations=[];
  const voicing=['かが','きぎ','くぐ','けげ','こご','さざ','しじ','すずづ','せぜ','そぞ','ただ','ちぢ','つづ','てで','とど','はばぱ','ひびぴ','ふぶぷ','へべぺ','ほぼぽ'];
  const small=['やゃ','ゆゅ','よょ','つっ','あぁ','いぃ','うぅ','えぇ','おぉ'];
  const vowels=['うお','いえ'],shapes=['ぬめ','ねれわ','るろ','しつ','そん','きさ'];
  for(const group of [...voicing,...vowels,...small,...shapes])letters.forEach((letter,index)=>{
    if(!group.includes(letter))return;
    for(const replacement of group)if(replacement!==letter){
      const copy=[...letters];copy[index]=replacement;
      const priority=voicing.includes(group)?(replacement===group[0]?0:3):vowels.includes(group)?1:small.includes(group)?2:4;
      mutations.push({index,replacement,text:copy.join(''),priority});
    }
  });
  mutations.sort((a,b)=>a.priority-b.priority);
  // Full-sized vowels are more useful traps than rare small vowels on their own.
  const useful=mutations.filter(m=>!/[ぁぃぅぇぉ]/u.test(m.replacement));
  const first=useful[0],second=useful.find(m=>m.index!==first?.index);
  const candidates=[];
  if(first)candidates.push(first.text);
  if(second){
    candidates.push(second.text);
    const copy=[...letters];copy[first.index]=first.replacement;copy[second.index]=second.replacement;candidates.push(copy.join(''));
  }
  candidates.push(...useful.map(m=>m.text),...mutations.map(m=>m.text));
  // Single-character prompts still need three different, valid hiragana choices.
  for(const replacement of 'あいうえおかきくけこさしすせそん'){
    const index=letters.findIndex(letter=>/[ぁ-ゖー]/u.test(letter));
    if(index<0)break;
    const copy=[...letters];copy[index]=replacement;candidates.push(copy.join(''));
  }
  return [...new Set(candidates)].filter(text=>text!==reading).slice(0,3);
}
