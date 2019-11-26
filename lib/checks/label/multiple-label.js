import multipleLabelEvaluate from './multiple-label-evaluate';

const multipleLabelMetadata = {
	id: 'multiple-label',
	evaluate: multipleLabelEvaluate,
	metadata: {
		impact: 'moderate',
		message: {
			pass: 'Form field does not have multiple label elements',
			incomplete: 'Multiple label elements is not widely supported in assistive technologies. Ensure the first label contains all necessary information.'
		}
	}
};

export default multipleLabelMetadata;