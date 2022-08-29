let _cache = {};

const cache = {
  /**
   * Set an item in the cache.
   * @param {String} key - Name of the key.
   * @param {*} value - Value to store.
   */
  set(key, value) {
    validateKey(key);

    _cache[key] = value;
  },

  /**
   * Retrieve an item from the cache.
   * @param {String} key - Name of the key the value was stored as.
   * @param {Function} [creator] - Default value to set if there is a cache miss. Functions are evaluated before caching. To override a value already saved, use `set()`.
   * @returns {*} The item stored
   */
  get(key, creator) {
    validateCreator(creator);

    if (key in _cache) {
      return _cache[key];
    }

    if (typeof creator === 'function') {
      this.set(key, creator());
    } else {
      this.set(key, undefined);
    }

    return _cache[key];
  },

  /**
   * Clear the cache.
   */
  clear() {
    _cache = {};
  }
};

/**
 * Validates a cache key or throws an error.
 * @param {String} key - The key to validate.
 * @returns {Void} Void if the key is valid.
 * @throws {TypeError} If the key is not a string.
 */
function validateKey(key) {
  if (typeof key !== 'string') {
    throw new TypeError('key must be a string, ' + typeof key + ' given');
  }
  if (key === '') {
    throw new TypeError('key must not be empty');
  }
}

/**
 * Validates a cache creator by throwing if it is not a function or undefined.
 * @param {Function|undefined} creator - The creator function to validate.
 * @throws {TypeError} If the creator is not a function or undefined.
 * @returns {Void} Void if the creator is valid.
 */
function validateCreator(creator) {
  if (typeof creator === 'function' || typeof creator === 'undefined') {
    return;
  }

  throw new TypeError(
    'creator must be a function or undefined, ' + typeof creator + ' given'
  );
}

export default cache;
