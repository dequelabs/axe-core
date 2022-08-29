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
    if (key in _cache) {
      return _cache[key];
    }

    if (typeof creator !== 'undefined') {
      const creatorResult = validateCreator(creator);
      this.set(key, creatorResult);
      return _cache[key];
    }
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
 * Validates a cache creator by throwing if it is not a function or returns undefined.
 *
 * Will evaluate the creator to determine if it is valid.
 * @param {Function} creator - The creator function to validate.
 * @throws {TypeError} If the creator is not a function or returns undefined.
 * @returns {*} The creator's return value.
 */
function validateCreator(creator) {
  if (typeof creator !== 'function') {
    throw new TypeError(
      'creator must be a function, ' + typeof creator + ' given'
    );
  }

  const creatorReturn = creator();
  if (creatorReturn === undefined) {
    throw new TypeError('creator must not return undefined');
  }
  return creatorReturn;
}

export default cache;
