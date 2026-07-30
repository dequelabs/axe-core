import getElementsByContentType from '../standards/get-elements-by-content-type';
import cache from '../../core/base/cache';
import getExplicitRole from '../aria/get-explicit-role';
import { hasConflictResolution } from '../aria/get-role';

// sectioning roles are not the same as landmark roles so this is a hard coded list
const sectioningRoles = [
  'article',
  'complementary',
  'main',
  'navigation',
  'region'
];

/**
 * Check if a virtual node is a descendant of sectioning content.
 *``
 * Note: matches.inSectioningContent(vNode) can be indirectly used through
 * matches(vNode, { inSectioningContent: true })
 *
 * Example:
 * ```js
 * matches.inSectioningContent(vNode);
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {String} selector
 * @returns {Boolean}
 */
export default function inSectioningContent(vNode) {
  // @see https://html.spec.whatwg.org/multipage/dom.html#sectioning-content
  // main is not considered sectioning content so we need to add it
  const sectioningElms = cache.get('sectioningElms', () =>
    getElementsByContentType('sectioning').concat('main')
  );

  while (vNode) {
    const { nodeName } = vNode.props;

    // avoid calling into implicit role (either directly or through getRole) in order
    // to avoid an infinite loop of calling into the html-elms spec. unfortunately
    // this means we need to handle element internals and conflict resolution ourselves
    let role = null;
    if (!hasConflictResolution(vNode)) {
      role = getExplicitRole(vNode);
    }
    if (!role && vNode.elementInternals?.role) {
      role = vNode.elementInternals.role;
    }

    if (
      (!role && sectioningElms.includes(nodeName)) ||
      sectioningRoles.includes(role)
    ) {
      return true;
    }

    // the top node of the tree will have parent === null, so a
    // undefined parent means we are in a disconnected tree
    if (typeof vNode.parent === 'undefined') {
      throw new TypeError('Cannot resolve parent for non-DOM nodes');
    }

    vNode = vNode.parent;
  }

  return false;
}
