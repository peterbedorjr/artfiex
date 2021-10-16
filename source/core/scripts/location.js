import { $isObject, $serialize, $unserialize } from './types';
import { _doc, _win } from './variables';

const REMOVE_SLASHES_REGEXP = /^\/|\/$/g;

/**
 * Parse url and return results
 *
 * @param {string|Object} [value]
 * @returns {Object}
 * @private
 */
export function parseLocation(value) {
    if ($isObject(value)) {
        let path = value.path;

        if ($isObject(value.query)) {
            path += `?${$serialize(value.query)}`;
        }

        if (value.hash) {
            path += `#${value.hash}`;
        }

        value = path;
    }

    const a = _doc.createElement('a');
    a.href = value || window.location;

    const search = a.search;
    const path = a.pathname.replace(REMOVE_SLASHES_REGEXP, '');
    const origin = a.href.split('/');

    return {
        fullPath: `/${path}${search}${a.hash}`,
        hash: a.hash.slice(1),
        path: `/${path}`,
        search,
        query: search ? $unserialize(search) : {},
        segments: path.split('/'),
        url: a.href,
        origin: `${origin[0]}//${origin[2]}`,
        protocol: origin[0].replace(':', ''),
        port: a.port,
    };
}

/**
 * Retrieve information about current location or provided URL
 *
 * @param {string} [value]
 * @returns {Object}
 */
 export function uri(value) {
    return parseLocation(value);
}

/**
 * Retrieve the current path's segments as an array or segment by index
 *
 * @param index
 * @returns {Array|string}
 */
export function segments(index) {
    const segments = uri().segments;

    if (index >= 0 && segments[index]) {
        return segments[index];
    }

    return segments;
}

export default {
    uri,
    segments,
};