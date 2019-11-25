import landmarkEvaluate from './landmark-evaluate';

const landmarkMetadata = {
	id: 'landmark',
	evaluate: landmarkEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			"pass": "Page has a landmark region",
			"fail": "Page does not have a landmark region"
		}
	}
};

export default landmarkMetadata;