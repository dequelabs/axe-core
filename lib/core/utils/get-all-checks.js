/**
 * Gets all Checks (or CheckResults) for a given Rule or RuleResult
 * @param {RuleResult|Rule} rule
 */
function getAllChecks(object) {
  const result = [];
  return result
    .concat(object.any || [])
    .concat(object.all || [])
    .concat(object.none || []);
}

export default getAllChecks;
