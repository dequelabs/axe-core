import ariaFormFieldNameMatches from './aria-form-field-name-matches';

const ariaToggleFieldNameMetadata = {
	id: 'aria-toggle-field-name',
	selector: '[role="checkbox"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="radio"], [role="switch"]',
	matches: ariaFormFieldNameMatches,
	tags: ['wcag2a', 'wcag412'],
	metadata: {
		description: 'Ensures every ARIA toggle field has an accessible name',
		help: 'ARIA toggle fields have an accessible name'
	},
	all: [],
	any: [
		'aria-label',
		'aria-labelledby',
		'non-empty-title',
		'has-visible-text'
	],
	none: ['no-implicit-explicit-label']
};

export default ariaToggleFieldNameMetadata;