const parts = require('./webpack.parts.js');
const merge = require('webpack-merge');

module.exports = merge([
    {
        output: {
            devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
        },
    },
    //https://github.com/webpack/webpack/issues/2478
    parts.generateSourceMaps({ type: 'cheap-module-source-map' }),
    parts.loadCSS(),
    parts.loadScss(),
    parts.devServer({
        //0.0.0.0 allow localnetwork access
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT,
    }),
]);
