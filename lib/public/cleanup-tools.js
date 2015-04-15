
function cleanupTools(callback) {
  'use strict';

  if (!dqre.audit) {
    throw new Error('No audit configured');
  }

  var q = utils.queue();

  Object.keys(dqre.audit.tools).forEach(function (key) {
    var tool = dqre.audit.tools[key];
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
dqre.cleanup = cleanupTools;
