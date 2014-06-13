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
	 * Any data passed by Check (by calling `this.data()`)
	 * @type {Mixed}
	 */
	this.data = null;

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