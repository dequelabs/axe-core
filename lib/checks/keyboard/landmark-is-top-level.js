import landmarkIsTopLevelEvaluate from './landmark-is-top-level-evaluate';

const landmarkIsTopLevelMetadata = {
	id: 'landmark-is-top-level',
	evaluate: landmarkIsTopLevelEvaluate,
	metadata: {
		impact: 'moderate',
		message: {
			pass: 'The {{=it.data.role }} landmark is at the top level.',
			fail: 'The {{=it.data.role }} landmark is contained in another landmark.'
		}
	}
};

export default landmarkIsTopLevelMetadata;