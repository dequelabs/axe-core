import frameTestedEvaluate from './frame-tested-evaluate';

const frameTestedMetadata = {
	id: 'frame-tested',
	evaluate: frameTestedEvaluate,
	options: {
		isViolation: false
	},
	metadata: {
		impact: 'critical',
		message: {
			pass: 'The iframe was tested with axe-core',
			fail: 'The iframe could not be tested with axe-core',
			incomplete: 'The iframe still has to be tested with axe-core'
		}
	}
};

export default frameTestedMetadata;