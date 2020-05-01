import { querySelectorAll } from '../../core/utils';

function captionEvaluate(node, options, virtualNode) {
	const tracks = querySelectorAll(virtualNode, 'track');
	const hasCaptions = tracks.some(
		({ actualNode }) =>
			(actualNode.getAttribute('kind') || '').toLowerCase() === 'captions'
	);

	// Undefined if there are no tracks - media may use another caption method
	return hasCaptions ? false : undefined;
}

export default captionEvaluate;
