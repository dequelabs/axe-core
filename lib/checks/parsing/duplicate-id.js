import duplicateIdEvaluate from './duplicate-id-evaluate';
import duplicateIdAfter from './duplicate-id-after';

const duplicateIdMetadata = {
	id: 'duplicate-id',
	evaluate: duplicateIdEvaluate,
	after: duplicateIdAfter,
	metadata: {
		impact: 'minor',
		message: {
			"pass": "Document has no static elements that share the same id attribute",
			"fail": "Document has multiple static elements with the same id attribute"
		}
	}
};

export default duplicateIdMetadata;