import serializeError from './serialize-error';

export default class RuleError extends Error {
  constructor({ error, ruleId, method, errorNode }) {
    super();
    this.name = error.name ?? 'RuleError';
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
}
