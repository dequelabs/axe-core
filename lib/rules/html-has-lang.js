import windowIsTopMatches from './window-is-top-matches';

const htmlHasLangMetadata = {
	id: 'html-has-lang',
	selector: 'html',
	matches: windowIsTopMatches,
	tags: ['cat.language', 'wcag2a', 'wcag311'],
	metadata: {
		description: 'Ensures every HTML document has a lang attribute',
		help: '<html> element must have a lang attribute'
	},
	all: [],
	any: ['has-lang'],
	none: []
};

export default htmlHasLangMetadata;