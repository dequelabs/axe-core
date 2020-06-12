import fromPrimative from './from-primative';
import getRole from '../aria/get-role';

/**
 * Check if a virtual node matches an explicit role(s)
 *``
 * Note: matches.explicitRole(vNode, matcher) can be indirectly used through
 * matches(vNode, { explicitRole: matcher })
 *
 * Example:
 * ```js
 * matches.explicitRole(vNode, ['combobox', 'textbox']);
 * matches.explicitRole(vNode, 'combobox');
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {Object} matcher
 * @returns {Boolean}
 */
function explicitRole(vNode, matcher) {
	return fromPrimative(getRole(vNode, { noImplicit: true }), matcher);
}

export default explicitRole;
