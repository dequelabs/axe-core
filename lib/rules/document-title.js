import windowIsTopMatches from './window-is-top-matches';

const documentTitleMetadata = {
	id: 'document-title',
	selector: 'html',
	matches: windowIsTopMatches,
	tags: ['cat.text-alternatives', 'wcag2a', 'wcag242'],
	metadata: {
		description: 'Ensures each HTML document contains a non-empty <title> element',
		help: 'Documents must have <title> element to aid in navigation'
	},
	all: [],
	any: ['doc-has-title'],
	none: []
};

export default documentTitleMetadata;