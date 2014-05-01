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


Rule.prototype.run = function (context, callback) {
	'use strict';

	var nodes = this.gather(context);
	var q = utils.queue();
	var self = this;
	var ruleResult = new RuleResult(this);

	nodes.forEach(function (node) {
		q.defer(function (nodeQueue) {
			var checkQueue = utils.queue();
			self.checks.forEach(function (check) {
				if (check.matches(node)) {
					checkQueue.defer(function (done) {
						check.run(node, done);
					});
				}
			});
			checkQueue.then(function (checks) {
				ruleResult.addResults(node, checks);
				nodeQueue();
			});

		});
	});

	q.then(function () {
		ruleResult.result = utils.bubbleResult(ruleResult.details) || dqre.constants.result.NA;
		callback(ruleResult);
	});

};