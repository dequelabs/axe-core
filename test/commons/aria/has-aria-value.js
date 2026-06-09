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

  // TODO: remove when we resolve https://github.com/dequelabs/axe-core/issues/5139
  // accessing empty idrefs element internal values crashes firefox
  // @see https://bugzilla.mozilla.org/show_bug.cgi?id=2045887
  (navigator.userAgent.indexOf('Firefox') > 0 ? it.skip : it)(
    'returns true if elementInternals idrefs is empty',
    () => {
      const vNode = queryFixture(
        html`<testutils-element id="target"></testutils-element>`
      );
      const node = vNode.actualNode;
      node._internals.ariaLabelledByElements = [];

      assert.isTrue(hasAriaValue(vNode, 'aria-labelledby'));
    }
  );

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
