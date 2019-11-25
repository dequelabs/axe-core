import altSpaceValueEvaluate from './alt-space-value-evaluate';

const altSpaceValueMetadata = {
	id: 'alt-space-value',
	evaluate: altSpaceValueEvaluate,
	metadata: {
		impact: 'critical',
		message: {
			pass: 'Element has a valid alt attribute value',
			fail: 'Element has an alt attribute containing only a space character, which is not ignored by all screen readers'
		}
	}
};

export default altSpaceValueMetadata;