/*global Check, RuleResult, RuleFrameResult */

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

	this.type = spec.type || dqre.constants.rule.NODE;

	this.priority = spec.priority || dqre.constants.priority.MAJOR;

	this.enabled = typeof spec.enabled === 'boolean' ? spec.enabled : true;

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
					var option = utils.findMatchingOption(check.id, checkOptions),
						enabled = option && option.hasOwnProperty('enabled') ? option.enabled : check.enabled;

					if (check.matches(node) && enabled) {
						checkQueue.defer(function (done) {
							check.runEvaluate(node, option, done);
						});
					}
				});
				checkQueue.then(function (checks) {
					ruleResult.addResults(node, checks);
					nodeQueue();
				});

			});
		});
	}
	if (this.type !== dqre.constants.rule.PAGE) {
		ruleResult = new RuleResult(this);
		processNodes();
		q.then(function () {
			ruleResult.result = utils.bubbleResult(ruleResult.details) || dqre.constants.result.NA;
			callback(ruleResult);
		});
	} else {
		ruleResult = new RuleFrameResult(this);
		processNodes();
		q.then(function () {
			callback(ruleResult);
		});
	}

};


Rule.prototype.after = function (node, options, ruleResult, callback) {
	'use strict';
	var q = utils.queue();
	var self = this;
	var newRuleResult;
	var checkOptions = options && options.checks;

	function getCheckData(ruleResult, checkId) {
		var data = [];

		ruleResult.details.forEach(function (nodeData) {
			nodeData.checks.forEach(function (ck) {
				if (ck.id === checkId && ck.data) {
					data.push(ck.data);
				}
			});
		});
		return data;
	}
	if (this.type === dqre.constants.rule.PAGE) {
		newRuleResult = new RuleResult(this);

		q.defer(function  (nodeQueue) {
			var checkQueue = utils.queue();
			self.checks.forEach(function (check) {
				var data = getCheckData(ruleResult, check.id);

				checkQueue.defer(function (done) {
					var option = utils.findMatchingOption(check.id, checkOptions);
					check.runAfter(data, option, done);
				});
			});
			checkQueue.then(function (checks) {
				newRuleResult.addResults(node, checks);
				nodeQueue();
			});

		});
		q.then(function () {
			newRuleResult.result = utils.bubbleResult(newRuleResult.details) || dqre.constants.result.NA;
			callback(newRuleResult);
		});
	}
};