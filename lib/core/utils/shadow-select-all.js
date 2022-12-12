/**
 * Find elements to match a selector.
 * Use an array of selectors to reach into shadow DOM trees
 *
 * @param {string|string[]} selector String or array of strings with a CSS selector
 * @param {Document} doc Optional document node
 * @returns {Node[]}
 */
export default function shadowSelectAll(selectors, doc = document) {
  // Spread to avoid mutating the input
  const selectorArr = Array.isArray(selectors) ? [...selectors] : [selectors];
  if (selectors.length === 0) {
    return [];
  }
  return selectAllRecursive(selectorArr, doc);
}

/* Find elements in shadow or light DOM trees, using an array of selectors */
function selectAllRecursive([selectorStr, ...restSelector], doc) {
  const elms = doc.querySelectorAll(selectorStr);
  if (restSelector.length === 0) {
    return Array.from(elms);
  }
  const selected = [];
  for (const elm of elms) {
    if (elm?.shadowRoot) {
      selected.push(...selectAllRecursive(restSelector, elm.shadowRoot));
    }
  }
  return selected;
}
