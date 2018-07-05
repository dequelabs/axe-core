let {
	standaloneTerms = [],
	qualifiedTerms = [],
	qualifiers = [],
	locations = [],
	looseTyped = false
} =
	options || {};

qualifiers = qualifiers.concat(['home', 'work', 'mobile', 'fax', 'pager']);
locations = locations.concat(['billing', 'shipping']);
standaloneTerms = standaloneTerms.concat([
	'name',
	'honorific-prefix',
	'given-name',
	'additional-name',
	'family-name',
	'honorific-suffix',
	'nickname',
	'username',
	'new-password',
	'current-password',
	'organization-title',
	'organization',
	'street-address',
	'address-line1',
	'address-line2',
	'address-line3',
	'address-level4',
	'address-level3',
	'address-level2',
	'address-level1',
	'country',
	'country-name',
	'postal-code',
	'cc-name',
	'cc-given-name',
	'cc-additional-name',
	'cc-family-name',
	'cc-number',
	'cc-exp',
	'cc-exp-month',
	'cc-exp-year',
	'cc-csc',
	'cc-type',
	'transaction-currency',
	'transaction-amount',
	'language',
	'bday',
	'bday-day',
	'bday-month',
	'bday-year',
	'sex',
	'url',
	'photo'
]);

qualifiedTerms = qualifiedTerms.concat([
	'tel',
	'tel-country-code',
	'tel-national',
	'tel-area-code',
	'tel-local',
	'tel-local-prefix',
	'tel-local-suffix',
	'tel-extension',
	'email',
	'impp'
]);

const autocomplete = node.getAttribute('autocomplete');
const autocompleteTerms = autocomplete.split(/\s+/g).map(term => {
	return term.toLowerCase();
});

if (!looseTyped) {
	if (
		autocompleteTerms[0].length > 8 &&
		autocompleteTerms[0].substr(0, 8) === 'section-'
	) {
		autocompleteTerms.shift();
	}

	if (locations.includes(autocompleteTerms[0])) {
		autocompleteTerms.shift();
	}

	if (qualifiers.includes(autocompleteTerms[0])) {
		autocompleteTerms.shift();
		// only quantifiers allowed at this point
		standaloneTerms = [];
	}

	if (autocompleteTerms.length !== 1) {
		return false;
	}
}

const purposeTerm = autocompleteTerms[autocompleteTerms.length - 1];
return (
	standaloneTerms.includes(purposeTerm) || qualifiedTerms.includes(purposeTerm)
);
