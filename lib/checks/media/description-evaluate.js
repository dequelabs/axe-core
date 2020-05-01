import { querySelectorAll } from '../../core/utils';

function descriptionEvaluate(node, options, virtualNode) {
	const tracks = querySelectorAll(virtualNode, 'track');
	const hasDescriptions = tracks.some(
		({ actualNode }) =>
			(actualNode.getAttribute('kind') || '').toLowerCase() === 'descriptions'
	);

	// Undefined if there are no tracks - media may have another description method
	return hasDescriptions ? false : undefined;
}

export default descriptionEvaluate;
