/**
 * NOTE:
 * `document.styleSheets` does not recognize dynamically injected stylesheets after `load` via `beforeEach`/ `before`,
 * so tests for disabled and external stylesheets are done in `integration` tests
 * Refer Directory: `./test/full/preload-cssom/**.*`
 */
describe('axe.utils.preloadCssom', function () {
  'use strict';

  var treeRoot;

  function addStyleToHead() {
    var css = 'html {font-size: inherit;}';
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.id = 'preloadCssomTestHeadSheet';
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
  }

  function removeStyleFromHead() {
    var s = document.getElementById('preloadCssomTestHeadSheet');
    if (s) {
      s.parentNode.removeChild(s);
    }
  }

  beforeEach(function () {
    addStyleToHead();
    treeRoot = axe._tree = axe.utils.getFlattenedTree(document);
  });

  afterEach(function () {
    removeStyleFromHead();
  });

  it('returns CSSOM object containing an array of sheets', function (done) {
    var actual = axe.utils.preloadCssom({ treeRoot: treeRoot });
    actual
      .then(function (cssom) {
        assert.isAtLeast(cssom.length, 2);
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });

  it('returns CSSOM and ensure that each object have defined properties', function (done) {
    var actual = axe.utils.preloadCssom({ treeRoot: treeRoot });
    actual
      .then(function (cssom) {
        assert.isAtLeast(cssom.length, 2);
        cssom.forEach(function (o) {
          assert.hasAllKeys(o, [
            'root',
            'shadowId',
            'sheet',
            'isCrossOrigin',
            'priority'
          ]);
        });
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });

  it('returns false if number of sheets returned does not match stylesheets defined in document', function (done) {
    var actual = axe.utils.preloadCssom({ treeRoot: treeRoot });
    actual
      .then(function (cssom) {
        assert.isFalse(cssom.length <= 1);
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });

  it('returns all stylesheets and ensure each sheet has property cssRules', function (done) {
    var actual = axe.utils.preloadCssom({ treeRoot: treeRoot });
    actual
      .then(function (cssom) {
        cssom.forEach(function (s) {
          assert.isDefined(s.sheet);
          assert.property(s.sheet, 'cssRules');
        });
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });
});
