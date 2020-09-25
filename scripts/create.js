const {spawn} = require('child_process');
const {spinners} =require('./cli');
const {projectName, displayName} = require('../config.json');

function create(cb) {
  var process = spawn(`npx react-native init ${projectName} --title \"${displayName}\" --skip-install --template react-native-template-typescript`, {shell: true});
  spinners.add('create',{text:"Creating front-end boilerplate"});
  process.on('exit', () => {
    spinners.succeed('create');
    cb();
  })
  // process.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  // });

}

// create(()=>console.log("finished"),'proj');

module.exports.create = create;
