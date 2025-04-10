describe('all rules test', () => {
  const experimentalRuleId = 'img-alt-experimental';
  const deprecatedRuleId = 'img-alt-deprecated';

  beforeEach(() => {
    axe.configure({
      rules: [
        {
          id: experimentalRuleId,
          impact: 'critical',
          selector: 'img',
          tags: ['wcag2a', 'experimental'],
          enabled: false,
          metadata: {
            description:
              'Ensures <img> elements have alternate text or a role of none or presentation',
            help: 'Images must have alternate text'
          },
          all: [],
          any: ['has-alt'],
          none: []
        },
        {
          id: deprecatedRuleId,
          impact: 'critical',
          selector: 'img',
          tags: ['wcag2a', 'deprecated'],
          enabled: false,
          metadata: {
            description:
              'Ensures <img> elements have alternate text or a role of none or presentation',
            help: 'Images must have alternate text'
          },
          all: [],
          any: ['has-alt'],
          none: []
        }
      ]
    });
  });

  after(() => {
    axe.reset();
  });

  function findResult(results, ruleId) {
    return [
      ...results.violations,
      ...results.passes,
      ...results.incomplete,
      ...results.inapplicable
    ].find(result => result.id === ruleId);
  }

  it('does not run experimental rules by default', async () => {
    const results = await axe.run({
      runOnly: {
        type: 'tags',
        values: ['wcag2a']
      }
    });
    assert.isUndefined(findResult(results, experimentalRuleId));
  });

  it('does not run deprecated rules by default', async () => {
    const results = await axe.run({
      runOnly: {
        type: 'tags',
        values: ['wcag2a']
      }
    });
    assert.isUndefined(findResult(results, deprecatedRuleId));
  });

  it('runs tagExclude rules when enabled with { rules }', async () => {
    const results = await axe.run({
      runOnly: {
        type: 'tags',
        values: ['wcag2a']
      },
      rules: {
        [experimentalRuleId]: { enabled: true },
        [deprecatedRuleId]: { enabled: true }
      }
    });

    assert.isDefined(findResult(results, experimentalRuleId));
    assert.isDefined(findResult(results, deprecatedRuleId));
  });

  it('runs tagExclude rules when enabled with { runOnly: { type: rule } }', async () => {
    const results = await axe.run({
      runOnly: {
        type: 'rule',
        values: [experimentalRuleId, deprecatedRuleId]
      }
    });
    assert.isDefined(findResult(results, experimentalRuleId));
    assert.isDefined(findResult(results, deprecatedRuleId));
  });

  it('runs tagExclude rules when enabled with { runOnly: { type: tag } }', async () => {
    const results = await axe.run({
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'experimental', 'deprecated']
      }
    });
    assert.isDefined(findResult(results, experimentalRuleId));
    assert.isDefined(findResult(results, deprecatedRuleId));
  });
});
