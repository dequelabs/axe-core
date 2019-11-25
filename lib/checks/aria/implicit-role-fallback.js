import implicitRoleFallbackEvaluate from './implicit-role-fallback-evaluate';

const implicitRoleFallbackMetadata = {
	id: 'implicit-role-fallback',
	evaluate: implicitRoleFallbackEvaluate,
	deprecated: true,
	metadata: {
		impact: 'moderate',
		messages: {
			pass: 'Element’s implicit ARIA role is an appropriate fallback',
			fail: 'Element’s implicit ARIA role is not a good fallback for the (unsupported) role'
		}
	}
};

export default implicitRoleFallbackMetadata;