import pageNoDuplicateEvaluate from './page-no-duplicate';

const pageNoDuplicateBannerMetadata = {
	id: 'page-no-duplicate-banner',
	evaluate: pageNoDuplicateEvaluate,
	options: {
		selector: 'header:not([role]), [role=banner]',
		nativeScopeFilter: 'article, aside, main, nav, section'
	},
	metadata: {
		impact: 'moderate',
		message: {
			pass: 'Document does not have more than one banner landmark',
			fail: 'Document has more than one banner landmark'
		}
	}
};

export default pageNoDuplicateBannerMetadata;