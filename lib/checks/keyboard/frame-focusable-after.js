function frameFocusableAfter(results) {
  const resultMap = new Map();

  // aggregate nested iframe results into a single result for the
  // top-most iframe. if any nested iframe fails then the entire
  // iframe stack fails
  results.forEach(result => {
    const element = result.node._element;
    const res = resultMap.get(element) || true;
    const finalResult = res && result.result;
    resultMap.set(element, finalResult);
  });

  // filter out all other iframe results and set the final result
  // of the iframe stack. since nested iframes will all use the
  // same top-level element, we only need to use the first one
  const finalResults = [];
  resultMap.forEach((finalResult, element) => {
    const result = results.find(result => result.node._element === element);
    result.result = finalResult;
    finalResults.push(result);
  });

  return finalResults;
}

export default frameFocusableAfter;
