/*global DqDocument, Rule */
function Audit(frames) {
	'use strict';

	this.rules = [];
	this.document = new DqDocument(document, frames);
}

Audit.prototype.addRule = function (spec) {
	'use strict';

	this.rules.push(new Rule(spec));
};

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