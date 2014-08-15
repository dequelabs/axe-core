/*global Rule */

/**
 * Constructor which holds configured rules and information about the document under test
 */
function Audit() {
	'use strict';

	this.rules = [];
}

/**
 * Adds a rule to the audit
 * @param {Object} spec Rule "specification" object
 */
Audit.prototype.addRule = function (spec) {
	'use strict';

	this.rules.push(new Rule(spec));
};

/**
 * Runs the Audit; which in turn should call `run` on each rule.
 * @async
 * @param  {Context}   context The scope definition/context for analysis (include/exclude)
 * @param  {Object}    options Options object to pass into rules and/or disable rules or checks
 * @param  {Function} fn       Callback function to fire when audit is complete
 */
Audit.prototype.run = function (context, options, fn) {
	'use strict';

	var q = utils.queue(),
		option;
	this.rules.forEach(function (rule) {
		if (rule.pageLevel && !context.page) {
			return;
		}

		option = utils.findBy(options, 'id', rule.id);

		if ((option && option.hasOwnProperty('enabled')) ? option.enabled : rule.enabled) {

			q.defer(function (cb) {
				rule.run(context, option, cb);
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
		var rule = utils.findBy(rules, 'id', ruleResult.id),
			option = utils.findBy(options, 'id', ruleResult.id);

		return rule.after(ruleResult, option);
	});
};