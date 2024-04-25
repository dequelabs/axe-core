describe('color-contrast prototype.js test', () => {
  let results;

  before(done => {
    axe.testUtils.awaitNestedLoad(async () => {
      const options = {
        runOnly: ['color-contrast'],
        elementRef: true
      };
      results = await axe.run('#fixture', options);
      done();
    });
  });

  describe('incomplete', () => {
    it('should find none', () => {
      assert.lengthOf(results.incomplete, 0);
    });
  });

  describe('violations', () => {
    it('should find one', () => {
      assert.lengthOf(results.violations, 1);
    });
  });
});
