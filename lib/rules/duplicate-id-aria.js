import duplicateIdAriaMatches from './duplicate-id-aria-matches';

const duplicateIdAriaMetadata = {
	id: 'duplicate-id-aria',
	selector: '[id]',
	matches: duplicateIdAriaMatches,
	excludeHidden: false,
	tags: ['cat.parsing', 'wcag2a', 'wcag411'],
	metadata: {
		description: 'Ensures every id attribute value used in ARIA and in labels is unique',
		help: 'IDs used in ARIA and labels must be unique'
	},
	all: [],
	any: ['duplicate-id-aria'],
	none: []
};

export default duplicateIdAriaMetadata;