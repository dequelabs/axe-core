describe('axe.utils.collectResultsFromFrames', function () {
  'use strict';

  var Context = axe._thisWillBeDeletedDoNotUse.base.Context;
  var fixture = document.getElementById('fixture');
  var noop = function () {};
  var origSetTimeout = window.setTimeout;

  function contextSetup(scope) {
    var context = new Context(scope);
    axe._tree = context.flatTree;
    axe._selectorData = axe.utils.getSelectorData(context.flatTree);

    return context;
  }

  afterEach(function () {
    window.setTimeout = origSetTimeout;
    fixture.innerHTML = '';
    axe._tree = undefined;
    axe._selectorData = undefined;
  });

  it('should timeout the ping request after 500ms', function (done) {
    this.timeout = 1000;

    var timeoutSet = false;
    window.setTimeout = function (fn, to) {
      if (to === 500) {
        timeoutSet = true;
        fn();
      } else {
        // ping timeout
        return origSetTimeout(fn, to);
      }
      return 'cats';
    };

    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      var context = contextSetup(document);

      axe.utils.collectResultsFromFrames(
        context,
        {},
        'stuff',
        'morestuff',
        function () {
          assert.isTrue(timeoutSet);
          done();
        },
        noop
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/results-timeout.html';
    fixture.appendChild(frame);
  });

  it('should override the ping timeout with `options.pingWaitTime`, if provided', function (done) {
    this.timeout = 1000;

    var timeoutSet = false;
    window.setTimeout = function (fn, to) {
      if (to === 90000) {
        timeoutSet = true;
        fn();
      } else {
        // ping timeout
        return origSetTimeout(fn, to);
      }
      return 'cats';
    };

    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      var context = contextSetup(document);
      var params = { pingWaitTime: 90000 };

      axe.utils.collectResultsFromFrames(
        context,
        params,
        'stuff',
        'morestuff',
        function () {
          assert.isTrue(timeoutSet);
          done();
        },
        noop
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/results-timeout.html';
    fixture.appendChild(frame);
  });

  it('should timeout the start request after 60s', function (done) {
    window.setTimeout = function (fn, to) {
      if (to === 60000) {
        assert.ok('timeout set');
        fn();
      } else {
        // ping timeout
        return origSetTimeout(fn, to);
      }
      return 'cats';
    };

    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      var context = contextSetup(document);
      axe.utils.collectResultsFromFrames(
        context,
        {},
        'stuff',
        'morestuff',
        noop,
        function (err) {
          assert.instanceOf(err, Error);
          assert.equal(err.message.split(/: /)[0], 'Axe in frame timed out');
          done();
        }
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/results-timeout.html';
    fixture.appendChild(frame);
  });

  it('should override the start timeout with `options.frameWaitTime`, if provided', function (done) {
    window.setTimeout = function (fn, to) {
      if (to === 90000) {
        assert.ok('timeout set');
        fn();
      } else {
        // ping timeout
        return origSetTimeout(fn, to);
      }
      return 'cats';
    };

    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      var context = contextSetup(document);
      var params = { frameWaitTime: 90000 };

      axe.utils.collectResultsFromFrames(
        context,
        params,
        'stuff',
        'morestuff',
        noop,
        function (err) {
          assert.instanceOf(err, Error);
          assert.equal(err.message.split(/: /)[0], 'Axe in frame timed out');
          done();
        }
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/results-timeout.html';
    fixture.appendChild(frame);
  });

  it('should not throw given a recursive iframe', function (done) {
    axe._load({
      rules: [
        {
          id: 'iframe',
          selector: 'iframe',
          any: [
            {
              id: 'iframe',
              evaluate: function () {
                return true;
              }
            }
          ]
        }
      ],
      messages: {}
    });

    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      var context = contextSetup(document);

      axe.utils.collectResultsFromFrames(
        context,
        {},
        'rules',
        'morestuff',
        function () {
          done();
        },
        function (e) {
          assert.ok(false, e);
          done();
        }
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/nested0.html';
    fixture.appendChild(frame);
  });

  it('returns errors send from the frame', function (done) {
    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      var context = contextSetup(document);
      axe.utils.collectResultsFromFrames(
        context,
        {},
        'rules',
        'morestuff',
        function () {
          done(new Error('Should not be called'));
        },
        function (err) {
          assert.instanceOf(err, Error);
          assert.equal(err.message.split(/\n/)[0], 'error in axe.throw');
          done();
        }
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/throwing.html';
    fixture.appendChild(frame);
  });
});
