/* eslint-disable */

export const _slice = [].slice;

/**
 * Cast string to most applicable data type
 *
 * @protected
 * @param {*} val
 */
export function _castString(val) {
    if (typeof val === 'string') {
        try {
            val = val === 'true' ? true
                : val === 'false' ? false
                    : val === 'null' ? null
                        : parseInt(val).toString() === val ? parseInt(val)
                            : /^(?:\{[\w\W]*}|\[[\w\W]*])$/.test(val) ? JSON.parse(val)
                                : val;
        } catch (e) {}
    }

    return val;
}

/**
 * Clone value to a new instance
 *
 * @private
 * @param {*} val
 * @returns {*}
 */
 function _copy(val) {
    const type = $type(val);

    if (type == 'object') {
        val = _extend({}, val, true);
    } else if (type == 'array') {
        val = val.slice(0);
    }

    return val;
}

/**
 * Extend target object with source object(s)
 *
 * @private
 * @param {Object} target
 * @param {Object} object
 * @param {boolean} [deep=false]
 * @param {Array} [_set=[]]
 * @returns {Object}
 */
export function _extend(target, object, deep, _set = []) {
    if (!object) {
        return target;
    }

    for (const key in object) {
        const src = object[key];
        const type = $type(src);

        if (deep && type == 'object') {
            const len = _set.length;
            let i = 0;
            let val;

            for (; i < len; i++) {
                if (_set[i] === src) {
                    val = src;
                    break;
                }
            }

            if (val) {
                target[key] = val;
            } else {
                _set.push(src);
                target[key] = _extend(target[key] || {}, src, deep, _set);
            }
        } else if (src !== undefined) {
            target[key] = type == 'array' ? src.slice(0) : src;
        }
    }

    return target;
}

/**
 * Compare two values for equality
 *
 * @private
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
 function _equals(a, b) {
    if (a === b) {
        return true;
    }

    const aType = $type(a);

    if (aType != $type(b)) {
        return false;
    }

    if (aType == 'array') {
        return _arrEquals(a, b);
    }

    if (aType == 'object') {
        return _objEquals(a, b);
    }

    if (aType == 'date') {
        return +a == +b;
    }

    return false;
}

/**
 * Compare two objects for equality
 *
 * @private
 * @param {Object} a
 * @param {Object} b
 * @returns {boolean}
 */
 function _objEquals(a, b) {
    const aKeys = Object.keys(a);

    return _arrEquals(aKeys.sort(), Object.keys(b).sort()) &&
        aKeys.every(i => _equals(a[i], b[i]));
}

/**
 * Clone value to a new instance
 *
 * @private
 * @param {*} val
 * @returns {*}
 */
 export function $copy(val) {
    return _copy(val);
}

/**
 * Compare two values for strict equality
 *
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
 export function $equals(a, b) {
    return _equals(a, b);
}

/**
 * Extend target object with source object(s)
 *
 * @param {(boolean|Object)} deep - extend nested properties else target object
 * @param {Object} [obj] - target object
 * @param {...Object} [obj] - merged objects
 * @returns {Object}
 */
export function $extend(deep) {
    const bool = typeof deep === 'boolean';
    const args = _slice.call(arguments).slice(bool ? 1 : 0);
    let target = args[0] || {};
    deep = bool ? deep : false;

    args.slice(1).forEach((source) => {
        target = _extend(target, source, deep);
    });

    return target;
}

/**
 * Determine the JavaScript type of an object
 *
 * @param {*} obj
 * @returns string
 */
export function $type(obj) {
    return obj === undefined ? 'undefined'
        : Object.prototype.toString.call(obj)
            .replace(/^\[object (.+)]$/, '$1')
            .toLowerCase();
}

/**
 * Determine if value is an object
 *
 * @param {*} obj
 * @returns {boolean}
 */
export function $isObject(obj) {
    return $type(obj) === 'object';
}

/**
 * Determine if value is a string
 *
 * @param {*} obj
 * @returns {boolean}
 */
export function $isString(obj) {
    return typeof obj === 'string';
}

/**
 * Cast value to array if it isn't one
 *
 * @param {*} val
 * @returns {Array} value
 */
export function $toArray(val) {
    return val !== undefined ? (Array.isArray(val) ? val : [val]) : [];
}

/**
 * Serialize object
 *
 * @param {Object} obj
 * @returns {string} value
 */
export function $serialize(obj) {
    const arr = [];

    Object.keys(obj || {}).forEach((key) => {
        const val = obj[key];
        key = encodeURIComponent(key);

        if (typeof val !== 'object') {
            arr.push(`${key}=${encodeURIComponent(val)}`);
        } else if (Array.isArray(val)) {
            val.forEach((el) => {
                arr.push(`${key}[]=${encodeURIComponent(el)}`);
            });
        }
    });

    return arr.length ? arr.join('&').replace(/%20/g, '+') : '';
}

/**
 * Convert serialized string back into an object
 *
 * @param {string} str
 * @returns {Object} value
 */
export function $unserialize(str) {
    const obj = {};

    decodeURIComponent(str)
        .replace(/^\?/, '')
        .split('&').forEach((el) => {
            const split = el.split('=');
            const key = split[0].replace('[]', '');
            const val = (split[1] || '').replace(/\+/g, ' ') || '';
            const isArrayProp = /\[\]/.test(split[0]);

            if (obj.hasOwnProperty(key)) {
                obj[key] = $toArray(obj[key]);
                obj[key].push(_castString(val));
            } else {
                obj[key] = isArrayProp ? [_castString(val)] : _castString(val);
            }
        });

    return obj;
}
