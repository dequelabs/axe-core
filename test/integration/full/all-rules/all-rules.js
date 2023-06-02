describe('all rules test', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(async () => {
      results = await axe.run();
      done();
    });
  });

  it('should run all rules', () => {
    // DAISY-AXE
    // 0
    assert.lengthOf(results.inapplicable, 2);
  });

  it('should find same results when scrolled', async () => {
    const endButton = document.querySelector('#end-of-page');
    endButton.focus();
    const scrollResults = await axe.run();
    scrollResults.testEnvironment = results.testEnvironment;
    scrollResults.timestamp = results.timestamp;
    assert.deepEqual(results, scrollResults);
  });
});
