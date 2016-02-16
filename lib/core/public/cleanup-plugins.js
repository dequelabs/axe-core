
function cleanupPlugins(resolve, reject) {
  'use strict';
  if (!axe._audit) {
    throw new Error('No audit configured');
  }

  var q = utils.queue();
  // If a plugin fails it's cleanup, we still want the others to run
  var cleanupErrors = [];

  Object.keys(axe.plugins).forEach(function (key) {
    q.defer(function (res) {
      var rej = function (err) {
        cleanupErrors.push(err);
        res();
      };
      try {
        axe.plugins[key].cleanup(res, rej);
      } catch(err) {
        rej(err);
      }
    });
  });

  utils.toArray(document.querySelectorAll('frame, iframe')).forEach(function (frame) {
    q.defer(function (res, rej) {
      return utils.sendCommandToFrame(frame, {
        command: 'cleanup-plugin'
      }, res, rej);
    });
  });

  q.then(function (results) {
    if (!cleanupErrors) {
      resolve(results);
    } else {
      reject(cleanupErrors);
    }
  })
  .catch(reject);
}
axe.cleanup = cleanupPlugins;
