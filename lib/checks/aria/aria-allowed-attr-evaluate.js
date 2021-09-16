import { uniqueArray, closest } from '../../core/utils';
import { getRole, allowedAttr, validateAttr } from '../../commons/aria';

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
function ariaAllowedAttrEvaluate(node, options, virtualNode) {
  const invalid = [];

  const role = getRole(virtualNode);
  const attrs = virtualNode.attrNames;
  let allowed = allowedAttr(role);
  // @deprecated: allowed attr options to pass more attrs.
  // configure the standards spec instead
  if (Array.isArray(options[role])) {
    allowed = uniqueArray(options[role].concat(allowed));
  }

  const tableRole =
    closest(virtualNode, 'div[role="table"]')?.actualNode.attributes.role
      .value || null;
  const gridRole =
    closest(virtualNode, 'div[role="grid"]')?.actualNode.attributes.role
      .value || null;

  if (tableRole === 'table') {
    validateAttrDescendants(attrs, virtualNode, invalid);
    this.data({
      messageKey: 'table',
      values: invalid
    });
    return false;
  }
  if (gridRole === 'grid') {
    validateAttrDescendants(attrs, virtualNode, invalid);
    this.data({
      messageKey: 'grid',
      values: invalid
    });
    return false;
  }

  if (allowed) {
    for (let i = 0; i < attrs.length; i++) {
      const attrName = attrs[i];
      if (validateAttr(attrName) && !allowed.includes(attrName)) {
        invalid.push(attrName + '="' + virtualNode.attr(attrName) + '"');
      }
    }
  }

  if (invalid.length) {
    this.data(invalid);
    return false;
  }
  return true;
}

function validateAttrDescendants(attrs, virtualNode, invalid) {
  for (let i = 0; i < attrs.length; i++) {
    const attrName = attrs[i];
    if (
      (validateAttr(attrName) && attrName === 'aria-posinset') ||
      attrName === 'aria-setsize' ||
      attrName === 'aria-expanded' ||
      attrName === 'aria-level'
    ) {
      invalid.push(attrName + '="' + virtualNode.attr(attrName) + '"');
    }
  }
}

export default ariaAllowedAttrEvaluate;
