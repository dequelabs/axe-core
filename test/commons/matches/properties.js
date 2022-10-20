describe('matches.properties', function () {
  var properties = axe.commons.matches.properties;
  var fixture = document.querySelector('#fixture');
  var queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    fixture.innerHTML = '';
  });

  it('returns true if all properties match', function () {
    var virtualNode = queryFixture('<input type="text" id="target"></input>');

    assert.isTrue(
      properties(virtualNode, {
        nodeName: 'input',
        id: 'target',
        type: 'text'
      })
    );
  });

  it('returns false if some properties do not match', function () {
    var virtualNode = queryFixture('<input type="text" id="target"></input>');

    assert.isFalse(
      properties(virtualNode, {
        nodeName: 'input',
        id: 'target',
        type: 'num'
      })
    );
  });

  it('returns false if any properties are missing', function () {
    var virtualNode = queryFixture('<h1 id="target">foo</h1>');

    assert.isFalse(
      properties(virtualNode, {
        nodeName: 'h1',
        id: 'target',
        type: 'text'
      })
    );
  });

  it('works with actual nodes', function () {
    var virtualNode = queryFixture('<input type="text" id="target"></input>');

    assert.isTrue(
      properties(virtualNode.actualNode, {
        nodeName: 'input',
        id: 'target',
        type: 'text'
      })
    );
  });

  it('works with SerialVirtualNode', function () {
    var serialNode = new axe.SerialVirtualNode({
      nodeName: 'input',
      type: 'text',
      id: 'target'
    });

    assert.isTrue(
      properties(serialNode, {
        nodeName: 'input',
        id: 'target',
        type: 'text'
      })
    );
  });
});
