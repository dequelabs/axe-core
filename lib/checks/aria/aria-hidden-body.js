import ariaHiddenBodyEvaluate from './aria-hidden-body-evaluate';

const metadata = {
	id: 'aria-hidden-body',
	evaluate: ariaHiddenBodyEvaluate,
	metadata: {
		impact: 'critical',
		messages: {
			pass: 'No aria-hidden attribute is present on document body',
			fail: 'aria-hidden=true should not be present on the document body'
		}
	}
};

export default metadata;