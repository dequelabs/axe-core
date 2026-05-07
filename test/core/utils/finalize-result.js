describe('axe.utils.finalizeRuleResult', () => {
  const original = axe._audit;

  beforeEach(() => {
    axe._audit = {
      rules: []
    };
  });

  after(() => {
    axe._audit = original;
  });

  it('should be a function', () => {
    assert.isFunction(axe.utils.finalizeRuleResult);
  });

  it('returns the first param object', () => {
    const goingIn = {
      nodes: []
    };
    const comingOut = axe.utils.finalizeRuleResult(goingIn);

    assert.equal(goingIn, comingOut);
  });

  it('assigns impact if rule.impact is defined', () => {
    axe._audit = {
      rules: [{ id: 'foo', impact: 'critical' }]
    };

    const output = axe.utils.finalizeRuleResult({
      id: 'foo',
      nodes: [
        {
          any: [
            {
              result: false,
              impact: 'minor'
            }
          ],
          all: [],
          none: []
        }
      ]
    });

    assert.equal(output.impact, 'critical');
    assert.equal(output.violations[0].impact, 'critical');
    assert.equal(output.violations[0].any[0].impact, 'critical');
  });

  it('leaves impact as null when rule.impact is defined', () => {
    axe._audit = {
      rules: [{ id: 'foo', impact: 'critical' }]
    };

    const output = axe.utils.finalizeRuleResult({
      id: 'foo',
      nodes: [
        {
          any: [
            {
              result: true,
              impact: 'minor'
            }
          ],
          all: [],
          none: []
        }
      ]
    });

    assert.isNull(output.impact);
    assert.isNull(output.passes[0].impact);
    assert.equal(output.passes[0].any[0].impact, 'critical');
  });
});
