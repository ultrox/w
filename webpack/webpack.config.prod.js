const parts = require('./webpack.parts.js');
const merge = require('webpack-merge');

module.exports = merge([
    // https://survivejs.com/webpack/optimizing/environment-variables/
    parts.setFreeVariable(
        'process.env.NODE_ENV',
        'prod'
    ),
    parts.extractCSS({use: [parts.modularCss, 'sass-loader']}),
    parts.generateSourceMaps({ type: 'source-map' }),
]);
