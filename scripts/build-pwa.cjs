'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist');
function files(dir,prefix=''){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?files(path.join(dir,entry.name),prefix+entry.name+'/'):prefix+entry.name).filter(file=>file!=='sw.js').sort();
}
function generate(){
  const assets=files(dist),template=fs.readFileSync(path.join(__dirname,'service-worker.js'),'utf8'),hash=crypto.createHash('sha256').update(template);
  for(const asset of assets)hash.update(asset).update('\0').update(fs.readFileSync(path.join(dist,asset)));
  return template.replace('__CACHE_REVISION__',hash.digest('hex').slice(0,20)).replace('__PRECACHE_ASSETS__',JSON.stringify(assets));
}
if(require.main===module){fs.writeFileSync(path.join(dist,'sw.js'),generate());console.log('Built PWA service worker and offline asset list.');}
module.exports={generate,files};
