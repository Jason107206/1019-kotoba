'use strict';
// Canonical chapter state: ['all'] or a sorted, unique list of chapter strings.
// Accept old single strings/numbers at every boundary; records remain canonical objects.
function normalizeChapters(value,available=CHAPTERS){
 const valid=new Set(available.map(String)),input=Array.isArray(value)?value:[value??'all'];
 if(input.some(ch=>String(ch)==='all'))return ['all'];
 const chapters=[...new Set(input.map(String).filter(ch=>valid.has(ch)))].sort((a,b)=>Number(a)-Number(b));
 return chapters.length?chapters:['all'];
}
function toggleChapter(value,chapter,available=CHAPTERS){
 const current=normalizeChapters(value,available),ch=String(chapter);
 if(ch==='all')return ['all'];
 if(!available.map(String).includes(ch))return current;
 return normalizeChapters(current.includes('all')?[ch]:current.includes(ch)?current.filter(id=>id!==ch):[...current,ch],available);
}
function matchesChapters(item,selection){const chapters=normalizeChapters(selection);return chapters.includes('all')||(item.chapters||[item.ch]).some(ch=>chapters.includes(String(ch)));}
function chaptersLabel(value){const chapters=normalizeChapters(value);if(chapters.includes('all'))return nL('All chapters','全部課次');return state.language==='zh-Hant'?`第 ${chapters.join('、')} 課`:`${chapters.length===1?'Chapter':'Chapters'} ${chapters.join(', ')}`;}
function chapterChipOptions(available=CHAPTERS){return [['all',nL('All chapters','全部課次')],...available.map(ch=>[String(ch),translateText(chapterLabel(ch))])];}
function filterChips(kind,scope,field,label,options,value,multiple=false){
 const selected=multiple?normalizeChapters(value):[String(value)],first=options.find(([id])=>selected.includes(String(id)))?.[0]??options[0]?.[0],prefix=`chip-${kind}-${scope}-${field}`;
 return `<fieldset class="filter-chip-group ${multiple?'chapter-chip-group':''}" data-chip-group="${prefix}"><legend>${esc(label)}${multiple?`<span class="chip-instruction">${nL('Select one or more','可選多課')}</span>`:''}</legend><div class="filter-chip-options">${options.map(([id,text])=>`<button type="button" class="filter-chip" id="${prefix}-${esc(id)}" data-filter-chip="${kind}" data-chip-scope="${scope}" data-chip-field="${field}" data-chip-value="${esc(id)}" ${multiple?`aria-label="${esc(text)}"`:''} aria-pressed="${selected.includes(String(id))}" tabindex="${String(id)===String(first)?0:-1}">${esc(multiple&&String(id)!=='all'?String(id):text)}</button>`).join('')}</div></fieldset>`;
}
function numberScopeChange(field,value){
 if(field==='type'&&state.numberType===value)return;
 if(field==='chapter')state.numberChapter=normalizeChapters(value,numberSelection().available);else state.numberType=value;
 state.numberPage=0;numberSelection();save();render();
}
function applyFilterChip(button){
 const d=button.dataset,field=d.chipField,scope=d.chipScope,value=d.chipValue,x=window.scrollX||0,y=window.scrollY||0;
 button.focus({preventScroll:true});focusFilterChip(button);
 if(d.filterChip==='learning')learningChange(scope,field,field==='chapter'?toggleChapter(learningScope(scope).chapter,value,learningChapters(scope)):value);
 else if(d.filterChip==='numbers')numberScopeChange(field,field==='chapter'?toggleChapter(state.numberChapter,value,numberSelection().available):value);
 else {
  if(field!=='ch'&&(field==='pattern'?state.pattern:state.filter[field])===value)return;
  if(field==='pattern')state.pattern=value;else state.filter[field]=field==='ch'?toggleChapter(state.filter.ch,value):value;
  state.round=null;save();render();
 }
 const target=document.getElementById?.(button.id);if(target){focusFilterChip(target);target.focus({preventScroll:true});}
 window.scrollTo(x,y);
}
function focusFilterChip(button){const group=button.closest('.filter-chip-options');if(group)for(const item of group.querySelectorAll('[data-filter-chip]'))item.tabIndex=item===button?0:-1;}
document.addEventListener('click',e=>{const button=e.target.closest('[data-filter-chip]');if(button&&!button.disabled)applyFilterChip(button);});
document.addEventListener('keydown',e=>{
 const button=e.target.closest?.('[data-filter-chip]');if(!button||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key))return;
 const items=[...button.parentElement.querySelectorAll('[data-filter-chip]:not(:disabled)')],at=items.indexOf(button),next=e.key==='Home'?items[0]:e.key==='End'?items.at(-1):items[(at+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1)+items.length)%items.length];
 e.preventDefault();focusFilterChip(next);next.focus({preventScroll:true});next.scrollIntoView({block:'nearest',inline:'nearest',behavior:'auto'});
});
