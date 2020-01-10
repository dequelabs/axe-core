/**
 * Ignore media nodes without `src`
 * Intepret `src` or `source` for a given HTMLMediaElement
 * Note:
 * 	`currentSrc` is empty when `source` tag is used for elements like `video`
 */
const srcs = node.currentSrc
	? [node.currentSrc]
	: Array.from(node.getElementsByTagName('source')).filter(({ src }) => !!src);
if (!srcs.length) {
	return false;
}

/**
 * Ignore media nodes which are `paused` or `muted`
 */
if (node.hasAttribute('paused') || node.hasAttribute('muted')) {
	return false;
}

/**
 * Ignore media nodes where `duration` is less than 3 seconds & not looping
 */
if (node.duration && node.duration < 3 && !node.hasAttribute('loop')) {
	return false;
}

return true;
