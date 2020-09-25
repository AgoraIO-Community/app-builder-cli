const {spawn} = require('child_process');
const {spinners} =require('./cli');
const {projectName} = require('import-cwd')('./config.json');

function syncSource(cb) {
  spinners.add('updateFrontend',{text:"Fetching the latest front-end source code"});
  var process = spawn(`cd ${projectName} && git fetch agora --force && git rebase agora/dist`,{shell: true});
  process.on('exit', () => {
    spinners.succeed('updateFrontend');
    cb();
  })
//   process.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
//   });
}

// create(()=>console.log("finished"),'proj');

module.exports.syncSource = syncSource;
