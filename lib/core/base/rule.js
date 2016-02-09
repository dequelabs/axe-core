/*global RuleResult */

function Rule(spec, parentAudit) {
	'use strict';

	this._audit = parentAudit;

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
	this.any = spec.any || [];

	/**
	 * Checks that must all return true to satisfy rule
	 * @type {Array}
	 */
	this.all = spec.all || [];

	/**
	 * Checks that none may return true to satisfy rule
	 * @type {Array}
	 */
	this.none = spec.none || [];

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

Rule.prototype.runChecks = function (type, node, options, resolve, reject) {
	'use strict';

	var self = this;
	var checkQueue = utils.queue();
	this[type].forEach(function (c) {
		var check = self._audit.checks[c.id || c];
		var option = utils.getCheckOption(check, self.id, options);
		checkQueue.defer(function (res, rej) {
			check.run(node, option, res, rej);
		});
	});

	checkQueue.then(function (results) {
		results = results.filter(function (check) {
			return check;
		});
		resolve({ type: type, results: results });
	}).catch(reject);

};

/**
 * Runs the Rule's `evaluate` function
 * @param  {Context}   context  The resolved Context object
 * @param  {Mixed}   options  Options specific to this rule
 * @param  {Function} callback Function to call when evaluate is complete; receives a RuleResult instance
 */
Rule.prototype.run = function (context, options, resolve, reject) {
	'use strict';

	var nodes = this.gather(context);
	var q = utils.queue();
	var self = this;
	var ruleResult;

	ruleResult = new RuleResult(this);
	nodes.forEach(function (node) {
		if (self.matches(node)) {
			q.defer(function (resolveNode, rejectNode) {
				var checkQueue = utils.queue();
				checkQueue.defer(function (res, rej) {
					self.runChecks('any', node, options, res, rej);
				});
				checkQueue.defer(function (res, rej) {
					self.runChecks('all', node, options, res, rej);
				});
				checkQueue.defer(function (res, rej) {
					self.runChecks('none', node, options, res, rej);
				});

				checkQueue.then(function (results) {
					if (results.length) {
						var hasResults = false,
							result = {
								node: new utils.DqElement(node)
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
					resolveNode();
				}).catch(rejectNode);

			});
		}
	});

	q.then(function () {
		resolve(ruleResult);
	}).catch(reject);

};

/**
 * Iterates the rule's Checks looking for ones that have an after function
 * @private
 * @param  {Rule} rule The rule to check for after checks
 * @return {Array}      Checks that have an after function
 */
function findAfterChecks(rule) {
	'use strict';

	return utils.getAllChecks(rule).map(function (c) {
		var check = rule._audit.checks[c.id || c];
		return typeof check.after === 'function' ? check : null;
	}).filter(Boolean);
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

function sanitizeNodes(result) {
	'use strict';
	var checkTypes = ['any', 'all', 'none'];

	var nodes = result.nodes.filter(function (detail) {
		var length = 0;
		checkTypes.forEach(function (type) {
			detail[type] = filterChecks(detail[type]);
			length += detail[type].length;
		});
		return length > 0;
	});

	if (result.pageLevel && nodes.length) {
		nodes = [nodes.reduce(function (a, b) {
			if (a) {
				checkTypes.forEach(function (type) {
					a[type].push.apply(a[type], b[type]);
				});
				return a;
			}
		})];
	}
	return nodes;
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

	result.nodes = sanitizeNodes(result);
	return result;
};

/**
 * Reconfigure a rule after it has been added
 * @param {Object} spec - the attributes to be reconfigured
 */
Rule.prototype.configure = function (spec) {
	/*jshint maxcomplexity:13 */
	/*jshint maxstatements:18 */
	'use strict';

	if (spec.hasOwnProperty('selector')) {
		this.selector = spec.selector;
	}

	if (spec.hasOwnProperty('excludeHidden')) {
		this.excludeHidden = typeof spec.excludeHidden === 'boolean' ? spec.excludeHidden : true;
	}

	if (spec.hasOwnProperty('enabled')) {
		this.enabled = typeof spec.enabled === 'boolean' ? spec.enabled : true;
	}

	if (spec.hasOwnProperty('pageLevel')) {
		this.pageLevel = typeof spec.pageLevel === 'boolean' ? spec.pageLevel : false;
	}

	if (spec.hasOwnProperty('any')) {
		this.any = spec.any;
	}

	if (spec.hasOwnProperty('all')) {
		this.all = spec.all;
	}

	if (spec.hasOwnProperty('none')) {
		this.none = spec.none;
	}

	if (spec.hasOwnProperty('tags')) {
		this.tags = spec.tags;
	}

	if (spec.hasOwnProperty('matches')) {
		this.matches = spec.matches;
	}
};
