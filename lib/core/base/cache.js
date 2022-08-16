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
  get(key, ...args) {
    const defaultValue = args[0];
    const hasDefaultValue = args.length === 1;

    if (args.length > 1 || arguments.length === 0) {
      throw new Error('incorrect number of arguments');
    }

    if (hasDefaultValue && !(key in _cache)) {
      this.set(
        key,
        typeof defaultValue === 'function' ? defaultValue() : defaultValue
      );
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
