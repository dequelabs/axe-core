import standards from '../../standards';

/**
 * Verifies that if a given html tag is valid
 * @method isHtmlElement
 * @memberof axe.utils
 * @param {HTMLElement|VirtualNode} node node to check if valid
 * @return {Boolean} true/ false
 */
function isHtmlElement(node) {
  const nodeName = node.props?.nodeName ?? node.nodeName.toLowerCase();

  if (node.namespaceURI === 'http://www.w3.org/2000/svg') {
    return false;
  }

  return !!standards.htmlElms[nodeName];
}

export default isHtmlElement;
