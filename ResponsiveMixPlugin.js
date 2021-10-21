const mix = require('laravel-mix');
const ResponsiveWebpackPlugin = require('./ResponsiveWebpackPlugin');

class ResponsiveMixPlugin {
    name() {
        return ['responsive', 'breakpoints'];
    }

    register(config) {
        this.config = config;
    }

    webpackPlugins() {
        return new ResponsiveWebpackPlugin(this.config);
    }
}

mix.extend('breakpoints', new ResponsiveMixPlugin());
