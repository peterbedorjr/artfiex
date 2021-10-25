const CopyPlugin = require('copy-webpack-plugin');

const filter = (path) => {
    return ! path.includes('.DS_Store');
};

module.exports = {
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'source/fonts', to: 'assets/fonts', filter },
                { from: 'source/images', to: 'assets/images', filter },
                { from: 'source/static', to: '', filter },
            ],
        }),
    ],
};
