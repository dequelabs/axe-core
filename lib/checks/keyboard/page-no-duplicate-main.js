import pageNoDuplicateEvaluate from './page-no-duplicate';

const pageNoDuplicateMainMetadata = {
	id: 'page-no-duplicate-main',
	evaluate: pageNoDuplicateEvaluate,
	options: {
		selector: 'main:not([role]), [role="main"]'
	},
	metadata: {
		impact: 'moderate',
		message: {
			pass: 'Document does not have more than one main landmark',
			fail: 'Document has more than one main landmark'
		}
	}
};

export default pageNoDuplicateMainMetadata;