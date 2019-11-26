import ariaHasAttrMatches from './aria-has-attr-matches';

const ariaValidAttrMetadata = {
	id: 'aria-valid-attr',
	matches: ariaHasAttrMatches,
	tags: ['cat.aria', 'wcag2a', 'wcag412'],
	metadata: {
		description: 'Ensures attributes that begin with aria- are valid ARIA attributes',
		help: 'ARIA attributes must conform to valid names'
	},
	all: [],
	any: ['aria-valid-attr'],
	none: []
};

export default ariaValidAttrMetadata;