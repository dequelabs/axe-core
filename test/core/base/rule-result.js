describe('RuleResult', () => {
  const RuleResult = axe._thisWillBeDeletedDoNotUse.base.RuleResult;

  it('should be a function', () => {
    assert.isFunction(RuleResult);
  });

  it('should have an empty array for nodes', () => {
    assert.deepEqual(new RuleResult({ id: 'monkeys' }).nodes, []);
  });

  it('should grab id from passed in rule', () => {
    const result = new RuleResult({ id: 'monkeys' });
    assert.equal(result.id, 'monkeys');
  });
});
