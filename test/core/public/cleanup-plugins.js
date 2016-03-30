/*global cleanupPlugins */
describe('cleanupPlugins', function () {
  'use strict';

  function createFrames(callback) {
    var frame;
    frame = document.createElement('iframe');
    frame.src = '../mock/frames/nested1.html';
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
    assert.throws(function () {
      cleanupPlugins(document, {});
    }, Error, /^No audit configured/);
  });


  it('should call cleanup on all plugins', function (done) {
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
    cleanupPlugins(function () {
      assert.equal(cleaned, true);
      done();
    }, assertNotCalled);
  });


  it('should send command to frames to cleanup', function (done) {
    createFrames(function () {
      axe._load({});
      var orig = axe.utils.sendCommandToFrame;
      var frame = document.querySelector('iframe');
      axe.utils.sendCommandToFrame = function (node, opts, resolve) {
        assert.equal(node, frame);
        assert.deepEqual(opts, {
          command: 'cleanup-plugin'
        });
        axe.utils.sendCommandToFrame = orig;
        resolve();
        done();
      };
      cleanupPlugins(function () {}, assertNotCalled);
    });
  });

});
