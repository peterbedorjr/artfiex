const { merge } = require('webpack-merge');

const components = [
    'clean',
    'base',
    'css',
    // 'stylelint',
    'javascript',
    'eslint',
    'favicons',
    'html',
    'copy',
    'devServer',
];

if (process.env.NODE_ENV === 'production') {
    components.push('production');
}

/**
 * Webpack Config
 * @type {{}}
 */
let config = {};

components.forEach((component) => {
    config = merge(config, require(`./components/${component}`));
});

module.exports = config;
