import noRoleMatches from './no-role-matches';

const definitionListMetadata = {
	id: 'definition-list',
	selector: 'dl',
	matches: noRoleMatches,
	tags: ['cat.structure', 'wcag2a', 'wcag131'],
	metadata: {
		description: 'Ensures <dl> elements are structured correctly',
		help: '<dl> elements must only directly contain properly-ordered <dt> and <dd> groups, <script> or <template> elements'
	},
	all: [],
	any: [],
	none: ['structured-dlitems', 'only-dlitems']
};

export default definitionListMetadata;