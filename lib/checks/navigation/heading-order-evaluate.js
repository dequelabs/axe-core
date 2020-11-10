import cache from '../../core/base/cache';
import { querySelectorAllFilter, DqElement } from '../../core/utils';
import { isVisible } from '../../commons/dom';

function getLevel(vNode) {
	const ariaHeadingLevel = vNode.attr('aria-level');
	const nodeName = vNode.props.nodeName;

	if (ariaHeadingLevel !== null) {
		return parseInt(ariaHeadingLevel, 10);
	}

	const headingLevel = nodeName.match(/h(\d)/);

	if (headingLevel) {
		return parseInt(headingLevel[1], 10);
	}

	return -1;
}

function headingOrderEvaluate() {
	let headingOrder = cache.get('headingOrder');
	if (headingOrder) {
		return true;
	}

	// find all headings, even ones that are outside the current
	// context. also need to know where iframes are so we can insert
	//  the results of any in-context iframes into their proper order
	// @see https://github.com/dequelabs/axe-core/issues/728
	const selector = 'h1, h2, h3, h4, h5, h6, [role=heading], iframe, frame';
	// TODO: es-modules_tree
	const vNodes = querySelectorAllFilter(axe._tree[0], selector, vNode =>
		isVisible(vNode.actualNode, true)
	);

	headingOrder = vNodes.map(vNode => {
		// save the path so we can reconstruct the heading order
		return {
			ancestry: new DqElement(vNode.actualNode).ancestry,
			level: getLevel(vNode)
		};
	});

	this.data({ headingOrder });
	cache.set('headingOrder', vNodes);
	return true;
}

export default headingOrderEvaluate;
