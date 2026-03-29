/**
 * Evaluates whether password fields have a valid autocomplete attribute for Accessible Authentication.
 *
 * @param {HTMLElement} node The current DOM node being evaluated.
 * @param {Object} options Configuration options for the check.
 * @param {VirtualNode} virtualNode The internal representation of the element.
 * @returns {Boolean|undefined} True if the node passes, undefined if manual review is needed.
 */
export default function accessibleAuthenticationEvaluate(
  node,
  options,
  virtualNode
) {
  const autocomplete = virtualNode.attr('autocomplete');
  if (!autocomplete) {
    return undefined;
  }

  const tokens = String(autocomplete).toLowerCase().split(/\s+/);
  const isValid =
    tokens.includes('current-password') || tokens.includes('new-password');

  if (isValid) {
    return true;
  }
  return false;
}
