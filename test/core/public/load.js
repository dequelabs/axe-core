describe('axe._load', function () {
  var fixture = document.querySelector('#fixture');
  var captureError = axe.testUtils.captureError;

  afterEach(function () {
    axe._audit = null;
  });

  it('should be a function', function () {
    assert.isFunction(axe._load);
  });

  it('should push rules on the Audit', function () {
    var mockAudit = {
      rules: [{ id: 'monkeys' }, { id: 'bananas' }]
    };

    axe._load(mockAudit);
    // TODO: this does not work yet thanks to webpack
    // assert.instanceOf(axe._audit.rules[0], Rule);
    // assert.instanceOf(axe._audit.rules[1], Rule);
    assert.equal(axe._audit.rules[0].id, 'monkeys');
    assert.equal(axe._audit.rules[1].id, 'bananas');
  });

  it('should load with a lang', function () {
    axe._load({
      lang: 'ja'
    });
    assert.equal(axe._audit.lang, 'ja');
  });

  describe('respondable subscriber', function () {
    it('should add a respondable subscriber for axe.ping', function (done) {
      var winParent = window.parent;
      var mockAudit = {
        rules: [{ id: 'monkeys' }, { id: 'bananas' }]
      };

      axe._load(mockAudit);

      var frame = document.createElement('iframe');
      frame.src = '../mock/frames/test.html';
      frame.addEventListener('load', function () {
        var win = frame.contentWindow;
        window.parent = win;
        win.postMessage = captureError(function (message) {
          var data = JSON.parse(message);
          assert.deepEqual(data.payload, { axe: true });
          window.parent = winParent;
          done();
        }, done);
        axe.utils.respondable(win, 'axe.ping', { axe: true });
      });

      fixture.appendChild(frame);
    });

    describe('given command rules', function () {
      // todo: see issue - https://github.com/dequelabs/axe-core/issues/2168
      it.skip('should call `runRules` and default context to empty object', function (done) {
        var mockAudit = {
          rules: []
        };
        var origSub = window.utils.respondable.subscribe;
        var orig = window.runRules;
        window.runRules = function (context, options, callback) {
          assert.deepEqual(context, {});
          assert.isFunction(callback);
          done();
        };

        axe.utils.respondable.subscribe = function (topic, callback) {
          callback(
            { data: 'iscool', command: 'rules' },
            undefined,
            function (response) {
              // ping callback will call this response function
              assert.ok(response);
            }
          );
        };
        axe._load(mockAudit);

        window.utils.respondable.subscribe = origSub;
        window.runRules = orig;
      });

      // todo: see issue - https://github.com/dequelabs/axe-core/issues/2168
      it.skip('should pass data.context to `runRules`', function (done) {
        var origSub = window.utils.respondable.subscribe;
        var orig = window.runRules;
        window.runRules = function (context, options, callback) {
          assert.deepEqual(context, { include: ['monkeys'] });
          assert.isFunction(callback);
          done();
        };

        axe.utils.respondable.subscribe = function (topic, callback) {
          callback(
            { command: 'rules', context: { include: ['monkeys'] } },
            undefined,
            function (response) {
              assert.ok(response);
            }
          );
        };
        axe._load({
          rules: []
        });

        window.utils.respondable.subscribe = origSub;
        window.runRules = orig;
      });

      // todo: see issue - https://github.com/dequelabs/axe-core/issues/2168
      it.skip('should default include to current document if none are found', function (done) {
        var origSub = axe.utils.respondable.subscribe;
        var orig = window.runRules;
        var expected = { include: [document] };
        window.runRules = function (context) {
          assert.deepEqual(context, expected);
          done();
        };

        axe.utils.respondable.subscribe = function (topic, callback) {
          callback(
            { command: 'rules', context: { include: [] } },
            undefined,
            function () {}
          );
        };
        axe._load({
          rules: []
        });
        window.runRules = orig;
        axe.utils.respondable.subscribe = origSub;
      });
    });

    describe('given command cleanup-plugins', function () {
      // todo: see issue - https://github.com/dequelabs/axe-core/issues/2168
      it.skip('should call `cleanup`', function (done) {
        var mockAudit = {
          rules: []
        };
        var origSub = window.utils.respondable.subscribe;
        var orig = window.cleanup;
        window.cleanup = function (callback) {
          assert.isFunction(callback);
          done();
        };

        axe.utils.respondable.subscribe = function (topic, callback) {
          callback(
            {
              command: 'cleanup-plugin'
            },
            undefined,
            function (response) {
              // ping callback will call this response function
              assert.ok(response);
            }
          );
        };
        axe._load(mockAudit);

        window.utils.respondable.subscribe = origSub;
        window.cleanup = orig;
      });
    });
  });
});
