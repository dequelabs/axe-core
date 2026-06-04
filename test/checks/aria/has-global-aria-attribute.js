describe('has-global-aria-attribute', () => {
  const checkSetup = axe.testUtils.checkSetup;
  const checkContext = axe.testUtils.MockCheckContext();
  const hasGlobalAriaAttribute = axe.testUtils.getCheckEvaluate(
    'has-global-aria-attribute'
  );

  afterEach(() => {
    checkContext.reset();
  });

  it('should return true if any global ARIA attributes are found', () => {
    const params = checkSetup('<div aria-label="hello" id="target"></div>');
    assert.isTrue(hasGlobalAriaAttribute.apply(checkContext, params));
  });

  it('should return false if no valid ARIA attributes are found', () => {
    const params = checkSetup('<div aria-random="hello" id="target"></div>');
    assert.isFalse(hasGlobalAriaAttribute.apply(checkContext, params));
  });
});
