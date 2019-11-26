import dataTableMatches from './data-table-matches';

const tableFakeCaptionMetadata = {
	id: 'table-fake-caption',
	selector: 'table',
	matches: dataTableMatches,
	tags: [
		'cat.tables',
		'experimental',
		'wcag2a',
		'wcag131',
		'section508',
		'section508.22.g'
	],
	metadata: {
		description: 'Ensure that tables with a caption use the <caption> element.',
		help: 'Data or header cells should not be used to give caption to a data table.'
	},
	all: ['caption-faked'],
	any: [],
	none: []
};

export default tableFakeCaptionMetadata;