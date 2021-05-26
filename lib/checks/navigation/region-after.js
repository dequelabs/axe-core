function regionAfter(results) {
  const iframesInRegions = [];

  results.forEach(r => {
    if (r.data && r.data.nodeName === 'iframe') {
      // if result is true, the rule detected the iframe was in a region
      if (r.result) {
        iframesInRegions.push(r.node.ancestry);
      }
      // pass every iframe element
      r.result = true;
    } else if (!r.result) {
      // check if any node that failed is contained in an iframe that's in a region
      // if it does, the node should pass
      r.result = iframesInRegions.some(iframe => {
        return iframe.every((value, index) => value === r.node.ancestry[index]);
      });
    }
  });

  return results;
}

export default regionAfter;
