import { getNodeAttributes } from '../core/utils';

const aria = /^aria-/;

function ariaAllowedAttrMatches(node, virtualNode, context) {
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