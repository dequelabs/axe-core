/*global $ */

describe('jQuery object with axe.run', () => {
  const config = { runOnly: { type: 'rule', values: ['aria-roles'] } };

  describe('include', () => {
    it('should find violations', done => {
      const target = $('#target')[0];
      axe.run({ include: [target] }, config, (err, results) => {
        assert.isNull(err);
        assert.lengthOf(results.violations, 1, 'violations');
        assert.lengthOf(results.passes, 0, 'passes');
        done();
      });
    });
  });

  describe('exclude', () => {
    it('should find no violations', done => {
      const target = $('#target')[0];
      axe.run({ exclude: [target] }, config, (err, results) => {
        assert.isNull(err);
        assert.lengthOf(results.violations, 0, 'violations');
        assert.lengthOf(results.passes, 0, 'passes');
        done();
      });
    });
  });
});
