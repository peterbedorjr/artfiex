const WebpackBar = require('webpackbar');
const path = require('path');

const env = process.env.NODE_ENV === undefined
    ? 'production'
    : process.env.NODE_ENV;

module.exports = {
    mode: env,
    // https://webpack.js.org/configuration/stats/#stats-presets
    stats: 'minimal',
    devtool: env === 'production'
        ? 'eval'
        : 'source-map',
    entry: {
        app: './source/scripts/app.js',
    },
    output: {
        path: path.resolve(__dirname, '../../public'),
        filename: 'assets/scripts/[name].[contenthash:8].js',
        chunkFilename: 'assets/scripts/[name].[contenthash:8].js',
        publicPath: '/',
    },
    plugins: [
        new WebpackBar(),
    ],
};
