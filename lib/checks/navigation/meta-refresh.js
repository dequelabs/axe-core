import metaRefreshEvaluate from './meta-refresh-evaluate';

const metaRefreshMetadata = {
	id: 'meta-refresh',
	evaluate: metaRefreshEvaluate,
	metadata: {
		impact: 'critical',
		message: {
			"pass": "<meta> tag does not immediately refresh the page",
			"fail": "<meta> tag forces timed refresh of page"
		}
	}
};

export default metaRefreshMetadata;