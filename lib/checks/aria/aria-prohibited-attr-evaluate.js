import {
  getRole,
  getExplicitRole,
  getRoleType,
  arialabelledbyText
} from '../../commons/aria';
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

  // Prohibited aria-labelledby needs review rather than a failure, depending
  // on what it references
  // @see https://github.com/dequelabs/axe-core/issues/5180
  const labelledbyReviewKey = getLabelledbyReviewKey(virtualNode, prohibited);
  if (labelledbyReviewKey) {
    this.data({ role, nodeName, messageKey: labelledbyReviewKey, prohibited });
    return undefined;
  }

  let messageKey = role !== null ? 'hasRole' : 'noRole';
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

/**
 * Message key for prohibited aria-labelledby that needs review rather than a
 * failure, or `null` when the element should fail.
 *
 * Only aria-labelledby can be reviewable, and only when it provides the
 * accessible name:
 *
 * - Every reference is visible to screen readers: the name repeats content
 *   that is in the page, so information may not be lost.
 * - No reference resolves: the accessible name cannot be determined.
 * - Any reference hidden from screen readers, or any other prohibited
 *   attribute, is a failure.
 *
 * A prohibited aria-label is exempt only when aria-labelledby gives the element
 * its name, since the accessible name computation ignores aria-label in that
 * case. When aria-labelledby resolves to no name, the name comes from the
 * prohibited aria-label instead, which is a failure.
 *
 * @param {VirtualNode} vNode
 * @param {String[]} prohibited
 * @return {String|null}
 */
function getLabelledbyReviewKey(vNode, prohibited) {
  // Without a DOM node, idref references cannot be resolved
  if (!vNode.actualNode || !prohibited.includes('aria-labelledby')) {
    return null;
  }

  const otherProhibited = prohibited.filter(
    attr => attr !== 'aria-label' && attr !== 'aria-labelledby'
  );
  if (otherProhibited.length) {
    return null;
  }

  const hasProhibitedAriaLabel = prohibited.includes('aria-label');
  const resolved = getResolvedRefs(vNode, 'aria-labelledby').filter(Boolean);
  if (resolved.length === 0) {
    return hasProhibitedAriaLabel ? null : 'unresolvedLabel';
  }

  if (!resolved.every(ref => isVisibleToScreenReaders(ref))) {
    return null;
  }

  if (hasProhibitedAriaLabel && sanitize(arialabelledbyText(vNode)) === '') {
    return null;
  }

  return prohibited.length > 1 ? 'visibleLabelPlural' : 'visibleLabelSingular';
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
  },
  { primitive: true }
);
