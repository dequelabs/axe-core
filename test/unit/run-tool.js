/*global runTool */
describe('runTool', function () {
  'use strict';

  function createFrames(callback) {
    var frame, num = 2,
    loaded = 0;

    function onLoad() {
      loaded++;
      if (loaded >= (num)) {
        callback();
      }
    }

    frame = document.createElement('iframe');
    frame.id = 'target';
    frame.src = '../mock/frames/frame-frame.html';

    frame.addEventListener('load', onLoad);
    fixture.appendChild(frame);


    frame = document.createElement('iframe');
    frame.src = '../mock/frames/nocode.html';
    frame.addEventListener('load', onLoad);
    fixture.appendChild(frame);
  }


  var fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
    dqre.audit = null;
  });

  it('should publish itself as dqre.tool', function () {
    assert.equal(runTool, dqre.tool);
  });

  it('should throw if no audit is configured', function () {

    assert.throws(function () {
      runTool();
    }, Error, /^No audit configured/);
  });

  it('should work without frames', function (done) {
    this.timeout(5000);
    var target = document.createElement('div');
    target.id = 'target';
    fixture.appendChild(target);

    dqre.configure({
      rules: [],
      tools: [{
        id: 'html',
        run: function (node, options, callback) {
          assert.equal(node, target);
          callback('result!');
        }
    }], messages: {}});
    runTool('html', ['#target'], {}, function (r) {
      assert.equal(r, 'result!');
      done();
    });
  });

  it('should work across frames', function (done) {
    this.timeout(5000);
    dqre.configure({
      rules: [],
      tools: [{
        id: 'html',
        run: function (node, options, callback) {
          if (node.nodeName !== 'A') {
            callback('nope!');
          }
          callback('result!');
        }
    }], messages: {}});

    createFrames(function () {
      setTimeout(function () {
        runTool('html', ['#target', 'iframe', 'a'], {}, function (r) {
          assert.equal(r, 'result!');
          done();
        });

      }, 500);

    });
  });

});
