import serializeError from './serialize-error';

export default function SupportError({ error, ruleId, method, errorNode }) {
  this.name = error.name ?? 'SupportError';
  this.message = error.message;
  this.stack = error.stack;
  if (error.cause) {
    this.cause = serializeError(error.cause);
  }
  if (ruleId) {
    this.ruleId = ruleId;
    this.message += ` Skipping ${this.ruleId} rule.`;
  }
  if (method) {
    this.method = method;
  }
  if (errorNode) {
    this.errorNode = errorNode;
  }
}

SupportError.prototype = Object.create(Error.prototype);
SupportError.prototype.constructor = SupportError;
