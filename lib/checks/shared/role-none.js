import roleNoneEvaluate from './role-none-evaluate';

const roleNoneMetadata = {
	id: 'role-none',
	evaluate: roleNoneEvaluate,
	metadata: {
		impact: 'minor',
		message: {
			pass: 'Element\'s default semantics were overriden with role="none"',
			fail: 'Element\'s default semantics were not overridden with role="none"'
		}
	}
};

export default roleNoneMetadata;