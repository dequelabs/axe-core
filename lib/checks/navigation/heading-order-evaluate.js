import cache from '../../core/base/cache';
import { querySelectorAllFilter } from '../../core/utils';
import { isVisible } from '../../commons/dom';

function headingOrderEvaluate(node, options, virtualNode, context) {
	const headingOrder = cache.get('headingOrder');
	if (headingOrder) {
		this.data({
			index: headingOrder.indexOf(virtualNode)
		});
		return true;
	}

	// find all headings, even ones that are outside the current
	// context
	// @see https://github.com/dequelabs/axe-core/issues/728
	// TODO: es-modules_tree
	let selector = 'h1, h2, h3, h4, h5, h6, [role=heading]';

	// the initiator context will also need to know where iframes
	// are so we can insert the results of any in-context iframes
	// into their proper order
	if (context.initiator) {
		selector += ', iframe, frame';
	}
	const vNodes = querySelectorAllFilter(axe._tree[0], selector, vNode =>
		isVisible(vNode.actualNode, true)
	);

	const headingLevels = vNodes.map(vNode => {
		// save iframe locations so we can insert any in-context
		// iframe results into their proper spot in the data
		if (vNode.props.nodeName.includes('frame')) {
			return vNode.actualNode;
		}

		const ariaHeadingLevel = vNode.attr('aria-level');
		const nodeName = vNode.props.nodeName;

		if (ariaHeadingLevel !== null) {
			return parseInt(ariaHeadingLevel, 10);
		}

		const headingLevel = nodeName.toUpperCase().match(/H(\d)/);

		if (headingLevel) {
			return parseInt(headingLevel[1], 10);
		}
	});

	this.data({
		levels: headingLevels,
		index: vNodes.indexOf(virtualNode)
	});
	cache.set('headingOrder', vNodes);
	return true;
}

export default headingOrderEvaluate;
