/**
 * Skip unless there are more than a single result
 */
if (results.length < 2) {
	return results;
}

/**
 * for each result
 * - get other results with matching accessible name
 * - check if same purpose is served
 *  - if not change `result` to `undefined`
 */
for (let i = 0; i < results.length; i++) {
	const { accessibleText, linkResource } = results[i].data;
	const resourceLocation = linkResource.split('/').pop();

	const identicalLinks = getIdenticalLinks(accessibleText, i);
	if (!hasSamePurpose(resourceLocation, identicalLinks)) {
		results[i].result = undefined;
	}
}

return results;

/**
 * Get list of items from results which match a prescribed accessible name
 * @param {String} expectedAccessibleText accessible name to be matched
 * @param {Number} excludeIndex exclude `index` of result, that should not be taken into consideration
 * @returns {Array<Object>}
 */
function getIdenticalLinks(expectedAccessibleText, excludeIndex) {
	return results.filter(
		({ data: { accessibleText } }, index) =>
			index !== excludeIndex && accessibleText === expectedAccessibleText
	);
}

/**
 * Check if a given set of links have same resource
 * @param {String} expectedResource resource string
 * @param {Array<Object>} identicalLinks results where `data.accessibleText` were identical
 * @returns {Boolean}
 */
function hasSamePurpose(expectedResource, identicalLinks) {
	return identicalLinks.every(({ data: { linkResource } }) => {
		const resource = linkResource.split('/').pop();
		return expectedResource.includes(resource);
	});
}
