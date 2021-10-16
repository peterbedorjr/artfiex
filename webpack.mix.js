const mix = require('laravel-mix');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


mix.options({ manifest: false });

mix.setPublicPath('public');

mix.js('source/scripts/app.js', '/assets/scripts');

mix.sass('source/styles/app.scss', '/assets/styles');

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
        new ImageMinimizerPlugin({
            minimizerOptions: {
                // Lossless optimization with custom option
                // Feel free to experiment with options for better result for you
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    // Svgo configuration here https://github.com/svg/svgo#configuration
                    // ['svgo', {
                    //     plugins: {
                    //         name: 'preset-default',
                    //         params: {
                    //             overrides: {
                    //                 // customize plugin options
                    //                 convertShapeToPath: { convertArcs: true },
                    //                 // disable plugins
                    //                 convertPathData: false
                    //             },
                    //         },
                    //     },
                    // }],
                ],
            },
        }),
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