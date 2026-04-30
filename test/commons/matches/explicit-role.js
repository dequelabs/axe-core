describe('matches.explicitRole', () => {
  const explicitRole = axe.commons.matches.explicitRole;
  const fixture = document.querySelector('#fixture');
  const queryFixture = axe.testUtils.queryFixture;

  beforeEach(() => {
    fixture.innerHTML = '';
  });

  it('should return true if explicit role matches', () => {
    const virtualNode = queryFixture(
      '<span id="target" role="textbox"></span>'
    );
    assert.isTrue(explicitRole(virtualNode, 'textbox'));
  });

  it('should return true if explicit role matches array', () => {
    const virtualNode = queryFixture(
      '<span id="target" role="textbox"></span>'
    );
    assert.isTrue(explicitRole(virtualNode, ['combobox', 'textbox']));
  });

  it('should return false if explicit role does not match', () => {
    const virtualNode = queryFixture('<span id="target" role="main"></span>');
    assert.isFalse(explicitRole(virtualNode, 'textbox'));
  });

  it('should return false if matching implicit role', () => {
    const virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isFalse(explicitRole(virtualNode, 'listitem'));
  });

  it('works with SerialVirtualNode', () => {
    const serialNode = new axe.SerialVirtualNode({
      nodeName: 'span',
      attributes: {
        role: 'textbox'
      }
    });
    assert.isTrue(explicitRole(serialNode, 'textbox'));
  });
});
