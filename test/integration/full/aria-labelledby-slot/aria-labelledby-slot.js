describe('aria-labelledby referencing a slot in shadow DOM (issue 4335)', () => {
  let results;
  let runError = null;

  before(done => {
    axe.testUtils.awaitNestedLoad(async () => {
      try {
        results = await axe.run('#host');
      } catch (err) {
        runError = err;
      }
      done();
    });
  });

  it('runs without throwing', () => {
    assert.isNull(runError, runError && runError.stack);
  });

  it('does not surface a "Cannot read properties" rule error', () => {
    // Regression guard for #4335: computing the section's accessible name
    // (its aria-labelledby points at a <slot> that is not tracked in the
    // virtual tree) previously threw "Cannot read properties of undefined
    // (reading 'props')", surfacing as errored incomplete results.
    assert.notInclude(JSON.stringify(results), 'Cannot read properties');
  });

  it('evaluates the shadow DOM content (guards against a no-op test)', () => {
    const evaluated =
      results.passes.length +
      results.violations.length +
      results.incomplete.length;
    assert.isAbove(evaluated, 0);
  });
});
