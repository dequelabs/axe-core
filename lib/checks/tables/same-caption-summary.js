import sameCaptionSummaryEvaluate from './same-caption-summary-evaluate';

const sameCaptionSummaryMetadata = {
	id: 'same-caption-summary',
	evaluate: sameCaptionSummaryEvaluate,
	metadata: {
		impact: 'minor',
		message: {
			pass: 'Content of summary attribute and <caption> are not duplicated',
			fail: 'Content of summary attribute and <caption> element are identical'
		}
	}
};

export default sameCaptionSummaryMetadata;