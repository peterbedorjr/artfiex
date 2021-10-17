/* eslint-disable */ 

import { $toArray, _extend } from './types';

export const isBrowser = typeof window === 'object';

/**
 * Execute specified function or Array of functions
 *
 * @param {Array|function} fn
 * @param {Object} [options]
 * @param {Array} [options.args]
 * @param {Object} [options.scope]
 * @returns {*} [response]
 */
export function $exec(fn, options = {}) {
    const fns = $toArray(fn);
    const len = fns.length;
    let i = 0;
    let response;

    for (; i < len; i++) {
        const conf = _extend({
            args: [],
        }, options);

        response = fns[i].apply(
            conf.scope,
            $toArray(conf.args),
        );

        if (len === 1) {
            return response;
        }
    }
}