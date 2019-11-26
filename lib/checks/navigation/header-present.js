import headerPresentEvaluate from './header-present-evaluate';

const headerPresentMetadata = {
	id: 'header-present',
	evaluate: headerPresentEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'Page has a header',
			fail: 'Page does not have a header'
		}
	}
};

export default headerPresentMetadata;