import implicitEvaluate from './implicit-evaluate';

const implicitMetadata = {
	id: 'implicit-label',
	evaluate: implicitEvaluate,
	metadata: {
		impact: 'critical',
		message: {
			pass: 'Form element has an implicit (wrapped) <label>',
			fail: 'Form element does not have an implicit (wrapped) <label>'
		}
	}
};

export default implicitMetadata;