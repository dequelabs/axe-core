import focusableNotTabbableEvaluate from './focusable-not-tabbable-evaluate';

const focusableNotTabbableMetadata = {
	id: 'focusable-not-tabbable',
	evaluate: focusableNotTabbableEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'No focusable elements contained within element',
			fail: 'Focusable content should have tabindex="-1" or be removed from the DOM'
		}
	}
};

export default focusableNotTabbableMetadata;