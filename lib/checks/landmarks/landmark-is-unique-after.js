function landmarkIsUniqueAfter(results) {
  const uniqueLandmarks = [];

  // console.log("landmarkIsUniqueAfter results: ", JSON.stringify(results, null, 4));

  // filter out landmark elements that share the same role and accessible text
  // so every non-unique landmark isn't reported as a failure (just the first)
  var filtered = results.filter(currentResult => {
    if (!currentResult.data) {
      // console.log('landmarkIsUniqueAfterlandmarkIsUniqueAfter NO DATA???!!!');
      return false;
    }

    var findMatch = someResult => {
      return (
        // currentResult.data.isLandmark &&
        // someResult.data.isLandmark &&
        currentResult.data.role === someResult.data.role &&
        currentResult.data.accessibleText === someResult.data.accessibleText
      );
    };

    const matchedResult = uniqueLandmarks.find(findMatch);
    if (matchedResult) {
      matchedResult.result = false;
      matchedResult.relatedNodes.push(currentResult.relatedNodes[0]);
      return false;
    }

    uniqueLandmarks.push(currentResult);
    currentResult.relatedNodes = [];
    return true;
  });

  // console.log("landmarkIsUniqueAfter filtered: ", JSON.stringify(filtered, null, 4));
  return filtered;
}

export default landmarkIsUniqueAfter;
