import scopeValueEvaluate from './scope-value-evaluate';

const scopeValueMetadata = {
	id: 'scope-value',
	evaluate: scopeValueEvaluate,
	metadata: {
		impact: 'critical',
		message: {
			"pass": "Scope attribute is used correctly",
			"fail": "The value of the scope attribute may only be 'row' or 'col'"
		}
	}
};

export default scopeValueMetadata;