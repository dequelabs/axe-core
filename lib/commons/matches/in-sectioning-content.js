import getElementsByContentType from '../standards/get-elements-by-content-type';
import cache from '../../core/base/cache';
import getRole from '../aria/get-role';
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
export default function inSectioningContent(virtualNode, matcher) {
  // @see https://html.spec.whatwg.org/multipage/dom.html#sectioning-content
  // main is not considered sectioning content so we need to add it
  const sectioningElms = cache.get('sectioningElms', () =>
    getElementsByContentType('sectioning').concat('main')
  );

  let vNode = virtualNode.parent;
  while (vNode) {
    const { nodeName } = vNode.props;
    const role = getRole(vNode);

    if (
      (!role && sectioningElms.includes(nodeName)) ||
      sectioningRoles.includes(role)
    ) {
      return fromPrimative(true, matcher);
    }

    // the top node of the tree will have parent === null, so a undefined parent means
    // we are in a disconnected tree
    if (typeof vNode.parent === 'undefined') {
      throw new TypeError('Cannot resolve parent for non-DOM nodes');
    }

    vNode = vNode.parent;
  }

  return fromPrimative(false, matcher);
}
