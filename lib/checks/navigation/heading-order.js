import headingOrderEvaluate from './heading-order-evaluate';
import headingOrderAfter from './heading-order-after';

const headingOrderMetadata = {
	id: 'heading-order',
	evaluate: headingOrderEvaluate,
	after: headingOrderAfter,
	metadata: {
		impact: 'moderate',
		message: {
			pass: 'Heading order valid',
			fail: 'Heading order invalid'
		}
	}
};

export default headingOrderMetadata;