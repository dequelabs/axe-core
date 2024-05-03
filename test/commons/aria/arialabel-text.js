describe('aria.arialabelText', function () {
  'use strict';
  let aria = axe.commons.aria;

  it('returns "" if there is no aria-label', function () {
    let vNode = new axe.SerialVirtualNode({ nodeName: 'div' });
    assert.equal(aria.arialabelText(vNode), '');
  });

  it('returns the aria-label attribute', function () {
    let label = ' my label ';
    let vNode = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: { 'aria-label': label }
    });
    assert.equal(aria.arialabelText(vNode), label);
  });

  it('returns "" if there is no aria-label', function () {
    let vNode = new axe.SerialVirtualNode({ nodeName: 'div' });
    assert.equal(aria.arialabelText(vNode), '');
  });

  it('looks up the node in the flat tree', function () {
    let label = 'harambe';
    let node = document.createElement('div');
    node.setAttribute('aria-label', label);

    axe.utils.getFlattenedTree(node);
    assert.equal(aria.arialabelText(node), label);
  });

  it('returns "" if the node is not an element', function () {
    let node = document.createTextNode('my text node');
    assert.equal(aria.arialabelText(node), '');
  });
});
