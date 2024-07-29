function accesskeysAfter(results) {
  const seen = {};
  return results
    .filter(r => {
      if (!r.data) {
        return false;
      }
      const key = r.data.toUpperCase();
      if (!seen[key]) {
        seen[key] = r;
        r.relatedNodes = [];
        return true;
      }
      seen[key].relatedNodes.push(r.relatedNodes[0]);
      return false;
    })
    .map(r => {
      r.result = !!r.relatedNodes.length;
      return r;
    });
}

export default accesskeysAfter;
