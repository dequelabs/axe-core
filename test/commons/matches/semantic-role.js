describe('matches.semanticRole', () => {
  const semanticRole = axe.commons.matches.semanticRole;
  const fixture = document.querySelector('#fixture');
  const queryFixture = axe.testUtils.queryFixture;

  beforeEach(() => {
    fixture.innerHTML = '';
  });

  it('should return true if explicit role matches', () => {
    const virtualNode = queryFixture(
      '<span id="target" role="textbox"></span>'
    );
    assert.isTrue(semanticRole(virtualNode, 'textbox'));
  });

  it('should return true if explicit role matches array', () => {
    const virtualNode = queryFixture(
      '<span id="target" role="textbox"></span>'
    );
    assert.isTrue(semanticRole(virtualNode, ['combobox', 'textbox']));
  });

  it('should return true if implicit role matches', () => {
    const virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isTrue(semanticRole(virtualNode, 'listitem'));
  });

  it('should return false if semantic role does not match', () => {
    const virtualNode = queryFixture('<span id="target" role="main"></span>');
    assert.isFalse(semanticRole(virtualNode, 'textbox'));
  });

  it('works with SerialVirtualNode', () => {
    const serialNode = new axe.SerialVirtualNode({
      nodeName: 'span',
      attributes: {
        role: 'textbox'
      }
    });
    assert.isTrue(semanticRole(serialNode, 'textbox'));
  });
});
