import fromPrimative from './from-primative';
import { normalizeNode } from '../../core/utils';

/**
 * Check if the nodeName of a virtual node matches some value.
 *
 * Note: matches.nodeName(vNode, matcher) can be indirectly used through
 * matches(vNode, { nodeName: matcher })
 *
 * Example:
 * ```js
 * matches.nodeName(vNode, ['div', 'span'])
 * ```
 *
 * @deprecated HTMLElement is deprecated, use VirtualNode instead
 *
 * @param {HTMLElement|VirtualNode} vNode
 * @param {Object} Attribute matcher
 * @returns {Boolean}
 */
function nodeName(vNode, matcher) {
  vNode = normalizeNode(vNode).vNode;
  return fromPrimative(vNode.props.nodeName, matcher);
}

export default nodeName;
