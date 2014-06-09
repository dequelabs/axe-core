/*exported CheckResult */

/**
 * Constructor for the result of checks
 * @param {Object} check CheckResult specification
 */
function CheckResult(check) {
	'use strict';

	/**
	 * ID of the check.  Unique in the context of a rule.
	 * @type {String}
	 */
	this.id = check.id;

	/**
	 * The "type" of Check; either PASS or FAIL
	 * @type {String}
	 */
	this.type = dqre.constants.type[check.type] || dqre.constants.type.PASS;

	/**
	 * The certainty with which a check can determine whether there is an issue, can be definite or potential
	 * @type {String}
	 */
	this.certainty = check.certainty;

	/**
	 * The interpretation of the issue - is it a best practice or a violation, default is violation
	 * @type {String}
	 */
	this.interpretation = check.interpretation;

	/**
	 * Impact of the generated issue, e.g. trivial, minor, major, severe
	 * @type {String}
	 */
	this.impact = check.impact;

	/**
	 * Any data passed by Check (by calling `this.data()`)
	 * @type {Mixed}
	 */
	this.data = null;

	/**
	 * Whether or not the check was run asynchronously
	 * @type {Boolean}
	 */
	this.async = false;

	/**
	 * Any caught exceptions raised during execution of Check; message and stack members.
	 * @type {Object}
	 */
	this.error = null;

	/**
	 * Any node that is related to the Check, specified by calling `this.relatedNodes([HTMLElement...])` inside the Check
	 * @type {Array}
	 */
	this.relatedNodes = [];

	/**
	 * The return value of the Check's evaluate function
	 * @type {Mixed}
	 */
	this.result = null;
}