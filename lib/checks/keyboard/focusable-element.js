import focusableElementEvaluate from './focusable-element-evaluate';

const focusableElementMetadata = {
	id: 'focusable-element',
	evaluate: focusableElementEvaluate,
	metadata: {
		impact: 'moderate',
		message: {
			pass: 'Element is focusable',
			fail: 'Element should be focusable'
		}
	}
};

export default focusableElementMetadata;