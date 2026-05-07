describe('axe.utils.normalizeRunOptions', () => {
  const mockChecks = [
    {
      id: 'positive1-check1',
      evaluate: () => true
    },
    {
      id: 'positive2-check1',
      evaluate: () => true
    },
    {
      id: 'negative1-check1',
      evaluate: () => true
    },
    {
      id: 'positive3-check1',
      evaluate: () => true
    }
  ];

  const mockRules = [
    {
      id: 'positive1',
      selector: 'input',
      tags: ['positive'],
      any: [
        {
          id: 'positive1-check1'
        }
      ]
    },
    {
      id: 'positive2',
      selector: '#monkeys',
      tags: ['positive'],
      any: ['positive2-check1']
    },
    {
      id: 'negative1',
      selector: 'div',
      tags: ['negative'],
      none: ['negative1-check1']
    },
    {
      id: 'positive3',
      selector: 'blink',
      tags: ['positive'],
      any: ['positive3-check1']
    }
  ];
  const Audit = axe._thisWillBeDeletedDoNotUse.base.Audit;
  let axeLog;
  let axeAudit;
  let audit;
  beforeEach(() => {
    axeLog = axe.log;
    axeAudit = axe._audit;
    audit = new Audit();
    axe._audit = audit;
    mockRules.forEach(r => {
      audit.addRule(r);
    });
    mockChecks.forEach(c => {
      audit.addCheck(c);
    });
  });
  afterEach(() => {
    axe.log = axeLog;
    axe._audit = axeAudit;
  });

  it('returns the options object when it is valid', () => {
    const opt = {
      runOnly: {
        type: 'rule',
        values: ['positive1', 'positive2']
      },
      rules: {
        negative1: { enabled: false }
      }
    };
    assert.equal(axe.utils.normalizeRunOptions(opt), opt);
  });

  it('allows `value` as alternative to `values`', () => {
    const opt = {
      runOnly: {
        type: 'rule',
        value: ['positive1', 'positive2']
      }
    };
    const out = axe.utils.normalizeRunOptions(opt);
    assert.deepEqual(out.runOnly.values, ['positive1', 'positive2']);
    assert.isUndefined(out.runOnly.value);
  });

  it('allows type: rules as an alternative to type: rule', () => {
    const opt = {
      runOnly: {
        type: 'rules',
        values: ['positive1', 'positive2']
      }
    };
    assert.equal(axe.utils.normalizeRunOptions(opt).runOnly.type, 'rule');
  });

  it('allows type: tags as an alternative to type: tag', () => {
    const opt = {
      runOnly: {
        type: 'tags',
        values: ['positive']
      }
    };
    assert.equal(axe.utils.normalizeRunOptions(opt).runOnly.type, 'tag');
  });

  it('allows type: undefined as an alternative to type: tag', () => {
    const opt = {
      runOnly: {
        values: ['positive']
      }
    };
    assert.equal(axe.utils.normalizeRunOptions(opt).runOnly.type, 'tag');
  });

  it('allows runOnly as an array as an alternative to type: tag', () => {
    const opt = { runOnly: ['positive', 'negative'] };
    const out = axe.utils.normalizeRunOptions(opt);
    assert.equal(out.runOnly.type, 'tag');
    assert.deepEqual(out.runOnly.values, ['positive', 'negative']);
  });

  it('allows runOnly as an array as an alternative to type: rule', () => {
    const opt = { runOnly: ['positive1', 'negative1'] };
    const out = axe.utils.normalizeRunOptions(opt);
    assert.equal(out.runOnly.type, 'rule');
    assert.deepEqual(out.runOnly.values, ['positive1', 'negative1']);
  });

  it('allows runOnly as a string as an alternative to an array', () => {
    const opt = { runOnly: 'positive1' };
    const out = axe.utils.normalizeRunOptions(opt);
    assert.equal(out.runOnly.type, 'rule');
    assert.deepEqual(out.runOnly.values, ['positive1']);
  });

  it('throws an error if runOnly contains both rules and tags', () => {
    assert.throws(() => {
      axe.utils.normalizeRunOptions({
        runOnly: ['positive', 'negative1']
      });
    });
  });

  it('defaults runOnly to type: tag', () => {
    const opt = { runOnly: ['fakeTag'] };
    const out = axe.utils.normalizeRunOptions(opt);
    assert.equal(out.runOnly.type, 'tag');
    assert.deepEqual(out.runOnly.values, ['fakeTag']);
  });

  it('throws an error runOnly.values not an array', () => {
    assert.throws(() => {
      axe.utils.normalizeRunOptions({
        runOnly: {
          type: 'rule',
          values: { badProp: 'badValue' }
        }
      });
    });
  });

  it('throws an error runOnly.values an empty', () => {
    assert.throws(() => {
      axe.utils.normalizeRunOptions({
        runOnly: {
          type: 'rule',
          values: []
        }
      });
    });
  });

  it('throws an error runOnly.type is unknown', () => {
    assert.throws(() => {
      axe.utils.normalizeRunOptions({
        runOnly: {
          type: 'something-else',
          values: ['wcag2aa']
        }
      });
    });
  });

  it('throws an error when option.runOnly has an unknown rule', () => {
    assert.throws(() => {
      axe.utils.normalizeRunOptions({
        runOnly: {
          type: 'rule',
          values: ['frakeRule']
        }
      });
    });
  });

  it("doesn't throw an error when option.runOnly has an unknown tag", () => {
    assert.doesNotThrow(() => {
      axe.utils.normalizeRunOptions({
        runOnly: {
          type: 'tags',
          values: ['fakeTag']
        }
      });
    });
  });

  it('throws an error when option.rules has an unknown rule', () => {
    assert.throws(() => {
      axe.utils.normalizeRunOptions({
        rules: {
          fakeRule: { enabled: false }
        }
      });
    });
  });

  it('logs an issue when a tag is unknown', () => {
    let message = '';
    axe.log = m => {
      message = m;
    };
    axe.utils.normalizeRunOptions({
      runOnly: {
        type: 'tags',
        values: ['unknown-tag']
      }
    });
    assert.include(message, 'Could not find tags');
  });

  it('logs no issues for unknown WCAG level tags', () => {
    let message = '';
    axe.log = m => {
      message = m;
    };
    axe.utils.normalizeRunOptions({
      runOnly: {
        type: 'tags',
        values: ['wcag23aaa']
      }
    });
    assert.isEmpty(message);
  });

  it('logs an issue when a tag is unknown, together with a wcag level tag', () => {
    let message = '';
    axe.log = m => {
      message = m;
    };
    axe.utils.normalizeRunOptions({
      runOnly: {
        type: 'tags',
        values: ['wcag23aaa', 'unknwon-tag']
      }
    });
    assert.include(message, 'Could not find tags');
  });
});
