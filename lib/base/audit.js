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

Audit.prototype.run = function (context, fn) {
	'use strict';

	var q = utils.queue();
	this.rules.forEach(function (rule) {
		q.defer(function (cb) {
			rule.run(context, cb);
		});
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

Audit.prototype.after = function (context, results, fn) {
	'use strict';
	var q = utils.queue(),
		that = this, i;
	results.forEach(function (ruleResult) {
		if (ruleResult.type === dqre.constants.rule.PAGE && ruleResult.details.length) {
			q.defer(function (cb) {
				var rule;
				rule = that.findRule(ruleResult.id);
				rule.after(document.documentElement, ruleResult, cb);
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
					arr[index] = null;
				}
			}
		});
		for (i = results.length; i--;) {
			if (!results[i]) {
				results.splice(i, 1);
			}
		}
		fn(results);
	});
};