import validScrollableSemanticsEvaluate from './valid-scrollable-semantics-evaluate';

const validScrollableSemanticsMetadata = {
	id: 'valid-scrollable-semantics',
	evaluate: validScrollableSemanticsEvaluate,
	options: [],
	metadata: {
		impact: 'minor',
		messages: {
			pass: 'Element has valid semantics for an element in the focus order.',
			fail: 'Element has invalid semantics for an element in the focus order.'
		}
	}
};

export default validScrollableSemanticsMetadata;