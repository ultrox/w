const parts = require('./webpack.parts.js');
const merge = require('webpack-merge');
const PATHS = parts.PATHS;

module.exports = merge([
    // https://survivejs.com/webpack/optimizing/environment-variables/
    parts.setFreeVariable(
        'process.env.NODE_ENV',
        'prod'
    ),
    parts.extractCSS({use: [parts.modularCss, 'sass-loader']}),
    parts.generateSourceMaps({ type: 'source-map' }),
    parts.minifyJavaScript(),
    parts.clean(PATHS.build),
]);
