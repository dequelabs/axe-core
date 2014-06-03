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
	 * [result description]
	 * @type {[type]}
	 */
	this.result = dqre.constants.result[check.result] || dqre.constants.result.PASS;

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
	 * Return value for the Check
	 * @type {Boolean}
	 */
	this.value = null;

	/**
	 * Any caught exceptions raised during execution of Check; message and stack members.
	 * @type {Object}
	 */
	this.error = null;
}