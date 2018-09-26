/* global text */
// TODO: Should blacklist so things don't go stale as easilly
var inputTypes = [
	'text',
	'search',
	'tel',
	'url',
	'email',
	'date',
	'time',
	'number',
	'range',
	'color'
];

/**
 * Calculate value of a form element when treated as a value
 * @private
 * @param {VirtualNode} element The VirtualNode instance whose value we want
 * @return {string} The calculated value
 */
text.formControlValue = function formControlValue({ actualNode }, context) {
	const { inLabelledByContext } = context;
	const nodeName = actualNode.nodeName.toUpperCase();
	if (nodeName === 'INPUT') {
		if (
			!actualNode.hasAttribute('type') ||
			inputTypes.includes(actualNode.type.toLowerCase())
		) {
			return actualNode.value;
		}
		return '';
	}

	if (nodeName === 'SELECT' && inLabelledByContext) {
		var opts = actualNode.options;
		if (opts && opts.length) {
			var returnText = '';
			for (var i = 0; i < opts.length; i++) {
				if (opts[i].selected) {
					returnText += ' ' + opts[i].text;
				}
			}
			return text.sanitize(returnText);
		}
		return '';
	}

	if (nodeName === 'TEXTAREA' && actualNode.value) {
		return actualNode.value;
	}
	return '';
};
