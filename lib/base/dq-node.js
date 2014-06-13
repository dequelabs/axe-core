/*exported DqNode */

/**
 * "Serialized" `HTMLElement` (not Node as the name implies). It will calculate the CSS selector,
 * grab the source (outerHTML) and offer an array for storing frame paths
 * @param {HTMLElement} element The element to serialize
 */
function DqNode(element) {
	'use strict';
	return {
		/**
		 * A unique CSS selector for the element
		 * @type {String}
		 */
		selector: utils.getSelector(element),
		/**
		 * The generated HTML source code of the element
		 * @type {String}
		 */
		source: element.outerHTML,
		/**
		 * Array of CSS selectors that represent the "frame" path, starting at the shallowest frame first
		 * @type {Array}
		 */
		frames: []
	};
}