import ariaRequiredAttrEvaluate from './aria-required-attr-evaluate';

const ariaRequiredAttrMetadata = {
	id: 'aria-required-attr',
	evaluate: ariaRequiredAttrEvaluate,
	metadata: {
		impact: 'critical',
		messages: {
			pass: 'All required ARIA attributes are present',
			fail: 'Required ARIA attribute{{=it.data && it.data.length > 1 ? "s" : "}} not present:{{~it.data:value}} {{=value}}{{~}}'
		}
	}
};

export default ariaRequiredAttrMetadata;