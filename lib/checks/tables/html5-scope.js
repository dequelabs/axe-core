import html5ScopeEvaluate from './html5-scope-evaluate';

const html5ScopeMetadata = {
	id: 'html5-scope',
	evaluate: html5ScopeEvaluate,
	metadata: {
		impact: 'moderate',
		message: {
			"pass": "Scope attribute is only used on table header elements (<th>)",
			"fail": "In HTML 5, scope attributes may only be used on table header elements (<th>)"
		}
	}
};

export default html5ScopeMetadata;