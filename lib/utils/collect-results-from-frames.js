
/**
* Sends a message to frames to start analysis and collate results (via `mergeResults`)
* @private
* @param  {Context}   context  The resolved Context object
* @param  {Object}   options   Options object (as passed to `runAnalysis`)
* @param  {Function} callback  Function to call when results from all frames have returned
*/
utils.collectResultsFromFrames = function collectResultsFromFrames(context, options, command, parameter, callback) {
  'use strict';

  var q = utils.queue();
  var frames = context.frames;

  function defer(frame) {
    var node = frame.node,
    win = node.contentWindow;

    q.defer(function (done) {

      var timeout = setTimeout(function () {
        timeout = setTimeout(function () {
          dqre.log('No response from frame: ', node);
          done({});
        }, 0);
      }, 500);

      utils.respondable(win, 'dqre.ping', null, function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          dqre.log('Error returning results from frame: ', node);
          done({});
          done = null;
        }, 30000);
        utils.respondable(win, 'dqre.start', {
          options: options,
          command: command,
          parameter: parameter,
          context: {
            initiator: false,
            page: context.page,
            include: frame.include || [],
            exclude: frame.exclude || []
          }
        }, function (data) {
          if (done) {
            clearTimeout(timeout);
            done({
              results: Array.isArray(data) ? data : [data],
              frameElement: node,
              frame: utils.getSelector(node)
            });
          }
        });
      });
    });
  }

  for (var i = 0, l = frames.length; i < l; i++) {
    defer(frames[i]);
  }

  q.then(function (data) {
    callback(utils.mergeResults(data));
  });
};
