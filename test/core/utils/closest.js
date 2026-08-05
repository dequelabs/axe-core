describe('utils.closest', () => {
  const closest = axe.utils.closest;
  const fixture = document.querySelector('#fixture');
  const queryFixture = axe.testUtils.queryFixture;

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should find the current node', () => {
    const virtualNode = queryFixture(
      '<div id="parent"><div id="target">foo</div></div>'
    );
    const closestNode = closest(virtualNode, 'div');
    assert.equal(closestNode, virtualNode);
  });

  it('should find a parent node', () => {
    const virtualNode = queryFixture(
      '<div id="parent"><span id="target">foo</span></div>'
    );
    const closestNode = closest(virtualNode, 'div');
    const parent = fixture.querySelector('#parent');
    assert.equal(closestNode, axe.utils.getNodeFromTree(parent));
  });

  it('should find an ancestor node', () => {
    const virtualNode = queryFixture(
      '<div id="parent"><span><span><span><span id="target">foo</span></span></span></div>'
    );
    const closestNode = closest(virtualNode, 'div');
    const parent = fixture.querySelector('#parent');
    assert.equal(closestNode, axe.utils.getNodeFromTree(parent));
  });

  it('should return null if no ancestor is found', () => {
    const virtualNode = queryFixture(
      '<div id="parent"><div id="target">foo</div></div>'
    );
    const closestNode = closest(virtualNode, 'h1');
    assert.isNull(closestNode);
  });

  it('should error if tree is not complete', () => {
    const virtualNode = queryFixture('<div id="target">foo</div>');
    virtualNode.parent = undefined;

    function fn() {
      closest(virtualNode, 'h1');
    }

    assert.throws(fn);
  });

  it('should not error if tree is complete', () => {
    const virtualNode = queryFixture('<div id="target">foo</div>');
    virtualNode.parent = null;

    function fn() {
      closest(virtualNode, 'h1');
    }

    assert.doesNotThrow(fn);
  });

  it('should support shadow dom', () => {
    fixture.innerHTML = '<div id="parent"></div>';

    const root = fixture.firstChild.attachShadow({ mode: 'open' });
    const slotted = document.createElement('span');
    slotted.innerHTML = '<span id="target">foo</span>';
    root.appendChild(slotted);
    axe.utils.getFlattenedTree(fixture.firstChild);

    const virtualNode = axe.utils.getNodeFromTree(slotted.firstChild);
    const parent = fixture.querySelector('#parent');
    const closestNode = closest(virtualNode, 'div');
    assert.equal(closestNode, axe.utils.getNodeFromTree(parent));
  });
});
