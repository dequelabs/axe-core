import { labelVirtual } from '../../commons/text';

function titleOnlyEvaluate(node, options, virtualNode) {
	var labelText = labelVirtual(virtualNode);
	return (
		!labelText &&
		!!(node.getAttribute('title') || node.getAttribute('aria-describedby'))
	);
}

export default titleOnlyEvaluate;
