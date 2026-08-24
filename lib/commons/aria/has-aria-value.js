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

  // ARIA values are read repeatedly for the same node during a run, so cache
  // them on the virtual node. Serialized nodes have no cache and skip this.
  const cacheKey = `hasAriaValue:${attrName}`;
  const nodeCache = vNode?._cache;
  if (nodeCache && cacheKey in nodeCache) {
    return nodeCache[cacheKey];
  }

  const hasValue =
    hasAttributeValue(vNode, attrName) ||
    hasPropertyValue(vNode, attrStandard) ||
    hasInternalValue(vNode, attrStandard);

  if (nodeCache) {
    nodeCache[cacheKey] = hasValue;
  }
  return hasValue;
}

function hasAttributeValue(vNode, attrName) {
  return vNode.hasAttr(attrName);
}

function hasPropertyValue(vNode, attrStandard) {
  const { prop } = attrStandard;
  if (prop && vNode.actualNode) {
    const propValue = vNode.actualNode[prop];
    return propValue !== null && propValue !== undefined;
  }
  return false;
}

function hasInternalValue(vNode, attrStandard) {
  const { prop } = attrStandard;
  if (prop && vNode.elementInternals) {
    const internalsValue = vNode.elementInternals[prop];
    return internalsValue !== null && internalsValue !== undefined;
  }
  return false;
}
