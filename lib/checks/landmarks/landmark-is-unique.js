import landmarkIsUniqueEvaluate from './landmark-is-unique-evaluate';
import landmarkIsUniqueAfter from './landmark-is-unique-after';

const landmarkIsUniqueMetadata = {
	id: 'landmark-is-unique',
	evaluate: landmarkIsUniqueEvaluate,
	after: landmarkIsUniqueAfter,
	metadata: {
		impact: 'moderate',
		message: {
			pass: 'Landmarks must have a unique role or role/label/title (i.e. accessible name) combination',
			fail: 'The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable'
		}
	}
};

export default landmarkIsUniqueMetadata;