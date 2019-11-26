import ariaFormFieldNameMatches from './aria-form-field-name-matches';

const ariaInputFieldNameMetadata = {
	id: 'aria-input-field-name',
	selector: '[role="combobox"], [role="listbox"], [role="searchbox"], [role="slider"], [role="spinbutton"], [role="textbox"]',
	matches: ariaFormFieldNameMatches,
	tags: ['wcag2a', 'wcag412'],
	metadata: {
		description: 'Ensures every ARIA input field has an accessible name',
		help: 'ARIA input fields have an accessible name'
	},
	all: [],
	any: ['aria-label', 'aria-labelledby', 'non-empty-title'],
	none: ['no-implicit-explicit-label']
};

export default ariaInputFieldNameMetadata;