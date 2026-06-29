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

  const { vNode, domNode } = nodeLookup(node);

  return (
    hasAttributeValue(vNode, domNode, attrName) ||
    hasPropertyValue(vNode, domNode, attrStandard) ||
    hasInternalValue(vNode, domNode, attrStandard)
  );
}

function hasAttributeValue(vNode, domNode, attrName) {
  return vNode ? vNode.hasAttr(attrName) : domNode.hasAttribute(attrName);
}

function hasPropertyValue(vNode, domNode, attrStandard) {
  const { prop } = attrStandard;
  if (prop && domNode) {
    const propValue = domNode[prop];
    return propValue !== null && propValue !== undefined;
  }
  return false;
}

function hasInternalValue(vNode, domNode, attrStandard) {
  const { prop } = attrStandard;

  // feature flag to enable internals. uses globalThis.axe as it can be run outside of axe context
  // TODO: remove when feature is fully enabled
  if (!axe._enableElementInternals) {
    return false;
  }

  const internals = vNode
    ? vNode.elementInternals
    : getElementInternals(domNode);

  if (prop && internals) {
    const internalsValue = internals[prop];
    return internalsValue !== null && internalsValue !== undefined;
  }
  return false;
}
