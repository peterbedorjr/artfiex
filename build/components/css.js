const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ResponsivePlugin = require('responsive-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
    new ResponsivePlugin({
        breakpoints: {
            mobileLandscape: 480,
            tablet: 768,
            desktop: 1024,
            desktop2: 1280,
            desktop3: 1440,
        },
        offset: 25,
        output: 'source/styles/responsive',
    }),
];

if (isProduction) {
    plugins.push(new MiniCssExtractPlugin({
        filename: 'assets/styles/[name].[contenthash:8].css',
        chunkFilename: 'assets/styles/[name].[contenthash:8].css',
    }));
}

const cssLoader = {
    loader: 'css-loader',
    options: {
        importLoaders: 1 + 1,
        esModule: false,
    },
};

function createCSSRule(test = /\.s[ac]ss$/i, loader, loaderOptions) {
    const loaders = [cssLoader, 'postcss-loader'];

    if (isProduction) {
        loaders.unshift({
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '/',
            },
        });
    } else {
        loaders.unshift('vue-style-loader');
    }

    if (loader) {
        loaders.push({ loader, options: loaderOptions });
    }

    return { test, use: loaders };
}


module.exports = {
    module: {
        rules: [
            createCSSRule(/\.css$/),
            createCSSRule(/\.p(ost)?css$/),
            createCSSRule(/\.scss$/, 'sass-loader'),
        ],
    },
    plugins,
};
