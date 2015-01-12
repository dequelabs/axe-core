/*exported AnalysisRuleResult */

/**
* Constructor for the result of AnalysisRule
* @param {Object} rule AnalysisRuleResult specification
*/
function AnalysisRuleResult(rule) {
  'use strict';

  /**
  * The ID of the Rule whom this result belongs to
  * @type {String}
  */
  this.id = rule.id;

  /**
  * The result of the rule
  * @type {Array}
  */
  this.result = null;

  this.node = null;

}
