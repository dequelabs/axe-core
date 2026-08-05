describe('is-element-focusable', () => {
  const checkSetup = axe.testUtils.checkSetup;
  const checkContext = axe.testUtils.MockCheckContext();
  const isFocusable = axe.testUtils.getCheckEvaluate('is-element-focusable');

  afterEach(() => {
    checkContext.reset();
  });

  it('should return true for div with a tabindex', () => {
    const params = checkSetup('<div tabIndex="1" id="target"></div>');
    assert.isTrue(isFocusable.apply(checkContext, params));
  });

  it('should return false for natively unfocusable element', () => {
    const params = checkSetup('<span role="link" href="#" id="target"></span>');
    assert.isFalse(isFocusable.apply(checkContext, params));
  });
});
