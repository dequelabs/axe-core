/*global AnalysisRuleResult */
describe('AnalysisRuleResult', function () {
  'use strict';

  it('should be a function', function () {
    assert.isFunction(AnalysisRuleResult);
  });

  it('should have an id', function () {
    var result = new AnalysisRuleResult({id: 'monkeys'});
    assert.equal(result.id, 'monkeys');
  });

  it('should set `result` to `null`', function () {
    var result = new AnalysisRuleResult({});
    assert.isNull(result.result);
  });

  it('should set `node` to `null`', function () {
    var result = new AnalysisRuleResult({});
    assert.isNull(result.node);
  });

});
