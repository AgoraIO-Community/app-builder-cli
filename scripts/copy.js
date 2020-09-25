const fs = require('fs').promises
const {spinners} =require('./cli');
const {projectName, logoRect, logoSquare} = require('../config.json');



async function copy() {
  spinners.add('copy',{text:"Copying image assets"});
  try {
    await fs.mkdir(`${projectName}/build`, {recursive:true});
    // if(logoRect!== ''){
    //   var rectCopy = fs.copyFile(logoRect, `${projectName}/build/${logoRect}`);
    // }
    if(logoSquare!== ''){
      var squareCopy = fs.copyFile(logoSquare, `${projectName}/build/icon.png`);
      await squareCopy;
    }
    // await Promise.all([rectCopy, squareCopy]);
    spinners.succeed('copy');
    return;
  }
  catch(e){
    console.error(e);
  }
  return;
}

module.exports.copyAssets = copy;
