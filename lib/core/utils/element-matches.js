/**
 * Polyfill for Element#matches
 * @param {HTMLElement} node The element to test
 * @param {String} selector The selector to test element against
 * @return {Boolean}
 */
const matchesSelector = (() => {
  let method;

  function getMethod(node) {
    const candidates = [
      'matches',
      'matchesSelector',
      'mozMatchesSelector',
      'webkitMatchesSelector',
      'msMatchesSelector'
    ];
    const length = candidates.length;
    let index, candidate;

    for (index = 0; index < length; index++) {
      candidate = candidates[index];
      if (node[candidate]) {
        return candidate;
      }
    }
  }

  return (node, selector) => {
    if (!method || !node[method]) {
      method = getMethod(node);
    }

    if (node[method]) {
      return node[method](selector);
    }

    return false;
  };
})();

export default matchesSelector;
