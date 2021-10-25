const EslintPlugin = require('eslint-webpack-plugin');

const config = {
    formatter: 'codeframe',
};

module.exports = {
    plugins: [
        new EslintPlugin(config),
    ],
};
