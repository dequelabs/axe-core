export default function landmarkIsUniqueAfter(results) {
  const groups = [];
  results.forEach(result => {
    const group = groups.find(([firstResult]) => {
      return (
        result.data.role === firstResult.data.role &&
        result.data.accessibleText === firstResult.data.accessibleText
      );
    });
    if (group) {
      group.push(result);
    } else {
      groups.push([result]);
    }
  });

  // Landmarks sharing a role and label are allowed when the content of
  // each is identical, such as pagination above and below a table:
  // https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#aria_lh_step3
  const allowedResults = groups
    .filter(group => group.length > 1 && hasIdenticalContent(group))
    .flat();

  // filter out landmark elements that share the same role and accessible text
  // so every non-unique landmark isn't reported as a failure (just the first)
  return results.filter(result => {
    if (allowedResults.includes(result)) {
      result.relatedNodes = [];
      return true;
    }

    const [firstResult, ...duplicates] = groups.find(group =>
      group.includes(result)
    );
    if (result !== firstResult) {
      return false;
    }

    result.relatedNodes = duplicates.map(
      duplicate => duplicate.relatedNodes[0]
    );
    if (duplicates.length) {
      result.result = false;
    }
    return true;
  });
}

/**
 * Check if every result in the group has the same (non-empty) content
 * @param {Object[]} group
 * @return {Boolean}
 */
function hasIdenticalContent(group) {
  const { contentHash } = group[0].data;
  return (
    !!contentHash &&
    group.every(result => result.data.contentHash === contentHash)
  );
}
