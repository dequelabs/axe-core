const uniqueLandmarks = [];
results.forEach(currentResult => {
	const findMatch = someResult => {
		return (
			currentResult.data.role === someResult.data.role &&
			currentResult.data.label === someResult.data.label
		);
	};

	const foundResultIndex = uniqueLandmarks.findIndex(findMatch);
	if (foundResultIndex === -1) {
		uniqueLandmarks.push(currentResult);
	} else {
		currentResult.result = false;
		uniqueLandmarks[foundResultIndex].result = false;
	}
});

return results;
