/*exported DqElement */

function truncate(str, maxLength) {
	'use strict';

	maxLength = maxLength || 300;

	if (str.length > maxLength) {
		var index = str.indexOf('>');
		str = str.substring(0, index + 1);
	}

	return str;
}

function getSource (element) {
	'use strict';

	var source = element.outerHTML;
	if (!source && typeof XMLSerializer === 'function') {
		source = new XMLSerializer().serializeToString(element);
	}
	return truncate(source || '');
}

/**
 * "Serialized" `HTMLElement`. It will calculate the CSS selector,
 * grab the source (outerHTML) and offer an array for storing frame paths
 * @param {HTMLElement} element The element to serialize
 * @param {Object} spec Properties to use in place of the element when instantiated on Elements from other frames
 */
function DqElement(element, spec) {
	'use strict';
	spec = spec || {};

	/**
	 * A unique CSS selector for the element
	 * @type {String}
	 */
	this.selector = spec.selector || [axe.utils.getSelector(element)];

	/**
	 * The generated HTML source code of the element
	 * @type {String}
	 */
	this.source = spec.source !== undefined ? spec.source : getSource(element);

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

axe.utils.DqElement = DqElement;
