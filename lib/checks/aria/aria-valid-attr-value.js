import ariaValidAttrValueEvaluate from './aria-valid-attr-value-evaluate';

const ariaValidAttrValueMetadata = {
	id: 'aria-valid-attr-value',
	evaluate: ariaValidAttrValueEvaluate,
	options: [],
	metadata: {
		impact: 'critical',
		messages: {
			pass: 'ARIA attribute values are valid',
			fail: 'Invalid ARIA attribute value{{=it.data && it.data.length > 1 ? "s" : ""}}:{{~it.data:value}} {{=value}}{{~}}',
			incomplete: 'ARIA attribute{{=it.data && it.data.length > 1 ? "s" : ""}} element ID does not exist on the page:{{~it.data:value}} {{=value}}{{~}}'
		}
	}
};

export default ariaValidAttrValueMetadata;