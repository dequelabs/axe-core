describe('aria-busy', function () {
  'use strict';

  let checkContext = axe.testUtils.MockCheckContext();
  let checkSetup = axe.testUtils.checkSetup;
  let checkEvaluate = axe.testUtils.getCheckEvaluate('aria-busy');

  afterEach(function () {
    checkContext.reset();
  });

  it('should return false if no aria-busy tag on element', function () {
    let params = checkSetup('<div id="target" role="list"></div>');
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should return false if aria-busy is set to false', function () {
    let params = checkSetup(
      '<div id="target" role="list" aria-busy="false"></div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should return true if aria-busy is set to true', function () {
    let params = checkSetup(
      '<div id="target" role="list" aria-busy="true"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });
});
