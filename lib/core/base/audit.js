/*global Rule, Check, RuleResult, commons: true */

function getDefaultConfiguration(audit) {
	'use strict';
	var config;
	if (audit) {
		config = axe.utils.clone(audit);
		// Commons are configured into axe like everything else,
		// however because things go funky if we have multiple commons objects
		// we're not using the copy of that.
		config.commons = audit.commons;
	} else {
		config = {};
	}

	config.reporter = config.reporter || null;
	config.rules = config.rules || [];
	config.checks = config.checks || [];
	config.data = Object.assign({
		checks: {},
		rules: {}
	}, config.data);

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
	// defaults
	this.brand = 'axe';
	this.application = 'axeAPI';
	this.tagExclude = ['experimental'];

	this.defaultConfig = audit;
	this._init();
}

/**
 * Initializes the rules and checks
 */
Audit.prototype._init = function () {
	var audit = getDefaultConfiguration(this.defaultConfig);

	axe.commons = commons = audit.commons;

	this.reporter = audit.reporter;
	this.commands = {};
	this.rules = [];
	this.checks = {};

	unpackToObject(audit.rules, this, 'addRule');
	unpackToObject(audit.checks, this, 'addCheck');

	this.data = {};
	this.data.checks = (audit.data && audit.data.checks) || {};
	this.data.rules = (audit.data && audit.data.rules) || {};
	this.data.failureSummaries = (audit.data && audit.data.failureSummaries) || {};

	this._constructHelpUrls(); // create default helpUrls
};

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

	let rule = this.getRule(spec.id);
	if (rule) {
		rule.configure(spec);
	} else {
		this.rules.push(new Rule(spec, this));
	}
};

/**
 * Adds a new check to the Audit.  If a Check with specified ID already exists, it will be
 * reconfigured
 *
 * @param {Object} spec Check specification object
 */
Audit.prototype.addCheck = function (spec) {
	/*jshint evil:true */
	'use strict';
	let metadata = spec.metadata;

	if (typeof metadata === 'object') {
		this.data.checks[spec.id] = metadata;
		// Transform messages into functions:
		if (typeof metadata.messages === 'object') {
			Object.keys(metadata.messages)
			.filter( prop =>
				metadata.messages.hasOwnProperty(prop) &&
				typeof metadata.messages[prop] === 'string'
			).forEach( prop => {
				if (metadata.messages[prop].indexOf('function') === 0) {
					metadata.messages[prop] = (new Function('return ' + metadata.messages[prop] + ';'))();
				}
			});
		}
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
	this.validateOptions(options);

	var q = axe.utils.queue();
	this.rules.forEach(function (rule) {
		if (axe.utils.ruleShouldRun(rule, context, options)) {
			if (options.performanceTimer) {
				var markEnd = 'mark_rule_end_' + rule.id;
				var markStart = 'mark_rule_start_' + rule.id;
				axe.utils.performanceTimer.mark(markStart);
			}
			q.defer(function (res, rej) {
				rule.run(context, options, function(out) {
					if (options.performanceTimer) {
						axe.utils.performanceTimer.mark(markEnd);
						axe.utils.performanceTimer.measure('rule_'+rule.id, markStart, markEnd);
					}
					res(out);
				}, function (err) {
					if (!options.debug) {
						var errResult = Object.assign(new RuleResult(rule), {
							result: axe.constants.CANTTELL,
							description: 'An error occured while running this rule',
							message: err.message,
							help: err.stack || err.message,
							error: err
						});
						res(errResult);

					} else {
						rej(err);
					}
				});
			});
		}
	});
	q.then(function (results) {
		resolve(results.filter(function (result) { return !!result; }));
	}).catch(reject);
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
		var rule = axe.utils.findBy(rules, 'id', ruleResult.id);

		return rule.after(ruleResult, options);
	});
};

/**
 * Get the rule with a given ID
 * @param  {string}
 * @return {Rule}
 */
Audit.prototype.getRule = function (ruleId) {
	return this.rules.find(rule => rule.id === ruleId);
};

/**
 * Ensure all rules that are expected to run exist
 * @throws {Error} If any tag or rule specified in options is unknown
 * @param  {Object} options  Options object
 * @return {Object}          Validated options object
 */
Audit.prototype.validateOptions = function (options) {
	'use strict';
	var audit = this;

	// Validate runOnly
	if (typeof options.runOnly === 'object') {
		var only = options.runOnly;

		// Check if every value in options.runOnly is a known rule ID
		if (only.type === 'rule' && Array.isArray(only.value)) {
			only.value.forEach(function (ruleId) {
				if (!audit.getRule(ruleId)) {
					throw new Error('unknown rule `' + ruleId +  '` in options.runOnly');
				}
			});

		// Validate 'tags' (e.g. anything not 'rule')
		} else if (Array.isArray(only.value) && only.value.length > 0) {
			var tags = [].concat(only.value);

			audit.rules.forEach(function (rule) {
				var tagPos, i, l;
				if (!tags) {
					return;
				}
				// Remove any known tag
				for (i = 0, l = rule.tags.length; i < l; i++) {
					tagPos = tags.indexOf(rule.tags[i]);
					if (tagPos !== -1) {
						tags.splice(tagPos, 1);
					}
				}
			});
			if (tags.length !== 0) {
				throw new Error('could not find tags `' + tags.join('`, `') + '`');
			}
		}
	}

	if (typeof options.rules === 'object') {
		Object.keys(options.rules)
		.forEach(function (ruleId) {
			if (!audit.getRule(ruleId)) {
				throw new Error('unknown rule `' + ruleId +  '` in options.rules');
			}
		});
	}

	return options;
};

/*
 * Updates the default options and then applies them
 * @param  {Mixed} options  Options object
 */

Audit.prototype.setBranding = function (branding) {
	'use strict';
	let previous = {
		brand: this.brand,
		application: this.application
	};
	if (branding && branding.hasOwnProperty('brand') &&
		branding.brand && typeof branding.brand === 'string') {
		this.brand = branding.brand;
	}
	if (branding && branding.hasOwnProperty('application') &&
		branding.application && typeof branding.application === 'string') {
		this.application = branding.application;
	}
	this._constructHelpUrls(previous);
};

/**
 * For all the rules, create the helpUrl and add it to the data for that rule
 */
function getHelpUrl ({brand, application}, ruleId, version) {
	return axe.constants.helpUrlBase + brand +
		'/' + ( version || axe.version.substring(0, axe.version.lastIndexOf('.'))) +
		'/' + ruleId + '?application=' + application;
}

Audit.prototype._constructHelpUrls = function (previous = null) {
	var version = axe.version.substring(0, axe.version.lastIndexOf('.'));
	this.rules.forEach(rule => {
		if (!this.data.rules[rule.id]) {
			this.data.rules[rule.id] = {};
		}
		let metaData = this.data.rules[rule.id];
		if (
			typeof metaData.helpUrl !== 'string' ||
			(previous && metaData.helpUrl === getHelpUrl(previous, rule.id, version))
		) {
			metaData.helpUrl = getHelpUrl(this, rule.id, version);
		}
	});
};


/**
 * Reset the default rules, checks and meta data
 */

 Audit.prototype.resetRulesAndChecks = function () {
	'use strict';
 	this._init();
 };
