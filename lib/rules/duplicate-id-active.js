import duplicateIdActiveMatches from './duplicate-id-active-matches';

const duplicateIdActiveMetadata = {
	id: 'duplicate-id-active',
	selector: '[id]',
	matches: duplicateIdActiveMatches,
	excludeHidden: false,
	tags: ['cat.parsing', 'wcag2a', 'wcag411'],
	metadata: {
		description: 'Ensures every id attribute value of active elements is unique',
		help: 'IDs of active elements must be unique'
	},
	all: [],
	any: ['duplicate-id-active'],
	none: []
};

export default duplicateIdActiveMetadata;