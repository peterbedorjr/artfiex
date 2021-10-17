/* eslint-disable */

import { U, _doc } from './variables';
import { $toArray, $isString } from './types';

const loaded = {};
let root = '';

const _load = {
    js(path, conf) {
        return new Promise((resolve, reject) => {
            const js = _doc.createElement('script');
            let ready = false;

            js.async = conf.async === true;
            js.defer = conf.defer === true;
            js.type = 'text/javascript';
            js.src = path;

            js.onerror = function(error) {
                reject(error, js);
            }

            js.onload = js.onreadystatechange = function() {
                if (!ready && (!this.readyState || this.readyState == 'complete')) {
                    loaded[js.src] = js;
                    ready = true;
                    resolve();
                }
            }

            _doc.head.appendChild(js);
        });
    },

    async css(path) {
        return new Promise((resolve, reject) => {
            const link = _doc.createElement('link');

            link.rel = 'stylesheet';
            link.href = path;

            link.addEventListener('load', () => {
                loaded[link.href] = link;
                resolve();
            }, false);

            link.addEventListener('error', (err) => {
                reject(err, link);
            }, false);

            _doc.head.appendChild(link);
        });
    },

    img(path) {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = resolve;
            img.onerror = reject;

            img.src = path;
        });
    },
}

const assets = {
    /**
     * Get current asset root or set with specified value
     *
     * @param {string} [value]
     * @returns {string} root
     */
     root(value) {
        if ($isString(value)) {
            root = value;
        }

        return root;
    },

    /**
     * Load specified assets with set options
     *
     * @param {Object} options
     * @param {boolean} [options.async=false]
     * @param {boolean} [options.cache=false]
     * @param {(Array|string)} [options.styles]
     * @param {(Array|string)} [options.files]
     * @param {(Array|string)} [options.images]
     * @param {(Array|string)} [options.scripts]
     * @param {string} [options.root]
     */
    load(options) {
        const files = $toArray(options.files);
        const root = options.root !== U ? options.root : this.root();
        const js = $toArray(options.scripts);
        const css = $toArray(options.styles);
        const img = $toArray(options.images);
        const assets = {};
        let i = 0;
        let type;

        // Determine file type
        for (; i < files.length; i++) {
            const ext = files[i].split('.').pop().split(/#|\?/)[0];
            type = ext === 'js' || ext === 'css'
                ? ext : /(gif|jpe?g|png|svg|webp)$/i.test(ext)
                    ? 'img' : '';

            if (type) {
                assets[files[i]] = type;
            }
        }

        for (i = 0; i < js.length; i++) {
            assets[js[i]] = 'js';
        }

        for (i = 0; i < css.length; i++) {
            assets[css[i]] = 'css';
        }

        for (i = 0; i < img.length; i++) {
            assets[img[i]] = 'img';
        }

        const promises = [];

        Object.keys(assets).forEach(async (asset) => {
            const noCache = options.cache === false;
            const a = _doc.createElement('a');

            type = assets[asset];

            a.href = (root && /^(https?:)?\/\//i.test(asset) ? '' : root)
                + asset;
            let file = a.href;

            if (! loaded[file] || noCache) {
                if (noCache) {
                    file += (file.indexOf('?') < 0 ? '?' : '&') + Date.now();
                }

                promises.push(_load[type](file, options))
            } else {
                promises.push(new Promise());
            }
        });

        return Promise.all(promises);
    },

    /**
     * Remove one or more files from the DOM
     *
     * @param {(Array|string)} f
     * @param {string} [root='']
     */
     remove(f, root = '') {
        const files = $toArray(f);

        const a = _doc.createElement('a');
        let i = 0;

        for (; i < files.length; i++) {
            let src = root + files[i];
            a.href = src;
            src = a.href;

            let el = loaded[src];

            if (el !== U) {
                el.parentNode.removeChild(el);
                el = null;
                delete loaded[src];
            }
        }
    },
};

export default assets;
