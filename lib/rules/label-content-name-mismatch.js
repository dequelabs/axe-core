import labelContentNameMismatchMatches from './label-content-name-mismatch-matches';

const labelContentNameMismatchMetadata = {
	id: 'label-content-name-mismatch',
	matches: labelContentNameMismatchMatches,
	tags: ['wcag21a', 'wcag253', 'experimental'],
	metadata: {
		description: 'Ensures that elements labelled through their content must have their visible text as part of their accessible name',
		help: 'Elements must have their visible text as part of their accessible name'
	},
	all: [],
	any: ['label-content-name-mismatch'],
	none: []
};

export default labelContentNameMismatchMetadata;