/*exported ClassifierResult */

/**
* Constructor for the result of Classifiers
* @param {Object} rule ClassifierResult specification
*/
function ClassifierResult(classifier) {
  'use strict';

  /**
  * The ID of the Classifier whom this result belongs to
  * @type {String}
  */
  this.id = classifier.id;

  /**
  * The calculated result of the Classifier, either PASS, FAIL or NA
  * @type {String}
  */
  this.result = null;

  /**
   * The node which the classifier was run against
   * @type {DqElement}
   */
  this.node = null;

}
