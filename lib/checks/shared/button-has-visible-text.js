import buttonHasVisibleTextEvaluate from './button-has-visible-text-evaluate';

const buttonHasVisibleTextMetadata = {
	id: 'button-has-visible-text',
	evaluate: buttonHasVisibleTextEvaluate,
	metadata: {
		impact: 'critical',
		message: {
			pass: 'Element has inner text that is visible to screen readers',
			fail: 'Element does not have inner text that is visible to screen readers'
		}
	}
};

export default buttonHasVisibleTextMetadata;