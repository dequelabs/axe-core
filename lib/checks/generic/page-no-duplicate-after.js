function pageNoDuplicateAfter(results) {
  console.log(window.location.href)
  // ignore results
  return results.filter(checkResult => checkResult.data !== 'ignored');
}

export default pageNoDuplicateAfter;
