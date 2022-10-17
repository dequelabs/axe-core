describe('matches.semanticRole', function () {
  var semanticRole = axe.commons.matches.semanticRole;
  var fixture = document.querySelector('#fixture');
  var queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true if explicit role matches', function () {
    var virtualNode = queryFixture('<span id="target" role="textbox"></span>');
    assert.isTrue(semanticRole(virtualNode, 'textbox'));
  });

  it('should return true if explicit role matches array', function () {
    var virtualNode = queryFixture('<span id="target" role="textbox"></span>');
    assert.isTrue(semanticRole(virtualNode, ['combobox', 'textbox']));
  });

  it('should return true if implicit role matches', function () {
    var virtualNode = queryFixture('<ul><li id="target"></li></ul>');
    assert.isTrue(semanticRole(virtualNode, 'listitem'));
  });

  it('should return false if semantic role does not match', function () {
    var virtualNode = queryFixture('<span id="target" role="main"></span>');
    assert.isFalse(semanticRole(virtualNode, 'textbox'));
  });

  it('works with SerialVirtualNode', function () {
    var serialNode = new axe.SerialVirtualNode({
      nodeName: 'span',
      attributes: {
        role: 'textbox'
      }
    });
    assert.isTrue(semanticRole(serialNode, 'textbox'));
  });
});
