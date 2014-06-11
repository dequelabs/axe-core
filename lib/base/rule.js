/*global Check, RuleResult, DqNode */

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
	this.selector = spec.selector;

	this.enabled = typeof spec.enabled === 'boolean' ? spec.enabled : true;

	this.pageLevel = typeof spec.pageLevel === 'boolean' ? spec.pageLevel : false;

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
	} else if (!this.selector) {
		this.selector = '*';
	}

}

Rule.prototype.gather = function (context) {
	'use strict';

	return utils.select(this.selector, context);
};

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
						node: new DqNode(node),
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

function findAfterChecks(rule) {
	'use strict';

	return rule.checks.filter(function (check) {
		return typeof check.after === 'function';
	});
}

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
