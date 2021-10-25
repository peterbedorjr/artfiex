const WebpackBar = require('webpackbar');
const FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin');
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
        ['assets/scripts/app']: './source/scripts/app.js',
    },
    output: {
        path: path.resolve(__dirname, '../../public'),
        filename: '[name].[contenthash:8].js',
    },
    plugins: [
        new WebpackBar(),
        new FriendlyErrorsPlugin(),
    ],
};
