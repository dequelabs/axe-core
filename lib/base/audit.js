/*global getReporter */

/**
 * Constructor which holds configured rules and information about the document under test
 */
function Audit(reporter) {
	'use strict';

	this.reporter = getReporter(reporter);
	this.rules = [];
	this.tools = {};
}

/**
 * Runs the Audit; which in turn should call `run` on each rule.
 * @async
 * @param  {Context}   context The scope definition/context for analysis (include/exclude)
 * @param  {Object}    options Options object to pass into rules and/or disable rules or checks
 * @param  {Function} fn       Callback function to fire when audit is complete
 */
Audit.prototype.run = function (context, options, fn) {
	'use strict';

	var q = utils.queue();
	this.rules.forEach(function (rule) {
		if (utils.ruleShouldRun(rule, context, options)) {
			q.defer(function (cb) {
				rule.run(context, options, cb);
			});
		}
	});
	q.then(fn);
};

/**
 * Runs Rule `after` post processing functions
 * @param  {Array} results  Array of RuleResults to postprocess
 * @param  {Mixed} options  Options object to pass into rules and/or disable rules or checks
 */
Audit.prototype.after = function (results, options) {
	'use strict';

	var rules = this.rules;

	return results.map(function (ruleResult) {
		var rule = utils.findBy(rules, 'id', ruleResult.id);

		return rule.after(ruleResult, options);
	});
};
