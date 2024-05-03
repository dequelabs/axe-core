describe('axe.utils.getNodeAttributes', function () {
  'use strict';

  it('should return the list of attributes', function () {
    let node = document.createElement('div');
    node.setAttribute('class', 'foo bar');
    let actual = axe.utils.getNodeAttributes(node);
    assert.isTrue(actual instanceof window.NamedNodeMap);
    assert.equal(actual.length, 1);
    assert.equal(actual[0].name, 'class');
  });

  it('should return the list of attributes when the DOM is clobbered', function () {
    let node = document.createElement('form');
    node.setAttribute('id', '123');
    node.innerHTML = '<select name="attributes"></select>';

    // eslint-disable-next-line no-restricted-syntax
    assert.isFalse(node.attributes instanceof window.NamedNodeMap);

    let actual = axe.utils.getNodeAttributes(node);
    assert.isTrue(actual instanceof window.NamedNodeMap);
    assert.equal(actual.length, 1);
    assert.equal(actual[0].name, 'id');
  });
});
