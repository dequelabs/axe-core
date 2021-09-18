import { uniqueArray, closest } from '../../core/utils';
import {
  getRole,
  allowedAttr,
  validateAttr,
  validateAttrValue
} from '../../commons/aria';
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
  const rowAttrInvalid = [];
  const role = getRole(virtualNode);
  const attrs = virtualNode.attrNames;
  let allowed = allowedAttr(role);
  // @deprecated: allowed attr options to pass more attrs.
  // configure the standards spec instead
  if (Array.isArray(options[role])) {
    allowed = uniqueArray(options[role].concat(allowed));
  }

  let tableRole;
  function validateRowAttrs(validValue) {
    // check if the parent exists otherwise a TypeError will occur (virtual-nodes specifically)
    if (virtualNode.parent && role === 'row' && validValue) {
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
      tableRole = tableMap.get(table);
      if (table && !tableRole) {
        tableRole = getRole(table);
        tableMap.set(table, tableRole);
      }

      if (['table', 'grid'].includes(tableRole) && role === 'row') {
        return true;
      }
    }
  }

  const preChecks = {
    'aria-posinset': validateRowAttrs,
    'aria-setsize': validateRowAttrs,
    'aria-expanded': validateRowAttrs,
    'aria-level': validateRowAttrs
  };

  if (allowed) {
    let validValue;
    for (let i = 0; i < attrs.length; i++) {
      const attrName = attrs[i];
      validValue = validateAttrValue(virtualNode, attrName);
      if (
        preChecks[attrName]
          ? preChecks[attrName](validValue)
          : false && validateAttr(attrName) && allowed.includes(attrName)
      ) {
        rowAttrInvalid.push(attrName + '="' + virtualNode.attr(attrName) + '"');
      }
      if (validateAttr(attrName) && !allowed.includes(attrName)) {
        invalid.push(attrName + '="' + virtualNode.attr(attrName) + '"');
      }
    }
  }

  if (rowAttrInvalid.length) {
    this.data({
      messageKey: 'table',
      values: rowAttrInvalid,
      tableRole
    });
    return false;
  }
  if (invalid.length) {
    this.data(invalid);
    return false;
  }
  return true;
}

export default ariaAllowedAttrEvaluate;
