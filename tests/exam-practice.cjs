const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c=vm.createContext({document:{addEventListener(){}}});
const run=s=>vm.runInContext(s,c);
for(const name of ['content','chapter-content','csv-content'])run(fs.readFileSync('dist/'+name+'.js','utf8'));
const before=JSON.parse(run('JSON.stringify(WORDS)'));
for(const name of ['content-repairs','activities','chapter-dialogues','dialogue-content','i18n','numbers','exam-practice'])run(fs.readFileSync('dist/'+name+'.js','utf8'));
const after=JSON.parse(run('JSON.stringify(WORDS)'));
assert.deepEqual(after.map(w=>[w.id,w.jp,w.kana,w.c,w.chapters]),before.map(w=>[w.id,w.jp,w.kana,w.c,w.chapters]));
assert.equal(run('WORDS.filter(wordGameReady).length'),328);
assert.equal(run('WORDS.filter(w=>!wordGameReady(w)).length'),10);
const questions=JSON.parse(run('JSON.stringify(EXAM_BANK)'));
for(const q of questions){
 assert.ok(q.sourceRefs.length);assert.equal(q.alternatives.length,0);
 assert.ok(run(`exGrade(EXAM_BANK.find(q=>q.id===${JSON.stringify(q.id)}),${JSON.stringify(q.answers)}).every(Boolean)`));
 for(let i=0;i<q.answers.length;i++){
  const bad=[...q.answers];bad[i]+='X';assert.equal(run(`exGrade(EXAM_BANK.find(q=>q.id===${JSON.stringify(q.id)}),${JSON.stringify(bad)})[${i}]`),false);
 }
 if(q.useOnce)assert.equal(new Set(q.answers).size,q.answers.length);
}
assert.equal(run("kanaSlots('しゃっちょう').join('|')"),'しゃ|っ|ちょ|う');
assert.equal(run("exNorm('しや')===exNorm('しゃ')"),false);
assert.equal(run("exNorm('こー')===exNorm('こう')"),false);
// Every target phrase and Japanese frame segment is evidenced by the referenced source text.
for(const q of questions){
 const refs=q.sourceRefs.map(r=>run(`JSON.stringify((${r.dataset==='sentences'?'SENTENCES':r.dataset==='dialogues'?'dialogueSources':r.dataset==='numbers'?'NUMBER_QUESTIONS':'WORDS'}).find(x=>x.id===${JSON.stringify(r.id)}))`)).join('');
 const chars=new Set(refs);
 for(const text of [...q.parts,...q.answers])for(const char of text)if(/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー]/u.test(char))assert.ok(chars.has(char),q.id+' unsupported '+char);
}
// Exact answer boundaries: a printed suffix cannot be repeated inside a WH blank.
for(const q of questions.filter(q=>q.skill==='whWords'&&!q.whole)){
 const bad=[q.answers[0]+q.parts[1]];
 if(q.parts[1])assert.equal(run(`exGrade(EXAM_BANK.find(q=>q.id===${JSON.stringify(q.id)}),${JSON.stringify(bad)})[0]`),false);
}
for(const q of questions.filter(q=>q.kind==='order')){
 assert.equal(q.tokens.join(''),q.answers[0]);
 if(new Set(q.tokens).size<q.tokens.length){const unique=[...new Set(q.tokens)].join('');assert.notEqual(unique,q.answers[0]);}
}
assert.ok(questions.some(q=>q.schedule));assert.ok(questions.some(q=>q.pictures?.length===3));
console.log(`PASS: ${questions.length} sourced questions, immutable Japanese/IDs/chapters, readiness, exact boundaries, strict alternatives, individual scoring, duplicate tokens and kana slots.`);
