/**
 * NOTE:
 * `document.styleSheets` does not recognize dynamically injected stylesheets after `load` via `beforeEach`/ `before`,
 * so tests for disabled and external stylesheets are done in `integration` tests
 * Refer Directory: `./test/full/preload-cssom/**.*`
 */
describe('axe.utils.preloadCssom', () => {
  let treeRoot;

  function addStyleToHead() {
    const css = 'html {font-size: inherit;}';
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.id = 'preloadCssomTestHeadSheet';
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
  }

  function removeStyleFromHead() {
    const s = document.getElementById('preloadCssomTestHeadSheet');
    if (s) {
      s.parentNode.removeChild(s);
    }
  }

  beforeEach(() => {
    addStyleToHead();
    treeRoot = axe._tree = axe.utils.getFlattenedTree(document);
  });

  afterEach(() => {
    removeStyleFromHead();
  });

  it('returns CSSOM object containing an array of sheets', done => {
    const actual = axe.utils.preloadCssom({ treeRoot: treeRoot });
    actual
      .then(cssom => {
        assert.isAtLeast(cssom.length, 2);
        done();
      })
      .catch(error => {
        done(error);
      });
  });

  it('returns CSSOM and ensure that each object have defined properties', done => {
    const actual = axe.utils.preloadCssom({ treeRoot: treeRoot });
    actual
      .then(cssom => {
        assert.isAtLeast(cssom.length, 2);
        cssom.forEach(o => {
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
      .catch(error => {
        done(error);
      });
  });

  it('returns false if number of sheets returned does not match stylesheets defined in document', done => {
    const actual = axe.utils.preloadCssom({ treeRoot: treeRoot });
    actual
      .then(cssom => {
        assert.isFalse(cssom.length <= 1);
        done();
      })
      .catch(error => {
        done(error);
      });
  });

  it('returns all stylesheets and ensure each sheet has property cssRules', done => {
    const actual = axe.utils.preloadCssom({ treeRoot: treeRoot });
    actual
      .then(cssom => {
        cssom.forEach(s => {
          assert.isDefined(s.sheet);
          assert.property(s.sheet, 'cssRules');
        });
        done();
      })
      .catch(error => {
        done(error);
      });
  });
});
