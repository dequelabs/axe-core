describe('has-global-aria-attribute', function () {
  'use strict';

  var checkSetup = axe.testUtils.checkSetup;
  var checkContext = axe.testUtils.MockCheckContext();
  var hasGlobalAriaAttribute = axe.testUtils.getCheckEvaluate(
    'has-global-aria-attribute'
  );

  afterEach(function () {
    checkContext.reset();
  });

  it('should return true if any global ARIA attributes are found', function () {
    var params = checkSetup('<div aria-label="hello" id="target"></div>');
    assert.isTrue(hasGlobalAriaAttribute.apply(checkContext, params));
  });

  it('should return false if no valid ARIA attributes are found', function () {
    var params = checkSetup('<div aria-random="hello" id="target"></div>');
    assert.isFalse(hasGlobalAriaAttribute.apply(checkContext, params));
  });
});
