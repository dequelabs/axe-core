import colorContrastMatches from './color-contrast-matches';

function zoomedTextNotClippedMatches(node, virtualNode) {
	const textNodeMatch = colorContrastMatches(node, virtualNode);
	if (!textNodeMatch) {
		return false;
	}

	return true;
}

export default zoomedTextNotClippedMatches;
