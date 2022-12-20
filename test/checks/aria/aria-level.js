describe('aria-prohibited-attr', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;
  var checkEvaluate = axe.testUtils.getCheckEvaluate('aria-level');

  afterEach(function () {
    checkContext.reset();
  });

  it('should return true if aria-level is less than 6', function () {
    var params = checkSetup('<div id="target" aria-level="2">Contents</div>');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should return true if aria-level is 6', function () {
    var params = checkSetup('<div id="target" aria-level="6">Contents</div>');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should return true if aria-level is negative', function () {
    var params = checkSetup('<div id="target" aria-level="-2">Contents</div>');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should return true if there is no aria-level', function () {
    var params = checkSetup('<div id="target">Contents</div>');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should return undefined if aria-level is greater than 6', function () {
    var params = checkSetup('<div id="target" aria-level="8">Contents</div>');
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
  });
});
