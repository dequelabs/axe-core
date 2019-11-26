import ariaHasAttrMatches from './aria-has-attr-matches';

const ariaValidAttrValueMetadata = {
	id: 'aria-valid-attr-value',
	matches: ariaHasAttrMatches,
	tags: ['cat.aria', 'wcag2a', 'wcag412'],
	metadata: {
		description: 'Ensures all ARIA attributes have valid values',
		help: 'ARIA attributes must conform to valid values'
	},
	all: ['aria-valid-attr-value', 'aria-errormessage'],
	any: [],
	none: []
};

export default ariaValidAttrValueMetadata;