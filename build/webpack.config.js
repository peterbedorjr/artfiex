const { merge } = require('webpack-merge');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const args = yargs(hideBin(process.argv)).argv;

const components = [
    'clean',
    'base',
    'css',
    'stylelint', // TODO
    'javascript',
    'vue',
    'eslint',
    // 'favicons',
    'html',
    'copy',
    'devServer',
];

if (process.env.NODE_ENV === 'production') {
    components.push('production');
}

/* eslint-disable-next-line global-require */
module.exports = components.reduce((config, component) => merge(config, require(`./components/${component}`)), {});

