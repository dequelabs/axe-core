import focusableDisabledEvaluate from './focusable-disabled-evaluate';

const focusableDisabledMetadata = {
	id: 'focusable-disabled',
	evaluate: focusableDisabledEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'No focusable elements contained within element',
			fail: 'Focusable content should be disabled or be removed from the DOM'
		}
	}
};

export default focusableDisabledMetadata;