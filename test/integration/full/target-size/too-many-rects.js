describe('target-size too many rects test', () => {
  'use strict';
  let results;

  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      const options = {
        runOnly: ['target-size'],
        elementRef: true
      };
      const context = {
        include: '#incomplete',
        // ignore the incomplete table results
        exclude: 'table tr'
      };
      axe.run(context, options, (err, r) => {
        if (err) {
          done(err);
        }
        results = r;
        console.log(results);
        done();
      });
    });
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
