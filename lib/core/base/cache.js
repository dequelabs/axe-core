let _cache = {};

const cache = {
  // /**
  //  * Set an item in the cache.
  //  * @param {String} key - Name of the key.
  //  * @param {*} value - Value to store.
  //  */
  // set(key, value) {
  //   _cache[key] = value;
  // },

  // /**
  //  * Retrieve an item from the cache.
  //  * @param {String} key - Name of the key the value was stored as.
  //  * @returns {*} The item stored
  //  */
  // get(key) {
  //   return _cache[key];
  // },

  pull(key, callback) {
    // add comments on new method of getting / setting with higher level solution:
    return _cache[key] ? _cache[key] : (_cache[key] = callback());
  },

  /**
   * Clear the cache.
   */
  clear() {
    _cache = {};
  }
};

export default cache;
