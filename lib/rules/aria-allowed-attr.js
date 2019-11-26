import ariaAllowedAttrMatches from './aria-allowed-attr-matches';

const ariaAllowedAttrMetadata = {
	id: 'aria-allowed-attr',
	matches: ariaAllowedAttrMatches,
	tags: ['cat.aria', 'wcag2a', 'wcag412'],
	metadata: {
		description: 'Ensures ARIA attributes are allowed for an element\'s role',
		help: 'Elements must only use allowed ARIA attributes'
	},
	all: [],
	any: ['aria-allowed-attr'],
	none: ['aria-unsupported-attr']
};

export default ariaAllowedAttrMetadata;