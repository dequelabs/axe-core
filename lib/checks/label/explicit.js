import explicitEvaluate from './explicit-evaluate';

const explicitMetadata = {
	id: 'explicit-label',
	evaluate: explicitEvaluate,
	metadata: {
		impact: 'critical',
		message: {
			pass: 'Form element has an explicit <label>',
			fail: 'Form element does not have an explicit <label>'
		}
	}
};

export default explicitMetadata;