function createContentIDR() {
  const group = document.createElement('div');
  group.id = 'target';
  return group;
}

function makeShadowTreeIDR(node) {
  const root = node.attachShadow({ mode: 'open' });
  const div = document.createElement('div');
  div.className = 'parent';
  div.setAttribute('target', 'target');
  root.appendChild(div);
  div.appendChild(createContentIDR());
}

describe('dom.idrefs', () => {
  const { html, queryFixture, fixture, flatTreeSetup } = axe.testUtils;
  const idrefs = axe.commons.dom.idrefs;

  it('should find referenced nodes by ID', () => {
    const vNode = queryFixture(html`
      <div aria-cats="target1 target2" id="target"></div>
      <div id="target1"></div>
      <div id="target2"></div>
    `);

    const expected = [
      document.getElementById('target1'),
      document.getElementById('target2')
    ];

    assert.deepEqual(idrefs(vNode, 'aria-cats'), expected, 'Should find it!');
  });

  it('should find only referenced nodes within the current root: shadow DOM', () => {
    // shadow DOM v1 - note: v0 is compatible with this code, so no need
    // to specifically test this
    fixture.innerHTML = '<div target="target"><div id="target"></div></div>';
    makeShadowTreeIDR(fixture.firstChild);
    flatTreeSetup(fixture);
    const start = fixture.firstChild.shadowRoot.querySelector('.parent');
    const expected = [fixture.firstChild.shadowRoot.getElementById('target')];

    assert.deepEqual(
      idrefs(start, 'target'),
      expected,
      'should only find stuff in the shadow DOM'
    );
  });

  it('should find only referenced nodes within the current root: document', () => {
    // shadow DOM v1 - note: v0 is compatible with this code, so no need
    // to specifically test this
    fixture.innerHTML =
      '<div target="target" class="parent"><div id="target"></div></div>';
    makeShadowTreeIDR(fixture.firstChild);
    flatTreeSetup(fixture);
    const start = fixture.querySelector('.parent');
    const expected = [document.getElementById('target')];

    assert.deepEqual(
      idrefs(start, 'target'),
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
      document.getElementById('target1'),
      document.getElementById('target2'),
      null
    ];

    assert.deepEqual(idrefs(vNode, 'aria-cats'), expected, 'Should find it!');
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
      document.getElementById('target1'),
      document.getElementById('target2'),
      null
    ];

    assert.deepEqual(idrefs(vNode, 'aria-cats'), expected, 'Should find it!');
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
      document.getElementById('target1'),
      document.getElementById('target2')
    ];

    assert.deepEqual(
      idrefs(vNode, 'aria-controls'),
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
      document.getElementById('target1'),
      document.getElementById('target2')
    ];

    assert.deepEqual(
      idrefs(vNode, 'aria-labelledby'),
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
      document.getElementById('target1'),
      document.getElementById('target2')
    ];

    assert.deepEqual(
      idrefs(vNode, 'aria-controls'),
      expected,
      'Should find it!'
    );
  });
});
