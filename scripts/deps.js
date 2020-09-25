const fs = require('fs').promises;
const path = require('path');
const {projectName} = require('../config.json');
const {deps,devDeps, scripts} =require('./deps.json')
const JSON_PATH = path.join(__dirname, '../', projectName ,'package.json');
const {spinners} = require('./cli');

async function packageJson() {
  spinners.add('package', {text:'Adding scripts and dependencies to package.json'});
  let data = JSON.parse(
    await fs.readFile(JSON_PATH),
  );

  let {
    dependencies,
    devDependencies
  } = data;


  let newPackage = {
    ...data,
    scripts,
    dependencies: {
      ...dependencies,
      ...deps
    },
    devDependencies:{
      ...devDependencies,
      ...devDeps
    }
  };
  await fs.writeFile(
    JSON_PATH,
    JSON.stringify(newPackage, null, 2),
  );
  spinners.succeed('package');
  return;
}

module.exports.package = packageJson;
