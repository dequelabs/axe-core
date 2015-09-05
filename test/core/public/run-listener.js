/*global runListener */
describe('runListener', function () {
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
    axe._audit = null;
  });

  it('should publish itself as axe.listener', function () {
    assert.equal(runListener, axe.listener);
  });

  it('should throw if no audit is configured', function () {

    assert.throws(function () {
      runListener();
    }, Error, /^No audit configured/);
  });

  it('should throw if no callback supplied', function () {

    axe._load({
      rules: [],
      tools: [],
      listeners : [],
      messages: {}});
    assert.throws(function () {
      runListener('html', 'options', undefined);
    }, Error, /^A callback function must be supplied/);
  });
  it('should throw if callback is not a function', function () {

    axe._load({
      rules: [],
      tools: [],
      listeners : [],
      messages: {}});
    assert.throws(function () {
      runListener('html', 'options', 'string');
    }, Error, /^A callback function must be supplied/);
  });
  it('should work without frames', function (done) {
    var target = document.createElement('div');
    target.id = 'target';
    fixture.appendChild(target);

    axe._load({
      rules: [],
      tools: [],
      listeners : [{
        id: 'html',
        source: {
          run: function (options, callback) {
            this.results = ['result!'];
            this.callback = callback;
            assert.equal(options, 'options');
          },
          end: function () {
            this.callback(this.results);
          },
          control: function (callback) {
            callback();
          }
        }
    }], messages: {}});
    runListener('html', 'options', function (r) {
      assert.deepEqual(r, ['result!']);
      done();
    });
  });

  it('should work across frames', function (done) {
    axe._load({
      rules: [],
      tools: [],
      listeners : [{
        id: 'html',
        source: {
          run: function (options, callback) {
            var input;
            this.results = [];
            input = document.querySelector('input');
            if (input) {
              this.results = [{
                node: {
                  element: input,
                  source: '<html></html>',
                  selector: [axe.utils.getSelector(input)]
                }
              }];
            }
            this.callback = callback;
          },
          end: function () {
            this.callback(this.results);
          },
          control: function (callback) {
            setTimeout(function () {
              callback();
            }, 50);
          }
        }
      }],
      messages: {}});

    createFrames(function () {
      setTimeout(function () {
        runListener('html', {}, function (r) {
          assert.equal(r.length, 1);
          assert.equal(r[0].node.selector.length, 3);
          assert.deepEqual(r[0].node.selector, ['#target', 'body > iframe', 'body > input']);
          setTimeout(function () {
            done();
          }, 1);
        });

      }, 10);

    });
  });

});
