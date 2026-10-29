'use strict';
// Pixel rectangles include their transparent padding. Selection happens at grading, never in render.
const LULU_ASSETS={
 idle:{src:'icons/lulu-piggy.png',width:1145,height:1374,rects:[[0,0,1145,1374]]},
 original:{src:'icons/lulu-poses.png',width:1254,height:1254,rects:[[0,0,418,418],[418,0,418,418],[836,0,418,418],[0,418,418,418],[418,418,432,418],[850,418,404,418],[0,836,418,418],[418,836,418,418],[836,820,418,434]]},
 feedback:{src:'icons/lulu-feedback.png',width:1774,height:887,cell:887,columns:2},
 occupations:{src:'icons/lulu-occupations.png',width:2172,height:724,cell:724,columns:3},
 actions:{src:'icons/lulu-actions.png',width:1536,height:1024,rects:[[0,0,512,512],[512,0,512,512],[1024,0,512,512],[0,512,512,512],[512,512,552,512],[1064,512,472,512]]},
 feedbackNew:{src:'icons/lulu-feedback-new.png',width:1536,height:1024,rects:[[0,60,512,464],[512,30,512,529],[1024,0,512,545],[0,524,512,500],[512,559,512,465],[1024,545,512,479]]},
 teaching:{src:'icons/lulu-teaching.png',width:1448,height:1086,rects:[[0,0,285,395],[285,0,430,395],[715,0,435,395],[1150,0,298,395],[0,395,396,325],[396,395,344,325],[740,395,410,325],[1150,395,298,325],[0,720,317,366],[317,720,409,366],[726,720,409,366],[1135,720,313,366]]}
};
const LULU_ART={
 idle:['idle',0],
 employeeOriginal:['occupations',0],bankerOriginal:['occupations',1],researcherOriginal:['occupations',2],
 listening:['actions',0],watching:['actions',1],photographing:['actions',2],smoking:['actions',3],finishing:['actions',4],resting:['actions',5],
 wave:['original',0],point:['original',1],bow:['original',2],reading:['original',3],teacher:['original',4],doctor:['original',5],thinking:['original',6],gift:['original',7],speaking:['original',8],
 happy:['feedback',0],encouraging:['feedback',1],clap:['feedbackNew',0],proud:['feedbackNew',1],hop:['feedbackNew',2],puzzled:['feedbackNew',3],disappointed:['feedbackNew',4],review:['feedbackNew',5],
 self:['teaching',0],you:['teaching',1],teaching:['teaching',2],student:['teaching',3],examining:['teaching',4],working:['teaching',5],researching:['teaching',6],eating:['teaching',7],drinking:['teaching',8],waking:['teaching',9],sleeping:['teaching',10],walking:['teaching',11]
};
const LULU_FEEDBACK_POOLS={correct:['happy','clap','proud','hop'],wrong:['encouraging','puzzled','disappointed','review']};
const luluPoolCursor={correct:0,wrong:0};
function luluFallback(){return '<g class="lulu-fallback" fill="#f9d5c8" stroke="#925b38" stroke-width="5"><path d="M20 38Q5 3 35 20Q65 9 83 20Q112 2 96 40Q112 100 57 105Q3 101 20 38Z"/><ellipse cx="58" cy="65" rx="20" ry="14" fill="#efa6a5"/><circle cx="38" cy="46" r="3" fill="#925b38"/><circle cx="77" cy="46" r="3" fill="#925b38"/><path d="M51 63v3m14-3v3"/></g>';}
function luluSprite(pose,cls=''){
 const entry=LULU_ART[pose];if(!entry)throw Error('Unknown Lulu pose: '+pose);
 const a=LULU_ASSETS[entry[0]],[x,y,w,h]=a.rects?.[entry[1]]||[entry[1]%a.columns*a.cell,Math.floor(entry[1]/a.columns)*a.cell,a.cell,a.cell];
 return `<span class="lulu-art ${cls}" data-lulu-pose="${pose}" aria-hidden="true"><svg viewBox="0 0 ${w} ${h}" focusable="false"><svg class="lulu-crop" width="${w}" height="${h}" viewBox="${x} ${y} ${w} ${h}" overflow="hidden"><image href="${a.src}" width="${a.width}" height="${a.height}"/></svg><svg class="lulu-fallback" x="0" y="0" width="${w}" height="${h}" viewBox="0 0 120 120">${luluFallback()}</svg></svg></span>`;
}
// SVG scene participants use the same source/crop registry and fallback as HTML cards.
function luluSvgPose(pose,x,y,width,height){return `<foreignObject class="lulu-piggy" x="${x}" y="${y}" width="${width}" height="${height}">${luluSprite(pose)}</foreignObject>`;}
function luluChoose(pool){const list=LULU_FEEDBACK_POOLS[pool],index=luluPoolCursor[pool]++%list.length;return list[index];}
function luluCommitFeedback(holder,{key,correct=0,total=1,assisted=false,revealed=false,selfAssessed=false}={}){
 if(!holder)return;key??=String(holder.index??'result');if(holder.luluFeedback?.key===key)return holder.luluFeedback;
 const outcome=selfAssessed?'self':revealed?'revealed':correct>0&&correct<total?'partial':correct===total?(assisted?'assisted':'correct'):'wrong';
 const pose=['self','revealed','assisted'].includes(outcome)?'review':luluChoose(outcome==='correct'?'correct':'wrong');
 holder.luluAnyAssisted=!!holder.luluAnyAssisted||assisted||revealed||selfAssessed;holder.luluAnySelf=!!holder.luluAnySelf||selfAssessed;holder.luluFeedback={key,pose,outcome,correct,total};
 return holder.luluFeedback;
}
function luluFeedbackLabel(holder){const o=holder?.luluFeedback?.outcome;if(o==='self')return holder.luluFeedback.correct===holder.luluFeedback.total?(state.language==='zh-Hant'?'✓ 手寫自評：正確':'✓ Handwriting: marked correct by you'):(state.language==='zh-Hant'?'↻ 手寫自評：需要再練習':'↻ Handwriting: self-assessed for more practice');return ({correct:['✓ Correct independently','✓ 獨立答對'],wrong:['✕ Try again — use the correction below','✕ 再試一次，參考下方修正'],partial:['◐ Partly correct','◐ 部分答對'],assisted:['✓ Correct with guidance','✓ 在引導下答對'],revealed:['↻ Model shown · practise again','↻ 已顯示範例，再練習一次'],self:['✓/✕ Handwriting · self-assessed','✓/✕ 手寫結果由你自評']})[o]?.[state.language==='zh-Hant'?1:0]||'';}
function luluFeedbackArt(holder){const f=holder?.luluFeedback;return f?`<span class="feedback-lulu ${f.outcome==='correct'?'happy':'encouraging'}" data-lulu-outcome="${f.outcome}">${luluSprite(f.pose)}</span>`:luluSprite('thinking','feedback-lulu');}
function luluFeedbackHeading(holder){return `<div class="lulu-feedback-heading" role="status" aria-live="polite" aria-atomic="true">${luluFeedbackArt(holder)}<strong>${luluFeedbackLabel(holder)}</strong></div>`;}
function luluFeedbackPlaceholder(){return `<div class="lulu-feedback-placeholder" aria-hidden="true">${luluSprite('thinking')}<span>${state.language==='zh-Hant'?'作答後在此查看結果。':'Your result will appear here.'}</span></div>`;}
function luluGradeRound(r){
 const results=r.mode==='write'?[!!r.result?.bOk,!!r.result?.cOk]:[!!r.result];
 luluCommitFeedback(r,{key:String(r.index),correct:results.filter(Boolean).length,total:results.length,assisted:!!r.assisted,revealed:!!r.revealed,selfAssessed:r.mode==='kanji-writing'});
 if(r.index===r.ids.length-1)luluPrepareSummary(r,r.learningGuided?r.guidedCorrect||0:r.correct,r.ids.length,!!r.learningGuided,r.mode==='kanji-writing');
}
function luluPrepareSummary(r,correct,total,assisted=false,selfAssessed=false){r.luluSummary={};luluCommitFeedback(r.luluSummary,{key:'summary',correct,total,assisted:assisted||r.luluAnyAssisted,selfAssessed:selfAssessed||r.luluAnySelf});}
function luluSummaryArt(r){const holder=r?.luluSummary||r;return holder?.luluFeedback?`<div class="lulu-summary">${luluFeedbackHeading(holder)}</div>`:luluSectionArt('retry');}
function luluScenePerson(x,y,scale=1,role='speaker',pose='point'){
 const mirrored=role==='listener'&&pose==='point';return `<g data-lulu-role="${role}" ${mirrored?`transform="translate(${2*x} 0) scale(-1 1)"`:''}>${luluPiggy(x,y,scale,pose)}<path d="M${x-13*scale} ${y+15*scale}q${13*scale} ${12*scale} ${26*scale} 0l${-3*scale} ${10*scale}h${-20*scale}Z" fill="${role==='speaker'?'#8b6eae':'#65aeb8'}" stroke="#925b38" stroke-width="${1.5*scale}"/></g>`;
}
function luluSectionArt(section,cls=''){
 const pose=({home:'wave','vocabulary-menu':'student',vocabulary:'student',grammar:'point',pictures:'speaking','number-menu':'point',handwriting:'student','handwriting-menu':'student',mock:'working',mixed:'thinking',bank:'reading',reference:'reading',retry:'review',empty:'thinking',milestone:'proud',about:'bow'})[section]||'point';
 const prop=({home:'welcome','vocabulary-menu':'cards',vocabulary:'cards',grammar:'tiles',pictures:'conversation','number-menu':'number-board',handwriting:'writing-grid','handwriting-menu':'writing-grid',mock:'stopwatch',mixed:'mixed',bank:'dictionary',reference:'dictionary',retry:'pencil',empty:'search',milestone:'star',about:'cards'})[section]||'tiles';
 return `<span class="lulu-section-art ${cls}" data-lulu-section="${section}" aria-hidden="true">${luluSprite(pose)}${section==='pictures'?luluSprite('bow','lulu-companion'):''}<svg class="lulu-section-prop" viewBox="0 0 120 120" focusable="false">${luluProp(prop)}</svg></span>`;
}
function luluProp(key){const rect=(x,y,w,h,fill='#fff8e7')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${fill}" stroke="#925b38" stroke-width="4"/>`;
 if(key==='tiles')return rect(8,25,45,26,'#eadff5')+rect(62,25,47,26,'#ffe7ad')+rect(22,65,70,26,'#d8eeee')+'<path d="m40 105 10 7 12-7" fill="none" stroke="#925b38" stroke-width="4"/>';
 if(key==='cards')return rect(18,15,66,88,'#dbeeed')+rect(35,28,65,80)+'<path d="M48 50h38m-38 16h25m-25 16h32" stroke="#b699b6" stroke-width="5"/>';
 if(key==='conversation')return rect(6,16,70,43,'#eadff5')+rect(40,64,70,39,'#dbeeed')+'<path d="m23 59-7 15 25-15m48 44 7 11-23-11" fill="#eadff5" stroke="#925b38" stroke-width="3"/><circle cx="27" cy="37" r="4" fill="#925b38"/><circle cx="48" cy="37" r="4" fill="#925b38"/>';
 if(key==='number-board')return rect(8,10,104,83,'#dbeeed')+'<text x="60" y="66" text-anchor="middle" font-size="38" fill="#75476d" font-family="sans-serif">123</text><path d="m28 111 12-18m52 18L80 93" stroke="#925b38" stroke-width="4"/>';
 if(key==='stopwatch')return '<g fill="#fff8df" stroke="#925b38" stroke-width="5"><circle cx="60" cy="69" r="42"/><path d="M60 27V12m-13 0h26m-13 57V41m0 28 19 11M90 32l10-10" fill="none"/></g>';
 if(key==='writing-grid')return rect(12,10,92,100)+'<path d="M58 13v95M15 60h86M18 18l81 81m-80 0 80-81" stroke="#cbb6d9" stroke-width="2"/><path d="m70 94 31-58 10 6-31 59-12 5Z" fill="#f5c46c" stroke="#925b38" stroke-width="3"/>';
 if(key==='dictionary')return luluObjectMarkup('dictionary');
 if(key==='search')return '<g fill="#e8e1f4" stroke="#925b38" stroke-width="6"><circle cx="48" cy="47" r="30"/><path d="m70 70 33 33"/></g>';
 if(key==='star'||key==='welcome')return '<path d="m60 12 14 30 33 4-24 23 6 34-29-16-29 16 6-34L13 46l33-4Z" fill="#f5d67c" stroke="#925b38" stroke-width="5"/>';
 if(key==='pencil')return luluObjectMarkup('pencil');
 if(key==='mixed')return rect(5,12,52,40,'#dbeeed')+'<text x="31" y="42" text-anchor="middle" font-size="27" fill="#925b38">12</text>'+rect(68,14,42,60,'#ffe8b1')+rect(10,83,38,23,'#eadff5')+rect(60,83,50,23,'#eadff5');
 throw Error('Unknown Lulu prop '+key);
}
const LULU_ICON_PATHS={
 study:'<path d="m2 6 10-4 10 4-10 5zM5 10v6q7 6 14 0v-6m3-4v12"/>',
 travel:'<rect x="3" y="3" width="18" height="15" rx="4"/><path d="M4 10h16m-12-6v6m8-6v6M6 18v3m12-3v3m-12-7h2m8 0h2"/>',
 actions:'<circle cx="14" cy="4" r="2"/><path d="m6 11 5-4 5 3 4-1M11 7l-2 7 5 3-2 5m-3-8-5 7"/>',
 time:'<circle cx="12" cy="12" r="9"/><path d="M12 5v7l4 3"/>',
 linking:'<path d="m8 14-3 3a4 4 0 0 1-5-5l5-5a4 4 0 0 1 6 1m2 2 3-3a4 4 0 0 1 5 5l-5 5a4 4 0 0 1-6-1M7 16l10-8" transform="translate(1 -1)"/>',
 everyday:'<path d="M3 4h18v13H9l-5 4v-4H3z"/><path d="M12 8q-4-4-5 0 0 3 5 6 5-3 5-6-1-4-5 0Z"/>',

 vocabulary:'<rect x="4" y="3" width="13" height="17" rx="2"/><path d="m17 7 4 2v13H8l-4-2m4-12h5m-5 4h5"/>',
 grammar:'<rect x="2" y="4" width="8" height="5" rx="1"/><rect x="13" y="4" width="9" height="5" rx="1"/><path d="M4 15h14m-4-3 4 3-4 3M4 21h16"/>',
 reference:'<path d="M4 3h14v18H4zM4 7h14M8 3v18m10-12h4m-4 5h4m-4 5h4"/>',
 mixed:'<rect x="2" y="3" width="8" height="8" rx="1"/><path d="M4 7h4m-2-2v4m9-5h7m-7 4h5M3 16h8m-8 4h6"/><circle cx="18" cy="18" r="4"/>',
 timer:'<circle cx="12" cy="14" r="8"/><path d="M12 6V2m-3 0h6m-3 12V9m0 5 4 2m3-11 2-2"/>',
 undo:'<path d="m8 4-5 5 5 5M3 9h11a6 6 0 0 1 0 12H9"/>',
 clear:'<path d="m4 15 9-12 8 6-9 12H8zm4 6h14M8 10l8 6"/>',
 missing:'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M9 9a3 3 0 1 1 5 2l-2 2m0 3v1"/>'
};
function luluAfterRender(){
 if(!document.querySelectorAll)return;
 // Keep controls before expandable corrections; reserved artwork space is below the control row.
 for(const panel of document.querySelectorAll('.feedback,.reply-feedback,.lulu-feedback-placeholder')){
  if(panel.closest('.result-center'))continue;let next=panel.nextElementSibling;
  if(next?.classList.contains('card-actions'))next.after(panel);
 }
}
if(document.addEventListener)document.addEventListener('error',event=>{const target=event.target;if(target?.tagName?.toLowerCase()!=='image')return;const sprite=target.closest('.lulu-art');if(!sprite)return;sprite.dataset.artState='fallback';target.style.display='none';},{capture:true});
function luluTaskArt(task){const section=({questions:'pictures',order:'grammar',particles:'number-menu',completion:'handwriting',pictures:'pictures',situations:'about'})[task]||'grammar';return luluSectionArt(section,'lulu-task-art');}
function luluNumberArt(q){
 const v=q.value;let prop;
 if(q.type==='clock'){const [hour,minute]=v;prop=`<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="#fff5df" stroke="#925b38" stroke-width="4"/><path d="M60 60V31" transform="rotate(${hour%12*30+minute*.5} 60 60)" stroke="#925b38" stroke-width="6"/><path d="M60 60V17" transform="rotate(${minute*6} 60 60)" stroke="#8b6eae" stroke-width="4"/></svg>`;}
 else {const value=q.type==='dates'?v.join('/'):q.type==='fractions'?v[0]+'/'+v[1]:q.type==='weekdays'?['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][v-1]:q.type==='relative'?(v[1]>0?'+':'')+v[1]+' '+v[0]:q.type==='money'?'¥'+v:q.type==='floors'?v+'F':String(v);prop=`<svg viewBox="0 0 120 120"><rect x="3" y="13" width="114" height="91" rx="9" fill="#e4efde" stroke="#925b38" stroke-width="4"/><text x="60" y="67" text-anchor="middle" fill="#704832" font-size="${value.length>6?17:24}" font-family="sans-serif">${esc(value)}</text></svg>`;}
 return `<span class="lulu-number-art" data-number-visual="${esc(q.id)}" aria-hidden="true">${luluSprite('point')}${prop}</span>`;
}

function luluProgressArt(){const secured=WORDS.filter(w=>(progress.words[w.id]?.wins||0)>=2).length;return secured>=10?`<div class="lulu-progress-note">${luluSectionArt('milestone','lulu-small')}<p>${secured} ${state.language==='zh-Hant'?'個詞條已連續答對兩次。':'words recalled correctly twice in a row.'}</p></div>`:`<div class="lulu-progress-note">${luluSectionArt('vocabulary','lulu-small')}<p>${state.language==='zh-Hant'?'練習後在此查看真實進度。':'Practise to build your progress here.'}</p></div>`;}
