describe('RuleResult', function () {
  'use strict';
  let RuleResult = axe._thisWillBeDeletedDoNotUse.base.RuleResult;

  it('should be a function', function () {
    assert.isFunction(RuleResult);
  });

  it('should have an empty array for nodes', function () {
    assert.deepEqual(new RuleResult({ id: 'monkeys' }).nodes, []);
  });

  it('should grab id from passed in rule', function () {
    let result = new RuleResult({ id: 'monkeys' });
    assert.equal(result.id, 'monkeys');
  });
});
