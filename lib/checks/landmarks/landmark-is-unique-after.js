function landmarkIsUniqueAfter(results) {
  const uniqueLandmarks = [];

  // filter out landmark elements that share the same role and accessible text
  // so every non-unique landmark isn't reported as a failure (just the first)
  return results.filter(currentResult => {
    const findMatch = someResult => {
      return (
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
}

export default landmarkIsUniqueAfter;
