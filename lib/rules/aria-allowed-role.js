import ariaAllowedRoleMatches from './aria-allowed-role-matches';

const ariaAllowedRoleMetadata = {
	id: 'aria-allowed-role',
	excludeHidden: false,
	selector: '[role]',
	matches: ariaAllowedRoleMatches,
	tags: ['cat.aria', 'best-practice'],
	metadata: {
		description: 'Ensures role attribute has an appropriate value for the element',
		help: 'ARIA role must be appropriate for the element'
	},
	all: [],
	any: ['aria-allowed-role'],
	none: []
};

export default ariaAllowedRoleMetadata;