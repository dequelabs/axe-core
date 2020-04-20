const whitespaceRegex = /[\t\r\n\f]/g;

class AbstractVirtualNode {
	constructor() {
		this.children = [];
		this.parent = null;
	}

	get props() {
		throw new Error(
			'VirtualNode class must have a "props" object consisting ' +
				'of "nodeType" and "nodeName" properties'
		);
	}

	attr() {
		throw new Error('VirtualNode class must have a "attr" function');
	}

	hasAttr() {
		throw new Error('VirtualNode class must have a "hasAttr" function');
	}

	hasClass(className) {
		// get the value of the class attribute as svgs return a SVGAnimatedString
		// if you access the className property
		let classAttr = this.attr('class');
		if (!classAttr) {
			return false;
		}

		let selector = ' ' + className + ' ';
		return (
			(' ' + classAttr + ' ').replace(whitespaceRegex, ' ').indexOf(selector) >=
			0
		);
	}
}

export default AbstractVirtualNode;

// hack to replace instanceof as webpack is making it two different
// functions.
// TODO: es-modules. remove this and use instanceof again
export function isAbstractNode(vNode) {
	return ['children', 'props', 'attr', 'hasAttr', 'hasClass'].every(prop => {
		return !!vNode[prop];
	});
}
