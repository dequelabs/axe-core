describe('aria-hidden', () => {
  const checkContext = axe.testUtils.MockCheckContext();
  const body = document.body;
  afterEach(() => {
    checkContext.reset();
    body.removeAttribute('aria-hidden');
  });

  it('should not be present on document.body', () => {
    const tree = axe.testUtils.flatTreeSetup(body);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-hidden-body')
        .call(checkContext, null, {}, tree[0])
    );
  });

  it('fails appropriately if aria-hidden=true on document.body', () => {
    body.setAttribute('aria-hidden', true);
    const tree = axe.testUtils.flatTreeSetup(body);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-hidden-body')
        .call(checkContext, null, {}, tree[0])
    );
  });

  it('passes if aria-hidden=false on document.body', () => {
    body.setAttribute('aria-hidden', 'false');
    const tree = axe.testUtils.flatTreeSetup(body);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-hidden-body')
        .call(checkContext, null, {}, tree[0])
    );
  });
});
