describe('utils.closest', function () {
  let closest = axe.utils.closest;
  let fixture = document.querySelector('#fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let shadowSupported = axe.testUtils.shadowSupport.v1;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should find the current node', function () {
    let virtualNode = queryFixture(
      '<div id="parent"><div id="target">foo</div></div>'
    );
    let closestNode = closest(virtualNode, 'div');
    assert.equal(closestNode, virtualNode);
  });

  it('should find a parent node', function () {
    let virtualNode = queryFixture(
      '<div id="parent"><span id="target">foo</span></div>'
    );
    let closestNode = closest(virtualNode, 'div');
    let parent = fixture.querySelector('#parent');
    assert.equal(closestNode, axe.utils.getNodeFromTree(parent));
  });

  it('should find an ancestor node', function () {
    let virtualNode = queryFixture(
      '<div id="parent"><span><span><span><span id="target">foo</span></span></span></div>'
    );
    let closestNode = closest(virtualNode, 'div');
    let parent = fixture.querySelector('#parent');
    assert.equal(closestNode, axe.utils.getNodeFromTree(parent));
  });

  it('should return null if no ancestor is found', function () {
    let virtualNode = queryFixture(
      '<div id="parent"><div id="target">foo</div></div>'
    );
    let closestNode = closest(virtualNode, 'h1');
    assert.isNull(closestNode);
  });

  it('should error if tree is not complete', function () {
    let virtualNode = queryFixture('<div id="target">foo</div>');
    virtualNode.parent = undefined;

    function fn() {
      closest(virtualNode, 'h1');
    }

    assert.throws(fn);
  });

  it('should not error if tree is complete', function () {
    let virtualNode = queryFixture('<div id="target">foo</div>');
    virtualNode.parent = null;

    function fn() {
      closest(virtualNode, 'h1');
    }

    assert.doesNotThrow(fn);
  });

  (shadowSupported ? it : xit)('should support shadow dom', function () {
    fixture.innerHTML = '<div id="parent"></div>';

    let root = fixture.firstChild.attachShadow({ mode: 'open' });
    let slotted = document.createElement('span');
    slotted.innerHTML = '<span id="target">foo</span>';
    root.appendChild(slotted);
    axe.utils.getFlattenedTree(fixture.firstChild);

    let virtualNode = axe.utils.getNodeFromTree(slotted.firstChild);
    let parent = fixture.querySelector('#parent');
    let closestNode = closest(virtualNode, 'div');
    assert.equal(closestNode, axe.utils.getNodeFromTree(parent));
  });
});
