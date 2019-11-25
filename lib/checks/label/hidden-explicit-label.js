import hiddenExplicitLabelEvaluate from './hidden-explicit-label-evaluate';

const hiddenExplicitLabelMetadata = {
	id: 'hidden-explicit-label',
	evaluate: hiddenExplicitLabelEvaluate,
	metadata: {
		impact: 'critical',
		message: {
			pass: 'Form element has a visible explicit <label>',
			fail: 'Form element has explicit <label> that is hidden'
		}
	}
};

export default hiddenExplicitLabelMetadata;