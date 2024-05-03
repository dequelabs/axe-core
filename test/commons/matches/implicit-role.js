describe('matches.implicitRole', function () {
  let implicitRole = axe.commons.matches.implicitRole;
  let fixture = document.querySelector('#fixture');
  let queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true if implicit role matches', function () {
    let virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isTrue(implicitRole(virtualNode, 'listitem'));
  });

  it('should return true if implicit role matches array', function () {
    let virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isTrue(implicitRole(virtualNode, ['textbox', 'listitem']));
  });

  it('should return false if implicit role does not match', function () {
    let virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isFalse(implicitRole(virtualNode, 'textbox'));
  });

  it('should return false if matching explicit role', function () {
    let virtualNode = queryFixture(
      '<ul role="menu"><li id="target" role="menuitem"></li></ul>'
    );
    assert.isFalse(implicitRole(virtualNode, 'menuitem'));
  });

  it('works with SerialVirtualNode', function () {
    let serialNode = new axe.SerialVirtualNode({
      nodeName: 'li'
    });
    assert.isTrue(implicitRole(serialNode, 'listitem'));
  });
});
