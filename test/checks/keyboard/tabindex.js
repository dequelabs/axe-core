describe('tabindex', () => {
  const checkContext = axe.testUtils.MockCheckContext();
  const queryFixture = axe.testUtils.queryFixture;

  afterEach(() => {
    checkContext.reset();
  });

  it('should fail if the testutils.jstabindex is >= 0', () => {
    const vNode = queryFixture('<div id="target" tabindex="1"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('tabindex')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should pass if the tabindex is <= 0', () => {
    const vNode = queryFixture('<div id="target" tabindex="0"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('tabindex')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should look at the attribute and not the property', () => {
    const node = document.createElement('div');
    node.setAttribute('tabindex', '1');
    node.tabindex = null;
    const tree = axe.testUtils.flatTreeSetup(node);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('tabindex')
        .call(checkContext, null, {}, tree[0])
    );
  });

  it('should pass if tabindex is NaN', () => {
    const vNode = queryFixture('<div id="target" tabindex="foobar"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('tabindex')
        .call(checkContext, null, {}, vNode)
    );
  });
});
