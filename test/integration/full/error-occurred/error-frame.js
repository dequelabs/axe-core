describe('error-occurred test', () => {
  const { runPartialRecursive } = axe.testUtils;
  let results;

  describe('axe.run()', () => {
    before(done => {
      axe.testUtils.awaitNestedLoad(() => {
        axe.run(
          {
            runOnly: ['matches-error', 'evaluate-error', 'after-error']
          },
          function (err, r) {
            assert.isNull(err);
            results = r;
            done();
          }
        );
      });
    });

    it('should find 0 violations', () => {
      assert.lengthOf(results.violations, 0);
    });

    it('should find  0 passes', () => {
      assert.lengthOf(results.passes, 0);
    });

    describe('incomplete', () => {
      it('should find matches-error', () => {
        const matchesError = results.incomplete.find(
          result => result.id === 'matches-error'
        );
        window.assertIsErrorOccurred(matchesError, {
          message: 'matches error',
          target: ['#frame', '#target']
        });
      });

      it('should find evaluate-error', () => {
        const evaluateError = results.incomplete.find(
          result => result.id === 'evaluate-error'
        );
        window.assertIsErrorOccurred(evaluateError, {
          message: 'evaluate error',
          target: ['#frame', '#target']
        });
      });

      it('should find after-error', () => {
        const afterError = results.incomplete.find(
          result => result.id === 'after-error'
        );
        window.assertIsErrorOccurred(afterError, {
          message: 'after error',
          target: ['#frame', '#target']
        });
      });
    });
  });

  describe('axe.runPartial() + axe.finishRun()', () => {
    before(() => {
      return new Promise(resolve => {
        axe.testUtils.awaitNestedLoad(async () => {
          const runOptions = {
            runOnly: ['matches-error', 'evaluate-error', 'after-error']
          };
          const partialResults = await Promise.all(
            runPartialRecursive(document, runOptions)
          );
          results = await axe.finishRun(partialResults, runOptions);
          resolve();
        });
      });
    });

    it('should find 0 violations', () => {
      assert.lengthOf(results.violations, 0);
    });

    it('should find  0 passes', () => {
      assert.lengthOf(results.passes, 0);
    });

    describe('incomplete', () => {
      it('should find matches-error', () => {
        const matchesError = results.incomplete.find(
          result => result.id === 'matches-error'
        );
        window.assertIsErrorOccurred(matchesError, {
          message: 'matches error',
          target: ['#frame', '#target']
        });
      });

      it('should find evaluate-error', () => {
        const evaluateError = results.incomplete.find(
          result => result.id === 'evaluate-error'
        );
        window.assertIsErrorOccurred(evaluateError, {
          message: 'evaluate error',
          target: ['#frame', '#target']
        });
      });

      it('should find after-error', () => {
        const afterError = results.incomplete.find(
          result => result.id === 'after-error'
        );
        window.assertIsErrorOccurred(afterError, {
          message: 'after error',
          target: ['#frame', '#target']
        });
      });
    });
  });
});
