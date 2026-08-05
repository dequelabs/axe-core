import getElementsByContentType from '../standards/get-elements-by-content-type';
import cache from '../../core/base/cache';
import getExplicitRole from '../aria/get-explicit-role';
import { hasConflictResolution } from '../aria/get-role';
import fromPrimative from './from-primative';

// sectioning roles are not the same as landmark roles so this is a hard coded list
const sectioningRoles = [
  'article',
  'complementary',
  'main',
  'navigation',
  'region'
];

/**
 * Check if a virtual node is a descendant of sectioning content
 *
 * Note: matches.inSectioningContent(vNode) can be indirectly used through
 * matches(vNode, { inSectioningContent: boolean })
 *
 * Example:
 * ```js
 * matches.inSectioningContent(vNode, true);
 * matches.inSectioningContent(vNode, false);
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {Object} matcher
 * @returns {Boolean}
 */
export default function inSectioningContent(vNode, matcher) {
  // @see https://html.spec.whatwg.org/multipage/dom.html#sectioning-content
  // main is not considered sectioning content so we need to add it
  const sectioningElms = cache.get('sectioningElms', () =>
    getElementsByContentType('sectioning').concat('main')
  );

  // the top node of the tree will have parent === null, so a undefined parent means
  // we are in a disconnected tree
  if (typeof vNode.parent === 'undefined') {
    throw new TypeError('Cannot resolve parent for non-DOM nodes');
  }

  vNode = vNode.parent;
  while (vNode) {
    const { nodeName } = vNode.props;

    /*
      avoid calling into getRole (for now) in order to avoid an infinite loop of
      calling into the html-elms spec. for example,
      <section aria-labelledby="foo"><header id="foo"></header></section>, if using
      getRole, would trigger looking at the accessible name through ariaLabelledby,
      which would then look at the header which would try to get the role and see it
      needs to be in sectioning content (when implemented), which would then loop to
      checking the accessible name of the parent section, ad infinitum. this is solved
      by the change suggested in https://github.com/dequelabs/axe-core/issues/5263.

      unfortunately this means we need to handle element internals and conflict resolution
      ourselves
     */
    let role = getExplicitRole(vNode);
    if (
      ['presentation', 'none'].includes(role) &&
      hasConflictResolution(vNode)
    ) {
      role = null;
    }
    if (!role && vNode.elementInternals?.role) {
      role = vNode.elementInternals.role;
    }

    if (
      (!role && sectioningElms.includes(nodeName)) ||
      sectioningRoles.includes(role)
    ) {
      return fromPrimative(true, matcher);
    }

    if (typeof vNode.parent === 'undefined') {
      throw new TypeError('Cannot resolve parent for non-DOM nodes');
    }

    vNode = vNode.parent;
  }

  return fromPrimative(false, matcher);
}
