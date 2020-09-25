const {spawn} = require('child_process');
const {projectName} = require('import-cwd')('./config.json')
const {spinners} =require('./cli');

const init = function(cb){
    spinners.add('initBoiler', {text:'initializing git in boilerplate'});
    var process = spawn(`cd ${projectName} && git init && git add . && git commit -m "init" && git remote add agora "https://github.com/AgoraIO-Community/app-builder-core.git"`,{shell: true});
    process.on('exit', () => {
        spinners.succeed('initBoiler');
        cb();
    })
    process.on('data',(err)=>{
        console.log(err);
    })
}

module.exports.initCode = init;