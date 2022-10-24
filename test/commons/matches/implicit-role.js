describe('matches.implicitRole', function () {
  var implicitRole = axe.commons.matches.implicitRole;
  var fixture = document.querySelector('#fixture');
  var queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true if implicit role matches', function () {
    var virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isTrue(implicitRole(virtualNode, 'listitem'));
  });

  it('should return true if implicit role matches array', function () {
    var virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isTrue(implicitRole(virtualNode, ['textbox', 'listitem']));
  });

  it('should return false if implicit role does not match', function () {
    var virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isFalse(implicitRole(virtualNode, 'textbox'));
  });

  it('should return false if matching explicit role', function () {
    var virtualNode = queryFixture(
      '<ul role="menu"><li id="target" role="menuitem"></li></ul>'
    );
    assert.isFalse(implicitRole(virtualNode, 'menuitem'));
  });

  it('works with SerialVirtualNode', function () {
    var serialNode = new axe.SerialVirtualNode({
      nodeName: 'li'
    });
    assert.isTrue(implicitRole(serialNode, 'listitem'));
  });
});
