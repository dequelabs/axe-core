import duplicateIdAriaEvaluate from './duplicate-id-aria-evaluate';
import duplicateIdAriaAfter from './duplicate-id-aria-after';

const duplicateIdAriaMetadata = {
	id: 'duplicate-id-aria',
	evaluate: duplicateIdAriaEvaluate,
	after: duplicateIdAriaAfter,
	metadata: {
		impact: 'critical',
		message: {
			"pass": "Document has no elements referenced with ARIA or labels that share the same id attribute",
			"fail": "Document has multiple elements referenced with ARIA with the same id attribute: {{=it.data}}"
		}
	}
};

export default duplicateIdAriaMetadata;