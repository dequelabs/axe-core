/**
 * Skip, as no results to curate
 */
if (results.length < 2) {
	return results;
}

/**
 * for each result
 * - get other results with matching accessible name
 * - check if same purpose is served
 * - if not change `result` to `undefined`
 * - construct a list of unique results with relatedNodes to return
 */
const uniqueResults = [];
const nameMap = {};

for (let index = 0; index < results.length; index++) {
	const currentResult = results[index];
	const { data } = currentResult;
	const { name, parsedResource, resourceFrameTitle } = data;

	if (nameMap[name]) {
		continue;
	}

	/**
	 * when identical nodes exists,
	 * but do not resolve to same purpose -or- do not have parsedResource
	 * flag result as `incomplete`
	 */
	const identicalNodes = getIdenticalNodesWithSameName(results, name, index);
	if (
		identicalNodes.length &&
		(!parsedResource ||
			!isIdenticalResource(parsedResource, resourceFrameTitle, identicalNodes))
	) {
		currentResult.result = undefined;
	}

	/**
	 *  -> deduplicate results (for both `pass` or `incomplete`) and add `relatedNodes` if any
	 */
	currentResult.relatedNodes = [];
	currentResult.relatedNodes.push(
		...identicalNodes.map(node => node.relatedNodes[0])
	);
	uniqueResults.push(currentResult);
}

return uniqueResults;

/**
 * Get list of nodes from results which match a given accessible name
 * @method getIdenticalNodesWithSameName
 * @param {Array<Object>} afterResults results passed to the after fn
 * @param {String} expectedName accessible name to be matched
 * @param {Number} excludeIndex exclude `index` of result, that should not be taken into consideration
 * @returns {Array<Object>}
 */
function getIdenticalNodesWithSameName(
	afterResults,
	expectedName,
	excludeIndex
) {
	if (nameMap[expectedName]) {
		return nameMap[expectedName];
	}
	const nodes = afterResults.filter(({ data }, index) => {
		const { name } = data;
		return index !== excludeIndex && name === expectedName;
	});

	nameMap[expectedName] = nodes;
	return nodes;
}

/**
 * Verify if parsed resource match against all given identical nodes
 * @method isIdenticalResource
 * @param {Object} expectedResource parsed resource to be matched against
 * @param {String} expectedResourceFrameTitle frame document title to be matched against
 * @param {Array<Object>} identicalNodes nodes with identical accessible name whose parsed resource is checked for identity
 * @returns {Boolean}
 */
function isIdenticalResource(
	expectedResource,
	expectedResourceFrameTitle,
	identicalNodes
) {
	return identicalNodes.every(({ data }) => {
		const { parsedResource, resourceFrameTitle } = data;
		if (!parsedResource) {
			return false;
		}

		// remove key's whose values are undefined
		const keysWithValues = Object.keys(parsedResource).filter(
			key => !!parsedResource[key]
		);

		/**
		 * ensure every key/ value in resources match
		 * keep an array of non matching keys, to verify if document titles have to be compared
		 */
		const nonMatchingKeys = [];
		for (let index = 0; index < keysWithValues.length; index++) {
			const key = keysWithValues[index];
			const actual = parsedResource[key];
			const expected = expectedResource[key];
			if (actual !== expected) {
				nonMatchingKeys.push(key);
			}
		}

		// no non-matching keys - pass
		if (!nonMatchingKeys.length) {
			return true;
		}

		/**
		 * Only validate frame document title if property `pathname` is a non matching key
		 */
		if (nonMatchingKeys.length === 1 && nonMatchingKeys.includes('pathname')) {
			if (
				resourceFrameTitle === 'Error' ||
				expectedResourceFrameTitle === 'Error'
			) {
				return false;
			}
			return resourceFrameTitle === expectedResourceFrameTitle;
		}

		return false;
	});
}
