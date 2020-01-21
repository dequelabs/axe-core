/**
 * Skip, as no results to curate
 */
if (results.length < 2) {
	return results;
}

/**
 * Filter results for which `result` is undefined & thus `data`, `relatedNodes` are undefined
 */
const incompleteResults = results.filter(({ result }) => result !== undefined);

/**
 * for each result
 * - get other results with matching accessible name
 * - check if same purpose is served
 * - if not change `result` to `undefined`
 * - construct a list of unique results with relatedNodes to return
 */
const uniqueResults = [];
const nameMap = {};

for (let index = 0; index < incompleteResults.length; index++) {
	const currentResult = incompleteResults[index];
	const { name, urlProps, resourceTitle } = currentResult.data;

	/**
	 * This is to avoid duplications in the `nodeMap`
	 */
	if (nameMap[name]) {
		continue;
	}

	const sameNameResults = incompleteResults.filter(
		({ data }, resultNum) => data.name === name && resultNum !== index
	);
	const isSameUrl = sameNameResults.every(({ data }) => {
		const { isSame, propName } = isIdenticalResource(data.urlProps, urlProps);
		if (isSame) {
			return true;
		}

		/**
		 * If urlProps do not match (for path or filename)
		 * then check if the title of the resources match
		 */
		if (propName && ['pathname', 'filename'].includes(propName)) {
			if ([resourceTitle, data.resourceTitle].includes('error')) {
				return false;
			}
			return resourceTitle === data.resourceTitle;
		}
		return false;
	});

	/**
	 * when identical nodes exists but do not resolve to same url, flag result as `incomplete`
	 */
	if (sameNameResults.length && !isSameUrl) {
		currentResult.result = undefined;
	}

	/**
	 *  -> deduplicate results (for both `pass` or `incomplete`) and add `relatedNodes` if any
	 */
	currentResult.relatedNodes = [];
	currentResult.relatedNodes.push(
		...sameNameResults.map(node => node.relatedNodes[0])
	);

	/**
	 * Update `nodeMap` with `sameNameResults`
	 */
	nameMap[name] = sameNameResults;

	uniqueResults.push(currentResult);
}

return uniqueResults;

/**
 * Compares two given objects for equality, when a mismatch happens returns the property on which the mismatch occured
 * @param {Object} a object A to compare
 * @param {*} b object B to compare
 * @returns {Object}
 */
function isIdenticalResource(a, b) {
	let mismatchProp;
	if (!a || !b) {
		return {
			isSame: false,
			propName: mismatchProp
		};
	}

	const aProps = Object.getOwnPropertyNames(a);
	const bProps = Object.getOwnPropertyNames(b);
	if (aProps.length !== bProps.length) {
		return {
			isSame: false,
			propName: mismatchProp
		};
	}

	const result = aProps.every(propName => {
		const aValue = a[propName];
		const bValue = b[propName];
		if (typeof aValue !== typeof bValue) {
			mismatchProp = propName;
			return false;
		}
		if (typeof aValue === `object` || typeof bValue === `object`) {
			return isIdenticalResource(aValue, bValue);
		}

		const sameValue = aValue === bValue;
		if (!sameValue) {
			mismatchProp = propName;
		}
		return sameValue;
	});

	return {
		isSame: result,
		propName: mismatchProp
	};
}
