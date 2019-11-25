import focusableContentEvaluate from './focusable-content-evaluate';

const focusableContentMetadata = {
	id: 'focusable-content',
	evaluate: focusableContentEvaluate,
	metadata: {
		impact: 'moderate',
		message: {
			pass: 'Element contains focusable elements',
			fail: 'Element should have focusable content'
		}
	}
};

export default focusableContentMetadata;