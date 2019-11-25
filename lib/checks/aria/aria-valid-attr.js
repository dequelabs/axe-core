import ariaValidAttrEvaluate from './aria-valid-attr-evaluate';

const ariaValidAttrMetadata = {
	id: 'aria-valid-attr',
	evaluate: ariaValidAttrEvaluate,
	options: [],
	metadata: {
		impact: 'critical',
		messages: {
			pass: 'ARIA attribute name{{=it.data && it.data.length > 1 ? "s" : ""}} are valid',
			fail: 'Invalid ARIA attribute name{{=it.data && it.data.length > 1 ? "s" : ""}}:{{~it.data:value}} {{=value}}{{~}}'
		}
	}
};

export default ariaValidAttrMetadata;