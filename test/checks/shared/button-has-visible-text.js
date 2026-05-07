describe('button-has-visible-text', () => {
  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return false if button element is empty', () => {
    const checkArgs = checkSetup('<button></button>', 'button');

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('button-has-visible-text')
        .apply(checkContext, checkArgs)
    );
  });

  it('should return true if a button element has text', () => {
    const checkArgs = checkSetup('<button>Name</button>', 'button');

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('button-has-visible-text')
        .apply(checkContext, checkArgs)
    );
  });

  it('should return true if ARIA button has text', () => {
    const checkArgs = checkSetup(
      '<div role="button">Text</div>',
      '[role=button]'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('button-has-visible-text')
        .apply(checkContext, checkArgs)
    );
  });

  it('should return false if ARIA button has no text', () => {
    const checkArgs = checkSetup('<div role="button"></div>', '[role=button]');

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('button-has-visible-text')
        .apply(checkContext, checkArgs)
    );
  });

  describe('SerialVirtualNode', () => {
    it('should return incomplete if no children are passed', () => {
      const node = new axe.SerialVirtualNode({
        nodeName: 'button'
      });

      assert.isUndefined(
        axe.testUtils.getCheckEvaluate('button-has-visible-text')(
          null,
          {},
          node
        )
      );
    });

    it('should return false if button element is empty', () => {
      const node = new axe.SerialVirtualNode({
        nodeName: 'button'
      });
      node.children = [];

      assert.isFalse(
        axe.testUtils.getCheckEvaluate('button-has-visible-text')(
          null,
          {},
          node
        )
      );
    });

    it('should return true if a button element has text', () => {
      const node = new axe.SerialVirtualNode({
        nodeName: 'button'
      });
      const child = new axe.SerialVirtualNode({
        nodeName: '#text',
        nodeType: 3,
        nodeValue: 'Text'
      });
      node.children = [child];

      assert.isTrue(
        axe.testUtils.getCheckEvaluate('button-has-visible-text')(
          null,
          {},
          node
        )
      );
    });
  });
});
