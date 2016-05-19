/*global CheckResult */

function createExecutionContext(spec) {
	/*jshint evil:true */
	'use strict';
	if (typeof spec === 'string') {
		return new Function('return ' + spec + ';')();
	}
	return spec;
}

function Check(spec) {
	if (spec) {
		this.id = spec.id;
		this.configure(spec);
	}
}

/**
 * Unique ID for the check.  Checks may be re-used, so there may be additional instances of checks
 * with the same ID.
 * @type {String}
 */
// Check.prototype.id;

/**
 * Free-form options that are passed as the second parameter to the `evaluate`
 * @type {Mixed}
 */
// Check.prototype.options;

/**
 * The actual code, accepts 2 parameters: node (the node under test), options (see this.options).
 * This function is run in the context of a checkHelper, which has the following methods
 * - `async()` - if called, the check is considered to be asynchronous; returns a callback function
 * - `data()` - free-form data object, associated to the `CheckResult` which is specific to each node
 * @type {Function}
 */
// Check.prototype.evaluate;

/**
 * Optional. Filter and/or modify checks for all nodes
 * @type {Function}
 */
// Check.prototype.after;

/**
 * enabled by default, if false, this check will not be included in the rule's evaluation
 * @type {Boolean}
 */
Check.prototype.enabled = true;


/**
 * Run the check's evaluate function (call `this.evaluate(node, options)`)
 * @param  {HTMLElement} node  The node to test
 * @param  {Object} options    The options that override the defaults and provide additional
 *                             information for the check
 * @param  {Function} callback Function to fire when check is complete
 */
Check.prototype.run = function (node, options, resolve, reject) {
	'use strict';
	options = options || {};
	var enabled = options.hasOwnProperty('enabled') ? options.enabled : this.enabled,
		checkOptions = options.options || this.options;

	if (enabled) {
		var checkResult = new CheckResult(this);
		var checkHelper = axe.utils.checkHelper(checkResult, resolve, reject);
		var result;

		try {
			result = this.evaluate.call(checkHelper, node, checkOptions);
		} catch (e) {
			reject(e);
			return;
		}

		if (!checkHelper.isAsync) {
			checkResult.result = result;
			setTimeout(function () {
				resolve(checkResult);
			}, 0);
		}
	} else {
		resolve(null);
	}
};

/**
 * Override a check's settings after construction to allow for changing options
 * without having to implement the entire check
 *
 * @param {Object} spec - the specification of the attributes to be changed
 */

Check.prototype.configure = function (spec) {
	['options', 'enabled']
	.filter( prop => spec.hasOwnProperty(prop) )
	.forEach( prop => this[prop] = spec[prop] );

	['evaluate', 'after']
	.filter( prop => spec.hasOwnProperty(prop) )
	.forEach( prop => this[prop] = createExecutionContext(spec[prop]) );
};
