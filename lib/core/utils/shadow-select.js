/**
 * Find the first element to match a selector.
 * Use an array of selectors to reach into shadow DOM trees
 *
 * @param {string|string[]} selector String or array of strings with a CSS selector
 * @param {Document} doc Optional document node
 * @returns {Element|Null}
 */
export default function shadowSelect(selectors) {
  // Spread to avoid mutating the input
  const selectorArr = Array.isArray(selectors) ? [...selectors] : [selectors];
  return selectRecursive(selectorArr, document);
}

/* Find an element in shadow or light DOM trees, using an axe selector */
function selectRecursive(selectors, doc) {
  const selectorStr = selectors.shift();
  const elm = selectorStr ? doc.querySelector(selectorStr) : null;
  if (selectors.length === 0) {
    return elm;
  }
  if (!elm?.shadowRoot) {
    return null;
  }
  return selectRecursive(selectors, elm.shadowRoot);
}
