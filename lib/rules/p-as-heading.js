import pAsHeadingMatches from './p-as-heading-matches';

const pAsHeadingMetadata = {
	id: 'p-as-heading',
	selector: 'p',
	matches: pAsHeadingMatches,
	tags: ['cat.semantics', 'wcag2a', 'wcag131', 'experimental'],
	metadata: {
		description: 'Ensure p elements are not used to style headings',
		help: 'Bold, italic text and font-size are not used to style p elements as a heading'
	},
	all: ['p-as-heading'],
	any: [],
	none: []
};

export default pAsHeadingMetadata;