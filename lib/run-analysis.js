/*exported runAnalysis */

function deferToFrame(ruleId, selectorArray, options, callback) {
  'use strict';

  var frame = document.querySelector(selectorArray.shift());

  utils.sendCommandToFrame(frame, {
    options: options,
    command: 'analysis',
    parameter: ruleId,
    selectorArray: selectorArray
  }, callback);
}

function runAnalysis(ruleId, selectorArray, options, callback) {
  'use strict';

  if (!dqre.audit) {
    throw new Error('No audit configured');
  }

  if (selectorArray.length > 1) {
    return deferToFrame(ruleId, selectorArray, options, callback);
  }

  var node = document.querySelector(selectorArray.shift());
  var rule = utils.findBy(dqre.audit.analysis, 'id', ruleId);
  rule.run(node, options, callback);
}
