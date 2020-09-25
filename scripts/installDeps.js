const {spawn} = require('child_process');
const {spinners} =require('./cli');
const {projectName} = require('../config.json');

function installDeps(cb) {
  var process = spawn(`cd ${projectName} && npm install`,{shell: true});
  spinners.add('installDeps',{text:"Installing dependencies"});
  process.on('exit', () => {
    spinners.succeed('installDeps');
    cb();
  })
  // process.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  // });
}

// create(()=>console.log("finished"),'proj');

module.exports.installDeps = installDeps;
