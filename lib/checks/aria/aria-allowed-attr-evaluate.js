import { uniqueArray, closest } from '../../core/utils';
import { getRole, allowedAttr, validateAttr } from '../../commons/aria';
import cache from '../../core/base/cache';

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

  // TODO: look into memoizing getRole and removing this local cache
  let tableMap = cache.get('aria-allowed-attr-table');
  if (!tableMap) {
    tableMap = new WeakMap();
    cache.set('aria-allowed-attr-table', tableMap);
  }

  const table = closest(
    virtualNode,
    'table, [role="treegrid"], [role="table"], [role="grid"]'
  );
  let tableRole = tableMap.get(table);
  if (table && !tableRole) {
    tableRole = getRole(table);
    tableMap.set(table, tableRole);
  }

  if (['table', 'grid'].includes(tableRole) && role === 'row') {
    validateDescendantAttrs(attrs, virtualNode, invalid);
    this.data({
      messageKey: 'table',
      values: invalid,
      tableRole
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

// Check that said element contains aria-expanded, aria-posinset, aria-setsize, and aria-level
// https://www.w3.org/TR/wai-aria-1.2/#row
function validateDescendantAttrs(attrs, virtualNode, invalid) {
  for (let i = 0; i < attrs.length; i++) {
    const attrName = attrs[i];
    if (
      validateAttr(attrName) &&
      ['aria-posinset', 'aria-setsize', 'aria-expanded', 'aria-level'].includes(
        attrName
      )
    ) {
      invalid.push(attrName + '="' + virtualNode.attr(attrName) + '"');
    }
  }
}

export default ariaAllowedAttrEvaluate;
