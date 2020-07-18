import { closest } from '../core/utils';

function svgNamespaceMatches(node, virtualNode) {
	const nodeName = virtualNode.props.nodeName;
	const hasSvgParent = !!closest(virtualNode, 'svg');

	// special case svg element
	return nodeName === 'svg' || hasSvgParent;
}

export default svgNamespaceMatches;
