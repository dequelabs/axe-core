describe('matches.hasNonListParent', () => {
  const hasNonListParent = axe.commons.matches.hasNonListParent;
  const { html, queryFixture } = axe.testUtils;

  ['ul', 'ol', 'menu'].forEach(nodeName => {
    it(`returns false for a native ${nodeName} parent`, () => {
      const vNode = queryFixture(
        `<${nodeName}><li id="target"></li></${nodeName}>`
      );
      assert.isFalse(hasNonListParent(vNode, true));
    });
  });

  it('returns false for an explicit list parent', () => {
    const vNode = queryFixture(
      html`<div role="list"><li id="target"></li></div>`
    );
    assert.isFalse(hasNonListParent(vNode, true));
  });

  it('returns true for a parent without a role', () => {
    const vNode = queryFixture(html`<div><li id="target"></li></div>`);
    assert.isTrue(hasNonListParent(vNode, true));
  });

  it('returns true when an explicit non-list role replaces the native role', () => {
    const vNode = queryFixture(
      html`<ul role="tablist">
        <li id="target"></li>
      </ul>`
    );
    assert.isTrue(hasNonListParent(vNode, true));
  });

  it('does not use an invalid explicit role to replace the native list role', () => {
    const vNode = queryFixture(
      html`<ul role="invalid">
        <li id="target"></li>
      </ul>`
    );
    assert.isFalse(hasNonListParent(vNode, true));
  });

  [
    { role: 'invalid none', nodeName: 'ul', expected: true },
    { role: 'doc-bibliography', nodeName: 'ol', expected: true },
    { role: 'invalid list', nodeName: 'div', expected: false },
    { role: 'none list', nodeName: 'ul', expected: true },
    { role: 'list none', nodeName: 'div', expected: false }
  ].forEach(({ role, nodeName, expected }) => {
    it(`uses the first valid token in parent role="${role}"`, () => {
      const vNode = queryFixture(
        `<${nodeName} role="${role}"><li id="target"></li></${nodeName}>`
      );
      assert.equal(hasNonListParent(vNode, true), expected);
    });
  });

  [undefined, null].forEach(parent => {
    it(`keeps a scoped DOM root with parent=${parent} conservative`, () => {
      const node = document.createElement('li');
      const outsideParent = document.createElement('div');
      outsideParent.appendChild(node);
      const vNode = new axe.VirtualNode(node, parent);
      assert.isFalse(hasNonListParent(vNode, true));
    });
  });

  ['list', 'group'].forEach(role => {
    it(`uses the flattened shadow host parent with role=${role}`, () => {
      const vNode = queryFixture(html`
        <div role="${role}">
          <template shadowrootmode="open">
            <li id="target" role="tabpanel">Slide</li>
          </template>
        </div>
      `);
      assert.equal(vNode.parent.attr('role'), role);
      assert.equal(hasNonListParent(vNode, true), role !== 'list');
    });
  });

  it('checks the direct parent rather than a list ancestor', () => {
    const vNode = queryFixture(
      html`<div role="list">
        <div><li id="target"></li></div>
      </div>`
    );
    assert.isTrue(hasNonListParent(vNode, true));
  });

  ['none', 'presentation'].forEach(role => {
    it(`returns true when role ${role} removes native list semantics`, () => {
      const vNode = queryFixture(
        `<ul role="${role}"><li id="target"></li></ul>`
      );
      assert.isTrue(hasNonListParent(vNode, true));
    });

    it(`returns false when focusability conflicts with role ${role}`, () => {
      const vNode = queryFixture(
        `<ul role="${role}" tabindex="0"><li id="target"></li></ul>`
      );
      assert.isFalse(hasNonListParent(vNode, true));
    });

    it(`returns false when a global ARIA attribute conflicts with role ${role}`, () => {
      const vNode = queryFixture(
        `<ul role="${role}" aria-label="Items"><li id="target"></li></ul>`
      );
      assert.isFalse(hasNonListParent(vNode, true));
    });
  });

  it('resolves presentation conflicts for a programmatically focusable parent', () => {
    const vNode = queryFixture(
      html`<ul role="none" tabindex="-1">
        <li id="target"></li>
      </ul>`
    );
    assert.isFalse(hasNonListParent(vNode, true));
  });

  it('keeps a non-list native parent non-list after presentation conflicts', () => {
    const vNode = queryFixture(
      html`<div role="none" tabindex="0"><li id="target"></li></div>`
    );
    assert.isTrue(hasNonListParent(vNode, true));
  });

  it('returns false for an ElementInternals list role', () => {
    const vNode = queryFixture(
      html`<testutils-element with-role="list">
        <li id="target"></li>
      </testutils-element>`
    );
    assert.isFalse(hasNonListParent(vNode, true));
  });

  it('returns true for an ElementInternals non-list role', () => {
    const vNode = queryFixture(
      html`<testutils-element with-role="group">
        <li id="target"></li>
      </testutils-element>`
    );
    assert.isTrue(hasNonListParent(vNode, true));
  });

  it('lets an explicit role replace an ElementInternals list role', () => {
    const vNode = queryFixture(
      html`<testutils-element with-role="list" role="group">
        <li id="target"></li>
      </testutils-element>`
    );
    assert.isTrue(hasNonListParent(vNode, true));
  });

  it('lets an explicit list role replace an ElementInternals non-list role', () => {
    const vNode = queryFixture(
      html`<testutils-element with-role="group" role="list">
        <li id="target"></li>
      </testutils-element>`
    );
    assert.isFalse(hasNonListParent(vNode, true));
  });

  it('does not restore an internal list role after a custom element presentation conflict', () => {
    const vNode = queryFixture(
      html`<testutils-element with-role="list" role="none" aria-label="Items">
        <li id="target"></li>
      </testutils-element>`
    );
    assert.isNull(axe.commons.aria.getRole(vNode.parent));
    assert.isTrue(hasNonListParent(vNode, true));
  });

  it('does not recurse when the parent accessible name references the child', () => {
    const vNode = queryFixture(
      html`<section aria-labelledby="target">
        <li id="target">Section name</li>
      </section>`
    );
    assert.isTrue(hasNonListParent(vNode, true));
    assert.equal(axe.commons.aria.getRole(vNode.parent), 'region');
  });

  it('works with a SerialVirtualNode whose parent has a non-list role', () => {
    const vNode = new axe.SerialVirtualNode({ nodeName: 'li' });
    vNode.parent = new axe.SerialVirtualNode({
      nodeName: 'ul',
      attributes: { role: 'presentation' }
    });
    assert.isTrue(hasNonListParent(vNode, true));
  });

  it('does not infer a non-list parent when parent context is undefined', () => {
    const vNode = new axe.SerialVirtualNode({ nodeName: 'li' });
    assert.isUndefined(vNode.parent);
    assert.isFalse(hasNonListParent(vNode, true));
  });

  it('does not infer a non-list parent when parent context is null', () => {
    const vNode = new axe.SerialVirtualNode({ nodeName: 'li' });
    vNode.parent = null;
    assert.isFalse(hasNonListParent(vNode, true));
  });

  it('supports matching false', () => {
    const vNode = queryFixture(
      html`<ul>
        <li id="target"></li>
      </ul>`
    );
    assert.isTrue(hasNonListParent(vNode, false));
  });

  it('supports a matcher function', () => {
    const vNode = queryFixture(html`<div><li id="target"></li></div>`);
    assert.isTrue(hasNonListParent(vNode, value => value === true));
  });
});
