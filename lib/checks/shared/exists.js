import existsEvaluate from './exists-evaluate';

const existsMetadata = {
	id: 'exists',
	evaluate: existsEvaluate,
	metadata: {
		impact: 'minor',
		message: {
			"pass": "Element does not exist",
			"incomplete": "Element exists"
		}
	}
};

export default existsMetadata;