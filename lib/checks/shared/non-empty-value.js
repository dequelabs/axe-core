import nonEmptyValueEvaluate from './non-empty-value-evaluate';

const nonEmptyValueMetadata = {
	id: 'non-empty-value',
	evaluate: nonEmptyValueEvaluate,
	metadata: {
		impact: 'critical',
		message: {
			"pass": "Element has a non-empty value attribute",
			"fail": "Element has no value attribute or the value attribute is empty"
		}
	}
};

export default nonEmptyValueMetadata;