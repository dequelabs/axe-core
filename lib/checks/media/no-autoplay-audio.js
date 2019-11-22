/**
 * if media element does not provide controls mechanism
 * -> fail
 */
if (!node.hasAttribute('controls')) {
	return false;
}

/**
 * if duration cannot be read
 * -> `incomplete`
 * if duration can be read
 * -> ensure duration is less than allowed duration
 */
const durationInSeconds = node.duration;
if (!durationInSeconds || Number.isNaN(durationInSeconds)) {
	return undefined;
}
return durationInSeconds <= options.allowedDuration;
