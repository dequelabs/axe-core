import duplicateIdEvaluate from './duplicate-id-evaluate';
import duplicateIdAfter from './duplicate-id-after';

const duplicateIdActiveMetadata = {
	id: 'duplicate-id-active',
	evaluate: duplicateIdEvaluate,
	after: duplicateIdAfter,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'Document has no active elements that share the same id attribute',
			fail: 'Document has active elements with the same id attribute: {{=it.data}}'
		}
	}
};

export default duplicateIdActiveMetadata;