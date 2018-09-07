// Select and textarea is always allowed
if (node.nodeName.toUpperCase() !== 'INPUT') {
	return true;
}

const number = ['text', 'search', 'number'];
const url = ['text', 'search', 'url'];
const allowedTypesMap = {
	bday: ['text', 'search', 'date'],
	email: ['text', 'search', 'email'],
	'cc-exp': ['text', 'search', 'month'],
	'street-address': [], // Not even the default
	tel: ['text', 'search', 'tel'],
	'cc-exp-month': number,
	'cc-exp-year': number,
	'transaction-amount': number,
	'bday-day': number,
	'bday-month': number,
	'bday-year': number,
	'new-password': ['text', 'search', 'password'],
	'current-password': ['text', 'search', 'password'],
	url: url,
	photo: url,
	impp: url
};

if (typeof options === 'object') {
	// Merge in options
	Object.keys(options).forEach(key => {
		if (!allowedTypesMap[key]) {
			allowedTypesMap[key] = [];
		}
		allowedTypesMap[key] = allowedTypesMap[key].concat(options[key]);
	});
}

const autocomplete = node.getAttribute('autocomplete');
const autocompleteTerms = autocomplete
	.split(/\s+/g)
	.map(term => term.toLowerCase());

const purposeTerm = autocompleteTerms[autocompleteTerms.length - 1];
if (axe.commons.text.autocomplete.stateTerms.includes(purposeTerm)) {
	return true;
}

const allowedTypes = allowedTypesMap[purposeTerm];
if (typeof allowedTypes === 'undefined') {
	return node.type === 'text';
}

return allowedTypes.includes(node.type);
