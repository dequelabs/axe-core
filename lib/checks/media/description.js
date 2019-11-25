import descriptionEvaluate from './description-evaluate';

const descriptionMetadata = {
	id: 'description',
	evaluate: descriptionEvaluate,
	metadata: {
		impact: 'critical',
		message: {
			pass: 'The multimedia element has an audio description track',
			incomplete: 'Check that audio description is available for the element'
		}
	}
};

export default descriptionMetadata;