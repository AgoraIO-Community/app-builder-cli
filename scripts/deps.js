const fs = require('fs').promises;
const path = require('path');
const {projectName} = require('import-cwd')('./config.json');
const {deps,devDeps, scripts} =require('./deps.json')
const JSON_PATH = path.join(process.cwd(), projectName ,'package.json');
const {spinners} = require('./cli');

async function packageJson() {
  spinners.add('package', {text:'Adding scripts and dependencies to package.json'});
  let configure = true;
  try{
      await fs.access(`${projectName}/package.json`);
  }
  catch(e){
      spinners.fail('package', { text: 'couldn\'t find a package.json to configure'});
      configure = false;
  }

  try{
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
  }
  catch(e){
    spinners.fail('package', { text: 'couldn\'t configure package.json'});
  }
  return;
}

module.exports.package = packageJson;
