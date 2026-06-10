import { nodeLookup, getNodeFromTree } from '../../core/utils';
import standards from '../../standards';
import idrefs from '../dom/idrefs';

const refTypes = ['idref', 'idrefs'];

/**
 * Resolve an ARIA element-reference attribute, property, or `ElementInternals`
 * value to an array of virtual nodes. Handles the three value sources (an
 * attribute id string, a reflected AOM property, or an `ElementInternals`
 * property) and filters out references that are not connected to the document.
 * @method getAriaIdrefs
 * @memberof axe.commons.aria
 * @instance
 * @param {Node|Element|VirtualNode} node
 * @param {String} attrName The ARIA reference attribute name (e.g. `aria-labelledby`). Use the ARIA attr name even when the value comes from a property or internals.
 * @return {VirtualNode[]} resolved virtual nodes (empty when there is no value)
 */
export default function getAriaIdrefs(node, attrName) {
  const attrStandard = standards.ariaAttrs[attrName];
  if (!attrStandard || !refTypes.includes(attrStandard.type)) {
    throw new TypeError(
      `Attribute ${attrName} is not an ARIA reference attribute`
    );
  }

  const { vNode } = nodeLookup(node);
  const value = getIdrefValue(vNode, attrName, attrStandard.prop);
  if (value === null) {
    return [];
  }

  // a string value always comes from the HTML attribute; resolve the ids
  // against the document (idrefs handles shadow roots and DOM clobbering).
  // without a real DOM node (e.g. a SerialVirtualNode) there is nothing to
  // resolve against, so return no references rather than throwing
  if (typeof value === 'string') {
    if (!vNode.actualNode) {
      return [];
    }

    return idrefs(vNode, attrName)
      .filter(Boolean)
      .map(refNode => getNodeFromTree(refNode))
      .filter(Boolean);
  }

  // a property or internals value is already a resolved Element or array of
  // Elements; drop disconnected references as browsers ignore them (see #5139)
  const elements =
    value instanceof window.Element ? [value] : Array.from(value);
  return elements
    .filter(element => element.isConnected)
    .map(element => getNodeFromTree(element))
    .filter(Boolean);
}

function getIdrefValue(vNode, attrName, prop) {
  // a non-empty HTML attribute takes priority to preserve existing behavior.
  // setting an idref(s) property empties the attribute, so an empty or absent
  // attribute falls back to the property and then the ElementInternals value
  // e.g. el.ariaLabelledByElements = [label]; el.getAttribute('aria-labelledby') === ''
  const attrValue = vNode.attr(attrName);
  if (attrValue) {
    return attrValue;
  }

  if (prop && vNode.actualNode) {
    const propValue = vNode.actualNode[prop];
    if (propValue !== null && propValue !== undefined) {
      return propValue;
    }
  }

  if (prop && vNode.elementInternals) {
    const internalsValue = vNode.elementInternals[prop];
    if (internalsValue !== null && internalsValue !== undefined) {
      return internalsValue;
    }
  }

  return null;
}
