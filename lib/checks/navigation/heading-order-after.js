function headingOrderAfter(results) {
	if (results.length < 2) {
		return results;
	}

	const headingLevels = results[0].data.levels;
	const iframeMap = new WeakMap();

	for (let i = 1; i < results.length; i++) {
		const result = results[i];

		// store iframe heading results for easier lookup
		if (result.data.levels && result.node._fromFrame) {
			iframeMap.set(result.node._element, result.data.levels);
		}

		let index = result.data.index;
		let prevIndex = index - 1;
		let currLevel = !result.node._fromFrame
			? headingLevels[index]
			: iframeMap.get(result.node._element)[index];
		let prevLevel;

		if (result.node._fromFrame) {
			// go from inside an iframe to outside of it
			if (result.node._fromFrame && index === 0) {
				const iframeIndex = headingLevels.indexOf(result.node._element);
				prevLevel = headingLevels[iframeIndex - 1];
			} else {
				prevLevel = iframeMap.get(result.node._element)[prevIndex];
			}
		} else {
			prevLevel = headingLevels[prevIndex];
		}

		// encountered an iframe, need to figure out how to deal with it
		while (typeof prevLevel !== 'number') {
			// go from outside an iframe to inside an iframe only if that
			// iframe is in context (we've seen the results of the iframe)
			if (iframeMap.has(prevLevel)) {
				const levels = iframeMap.get(prevLevel);
				prevLevel = levels[levels.length - 1];
			}
			// iframe is not in context so go on to the previous index
			else {
				prevLevel = headingLevels[--prevIndex];
			}
		}

		if (currLevel - prevLevel > 1) {
			result.result = false;
		}
	}

	return results;
}

export default headingOrderAfter;
