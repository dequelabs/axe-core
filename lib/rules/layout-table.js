import layoutTableMatches from './layout-table-matches';

const layoutTableMetadata = {
	id: 'layout-table',
	selector: 'table',
	matches: layoutTableMatches,
	tags: ['cat.semantics', 'wcag2a', 'wcag131', 'deprecated'],
	metadata: {
		description: 'Ensures presentational <table> elements do not use <th>, <caption> elements or the summary attribute',
		help: 'Layout tables must not use data table elements'
	},
	enabled: false,
	all: [],
	any: [],
	none: ['has-th', 'has-caption', 'has-summary']
};

export default layoutTableMetadata;