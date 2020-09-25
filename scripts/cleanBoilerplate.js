const del = require('del');
const {projectName} = require('import-cwd')('./config.json')
const {spinners} =require('./cli');

const dels=[
    'App.tsx',
    'babel.config.js',
    'index.js',
    '__tests__'
]

function cleanBoilerplate() {
  spinners.add('cleanBoiler', {text:'Cleaning the boilerplate'});
  return del(dels.map(file =>`${projectName}/${file}`)).then(()=>{spinners.succeed('cleanBoiler')});
}

module.exports.cleanBoilerplate = cleanBoilerplate;
