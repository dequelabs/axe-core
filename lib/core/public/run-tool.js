/*exported runTool, cleanupTools */

function runTool(toolId, selectorArray, options, callback) {
  'use strict';

  if (!axe._audit) {
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
  } else {
    var node = document.querySelector(selectorArray.shift());
    axe._audit.tools[toolId].run(node, options, callback);
  }
}
axe.tool = runTool;