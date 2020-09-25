const {spawn} = require('child_process');
const {projectName} = require('../config.json')
const {spinners} =require('./cli');

const init = function(cb){
    var process = spawn(`cd ${projectName} && git init && git add . && git commit -m "init" && `,{shell: true});
    spinners.add('initBoiler', {text:'initializing git in boilerplate'});
    process.on('exit', () => {
        spinners.succeed('initBoiler');
        cb();
    })
    process.on('data',(err)=>{
        console.log(err);
    })
}

module.exports.initCode = init;