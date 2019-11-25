import ariaUnsupportedAttrEvaluate from './aria-unsupported-attr-evaluate';

const ariaUnsupportedAttrMetadata = {
	id: 'aria-unsupported-attr',
	evaluate: ariaUnsupportedAttrEvaluate,
	metadata: {
		impact: 'critical',
		messages: {
			pass: 'ARIA attribute is supported',
			fail: 'ARIA attribute is not widely supported in screen readers and assistive technologies: {{~it.data:value}} {{=value}}{{~}}'
		}
	}
};

export default ariaUnsupportedAttrMetadata;