import { uniqueArray, closest, isHtmlElement } from '../../core/utils';
import { getRole, allowedAttr, validateAttr } from '../../commons/aria';
import { isFocusable } from '../../commons/dom';
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
export default function ariaAllowedAttrEvaluate(node, options, virtualNode) {
  const invalid = [];
  const role = getRole(virtualNode);
  const attrs = virtualNode.attrNames;
  let allowed = allowedAttr(role);
  // @deprecated: allowed attr options to pass more attrs.
  // configure the standards spec instead
  if (Array.isArray(options[role])) {
    allowed = uniqueArray(options[role].concat(allowed));
  }

  const tableMap = cache.get('aria-allowed-attr-table', () => new WeakMap());

  function validateRowAttrs() {
    // check if the parent exists otherwise a TypeError will occur (virtual-nodes specifically)
    if (virtualNode.parent && role === 'row') {
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
        return true;
      }
    }
  }
  // Allows options to be mapped to object e.g. {'aria-level' : validateRowAttrs}
  const ariaAttr = Array.isArray(options.validTreeRowAttrs)
    ? options.validTreeRowAttrs
    : [];
  const preChecks = {};
  ariaAttr.forEach(attr => {
    preChecks[attr] = validateRowAttrs;
  });
  if (allowed) {
    for (let i = 0; i < attrs.length; i++) {
      const attrName = attrs[i];
      if (validateAttr(attrName) && preChecks[attrName]?.()) {
        invalid.push(attrName + '="' + virtualNode.attr(attrName) + '"');
      } else if (validateAttr(attrName) && !allowed.includes(attrName)) {
        invalid.push(attrName + '="' + virtualNode.attr(attrName) + '"');
      }
    }
  }

  if (invalid.length) {
    this.data(invalid);

    if (!isHtmlElement(virtualNode) && !role && !isFocusable(virtualNode)) {
      return undefined;
    }

    return false;
  }

  return true;
}
