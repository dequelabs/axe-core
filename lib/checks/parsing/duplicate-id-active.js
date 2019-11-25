import duplicateIdActiveEvaluate from './duplicate-id-active-evaluate';
import duplicateIdActiveAfter from './duplicate-id-active-after';

const duplicateIdActiveMetadata = {
	id: 'duplicate-id-active',
	evaluate: duplicateIdActiveEvaluate,
	after: duplicateIdActiveAfter,
	metadata: {
		impact: 'serious',
		message: {
			"pass": "Document has no active elements that share the same id attribute",
			"fail": "Document has active elements with the same id attribute: {{=it.data}}"
		}
	}
};

export default duplicateIdActiveMetadata;