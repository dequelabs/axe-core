/**
 * Wrap the real node and provide list of the flattened children
 *
 * @param node {Node} - the node in question
 * @param shadowId {String} - the ID of the shadow DOM to which this node belongs
 */
function VirtualNode(node, shadowId) {
	this.shadowId = shadowId;
	this.children = [];
	this.actualNode = node;

	this._isHidden = null; // will be populated by axe.utils.isHidden
	this._cache = {};

	// abstract Node and Element APIs so we can run axe in DOM-less
	// environments. these are static properties in the assumption
	// that axe does not change any of them while it runs.
	this.elementNodeType = node.nodeType;
	this.elementNodeName = node.nodeName.toLowerCase();
	this.elementId = node.id;

	if (axe._cache.get('nodeMap')) {
		axe._cache.get('nodeMap').set(node, this);
	}
}

/**
 * Determine if the actualNode has the given class name.
 * @see https://j11y.io/jquery/#v=2.0.3&fn=jQuery.fn.hasClass
 * @param {String} className - The class to check for.
 * @return {Boolean} True if the actualNode has the given class, false otherwise.
 */
VirtualNode.prototype.hasClass = function(className) {
	if (typeof this.actualNode.className !== 'undefined') {
		let selector = ' ' + className + ' ';
		return (' ' + this.actualNode.className + ' ').indexOf(selector) >= 0;
	}
};

/**
 * Get the value of the given attribute name.
 * @param {String} attrName - The name of the attribute.
 * @returns {String} The value of the attribute
 */
VirtualNode.prototype.attr = function(attrName) {
	if (typeof this.actualNode.getAttribute !== 'undefined') {
		return this.actualNode.getAttribute(attrName);
	}
};

/**
 * Determine if the element is focusable and cache the result.
 * @return {Boolean} True if the element is focusable, false otherwise.
 */
VirtualNode.prototype.isFocusable = function() {
	if (!this._cache.hasOwnProperty('isFocusable')) {
		this._cache.isFocusable = axe.commons.dom.isFocusable(this.actualNode);
	}
	return this._cache.isFocusable;
};

/**
 * Return the list of tabbable elements for this element and cache the result.
 * @returns {VirtualNode[]}
 */
VirtualNode.prototype.tabbableElements = function() {
	if (!this._cache.hasOwnProperty('tabbableElements')) {
		this._cache.tabbableElements = axe.commons.dom.getTabbableElements(this);
	}
	return this._cache.tabbableElements;
};
