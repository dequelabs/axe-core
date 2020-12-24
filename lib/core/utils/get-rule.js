/**
 * Get an axe rule by id.
 * @param {String} ruelId the rule id
 * @return {Rule}
 */
function getRule(ruleId) {
  // TODO: es-modules_audit
  return axe._audit.rules.find(rule => rule.id === ruleId);
}

export default getRule;
