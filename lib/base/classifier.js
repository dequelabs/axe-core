/*global ClassifierResult, DqElement */

function Classifier(spec) {
  'use strict';

  /**
  * The code, or string ID of the rule
  * @type {String}
  */
  this.id = spec.id;

  /**
  * Selector that this classifer applies to
  * @type {String}
  */
  this.selector = spec.selector || '*';

  /**
  * Whether to exclude hiddden elements form analysis.  Defaults to true.
  * @type {Boolean}
  */
  this.excludeHidden = typeof spec.excludeHidden === 'boolean' ? spec.excludeHidden : true;

  /**
  * The actual code, accepts 2 parameters: node (the node under test), options (see this.options).
  * @type {Function}
  */
  this.evaluate = spec.evaluate;

  /**
  * Free-form options that are passed as the second parameter to the `evaluate`
  * @type {Mixed}
  */
  this.options = spec.options;

  if (spec.matches) {
    /**
    * Function to test if rule should be run against a node, overrides Classifier#matches
    * @type {Function}
    */
    this.matches = spec.matches;
  }

}

/**
* Optionally test each node against a `matches` function to determine if the rule should run against
* a given node.  Defaults to `true`.
* @return {Boolean}    Whether the rule should run
*/
Classifier.prototype.matches = function () {
  'use strict';

  return true;
};

/**
* Selects `HTMLElement`s based on configured selector
* @param  {Context} context The resolved Context object
* @return {Array}           All matching `HTMLElement`s
*/
Classifier.prototype.gather = function (context) {
  'use strict';
  var elements = utils.select(this.selector, context);
  if (this.excludeHidden) {
    return elements.filter(function (element) {
      return !utils.isHidden(element);
    });
  }
  return elements;
};

/**
* Runs the Classifier's `evaluate` function
* @param  {Context}   context  The resolved Context object
* @param  {Mixed}   options  Options specific to this classifier
*/
Classifier.prototype.run = function (context, options) {
  'use strict';

  var nodes = this.gather(context);
  var self = this;
  var classifierResult = new ClassifierResult(self);

  nodes.forEach(function (node) {
    if (self.matches(node)) {
      classifierResult.details.push({
        result: self.evaluate(node, options),
        node: new DqElement(node)
      });
    }
  });

  return classifierResult;

};
