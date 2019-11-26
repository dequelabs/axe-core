import internalLinkPresentEvaluate from './internal-link-present-evaluate';

const internalLinkPresentMetadata = {
	id: 'internal-link-present',
	evaluate: internalLinkPresentEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'Valid skip link found',
			fail: 'No valid skip link found'
		}
	}
};

export default internalLinkPresentMetadata;