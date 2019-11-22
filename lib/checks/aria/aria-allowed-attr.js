import ariaAllowedAttrEvaluate from './aria-allowed-attr-evaluate';

const ariaAllowedAttrMetadata = {
	id: 'aria-allowed-attr',
	evaluate: ariaAllowedAttrEvaluate,
	metadata: {
		impact: 'critical',
		messages: {
			pass: 'ARIA attributes are used correctly for the defined role',
			fail: 'ARIA attribute{{=it.data && it.data.length > 1 ? "s are" : " is"}} not allowed:{{~it.data:value}} {{=value}}{{~}}'
		}
	}
};

export default ariaAllowedAttrMetadata;