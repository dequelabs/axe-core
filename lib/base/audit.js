/*global DqDocument, Rule */

/**
 * Constructor which holds configured rules and information about the document under test
 */
function Audit() {
	'use strict';

	this.rules = [];
	this.document = new DqDocument(document);
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
		option = utils.findMatchingOption(rule.id, options);
		if (!option || (!option.hasOwnProperty('enabled') && rule.enabled) || option.enabled) {
			q.defer(function (cb) {
				rule.run(context, option, cb);
			});
		}
	});
	q.then(fn);
};

/**
 * Find a rule on the audit
 * @param  {String} id The `id` of the rule to find
 * @return {Object}    Either the
 */
Audit.prototype.findRule = function (id) {
	'use strict';

	var retVal;
	this.rules.forEach(function (rule) {
		if (rule.id === id) {
			retVal = rule;
		}
	});
	return retVal;
};

/**
 * Runs after the audit is complete, but before the callback is fired
 * @param  {undefined}  context Unused
 * @param  {Object}    options Options object to pass into rules and/or disable rules or checks
 * @param  {Unknown}    results @todo what is this?
 * @param  {Function} fn      Callback to fire once all `after` functions have completed
 */
Audit.prototype.after = function (context, options, results, fn) {
	'use strict';
	var q = utils.queue(),
		that = this;
	results.forEach(function (ruleResult) {
		if (ruleResult.type === dqre.constants.rule.PAGE && ruleResult.details.length) {
			q.defer(function (cb) {
				var rule, option;
				rule = that.findRule(ruleResult.id);
				option = utils.findMatchingOption(rule.id, options);
				rule.after(document.documentElement, option, ruleResult, cb);
			});
		}
	});
	q.then(function (afterResults) {
		results.forEach(function (ruleResult, index, arr) {
			var found = false;
			if (ruleResult.type === dqre.constants.rule.PAGE) {
				afterResults.forEach(function (result) {
					if (result.id === ruleResult.id) {
						arr[index] = result; // replace the other result with this one
						found = true;
					}
				});
				if (!found) {
					arr.splice(index, 1);
				}
			}
		});
		fn(results);
	});
};