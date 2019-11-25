import rolePresentationEvaluate from './role-presentation-evaluate';

const rolePresentationMetadata = {
	id: 'role-presentation',
	evaluate: rolePresentationEvaluate,
	metadata: {
		impact: 'minor',
		message: {
			"pass": "Element's default semantics were overriden with role=\"presentation\"",
			"fail": "Element's default semantics were not overridden with role=\"presentation\""
		}
	}
};

export default rolePresentationMetadata;