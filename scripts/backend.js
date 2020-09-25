const {spawn} = require('child_process');
const {spinners} =require('./cli');
const {projectName} = require('../config.json');

function backend(cb) {
  var process = spawn(`git clone https://github.com/samyak-jain/AgoraBackend.git ${projectName}Backend`, {shell: true});
  spinners.add('backend',{text:"Downloading backend"});
  process.on('exit', () => {
    spinners.succeed('backend');
    cb();
  })
  // process.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  // });

}

// create(()=>console.log("finished"),'proj');

module.exports.backend = backend;
