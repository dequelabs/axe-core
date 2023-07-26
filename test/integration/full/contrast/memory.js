/*
  Since we can't easily test for memory issue we'll assume that if this test doesn't time out then the memory issue isn't a problem
*/
describe('color-contrast memory test', () => {
  describe('violations', () => {
    it('should find none', done => {
      axe.run(
        '#fixture',
        { runOnly: { type: 'rule', values: ['color-contrast'] } },
        (err, results) => {
          assert.isNull(err);
          assert.lengthOf(results.violations, 0);
          done();
        }
      );
    });
  });
});
