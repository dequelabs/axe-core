describe('axe.utils.nodeLookup', () => {
  const nodeLookup = axe.utils.nodeLookup;
  const queryFixture = axe.testUtils.queryFixture;

  it('works with virtual nodes', () => {
    const element = queryFixture('<div id="target">Hello</div>');

    const { vNode, domNode } = nodeLookup(element);
    assert.equal(element, vNode);
    assert.equal(element.actualNode, domNode);
  });

  it('works with serial virtual nodes', () => {
    const element = new axe.SerialVirtualNode({ nodeName: 'div' });

    const { vNode, domNode } = nodeLookup(element);
    assert.equal(element, vNode);
    assert.isUndefined(domNode);
  });

  it('works with elements', () => {
    const element = queryFixture('<div id="target">Hello</div>');

    const { vNode, domNode } = nodeLookup(element.actualNode);
    assert.equal(element, vNode);
    assert.equal(element.actualNode, domNode);
  });

  it('works with non-elements', () => {
    const element = document.createTextNode('my text node');

    const { vNode, domNode } = nodeLookup(element);
    assert.isNull(vNode);
    assert.equal(element, domNode);
  });
});
