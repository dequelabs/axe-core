import { uniqueArray, isHtmlElement } from '../../core/utils';
import { getRole, allowedAttr, validateAttr } from '../../commons/aria';
import { isFocusable } from '../../commons/dom';

/**
 * Check if each ARIA attribute on an element is allowed for its semantic role.
 *
 * Allowed ARIA attributes are taken from the `ariaRoles` standards object combining the roles `requiredAttrs` and `allowedAttrs` properties, as well as any global ARIA attributes from the `ariaAttrs` standards object.
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
 *       <td>List of all unallowed aria attributes and their value</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if each aria attribute is allowed. False otherwise.
 */
export default function ariaAllowedAttrEvaluate(node, options, virtualNode) {
  const invalid = [];
  const role = getRole(virtualNode);
  let allowed = allowedAttr(role);

  // @deprecated: allowed attr options to pass more attrs.
  // configure the standards spec instead
  if (Array.isArray(options[role])) {
    allowed = uniqueArray(options[role].concat(allowed));
  }

  // Unknown ARIA attributes are tested in aria-valid-attr
  for (const attrName of virtualNode.attrNames) {
    if (
      validateAttr(attrName) &&
      !allowed.includes(attrName) &&
      !ignoredAttrs(attrName, virtualNode.attr(attrName), virtualNode)
    ) {
      invalid.push(attrName);
    }
  }

  if (!invalid.length) {
    return true;
  }

  this.data(
    invalid.map(attrName => attrName + '="' + virtualNode.attr(attrName) + '"')
  );

  if (!role && !isHtmlElement(virtualNode) && !isFocusable(virtualNode)) {
    return undefined;
  }
  return false;
}

function ignoredAttrs(attrName, attrValue, vNode) {
  // allow aria-required=false as screen readers consistently ignore it
  // @see https://github.com/dequelabs/axe-core/issues/3756
  if (attrName === 'aria-required' && attrValue === 'false') {
    return true;
  }

  // allow aria-multiline=false when contenteditable is set
  // @see https://github.com/dequelabs/axe-core/issues/4463
  if (
    attrName === 'aria-multiline' &&
    attrValue === 'false' &&
    vNode.hasAttr('contenteditable')
  ) {
    return true;
  }

  return false;
}
