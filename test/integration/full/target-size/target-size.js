describe('target-size test', () => {
  'use strict';
  let results;

  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      // Add necessary markup for axe to recognize these as components:
      document.querySelectorAll('section span').forEach(link => {
        link.setAttribute('role', 'link');
        link.setAttribute('tabindex', '0');
      });

      const options = {
        runOnly: ['target-size'],
        elementRef: true
      };
      const context = {
        include: 'section',
        // ignore the incomplete table results
        exclude: 'table tr'
      };
      axe.run(context, options, (err, r) => {
        if (err) {
          done(err);
        }
        results = r;
        // Add some highlighting for visually identifying issues.
        // There are too many test cases to just do this by selector.
        results.violations[0] &&
          results.violations[0].nodes.forEach(node => {
            node.element.className += ' violations';
          });
        results.passes[0] &&
          results.passes[0].nodes.forEach(node => {
            node.element.className += ' passes';
          });
        console.log(results);
        done();
      });
    });
  });

  it('finds all passing nodes', () => {
    const passResults = results.passes[0] ? results.passes[0].nodes : [];
    const passedElms = document.querySelectorAll(
      'section:not([hidden]) div:not([hidden]) .passed'
    );
    passResults.forEach(result => {
      assert.include(passedElms, result.element);
    });
    assert.lengthOf(passResults, passedElms.length);
  });

  it('finds all failed nodes', () => {
    const failResults = results.violations[0]
      ? results.violations[0].nodes
      : [];
    const failedElms = document.querySelectorAll(
      'section:not([hidden]) div:not([hidden]) .failed'
    );
    failResults.forEach(result => {
      assert.include(failedElms, result.element);
    });
    assert.lengthOf(failResults, failedElms.length);
  });

  it('incompletes with too many rects', () => {
    const incompleteNodes = results.incomplete[0]
      ? results.incomplete[0].nodes
      : [];
    assert.lengthOf(incompleteNodes, 1);
    assert.include(
      incompleteNodes[0].element,
      document.querySelector('#incomplete-many-rects')
    );
  });
});
