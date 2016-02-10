/*global Rule, Check, commons: true */

function setDefaultConfiguration(audit) {
	'use strict';

	var config = audit || {};
	config.rules = config.rules || [];
	config.checks = config.checks || [];
	config.data = config.data || {
		checks: {},
		rules: {}
	};

	return config;
}

function unpackToObject(collection, audit, method) {
	'use strict';

	var i, l;
	for (i = 0, l = collection.length; i < l; i++) {
		audit[method](collection[i]);
	}
}

/**
 * Constructor which holds configured rules and information about the document under test
 */
function Audit(audit) {
	/*jshint maxstatements:16 */
	'use strict';
	audit = setDefaultConfiguration(audit);

	axe.commons = commons = audit.commons;

	this.reporter = audit.reporter;
	this.commands = {};
	this.rules = [];
	this.checks = {};

	unpackToObject(audit.rules, this, 'addRule');
	unpackToObject(audit.checks, this, 'addCheck');
	this.data = audit.data || {
		checks: {},
		rules: {}
	};
}


/**
 * Adds a new command to the audit
 */

Audit.prototype.registerCommand = function (command) {
	'use strict';
	this.commands[command.id] = command.callback;
};

/**
 * Adds a new rule to the Audit.  If a rule with specified ID already exists, it will be overridden
 * @param {Object} spec Rule specification object
 */
Audit.prototype.addRule = function (spec) {
	'use strict';

	if (spec.metadata) {
		this.data.rules[spec.id] = spec.metadata;
	}

	var candidate;
	for (var i = 0, l = this.rules.length; i < l; i++) {
		candidate = this.rules[i];
		if (candidate.id === spec.id) {
			candidate.configure(spec);
			return;
		}
	}

	this.rules.push(new Rule(spec, this));
};

/**
 * Adds a new check to the Audit.  If a Check with specified ID already exists, it will be
 * reconfigured
 *
 * @param {Object} spec Check specification object
 */
Audit.prototype.addCheck = function (spec) {
	'use strict';

	if (spec.metadata) {
		this.data.checks[spec.id] = spec.metadata;
	}

	if (this.checks[spec.id]) {
		this.checks[spec.id].configure(spec);
	} else {
		this.checks[spec.id] = new Check(spec);
	}
};

/**
 * Runs the Audit; which in turn should call `run` on each rule.
 * @async
 * @param  {Context}   context The scope definition/context for analysis (include/exclude)
 * @param  {Object}    options Options object to pass into rules and/or disable rules or checks
 * @param  {Function} fn       Callback function to fire when audit is complete
 */
Audit.prototype.run = function (context, options, resolve, reject) {
	'use strict';
	console.log('reject:', reject);

	var q = utils.queue();
	this.rules.forEach(function (rule) {
		if (utils.ruleShouldRun(rule, context, options)) {
			q.defer(function (res, rej) {
				rule.run(context, options, res, rej);
			});
		}
	});
	q.then(resolve)
	.catch(reject);
};

/**
 * Runs Rule `after` post processing functions
 * @param  {Array} results  Array of RuleResults to postprocess
 * @param  {Mixed} options  Options object to pass into rules and/or disable rules or checks
 */
Audit.prototype.after = function (results, options) {
	'use strict';

	var rules = this.rules;

	return results.map(function (ruleResult) {
		var rule = utils.findBy(rules, 'id', ruleResult.id);

		return rule.after(ruleResult, options);
	});
};
