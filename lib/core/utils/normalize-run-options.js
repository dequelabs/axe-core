/**
 * Ensure all rules that are expected to run exist
 * @throws {Error} If any tag or rule specified in options is unknown
 * @param  {Object} options  Options object
 * @return {Object}          Validated options object
 */
export default function normalizeRunOptions(options) {
  const tags = [];
  const ruleIds = [];
  axe._audit.rules.forEach(rule => {
    ruleIds.push(rule.id);
    rule.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  // Validate runOnly
  if (['object', 'string'].includes(typeof options.runOnly)) {
    if (typeof options.runOnly === 'string') {
      options.runOnly = [options.runOnly];
    }
    if (Array.isArray(options.runOnly)) {
      const hasTag = options.runOnly.find(value => tags.includes(value));
      const hasRule = options.runOnly.find(value => ruleIds.includes(value));
      if (hasTag && hasRule) {
        throw new Error('runOnly cannot be both rules and tags');
      }
      if (hasRule) {
        options.runOnly = {
          type: 'rule',
          values: options.runOnly
        };
      } else {
        options.runOnly = {
          type: 'tag',
          values: options.runOnly
        };
      }
    }
    const only = options.runOnly;
    if (only.value && !only.values) {
      only.values = only.value;
      delete only.value;
    }
    if (!Array.isArray(only.values) || only.values.length === 0) {
      throw new Error('runOnly.values must be a non-empty array');
    }
    // Check if every value in options.runOnly is a known rule ID
    if (['rule', 'rules'].includes(only.type)) {
      only.type = 'rule';
      only.values.forEach(ruleId => {
        if (!ruleIds.includes(ruleId)) {
          throw new Error('unknown rule `' + ruleId + '` in options.runOnly');
        }
      });
      // Validate 'tags' (e.g. anything not 'rule')
    } else if (['tag', 'tags', undefined].includes(only.type)) {
      only.type = 'tag';

      const unmatchedTags = only.values.filter(
        tag => !tags.includes(tag) && !/wcag2[1-3]a{1,3}/.test(tag)
      );
      if (unmatchedTags.length !== 0) {
        axe.log('Could not find tags `' + unmatchedTags.join('`, `') + '`');
      }
    } else {
      throw new Error(`Unknown runOnly type '${only.type}'`);
    }
  }
  if (typeof options.rules === 'object') {
    Object.keys(options.rules).forEach(ruleId => {
      if (!ruleIds.includes(ruleId)) {
        throw new Error('unknown rule `' + ruleId + '` in options.rules');
      }
    });
  }
  return options;
}
