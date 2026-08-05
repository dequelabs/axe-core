import { getRole, getExplicitRole, getRoleType } from '../../commons/aria';
import { sanitize, subtreeText } from '../../commons/text';
import { getResolvedRefs, isVisibleToScreenReaders } from '../../commons/dom';
import standards from '../../standards';
import { getElementSpec } from '../../commons/standards';
import memoize from '../../core/utils/memoize';
import { isValidCustomElementName } from '../../core/utils';

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
  const role = getRole(virtualNode, {
    // this check allows fallback roles. For example, `<div role="foo img" aria-label="...">` is legal.
    fallback: true
  });

  const prohibitedList = listProhibitedAttrs(
    virtualNode,
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

  let messageKey = role !== null ? 'hasRole' : 'noRole';
  messageKey += prohibited.length > 1 ? 'Plural' : 'Singular';
  this.data({ role, nodeName, messageKey, prohibited });

  // Don't fail if aria-labelledby would provide the accessible name
  // @see https://github.com/dequelabs/axe-core/issues/5180
  if (hasIncompleteLabelledbyEdgeCase(virtualNode, prohibited)) {
    return undefined;
  }

  // `subtreeDescendant` to override namedFromContents
  const textContent = subtreeText(virtualNode, { subtreeDescendant: true });
  if (sanitize(textContent) !== '') {
    // Don't fail if there is text content to announce
    return undefined;
  }
  return true;
}

/**
 * Whether prohibited aria-labelledby should be needs-review instead of a failure.
 *
 * - Visible refs: AccName would use labelledby (aria-label is ignored).
 * - Missing refs with no aria-label: uncertain, needs review.
 * - Missing refs with aria-label: AccName falls through to aria-label → fail.
 * - Any AT-hidden ref: fail.
 *
 * @param {VirtualNode} vNode
 * @param {String[]} prohibited
 * @return {Boolean}
 */
function hasIncompleteLabelledbyEdgeCase(vNode, prohibited) {
  if (!vNode.actualNode || !prohibited.includes('aria-labelledby')) {
    return false;
  }

  // Other prohibited attrs (e.g. aria-actions) still fail. aria-label is
  // ignored when labelledby resolves because AccName prefers labelledby.
  const otherProhibited = prohibited.filter(
    attr => attr !== 'aria-label' && attr !== 'aria-labelledby'
  );
  if (otherProhibited.length) {
    return false;
  }

  const resolved = getResolvedRefs(vNode, 'aria-labelledby').filter(Boolean);
  if (resolved.length === 0) {
    // Does Acc name fall back to prohibited aria-label?
    return !prohibited.includes('aria-label');
  }

  return resolved.every(ref => isVisibleToScreenReaders(ref));
}

function listProhibitedAttrs(vNode, nodeName, elementsAllowedAriaLabel) {
  const explicitRole = getExplicitRole(vNode, { fallback: true });
  if (explicitRole) {
    const roleSpec = standards.ariaRoles[explicitRole];
    return roleSpec?.prohibitedAttrs || [];
  }

  if (
    elementsAllowedAriaLabel.includes(nodeName) ||
    getClosestAncestorRoleType(vNode) === 'widget' ||
    // allow reflected aria attributes on the custom element to its children
    // @see https://github.com/dequelabs/axe-core/issues/5217
    isValidCustomElementName(nodeName)
  ) {
    return [];
  }

  const htmlSpec = getElementSpec(vNode);
  if (!standards.htmlElms[nodeName] || htmlSpec.namingProhibited) {
    return ['aria-label', 'aria-labelledby'];
  }

  return [];
}

const getClosestAncestorRoleType = memoize(
  function getClosestAncestorRoleTypeMemoized(vNode) {
    if (!vNode) {
      return;
    }

    const role = getRole(vNode, { noPresentational: true, chromium: true });
    if (role) {
      return getRoleType(role);
    }

    return getClosestAncestorRoleType(vNode.parent);
  }
);
