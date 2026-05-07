describe(`rerun axe in the same tick${window.location.pathname}`, () => {
  before(done => {
    axe.testUtils.awaitNestedLoad(done);
  });

  it('can run multiple times without interfering with itself', done => {
    const options = {
      runOnly: {
        type: 'rule',
        values: ['html-has-lang']
      }
    };

    // First run
    axe.run(options, (err1, res1) => {
      try {
        assert.isNull(err1);

        // Second run, on the same tick
        axe.run(options, (err2, res2) => {
          try {
            assert.isNull(err2);
            axe.testUtils.assertResultsDeepEqual(res1, res2);
            done();
          } catch (e) {
            done(e);
          }
        });
      } catch (e) {
        done(e);
      }
    });
  });
});
