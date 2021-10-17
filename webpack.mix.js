const mix = require('laravel-mix');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');


mix.options({
    manifest: false,
});

mix.setPublicPath('public');

mix.js('source/scripts/app.js', '/assets/scripts');

mix.sass('source/styles/app.scss', '/assets/styles')

// Adds double slashes
mix.override(config => {
    config.entry = Object.keys(config.entry).reduce((acc, key) => {
        acc[key.replace(/^\//, '')] = config.entry[key];

        return acc;
    }, {});
});

mix.webpackConfig({
    plugins: [
        new HtmlPlugin({
            template: 'source/index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'source/fonts', to: 'assets/fonts' },
                { from: 'source/images/!(icons)', to: 'assets/images' },
                { from: 'source/images/icons', to: '' },
            ],
        }),
        // new ImageMinimizerPlugin({
        //     minify: ImageMinimizerPlugin.squooshMinify,
        //     minimizerOptions: {
        //         encodeOptions: {
        //             mozjpeg: {
        //                 // That setting might be close to lossless, but it’s not guaranteed
        //                 // https://github.com/GoogleChromeLabs/squoosh/issues/85
        //                 quality: 100,
        //             },
        //             webp: {
        //                 lossless: 1,
        //             },
        //             avif: {
        //                 // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
        //                 cqLevel: 0,
        //             },
        //         },
        //     },
        // }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                '!.htaccess',
                '!robots.txt',
                '!browserconfig.xml',
                '!favicon.ico',
                '!*.png',
                '!site.webmanifest',
            ],
        }),
        new ESLintPlugin({
            fix: true,
            formatter: require('eslint/lib/cli-engine/formatters/codeframe'),
        }),
        // new StylelintPlugin({
        //     formatter: require('stylelint-codeframe-formatter'),
        // }),
    ],
});

if (! mix.inProduction()) {
    mix.browserSync({ server: 'public', proxy: null });
} else {
    mix.webpackConfig({
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
        ],
    });
}

module.exports = mix;
