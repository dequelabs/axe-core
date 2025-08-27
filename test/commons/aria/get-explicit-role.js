describe('aria.getExplicitRole', () => {
  const aria = axe.commons.aria;
  const roleDefinitions = aria.lookupTable.role;
  const flatTreeSetup = axe.testUtils.flatTreeSetup;

  it('returns valid roles', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'button');
    const vNode = flatTreeSetup(node)[0];
    assert.equal(aria.getExplicitRole(vNode), 'button');
  });

  it('handles case sensitivity', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'BUTTON');
    const vNode = flatTreeSetup(node)[0];
    assert.equal(aria.getExplicitRole(vNode), 'button');
  });

  it('handles whitespacing', () => {
    const node = document.createElement('div');
    node.setAttribute('role', ' button  ');
    const vNode = flatTreeSetup(node)[0];
    assert.equal(aria.getExplicitRole(vNode), 'button');
  });

  it('returns null when there is no role', () => {
    const node = document.createElement('div');
    const vNode = flatTreeSetup(node)[0];
    assert.isNull(aria.getExplicitRole(vNode));
  });

  it('returns the explicit role if it is valid and non-abstract', () => {
    const node = document.createElement('li');
    node.setAttribute('role', 'menuitem');
    const vNode = flatTreeSetup(node)[0];
    assert.equal(aria.getExplicitRole(vNode), 'menuitem');
  });

  it('ignores fallback roles by default', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'spinbutton button');
    const vNode = flatTreeSetup(node)[0];
    assert.isNull(aria.getExplicitRole(vNode));
  });

  it('returns null if the node is not an element', () => {
    const node = document.createTextNode('foo bar baz');
    const vNode = flatTreeSetup(node)[0];
    assert.isNull(aria.getExplicitRole(vNode));
  });

  describe('abstracts', () => {
    it('ignores abstract roles by default', () => {
      const node = document.createElement('li');
      node.setAttribute('role', 'section');
      const vNode = flatTreeSetup(node)[0];
      assert.equal(roleDefinitions.section.type, 'abstract');
      assert.isNull(aria.getExplicitRole(vNode));
    });

    it('returns abstract roles with `abstracts: true`', () => {
      const node = document.createElement('li');
      node.setAttribute('role', 'section');
      const vNode = flatTreeSetup(node)[0];
      assert.equal(roleDefinitions.section.type, 'abstract');
      assert.equal(aria.getExplicitRole(vNode, { abstracts: true }), 'section');
    });

    it('does not returns abstract roles with `abstracts: false`', () => {
      const node = document.createElement('li');
      node.setAttribute('role', 'section');
      const vNode = flatTreeSetup(node)[0];
      assert.equal(roleDefinitions.section.type, 'abstract');
      assert.isNull(aria.getExplicitRole(vNode, { abstracts: false }));
    });
  });

  describe('dpub', () => {
    it('ignores DPUB roles by default', () => {
      const node = document.createElement('section');
      node.setAttribute('role', 'doc-chapter');
      const vNode = flatTreeSetup(node)[0];
      assert.isNull(aria.getExplicitRole(vNode));
    });

    it('returns DPUB roles with `dpub: true`', () => {
      const node = document.createElement('section');
      node.setAttribute('role', 'doc-chapter');
      const vNode = flatTreeSetup(node)[0];
      assert.equal(aria.getExplicitRole(vNode, { dpub: true }), 'doc-chapter');
    });

    it('does not returns DPUB roles with `dpub: false`', () => {
      const node = document.createElement('section');
      node.setAttribute('role', 'doc-chapter');
      const vNode = flatTreeSetup(node)[0];
      assert.isNull(aria.getExplicitRole(vNode, { dpub: false }));
    });
  });

  describe('fallback', () => {
    it('returns the first valid item in the list', () => {
      const node = document.createElement('div');
      node.setAttribute('role', 'link button');
      const vNode = flatTreeSetup(node)[0];
      assert.equal(aria.getExplicitRole(vNode, { fallback: true }), 'link');
    });

    it('skips over invalid roles', () => {
      const node = document.createElement('div');
      node.setAttribute('role', 'foobar button');
      const vNode = flatTreeSetup(node)[0];
      assert.equal(aria.getExplicitRole(vNode, { fallback: true }), 'button');
    });

    it('returns the null if all roles are invalid and there is no implicit role', () => {
      const node = document.createElement('div');
      node.setAttribute('role', 'foo bar baz');
      const vNode = flatTreeSetup(node)[0];
      assert.isNull(aria.getExplicitRole(vNode, { fallback: true }));
    });

    it('respect the `abstracts` option', () => {
      const node = document.createElement('li');
      node.setAttribute('role', 'doc-chapter section');
      const vNode = flatTreeSetup(node)[0];
      assert.equal(
        aria.getExplicitRole(vNode, { fallback: true, abstracts: true }),
        'section'
      );
    });

    it('respect the `dpub` option', () => {
      const node = document.createElement('li');
      node.setAttribute('role', 'doc-chapter section');
      const vNode = flatTreeSetup(node)[0];
      assert.equal(
        aria.getExplicitRole(vNode, { fallback: true, dpub: true }),
        'doc-chapter'
      );
    });
  });
});
