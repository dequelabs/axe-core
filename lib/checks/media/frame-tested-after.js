const joinStr = ' > ';

function frameTestedAfter(results) {
  const iframes = {};

  return results.filter(result => {
    const frameResult =
      result.node.ancestry[result.node.ancestry.length - 1] !== 'html';

    if (frameResult) {
      iframes[result.node.ancestry.join(joinStr)] = result;
      return true;
    }

    // remove the `html` from the path to get the iframe path
    const ancestry = result.node.ancestry
      .slice(0, result.node.ancestry.length - 1)
      .join(joinStr);

    // pass for each iframe that has an html result
    if (iframes[ancestry]) {
      iframes[ancestry].result = true;
    }

    return false;
  });
}

export default frameTestedAfter;
