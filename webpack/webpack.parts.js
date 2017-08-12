const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

exports.setFreeVariable = (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env),
        ],
    };
};
exports.generateSourceMaps = ({ type }) => ({
    devtool: type,
});
// https://webpack.js.org/configuration/dev-server/
exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        overlay: {
            errors: true,
            warnings: true,
        },
    },
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                enforce: 'pre',
                loader: 'eslint-loader',
                options,
            },
        ],
    },
});

const modularCss = {
    loader: 'css-loader',
    options: { modules: true },
};

exports.modularCss = modularCss;
exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,

                use: ['style-loader', modularCss],

            },
        ],
    },
});

exports.loadScss = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
});

exports.extractCSS = ({ include, exclude, use }) => {
    // Output extracted CSS to a file
    const plugin = new ExtractTextPlugin({
        filename: '[name].css',
    });

    return {
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    include,
                    exclude,

                    use: plugin.extract({
                        use,
                        fallback: 'style-loader',
                    }),
                },
            ],
        },
        plugins: [ plugin ],
    };
};

exports.loadJavaScript = ({ include, exclude }) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                loader: 'babel-loader',
                options: {
                    // Enable caching for improved performance during
                    // development.
                    // It uses default OS directory by default. If you need
                    // something more custom, pass a path to it.
                    // I.e., { cacheDirectory: '<path>' }
                    presets: [ 
                        [ 'es2015', { modules: false } ],
                    ], 
                    cacheDirectory: true,
                },
            },
        ],
    },
});


exports.minifyJavaScript = () => ({
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true,
            compress: true,
            mangle: true,
            compressor: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
            },
            output: {
                comments: false,
                beautify: false,
            },
        }),
    ],
});
