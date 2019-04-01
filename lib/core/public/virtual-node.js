/**
 * A virtual attribute used for virtual nodes.
 * @param {String}  name  Attribute name
 * @param {String}  value Attribute value
 */
class VirtualAttribute {
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}
}

/**
 * A virtual node implementation of Element and Node apis that can
 * be used by axe in non-browser environments.
 * @param {String}  type  Name of the node
 * @param {Object}  attributes  Attributes of the node
 */
axe.VirtualNode = class VirtualNode {
	constructor(type, attributes = {}) {
		this.nodeName = type.toUpperCase();
		this.nodeType = 1;

		this.attributes = {
			length: Object.keys(attributes).length
		};
		Object.keys(attributes).forEach((name, index) => {
			const attribute = new VirtualAttribute(name, attributes[name]);
			this.attributes[name] = attribute;
			this.attributes[index] = attribute;
		});

		this.tabIndex = this.hasAttribute('tabindex')
			? this.getAttribute('tabindex')
			: -1;
	}

	getAttribute(attributeName) {
		if (typeof attributeName !== 'string') {
			return null;
		}

		let attribute = this.attributes[attributeName];

		if (!attribute) {
			return null;
		}

		return attribute.value;
	}

	hasAttribute(attributeName) {
		if (typeof attributeName !== 'string') {
			return false;
		}

		return !!this.attributes[attributeName];
	}

	hasAttributes() {
		return this.attributes.length > 0;
	}

	// used by axe.utils.select to find nodes that match the rules
	// selector. We can reroute the function to call
	// axe.utils.querySelectorAll, which doesn’t rely on any browser apis
	// to run. However, it gets passed an Axe virtual node, so we need to
	// mock that as well
	matches(selector) {
		return (
			axe.utils.querySelectorAll({ actualNode: this }, selector).length > 0
		);
	}

	// used by axe.utils.contains to check if the node is in context
	contains(node) {
		return this === node;
	}

	// used by axe.utils.getNodeAttributes when the attributes object is
	// not of type NamedNodeMap. Since we're a virtual node and won't
	// have the problem of being clobbered, we can just return the node
	cloneNode() {
		return this;
	}

	// used by DqElement to get the source. Must exist so the
	// XMLSerializer doesn’t get called with the node (which would throw
	// an error)
	outerHTML() {}
};
