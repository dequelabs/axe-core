/*global AnalysisRuleResult */

function AnalysisRule(spec) {
  'use strict';

  /**
  * The code, or string ID of the rule
  * @type {String}
  */
  this.id = spec.id;

  /**
  * Free-form options that are passed as the second parameter to the `evaluate`
  * @type {Mixed}
  */
  this.options = spec.options;

  this.evaluate = spec.evaluate;

}


/**
* Runs the Rule's `evaluate` function
* @param  {Element}   node  The element
* @param  {Mixed}   options  Options specific to this rule
* @param  {Function} callback Function to call when evaluate is complete; receives an AnalysisRuleResult instance
*/
AnalysisRule.prototype.run = function (node, options, callback) {
  'use strict';

  var self = this;

  var result = this.evaluate(node, options);
  var ruleResult = new AnalysisRuleResult(self);
  ruleResult.result = result;
  callback(ruleResult);

};
