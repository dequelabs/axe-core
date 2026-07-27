describe('matches.firstOfType', () => {
  const firstOfType = axe.commons.matches.firstOfType;
  const { html, queryFixture } = axe.testUtils;

  it('returns true if first of type', () => {
    const vNode = queryFixture(
      html`<div>
        <span id="target"></span>
        <span></span>
      </div>`
    );
    assert.isTrue(firstOfType(vNode, 'span'));
  });

  it('returns true if first of type with complex selector', () => {
    const vNode = queryFixture(
      html`<div>
        <span id="target"></span>
        <span></span>
      </div>`
    );
    assert.isTrue(firstOfType(vNode, 'span[id]'));
  });

  it('returns false if not first of type', () => {
    const vNode = queryFixture(
      html`<div>
        <span></span>
        <span id="target"></span>
      </div>`
    );
    assert.isFalse(firstOfType(vNode, 'button'));
  });

  it('only matches direct children', () => {
    const vNode = queryFixture(
      html`<div>
        <div>
          <span></span>
        </div>
        <span id="target"></span>
        <span></span>
      </div>`
    );
    assert.isTrue(firstOfType(vNode, 'span'));
  });

  it('works with SerialVirtualNode', () => {
    const serialNode = new axe.SerialVirtualNode({
      nodeName: 'div'
    });
    const child1 = new axe.SerialVirtualNode({
      nodeName: 'span'
    });
    const child2 = new axe.SerialVirtualNode({
      nodeName: 'span'
    });

    child1.parent = serialNode;
    child2.parent = serialNode;
    serialNode.children = [child1, child2];
    assert.isTrue(firstOfType(child1, 'span'));
  });
});
