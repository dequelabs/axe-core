describe('aria.hasAriaValue', () => {
  const { queryFixture, html } = axe.testUtils;
  const hasAriaValue = axe.commons.aria.hasAriaValue;
  const SerialVirtualNode = axe.SerialVirtualNode;

  it('returns true if element has attribute', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-label="hello"></div>`
    );

    assert.isTrue(hasAriaValue(vNode, 'aria-label'));
  });

  it('returns true if element has elementInternals', () => {
    const vNode = queryFixture(
      html`<testutils-element id="target"></testutils-element>`
    );
    const node = vNode.actualNode;
    node._internals.ariaLabel = 'hello';

    assert.isTrue(hasAriaValue(vNode, 'aria-label'));
  });

  it('returns true if attribute is empty', () => {
    const vNode = queryFixture(html`<div id="target" aria-label=""></div>`);

    assert.isTrue(hasAriaValue(vNode, 'aria-label'));
  });

  it('returns true if elementInternals is empty', () => {
    const vNode = queryFixture(
      html`<testutils-element id="target"></testutils-element>`
    );
    const node = vNode.actualNode;
    node._internals.ariaLabel = '';

    assert.isTrue(hasAriaValue(vNode, 'aria-label'));
  });

  it('returns true if elementInternals idrefs is empty', () => {
    const vNode = queryFixture(
      html`<testutils-element id="target"></testutils-element>`
    );
    const node = vNode.actualNode;
    node._internals.ariaLabelledByElements = [];

    assert.isTrue(hasAriaValue(vNode, 'aria-labelledby'));
  });

  it('returns false if missing attribute', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-label="hello"></div>`
    );

    assert.isFalse(hasAriaValue(vNode, 'aria-sort'));
  });

  it('throws for non-aria value', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-label="hello"></div>`
    );

    assert.throws(() => hasAriaValue(vNode, 'id'));
  });

  it('returns false for missing elementInternals property when set via external api', () => {
    const vNode = queryFixture(html`<div id="target"></div>`);
    vNode.elementInternals = {
      role: 'button'
    };

    assert.isFalse(hasAriaValue(vNode, 'aria-label'));
  });

  describe('SerialVirtualNode', () => {
    it('returns true if element has attribute', () => {
      // SerialVirtualNode will not support `props` or `elementInternals` so everything must be part of the `attributes` property
      const vNode = new SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-label': 'hello'
        }
      });

      assert.isTrue(hasAriaValue(vNode, 'aria-label'));
    });

    it('returns false if missing attribute', () => {
      const vNode = new SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-label': 'hello'
        }
      });

      assert.isFalse(hasAriaValue(vNode, 'aria-sort'));
    });
  });
});
