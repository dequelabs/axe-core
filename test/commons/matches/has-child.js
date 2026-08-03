describe('matches.hasChild', () => {
  const hasChild = axe.commons.matches.hasChild;
  const { html, queryFixture } = axe.testUtils;

  it('returns true if has child', () => {
    const vNode = queryFixture(html`<div id="target"><span></span></div>`);
    assert.isTrue(hasChild(vNode, 'span'));
  });

  it('returns true if has child with complex selector', () => {
    const vNode = queryFixture(
      html`<div id="target">
        <span></span>
        <button></button>
      </div>`
    );
    assert.isTrue(hasChild(vNode, 'button:not([role])'));
  });

  it('returns false if child does not match', () => {
    const vNode = queryFixture(html`<div id="target"><span></span></div>`);
    assert.isFalse(hasChild(vNode, 'button'));
  });

  it('returns false for descendant', () => {
    const vNode = queryFixture(
      html`<div id="target">
        <div><span></span></div>
      </div>`
    );
    assert.isFalse(hasChild(vNode, 'span'));
  });

  it('works with SerialVirtualNode', () => {
    const serialNode = new axe.SerialVirtualNode({
      nodeName: 'div'
    });
    const childNode = new axe.SerialVirtualNode({
      nodeName: 'span'
    });

    childNode.parent = serialNode;
    serialNode.children = [childNode];
    assert.isTrue(hasChild(serialNode, 'span'));
  });
});
