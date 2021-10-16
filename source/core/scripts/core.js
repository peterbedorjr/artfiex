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
    let fns = $toArray(fn),
        len = fns.length,
        i = 0,
        response;

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