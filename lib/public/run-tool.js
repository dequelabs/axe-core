/*exported runTool, cleanupTools */

function runTool(toolId, selectorArray, options, callback) {
  'use strict';

  if (!dqre.audit) {
    throw new Error('No audit configured');
  }

  if (selectorArray.length > 1) {
    var frame = document.querySelector(selectorArray.shift());
    return utils.sendCommandToFrame(frame, {
      options: options,
      command: 'run-tool',
      parameter: toolId,
      selectorArray: selectorArray
    }, callback);
  }

  var node = document.querySelector(selectorArray.shift());
  dqre.audit.tools[toolId].run(node, options, callback);
}
dqre.tool = runTool;
