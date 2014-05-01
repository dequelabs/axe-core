/*jshint bitwise: false */

function pushUnique(a, b) {
	'use strict';

	for (var i = 0, l = b.length; i < l; i++) {
		if (a.indexOf(b[i]) === -1) {
			a.push(b[i]);
		}
	}
}

function normalizeSelectContext(selector) {
	'use strict';

	if (!selector) {
		selector = document;
	}

	if (typeof selector === 'string') {
		selector = utils.select(selector);
	}

	if (selector.length !== +selector.length) {
		selector = [selector];
	}

	return selector;
}

function normalizeSelection(selector) {
	'use strict';

	if (typeof selector === 'string') {
		return function (selector, context) {
			return utils.toArray(context.querySelectorAll(selector));
		};
	}

	if (selector.length === +selector.length) {
		return function (selector, context) {
			return utils.toArray(selector).filter(function (node) {
				return context.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY;
			});
		};
	}

	return function (selector, context) {
		return context.compareDocumentPosition(selector) & Node.DOCUMENT_POSITION_CONTAINED_BY ? [selector] : [];
	};

}


function nodeSorter(a, b) {
	'use strict';

	if (a.compareDocumentPosition(b) & 4) { // a before b
		return -1;
	}

	return 1; // b before a

}


utils.select = function select(selector, context) {
	'use strict';

	context = normalizeSelectContext(context);

	var result = [],
		cb = normalizeSelection(selector);
	for (var i = 0, l = context.length; i < l; i++) {
		pushUnique(result, cb(selector, context[i]));
	}

	return result.sort(nodeSorter);
};

//iterate context