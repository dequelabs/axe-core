/* global axe */
describe('axe.utils.isHtmlElement', function () {
  let queryFixture = axe.testUtils.queryFixture;
  let isHtmlElement = axe.utils.isHtmlElement;

  it('returns true if given ul', function () {
    let node = document.createElement('ul');
    assert.isTrue(isHtmlElement(node));
  });

  it('returns true if given nav', function () {
    let node = document.createElement('nav');
    assert.isTrue(isHtmlElement(node));
  });

  it('returns true if given iframe', function () {
    let node = document.createElement('iframe');
    assert.isTrue(isHtmlElement(node));
  });

  it('returns false if given custom element', function () {
    let node = document.createElement('myElement');
    assert.isFalse(isHtmlElement(node));
  });

  it('returns false if given svg namespace', function () {
    let node = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    assert.isFalse(isHtmlElement(node));
  });

  it('returns false if node has inherited svg namespace', function () {
    let svgNameSpace = 'http://www.w3.org/2000/svg';
    let node = document.createElementNS(svgNameSpace, 'svg');
    let child = document.createElementNS(svgNameSpace, 'a');
    child.setAttribute('href', '');
    child.textContent = 'Child Node';
    node.appendChild(child);

    let childNode = node.querySelector('a');
    assert.isFalse(isHtmlElement(childNode));
  });

  it('works with VirtualNodes', function () {
    let vNode = queryFixture('<ul id="target"></ul>');
    assert.isTrue(isHtmlElement(vNode));
  });

  it('works with SerialVirtualNode', function () {
    let vNode = new axe.SerialVirtualNode({ nodeName: 'ul' });
    assert.isTrue(isHtmlElement(vNode));
  });
});
