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
for (let index = 0; index < results.length; index++) {
	const { accessibleText, linkResource } = results[index].data;
	const identicalLinks = getIdenticalLinks(accessibleText, index);

	if (!hasSamePurpose(linkResource, identicalLinks)) {
		results[index].result = undefined;
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
		const expected = expectedResource.replace(/\s/g, '').toLowerCase();
		const actual = linkResource.replace(/\s/g, '').toLowerCase();
		return expected === actual;
	});
}
