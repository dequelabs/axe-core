import getAriaIdrefs from './get-aria-idrefs';

/**
 * Resolve a single ARIA element-reference attribute, property, or
 * `ElementInternals` value to a virtual node. Returns the first connected
 * reference, mirroring how browsers treat element-reference values.
 * @method getAriaIdref
 * @memberof axe.commons.aria
 * @instance
 * @param {Node|Element|VirtualNode} node
 * @param {String} attrName The ARIA reference attribute name (e.g. `aria-activedescendant`). Use the ARIA attr name even when the value comes from a property or internals.
 * @return {VirtualNode|null} the resolved virtual node, or `null` when there is no value
 */
export default function getAriaIdref(node, attrName) {
  return getAriaIdrefs(node, attrName)[0] ?? null;
}
