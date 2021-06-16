import { matchAncestry } from '../../core/utils';

function regionAfter(results) {
  const iframeResults = results.filter(r => r.data.isIframe);

  results.forEach(r => {
    // continue if the element passed the check or is not in a frame
    if (r.result || r.node.ancestry.length === 1) {
      return;
    }

    const frameAncestry = r.node.ancestry.slice(0, -1);
    for (const iframeResult of iframeResults) {
      // if the container frame passed the check, this element should also pass
      if (matchAncestry(frameAncestry, iframeResult.node.ancestry)) {
        r.result = iframeResult.result;
        break;
      }
    }
  });

  // iframe elements should always pass
  iframeResults.forEach(r => {
    if (!r.result) {
      r.result = true;
    }
  });
  return results;
}

export default regionAfter;
