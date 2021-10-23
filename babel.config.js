const { browserslist } = require('./package.json');

module.exports = {
    only: ['./source'],
    presets: [
        ['@babel/env', {
            targets: browserslist,
        }],
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        // 'minify-dead-code-elimination', // TODO
        // 'minify-mangle-names',
    ],
}
