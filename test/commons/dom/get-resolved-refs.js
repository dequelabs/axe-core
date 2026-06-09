describe('dom.getResolvedRefs', () => {
  const { html, queryFixture, queryShadowFixture, fixture } = axe.testUtils;
  const getResolvedRefs = axe.commons.dom.getResolvedRefs;
  const getNodeFromTree = axe.utils.getNodeFromTree;

  it('should find referenced nodes by ID', () => {
    const vNode = queryFixture(html`
      <div aria-cats="target1 target2" id="target"></div>
      <div id="target1"></div>
      <div id="target2"></div>
    `);

    const expected = [
      getNodeFromTree(document.getElementById('target1')),
      getNodeFromTree(document.getElementById('target2'))
    ];

    assert.deepEqual(
      getResolvedRefs(vNode, 'aria-cats'),
      expected,
      'Should find it!'
    );
  });

  it('should find only referenced nodes within the current root: shadow DOM', () => {
    const targetVNode = queryShadowFixture(
      html`<div id="shadow"><div id="target"></div></div>`,
      html`<div target="target"><div id="target"></div></div>`
    );

    const node = fixture.querySelector('#shadow').shadowRoot.firstChild;
    const expected = [targetVNode];

    assert.deepEqual(
      getResolvedRefs(node, 'target'),
      expected,
      'should only find stuff in the shadow DOM'
    );
  });

  it('should find only referenced nodes within the current root: document', () => {
    queryShadowFixture(
      html`<div target="target" id="shadow"><div id="target"></div></div>`,
      html`<div target="target"><div id="target"></div></div>`
    );

    const node = fixture.querySelector('[target]');
    const expected = [getNodeFromTree(fixture.querySelector('#target'))];

    assert.deepEqual(
      getResolvedRefs(node, 'target'),
      expected,
      'should only find stuff in the document'
    );
  });

  it('should insert null if a reference is not found', () => {
    const vNode = queryFixture(html`
      <div aria-cats="target1 target2 target3" id="target"></div>
      <div id="target1"></div>
      <div id="target2"></div>
    `);

    const expected = [
      getNodeFromTree(document.getElementById('target1')),
      getNodeFromTree(document.getElementById('target2')),
      null
    ];

    assert.deepEqual(
      getResolvedRefs(vNode, 'aria-cats'),
      expected,
      'Should find it!'
    );
  });

  it('should not fail when extra whitespace is used', () => {
    const vNode = queryFixture(html`
      <div
        aria-cats="     target1
  target2  target3
  "
        id="target"
      ></div>
      <div id="target1"></div>
      <div id="target2"></div>
    `);

    const expected = [
      getNodeFromTree(document.getElementById('target1')),
      getNodeFromTree(document.getElementById('target2')),
      null
    ];

    assert.deepEqual(
      getResolvedRefs(vNode, 'aria-cats'),
      expected,
      'Should find it!'
    );
  });

  it('should work with idrefs property', () => {
    const vNode = queryFixture(html`
      <div id="target"></div>
      <div id="target1"></div>
      <div id="target2"></div>
    `);

    vNode.actualNode.ariaControlsElements = [
      document.getElementById('target1'),
      document.getElementById('target2')
    ];

    const expected = [
      getNodeFromTree(document.getElementById('target1')),
      getNodeFromTree(document.getElementById('target2'))
    ];

    assert.deepEqual(
      getResolvedRefs(vNode, 'aria-controls'),
      expected,
      'Should find it!'
    );
  });

  it('should work with idrefs elementInternals', () => {
    const vNode = queryFixture(html`
      <testutils-element id="target"></testutils-element>
      <div id="target1"></div>
      <div id="target2"></div>
    `);

    vNode.actualNode._internals.ariaLabelledByElements = [
      document.getElementById('target1'),
      document.getElementById('target2')
    ];

    const expected = [
      getNodeFromTree(document.getElementById('target1')),
      getNodeFromTree(document.getElementById('target2'))
    ];

    assert.deepEqual(
      getResolvedRefs(vNode, 'aria-labelledby'),
      expected,
      'Should find it!'
    );
  });

  it('should not insert null if an idrefs property reference is not connected', () => {
    const vNode = queryFixture(html`
      <div id="target"></div>
      <div id="target1"></div>
      <div id="target2"></div>
    `);
    const div = document.createElement('div');

    vNode.actualNode.ariaControlsElements = [
      document.getElementById('target1'),
      document.getElementById('target2'),
      div
    ];

    const expected = [
      getNodeFromTree(document.getElementById('target1')),
      getNodeFromTree(document.getElementById('target2'))
    ];

    assert.deepEqual(
      getResolvedRefs(vNode, 'aria-controls'),
      expected,
      'Should find it!'
    );
  });
});
