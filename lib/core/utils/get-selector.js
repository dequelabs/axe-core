import getShadowSelector from './get-shadow-selector';
import memoize from './memoize';
import { getSelectorData } from './get-selector/precompute';
import generateSelector from './get-selector/generate';

/**
 * Gets a unique CSS selector
 * @param {HTMLElement} node The element to get the selector for
 * @param {Object} optional options
 * @returns {String|Array<String>} Unique CSS selector for the node
 */
function getSelector(elm, options) {
  return getShadowSelector(generateSelector, elm, options);
}

export { getSelectorData };

// Axe can call getSelector more than once for the same element because
// the same element can end up on multiple DqElements.
export default memoize(getSelector);
