const parts = require("./webpack.parts.js");
const merge = require('webpack-merge');

module.exports = merge([
    parts.loadCSS(),
    parts.loadScss(),
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT,
    }),
])
