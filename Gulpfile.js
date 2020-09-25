const {series, parallel} = require('gulp')
const {create} = require('./scripts/create');
const {clean} = require('./scripts/clean');
const {package} =require('./scripts/deps');
const {installDeps} = require('./scripts/installDeps');
const {copyAssets} = require('./scripts/copy');
const {backend} = require('./scripts/backend');
const {generateConfig} = require('./scripts/genConfigs');
const {cleanBoilerplate} = require('./scripts/cleanBoilerplate');
const {initCode} = require('./scripts/initCode');


module.exports.default = series(
    clean,
    parallel(
        // frontend
        create, // create a boilerplate
        // backend
        backend    
    ),
    generateConfig,
    series(
        parallel(
            series( // initialize repository with Code
                cleanBoilerplate,
                initCode
            ),
            series( // install extra dependencies
                package,
                installDeps
            ),
            copyAssets // copy image assets
        )
    ),
);
// module.exports.default = initCode;
