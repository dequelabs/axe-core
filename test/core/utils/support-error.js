describe('utils.SupportError', () => {
  const SupportError = axe.utils.SupportError;

  it('returns a serializable error', () => {
    const error = new Error('test');
    const supportError = new SupportError({ error });
    assert.ownInclude(supportError, {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
  });

  it('returns a instanceof Error', () => {
    const error = new Error('test');
    const supportError = new SupportError({ error });
    assert.instanceOf(supportError, Error);
  });

  it('includes the ruleId if provided', () => {
    const error = new Error('test');
    const supportError = new SupportError({ error, ruleId: 'aria' });
    assert.equal(supportError.ruleId, 'aria');
    assert.include(supportError.message, 'Skipping aria rule.');
  });

  it('includes the method if provided', () => {
    const error = new Error('test');
    const supportError = new SupportError({ error, method: '#matches' });
    assert.equal(supportError.method, '#matches');
  });

  it('includes the errorNode if provided', () => {
    const error = new Error('test');
    const supportError = new SupportError({ error, errorNode: 'err' });
    assert.equal(supportError.errorNode, 'err');
  });

  it('includes a serialized cause if provided', () => {
    const error = new Error('test');
    error.cause = new Error('cause');
    const supportError = new SupportError({ error });
    assert.deepEqual(supportError.cause, axe.utils.serializeError(error.cause));
  });
});
