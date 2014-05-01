/*exported DqNode */
function DqNode(node) {
	'use strict';
	return {
		selector: utils.getSelector(node),
		source: node.outerHTML,
		frames: []
	};
}