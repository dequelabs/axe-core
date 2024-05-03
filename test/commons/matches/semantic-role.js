describe('matches.semanticRole', function () {
  let semanticRole = axe.commons.matches.semanticRole;
  let fixture = document.querySelector('#fixture');
  let queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true if explicit role matches', function () {
    let virtualNode = queryFixture('<span id="target" role="textbox"></span>');
    assert.isTrue(semanticRole(virtualNode, 'textbox'));
  });

  it('should return true if explicit role matches array', function () {
    let virtualNode = queryFixture('<span id="target" role="textbox"></span>');
    assert.isTrue(semanticRole(virtualNode, ['combobox', 'textbox']));
  });

  it('should return true if implicit role matches', function () {
    let virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isTrue(semanticRole(virtualNode, 'listitem'));
  });

  it('should return false if semantic role does not match', function () {
    let virtualNode = queryFixture('<span id="target" role="main"></span>');
    assert.isFalse(semanticRole(virtualNode, 'textbox'));
  });

  it('works with SerialVirtualNode', function () {
    let serialNode = new axe.SerialVirtualNode({
      nodeName: 'span',
      attributes: {
        role: 'textbox'
      }
    });
    assert.isTrue(semanticRole(serialNode, 'textbox'));
  });
});
