import labelMatches from './label-matches';

const formFieldMultipleLabelsMetadata = {
	id: 'form-field-multiple-labels',
	selector: 'input, select, textarea',
	matches: labelMatches,
	tags: ['cat.forms', 'wcag2a', 'wcag332'],
	metadata: {
		description: 'Ensures form field does not have multiple label elements',
		help: 'Form field should not have multiple label elements'
	},
	all: [],
	any: [],
	none: ['multiple-label']
};

export default formFieldMultipleLabelsMetadata;