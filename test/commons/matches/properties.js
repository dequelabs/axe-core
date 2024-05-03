describe('matches.properties', function () {
  let properties = axe.commons.matches.properties;
  let fixture = document.querySelector('#fixture');
  let queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    fixture.innerHTML = '';
  });

  it('returns true if all properties match', function () {
    let virtualNode = queryFixture('<input type="text" id="target"></input>');

    assert.isTrue(
      properties(virtualNode, {
        nodeName: 'input',
        id: 'target',
        type: 'text'
      })
    );
  });

  it('returns false if some properties do not match', function () {
    let virtualNode = queryFixture('<input type="text" id="target"></input>');

    assert.isFalse(
      properties(virtualNode, {
        nodeName: 'input',
        id: 'target',
        type: 'num'
      })
    );
  });

  it('returns false if any properties are missing', function () {
    let virtualNode = queryFixture('<h1 id="target">foo</h1>');

    assert.isFalse(
      properties(virtualNode, {
        nodeName: 'h1',
        id: 'target',
        type: 'text'
      })
    );
  });

  it('works with actual nodes', function () {
    let virtualNode = queryFixture('<input type="text" id="target"></input>');

    assert.isTrue(
      properties(virtualNode.actualNode, {
        nodeName: 'input',
        id: 'target',
        type: 'text'
      })
    );
  });

  it('works with SerialVirtualNode', function () {
    let serialNode = new axe.SerialVirtualNode({
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
