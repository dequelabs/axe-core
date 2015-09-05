/*global runFinder */
describe('runFinder', function () {
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

  it('should publish itself as axe.finder', function () {
    assert.equal(runFinder, axe.finder);
  });

  it('should throw if no audit is configured', function () {

    assert.throws(function () {
      runFinder();
    }, Error, /^No audit configured/);
  });

  it('should throw if no callback supplied', function () {

    axe._load({
      rules: [],
      tools: [],
      finders : [],
      messages: {}});
    assert.throws(function () {
      runFinder('html', document, '*', 'options', undefined);
    }, Error, /^A callback function must be supplied/);
  });
  it('should throw if callback is not a function', function () {

    axe._load({
      rules: [],
      tools: [],
      finders : [],
      messages: {}});
    assert.throws(function () {
      runFinder('html', document, '*', 'options', 'string');
    }, Error, /^A callback function must be supplied/);
  });
  it('should work without frames', function (done) {
    var target = document.createElement('div');
    target.id = 'target';
    fixture.appendChild(target);

    axe._load({
      rules: [],
      tools: [],
      finders : [{
        id: 'html',
        source: {
          run: function (node, options, callback) {
            assert.equal(node.nodeName, 'DIV');
            assert.equal(options, 'options');
            callback('result!');
          }
        }
    }], messages: {}});
    runFinder('html', '#fixture', 'div', 'options', function (r) {
      assert.deepEqual(r, ['result!']);
      done();
    });
  });

  it('should work across frames', function (done) {
    axe._load({
      rules: [],
      tools: [],
      finders: [{
        id: 'html',
        source: {
          run: function (node, options, callback) {
            callback({
              href: node.getAttribute('href')
            });
          }
        }
    }], messages: {}});

    createFrames(function () {
      setTimeout(function () {
        runFinder('html', ['#target', 'body > iframe'], 'a', {}, function (r) {
          assert.equal(r.length, 1);
          assert.equal(r[0].href, '#');
          assert.equal(r[0].node.selector.length, 3);
          assert.deepEqual(r[0].node.selector, ['#target', 'body > iframe', 'body > a']);
          done();
        });

      }, 100);

    });
  });

});
