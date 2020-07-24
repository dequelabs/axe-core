/*exported axe, commons */
/*global axeFunction, module, define */
// exported namespace for axe
/*eslint no-use-before-define: 0, no-unused-vars: 0*/
var axe = axe || {};
axe.version = '<%= pkg.version %>';

if (
	typeof module === 'object' &&
	module.exports &&
	typeof axeFunction.toString === 'function'
) {
	axe.source =
		'(' +
		axeFunction.toString() +
		')(typeof window === "object" ? window : this);';
}

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
