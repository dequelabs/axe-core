/*global Check, RuleResult, DqElement */

function Rule(spec) {
	'use strict';

	/**
	 * The code, or string ID of the rule
	 * @type {String}
	 */
	this.id = spec.id;

	/**
	 * Selector that this rule applies to
	 * @type {String}
	 */
	this.selector = spec.selector || null;

	/**
	 * Flag to enable or disable rule
	 * @type {Boolean}
	 */
	this.enabled = typeof spec.enabled === 'boolean' ? spec.enabled : true;

	/**
	 * Denotes if the rule should be run if Context is not an entire page AND whether
	 * the Rule should be satisified regardless of Node
	 * @type {Boolean}
	 */
	this.pageLevel = typeof spec.pageLevel === 'boolean' ? spec.pageLevel : false;

	/**
	 * Checks associated to this rule
	 * @type {Array}
	 */
	this.checks = [];

	if (spec.checks) {
		var i = 0, l = spec.checks.length;
		for (; i < l; i++) {
			this.checks.push(new Check(spec.checks[i]));
		}
	}

	if (spec.gather) {
		/**
		 * Optional function to test if rule should be run against a node, overrides Rule#matches
		 * @type {Function}
		 */
		this.gather = spec.gather;
	}

}

/**
 * Selects `HTMLElement`s based on configured selector
 * @param  {Context} context The resolved Context object
 * @return {Array}           All matching `HTMLElement`s
 */
Rule.prototype.gather = function (context) {
	'use strict';

	if (!this.selector) {
		return [];
	}

	return utils.select(this.selector, context);
};

/**
 * Runs the Rule's `evaluate` function
 * @param  {Context}   context  The resolved Context object
 * @param  {Mixed}   options  Options specific to this rule
 * @param  {Function} callback Function to call when evaluate is complete; receives a RuleResult instance
 */
Rule.prototype.run = function (context, options, callback) {
	'use strict';

	var nodes = this.gather(context);
	var q = utils.queue();
	var self = this;
	var ruleResult;
	var checkOptions = options && options.checks;

	function processNodes() {
		nodes.forEach(function (node) {
			q.defer(function  (nodeQueue) {
				var checkQueue = utils.queue();
				self.checks.forEach(function (check) {
					var option = utils.findBy(checkOptions, 'id', check.id),
						enabled = option && option.hasOwnProperty('enabled') ? option.enabled : check.enabled;

					if (check.matches(node) && enabled) {
						checkQueue.defer(function (done) {
							check.run(node, option, done);
						});
					}
				});
				checkQueue.then(function (checks) {
					ruleResult.details.push({
						node: new DqElement(node),
						checks: checks
					});
					nodeQueue();
				});

			});
		});
	}
	ruleResult = new RuleResult(this);
	processNodes();
	q.then(function () {
		callback(ruleResult);
	});

};

/**
 * Iterates the rule's Checks looking for ones that have an after function
 * @param  {Rule} rule The rule to check for after checks
 * @return {Array}      Checks that have an after function
 */
function findAfterChecks(rule) {
	'use strict';

	return rule.checks.filter(function (check) {
		return typeof check.after === 'function';
	});
}

/**
 * Finds and collates all results for a given Check on a specific Rule
 * @param  {Array} details RuleResult#details; array of 'detail' objects
 * @param  {String} checkID The ID of the Check to find
 * @return {Array}         Matching CheckResults
 */
function findCheckResults(details, checkID) {
	'use strict';

	var checkResults = [];
	details.forEach(function (nodeResult) {
		nodeResult.checks.forEach(function (checkResult) {
			if (checkResult.id === checkID) {
				checkResults.push(checkResult);
			}
		});
	});
	return checkResults;
}

/**
 * Runs all of the Rule's Check#after methods
 * @param  {RuleResult} result  The "pre-after" RuleResult
 * @param  {Mixed} options Options specific to the rule
 * @return {RuleResult}         The RuleResult as filtered by after functions
 */
Rule.prototype.after = function (result, options) {
	'use strict';

	var afterChecks = findAfterChecks(this);
	afterChecks.forEach(function (check) {
		var beforeResults = findCheckResults(result.details, check.id);
		var afterResults = check.after(beforeResults, options);
		beforeResults.forEach(function (item) {
			if (afterResults.indexOf(item) === -1) {
				item.filtered = true;
			}
		});
	});

	result.details = result.details.filter(function (detail) {
		detail.checks = detail.checks.filter(function (check) {
			return check.filtered !== true;
		});
		return !!detail.checks.length;
	});
	return result;
};
