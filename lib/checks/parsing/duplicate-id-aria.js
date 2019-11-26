import duplicateIdEvaluate from './duplicate-id-evaluate';
import duplicateIdAfter from './duplicate-id-after';

const duplicateIdAriaMetadata = {
	id: 'duplicate-id-aria',
	evaluate: duplicateIdEvaluate,
	after: duplicateIdAfter,
	metadata: {
		impact: 'critical',
		message: {
			"pass": "Document has no elements referenced with ARIA or labels that share the same id attribute",
			"fail": "Document has multiple elements referenced with ARIA with the same id attribute: {{=it.data}}"
		}
	}
};

export default duplicateIdAriaMetadata;