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
    dqre.audit = null;
  });

  it('should throw if no audit is configured', function () {

    assert.throws(function () {
      cleanupTools(document, {});
    }, Error, /^No audit configured/);
  });

  it('should call cleanup on all active tools', function (done) {
    var cleaned = 0;
    dqre.configure({
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
    dqre.audit.tools.one.active = true;
    dqre.audit.tools.two.active = false;
    dqre.audit.tools.three.active = true;

    cleanupTools(function () {
      assert.equal(cleaned, 2);
      done();
    });
  });

  it('should send command to frames to cleanup', function (done) {
    createFrames(function () {
      dqre.configure({
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
