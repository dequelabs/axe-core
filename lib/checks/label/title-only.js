import titleOnlyEvaluate from './title-only-evaluate';

const titleOnlyMetadata = {
	id: 'title-only',
	evaluate: titleOnlyEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			"pass": "Form element does not solely use title attribute for its label",
			"fail": "Only title used to generate label for form element"
		}
	}
};

export default titleOnlyMetadata;