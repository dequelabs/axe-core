describe('aria-busy', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;
  var checkEvaluate = axe.testUtils.getCheckEvaluate('aria-busy');

  afterEach(function () {
    checkContext.reset();
  });

  it('should return false if no aria-busy tag on element', function () {
    var params = checkSetup('<div id="target" role="list"></div>');
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should return false if aria-busy is set to false', function () {
    var params = checkSetup(
      '<div id="target" role="list" aria-busy="false"></div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should return true if aria-busy is set to true', function () {
    var params = checkSetup(
      '<div id="target" role="list" aria-busy="true"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });
});
