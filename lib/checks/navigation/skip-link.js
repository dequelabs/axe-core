import skipLinkEvaluate from './skip-link-evaluate';

const skipLinkMetadata = {
	id: 'skip-link',
	evaluate: skipLinkEvaluate,
	metadata: {
		impact: 'moderate',
		message: {
			pass: 'Skip link target exists',
			incomplete: 'Skip link target should become visible on activation',
			fail: 'No skip link target'
		}
	}
};

export default skipLinkMetadata;