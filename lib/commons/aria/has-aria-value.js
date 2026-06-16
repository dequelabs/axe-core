import { nodeLookup, getElementInternals } from '../../core/utils';
import standards from '../../standards';

/**
 * Test if the element has an ARIA attribute, property, or ElementInternal key
 * @method hasAriaValue
 * @memberof axe.commons.aria
 * @instance
 * @param {Node|Element|VirtualNode} node
 * @param {String} attrName The ARIA attribute name to get the value of. Use the ARIA attr name even if getting values from properties.
 * @return {Boolean}
 */
export default function hasAriaValue(node, attrName) {
  const attrStandard = standards.ariaAttrs[attrName];
  if (!attrStandard) {
    throw new TypeError(`Attribute ${attrName} is not an ARIA attribute`);
  }

  return (
    hasAttributeValue(node, attrName) ||
    hasPropertyValue(node, attrStandard) ||
    hasInternalValue(node, attrStandard)
  );
}

function hasAttributeValue(node, attrName) {
  const { vNode, domNode } = nodeLookup(node);
  return vNode ? vNode.hasAttr(attrName) : domNode.hasAttribute(attrName);
}

function hasPropertyValue(node, attrStandard) {
  const { prop } = attrStandard;
  const { domNode } = nodeLookup(node);
  if (prop && domNode) {
    const propValue = domNode[prop];
    return propValue !== null && propValue !== undefined;
  }
  return false;
}

function hasInternalValue(node, attrStandard) {
  const { vNode, domNode } = nodeLookup(node);
  const { prop } = attrStandard;
  const internals = vNode
    ? vNode.elementInternals
    : getElementInternals(domNode);

  if (prop && internals) {
    const internalsValue = internals[prop];
    return internalsValue !== null && internalsValue !== undefined;
  }
  return false;
}
