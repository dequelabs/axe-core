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
		if (rule.pageLevel && !context.page) {
			return;
		}

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