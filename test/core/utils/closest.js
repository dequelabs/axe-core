describe('utils.closest', function () {
  var closest = axe.utils.closest;
  var fixture = document.querySelector('#fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var shadowSupported = axe.testUtils.shadowSupport.v1;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should find the current node', function () {
    var virtualNode = queryFixture(
      '<div id="parent"><div id="target">foo</div></div>'
    );
    var closestNode = closest(virtualNode, 'div');
    assert.equal(closestNode, virtualNode);
  });

  it('should find a parent node', function () {
    var virtualNode = queryFixture(
      '<div id="parent"><span id="target">foo</span></div>'
    );
    var closestNode = closest(virtualNode, 'div');
    var parent = fixture.querySelector('#parent');
    assert.equal(closestNode, axe.utils.getNodeFromTree(parent));
  });

  it('should find an ancestor node', function () {
    var virtualNode = queryFixture(
      '<div id="parent"><span><span><span><span id="target">foo</span></span></span></div>'
    );
    var closestNode = closest(virtualNode, 'div');
    var parent = fixture.querySelector('#parent');
    assert.equal(closestNode, axe.utils.getNodeFromTree(parent));
  });

  it('should return null if no ancestor is found', function () {
    var virtualNode = queryFixture(
      '<div id="parent"><div id="target">foo</div></div>'
    );
    var closestNode = closest(virtualNode, 'h1');
    assert.isNull(closestNode);
  });

  it('should error if tree is not complete', function () {
    var virtualNode = queryFixture('<div id="target">foo</div>');
    virtualNode.parent = undefined;

    function fn() {
      closest(virtualNode, 'h1');
    }

    assert.throws(fn);
  });

  it('should not error if tree is complete', function () {
    var virtualNode = queryFixture('<div id="target">foo</div>');
    virtualNode.parent = null;

    function fn() {
      closest(virtualNode, 'h1');
    }

    assert.doesNotThrow(fn);
  });

  (shadowSupported ? it : xit)('should support shadow dom', function () {
    fixture.innerHTML = '<div id="parent"></div>';

    var root = fixture.firstChild.attachShadow({ mode: 'open' });
    var slotted = document.createElement('span');
    slotted.innerHTML = '<span id="target">foo</span>';
    root.appendChild(slotted);
    axe.utils.getFlattenedTree(fixture.firstChild);

    var virtualNode = axe.utils.getNodeFromTree(slotted.firstChild);
    var parent = fixture.querySelector('#parent');
    var closestNode = closest(virtualNode, 'div');
    assert.equal(closestNode, axe.utils.getNodeFromTree(parent));
  });
});
