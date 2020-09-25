const {spawn} = require('child_process');
const {spinners} =require('./cli');
const {projectName} = require('import-cwd')('./config.json');

function updateGitIgnore(cb) {
  spinners.add('update',{text:"Setting up gitignore"});
  var process = spawn(`cd ${projectName} && git checkout --ours .gitignore && git add .gitignore && git rebase --continue`,{shell: true});
  process.on('exit', () => {
    spinners.succeed('update');
    cb();
  })
//   process.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
//   });
}

// create(()=>console.log("finished"),'proj');

module.exports.updateGitIgnore = updateGitIgnore;
