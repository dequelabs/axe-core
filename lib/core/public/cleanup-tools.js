
function cleanupTools(callback) {
  'use strict';

  if (!axe._audit) {
    throw new Error('No audit configured');
  }

  var q = utils.queue();

  Object.keys(axe._audit.tools).forEach(function (key) {
    var tool = axe._audit.tools[key];
    if (tool.active) {
      q.defer(function (done) {
        tool.cleanup(done);
      });
    }
  });

  utils.toArray(document.querySelectorAll('frame, iframe')).forEach(function (frame) {
    q.defer(function (done) {
      return utils.sendCommandToFrame(frame, {
        command: 'cleanup-tool'
      }, done);
    });
  });

  q.then(callback);
}
axe.cleanup = cleanupTools;
