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
	this.type = dqre.constants.type[check.type] || dqre.constants.type.PASS;

	/**
	 * certainty - inherit from check
	 */
	this.certainty = check.certainty;

	/**
	 * interpretation - inherit from check
	 */
	this.interpretation = check.interpretation;

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
}

CheckResult.prototype.setResult = function (value) {
	'use strict';
	if (typeof value === 'boolean' && value) {
		this.result = true;
	} else {
		this.result = undefined;
	}
};
