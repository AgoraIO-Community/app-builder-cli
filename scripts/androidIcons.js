const {spawn} = require('child_process');
const {spinners} =require('./cli');
const {projectName, logoSquare} = require('import-cwd')('./config.json');

function androidIcons(cb) {
    if(logoSquare=== ''){
        cb();
    }
    else{
        var process = spawn(`cd ${projectName} && npm run icons:android`,{shell: true});
        spinners.add('androidIcon',{text:"configuring icons for Android"});
        process.on('exit', () => {
            spinners.succeed('androidIcon');
            cb();
        })
    }
    // process.stdout.on('data', (data) => {
    //   console.log(`stdout: ${data}`);
    // });
}

// create(()=>console.log("finished"),'proj');

module.exports.androidIcons = androidIcons;