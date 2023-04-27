describe('axe.utils.normalizeNode', () => {
  const normalizeNode = axe.utils.normalizeNode;
  const queryFixture = axe.testUtils.queryFixture;

  it('works with virtual nodes', () => {
    const element = queryFixture('<div id="target">Hello</div>');

    const { vNode, node } = normalizeNode(element);
    assert.equal(element, vNode);
    assert.equal(element.actualNode, node);
  });

  it('works with serial virtual nodes', () => {
    const element = new axe.SerialVirtualNode({ nodeName: 'div' });

    const { vNode, node } = normalizeNode(element);
    assert.equal(element, vNode);
    assert.isUndefined(node);
  });

  it('works with elements', () => {
    const element = queryFixture('<div id="target">Hello</div>');

    const { vNode, node } = normalizeNode(element.actualNode);
    assert.equal(element, vNode);
    assert.equal(element.actualNode, node);
  });

  it('works with non-elements', () => {
    const element = document.createTextNode('my text node');

    const { vNode, node } = normalizeNode(element);
    assert.isNull(vNode);
    assert.equal(element, node);
  });
});
