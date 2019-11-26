import hasSummaryEvaluate from './has-summary-evaluate';

const hasSummaryMetadata = {
	id: 'has-summary',
	evaluate: hasSummaryEvaluate,
	deprecated: true,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'Layout table does not use summary attribute',
			fail: 'Layout table uses summary attribute'
		}
	}
};

export default hasSummaryMetadata;