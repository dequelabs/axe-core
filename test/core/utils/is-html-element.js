/* global axe */
describe('axe.utils.isHtmlElement', () => {
  const queryFixture = axe.testUtils.queryFixture;
  const isHtmlElement = axe.utils.isHtmlElement;

  it('returns true if given ul', () => {
    const node = document.createElement('ul');
    assert.isTrue(isHtmlElement(node));
  });

  it('returns true if given nav', () => {
    const node = document.createElement('nav');
    assert.isTrue(isHtmlElement(node));
  });

  it('returns true if given iframe', () => {
    const node = document.createElement('iframe');
    assert.isTrue(isHtmlElement(node));
  });

  it('returns false if given custom element', () => {
    const node = document.createElement('myElement');
    assert.isFalse(isHtmlElement(node));
  });

  it('returns false if given svg namespace', () => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    assert.isFalse(isHtmlElement(node));
  });

  it('returns false if node has inherited svg namespace', () => {
    const svgNameSpace = 'http://www.w3.org/2000/svg';
    const node = document.createElementNS(svgNameSpace, 'svg');
    const child = document.createElementNS(svgNameSpace, 'a');
    child.setAttribute('href', '');
    child.textContent = 'Child Node';
    node.appendChild(child);

    const childNode = node.querySelector('a');
    assert.isFalse(isHtmlElement(childNode));
  });

  it('works with VirtualNodes', () => {
    const vNode = queryFixture('<ul id="target"></ul>');
    assert.isTrue(isHtmlElement(vNode));
  });

  it('works with SerialVirtualNode', () => {
    const vNode = new axe.SerialVirtualNode({ nodeName: 'ul' });
    assert.isTrue(isHtmlElement(vNode));
  });
});
