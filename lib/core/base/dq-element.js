/*exported DqElement */

function truncate(str, maxLength, separator) {
	'use strict';

	maxLength = maxLength || 300;
	separator = separator || '...';

	if (str.length > maxLength) {
		var length = Math.floor((maxLength - separator.length) / 2);
		str = str.slice(0, length) + separator + str.slice(-length);
	}

	return str;
}

/**
 * "Serialized" `HTMLElement`. It will calculate the CSS selector,
 * grab the source (outerHTML) and offer an array for storing frame paths
 * @param {HTMLElement} element The element to serialize
 */
function DqElement(element, spec) {
	'use strict';
	spec = spec || {};

	/**
	 * A unique CSS selector for the element
	 * @type {String}
	 */
	this.selector = spec.selector || [utils.getSelector(element)];

	/**
	 * The generated HTML source code of the element
	 * @type {String}
	 */
	this.source = truncate(spec.source || element.outerHTML);

	/**
	 * The element which this object is based off or the containing frame, used for sorting.
	 * Excluded in toJSON method.
	 * @type {HTMLElement}
	 */
	this.element = element;
}

DqElement.prototype.toJSON = function () {
	'use strict';
	return {
		selector: this.selector,
		source: this.source
	};
};