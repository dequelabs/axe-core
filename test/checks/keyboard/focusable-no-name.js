describe('focusable-no-name', () => {
  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;
  const shadowCheckSetup = axe.testUtils.shadowCheckSetup;

  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
    checkContext.reset();
  });

  it('should pass if tabindex < 0', () => {
    const params = checkSetup('<a href="#" tabindex="-1" id="target"></a>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('focusable-no-name')
        .apply(checkContext, params)
    );
  });

  it('should pass element is not natively focusable', () => {
    const params = checkSetup('<span role="link" href="#" id="target"></span>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('focusable-no-name')
        .apply(checkContext, params)
    );
  });

  it('should fail if element is tabbable with no name - native', () => {
    const params = checkSetup('<a href="#" id="target"></a>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('focusable-no-name')
        .apply(checkContext, params)
    );
  });

  it('should fail if element is tabbable with no name - ARIA', () => {
    const params = checkSetup(
      '<span tabindex="0" role="link" id="target" href="#"></spam>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('focusable-no-name')
        .apply(checkContext, params)
    );
  });

  it('should pass if the element is tabbable but has an accessible name', () => {
    const params = checkSetup('<a href="#" title="Hello" id="target"></a>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('focusable-no-name')
        .apply(checkContext, params)
    );
  });

  it('should pass if the content is passed in with shadow DOM', () => {
    const params = shadowCheckSetup(
      '<div>Content!</div>',
      '<a href="#" id="target"><slot></slot></a>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('focusable-no-name')
        .apply(checkContext, params)
    );
  });

  describe('Serial Virtual Node', () => {
    it('should pass if tabindex < 0', () => {
      const serialNode = new axe.SerialVirtualNode({
        nodeName: 'a',
        attributes: {
          tabindex: '-1',
          href: '#'
        }
      });

      assert.isFalse(
        axe.testUtils.getCheckEvaluate('focusable-no-name')(
          null,
          {},
          serialNode
        )
      );
    });

    it('should pass element is not natively focusable', () => {
      const serialNode = new axe.SerialVirtualNode({
        nodeName: 'span',
        attributes: {
          role: 'link',
          href: '#'
        }
      });

      assert.isFalse(
        axe.testUtils.getCheckEvaluate('focusable-no-name')(
          null,
          {},
          serialNode
        )
      );
    });

    it('should fail if element is tabbable with no name - native', () => {
      const serialNode = new axe.SerialVirtualNode({
        nodeName: 'a',
        attributes: {
          href: '#'
        }
      });
      serialNode.children = [];

      assert.isTrue(
        axe.testUtils.getCheckEvaluate('focusable-no-name')(
          null,
          {},
          serialNode
        )
      );
    });

    it('should return undefined if element is tabbable with no name nor children - native', () => {
      const serialNode = new axe.SerialVirtualNode({
        nodeName: 'a',
        attributes: {
          href: '#'
        }
      });

      assert.isUndefined(
        axe.testUtils.getCheckEvaluate('focusable-no-name')(
          null,
          {},
          serialNode
        )
      );
    });

    it('should pass if the element is tabbable but has an accessible name', () => {
      const serialNode = new axe.SerialVirtualNode({
        nodeName: 'a',
        attributes: {
          href: '#',
          title: 'Hello'
        }
      });
      serialNode.children = [];

      assert.isFalse(
        axe.testUtils.getCheckEvaluate('focusable-no-name')(
          null,
          {},
          serialNode
        )
      );
    });
  });
});
