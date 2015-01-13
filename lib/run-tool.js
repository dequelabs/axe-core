/*exported runTool, cleanupTools */

function deferToolToFrame(toolId, selectorArray, options, callback) {
  'use strict';

  var frame = document.querySelector(selectorArray.shift());

  utils.sendCommandToFrame(frame, {
    options: options,
    command: 'tool',
    parameter: toolId,
    selectorArray: selectorArray
  }, callback);
}

function runTool(toolId, selectorArray, options, callback) {
  'use strict';

  if (!dqre.audit) {
    throw new Error('No audit configured');
  }

  if (selectorArray.length > 1) {
    return deferToolToFrame(toolId, selectorArray, options, callback);
  }

  var node = document.querySelector(selectorArray.shift());
  dqre.audit.tools[toolId].run(node, options, callback);
}

function cleanupTools(callback) {
  'use strict';
  var q = utils.queue();

  Object.keys(dqre.audit.tools).forEach(function (key) {
    var tool = dqre.audit.tools[key];
    if (tool.active) {
      q.defer(function (done) {
        tool.cleanup(done);
      });
    }
  });

  q.then(callback);
}
