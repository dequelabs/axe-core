describe('axe.run', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var noop = function () {};
  var origRunRules = axe._runRules;
  var captureError = axe.testUtils.captureError;

  beforeEach(function () {
    axe._load({
      rules: [
        {
          id: 'test',
          selector: '*',
          none: ['fred']
        }
      ],
      checks: [
        {
          id: 'fred',
          evaluate: function (node) {
            this.relatedNodes([node]);
            return true;
          }
        }
      ]
    });
  });

  afterEach(function () {
    fixture.innerHTML = '';
    axe._audit = null;
    axe._runRules = origRunRules;
    axe._running = false;
  });

  it('takes context, options and callback as parameters', function (done) {
    fixture.innerHTML = '<div id="t1"></div>';
    var options = {
      runOnly: {
        type: 'rule',
        values: ['test']
      }
    };

    axe.run(['#t1'], options, function () {
      assert.ok(true, 'test completed');
      done();
    });
  });

  it('uses document as content if it is not specified', function (done) {
    axe._runRules = function (ctxt) {
      assert.equal(ctxt, document);
      done();
    };

    axe.run({ someOption: true }, noop);
  });

  it('uses an object as options if it is not specified', function (done) {
    axe._runRules = function (ctxt, opt) {
      assert.isObject(opt);
      done();
    };
    axe.run(document, noop);
  });

  it('does not mutate the options object', function (done) {
    var options = {};
    axe.run(options, function () {
      assert.deepEqual(options, {});
      done();
    });
  });

  it('works with performance logging enabled', function (done) {
    axe.run(document, { performanceTimer: true }, function (err, result) {
      assert.isObject(result);
      done();
    });
  });

  describe('identifies context objects', () => {
    it('based on the include property', done => {
      axe._runRules = ctxt => {
        assert.deepEqual(ctxt, { include: '#BoggyB' });
        done();
      };
      axe.run({ include: '#BoggyB' }, noop);
    });

    it('based on the exclude property', done => {
      axe._runRules = ctxt => {
        assert.deepEqual(ctxt, { exclude: '#BoggyB' });
        done();
      };
      axe.run({ exclude: '#BoggyB' }, noop);
    });

    it('based on the fromFrames property', done => {
      axe._runRules = ctxt => {
        assert.deepEqual(ctxt, { fromFrames: ['#myFrame'] });
        done();
      };
      axe.run({ fromFrames: ['#myFrame'] }, noop);
    });

    it('based on the fromShadowDom property', done => {
      axe._runRules = ctxt => {
        assert.deepEqual(ctxt, { fromShadowDom: ['#myFrame'] });
        done();
      };
      axe.run({ fromShadowDom: ['#myFrame'] }, noop);
    });

    it('ignores objects with none of those properties', done => {
      axe._runRules = (ctxt, opt) => {
        assert.deepEqual(opt.HHG, 'hallelujah');
        done();
      };
      axe.run({ HHG: 'hallelujah' }, noop);
    });
  });

  it('does not fail if no callback is specified', function (done) {
    assert.doesNotThrow(function () {
      axe.run(done);
    });
  });

  it('should error if axe is already running', function (done) {
    axe.run(noop);
    axe.run(function (err) {
      assert.isTrue(err.indexOf('Axe is already running') !== -1);
      done();
    });
  });

  describe('callback', function () {
    it('gives errors to the first argument on the callback', function (done) {
      axe._runRules = function (ctxt, opt, resolve, reject) {
        axe._runRules = origRunRules;
        reject('Ninja rope!');
      };

      axe.run({ reporter: 'raw' }, function (err) {
        assert.equal(err, 'Ninja rope!');
        done();
      });
    });

    it('gives results to the second argument on the callback', function (done) {
      axe._runRules = function (ctxt, opt, resolve) {
        axe._runRules = origRunRules;
        resolve('MB Bomb', noop);
      };

      axe.run({ reporter: 'raw' }, function (err, result) {
        assert.equal(err, null);
        assert.equal(result, 'MB Bomb');
        done();
      });
    });

    it('does not run the callback twice if it throws', function (done) {
      var calls = 0;
      axe._runRules = function (ctxt, opt, resolve) {
        resolve([], noop);
      };

      var log = axe.log;
      axe.log = function (e) {
        assert.equal(e.message, 'err');
        axe.log = log;
      };
      axe.run(function () {
        calls += 1;
        if (calls === 1) {
          setTimeout(function () {
            assert.equal(calls, 1);
            axe.log = log;
            done();
          }, 20);
        }
        throw new Error('err');
      });
    });

    it('is called after cleanup', function (done) {
      var isClean = false;
      axe._runRules = function (ctxt, opt, resolve) {
        axe._runRules = origRunRules;
        // Check that cleanup is called before the callback is executed
        resolve('MB Bomb', function cleanup() {
          isClean = true;
        });
      };

      axe.run({ reporter: 'raw' }, function () {
        assert.isTrue(isClean, 'cleanup must be called first');
        done();
      });
    });

    it('rejects with sync reporter errors', done => {
      axe.addReporter('throwing', () => {
        throw new Error('Something went wrong');
      });
      axe.run({ reporter: 'throwing' }, err => {
        assert.equal(err.message, 'Something went wrong');
        done();
      });
    });

    it('rejects with async reporter errors', done => {
      axe.addReporter('throwing', (results, options, resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Something went wrong'));
        }, 10);
      });
      axe.run({ reporter: 'throwing' }, err => {
        assert.equal(err.message, 'Something went wrong');
        done();
      });
    });
  });

  describe('promise result', function () {
    /*eslint indent: 0*/
    var promiseIt = window.Promise ? it : it.skip;

    promiseIt('returns an error to catch if axe fails', function (done) {
      axe._runRules = function (ctxt, opt, resolve, reject) {
        axe._runRules = origRunRules;
        reject('I surrender!');
      };

      var p = axe.run({ reporter: 'raw' });
      p.then(noop).catch(function (err) {
        assert.equal(err, 'I surrender!');
        done();
      });

      assert.instanceOf(p, window.Promise);
    });

    promiseIt('returns a promise if no callback was given', function (done) {
      axe._runRules = function (ctxt, opt, resolve) {
        axe._runRules = origRunRules;
        resolve('World party', noop);
      };

      var p = axe.run({ reporter: 'raw' });
      p.then(function (result) {
        assert.equal(result, 'World party');
        done();
      });

      assert.instanceOf(p, window.Promise);
    });

    promiseIt('does not error if then() throws', function (done) {
      axe._runRules = function (ctxt, opt, resolve) {
        resolve([], noop);
      };

      axe
        .run()
        .then(
          function () {
            throw new Error('err');
          },
          function (e) {
            assert.isNotOk(e, 'Caught callback error in the wrong place');
            done();
          }
        )
        .catch(function (e) {
          assert.equal(e.message, 'err');
          done();
        });
    });

    promiseIt('is called after cleanup', function (done) {
      var isClean = false;
      axe._runRules = function (ctxt, opt, resolve) {
        axe._runRules = origRunRules;
        // Check that cleanup is called before the callback is executed
        resolve('MB Bomb', function cleanup() {
          isClean = true;
        });
      };

      axe
        .run({ reporter: 'raw' })
        .then(function () {
          assert(isClean, 'cleanup must be called first');
          done();
        })
        .catch(done);
    });
  });

  describe('option reporter', function () {
    it('sets v1 as the default reporter if audit.reporter is null', function (done) {
      axe._runRules = function (ctxt, opt) {
        assert.equal(opt.reporter, 'v1');
        axe._runRules = origRunRules;
        done();
      };
      axe._audit.reporter = null;
      axe.run(document, noop);
    });

    it('uses the audit.reporter if no reporter is set in options', function (done) {
      axe._runRules = function (ctxt, opt) {
        assert.equal(opt.reporter, 'raw');
        axe._runRules = origRunRules;
        done();
      };
      axe._audit.reporter = 'raw';
      axe.run(document, noop);
    });

    it('does not override if another reporter is set', function (done) {
      axe._runRules = function (ctxt, opt) {
        assert.equal(opt.reporter, 'raw');
        axe._runRules = origRunRules;
        done();
      };
      axe._audit.reporter = null;
      axe.run(document, { reporter: 'raw' }, noop);
    });
  });

  describe('option xpath', function () {
    it('returns no xpath if the xpath option is not set', function (done) {
      axe.run('#fixture', function (err, result) {
        assert.isUndefined(result.violations[0].nodes[0].xpath);
        done();
      });
    });

    it('returns the xpath if the xpath option is true', function (done) {
      axe.run(
        '#fixture',
        {
          xpath: true
        },
        captureError(function (err, result) {
          assert.deepEqual(result.violations[0].nodes[0].xpath, [
            "//div[@id='fixture']"
          ]);
          done();
        }, done)
      );
    });

    it('returns xpath on related nodes', function (done) {
      axe.run(
        '#fixture',
        {
          xpath: true
        },
        captureError(function (err, result) {
          assert.deepEqual(
            result.violations[0].nodes[0].none[0].relatedNodes[0].xpath,
            ["//div[@id='fixture']"]
          );
          done();
        }, done)
      );
    });

    it('returns the xpath on any reporter', function (done) {
      axe.run(
        '#fixture',
        {
          xpath: true,
          reporter: 'no-passes'
        },
        captureError(function (err, result) {
          assert.deepEqual(result.violations[0].nodes[0].xpath, [
            "//div[@id='fixture']"
          ]);
          done();
        }, done)
      );
    });
  });

  describe('option absolutePaths', function () {
    it('returns relative paths when falsy', function (done) {
      axe.run(
        '#fixture',
        {
          absolutePaths: 0
        },
        captureError(function (err, result) {
          assert.deepEqual(result.violations[0].nodes[0].target, ['#fixture']);
          done();
        }, done)
      );
    });

    it('returns absolute paths when truthy', function (done) {
      axe.run(
        '#fixture',
        {
          absolutePaths: 'yes please'
        },
        captureError(function (err, result) {
          assert.deepEqual(result.violations[0].nodes[0].target, [
            'html > body > #fixture'
          ]);
          done();
        }, done)
      );
    });

    it('returns absolute paths on related nodes', function (done) {
      axe.run(
        '#fixture',
        {
          absolutePaths: true
        },
        captureError(function (err, result) {
          assert.deepEqual(
            result.violations[0].nodes[0].none[0].relatedNodes[0].target,
            ['html > body > #fixture']
          );
          done();
        }, done)
      );
    });
  });
});

describe('axe.run iframes', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var origRunRules = axe._runRules;
  var captureError = axe.testUtils.captureError;

  beforeEach(function () {
    fixture.innerHTML = '<div id="target">Target in top frame</div>';
    axe._load({
      rules: [
        {
          id: 'html',
          selector: '#target',
          none: ['fred']
        }
      ],
      checks: [
        {
          id: 'fred',
          evaluate: function () {
            return true;
          }
        }
      ]
    });
  });

  afterEach(function () {
    fixture.innerHTML = '';
    axe._audit = null;
    axe._runRules = origRunRules;
  });

  it('includes iframes by default', function (done) {
    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      axe.run(
        '#fixture',
        {},
        captureError(function (err, result) {
          assert.equal(result.violations.length, 1);
          var violation = result.violations[0];
          assert.equal(
            violation.nodes.length,
            2,
            'one node for top frame, one for iframe'
          );
          assert.isTrue(
            violation.nodes.some(function (node) {
              return node.target.length === 1 && node.target[0] === '#target';
            }),
            'one result from top frame'
          );
          assert.isTrue(
            violation.nodes.some(function (node) {
              return node.target.length === 2 && node.target[0] === 'iframe';
            }),
            'one result from iframe'
          );
          done();
        }, done)
      );
    });

    frame.src = '../mock/frames/test.html';
    fixture.appendChild(frame);
  });

  it('excludes iframes if iframes is false', function (done) {
    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      axe.run(
        '#fixture',
        { iframes: false },
        captureError(function (err, result) {
          assert.equal(result.violations.length, 1);
          var violation = result.violations[0];
          assert.equal(violation.nodes.length, 1, 'only top frame');
          assert.equal(violation.nodes[0].target.length, 1);
          assert.equal(violation.nodes[0].target[0], '#target');
          done();
        }, done)
      );
    });

    frame.src = '../mock/frames/test.html';
    fixture.appendChild(frame);
  });

  it('ignores unexpected messages from non-axe iframes', function (done) {
    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      axe.run(
        '#fixture',
        {},
        captureError(function (err, result) {
          assert.isNull(err);
          assert.equal(result.violations.length, 1);
          done();
        }, done)
      );
    });

    frame.src = '../mock/frames/with-echo.html';
    fixture.appendChild(frame);
  });

  it('ignores unexpected messages from axe iframes', function (done) {
    var frame = document.createElement('iframe');

    frame.addEventListener('load', function () {
      axe.run(
        '#fixture',
        {},
        captureError(function (err, result) {
          assert.isNull(err);
          assert.equal(result.violations.length, 1);
          done();
        }, done)
      );
    });

    frame.src = '../mock/frames/with-echo-axe.html';
    fixture.appendChild(frame);
  });
});
