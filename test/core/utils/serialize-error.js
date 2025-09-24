describe('utils.serializeError', function () {
  const serializeError = axe.utils.serializeError;

  it('should serialize an error', () => {
    const error = new Error('test');
    const serialized = serializeError(error);
    assert.ownInclude(serialized, {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
  });

  it('should serialize known serializable properties', () => {
    const error = new Error('test');
    error.code = 'test';
    error.ruleId = 'test';
    error.method = 'test';
    const serialized = serializeError(error);
    assert.ownInclude(serialized, {
      code: error.code,
      ruleId: error.ruleId,
      method: error.method
    });
  });

  it('should serialize an error with a cause', () => {
    const error = new Error('test');
    error.cause = new Error('cause');
    const serialized = serializeError(error);
    assert.ownInclude(serialized.cause, {
      message: error.cause.message,
      stack: error.cause.stack,
      name: error.cause.name
    });
  });

  it('should serialize recursively', () => {
    const error = new Error('test');
    error.cause = new Error('cause');
    error.cause.cause = new Error('cause2');
    const serialized = serializeError(error);
    assert.ownInclude(serialized.cause.cause, {
      message: error.cause.cause.message,
      stack: error.cause.cause.stack,
      name: error.cause.cause.name
    });
  });

  it('should not serialize the cause if the stack exceeds 10 levels', () => {
    const error = new Error('test');
    error.cause = new Error('cause');
    error.cause.cause = new Error('cause2');
    error.cause.cause.cause = new Error('cause3');
    const serialized = serializeError(error, 9);
    assert.equal(serialized.cause.cause, '...');
  });
});
