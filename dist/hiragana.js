'use strict';
// Navigation characters only. Every displayed word comes from the existing syllabus bank.
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
function hiraganaGroups(words){
  const groups=new Map(HIRAGANA_KEYS.map(([kana])=>[kana,[]]));
  for(const word of words){const initial=hiraganaInitial(word);if(!groups.has(initial))groups.set(initial,[]);groups.get(initial).push(word);}
  for(const group of groups.values())group.sort((a,b)=>a.kana.localeCompare(b.kana,'ja')||a.id.localeCompare(b.id));
  return groups;
}
function hiraganaWords(){return hiraganaGroups(pool('cards',true)).get(state.kanaSelected)||[];}
function hiraganaView(){
  if(state.kanaSelected)return hiraganaDetail();
  const words=pool('cards',true),groups=hiraganaGroups(words);
  const section=HIRAGANA_SECTIONS.find(x=>x.id===state.kanaSection)||HIRAGANA_SECTIONS[0];
  return header('Words by hiragana.','Tap a first character to find its words, then practise that group. Only your Chapters 1–2 vocabulary appears here.',`${words.length} forms`)
    +filters(false,true)
    +`<div class="kana-toolbar"><div class="kana-tabs" role="group" aria-label="Hiragana chart section">${HIRAGANA_SECTIONS.map(s=>{const count=s.rows.flat().filter(Boolean).reduce((total,[k])=>total+(groups.get(k)?.length||0),0);return `<button class="${section.id===s.id?'active':''}" data-kana-section="${s.id}" aria-pressed="${section.id===s.id}">${s.title}<span>${count}</span></button>`;}).join('')}</div><span class="small muted">Tile numbers = vocabulary forms</span></div>
    <section class="kana-chart" aria-label="${section.title}"><div class="kana-vowels" aria-hidden="true"><span>a</span><span>i</span><span>u</span><span>e</span><span>o</span></div>${section.rows.map(row=>`<div class="kana-grid-row">${row.map(cell=>{if(!cell)return '<span class="kana-gap" aria-hidden="true"></span>';const[kana,romaji]=cell,items=groups.get(kana)||[],learned=items.filter(w=>(progress.words[w.id]?.wins||0)>=2).length;return `<button class="kana-tile ${items.length?'':'kana-empty'} ${items.length&&learned===items.length?'kana-secure':''}" data-kana="${kana}" ${items.length?'':'disabled'} aria-label="${kana}, ${romaji}, ${items.length} vocabulary forms${learned?`, ${learned} secure`:''}"><span class="kana-tile-count">${items.length}</span><span class="kana-glyph jp" lang="ja">${kana}</span><span class="kana-romaji">${romaji}</span>${items.length?`<span class="kana-tile-progress" aria-hidden="true"><span style="width:${100*learned/items.length}%"></span></span>`:''}</button>`;}).join('')}</div>`).join('')}</section>
    <p class="scope-note">Grey tiles have no words in the current selection. Voiced sounds have their own groups: が is separate from か. Katakana words are grouped by their hiragana readings. Template marks such as ～ are ignored.</p>`;
}
function hiraganaDetail(){
  const kana=state.kanaSelected,romaji=HIRAGANA_KEYS.find(([k])=>k===kana)?.[1]||'',words=hiraganaWords();
  const learned=words.filter(w=>(progress.words[w.id]?.wins||0)>=2).length;
  return `<div class="kana-back">${button('← All hiragana','kanaGrid','ghost')}</div><section class="kana-group-heading"><div class="kana-large"><span class="jp" lang="ja">${esc(kana)}</span><span>${romaji}</span></div><div><div class="eyebrow muted">WORDS STARTING WITH</div><h1><span class="jp" lang="ja">${esc(kana)}</span> <span class="muted">/ ${romaji}</span></h1><p>${words.length} vocabulary forms · ${learned} secure</p><p class="small muted">From your quiz pages, grouped by the first hiragana.</p></div></section>`
    +filters(false,true)
    +`<div class="kana-drill-bar"><div><strong>Practise this group</strong><p class="small muted">Your selection carries into the whole round.</p></div><div class="row">${['cards','write','match'].map((mode,i)=>`<button class="button ${i===0?'primary':'ghost'}" data-kana-drill="${mode}" ${(mode==='match'?words.some(hasKanji):words.length)?'':'disabled'}>${icon(mode)} ${['Recall cards','Write · Part A','Kanji match'][i]}</button>`).join('')}</div></div>
    <div class="section-head"><h2>Meet the words</h2>${button(state.kanaReveal?'Hide meanings & kanji':'Show meanings & kanji','toggleKanaAnswers','ghost','aria-pressed="'+state.kanaReveal+'"')}</div>
    ${words.length?`<section class="kana-word-grid" aria-label="Words beginning with ${kana}">${words.map(w=>`<article class="kana-word-card"><div class="row between"><span class="tag">CH.${w.ch} · P.${w.page}</span><span class="status-badge ${status(w.id)==='Secure'?'learned':''}">${status(w.id)}</span></div><h3 class="jp" lang="ja">${esc(w.kana)}</h3>${w.jp!==w.kana?`<div class="small muted">Book: <span class="jp" lang="ja">${esc(w.jp)}</span></div>`:''}${state.kanaReveal?`${hasKanji(w)?`<div class="kana-written jp" lang="ja">${esc(w.c)}</div>`:''}<p class="kana-meaning">${esc(w.zh)}</p><p class="small muted">${esc(w.en)}</p>`:`<p class="kana-covered muted">${hasKanji(w)?'Recall the meaning and kanji.':'Recall the meaning.'}</p>`}${!w.jp.includes('～')?`<button class="kana-listen" data-kana-listen="${w.id}" aria-label="Listen to ${esc(w.kana)}">${icon('sound')} Listen</button>`:''}</article>`).join('')}</section>`:`<div class="empty paper"><h2>No words in this selection.</h2><p class="muted">Change the filters, or choose another hiragana.</p></div>`}`;
}
function chooseHiragana(kana){
  if(!HIRAGANA_KEYS.some(([k])=>k===kana))return;
  state.kanaSelected=kana;state.kanaReveal=true;state.filter.kana='all';state.view='hiragana';state.round=null;
  render();window.scrollTo({top:0,behavior:'smooth'});
}
function startHiraganaDrill(mode){
  if(!['cards','write','match'].includes(mode)||!state.kanaSelected)return;
  const ids=hiraganaWords().map(w=>w.id);state.filter.kana=state.kanaSelected;state.view=mode;begin(mode,shuffle(ids));render();window.scrollTo({top:0,behavior:'smooth'});
}
