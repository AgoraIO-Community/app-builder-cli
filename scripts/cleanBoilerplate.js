const del = require('del');
const {projectName} = require('../config.json')
const {spinners} =require('./cli');

const dels=[
    'App.tsx',
    'babel.config.js',
    'index.js',
]

function cleanBoilerplate() {
  spinners.add('cleanBoiler', {text:'Cleaning the boilerplate'});
  return del(dels.map(file =>`${projectName}/${file}`)).then(()=>{spinners.succeed('cleanBoiler')});
}

module.exports.cleanBoilerplate = cleanBoilerplate;
