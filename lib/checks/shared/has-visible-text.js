import hasVisibleTextEvaluate from './has-visible-text-evaluate';

const hasVisibleTextMetadata = {
	id: 'has-visible-text',
	evaluate: hasVisibleTextEvaluate,
	metadata: {
		impact: 'minor',
		message: {
			pass: 'Element has text that is visible to screen readers',
			fail: 'Element does not have text that is visible to screen readers'
		}
	}
};

export default hasVisibleTextMetadata;