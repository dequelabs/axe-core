/*exported CheckResult */
/*eslint no-unused-vars: 0*/

class CheckResult {
	/**
	 * ID of the check.  Unique in the context of a rule.
	 * @type {String}
	 */
	public id: string;

	/**
	 * Any data passed by Check (by calling `this.data()`)
	 * @type {Mixed}
	 */
	public data: any = null;
	/**
	 * Any node that is related to the Check, specified by calling `this.relatedNodes([HTMLElement...])` inside the Check
	 * @type {Array}
	 */
	public relatedNodes: any[] = [];
	/**
	 * The return value of the Check's evaluate function
	 * @type {Mixed}
	 */
	public result: any = null;

	/**
	 * Constructor for the result of checks
	 * @param {Check} check
	 */
	constructor(check: any) {
		this.id = check.id;
	}
}
