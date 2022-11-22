/* global chai */

describe('isolated-env test', function () {
  'use strict';
  var fixture = document.querySelector('#fixture');
  var origPartialResults;
  var partialResults;
  var win;

  // just a nicer assertion error rather than just doing
  // done(err)
  function doesNotThrow(err, done) {
    if (err instanceof chai.AssertionError) {
      return done(err);
    }

    var error = new chai.AssertionError(
      "expected [Function] to not throw an error but '" +
        err.toString() +
        "' was thrown"
    );
    done(error);
  }

  function setEmptyReporter() {
    win.axeConfigure({
      reporter: function (results, options, callback) {
        if (typeof options === 'function') {
          callback = options;
          options = {};
        }
        callback(results);
      }
    });
  }

  before(function (done) {
    var nestedLoadPromise = new Promise(function (resolve, reject) {
      axe.testUtils.awaitNestedLoad(resolve, reject);
    });

    var isloadedPromise = new Promise(function (resolve, reject) {
      window.addEventListener('message', function (msg) {
        if (msg.data === 'axe-loaded') {
          resolve();
        }
      });
      setTimeout(function () {
        reject(new Error('axe-loaded message not called'));
      }, 5000);
    });

    Promise.all([nestedLoadPromise, isloadedPromise])
      .then(function () {
        win = fixture.querySelector('#isolated-frame').contentWindow;
        var focusableFrame = fixture.querySelector('#focusable-iframe');

        // trigger frame-focusable-content rule
        var iframePromise = focusableFrame.contentWindow.axe.runPartial({
          include: [],
          exclude: [],
          initiator: false,
          focusable: false,
          size: { width: 10, height: 10 }
        });

        Promise.all([axe.runPartial(), iframePromise])
          .then(function (r) {
            origPartialResults = r;
            done();
          })
          .catch(done);
      })
      .catch(done);
  });

  beforeEach(function () {
    // calling axe.finishRun mutates the partial results
    // object and prevents calling finishRun again with
    // the same object
    partialResults = axe.utils.clone(origPartialResults);

    if (win.axeConfigure) {
      win.axeConfigure({ reporter: 'v1' });
    }
  });

  it('successfully isolates axe object in iframe', function () {
    assert.isUndefined(win.axe);
    assert.isDefined(win.axeFinishRun);
    assert.isDefined(win.axeConfigure);
  });

  it('after methods do not error by calling window or DOM methods', function (done) {
    setEmptyReporter();

    win
      .axeFinishRun(partialResults)
      .then(function (results) {
        assert.isDefined(results);
        done();
      })
      .catch(function (err) {
        doesNotThrow(err, done);
      });
  });

  it('runs all rules and after methods', function (done) {
    win
      .axeFinishRun(partialResults)
      .then(function (results) {
        assert.lengthOf(results.inapplicable, 0);
        done();
      })
      .catch(function (err) {
        doesNotThrow(err, done);
      });
  });

  describe('reporters', function () {
    var reporters = axe._thisWillBeDeletedDoNotUse.public.reporters;
    Object.keys(reporters).forEach(function (reporterName) {
      it(
        reporterName +
          ' reporter does not error by calling window or DOM methods',
        function (done) {
          win.axeConfigure({
            reporter: reporterName
          });

          win
            .axeFinishRun(partialResults)
            .then(function (results) {
              assert.isDefined(results);
              done();
            })
            .catch(function (err) {
              doesNotThrow(err, done);
            });
        }
      );
    });
  });
});
