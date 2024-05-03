describe('has-global-aria-attribute', function () {
  'use strict';

  let checkSetup = axe.testUtils.checkSetup;
  let checkContext = axe.testUtils.MockCheckContext();
  let hasGlobalAriaAttribute = axe.testUtils.getCheckEvaluate(
    'has-global-aria-attribute'
  );

  afterEach(function () {
    checkContext.reset();
  });

  it('should return true if any global ARIA attributes are found', function () {
    let params = checkSetup('<div aria-label="hello" id="target"></div>');
    assert.isTrue(hasGlobalAriaAttribute.apply(checkContext, params));
  });

  it('should return false if no valid ARIA attributes are found', function () {
    let params = checkSetup('<div aria-random="hello" id="target"></div>');
    assert.isFalse(hasGlobalAriaAttribute.apply(checkContext, params));
  });
});
