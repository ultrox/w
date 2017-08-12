const parts = require("./webpack.parts.js");
const merge = require('webpack-merge');

module.exports = merge([
    parts.extractCSS({use: [parts.modularCss, 'sass-loader']})
]);
