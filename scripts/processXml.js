const { convert } = require('xmlbuilder2');
const fs =require('fs').promises;
const {projectName, frontEndURL} = require('import-cwd')('./config.json');
const path = require('path');
const {spinners} =require('./cli');

async function process(){
  spinners.add('processManifest',{text:"Processing Android Manifest"});
  const deep ={
      "action": {
        "@android:name": "android.intent.action.VIEW"
      },
      "category": [
        {
          "@android:name": "android.intent.category.DEFAULT"
        },
        {
          "@android:name": "android.intent.category.BROWSABLE"
        }
      ],
      "data": {
        "@android:scheme": projectName,
        "@android:host": "my-host",
        "@android:pathPrefix": ""
      }
  };
  const universal = {
    "action": {
      "@android:name": "android.intent.action.VIEW"
    },
    "category": [
      {
        "@android:name": "android.intent.category.DEFAULT"
      },
      {
        "@android:name": "android.intent.category.BROWSABLE"
      }
    ],
    "data": {
      "@android:scheme": "https",
      "@android:host": frontEndURL,
      "@android:pathPrefix": ""
    }
  }
  const xml = await fs.readFile(`${projectName}/android/app/src/main/AndroidManifest.xml`,{encoding: 'utf8'});
  let doc = convert(xml, { format: "object" });
  const intent = doc.manifest.application.activity[0]["intent-filter"]
  doc.manifest.application.activity[0]["intent-filter"]=[
    intent,
    deep,
    universal
  ]
  const newXml = convert(doc,{
    format:"xml",
    headless:true,
    prettyPrint:true,
  });
  await fs.writeFile(`${projectName}/android/app/src/main/AndroidManifest.xml`,newXml, {encoding: "utf8"});
  spinners.succeed('processManifest');
}

module.exports.processXml = process;
