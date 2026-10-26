'use strict';
const fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
// CSV supports BOM, quoted commas, escaped quotes, CRLF and embedded newlines.
function parseCSV(text){text=text.replace(/^\uFEFF/,'');const rows=[];let row=[],field='',quoted=false;for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}else if(!quoted&&(c===','||c==='\n')){row.push(field.replace(/\r$/,''));field='';if(c==='\n'){rows.push(row);row=[];}}else field+=c;}if(field||row.length){row.push(field.replace(/\r$/,''));rows.push(row);}const keys=rows.shift();return rows.filter(r=>r.some(Boolean)).map(r=>Object.fromEntries(keys.map((k,i)=>[k,r[i]||''])));}
const normal=s=>String(s||'').normalize('NFKC').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-96)).replace(/[\s。？！?!～~….、,・]/gu,'');
function variants(s){
 let result=String(s||'').normalize('NFKC').split(/[／/]/u);
 while(result.some(x=>/\[[^\]]*\]/.test(x)))result=result.flatMap(x=>{const m=x.match(/\[([^\]]*)\]/);return m?[x.replace(m[0],''),x.replace(m[0],m[1])]:[x];});
 result=result.flatMap(x=>{const m=x.match(/^(.*?)\(([^)]+)\)$/u);if(!m)return [x];return /^[\p{Script=Hiragana}ー～….]+$/u.test(m[2])?[m[1],m[2]]:[m[1]];});
 return [...new Set(result.map(normal))];
}
function importRows(words,categories,rows){
 const report={added:0,updated:0,unchanged:0,unresolved:0,records:[]};
 for(const [index,row] of rows.entries()){
  const chapters=row.chapter.split(',').map(Number).filter(n=>n>=1&&n<=6),forms=variants(row.japanese),kanji=variants(row.kanji).filter(Boolean);
  const key=crypto.createHash('sha256').update(JSON.stringify([row.japanese,row.kanji,row.category])).digest('hex').slice(0,16);
  let matches=words.filter(w=>w.csvKeys?.includes(key));
  if(!matches.length){
   const sameReading=words.filter(w=>forms.includes(normal(w.jp)));
   matches=sameReading.filter(w=>!kanji.length||w.c==='X'||!w.c||kanji.includes(normal(w.c)));
   if(!matches.length&&sameReading.length){report.unresolved++;report.records.push({row:index+2,status:'unresolved',source:row,reason:'Japanese reading matches but kanji conflicts; meaning is unavailable',candidates:sameReading.map(w=>w.id)});continue;}
  }
  // Optional printed forms may legitimately cover several existing, separately taught forms.
  // Multiple records with the SAME reading may be distinct senses: never guess their meaning.
  const duplicateSense=matches.some((w,i)=>matches.slice(i+1).some(x=>normal(x.jp)===normal(w.jp)));
  if(duplicateSense||!chapters.length||!row.japanese){report.unresolved++;report.records.push({row:index+2,status:'unresolved',source:row,reason:'Ambiguous sense or invalid source data',candidates:matches.map(w=>w.id)});continue;}
  const added=!matches.length;
  if(added){const plain=row.japanese.replace(/[。？！?!]/g,'').trim(),reading=/^[\p{Script=Hiragana}\p{Script=Katakana}ー\s]+$/u.test(plain)?plain.replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-96)).replace(/\s/g,''):'';
   const sourceForm=normal(row.japanese);
   const knownCategories={demonstratives:['ここ','そこ','あそこ','こちら','そちら','あちら'],questions:['どこ','どちら','いつ','いくら','いくつ','なん','なに','なんですか','なんようび','なんじ','なんがつ','なんにち'],food:['あさごはん','ひるごはん','ばんごはん','ごはん','おちゃ','こうちゃ','おさけ','さけ','ぎゅうにゅう','ミルク','みず','ジュース','ビール','ワイン','さかな','にく','たまご','やさい','くだもの','パン'],people:['かれ','かのじょ','かぞく','ともだち'],places:['うけつけ','うりば','えき','おてあらい','かいぎしつ','かいしゃ','きょうしつ','ぎんこう','がっこう','じむしょ','しょくどう','スーパー','デパート','としょかん','トイレ','ゆうびんきょく','ロビー']};
   const category=Object.entries(knownCategories).find(([,forms])=>forms.some(f=>normal(f)===sourceForm))?.[0]||(row.category==='Expression'?'source-expressions':'source-vocabulary');
   const w={id:`csv-${key}`,ch:chapters[0],chapters,group:row.category==='Expression'?'phrases':'core',jp:row.japanese,kana:reading,c:row.kanji||'X',en:'',zh:'',page:row.page?Number(row.page):null,note:'',category};words.push(w);matches=[w];
  }
  let changed=added;
  for(const w of matches){const before=JSON.stringify(w);w.chapters=[...new Set([...(w.chapters||[w.ch]),...chapters])].sort();w.csvKeys=[...new Set([...(w.csvKeys||[]),key])];w.sources||=[];if(!w.sources.some(s=>s.key===key))w.sources.push({key,...row});
   // A supplied nonempty kanji form may fill a genuinely missing field; never replace an existing form.
   if(kanji.length===1&&(!w.c||w.c==='X')&&/\p{Script=Han}/u.test(row.kanji)&&forms.length===1)w.c=row.kanji;
   w.reviewIssues=[...new Set([...(w.reviewIssues||[]),...(!w.en&&!w.zh?['Meaning and translations absent from CSV']:[]),...(!w.kana?['Reading requires review (annotated or mixed form)']:[])])];
   changed ||= before!==JSON.stringify(w);
   if(w.category){let cat=categories.find(c=>c.id===w.category);if(!cat){cat={id:w.category,label:w.category==='source-expressions'?'Expressions':'Vocabulary',description:'Imported content awaiting meaning review.',ids:[]};categories.push(cat);}if(!cat.ids.includes(w.id))cat.ids.push(w.id);}
  }
  const status=added?'added':changed?'updated':'unchanged';report[status]++;report.records.push({row:index+2,status,source:row,ids:matches.map(w=>w.id),issues:matches.flatMap(w=>w.reviewIssues||[])});
 }
 report.needsReview=report.records.filter(r=>r.status==='unresolved'||r.issues?.length).length;
 return report;
}
const marker='\n// BEGIN CHAPTER CSV IMPORT\n';
function main(){const path='dist/csv-content.js',base=fs.readFileSync('dist/content.js','utf8')+'\n'+fs.readFileSync('dist/chapter-content.js','utf8'),current=fs.existsSync(path)?fs.readFileSync(path,'utf8'):'',ctx=vm.createContext({});vm.runInContext(base+'\n'+current,ctx);const words=vm.runInContext('WORDS',ctx),categories=vm.runInContext('VOCAB_CATEGORIES',ctx),rows=parseCSV(fs.readFileSync(process.argv[2]||'data/chapters_1_6.csv','utf8'));const report=importRows(words,categories,rows),repeat=importRows(words,categories,rows);if(repeat.added||repeat.updated||repeat.unresolved!==report.unresolved)throw Error('Import is not repeatable');
 const original=vm.createContext({});vm.runInContext(base,original);const originalIds=new Set(vm.runInContext('WORDS.map(w=>w.id)',original));
 const payload=JSON.stringify(words,null,2),cats=JSON.stringify(categories,null,2);
 fs.writeFileSync(path,`// Generated by scripts/import-chapters.cjs; source spelling is retained in sources.\nconst CHAPTER_IMPORT_WORDS=${payload};\nfor(const incoming of CHAPTER_IMPORT_WORDS){const existing=WORDS.find(w=>w.id===incoming.id);if(existing)Object.assign(existing,incoming);else WORDS.push(incoming);}\nconst CHAPTER_IMPORT_CATEGORIES=${cats};\nfor(const incoming of CHAPTER_IMPORT_CATEGORIES){const existing=VOCAB_CATEGORIES.find(c=>c.id===incoming.id);if(existing)Object.assign(existing,incoming);else VOCAB_CATEGORIES.push(incoming);}\nVOCAB_CATEGORY_BY_WORD.clear();for(const category of VOCAB_CATEGORIES)for(const id of category.ids)VOCAB_CATEGORY_BY_WORD.set(id,category);\nconst EXPRESSIONS=WORDS.filter(w=>w.group==='phrases'||w.sources?.some(s=>s.category==='Expression'));\nconst wordGameReady=w=>!!w?.kana&&!!w.en&&!!w.zh&&!w.reviewIssues?.length;\n`);
 fs.writeFileSync('reports/chapter-import-latest.json',JSON.stringify({...report,sourceRows:rows.length,totalWords:words.length,existingIdsPreserved:[...originalIds].every(id=>words.some(w=>w.id===id)),repeat:{added:repeat.added,updated:repeat.updated,unchanged:repeat.unchanged,unresolved:repeat.unresolved}},null,2)+'\n');if(!fs.existsSync('reports/chapter-import.json'))fs.copyFileSync('reports/chapter-import-latest.json','reports/chapter-import.json');console.log(JSON.stringify({added:report.added,updated:report.updated,unchanged:report.unchanged,unresolved:report.unresolved,needsReview:report.needsReview,totalWords:words.length,repeat:report.records.length}));}
if(require.main===module)main();module.exports={parseCSV,normal,variants,importRows};
