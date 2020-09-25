const {spawn} = require('child_process');
const {spinners} =require('./cli');
const {projectName, logoSquare} = require('import-cwd')('./config.json');

function iosIcons(cb) {
    if(logoSquare === ''){
        cb();
    }
    else{
        var process = spawn(`cd ${projectName} && npm run icons:ios`,{shell: true});
        spinners.add('iosIcon',{text:"configuring icons for IOS"});
        process.on('exit', () => {
            spinners.succeed('iosIcon');
            cb();
        })
    }
    // process.stdout.on('data', (data) => {
    //   console.log(`stdout: ${data}`);
    // });
}

// create(()=>console.log("finished"),'proj');

module.exports.iosIcons = iosIcons;