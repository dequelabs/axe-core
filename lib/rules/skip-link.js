import skipLinkMatches from './skip-link-matches';

const skipLinkMetadata = {
	id: 'skip-link',
	selector: 'a[href^="#"], a[href^="/#"]',
	matches: skipLinkMatches,
	tags: ['cat.keyboard', 'best-practice'],
	metadata: {
		description: 'Ensure all skip links have a focusable target',
		help: 'The skip-link target should exist and be focusable'
	},
	all: [],
	any: ['skip-link'],
	none: []
};

export default skipLinkMetadata;