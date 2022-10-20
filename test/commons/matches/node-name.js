describe('matches.nodeName', function () {
  var matchNodeName = axe.commons.matches.nodeName;
  var fixture = document.querySelector('#fixture');
  var queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    fixture.innerHTML = '';
  });

  it('returns true if the nodeName is the same as the matcher', function () {
    var virtualNode = queryFixture('<h1 id="target">foo</h1>');
    assert.isTrue(matchNodeName(virtualNode, 'h1'));
  });

  it('returns true if the nodename is included in an array', function () {
    var virtualNode = queryFixture('<h1 id="target">foo</h1>');
    assert.isTrue(matchNodeName(virtualNode, ['h3', 'h2', 'h1']));
  });

  it('returns true if the nodeName matches a regexp', function () {
    var virtualNode = queryFixture('<h1 id="target">foo</h1>');
    assert.isTrue(matchNodeName(virtualNode, /^h[0-6]$/));
  });

  it('returns true if the nodeName matches with a function', function () {
    var virtualNode = queryFixture('<h1 id="target">foo</h1>');
    assert.isTrue(
      matchNodeName(virtualNode, function (nodeName) {
        return nodeName === 'h1';
      })
    );
  });

  it('returns false if the nodeName does not match', function () {
    var virtualNode = queryFixture('<div id="target">foo</div>');
    assert.isFalse(matchNodeName(virtualNode, 'h1'));
    assert.isFalse(matchNodeName(virtualNode, ['h3', 'h2', 'h1']));
    assert.isFalse(matchNodeName(virtualNode, /^h[0-6]$/));
    assert.isFalse(
      matchNodeName(virtualNode, function (nodeName) {
        return nodeName === 'h1';
      })
    );
  });

  it('is case sensitive for XHTML', function () {
    var virtualNode = queryFixture('<H1 id="target">foo</H1>');
    virtualNode._isXHTML = true;
    delete virtualNode._cache.props;
    assert.isFalse(matchNodeName(virtualNode, 'h1'));
  });

  it('is case insensitive for HTML, but not for XHTML', function () {
    var virtualNode = queryFixture('<H1 id="target">foo</H1>');
    virtualNode._isXHTML = false;
    assert.isTrue(matchNodeName(virtualNode, 'h1'));
  });

  it('works with actual nodes', function () {
    var virtualNode = queryFixture('<h1 id="target">foo</h1>');
    assert.isTrue(matchNodeName(virtualNode.actualNode, 'h1'));
  });

  it('works with SerialVirtualNode', function () {
    var serialNode = new axe.SerialVirtualNode({
      nodeName: 'h1',
      attributes: {
        id: 'target'
      }
    });
    assert.isTrue(matchNodeName(serialNode, 'h1'));
  });
});
