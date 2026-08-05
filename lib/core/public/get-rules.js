/**
 * Searches and returns rules that contain a tag in the list of tags.
 * @param  {Array}   tags  Optional array of tags
 * @return {Array}  Array of rules
 */
function getRules(tags) {
  tags = tags || [];
  const { rules, data, tagExclude } = axe._audit;

  const matchingRules = !tags.length
    ? rules
    : rules.filter(item => {
        return !!tags.filter(tag => {
          return item.tags.indexOf(tag) !== -1;
        }).length;
      });

  const ruleData = data.rules || {};
  return matchingRules.map(matchingRule => {
    const rd = ruleData[matchingRule.id] || {};
    return {
      ruleId: matchingRule.id,
      description: rd.description,
      help: rd.help,
      helpUrl: rd.helpUrl,
      tags: matchingRule.tags,
      actIds: matchingRule.actIds,
      enabled:
        matchingRule.enabled &&
        !matchingRule.tags.some(tag => tagExclude.includes(tag))
    };
  });
}

export default getRules;
