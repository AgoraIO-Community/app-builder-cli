const {spawn} = require('./spawn');
const {spinners} =require('./cli');
const {projectName} = require('import-cwd')('./config.json');
const fs = require('fs');

function installDeps(cb) {
  var process = spawn("cd",[projectName,"&&","npm","install"]);
  spinners.add('installDeps',{text:"Installing dependencies"});
  process.on('exit', () => {
    fs.promises.access(`${projectName}/node_modules`)
    .then(()=>{
      spinners.succeed('installDeps');
    })
    .catch(e=>{
      spinners.fail('installDeps', { text: 'Dependencies were not installed succesfully'});
    })
    .finally(()=>{
      cb();
    })
  });
  // process.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  // });
}

// create(()=>console.log("finished"),'proj');

module.exports.installDeps = installDeps;
