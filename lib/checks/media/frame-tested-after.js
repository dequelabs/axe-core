const joinStr = ' > ';

function frameTestedAfter(results) {
  const iframes = {};

  return results.filter(result => {
    const frameResult =
      result.node.ancestry[result.node.ancestry.length - 1] !== 'html';

    if (frameResult) {
      const ancestry = result.node.ancestry.flat(Infinity).join(joinStr);
      iframes[ancestry] = result;
      return true;
    }

    // remove the `html` from the path to get the iframe path
    const ancestry = result.node.ancestry
      .slice(0, result.node.ancestry.length - 1)
      .flat(Infinity)
      .join(joinStr);

    // pass for each iframe that has an html result
    if (iframes[ancestry]) {
      iframes[ancestry].result = true;
    }

    return false;
  });
}

export default frameTestedAfter;
