describe('color-contrast prototype.js test', () => {
  'use strict';
  let results;

  before(done => {
    console.log(
      'cannot reproduce locally... debugging in CI',
      axe,
      axe.testUtils,
      axe.testUtils.awaitNestedLoad
    );
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
