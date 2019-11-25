import nonEmptyAltEvaluate from './non-empty-alt-evaluate';

const nonEmptyAltMetadata = {
	id: 'non-empty-alt',
	evaluate: nonEmptyAltEvaluate,
	metadata: {
		impact: 'critical',
		message: {
			"pass": "Element has a non-empty alt attribute",
			"fail": "Element has no alt attribute or the alt attribute is empty"
		}
	}
};

export default nonEmptyAltMetadata;