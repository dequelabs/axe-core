import ariaRequiredParentEvaluate from './aria-required-parent-evaluate';

const ariaRequiredParentMetadata = {
	id: 'aria-required-parent',
	evaluate: ariaRequiredParentEvaluate,
	metadata: {
		impact: 'critical',
		messages: {
			pass: 'Required ARIA parent role present',
			fail: 'Required ARIA parent{{=it.data && it.data.length > 1 ? "s" : ""}} role not present:{{~it.data:value}} {{=value}}{{~}}'
		}
	}
};

export default ariaRequiredParentMetadata;