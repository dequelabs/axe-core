import { getNodeAttributes } from '../core/utils';

function ariaAllowedAttrMatches(node) {
	const aria = /^aria-/;
	if (node.hasAttributes()) {
		let attrs = getNodeAttributes(node);
		for (let i = 0, l = attrs.length; i < l; i++) {
			if (aria.test(attrs[i].name)) {
				return true;
			}
		}
	}

	return false;
}

export default ariaAllowedAttrMatches;
