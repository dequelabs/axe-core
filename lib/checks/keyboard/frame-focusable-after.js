function frameFocusableAfter(results) {
  const resultMap = new Map();
  results.forEach(result => {
    const element = result.node._element;
    const res = resultMap.get(element) || true;
    resultMap.set(element, res && result.result);
  });

  const finalResults = [];
  const entries = resultMap.entries();
  for (const entry of entries) {
    const [element, res] = entry;
    const result = results.find(result => result.node._element === element);
    result.result = res;
    finalResults.push(result);
  }

  return finalResults;
}

export default frameFocusableAfter;