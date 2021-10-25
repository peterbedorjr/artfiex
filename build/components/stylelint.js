const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    plugins: [
        new StylelintPlugin({
            fix: process.env.FIX_STYLES === true,
            formatter: require('stylelint-codeframe-formatter'),
        }),
    ],
};
