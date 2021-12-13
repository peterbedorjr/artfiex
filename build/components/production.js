const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    plugins: [
        new webpack.ids.HashedModuleIdsPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        // turn off flags with small gains to speed up minification
                        arrows: false,
                        collapse_vars: false, // 0.3kb
                        comparisons: false,
                        computed_props: false,
                        hoist_funs: false,
                        hoist_props: false,
                        hoist_vars: false,
                        inline: false,
                        loops: false,
                        negate_iife: false,
                        properties: false,
                        reduce_funcs: false,
                        reduce_vars: false,
                        switches: false,
                        toplevel: false,
                        typeofs: false,
                        booleans: true,
                        if_return: true,
                        sequences: true,
                        unused: true,

                        // required features to drop conditional branches
                        conditionals: true,
                        dead_code: true,
                        evaluate: true,
                    },
                    mangle: {
                        safari10: true,
                    },
                },
                parallel: true,
                extractComments: {
                    condition: /^\**!|@preserve|@license|@cc_on/i,
                    filename: (file) => {
                        return file.filename.replace(/\.(\w+)($|\?)/, '.$1.LICENSE.txt$2');
                    },
                    banner: (licenseFile) => {
                        return `License information can be found in ${licenseFile}`;
                    },
                },
            }),
        ],
    },
};
