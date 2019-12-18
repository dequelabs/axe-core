/**
 * Ignore media nodes without `src`
 */
if (!node.currentSrc) {
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
