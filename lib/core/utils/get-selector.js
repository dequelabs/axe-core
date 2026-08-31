import getShadowSelector from './get-shadow-selector';
import { getSelectorData } from './get-selector/precompute';
import generateSelector from './get-selector/generate';

/**
 * Gets a unique CSS selector
 * @param {HTMLElement} node The element to get the selector for
 * @param {Object} optional options
 * @returns {String|Array<String>} Unique CSS selector for the node
 */
export default function getSelector(elm, options) {
  return getShadowSelector(generateSelector, elm, options);
}

export { getSelectorData };
