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
  * Results and nodes associated to this classifier
  * @type {Array}
  */
  this.details = [];

}
