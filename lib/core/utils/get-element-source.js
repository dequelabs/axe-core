import getNodeAttributes from './get-node-attributes';
import isXHTML from './is-xhtml';

/**
 * Gets the truncated HTML source of an element, or nodeValue for non-element nodes
 * @param  {Node}   node the DOM node (element, text, comment, etc.)
 * @param  {Object} options truncation options
 * @param  {Number} [options.maxLength=300] maximum length of the output
 * @param  {Number} [options.attrLimit=20] maximum length for attribute names and values
 * @returns {String} The outerHTML, truncated representation, or nodeValue for non-elements
 */
export default function getElementSource(
  node,
  { maxLength = 300, attrLimit = 20 } = {}
) {
  if (!node) {
    return '';
  }
  // non-element nodes
  if (node.nodeType !== 1) {
    const value = node.nodeValue ?? '';
    return truncate(value, maxLength);
  }

  const deepStr = getOuterHtml(node);
  if (deepStr.length > maxLength) {
    return getTruncatedElementSource(node, { maxLength, attrLimit });
  }

  return deepStr;
}

/**
 * Gets the outerHTML of an element, using XMLSerializer as fallback for SVG/MathML
 * @param  {Element} element the DOM element
 * @returns {String} The serialized HTML or empty string
 */
function getOuterHtml(element) {
  let source = element.outerHTML;
  if (!source && typeof window.XMLSerializer === 'function') {
    source = new window.XMLSerializer().serializeToString(element);
  }
  return source || '';
}

/**
 * Builds a truncated HTML representation of an element when outerHTML exceeds maxLength
 * @param  {Element} elm the DOM element
 * @param  {Object} options truncation options
 * @param  {Number} options.maxLength maximum length of the output
 * @param  {Number} options.attrLimit maximum length for attribute names and values
 * @returns {String} Truncated opening tag (e.g. '<div id="foo" ...>')
 */
function getTruncatedElementSource(elm, { maxLength, attrLimit }) {
  const nodeName = isXHTML(elm.ownerDocument || document)
    ? elm.nodeName
    : elm.nodeName.toLowerCase();

  // Get a mutable attribute map, and work out their rendered length
  const nodeAttrs = Array.from(getNodeAttributes(elm)).map(
    ({ name, value }) => ({ name, value })
  );
  const attrsLength = nodeAttrs.reduce((acc, { name, value }) => {
    return acc + name.length + value.length + 4;
  }, 0);

  if (2 + nodeName.length + attrsLength > maxLength) {
    nodeAttrs.forEach(attr => {
      attr.name = truncate(attr.name, attrLimit);
      attr.value = truncate(attr.value, attrLimit);
    });
  }

  let source = `<${nodeName}`;
  let tagEnd = '>';
  const truncateEnd = ' ...>';
  // Append any attribute that fits within maxLength
  for (const attr of nodeAttrs) {
    const attrStr = ` ${attr.name}="${attr.value}"`;
    if (source.length + attrStr.length > maxLength - truncateEnd.length) {
      tagEnd = truncateEnd;
      continue;
    }
    source += attrStr;
  }

  return source + tagEnd;
}

/**
 * Truncates a string to max length, appending '...' when truncated
 * @param  {String} str the string to truncate
 * @param  {Number} attrLimit maximum length before truncation
 * @returns {String} The original string or truncated version with '...' suffix
 */
function truncate(str, attrLimit) {
  return str.length <= attrLimit ? str : str.substring(0, attrLimit) + '...';
}
