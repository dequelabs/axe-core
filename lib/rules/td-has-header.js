import dataTableLargeMatches from './data-table-large-matches';

const tdHasHeaderMetadata = {
	id: 'td-has-header',
	selector: 'table',
	matches: dataTableLargeMatches,
	tags: [
		'cat.tables',
		'experimental',
		'wcag2a',
		'wcag131',
		'section508',
		'section508.22.g'
	],
	metadata: {
		description: 'Ensure that each non-empty data cell in a large table has one or more table headers',
		help: 'All non-empty td element in table larger than 3 by 3 must have an associated table header'
	},
	all: ['td-has-header'],
	any: [],
	none: []
};

export default tdHasHeaderMetadata;