import autocompleteAppropriateEvaluate from './autocomplete-appropriate-evaluate';

const autocompleteAppropriateMetadata = {
	id: 'autocomplete-appropriate',
	evaluate: autocompleteAppropriateEvaluate,
	metadata: {
		impact: 'serious',
		messages: {
			pass: 'the autocomplete value is on an appropriate element',
			fail: 'the autocomplete value is inappropriate for this type of input'
		}
	}
};

export default autocompleteAppropriateMetadata;