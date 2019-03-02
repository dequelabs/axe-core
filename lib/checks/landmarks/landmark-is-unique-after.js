const uniqueLandmarks = [];
return results.filter(currentResult => {
	const findMatch = someResult => {
		return (
			currentResult.data.role === someResult.data.role &&
			currentResult.data.label === someResult.data.label
		);
	};

	const findIndex = (array, matchingFunction) => {
		for (let index = 0; index < array.length; index++) {
			if (matchingFunction(array[index])) {
				return index;
			}
		}
		return -1;
	};

	const foundResultIndex = findIndex(uniqueLandmarks, findMatch);
	if (foundResultIndex === -1) {
		uniqueLandmarks.push(currentResult);
		currentResult.relatedNodes = [];
		return true;
	} else {
		const matchedResult = uniqueLandmarks[foundResultIndex];
		matchedResult.result = false;
		matchedResult.relatedNodes.push(currentResult.relatedNodes[0]);
		return false;
	}
});
