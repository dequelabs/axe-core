let _cache = {};

const cache = {
  /**
   * Set an item in the cache.
   * @param {String} key - Name of the key.
   * @param {*} value - Value to store.
   */
  set(key, value) {
    _cache[key] = value;
  },

  /**
   * Retrieve an item from the cache.
   * @param {String} key - Name of the key the value was stored as.
   * @param {*} defaultValue - Default value to set if there is a cache miss. Functions are evaluated before caching. To override a value already saved, use `set()`.
   * @returns {*} The item stored
   */
  get(key, defaultValue = null) {
    if (!defaultValue) {
      return _cache[key];
    }

    if (
      defaultValue &&
      !(key in _cache) &&
      typeof defaultValue === 'function'
    ) {
      this.set(key, defaultValue.call());
    } else if (defaultValue && !(key in _cache)) {
      this.set(key, defaultValue);
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

export default cache;
