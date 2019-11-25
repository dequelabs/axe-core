import accesskeyEvaluate from './accesskeys-evaluate';
import accesskeysAfter from './accesskeys-after';

const accesskeysMetadata = {
	id: 'accesskeys',
	evaluate: accesskeyEvaluate,
	after: accesskeysAfter,
	metadata: {
		impact: 'serious',
		messages: {
			pass: 'Accesskey attribute value is unique',
			fail: 'Document has multiple elements with the same accesskey'
		}
	}
};

export default accesskeysMetadata;