const HtmlWebpackPlugin = require('html-webpack-plugin');
const parts = require('./webpack/webpack.parts.js');
const merge = require('webpack-merge');
const productionConfig = require('./webpack/webpack.config.prod.js')
const developmentConfig = require('./webpack/webpack.config.dev.js')
const PATHS = parts.PATHS;

const commonConfig = merge([
    {
        entry: {
            app: PATHS.app,
        },
        output: {
            path: PATHS.build,
            filename: '[name].js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demo',
            }),
        ],
    },
    parts.lintJavaScript({ include: PATHS.app }),
    parts.loadJavaScript({ include: PATHS.app }),
]);


module.exports = PATHS;
module.exports = (env) => {
    if(env === 'production') return merge(commonConfig, productionConfig);
    return merge(commonConfig, developmentConfig);
};
