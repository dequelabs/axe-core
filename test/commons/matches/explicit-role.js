describe('matches.explicitRole', function () {
  var explicitRole = axe.commons.matches.explicitRole;
  var fixture = document.querySelector('#fixture');
  var queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true if explicit role matches', function () {
    var virtualNode = queryFixture('<span id="target" role="textbox"></span>');
    assert.isTrue(explicitRole(virtualNode, 'textbox'));
  });

  it('should return true if explicit role matches array', function () {
    var virtualNode = queryFixture('<span id="target" role="textbox"></span>');
    assert.isTrue(explicitRole(virtualNode, ['combobox', 'textbox']));
  });

  it('should return false if explicit role does not match', function () {
    var virtualNode = queryFixture('<span id="target" role="main"></span>');
    assert.isFalse(explicitRole(virtualNode, 'textbox'));
  });

  it('should return false if matching implicit role', function () {
    var virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isFalse(explicitRole(virtualNode, 'listitem'));
  });

  it('works with SerialVirtualNode', function () {
    var serialNode = new axe.SerialVirtualNode({
      nodeName: 'span',
      attributes: {
        role: 'textbox'
      }
    });
    assert.isTrue(explicitRole(serialNode, 'textbox'));
  });
});
