import { requiredAttr, getExplicitRole } from '../../commons/aria';
import { getElementSpec } from '../../commons/standards';
import { uniqueArray } from '../../core/utils';

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
function ariaRequiredAttrEvaluate(node, options = {}, virtualNode) {
  const missing = [];
  const attrs = virtualNode.attrNames;
  const role = getExplicitRole(virtualNode);
  if (attrs.length) {
    let required = requiredAttr(role);
    const elmSpec = getElementSpec(virtualNode);

    // @deprecated: required attr options to pass more attrs.
    // configure the standards spec instead
    if (Array.isArray(options[role])) {
      required = uniqueArray(options[role], required);
    }
    if (role && required) {
      for (let i = 0, l = required.length; i < l; i++) {
        const attr = required[i];
        if (
          !virtualNode.attr(attr) &&
          !(
            elmSpec.implicitAttrs &&
            typeof elmSpec.implicitAttrs[attr] !== 'undefined'
          )
        ) {
          missing.push(attr);
        }
      }
    }
  }

  if (missing.length) {
    const isCombobox = role === 'combobox';
    const messageKey = null;
    if (isCombobox) {
      // comboboxes need aria-expanded but only one of aria-owns or aria-controls
      // https://codepen.io/smhigley/pen/zYoEMWP
      // https://github.com/dequelabs/axe-core/issues/2505#issuecomment-788703942
      if (
        missing.length === 1 &&
        ['aria-owns', 'aria-controls'].includes(missing[0])
      ) {
        return true;
      }
      if (missing.includes('aria-expanded')) {
        messageKey = 'comboboxAll';
      } else {
        messageKey = 'comboboxWithExpanded';
      }
    }

    this.data({ missing, messageKey });
    return false;
  }

  return true;
}

export default ariaRequiredAttrEvaluate;
