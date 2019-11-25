import noImplicitExplicitLabelEvaluate from './no-implicit-explicit-label-evaluate'

const noImplicitExplicitLabelMetadata = {
	id: 'no-implicit-explicit-label',
	evaluate: noImplicitExplicitLabelEvaluate,
	metadata: {
		impact: 'moderate',
		messages: {
			pass: 'There is no mismatch between a <label> and accessible name',
			incomplete: 'Check that the <label> does not need be part of the ARIA {{=it.data}} field\'s name'
		}
	}
};

export default noImplicitExplicitLabelMetadata;