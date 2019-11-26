import labelMatches from './label-matches';

const labelTitleOnlyMetadata = {
	id: 'label-title-only',
	selector: 'input, select, textarea',
	matches: labelMatches,
	tags: ['cat.forms', 'best-practice'],
	metadata: {
		description: 'Ensures that every form element is not solely labeled using the title or aria-describedby attributes',
		help: 'Form elements should have a visible label'
	},
	all: [],
	any: [],
	none: ['title-only']
};

export default labelTitleOnlyMetadata;