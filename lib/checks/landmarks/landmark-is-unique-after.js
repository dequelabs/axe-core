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

  return groups.flatMap(group => {
    // Landmarks sharing a role and label are allowed when the content of
    // each is identical, such as pagination above and below a table:
    // https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#aria_lh_step3
    if (group.length > 1 && hasIdenticalContent(group)) {
      group.forEach(result => {
        result.relatedNodes = [];
      });
      return group;
    }

    // filter out landmark elements that share the same role and accessible text
    // so every non-unique landmark isn't reported as a failure (just the first)
    const [firstResult, ...duplicates] = group;
    firstResult.relatedNodes = duplicates.map(
      duplicate => duplicate.relatedNodes[0]
    );
    if (duplicates.length) {
      firstResult.result = false;
    }
    return [firstResult];
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
