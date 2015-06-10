
/**
 * Determines whether a rule should run
 * @param  {Rule}    rule     The rule to test
 * @param  {Context} context  The context of the Audit
 * @param  {Object}  options  Options object
 * @return {Boolean}
 */
utils.ruleShouldRun = function (rule, context, options) {
	'use strict';
	if (rule.pageLevel && !context.page) {
		return false;
	}

	var runOnly = options.runOnly,
		ruleOptions = (options.rules || {})[rule.id];

	if (runOnly) {
		if (runOnly.type === 'rule') {
			return runOnly.values.indexOf(rule.id) !== -1;
		}

		return !!(runOnly.values || []).filter(function (item) {
			return rule.tags.indexOf(item) !== -1;
		}).length;
	}

	if ((ruleOptions && ruleOptions.hasOwnProperty('enabled')) ? !ruleOptions.enabled : !rule.enabled) {
		return false;
	}

	return true;
};