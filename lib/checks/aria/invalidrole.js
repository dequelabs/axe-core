import invalidroleEvaluate from './invalidrole-evaluate';

const invalidroleMetadata = {
	id: 'invalidrole',
	evaluate: invalidroleEvaluate,
	metadata: {
		impact: 'critical',
		messages: {
			pass: 'ARIA role is valid',
			fail: 'Role must be one of the valid ARIA roles'
		}
	}
};

export default invalidroleMetadata;