import pageNoDuplicateEvaluate from './page-no-duplicate';

const pageNoDuplicateContentinfoMetadata = {
	id: 'page-no-duplicate-contentinfo',
	evaluate: pageNoDuplicateEvaluate,
	options: {
		selector: 'footer:not([role]), [role=contentinfo]',
		nativeScopeFilter: 'article, aside, main, nav, section'
	},
	metadata: {
		impact: 'moderate',
		message: {
			pass: 'Document does not have more than one contentinfo landmark',
			fail: 'Document has more than one contentinfo landmark'
		}
	}
};

export default pageNoDuplicateContentinfoMetadata;