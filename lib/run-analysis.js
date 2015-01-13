/*exported runAnalysis */
function runAnalysis(ruleId, selectorArray, options, callback) {
  'use strict';

  if (!dqre.audit) {
    throw new Error('No audit configured');
  }

  if (selectorArray.length > 1) {
    var frame = document.querySelector(selectorArray.shift());

    return utils.sendCommandToFrame(frame, {
      options: options,
      command: 'analysis',
      parameter: ruleId,
      selectorArray: selectorArray
    }, callback);
  }

  var node = document.querySelector(selectorArray.shift());
  dqre.audit.analyzers[ruleId].run(node, options, callback);
}

dqre.analyze = runAnalysis;
