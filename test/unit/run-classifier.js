/*global runClassifier */
describe('runClassifier', function () {
  'use strict';

  function iframeReady(src, context, id, cb) {
    var i = document.createElement('iframe');
    i.addEventListener('load', function () {
      cb();
    });
    i.src = src;
    i.id = id;
    context.appendChild(i);
  }

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

  it('should throw if no audit is configured', function () {

    assert.throws(function () {
      runClassifier('foo', document, {});
    }, Error, /^No audit configured/);
  });

  it('should pass context to `Context` constructor', function (done) {
    var orig = window.Context;
    var expected = {
      include: [document],
      exclude: [document.body]
    };
    var called = false;

    window.Context = function (actual) {
      assert.deepEqual(actual, expected);
      called = true;
      actual.frames = [];
      return actual;
    };

    dqre.configure({
      rules: {},
      classifiers: [{ id: 'foo', evaluate: function () {} }]
    });
    runClassifier('foo', expected, null, function () {
      assert.isTrue(called);
      done();
    });


    window.Context = orig;
  });

  it('should properly order iframes', function (done) {
    this.timeout(5000);
    dqre.configure({ rules: [],
      classifiers: [{
        id: 'iframe',
        selector: 'iframe',
        evaluate: function () {
          return true;
        }
      }], messages: {}});

    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      setTimeout(function () {
        runClassifier('iframe', document, {}, function (r) {
          var nodes = r.details.map(function (detail) {
            return detail.node.selector;
          });

          assert.deepEqual(nodes, [
            ['#level0'],
            ['#level0', '#level1'],
            ['#level0', '#level1', '#level2a'],
            ['#level0', '#level1', '#level2b']
          ]);
          done();
        });

      }, 500);

    });
    frame.id = 'level0';
    frame.src = '../mock/frames/nested0.html';
    fixture.appendChild(frame);
  });

  it('should work', function (done) {
    this.timeout(5000);
    dqre.configure({
      rules: [],
      classifiers: [{
        id: 'html',
        selector: 'html',
        evaluate: function () {
          return true;
        }
      }], messages: {}});

    createFrames(function () {
      setTimeout(function () {
        runClassifier('html', document, {}, function (r) {
          assert.lengthOf(r.details, 3);
          done();
        });

      }, 500);

    });
  });

});
