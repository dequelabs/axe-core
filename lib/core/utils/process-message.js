/* global helpers */
const dataRegex = /\$\{\s?data\s?\}/g;

/**
 * Replace a placeholder with the value of a data string or object
 * @param {String} str
 * @param {String|Object} data
 */
function substitute(str, data) {
	// replace all instances of ${ data } with the value of the string
	if (typeof data === 'string') {
		return str.replace(dataRegex, data);
	}

	// replace all instances of ${ data[prop] } with the value of the property
	for (let prop in data) {
		if (data.hasOwnProperty(prop)) {
			const regex = new RegExp('\\${\\s?data\\.' + prop + '\\s?}', 'g');
			str = str.replace(regex, data[prop]);
		}
	}

	return str;
}

/**
 * Process a metadata message.
 * @param {String|Object} message
 * @param {Object} data
 * @return {String}
 */
axe.utils.processMessage = function processMessage(message, data) {
	if (!message) {
		return;
	}

	// data as array
	if (Array.isArray(data)) {
		data.values = data.join(', ');

		if (message.singular || message.plural) {
			const str = data.length === 1 ? message.singular : message.plural;
			return substitute(str, data);
		}

		// no singular/plural message so just pass data
		return substitute(message, data);
	}

	// message is a string that uses data as a string or object properties
	if (typeof message === 'string') {
		return substitute(message, data);
	}

	// message is an object that uses value of data to determine message
	if (typeof data === 'string') {
		const str = message[data];
		return substitute(str, data);
	}

	// message uses value of data property to determine message
	if (typeof message === 'object') {
		// find the first message that matches the data or use the default
		const keys = Object.keys(message).filter(key => key !== 'default');
		let str = message.default || helpers.incompleteFallbackMessage();
		for (let i = 0; data && i < keys.length; i++) {
			const key = keys[i];
			let value = data[key];

			// incomplete reason
			if (Array.isArray(value)) {
				value = value[0].reason;
			}

			if (message[key][value]) {
				str = message[key][value];
				break;
			}
		}

		return processMessage(str, data);
	}

	return helpers.incompleteFallbackMessage();
};
