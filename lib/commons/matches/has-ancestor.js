import { closest } from '../../core/utils';
import { getSectioningContentSelector } from '../standards/implicit-html-roles';

/**
 * Check if a virtual node has an ancestor that matches the selector.
 *``
 * Note: matches.hasAncestor(vNode, selector) can be indirectly used through
 * matches(vNode, { hasAncestor: selector })
 *
 * Example:
 * ```js
 * matches.hasAncestor(vNode, 'main');
 * matches.hasAncestor(vNode, 'button:not([role])');
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {String} selector
 * @returns {Boolean}
 */
export default function hasAncestor(vNode, selector) {
  // wildcard selectors allowed to support more complex selectors
  if (selector.includes('<sectioning_content>')) {
    selector = selector.replace(
      '<sectioning_content>',
      getSectioningContentSelector()
    );
  }

  return !!closest(vNode, selector);
}
