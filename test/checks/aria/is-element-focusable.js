describe('is-element-focusable', function () {
  'use strict';

  let checkSetup = axe.testUtils.checkSetup;
  let checkContext = axe.testUtils.MockCheckContext();
  let isFocusable = axe.testUtils.getCheckEvaluate('is-element-focusable');

  afterEach(function () {
    checkContext.reset();
  });

  it('should return true for div with a tabindex', function () {
    let params = checkSetup('<div tabIndex="1" id="target"></div>');
    assert.isTrue(isFocusable.apply(checkContext, params));
  });

  it('should return false for natively unfocusable element', function () {
    let params = checkSetup('<span role="link" href="#" id="target"></span>');
    assert.isFalse(isFocusable.apply(checkContext, params));
  });
});
