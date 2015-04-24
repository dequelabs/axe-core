/*global Check, RuleResult, DqElement */

/**
 * Unpacks and instantiates Checks
 * @private
 */
function unpackChecks(rule, spec) {
	'use strict';

	var i, l;
	if (spec.all) {
		for (i = 0, l = spec.all.length; i < l; i++) {
			rule.all.push(new Check(spec.all[i]));
		}
	}

	if (spec.none) {
		for (i = 0, l = spec.none.length; i < l; i++) {
			rule.none.push(new Check(spec.none[i]));
		}
	}

	if (spec.any) {
		for (i = 0, l = spec.any.length; i < l; i++) {
			rule.any.push(new Check(spec.any[i]));
		}
	}
}

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
	this.selector = spec.selector || '*';

	/**
	 * Whether to exclude hiddden elements form analysis.  Defaults to true.
	 * @type {Boolean}
	 */
	this.excludeHidden = typeof spec.excludeHidden === 'boolean' ? spec.excludeHidden : true;

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
	 * Checks that any may return true to satisfy rule
	 * @type {Array}
	 */
	this.any = [];

	/**
	 * Checks that must all return true to satisfy rule
	 * @type {Array}
	 */
	this.all = [];

	/**
	 * Checks that none may return true to satisfy rule
	 * @type {Array}
	 */
	this.none = [];

	unpackChecks(this, spec);

	/**
	 * Tags associated to this rule
	 * @type {Array}
	 */
	this.tags = spec.tags || [];

	if (spec.matches) {
		/**
		 * Optional function to test if rule should be run against a node, overrides Rule#matches
		 * @type {Function}
		 */
		this.matches = spec.matches;
	}

}

/**
 * Optionally test each node against a `matches` function to determine if the rule should run against
 * a given node.  Defaults to `true`.
 * @return {Boolean}    Whether the rule should run
 */
Rule.prototype.matches = function () {
	'use strict';

	return true;
};

/**
 * Selects `HTMLElement`s based on configured selector
 * @param  {Context} context The resolved Context object
 * @return {Array}           All matching `HTMLElement`s
 */
Rule.prototype.gather = function (context) {
	'use strict';
	var elements = utils.select(this.selector, context);
	if (this.excludeHidden) {
		return elements.filter(function (element) {
			return !utils.isHidden(element);
		});
	}
	return elements;
};

Rule.prototype.runChecks = function (type, node, options, callback) {
	'use strict';

	var self = this;
	var checkQueue = utils.queue();
	this[type].forEach(function (check) {
		var option = utils.getCheckOption(check, self.id, options);
		checkQueue.defer(function (done) {
			check.run(node, option, done);
		});
	});

	checkQueue.then(function (results) {
		results = results.filter(function (check) {
			return check;
		});
		callback({ type: type, results: results });
	});

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

	ruleResult = new RuleResult(this);
	nodes.forEach(function (node) {
		if (self.matches(node)) {
			q.defer(function (nodeQueue) {
				var checkQueue = utils.queue();
				checkQueue.defer(function (done) {
					self.runChecks('any', node, options, done);
				});
				checkQueue.defer(function (done) {
					self.runChecks('all', node, options, done);
				});
				checkQueue.defer(function (done) {
					self.runChecks('none', node, options, done);
				});

				checkQueue.then(function (results) {
					if (results.length) {
						var hasResults = false,
							result = {
								node: new DqElement(node)
							};
						results.forEach(function (r) {
							var res = r.results.filter(function (result) {
								return result;
							});
							result[r.type] = res;
							if (res.length) {
								hasResults = true;
							}
						});
						if (hasResults) {
							ruleResult.nodes.push(result);
						}
					}
					nodeQueue();
				});

			});
		}
	});

	q.then(function () {
		callback(ruleResult);
	});

};

/**
 * Iterates the rule's Checks looking for ones that have an after function
 * @private
 * @param  {Rule} rule The rule to check for after checks
 * @return {Array}      Checks that have an after function
 */
function findAfterChecks(rule) {
	'use strict';

	return utils.getAllChecks(rule).filter(function (check) {
		return typeof check.after === 'function';
	});
}

/**
 * Finds and collates all results for a given Check on a specific Rule
 * @private
 * @param  {Array} nodes RuleResult#nodes; array of 'detail' objects
 * @param  {String} checkID The ID of the Check to find
 * @return {Array}         Matching CheckResults
 */
function findCheckResults(nodes, checkID) {
	'use strict';

	var checkResults = [];
	nodes.forEach(function (nodeResult) {
		var checks = utils.getAllChecks(nodeResult);
		checks.forEach(function (checkResult) {
			if (checkResult.id === checkID) {
				checkResults.push(checkResult);
			}
		});
	});
	return checkResults;
}

function filterChecks(checks) {
	'use strict';

	return checks.filter(function (check) {
		return check.filtered !== true;
	});
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
	var ruleID = this.id;
	afterChecks.forEach(function (check) {
		var beforeResults = findCheckResults(result.nodes, check.id);
		var option = utils.getCheckOption(check, ruleID, options);

		var afterResults = check.after(beforeResults, option);
		beforeResults.forEach(function (item) {
			if (afterResults.indexOf(item) === -1) {
				item.filtered = true;
			}
		});
	});

	result.nodes = result.nodes.filter(function (detail) {
		detail.any = filterChecks(detail.any);
		detail.all = filterChecks(detail.all);
		detail.none = filterChecks(detail.none);
		return (detail.any.length + detail.all.length + detail.none.length) > 0;
	});
	if (this.pageLevel && result.nodes.length) {
		result.nodes = [result.nodes.reduce(function (a, b) {
			if (a) {
				a.any.push.apply(a.any, b.any);
				a.all.push.apply(a.all, b.all);
				a.none.push.apply(a.none, b.none);
			}
		})];
	}
	return result;
};
