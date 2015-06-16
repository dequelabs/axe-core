var seen = {};
return results.filter(function (r) {
  if (!seen[r.data]) {
    seen[r.data] = r;
    r.relatedNodes = [];
    return true;
  }
  seen[r.data].relatedNodes.push(r.relatedNodes[0]);
  return false;
}).map(function (r) {
  r.result = !!r.relatedNodes.length;
  return r;
});
