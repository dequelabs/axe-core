describe('Options parameter', () => {
  before(done => {
    axe.testUtils.awaitNestedLoad(done);
  });

  function $id(id) {
    return document.getElementById(id);
  }

  describe('iframes', () => {
    it('should include iframes if `iframes` is true', done => {
      const config = { iframes: true };
      axe.run(document, config, (err, results) => {
        try {
          assert.lengthOf(results.violations, 0, 'violations');
          assert.lengthOf(results.passes, 1, 'passes');
          assert.isTrue(
            results.passes[0].nodes.some(node => {
              if (node.target.length !== 2) {
                return false;
              }
              return node.target[0] === '#myframe';
            }),
            "couldn't find iframe result"
          );
          assert.lengthOf(
            results.passes[0].nodes,
            2,
            'results from main and iframe'
          );
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    it('should exclude iframes if `iframes` is false', done => {
      const config = { iframes: false };
      axe.run(document, config, (err, results) => {
        try {
          assert.lengthOf(results.violations, 0, 'violations');
          assert.lengthOf(results.passes, 1, 'passes');
          assert.isFalse(
            results.passes[0].nodes.some(node => {
              if (node.target.length !== 2) {
                return false;
              }
              return node.target[0] === '#myframe';
            }),
            'unexpectedly found iframe result'
          );
          assert.lengthOf(
            results.passes[0].nodes,
            1,
            'results from main frame only'
          );
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    it('should include iframes by default', done => {
      const config = {};
      axe.run(document, config, (err, results) => {
        try {
          assert.lengthOf(results.violations, 0, 'violations');
          assert.lengthOf(results.passes, 1, 'passes');
          assert.isTrue(
            results.passes[0].nodes.some(node => {
              if (node.target.length !== 2) {
                return false;
              }
              return node.target[0] === '#myframe';
            }),
            "couldn't find iframe result"
          );
          assert.lengthOf(
            results.passes[0].nodes,
            2,
            'results from main and iframe'
          );
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });

  describe('elementRef', () => {
    it('should not return an elementRef by default', done => {
      const config = {};
      axe.run(document, config, (err, results) => {
        try {
          assert.lengthOf(results.violations, 0, 'violations');
          assert.lengthOf(results.passes, 1, 'passes');
          assert.lengthOf(results.passes[0].nodes, 2, '');
          assert.isFalse(
            results.passes[0].nodes.some(node => {
              return 'element' in node;
            }),
            'unexpectedly foud element ref'
          );
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    it('should not return an elementRef if `elementRef` is false', done => {
      const config = { elementRef: false };
      axe.run(document, config, (err, results) => {
        try {
          assert.lengthOf(results.violations, 0, 'violations');
          assert.lengthOf(results.passes, 1, 'passes');
          assert.lengthOf(
            results.passes[0].nodes,
            2,
            'results from main frame and iframe'
          );
          assert.isFalse(
            results.passes[0].nodes.some(node => {
              return 'element' in node;
            }),
            'unexpectedly found element ref'
          );
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    it('should return element refs for the top frame only if `elementRef` is true', done => {
      const config = { elementRef: true };
      axe.run(document, config, (err, results) => {
        try {
          assert.lengthOf(results.violations, 0, 'violations');
          assert.lengthOf(results.passes, 1, 'passes');
          assert.lengthOf(results.passes[0].nodes, 2, '');
          assert.isTrue(
            results.passes[0].nodes.every(node => {
              if ('element' in node) {
                return node.element === $id('target');
              }
              return 'target' in node && node.target.length > 1;
            }),
            'every result node should either be in an iframe or have an element ref'
          );
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });

  describe('no selectors', () => {
    it('should return a selector by default', done => {
      const config = {};
      axe.run(document, config, (err, results) => {
        try {
          assert.lengthOf(results.violations, 0, 'violations');
          assert.lengthOf(results.passes, 1, 'passes');
          assert.lengthOf(results.passes[0].nodes, 2, '');
          assert.isTrue(
            results.passes[0].nodes.every(node => {
              return 'target' in node;
            }),
            'every result node should have a target'
          );
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    it('should return a selector if `selectors` is true', done => {
      const config = { selectors: true };
      axe.run(document, config, (err, results) => {
        try {
          assert.lengthOf(results.violations, 0, 'violations');
          assert.lengthOf(results.passes, 1, 'passes');
          assert.lengthOf(results.passes[0].nodes, 2, '');
          assert.isTrue(
            results.passes[0].nodes.every(node => {
              return 'target' in node;
            }),
            'every result node should have a target'
          );
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    it('should return no selector in top frame if `selectors` is false', done => {
      const config = { selectors: false };
      axe.run(document, config, (err, results) => {
        try {
          assert.lengthOf(results.violations, 0, 'violations');
          assert.lengthOf(results.passes, 1, 'passes');
          assert.lengthOf(results.passes[0].nodes, 2, '');
          assert.isFalse(
            results.passes[0].nodes.some(node => {
              return 'target' in node && node.target.length === 1;
            }),
            'only iframe result nodes should have a target'
          );
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
