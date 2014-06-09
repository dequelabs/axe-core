/*global Check, RuleResult */

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

	this.impact = spec.impact || dqre.constants.impact.MAJOR;

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
					var option = utils.findMatchingOption(check.id, checkOptions),
						enabled = option && option.hasOwnProperty('enabled') ? option.enabled : check.enabled;

					if (check.matches(node) && enabled) {
						checkQueue.defer(function (done) {
							check.run(node, option, done);
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
	ruleResult = new RuleResult(this);
	processNodes();
	q.then(function () {
		//@todo wrong place
		ruleResult.result =  utils.bubbleRuleResult(ruleResult.details) || dqre.constants.result.NA;
		callback(ruleResult);
	});

};