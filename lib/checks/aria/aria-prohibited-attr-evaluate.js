import { getRole } from '../../commons/aria';
import standards from '../../standards';

/**
 * Check that an element does not use any prohibited ARIA attributes.
 *
 * Prohibited attributes are taken from the `ariaAttrs` standards object from the attributes `prohibitedAttrs` property.
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
 *       <td>List of all prohibited attributes</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if the element does not use any prohibited ARIA attributes. False otherwise.
 */
function ariaProhibitedAttrEvaluate(node, options, virtualNode) {
  const prohibited = [];
  const role = getRole(virtualNode);

  if (!role) {
    return false;
  }

  const attrs = virtualNode.attrNames;
  const prohibitedAttrs = standards.ariaRoles[role].prohibitedAttrs;

  if (!prohibitedAttrs) {
    return false;
  }

  for (let i = 0; i < attrs.length; i++) {
    const attrName = attrs[i];
    if (prohibitedAttrs.includes(attrName)) {
      prohibited.push(attrName);
    }
  }

  if (prohibited.length) {
    this.data(prohibited);
    return true;
  }

  return false;
}

export default ariaProhibitedAttrEvaluate;
