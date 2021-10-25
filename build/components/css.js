const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ResponsivePlugin = require('responsive-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                    // TODO
                    // {
                    //     loader: 'sass-resources-loader',
                    //     options: {
                    //         resources: [],
                    //     },
                    // },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/styles/app.min.css',
            chunkFilename: '[id].css',
        }),
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
    ],
};
