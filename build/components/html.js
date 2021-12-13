const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new HtmlPlugin({
            filename: 'index.html',
            template: 'source/index.html',
        }),
    ],
};
