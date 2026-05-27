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
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should find referenced nodes by ID', () => {
    fixture.innerHTML = html`
      <div aria-cats="target1 target2" id="start"></div>
      <div id="target1"></div>
      <div id="target2"></div>
    `;

    const start = document.getElementById('start'),
      expected = [
        document.getElementById('target1'),
        document.getElementById('target2')
      ];

    assert.deepEqual(
      axe.commons.dom.idrefs(start, 'aria-cats'),
      expected,
      'Should find it!'
    );
  });

  it('should find only referenced nodes within the current root: shadow DOM', () => {
    // shadow DOM v1 - note: v0 is compatible with this code, so no need
    // to specifically test this
    fixture.innerHTML = '<div target="target"><div id="target"></div></div>';
    makeShadowTreeIDR(fixture.firstChild);
    const start = fixture.firstChild.shadowRoot.querySelector('.parent');
    const expected = [fixture.firstChild.shadowRoot.getElementById('target')];

    assert.deepEqual(
      axe.commons.dom.idrefs(start, 'target'),
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
    const start = fixture.querySelector('.parent');
    const expected = [document.getElementById('target')];

    assert.deepEqual(
      axe.commons.dom.idrefs(start, 'target'),
      expected,
      'should only find stuff in the document'
    );
  });

  it('should insert null if a reference is not found', () => {
    fixture.innerHTML = html`
      <div aria-cats="target1 target2 target3" id="start"></div>
      <div id="target1"></div>
      <div id="target2"></div>
    `;

    const start = document.getElementById('start'),
      expected = [
        document.getElementById('target1'),
        document.getElementById('target2'),
        null
      ];

    assert.deepEqual(
      axe.commons.dom.idrefs(start, 'aria-cats'),
      expected,
      'Should find it!'
    );
  });

  it('should not fail when extra whitespace is used', () => {
    fixture.innerHTML = html`
      <div
        aria-cats="    	target1 
  target2  target3 
  "
        id="start"
      ></div>
      <div id="target1"></div>
      <div id="target2"></div>
    `;

    const start = document.getElementById('start'),
      expected = [
        document.getElementById('target1'),
        document.getElementById('target2'),
        null
      ];

    assert.deepEqual(
      axe.commons.dom.idrefs(start, 'aria-cats'),
      expected,
      'Should find it!'
    );
  });
});
