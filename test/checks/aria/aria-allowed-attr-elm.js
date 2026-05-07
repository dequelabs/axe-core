describe('aria-allowed-attr-elm', () => {
  const queryFixture = axe.testUtils.queryFixture;
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    checkContext.reset();
  });

  it('should pass for br with aria-hidden', () => {
    const vNode = queryFixture('<br aria-hidden="true" id="target">');

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr-elm')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should pass for wbr with aria-hidden', () => {
    const vNode = queryFixture('<wbr aria-hidden="false" id="target">');

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr-elm')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should fail for br with disallowed aria attribute', () => {
    const vNode = queryFixture('<br aria-busy="true" id="target">');

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr-elm')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'singular',
      nodeName: 'br',
      values: 'aria-busy="true"'
    });
  });

  it('should fail for wbr with disallowed aria attribute', () => {
    const vNode = queryFixture('<wbr aria-busy="true" id="target">');

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr-elm')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'singular',
      nodeName: 'wbr',
      values: 'aria-busy="true"'
    });
  });

  it('should pass for br with non-global aria attribute', () => {
    const vNode = queryFixture('<br aria-expanded="true" id="target">');

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr-elm')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should pass for br with explicit role', () => {
    const vNode = queryFixture(
      '<br role="heading" aria-busy="true" id="target">'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr-elm')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should pass for element without allowedAriaAttrs restriction', () => {
    const vNode = queryFixture('<div aria-busy="true" id="target"></div>');

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr-elm')
        .call(checkContext, null, null, vNode)
    );
  });
});
