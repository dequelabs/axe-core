/*global DqElement */

/**
* Adds the owning frame's CSS selector onto each instance of DqElement
* @private
* @param  {Array} resultSet `details` array on a `RuleResult`
* @param  {HTMLElement} frameElement  The frame element
* @param  {String} frameSelector     Unique CSS selector for the frame
*/
function pushFrame(resultSet, frameElement, frameSelector) {
  'use strict';
  resultSet.forEach(function (res) {
    res.node.selector.unshift(frameSelector);
    res.node = new DqElement(frameElement, res.node);
    if (res.checks) {
      res.checks.forEach(function (check) {
        check.relatedNodes.forEach(function (node) {
          node.selector.unshift(frameSelector);
          node = new DqElement(frameElement, node);
        });
      });
    }
  });
}

/**
* Adds `to` to `from` and then re-sorts by DOM order
* @private
* @param  {Array} target  `details` array on a `RuleResult`
* @param  {Array} to   `details` array on a `RuleResult`
* @return {Array}      The merged and sorted result
*/
function spliceDetails(target, to) {
  'use strict';

  var firstFromFrame = to[0].node,
  sorterResult, t;
  for (var i = 0, l = target.length; i < l; i++) {
    t = target[i].node;
    sorterResult = utils.nodeSorter(t.element, firstFromFrame.element);
    if (sorterResult > 0 || (sorterResult === 0 && firstFromFrame.selector.length < t.selector.length)) {
      target.splice.apply(target, [i, 0].concat(to));
      return;
    }
  }

  target.push.apply(target, to);
}

/**
* Merges one or more RuleResults (possibly from different frames) into one RuleResult
* @private
* @param  {Array} frameResults  Array of objects including the RuleResults as `results` and frame as `frame`
* @return {Array}              The merged RuleResults; should only have one result per rule
*/
utils.mergeResults = function mergeResults(frameResults) {
  'use strict';
  var result = [];
  frameResults.forEach(function (frameResult) {
    if (!frameResult.results || !frameResult.results.length) {
      return;
    }
    frameResult.results.forEach(function (ruleResult) {
      if (frameResult.frame) {
        pushFrame(ruleResult.details, frameResult.frameElement, frameResult.frame);
      }

      var res = utils.findBy(result, 'id', ruleResult.id);
      if (!res) {
        result.push(ruleResult);
      } else {
        if (ruleResult.details.length) {
          spliceDetails(res.details, ruleResult.details);
        }
      }
    });
  });
  return result;
};
