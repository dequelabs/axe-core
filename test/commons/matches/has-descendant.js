describe('matches.hasDescendant', () => {
  const hasDescendant = axe.commons.matches.hasDescendant;
  const { html, queryFixture } = axe.testUtils;

  it('returns true if has child', () => {
    const vNode = queryFixture(html`<div id="target"><span></span></div>`);
    assert.isTrue(hasDescendant(vNode, 'span'));
  });

  it('returns true if has descendant', () => {
    const vNode = queryFixture(
      html`<div id="target">
        <span
          ><span><button></button></span
        ></span>
      </div>`
    );
    assert.isTrue(hasDescendant(vNode, 'button'));
  });

  it('returns true if has descendant with complex selector', () => {
    const vNode = queryFixture(
      html`<div id="target">
        <span
          ><span><button></button></span
        ></span>
      </div>`
    );
    assert.isTrue(hasDescendant(vNode, 'button:not([role])'));
  });

  it('returns false if descendant does not match', () => {
    const vNode = queryFixture(html`<div id="target"><span></span></div>`);
    assert.isFalse(hasDescendant(vNode, 'button'));
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
    assert.isTrue(hasDescendant(serialNode, 'span'));
  });
});
