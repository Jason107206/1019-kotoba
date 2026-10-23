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
