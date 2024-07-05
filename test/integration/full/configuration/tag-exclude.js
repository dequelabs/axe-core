describe('all rules test', () => {
  const experimentalRuleId = 'label-content-name-mismatch';
  const deprecatedRuleId = 'aria-roledescription';

  function joinResults(results) {
    return [
      ...results.violations,
      ...results.passes,
      ...results.incomplete,
      ...results.inapplicable
    ];
  }

  it('does not run experimental rules by default', async () => {
    const results = await axe.run({
      runOnly: {
        type: 'tags',
        values: ['wcag2a', 'wcag21a']
      }
    });

    const joinedResults = joinResults(results);
    const experimentalResult = joinedResults.find(
      result => result.id === experimentalRuleId
    );
    assert.isUndefined(experimentalResult);
  });

  it('does not run deprecated rules by default', async () => {
    const results = await axe.run({
      runOnly: {
        type: 'tags',
        values: ['wcag2a', 'wcag21a']
      }
    });

    const joinedResults = joinResults(results);
    const deprecatedResult = joinedResults.find(
      result => result.id === deprecatedRuleId
    );
    assert.isUndefined(deprecatedResult);
  });

  it('runs tagExclude rules when enabled with { rules }', async () => {
    const results = await axe.run({
      runOnly: {
        type: 'tags',
        values: ['wcag2a', 'wcag21a']
      },
      rules: {
        [experimentalRuleId]: { enabled: true },
        [deprecatedRuleId]: { enabled: true }
      }
    });

    const joinedResults = joinResults(results);
    const experimentalResult = joinedResults.find(
      result => result.id === experimentalRuleId
    );
    const deprecatedResult = joinedResults.find(
      result => result.id === experimentalRuleId
    );
    assert.isDefined(experimentalResult);
    assert.isDefined(deprecatedResult);
  });

  it('runs tagExclude rules when enabled with { runOnly: { type: rule } }', async () => {
    const results = await axe.run({
      runOnly: {
        type: 'rule',
        values: [experimentalRuleId, deprecatedRuleId]
      }
    });
    const joinedResults = joinResults(results);
    const experimentalResult = joinedResults.find(
      result => result.id === experimentalRuleId
    );
    const deprecatedResult = joinedResults.find(
      result => result.id === experimentalRuleId
    );
    assert.isDefined(experimentalResult);
    assert.isDefined(deprecatedResult);
  });

  it('runs tagExclude rules when enabled with { runOnly: { type: tag } }', async () => {
    const results = await axe.run({
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag21a', 'experimental', 'deprecated']
      }
    });
    const joinedResults = joinResults(results);
    const experimentalResult = joinedResults.find(
      result => result.id === experimentalRuleId
    );
    const deprecatedResult = joinedResults.find(
      result => result.id === experimentalRuleId
    );
    assert.isDefined(experimentalResult);
    assert.isDefined(deprecatedResult);
  });
});
