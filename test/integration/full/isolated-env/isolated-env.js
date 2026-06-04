/* global chai */
var messages = [];
window.addEventListener('message', msg => {
  messages.push(msg.data);
});

describe('isolated-env test', () => {
  const fixture = document.querySelector('#fixture');
  let origPartialResults;
  let partialResults;
  let win;

  // just a nicer assertion error rather than just doing
  // done(err)
  function doesNotThrow(err, done) {
    if (err instanceof chai.AssertionError) {
      return done(err);
    }

    const error = new chai.AssertionError(
      `expected [Function] to not throw an error but '${err.toString()}' was thrown`
    );
    done(error);
  }

  function setEmptyReporter() {
    win.axeConfigure({
      reporter: (results, options, callback) => {
        if (typeof options === 'function') {
          callback = options;
          options = {};
        }
        callback(results);
      }
    });
  }

  before(done => {
    const nestedLoadPromise = new Promise((resolve, reject) => {
      axe.testUtils.awaitNestedLoad(resolve, reject);
    });

    const isloadedPromise = new Promise((resolve, reject) => {
      if (messages.includes('axe-loaded')) {
        resolve();
      } else {
        window.addEventListener('message', msg => {
          if (msg.data === 'axe-loaded') {
            resolve();
          }
        });
      }

      setTimeout(() => {
        reject(new Error('axe-loaded message not called'));
      }, 5000);
    });

    Promise.all([nestedLoadPromise, isloadedPromise])
      .then(() => {
        win = fixture.querySelector('#isolated-frame').contentWindow;
        const focusableFrame = fixture.querySelector('#focusable-iframe');

        // trigger frame-focusable-content rule
        const iframePromise = focusableFrame.contentWindow.axe.runPartial({
          include: [],
          exclude: [],
          initiator: false,
          focusable: false,
          size: { width: 10, height: 10 }
        });

        Promise.all([axe.runPartial(), iframePromise])
          .then(r => {
            origPartialResults = r;
            done();
          })
          .catch(done);
      })
      .catch(done);
  });

  beforeEach(() => {
    // calling axe.finishRun mutates the partial results
    // object and prevents calling finishRun again with
    // the same object
    partialResults = axe.utils.clone(origPartialResults);

    if (win.axeConfigure) {
      win.axeConfigure({ reporter: 'v1' });
    }
  });

  it('successfully isolates axe object in iframe', () => {
    assert.isUndefined(win.axe);
    assert.isDefined(win.axeFinishRun);
    assert.isDefined(win.axeConfigure);
  });

  it('after methods do not error by calling window or DOM methods', done => {
    setEmptyReporter();

    win
      .axeFinishRun(partialResults)
      .then(results => {
        assert.isDefined(results);
        done();
      })
      .catch(err => {
        doesNotThrow(err, done);
      });
  });

  it('runs all rules and after methods', done => {
    win
      .axeFinishRun(partialResults)
      .then(results => {
        assert.lengthOf(results.inapplicable, 0);
        done();
      })
      .catch(err => {
        doesNotThrow(err, done);
      });
  });

  describe('reporters', () => {
    const reporters = axe._thisWillBeDeletedDoNotUse.public.reporters;
    Object.keys(reporters).forEach(reporterName => {
      it(`${reporterName} reporter does not error by calling window or DOM methods`, done => {
        win.axeConfigure({
          reporter: reporterName
        });

        win
          .axeFinishRun(partialResults)
          .then(results => {
            assert.isDefined(results);
            done();
          })
          .catch(err => {
            doesNotThrow(err, done);
          });
      });
    });
  });
});
