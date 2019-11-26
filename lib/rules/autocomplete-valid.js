import autocompleteMatches from './autocomplete-matches';

const autocompleteValidMetadata = {
	id: 'autocomplete-valid',
	matches: autocompleteMatches,
	tags: ['cat.forms', 'wcag21aa', 'wcag135'],
	metadata: {
		description: 'Ensure the autocomplete attribute is correct and suitable for the form field',
		help: 'autocomplete attribute must be used correctly'
	},
	all: ['autocomplete-valid', 'autocomplete-appropriate'],
	any: [],
	none: []
};

export default autocompleteValidMetadata;