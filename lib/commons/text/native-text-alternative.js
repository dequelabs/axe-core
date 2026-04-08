import getRole from '../aria/get-role';
import getElementSpec from '../standards/get-element-spec';
import nativeTextMethods from './native-text-methods';

/**
 * Get the accessible text using native HTML methods only
 * @param {VirtualNode} element
 * @param {Object} context
 * @property {Bool} debug Enable logging for formControlValue
 * @return {String} Accessible text
 */
export default function nativeTextAlternative(virtualNode, context = {}) {
  const { actualNode } = virtualNode;
  if (
    virtualNode.props.nodeType !== 1 ||
    ['presentation', 'none'].includes(getRole(virtualNode))
  ) {
    return '';
  }

  const textMethods = findTextMethods(virtualNode);
  // Find the first step that returns a non-empty string
  const accessibleName = textMethods.reduce((accName, step) => {
    return accName || step(virtualNode, context);
  }, '');

  if (context.debug) {
    axe.log(accessibleName || '{empty-value}', actualNode, context);
  }
  return accessibleName;
}

/**
 * Get accessible text functions for a specific native HTML element
 * @private
 * @param {VirtualNode} element
 * @return {Function[]} Array of native accessible name computation methods
 */
function findTextMethods(virtualNode) {
  const elmSpec = getElementSpec(virtualNode, { noMatchAccessibleName: true });
  const methods = [...(elmSpec.namingMethods || [])];

  // Form-associated custom elements can be labelled just like native
  // form controls. When the element is form-associated and labelText
  // is not already a naming method, add it so the accessible name
  // algorithm can find the associated labels.
  if (
    !methods.includes('labelText') &&
    isFormAssociatedCustomElement(virtualNode)
  ) {
    methods.push('labelText');
  }

  return methods.map(methodName => nativeTextMethods[methodName]);
}

/**
 * Check if a virtual node is a form-associated custom element.
 * @private
 * @param {VirtualNode} virtualNode
 * @return {Boolean}
 */
function isFormAssociatedCustomElement(virtualNode) {
  const { actualNode } = virtualNode;
  if (!actualNode) {
    return false;
  }

  // Custom element names must contain a hyphen
  const { nodeName } = virtualNode.props;
  if (!nodeName.includes('-')) {
    return false;
  }

  // Check if the constructor declares `static formAssociated = true`.
  // Note: the `labels` property is only on the ElementInternals object,
  // not on the element itself, so we cannot use `actualNode.labels` here.
  const ctor = window.customElements.get(nodeName);
  return !!ctor?.formAssociated;
}
