import noRoleMatches from './no-role-matches';

const listMetadata = {
	id: 'list',
	selector: 'ul, ol',
	matches: noRoleMatches,
	tags: ['cat.structure', 'wcag2a', 'wcag131'],
	metadata: {
		description: 'Ensures that lists are structured correctly',
		help: '<ul> and <ol> must only directly contain <li>, <script> or <template> elements'
	},
	all: [],
	any: [],
	none: ['only-listitems']
};

export default listMetadata;