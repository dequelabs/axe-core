describe('CheckResult', () => {
  const CheckResult = axe._thisWillBeDeletedDoNotUse.base.CheckResult;
  it('should be a function', () => {
    assert.isFunction(CheckResult);
  });

  it('should have an id', () => {
    const result = new CheckResult({ id: 'monkeys' });
    assert.equal(result.id, 'monkeys');
  });

  it('should set `data` to `null`', () => {
    const result = new CheckResult({});
    assert.isNull(result.data);
  });

  it('should set `relatedNodes` to `[]`', () => {
    const result = new CheckResult({});
    assert.deepEqual(result.relatedNodes, []);
  });

  it('should set `result` to `null`', () => {
    const result = new CheckResult({});
    assert.isNull(result.result);
  });
});
