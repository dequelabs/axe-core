import { nodeLookup } from '../../core/utils';
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

  const { vNode } = nodeLookup(node);
  return (
    hasAttributeValue(vNode, attrName) ||
    hasPropertyValue(vNode, attrStandard) ||
    hasInternalValue(vNode, attrStandard)
  );
}

function hasAttributeValue(vNode, attrName) {
  return vNode.hasAttr(attrName);
}

function hasPropertyValue(vNode, attrStandard) {
  const { prop } = attrStandard;
  if (prop && vNode.actualNode) {
    return vNode.actualNode[prop] !== null;
  }
  return false;
}

function hasInternalValue(vNode, attrStandard) {
  const { prop } = attrStandard;
  if (prop && vNode.elementInternals) {
    return vNode.elementInternals[prop] !== null;
  }
  return false;
}
