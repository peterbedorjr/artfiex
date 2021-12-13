const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    plugins: [
        new StylelintPlugin({
            fix: process.env.FIX_STYLES === true,
            // TODO: Codeframe formatter is slow?
            // formatter: require('stylelint-codeframe-formatter'),
        }),
    ],
};
