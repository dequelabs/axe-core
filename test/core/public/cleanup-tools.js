/*global cleanupTools */
describe('cleanupTools', function () {
  'use strict';

  function createFrames(callback) {
    var frame;

    frame = document.createElement('iframe');
    frame.src = '../mock/frames/nocode.html';
    frame.addEventListener('load', callback);
    fixture.appendChild(frame);
  }

  var fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
    axe.plugins = {};
  });

  beforeEach(function () {
    axe._audit = null;
  });


  it('should throw if no audit is configured', function () {

    assert.throws(function () {
      cleanupTools(document, {});
    }, Error, /^No audit configured/);
  });

  it('should call cleanup on all active tools', function (done) {
    var cleaned = 0;
    axe._load({
      tools: [{
        id: 'one',
        source: {
          run: function () {},
          cleanup: function (callback) {
            cleaned++;
            callback();
          }
        }
      }, {
        id: 'two',
        source: {
          run: function () {},
          cleanup: function (callback) {
            cleaned++;
            callback();
          }
        }
      }, {
        id: 'three',
        source: {
          run: function () {},
          cleanup: function (callback) {
            cleaned++;
            callback();
          }
        }
      }]
    });
    axe._audit.tools.one.active = true;
    axe._audit.tools.two.active = false;
    axe._audit.tools.three.active = true;

    cleanupTools(function () {
      assert.equal(cleaned, 2);
      done();
    });
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
    axe.plugins.p.cleanup = function (done) {
      cleaned = true;
      done();
    };
    cleanupTools(function () {
      assert.equal(cleaned, true);
      done();
    });
  });

  it('should send command to frames to cleanup', function (done) {
    createFrames(function () {
      axe._load({
        tools: [{
          id: 'one',
          source: {
            run: function () {},
            cleanup: function (callback) {
              callback();
            }
          }
        }]
      });
      var orig = utils.sendCommandToFrame;
      var frame = document.querySelector('iframe');
      utils.sendCommandToFrame = function (node, opts) {
        assert.equal(node, frame);
        assert.deepEqual(opts, {
          command: 'cleanup-tool'
        });
        done();
      };


      cleanupTools();
      utils.sendCommandToFrame = orig;
    });

  });
});
