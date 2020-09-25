const {spawn} = require('child_process');
const {spinners} =require('./cli');
const {projectName} = require('import-cwd')('./config.json');

function uikitInit(cb) {
    var process = spawn(`cd ${projectName} && git clone https://github.com/AgoraIO-Community/ReactNative-UIKit.git agora-rn-uikit && cd agora-rn-uikit && git checkout "app-builder"`,{shell: true});
    spinners.add('uikit',{text:"Downloading & configuring uikit"});
    process.on('exit', () => {
        spinners.succeed('uikit');
        cb();
    })
    // process.stdout.on('data', (data) => {
    //   console.log(`stdout: ${data}`);
    // });
}

// create(()=>console.log("finished"),'proj');

module.exports.initUIKit = uikitInit;