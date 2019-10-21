// class is unused in the file...
// eslint-disable-next-line no-unused-vars
class VirtualNode extends axe.AbstractVirtualNode {
	/**
	 * Wrap the real node and provide list of the flattened children
	 * @param {Node} node the node in question
	 * @param {VirtualNode} parent The parent VirtualNode
	 * @param {String} shadowId the ID of the shadow DOM to which this node belongs
	 */
	constructor(node, parent, shadowId) {
		super();
		this.shadowId = shadowId;
		this.children = [];
		this.actualNode = node;
		this.parent = parent;

		this._isHidden = null; // will be populated by axe.utils.isHidden
		this._cache = {};

		if (axe._cache.get('nodeMap')) {
			axe._cache.get('nodeMap').set(node, this);
		}
	}

	// abstract Node properties so we can run axe in DOM-less environments.
	// add to the prototype so memory is shared across all virtual nodes
	get props() {
		const { nodeType, nodeName, id, type } = this.actualNode;

		return {
			nodeType,
			nodeName: nodeName.toLowerCase(),
			id,
			type
		};
	}

	/**
	 * Get the value of the given attribute name.
	 * @param {String} attrName The name of the attribute.
	 * @return {String|null} The value of the attribute or null if the attribute does not exist
	 */
	attr(attrName) {
		if (typeof this.actualNode.getAttribute !== 'function') {
			return null;
		}

		return this.actualNode.getAttribute(attrName);
	}

	/**
	 * Determine if the element has the given attribute.
	 * @param {String} attrName The name of the attribute
	 * @return {Boolean} True if the element has the attribute, false otherwise.
	 */
	hasAttr(attrName) {
		if (typeof this.actualNode.hasAttribute !== 'function') {
			return false;
		}

		return this.actualNode.hasAttribute(attrName);
	}

	/**
	 * Determine if the element is focusable and cache the result.
	 * @return {Boolean} True if the element is focusable, false otherwise.
	 */
	get isFocusable() {
		if (!this._cache.hasOwnProperty('isFocusable')) {
			this._cache.isFocusable = axe.commons.dom.isFocusable(this.actualNode);
		}
		return this._cache.isFocusable;
	}

	/**
	 * Return the list of tabbable elements for this element and cache the result.
	 * @return {VirtualNode[]}
	 */
	get tabbableElements() {
		if (!this._cache.hasOwnProperty('tabbableElements')) {
			this._cache.tabbableElements = axe.commons.dom.getTabbableElements(this);
		}
		return this._cache.tabbableElements;
	}
}
