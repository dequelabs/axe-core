import nonEmptyIfPresentEvaluate from './non-empty-if-present-evaluate';

const nonEmptyIfPresentMetadata = {
	id: 'non-empty-if-present',
	evaluate: nonEmptyIfPresentEvaluate,
	metadata: {
		impact: 'critical',
		message: {
			"pass": "Element {{?it.data}}has a non-empty value attribute{{??}}does not have a value attribute{{?}}",
			"fail": "Element has a value attribute and the value attribute is empty"
		}
	}
};

export default nonEmptyIfPresentMetadata;