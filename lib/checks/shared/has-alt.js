import hasAltEvaluate from './has-alt-evaluate';

const hasAltMetadata = {
	id: 'has-alt',
	evaluate: hasAltEvaluate,
	metadata: {
		impact: 'critical',
		message: {
			pass: 'Element has an alt attribute',
			fail: 'Element does not have an alt attribute'
		}
	}
};

export default hasAltMetadata;