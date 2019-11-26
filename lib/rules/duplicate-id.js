import duplicateIdMiscMatches from './duplicate-id-misc-matches';

const duplicateIdMetadata = {
	id: 'duplicate-id',
	selector: '[id]',
	matches: duplicateIdMiscMatches,
	excludeHidden: false,
	tags: ['cat.parsing', 'wcag2a', 'wcag411'],
	metadata: {
		description: 'Ensures every id attribute value is unique',
		help: 'id attribute value must be unique'
	},
	all: [],
	any: ['duplicate-id'],
	none: []
};

export default duplicateIdMetadata;