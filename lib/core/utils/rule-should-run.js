/**
 * Check if a rule matches the value of runOnly type=tag
 * @private
 * @param  {object} rule
 * @param  {object}	runOnly Value of runOnly with type=tags
 * @param  {Array}  optionTags (optional) Override tags specified by options
 * @return {bool}
 */
function matchTags(rule, runOnly, optionTags) {
	// jshint maxcomplexity: 11
	'use strict';
	var include, exclude, matching;
	var defaultExclude = (axe._audit && axe._audit.tagExclude) ? axe._audit.tagExclude : [];
	var tags = optionTags || rule.tags;

	// normalize include/exclude
	if (runOnly.include || runOnly.exclude) {
		// Wrap include and exclude if it's not already an array
		include = runOnly.include || [];
		include = Array.isArray(include) ? include : [include];

		exclude = runOnly.exclude || [];
		exclude = Array.isArray(exclude) ? exclude : [exclude];
		// add defaults, unless mentioned in include
		exclude = exclude.concat(defaultExclude.filter(function (tag) {
			return include.indexOf(tag) === -1;
		}));

	// Otherwise, only use the include value, ignore exclude
	} else {
		include = Array.isArray(runOnly) ? runOnly : [runOnly];
		// exclude the defaults not included
		exclude = defaultExclude.filter(function (tag) {
			return include.indexOf(tag) === -1;
		});
	}

	matching = include.some(function (tag) {
		return tags.indexOf(tag) !== -1;
	});
	if (matching || (include.length === 0 && rule.enabled !== false)) {
		return exclude.every(function (tag) {
			return tags.indexOf(tag) === -1;
		});
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
	// Check for override tags specified by options
	var tags = (ruleOptions || {}).tags;

	// Never run page level rules if the context is not on the page
	// Can be overridden by options.rules[rule].pageLevel
	if ((ruleOptions && ruleOptions.pageLevel === true) || rule.pageLevel && !context.page) {
		return false;

	// First, runOnly type rule overrides anything else
	} else if (runOnly.type === 'rule') {
		return runOnly.values.indexOf(rule.id) !== -1;

	// Second, if options.rules[rule].enabled is set, it overrides all
	} else if (ruleOptions && typeof ruleOptions.enabled === 'boolean') {
		return ruleOptions.enabled;

	// Third, if tags are set, look at those
	} else if(runOnly.type === 'tag' && runOnly.values) {
		return matchTags(rule, runOnly.values, tags);

	// If nothing is set, only check for default excludes
	} else {
		return matchTags(rule, [], tags);
	}

};
