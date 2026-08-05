describe('has-visible-text', () => {
  const checkSetup = axe.testUtils.checkSetup;
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    checkContext.reset();
  });

  it('should return false if there is no visible text', () => {
    const params = checkSetup('<p id="target"></p>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-visible-text')
        .apply(checkContext, params)
    );
  });

  it('should return false if there is text, but its hidden', () => {
    const params = checkSetup(
      '<p id="target"><span style="display:none">hello!</span></p>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-visible-text')
        .apply(checkContext, params)
    );
  });

  it('should return true if there is visible text', () => {
    const params = checkSetup('<p id="target">hello!</p>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-visible-text')
        .apply(checkContext, params)
    );
  });

  describe('SerialVirtualNode', () => {
    it('should return false if element is not named from contents', () => {
      const node = new axe.SerialVirtualNode({
        nodeName: 'article'
      });

      assert.isFalse(
        axe.testUtils.getCheckEvaluate('has-visible-text')(null, {}, node)
      );
    });

    it('should return incomplete if no other properties are set', () => {
      const node = new axe.SerialVirtualNode({
        nodeName: 'button'
      });

      assert.isUndefined(
        axe.testUtils.getCheckEvaluate('has-visible-text')(null, {}, node)
      );
    });

    it('should return false if there is no visible text', () => {
      const node = new axe.SerialVirtualNode({
        nodeName: 'button'
      });
      node.children = [];

      assert.isFalse(
        axe.testUtils.getCheckEvaluate('has-visible-text')(null, {}, node)
      );
    });

    it('should return true if there is visible text', () => {
      const node = new axe.SerialVirtualNode({
        nodeName: 'p'
      });
      const child = new axe.SerialVirtualNode({
        nodeName: '#text',
        nodeType: 3,
        nodeValue: 'hello!'
      });
      node.children = [child];

      assert.isTrue(
        axe.testUtils.getCheckEvaluate('has-visible-text')(null, {}, node)
      );
    });
  });
});
