import labelMatches from './label-matches';

const labelMetadata = {
	id: 'label',
	selector: 'input, select, textarea',
	matches: labelMatches,
	tags: [
		'cat.forms',
		'wcag2a',
		'wcag332',
		'wcag131',
		'section508',
		'section508.22.n'
	],
	metadata: {
		description: 'Ensures every form element has a label',
		help: 'Form elements must have labels'
	},
	all: [],
	any: [
		'aria-label',
		'aria-labelledby',
		'implicit-label',
		'explicit-label',
		'non-empty-title'
	],
	none: ['help-same-as-label', 'hidden-explicit-label']
};

export default labelMetadata;