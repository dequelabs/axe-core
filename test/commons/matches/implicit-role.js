describe('matches.implicitRole', () => {
  const implicitRole = axe.commons.matches.implicitRole;
  const fixture = document.querySelector('#fixture');
  const queryFixture = axe.testUtils.queryFixture;

  beforeEach(() => {
    fixture.innerHTML = '';
  });

  it('should return true if implicit role matches', () => {
    const virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isTrue(implicitRole(virtualNode, 'listitem'));
  });

  it('should return true if implicit role matches array', () => {
    const virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isTrue(implicitRole(virtualNode, ['textbox', 'listitem']));
  });

  it('should return false if implicit role does not match', () => {
    const virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isFalse(implicitRole(virtualNode, 'textbox'));
  });

  it('should return false if matching explicit role', () => {
    const virtualNode = queryFixture(
      '<ul role="menu"><li id="target" role="menuitem"></li></ul>'
    );
    assert.isFalse(implicitRole(virtualNode, 'menuitem'));
  });

  it('works with SerialVirtualNode', () => {
    const serialNode = new axe.SerialVirtualNode({
      nodeName: 'li'
    });
    assert.isTrue(implicitRole(serialNode, 'listitem'));
  });
});
