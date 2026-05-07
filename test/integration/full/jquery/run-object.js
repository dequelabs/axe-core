/*global $ */

describe('jQuery object as axe.run context', () => {
  const config = { runOnly: { type: 'rule', values: ['aria-roles'] } };
  it('should find no violations', done => {
    const fixture = $('#fixture');
    axe.run(fixture, config, (err, results) => {
      assert.isNull(err);
      assert.lengthOf(results.violations, 0, 'violations');
      assert.lengthOf(results.passes, 1, 'passes');
      done();
    });
  });
});
