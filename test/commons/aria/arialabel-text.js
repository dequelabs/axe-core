describe('aria.arialabelText', () => {
  const aria = axe.commons.aria;

  it('returns "" if there is no aria-label', () => {
    const vNode = new axe.SerialVirtualNode({ nodeName: 'div' });
    assert.equal(aria.arialabelText(vNode), '');
  });

  it('returns the aria-label attribute', () => {
    const label = ' my label ';
    const vNode = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: { 'aria-label': label }
    });
    assert.equal(aria.arialabelText(vNode), label);
  });

  it('returns "" if there is no aria-label', () => {
    const vNode = new axe.SerialVirtualNode({ nodeName: 'div' });
    assert.equal(aria.arialabelText(vNode), '');
  });

  it('looks up the node in the flat tree', () => {
    const label = 'harambe';
    const node = document.createElement('div');
    node.setAttribute('aria-label', label);

    axe.utils.getFlattenedTree(node);
    assert.equal(aria.arialabelText(node), label);
  });

  it('returns "" if the node is not an element', () => {
    const node = document.createTextNode('my text node');
    assert.equal(aria.arialabelText(node), '');
  });

  it('returns the aria-label from elementInternals', () => {
    const { html, queryFixture } = axe.testUtils;
    const vNode = queryFixture(
      html`<testutils-element
        id="target"
        with-aria-label="my label"
      ></testutils-element>`
    );
    assert.equal(aria.arialabelText(vNode), 'my label');
  });
});
