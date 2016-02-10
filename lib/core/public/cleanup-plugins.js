
function cleanupPlugins(resolve, reject) {
  'use strict';
  reject = reject || axe.log;

  if (!axe._audit) {
    throw new Error('No audit configured');
  }

  var q = utils.queue();

  Object.keys(axe.plugins).forEach(function (key) {
    q.defer(function (done) {
      axe.plugins[key].cleanup(done);
    });
  });

  utils.toArray(document.querySelectorAll('frame, iframe')).forEach(function (frame) {
    q.defer(function (done) {
      return utils.sendCommandToFrame(frame, {
        command: 'cleanup-plugin'
      }, done);
    });
  });

  q.then(resolve)
  .catch(reject);
}
axe.cleanup = cleanupPlugins;
