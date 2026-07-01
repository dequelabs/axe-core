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
  const methods = elmSpec.namingMethods || [];
  const textMethods = methods.map(methodName => nativeTextMethods[methodName]);

  // Element specs don't cover custom element names, so a form-associated
  // custom element never picks up its native `<label>` association. Detect it
  // via ElementInternals and add labelText manually.
  const internals = virtualNode.elementInternals;
  if (internals && !methods.includes('labelText')) {
    try {
      // `labels` throws on custom elements that aren't form-associated;
      // guard on a real collection (a NodeList is always truthy, even when
      // empty) so a plain internals object without a `labels` property
      // doesn't wrongly add labelText
      if (internals.labels) {
        textMethods.push(nativeTextMethods.labelText);
      }
    } catch {
      // not a form-associated custom element
    }
  }

  return textMethods;
}
