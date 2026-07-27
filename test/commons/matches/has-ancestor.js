describe('matches.hasAncestor', () => {
  const hasAncestor = axe.commons.matches.hasAncestor;
  const { html, queryFixture } = axe.testUtils;

  it('returns true if has parent', () => {
    const vNode = queryFixture(html`<div><span id="target"></span></div>`);
    assert.isTrue(hasAncestor(vNode, 'div'));
  });

  it('returns true if has ancestor', () => {
    const vNode = queryFixture(
      html`<main>
        <span
          ><span><button id="target"></button></span
        ></span>
      </main>`
    );
    assert.isTrue(hasAncestor(vNode, 'main'));
  });

  it('returns true if has ancestor with complex selector', () => {
    const vNode = queryFixture(
      html`<main>
        <span
          ><span><button id="target"></button></span
        ></span>
      </main>`
    );
    assert.isTrue(hasAncestor(vNode, 'main:not([role])'));
  });

  it('returns true for <sectioning_content> wildcard', () => {
    const vNode = queryFixture(
      html`<article>
        <span
          ><span><button id="target"></button></span
        ></span>
      </article>`
    );
    assert.isTrue(hasAncestor(vNode, '<sectioning_content>'));
  });

  it('returns true for <sectioning_content> wildcard replacement', () => {
    const vNode = queryFixture(
      html`<main>
        <span
          ><span><button id="target"></button></span
        ></span>
      </main>`
    );
    assert.isTrue(hasAncestor(vNode, '<sectioning_content>, main'));
  });

  it('returns false if ancestor does not match', () => {
    const vNode = queryFixture(html`<div><span id="target"></span></div>`);
    assert.isFalse(hasAncestor(vNode, 'button'));
  });

  it('returns false for <sectioning_content> wildcard if ancestor does not match', () => {
    const vNode = queryFixture(
      html`<div>
        <span
          ><span><button id="target"></button></span
        ></span>
      </div>`
    );
    assert.isFalse(hasAncestor(vNode, '<sectioning_content>'));
  });

  it('works with SerialVirtualNode', () => {
    const serialNode = new axe.SerialVirtualNode({
      nodeName: 'span'
    });
    const ancestorNode = new axe.SerialVirtualNode({
      nodeName: 'div'
    });

    serialNode.parent = ancestorNode;
    ancestorNode.children = [serialNode];
    assert.isTrue(hasAncestor(serialNode, 'div'));
  });
});
