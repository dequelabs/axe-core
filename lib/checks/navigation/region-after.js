import { matchAncestry } from '../../core/utils';

function regionAfter(results) {
  const iframeResults = results.filter(r => r.data.isIframe);

  results.forEach(r => {
    // this element failed the check and is in a frame
    // if the container frame passed the check, this element should also pass
    if (!r.result && r.node.ancestry.length > 1) {
      const frameAncestry = r.node.ancestry.slice(0, -1);

      for (const iframeResult of iframeResults) {
        if (matchAncestry(frameAncestry, iframeResult.node.ancestry)) {
          r.result = iframeResult.result;
          break;
        }
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
