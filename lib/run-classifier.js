/*global Context */

function runClassifier(classifierId, context, options, callback) {
  'use strict';

  context = new Context(context);
  options = options || {};
  if (!dqre.audit) {
    throw new Error('No audit configured');
  }

  var q = utils.queue();

  if (context.frames.length) {
    q.defer(function (done) {
      utils.collectResultsFromFrames(context, options, 'classify', classifierId, done);
    });
  }

  q.defer(function (cb) {
    cb(dqre.audit.classifiers[classifierId].run(context, options));
  });

  q.then(function (data) {
    // Add wrapper object so that we may use the same "merge" function for results from inside and outside frames
    callback(utils.mergeResults(data.map(function (d) {
      return {
        results: Array.isArray(d) ? d : [d]
      };
    }))[0]);
  });
}
dqre.classify = runClassifier;
