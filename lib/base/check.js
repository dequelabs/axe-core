/*global CheckResult */

function Check(spec) {
	'use strict';

	/**
	 * Unique ID for the check.  Checks may be re-used, so there may be additional instances of checks
	 * with the same ID.
	 * @type {String}
	 */
	this.id = spec.id;

	/**
	 * Free-form options that are passed as the second parameter to the `evaluate`
	 * @type {Mixed}
	 */
	this.options = spec.options;

	/**
	 * Optional. If specified, only nodes that match this CSS selector are tested
	 * @type {String}
	 */
	this.selector = spec.selector;

	/**
	 * The 'type' of check:  PASS, FAIL, NA. Defaults to PASS
	 * @type {String}
	 */
	this.type = spec.type || dqre.constants.type.PASS;

	/**
	 * The actual code, accepts 2 parameters: node (the node under test), options (see this.options).
	 * This function is run in the context of a checkHelper, which has the following methods
	 * - `async()` - if called, the check is considered to be asynchronous; returns a callback function
	 * - `data()` - free-form data object, associated to the `CheckResult` which is specific to each node
	 * @type {Function}
	 */
	this.evaluate = spec.evaluate;

	/**
	 * Optional. Filter and/or modify checks for all nodes
	 * @type {Function}
	 */
	if (spec.after) {
		this.after = spec.after;
	}

	if (spec.matches) {
		/**
		 * Optional function to test if check should be run against a node, overrides Check#matches
		 * @type {Function}
		 */
		this.matches = spec.matches;
	}

	/**
	 * enabled by default, if false, this check will not be included in the rule's evaluation
	 * @type {Boolean}
	 */
	this.enabled = spec.hasOwnProperty('enabled') ? spec.enabled : true;
}

/**
 * Determines whether the check should be run against a node
 * @param  {HTMLElement} node The node to test
 * @return {Boolean}      Whether the check should be run
 */
Check.prototype.matches = function (node) {
	'use strict';

	if (!this.selector || utils.matchesSelector(node, this.selector)) {
		return true;
	}

	return false;
};

/**
 * Run the check's evaluate function (call `this.evaluate(node, options)`)
 * @param  {HTMLElement} node  The node to test
 * @param  {Object} options    The options that override the defaults and provide additional
 *                             information for the check
 * @param  {Function} callback Function to fire when check is complete
 */
Check.prototype.run = function (node, options, callback) {
	'use strict';
	var enabled = options && options.hasOwnProperty('enabled') ? options.enabled : this.enabled,
		checkOptions = utils.extend({}, this.options, true);
	if (options) {
		checkOptions = utils.extend(checkOptions, options, true);
	}
	if (this.matches(node) && enabled) {
		var checkResult = new CheckResult(this);
		var checkHelper = utils.checkHelper(checkResult, callback);
		var result;

		try {
			result = this.evaluate.call(checkHelper, node, checkOptions);
		} catch (e) {
			checkResult.error =  {
				message: e.message,
				stack: e.stack
			};
			callback(checkResult);
			return;
		}

		if (!checkHelper.isAsync) {
			checkResult.result = result;
			callback(checkResult);
		}
	} else {
		callback(null);
	}
};

