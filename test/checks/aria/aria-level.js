describe('aria-prohibited-attr', () => {
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('aria-level');

  afterEach(() => {
    checkContext.reset();
  });

  it('should return true if aria-level is less than 6', () => {
    const params = checkSetup('<div id="target" aria-level="2">Contents</div>');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should return true if aria-level is 6', () => {
    const params = checkSetup('<div id="target" aria-level="6">Contents</div>');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should return true if aria-level is negative', () => {
    const params = checkSetup(
      '<div id="target" aria-level="-2">Contents</div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should return true if there is no aria-level', () => {
    const params = checkSetup('<div id="target">Contents</div>');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should return undefined if aria-level is greater than 6', () => {
    const params = checkSetup('<div id="target" aria-level="8">Contents</div>');
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
  });
});
