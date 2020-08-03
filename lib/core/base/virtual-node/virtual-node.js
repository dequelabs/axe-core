import AbstractVirtualNode from './abstract-virtual-node';
import { isXHTML, validInputTypes } from '../../utils';
import { isFocusable, getTabbableElements } from '../../../commons/dom';
import cache from '../cache';

let isXHTMLGlobal;

class VirtualNode extends AbstractVirtualNode {
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

		if (typeof isXHTMLGlobal === 'undefined') {
			isXHTMLGlobal = isXHTML(node.ownerDocument);
		}
		this._isXHTML = isXHTMLGlobal;

		// we will normalize the type prop for inputs by looking strictly
		// at the attribute and not what the browser resolves the type
		// to be
		if (node.nodeName.toLowerCase() === 'input') {
			let type = node.getAttribute('type');
			type = this._isXHTML ? type : (type || '').toLowerCase();

			if (!validInputTypes().includes(type)) {
				type = 'text';
			}

			this._type = type;
		}

		if (cache.get('nodeMap')) {
			cache.get('nodeMap').set(node, this);
		}
	}

	// abstract Node properties so we can run axe in DOM-less environments.
	// add to the prototype so memory is shared across all virtual nodes
	get props() {
		const {
			nodeType,
			nodeName,
			id,
			multiple,
			nodeValue,
			value
		} = this.actualNode;

		return {
			nodeType,
			nodeName: this._isXHTML ? nodeName : nodeName.toLowerCase(),
			id,
			type: this._type,
			multiple,
			nodeValue,
			value
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
	 * Return a property of the computed style for this element and cache the result. This is much faster than called `getPropteryValue` every time.
	 * @see https://jsperf.com/get-property-value
	 * @return {String}
	 */
	getComputedStylePropertyValue(property) {
		const key = 'computedStyle_' + property;
		if (!this._cache.hasOwnProperty(key)) {
			if (!this._cache.hasOwnProperty('computedStyle')) {
				this._cache.computedStyle = window.getComputedStyle(this.actualNode);
			}

			this._cache[key] = this._cache.computedStyle.getPropertyValue(property);
		}
		return this._cache[key];
	}

	/**
	 * Determine if the element is focusable and cache the result.
	 * @return {Boolean} True if the element is focusable, false otherwise.
	 */
	get isFocusable() {
		if (!this._cache.hasOwnProperty('isFocusable')) {
			this._cache.isFocusable = isFocusable(this.actualNode);
		}
		return this._cache.isFocusable;
	}

	/**
	 * Return the list of tabbable elements for this element and cache the result.
	 * @return {VirtualNode[]}
	 */
	get tabbableElements() {
		if (!this._cache.hasOwnProperty('tabbableElements')) {
			this._cache.tabbableElements = getTabbableElements(this);
		}
		return this._cache.tabbableElements;
	}

	/**
	 * Return the client rects for this element and cache the result.
	 * @return {DOMRect[]}
	 */
	get clientRects() {
		if (!this._cache.hasOwnProperty('clientRects')) {
			this._cache.clientRects = Array.from(
				this.actualNode.getClientRects()
			).filter(rect => rect.width > 0);
		}
		return this._cache.clientRects;
	}

	/**
	 * Return the bounding rect for this element and cache the result.
	 * @return {DOMRect}
	 */
	get boundingClientRect() {
		if (!this._cache.hasOwnProperty('boundingClientRect')) {
			this._cache.boundingClientRect = this.actualNode.getBoundingClientRect();
		}
		return this._cache.boundingClientRect;
	}
}

export default VirtualNode;
