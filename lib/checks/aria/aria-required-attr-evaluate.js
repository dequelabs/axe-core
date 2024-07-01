import {
  requiredAttr as getRequiredAttrs,
  getExplicitRole
} from '../../commons/aria';
import { getElementSpec } from '../../commons/standards';
import { uniqueArray } from '../../core/utils';
import { isFocusable } from '../../commons/dom';

/**
 * Check that the element has all required attributes for its explicit role.
 *
 * Required ARIA attributes are taken from the `ariaRoles` standards object from the roles `requiredAttrs` property.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>String[]</code></td>
 *       <td>List of all missing require attributes</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if all required attributes are present. False otherwise.
 */
export default function ariaRequiredAttrEvaluate(
  node,
  options = {},
  virtualNode
) {
  const role = getExplicitRole(virtualNode);
  const attrs = virtualNode.attrNames;
  // @deprecated: required attr options to pass more attrs.
  // configure the standards spec instead
  let requiredAttrs = getRequiredAttrs(role);
  if (Array.isArray(options[role])) {
    requiredAttrs = uniqueArray(options[role], requiredAttrs);
  }
  // Nothing to test
  if (!role || !attrs.length || !requiredAttrs.length) {
    return true;
  }
  // Some required props are conditional:
  if (
    isStaticSeparator(virtualNode, role) ||
    isClosedCombobox(virtualNode, role)
  ) {
    return true;
  }
  // Non-normative exception for things like media player seek slider.
  // Tested to work in various screen readers.
  if (role === 'slider' && virtualNode.attr('aria-valuetext')?.trim()) {
    return true;
  }

  const elmSpec = getElementSpec(virtualNode);
  const missingAttrs = requiredAttrs.filter(
    requiredAttr =>
      !virtualNode.attr(requiredAttr) && !hasImplicitAttr(elmSpec, requiredAttr)
  );

  if (missingAttrs.length) {
    this.data(missingAttrs);
    return false;
  }
  return true;
}

function isStaticSeparator(vNode, role) {
  return role === 'separator' && !isFocusable(vNode);
}

function hasImplicitAttr(elmSpec, attr) {
  return elmSpec.implicitAttrs?.[attr] !== undefined;
}

function isClosedCombobox(vNode, role) {
  return role === 'combobox' && vNode.attr('aria-expanded') === 'false';
}
