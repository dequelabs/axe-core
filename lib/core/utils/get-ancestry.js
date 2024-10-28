import getShadowSelector from './get-shadow-selector';

function generateAncestry(node) {
  const nodeName = node.nodeName.toLowerCase();
  const parentElement = node.parentElement;
  const parentNode = node.parentNode;

  let nthChild = '';
  if (
    nodeName !== 'head' &&
    nodeName !== 'body' &&
    parentNode?.children.length > 1
  ) {
    const index = Array.prototype.indexOf.call(parentNode.children, node) + 1;
    nthChild = `:nth-child(${index})`;
  }

  if (!parentElement) {
    return nodeName + nthChild;
  }

  return generateAncestry(parentElement) + ' > ' + nodeName + nthChild;
}

/**
 * Gets a unique CSS selector
 * @param {HTMLElement} node The element to get the selector for
 * @param {Object} optional options
 * @returns {String|Array<String>} Unique CSS selector for the node
 */
export default function getAncestry(elm, options) {
  return getShadowSelector(generateAncestry, elm, options);
}
