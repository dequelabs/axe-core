/*global cleanup */
describe('cleanup', function () {
  'use strict';

  function createFrames(callback) {
    var frame;
    frame = document.createElement('iframe');
    frame.src = '../mock/frames/test.html';
    frame.addEventListener('load', function () {
      setTimeout(callback, 500);
    });
    fixture.appendChild(frame);
  }

  var fixture = document.getElementById('fixture');

  var assertNotCalled = function () {
    assert.ok(false, 'Should not be called');
  };

  afterEach(function () {
    fixture.innerHTML = '';
    axe.plugins = {};
  });

  beforeEach(function () {
    axe._audit = null;
  });

  it('should throw if no audit is configured', function () {
    assert.throws(
      function () {
        axe.cleanup(document, {});
      },
      Error,
      /^No audit configured/
    );
  });

  it('should call cleanup on all plugins', function (done) {
    /*eslint no-unused-vars: 0*/
    var cleaned = false;
    axe._load({
      rules: []
    });
    axe.registerPlugin({
      id: 'p',
      run: function () {},
      add: function (impl) {
        this._registry[impl.id] = impl;
      },
      commands: []
    });
    axe.plugins.p.cleanup = function (res) {
      cleaned = true;
      res();
    };
    axe.cleanup(function () {
      assert.equal(cleaned, true);
      done();
    }, assertNotCalled);
  });

  it('should not throw exception if no arguments are provided', function (done) {
    var cleaned = false;
    axe._load({
      rules: []
    });
    axe.registerPlugin({
      id: 'p',
      run: function () {},
      add: function (impl) {
        this._registry[impl.id] = impl;
      },
      commands: []
    });
    axe.plugins.p.cleanup = function (res) {
      cleaned = true;
      res();
    };
    assert.doesNotThrow(function () {
      axe.cleanup();
      done();
    });
  });

  it('should send command to frames to cleanup', function (done) {
    createFrames(function () {
      axe._load({});

      var frame = fixture.querySelector('iframe');
      var win = frame.contentWindow;
      win.addEventListener('message', function (message) {
        var data = JSON.parse(message.data);
        if (data.topic === 'axe.start') {
          assert.deepEqual(data.payload, { command: 'cleanup-plugin' });
          done();
        }
      });

      axe.cleanup();
    });
  });
});
