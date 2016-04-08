/**
 * Check if a rule matches the value of runOnly type=tag
 * @private
 * @param  {object} rule
 * @param  {object}	runOnly Value of runOnly with type=tags
 * @return {bool}
 */
function matchTags(rule, runOnly) {
	'use strict';
	var include, exclude, matching;

	// normalize include/exclude
	if (runOnly.include || runOnly.exclude) {
		// Wrap include and exclude if it's not already an array
		include = runOnly.include || [];
		include = Array.isArray(include) ? include : [include];

		exclude = runOnly.exclude || [];
		exclude = Array.isArray(exclude) ? exclude : [exclude];

	// Otherwise, only use the include value, ignore exclude
	} else {
		include = Array.isArray(runOnly) ? runOnly : [runOnly];
		exclude = [];
	}

	matching = include.some((tag) => rule.tags.indexOf(tag) !== -1);

	if (matching) {
		return !exclude.some((tag) => rule.tags.indexOf(tag) !== -1);

	} else {
		return false;
	}
}


/**
 * Determines whether a rule should run
 * @param  {Rule}    rule     The rule to test
 * @param  {Context} context  The context of the Audit
 * @param  {Object}  options  Options object
 * @return {Boolean}
 */
axe.utils.ruleShouldRun = function (rule, context, options) {
	'use strict';
	var runOnly = options.runOnly || {};
	var ruleOptions = (options.rules || {})[rule.id];

	// Never run page level rules if the context is not on the page
	if (rule.pageLevel && !context.page) {
		return false;

	// First, runOnly type rule overrides anything else
	} else if (runOnly.type === 'rule') {
		return runOnly.values.indexOf(rule.id) !== -1;

	// Second, if options.rules[rule].enabled is set, it overrides all
	} else if (ruleOptions && typeof ruleOptions.enabled === 'boolean') {
		return ruleOptions.enabled;

	// Third, if tags are set, look at those
	} else if(runOnly.type === 'tag' && runOnly.values) {
		return matchTags(rule, runOnly.values);

	// If nothing is set, use the default
	} else {
		return !!rule.enabled;
	}

};