describe('matches.explicitRole', function () {
  let explicitRole = axe.commons.matches.explicitRole;
  let fixture = document.querySelector('#fixture');
  let queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true if explicit role matches', function () {
    let virtualNode = queryFixture('<span id="target" role="textbox"></span>');
    assert.isTrue(explicitRole(virtualNode, 'textbox'));
  });

  it('should return true if explicit role matches array', function () {
    let virtualNode = queryFixture('<span id="target" role="textbox"></span>');
    assert.isTrue(explicitRole(virtualNode, ['combobox', 'textbox']));
  });

  it('should return false if explicit role does not match', function () {
    let virtualNode = queryFixture('<span id="target" role="main"></span>');
    assert.isFalse(explicitRole(virtualNode, 'textbox'));
  });

  it('should return false if matching implicit role', function () {
    let virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isFalse(explicitRole(virtualNode, 'listitem'));
  });

  it('works with SerialVirtualNode', function () {
    let serialNode = new axe.SerialVirtualNode({
      nodeName: 'span',
      attributes: {
        role: 'textbox'
      }
    });
    assert.isTrue(explicitRole(serialNode, 'textbox'));
  });
});
