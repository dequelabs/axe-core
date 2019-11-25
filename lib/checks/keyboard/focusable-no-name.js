import focusableNoNameEvaluate from './focusable-no-name-evaluate';

const focusableNoNameMetadata = {
	id: 'focusable-no-name',
	evaluate: focusableNoNameEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'Element is not in tab order or has accessible text',
			fail: 'Element is in tab order and does not have accessible text'
		}
	}
};

export default focusableNoNameMetadata;