describe('utils.RuleError', () => {
  const RuleError = axe.utils.RuleError;

  it('returns a serializable error', () => {
    const error = new Error('test');
    const ruleError = new RuleError({ error });
    assert.ownInclude(ruleError, {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
  });

  it('returns a instanceof Error', () => {
    const error = new Error('test');
    const ruleError = new RuleError({ error });
    assert.instanceOf(ruleError, Error);
  });

  it('includes the ruleId if provided', () => {
    const error = new Error('test');
    const ruleError = new RuleError({ error, ruleId: 'aria' });
    assert.equal(ruleError.ruleId, 'aria');
    assert.include(ruleError.message, 'Skipping aria rule.');
  });

  it('includes the method if provided', () => {
    const error = new Error('test');
    const ruleError = new RuleError({ error, method: '#matches' });
    assert.equal(ruleError.method, '#matches');
  });

  it('includes the errorNode if provided', () => {
    const error = new Error('test');
    const ruleError = new RuleError({ error, errorNode: 'err' });
    assert.equal(ruleError.errorNode, 'err');
  });

  it('includes a serialized cause if provided', () => {
    const error = new Error('test');
    error.cause = new Error('cause');
    const ruleError = new RuleError({ error });
    assert.deepEqual(ruleError.cause, axe.utils.serializeError(error.cause));
  });
});
