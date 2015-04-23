/*exported RuleResult */

/**
 * Constructor for the result of Rules
 * @param {Object} rule RuleResult specification
 */
function RuleResult(rule) {
	'use strict';

	/**
	 * The ID of the Rule whom this result belongs to
	 * @type {String}
	 */
	this.id = rule.id;

	/**
	 * The calculated result of the Rule, either PASS, FAIL or NA
	 * @type {String}
	 */
	this.result = dqre.constants.result.NA;

	/**
	 * Whether the Rule is a "pageLevel" rule
	 * @type {Boolean}
	 */
	this.pageLevel = rule.pageLevel;

	/**
	 * Holds information regarding nodes and individual CheckResults
	 * @type {Array}
	 */
	this.nodes = [];
}
