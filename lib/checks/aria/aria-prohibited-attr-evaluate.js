import { getRole } from '../../commons/aria';
import { sanitize, subtreeText } from '../../commons/text';
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
 * @return {Boolean} True if the element uses any prohibited ARIA attributes. False otherwise.
 */
export default function ariaProhibitedAttrEvaluate(
  node,
  options = {},
  virtualNode
) {
  const elementsAllowedAriaLabel = options?.elementsAllowedAriaLabel || [];
  const { nodeName } = virtualNode.props;
  const role = getRole(virtualNode, { chromium: true });

  const prohibitedList = listProhibitedAttrs(
    role,
    nodeName,
    elementsAllowedAriaLabel
  );
  const prohibited = prohibitedList.filter(attrName => {
    if (!virtualNode.attrNames.includes(attrName)) {
      return false;
    }
    return sanitize(virtualNode.attr(attrName)) !== '';
  });

  if (prohibited.length === 0) {
    return false;
  }

  let messageKey = virtualNode.hasAttr('role') ? 'hasRole' : 'noRole';
  messageKey += prohibited.length > 1 ? 'Plural' : 'Singular';
  this.data({ role, nodeName, messageKey, prohibited });

  // `subtreeDescendant` to override namedFromContents
  const textContent = subtreeText(virtualNode, { subtreeDescendant: true });
  if (sanitize(textContent) !== '') {
    // Don't fail if there is text content to announce
    return undefined;
  }
  return true;
}

function listProhibitedAttrs(role, nodeName, elementsAllowedAriaLabel) {
  const roleSpec = standards.ariaRoles[role];
  if (roleSpec) {
    return roleSpec.prohibitedAttrs || [];
  }
  if (!!role || elementsAllowedAriaLabel.includes(nodeName)) {
    return [];
  }
  return ['aria-label', 'aria-labelledby'];
}
