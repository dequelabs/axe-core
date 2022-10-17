/* global axe */
describe('axe.utils.isHtmlElement', function () {
  var queryFixture = axe.testUtils.queryFixture;
  var isHtmlElement = axe.utils.isHtmlElement;

  it('returns true if given ul', function () {
    var node = document.createElement('ul');
    assert.isTrue(isHtmlElement(node));
  });

  it('returns true if given nav', function () {
    var node = document.createElement('nav');
    assert.isTrue(isHtmlElement(node));
  });

  it('returns true if given iframe', function () {
    var node = document.createElement('iframe');
    assert.isTrue(isHtmlElement(node));
  });

  it('returns false if given custom element', function () {
    var node = document.createElement('myElement');
    assert.isFalse(isHtmlElement(node));
  });

  it('returns false if given svg namespace', function () {
    var node = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    assert.isFalse(isHtmlElement(node));
  });

  it('returns false if node has inherited svg namespace', function () {
    var svgNameSpace = 'http://www.w3.org/2000/svg';
    var node = document.createElementNS(svgNameSpace, 'svg');
    var child = document.createElementNS(svgNameSpace, 'a');
    child.setAttribute('href', '');
    child.textContent = 'Child Node';
    node.appendChild(child);

    var childNode = node.querySelector('a');
    assert.isFalse(isHtmlElement(childNode));
  });

  it('works with VirtualNodes', function () {
    var vNode = queryFixture('<ul id="target"></ul>');
    assert.isTrue(isHtmlElement(vNode));
  });

  it('works with SerialVirtualNode', function () {
    var vNode = new axe.SerialVirtualNode({ nodeName: 'ul' });
    assert.isTrue(isHtmlElement(vNode));
  });
});
