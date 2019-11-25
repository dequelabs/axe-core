import autocompleteValidEvaluate from './autocomplete-valid-evaluate';

const autocompleteValidMetadata = {
	id: 'autocomplete-valid',
	evaluate: autocompleteValidEvaluate,
	metadata: {
		impact: 'serious',
		messages: {
			pass: 'the autocomplete attribute is correctly formatted',
			fail: 'the autocomplete attribute is incorrectly formatted'
		}
	}
};

export default autocompleteValidMetadata;