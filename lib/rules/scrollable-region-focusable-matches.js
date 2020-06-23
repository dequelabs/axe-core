import { hasContentVirtual } from '../commons/dom';
import { querySelectorAll, getScroll } from '../core/utils';

function scrollableRegionFocusableMatches(node, virtualNode) {
	/**
	 * Note:
	 * `excludeHidden=true` for this rule, thus considering only elements in the accessibility tree.
	 */

	/**
	 * if not scrollable -> `return`
	 */
	if (!!getScroll(node, 13) === false) {
		return false;
	}

	/**
	 * check if node has visible contents
	 */
	const nodeAndDescendents = querySelectorAll(virtualNode, '*');
	const hasVisibleChildren = nodeAndDescendents.some(elm =>
		hasContentVirtual(
			elm,
			true, // noRecursion
			true // ignoreAria
		)
	);
	if (!hasVisibleChildren) {
		return false;
	}

	return true;
}

export default scrollableRegionFocusableMatches;
