import captionEvaluate from './caption-evaluate';

const captionMetadata = {
	id: 'caption',
	evaluate: captionEvaluate,
	metadata: {
		impact: 'critical',
		message: {
			pass: 'The multimedia element has a captions track',
			incomplete: 'Check that captions is available for the element'
		}
	}
};

export default captionMetadata;