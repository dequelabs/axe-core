/**
 * Get an axe rule by id.
 * @param {String} ruelId the rule id
 * @return {Rule}
 */
export default function getRule(ruleId) {
  // TODO: es-modules_audit
  const rule = axe._audit.rules.find(({ id }) => id === ruleId);

  if (!rule) {
    throw new Error(`Cannot find rule by id: ${ruleId}`);
  }

  return rule;
}
