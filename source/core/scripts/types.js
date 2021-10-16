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
            val = val === 'true' ? true :
                val === 'false' ? false :
                    val === 'null' ? null :
                        parseInt(val).toString() === val ? parseInt(val) :
                            /^(?:\{[\w\W]*}|\[[\w\W]*])$/.test(val) ? JSON.parse(val) :
                                val;
        } catch (e) {}
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
        let src = object[key],
            type = $type(src);

        if (deep && type == 'object') {
            let len = _set.length,
                i = 0,
                val;

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
 * Extend target object with source object(s)
 *
 * @param {(boolean|Object)} deep - extend nested properties else target object
 * @param {Object} [obj] - target object
 * @param {...Object} [obj] - merged objects
 * @returns {Object}
 */
 export function $extend(deep) {
    let bool = typeof deep === 'boolean',
        args = _slice.call(arguments).slice(bool ? 1 : 0),
        target = args[0] || {};
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
    return obj === undefined ? 'undefined' :
        Object.prototype.toString.call(obj)
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
            let split = el.split('='),
                key = split[0].replace('[]', ''),
                val = (split[1] || '').replace(/\+/g, ' ') || '',
                isArrayProp = /\[\]/.test(split[0]);

            if (obj.hasOwnProperty(key)) {
                obj[key] = $toArray(obj[key]);
                obj[key].push(_castString(val));
            } else {
                obj[key] = isArrayProp ? [_castString(val)] : _castString(val);
            }
        });

    return obj;
}