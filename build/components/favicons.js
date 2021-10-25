const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
    plugins: [
        new FaviconsWebpackPlugin({
            logo: './source/images/logo.svg',
            // cache: true,
            prefix: '/',
            favicons: {
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    coast: true,
                    favicons: true,
                    firefox: true,
                    windows: true,
                    yandex: true,
                },
            },
        }),
    ],
};
