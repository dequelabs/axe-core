import { matchAncestry } from '../../core/utils';

function regionAfter(results) {
  results.forEach((r, index) => {
    // this element failed the check
    if (!r.result) {
      // we need to see if it's actually contained in an iframe that passed the check
      const ancestryMinusLast = r.node.ancestry.slice(0, -1);

      // we only need to check up to index - 1 because the iframe this element might be contained in will have been found before this element
      for (const earlierResult of results.slice(0, index - 1)) {
        // matches if the current result came from the iframe that's represented by earlierResult
        if (matchAncestry(ancestryMinusLast, earlierResult.node.ancestry)) {
          r.result = earlierResult.result;
        }
      }
    }
  });

  // now pass all the iframe elements
  // but for some reason this makes children of iframes pass too?
  results.forEach(r => {
    // this element failed the check
    if (!r.result && r.node._element.nodeName === 'IFRAME') {
      r.result = true;
    }
  });
  return results;
}

export default regionAfter;
