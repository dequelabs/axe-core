var axe = axe || { utils: {} };

/**
 * This implemnts the flatten-tree algorithm specified:
 * Originally here https://drafts.csswg.org/css-scoping/#flat-tree
 * Hopefully soon published here: https://www.w3.org/TR/css-scoping-1/#flat-tree
 *
 * Some notable information:
 ******* NOTE: as of Chrome 59, this is broken in Chrome so that tests fail completely
 ******* removed functionality for now
 * 1. <slot> elements do not have boxes by default (i.e. they do not get rendered and
 *    their CSS properties are ignored)
 * 2. <slot> elements can be made to have a box by overriding the display property
 *    which is 'contents' by default
 * 3. Even boxed <slot> elements do not show up in the accessibility tree until
 *    they have a tabindex applied to them OR they have a role applied to them AND
 *    they have a box (this is observed behavior in Safari on OS X, I cannot find
 *    the spec for this)
 */

/**
 * Wrap the real node and provide list of the flattened children
 *
 * @param node {Node} - the node in question
 * @param shadowId {String} - the ID of the shadow DOM to which this node belongs
 * @return {Object} - the wrapped node
 */
function virtualDOMfromNode (node, shadowId) {
	return {
		shadowId: shadowId,
		children: [],
		actualNode: node
	};
}

/**
 * find all the fallback content for a <slot> and return these as an array
 * this array will also include any #text nodes
 *
 * @param node {Node} - the slot Node
 * @return Array{Nodes}
 */
function getSlotChildren(node) {
	var retVal = [];

	node = node.firstChild;
	while (node) {
		retVal.push(node);
		node = node.nextSibling;
	}
	return retVal;
}

/**
 * Recursvely returns an array of the virtual DOM nodes at this level
 * excluding comment nodes and the shadow DOM nodes <content> and <slot>
 *
 * @param {Node} node the current node
 * @param {String} shadowId, optional ID of the shadow DOM that is the closest shadow
 *                           ancestor of the node
 */
axe.utils.getFlattenedTree = function (node, shadowId) {
	// using a closure here and therefore cannot easily refactor toreduce the statements
	//jshint maxstatements: false
	var retVal, realArray, nodeName;
	function reduceShadowDOM (res, child) {
		var replacements = axe.utils.getFlattenedTree(child, shadowId);
		if (replacements) {
			res = res.concat(replacements);
		}
		return res;
	}

	if (node.documentElement) { // document
		node = node.documentElement;
	}
	nodeName = node.nodeName.toLowerCase();

	if (axe.utils.isShadowRoot(node)) {
		// generate an ID for this shadow root and overwrite the current
		// closure shadowId with this value so that it cascades down the tree
		retVal = virtualDOMfromNode(node, shadowId);
		shadowId = 'a' + Math.random().toString().substring(2);
		realArray = Array.from(node.shadowRoot.childNodes);
		retVal.children = realArray.reduce(reduceShadowDOM, []);
		return [retVal];
	} else {
		if (nodeName === 'content') {
			realArray = Array.from(node.getDistributedNodes());
			return realArray.reduce(reduceShadowDOM, []);
		} else if (nodeName === 'slot') {
			realArray = Array.from(node.assignedNodes());
			if (!realArray.length) {
				// fallback content
				realArray = getSlotChildren(node);
			}
			var styl = window.getComputedStyle(node);
			// check the display property
			if (false && styl.display !== 'contents') { // intentionally commented out
				// has a box
				retVal = virtualDOMfromNode(node, shadowId);
				retVal.children = realArray.reduce(reduceShadowDOM, []);
				return [retVal];
			} else {
				return realArray.reduce(reduceShadowDOM, []);
			}
		} else {
			if (node.nodeType === 1) {
				retVal = virtualDOMfromNode(node, shadowId);
				realArray = Array.from(node.childNodes);
				retVal.children = realArray.reduce(reduceShadowDOM, []);
				return [retVal];
			} else if (node.nodeType === 3) {
				// text
				return [virtualDOMfromNode(node)];
			}
			return undefined;
		}
	}
};


/**
 * Recursively return a single node from a virtual dom tree
 *
 * @param {Object} vNode The flattened, virtual DOM tree
 * @param {Node}   node  The HTML DOM node
 */
axe.utils.getNodeFromTree = function (vNode, node) {
	var found;

	if (vNode.actualNode === node) {
		return vNode;
	}
	vNode.children.forEach((candidate) => {
		var retVal;

		if (candidate.actualNode === node) {
			found = candidate;
		} else {
			retVal = axe.utils.getNodeFromTree(candidate, node);
			if (retVal) {
				found = retVal;
			}
		}
	});
	return found;
};
