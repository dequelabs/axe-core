export default function headingOrderAfter(results) {
  // Construct a map of all headings on the page
  const headingOrder = getHeadingOrder(results);
  results.forEach(result => {
    const index = headingOrder.findIndex(heading => heading.result === result);
    const currLevel = headingOrder[index]?.level ?? -1;
    const prevLevel = headingOrder[index - 1]?.level ?? -1;

    // First heading always passes
    if (index === 0) return;

    // Some data is missing
    if (currLevel === -1 || prevLevel === -1) {
      result.result = undefined;

      // Heading level is skipped
    } else if (currLevel - prevLevel > 1) {
      result.result = false;
    }
  });
  return results;
}

/**
 * Generate a flattened heading order map, from the data property
 * of heading-order results
 */
function getHeadingOrder(results) {
  // Ensure parent frames are handled first
  results = [...results];
  results.sort(({ node: nodeA }, { node: nodeB }) => {
    return nodeA.ancestry.length - nodeB.ancestry.length;
  });

  // Recursively push or splice result.data into headingOrder
  const headingOrder = results.reduce(addResultToHeadingOrder, []);
  return headingOrder.filter(({ filter }) => !filter);
}

/**
 * Add the data of a heading-order result to the headingOrder map
 */
function addResultToHeadingOrder(headingOrder, result) {
  let frameHeadingOrder = result?.data?.headingOrder;
  // Only the first selected element in the window has headingOrder info
  if (!frameHeadingOrder) {
    setResultInHeadingOrder(headingOrder, result);
    return headingOrder;
  }

  // Update the ancestry to include frame information
  frameHeadingOrder = frameHeadingOrder.map(heading => {
    return normalizeHeading(heading, result);
  });

  const index = getFrameIndex(headingOrder, result);
  // heading is not in a frame, stick 'm in at the end.
  if (index === -1) {
    headingOrder.push(...frameHeadingOrder);
  } else {
    // Mark the frame for later removal
    // Keep it, for nested iframes where a parent has no headings
    headingOrder[index].filter = true;
    headingOrder.splice(index, 0, ...frameHeadingOrder);
  }
  return headingOrder;
}

/**
 * Determine where the iframe results fit into the top-level
 * heading order
 */
function getFrameIndex(headingOrder, result) {
  let index = -1;
  const ancestry = shortenArray(result.node.ancestry, 1);
  // If a frame has no headings, but it does have iframes we might
  // not have a result. We can account for this by finding the closest
  // ancestor we do know about.
  while (ancestry.length && index === -1) {
    index = headingOrder.findIndex(heading => {
      return matchAncestry(heading.ancestry, ancestry);
    });
    ancestry.pop();
  }
  return index;
}

/**
 * Find the heading based on ancestry, and set the result property
 */
function setResultInHeadingOrder(headingOrder, result) {
  const ancestry = result.node.ancestry;
  const index = headingOrder.findIndex(heading => {
    return matchAncestry(heading.ancestry, ancestry);
  });

  if (index === -1) {
    // Something went wrong, set it to incomplete
    result.result = undefined;
    return;
  }

  headingOrder[index] = {
    ...headingOrder[index],
    result
  };
}

/**
 * Add all required props to the heading
 */
function normalizeHeading(heading, result) {
  const ancestry = combineAncestry(result, heading);
  const resultMatches = matchAncestry(result.node.ancestry, ancestry);
  return {
    ...heading,
    result: resultMatches ? result : undefined,
    ancestry
  };
}

/**
 * Take the frame ancestry from a result, and add it to the ancestry
 * of a heading.
 */
function combineAncestry(result, heading) {
  const frameAncestry = shortenArray(result.node.ancestry, 1);
  return frameAncestry.concat(heading.ancestry);
}

/**
 * Check if two ancestries are identical
 */
function matchAncestry(ancestryA, ancestryB) {
  if (ancestryA.length !== ancestryB.length) {
    return false;
  }
  return ancestryA.every((selectorA, index) => {
    const selectorB = ancestryB[index];
    if (Array.isArray(selectorA)) {
      if (selectorA.length !== selectorB.length) {
        return false;
      }
      return selectorA.every((str, index) => selectorB[index] === str);
    }
    return selectorA === selectorB;
  });
}

/**
 * Shorten an array by some number of items
 */
function shortenArray(arr, spliceLength) {
  return arr.slice(0, arr.length - spliceLength);
}
