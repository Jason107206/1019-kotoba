// Render installed-app icons from assets/app-icon.png. No remote resources.
const {spawnSync}=require('node:child_process'),path=require('node:path');
const result=spawnSync('python3',[path.join(__dirname,'build-lulu-icons.py')],{stdio:'inherit'});
if(result.status)process.exit(result.status||1);
