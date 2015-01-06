/*global ClassifierResult */
describe('ClassifierResult', function () {
  'use strict';

  it('should be a function', function () {
    assert.isFunction(ClassifierResult);
  });

  it('should have an id', function () {
    var result = new ClassifierResult({id: 'monkeys'});
    assert.equal(result.id, 'monkeys');
  });

  it('should set `result` to `null`', function () {
    var result = new ClassifierResult({});
    assert.isNull(result.result);
  });

  it('should set `node` to `null`', function () {
    var result = new ClassifierResult({});
    assert.isNull(result.node);
  });

});
