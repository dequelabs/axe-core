class SupportError extends Error {
	constructor(error) {
		super();

		this.name = 'SupportError';
		this.cause = error.cause;
		this.message = `\`${error.cause}\` - feature unsupported in your environment.`;
		if (error.ruleId) {
			this.ruleId = error.ruleId;
			this.message += ` Skipping ${this.ruleId} rule.`;
		}
	}
}

export default SupportError;
