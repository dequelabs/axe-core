function SupportError(error) {
	this.name = 'SupportError';
	this.cause = error.cause;
	this.message = `\`${error.cause}\` - feature unsupported in your environment.`;
	if (error.ruleId) {
		this.ruleId = error.ruleId;
		this.message += ` Skipping ${this.ruleId} rule.`;
	}
	this.stack = new Error().stack;
}
SupportError.prototype = Object.create(Error.prototype);
SupportError.prototype.constructor = SupportError;

export default SupportError;
