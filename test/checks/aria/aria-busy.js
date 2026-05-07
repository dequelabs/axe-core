describe('aria-busy', () => {
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('aria-busy');

  afterEach(() => {
    checkContext.reset();
  });

  it('should return false if no aria-busy tag on element', () => {
    const params = checkSetup('<div id="target" role="list"></div>');
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should return false if aria-busy is set to false', () => {
    const params = checkSetup(
      '<div id="target" role="list" aria-busy="false"></div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should return true if aria-busy is set to true', () => {
    const params = checkSetup(
      '<div id="target" role="list" aria-busy="true"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });
});
