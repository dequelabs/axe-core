import getRootNode from './get-root-node';
import { tokenList, nodeLookup } from '../../core/utils';
import standards from '../../standards';

/**
 * Get elements referenced via a space-separated token attribute;
 * it will insert `null` for any Element that is not found
 * @method idrefs
 * @memberof axe.commons.dom
 * @instance
 * @param  {HTMLElement} node
 * @param  {String} attr The name of attribute
 * @return {Array|null} Array of elements (or `null` if not found)
 *
 * NOTE: When in a shadow DOM environment: ID refs (even for slotted content)
 * refer to the document in which the element is considered to be in the
 * "light DOM". Therefore, we use getElementById on the root node and not QSA
 * on the flattened tree to dereference idrefs.
 *
 */
export default function idrefs(node, attr) {
  const { vNode, domNode } = nodeLookup(node);

  try {
    const doc = getRootNode(domNode);
    const result = [];
    let attrValue = getIdrefsValue(vNode, attr);

    if (attrValue) {
      // already resolved idrefs
      if (Array.isArray(attrValue) || attrValue instanceof window.NodeList) {
        return Array.from(attrValue);
      }

      attrValue = tokenList(attrValue);
      for (const value of attrValue) {
        result.push(doc.getElementById(value));
      }
    }

    return result;
  } catch {
    throw new TypeError('Cannot resolve id references for non-DOM nodes');
  }
}

function getIdrefsValue(vNode, attr) {
  const { prop } = standards.ariaAttrs[attr] ?? {};

  // get prop value first as setting idrefs can result in empty attribute values
  // e.g. el.ariaLabelledByElements = [label]; el.getAttribute('aria-labelledby') === ''
  if (prop && vNode.actualNode) {
    const propValue = vNode.actualNode[prop];
    if (propValue !== null) {
      return propValue;
    }
  }

  const attrValue = vNode.attr(attr);
  if (attrValue !== null) {
    return attrValue;
  }

  if (prop && vNode.elementInternals) {
    const internalsValue = vNode.elementInternals[prop];
    if (internalsValue !== null) {
      return internalsValue;
    }
  }

  return null;
}
