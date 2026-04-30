describe('axe.utils.aggregateNodeResults', () => {
  const FAIL = 'failed';
  const PASS = 'passed';
  const CANTTELL = 'cantTell';
  const INAPPLICABLE = 'inapplicable';

  // create an array of check results, padding input with defaults and
  // wrapping arrays where required
  function createTestResults() {
    const args = [].slice.call(arguments);
    return args.map(node => {
      ['any', 'all', 'none'].forEach(type => {
        if (typeof node[type] === 'undefined') {
          node[type] = [];
        } else if (Array.isArray(node[type])) {
          node[type] = node[type].map(val => {
            if (typeof val !== 'object') {
              return { result: val };
            } else {
              return val;
            }
          });
        } else {
          if (typeof node[type] !== 'object') {
            node[type] = { result: node[type] };
          }
          node[type] = [node[type]];
        }
      });
      return node;
    });
  }

  beforeEach(() => {
    axe._load({});
  });

  it('should be a function', () => {
    assert.isFunction(axe.utils.aggregateNodeResults);
  });

  it('Should be `inapplicable` when no results are given', () => {
    const ruleResult = axe.utils.aggregateNodeResults([]);
    assert.equal(ruleResult.result, INAPPLICABLE);
  });

  it('should assign FAIL to ruleResult over PASS', () => {
    const ruleResult = axe.utils.aggregateNodeResults(
      createTestResults({ all: false }, { all: true }, { all: true })
    );
    assert.equal(ruleResult.result, FAIL);
    assert.lengthOf(ruleResult.violations, 1);
    assert.lengthOf(ruleResult.passes, 2);
  });

  it('should assign FAIL to ruleResult over CANTTELL', () => {
    const ruleResult = axe.utils.aggregateNodeResults(
      createTestResults({ all: false }, { all: 0 }, { all: true })
    );
    assert.equal(ruleResult.result, FAIL);
    assert.lengthOf(ruleResult.violations, 1);
    assert.lengthOf(ruleResult.incomplete, 1);
    assert.lengthOf(ruleResult.passes, 1);
  });

  it('should assign PASS to ruleResult if there are only passing checks', () => {
    const ruleResult = axe.utils.aggregateNodeResults(
      createTestResults({ all: true }, { all: true }, { all: true })
    );
    assert.equal(ruleResult.result, PASS);
    assert.lengthOf(ruleResult.passes, 3);
    assert.lengthOf(ruleResult.violations, 0);
  });

  it('should assign FAIL if there are no passing anys checks', () => {
    const ruleResult = axe.utils.aggregateNodeResults(
      createTestResults({ any: false }, { any: false }, { any: false })
    );
    assert.equal(ruleResult.result, FAIL);
    assert.lengthOf(ruleResult.violations, 3);
    assert.lengthOf(ruleResult.passes, 0);
  });

  it('should assign CANTTELL over PASS', () => {
    const ruleResult = axe.utils.aggregateNodeResults(
      createTestResults({ all: true }, { all: 0 }, { all: 0 })
    );
    assert.equal(ruleResult.result, CANTTELL);
    assert.lengthOf(ruleResult.incomplete, 2);
    assert.lengthOf(ruleResult.passes, 1);
  });

  it('should provide impact on incomplete', () => {
    const ruleResult = axe.utils.aggregateNodeResults(
      createTestResults({
        none: { result: undefined, impact: 'serious' }
      })
    );
    assert.equal(ruleResult.impact, 'serious');
  });

  it('should raise the highest "raisedMetadata" on failing checks', () => {
    /*eslint indent:0 */
    const ruleResult = axe.utils.aggregateNodeResults(
      createTestResults(
        {
          none: { result: true, impact: 'moderate' },
          any: { result: true, impact: 'minor' },
          all: [
            { result: true, impact: 'critical' },
            { result: false, impact: 'serious' }
          ]
        },
        { none: { result: undefined, impact: 'critical' } },
        { none: { result: false, impact: 'critical' } }
      )
    );
    assert.equal(ruleResult.impact, 'serious');
    assert.equal(ruleResult.violations[0].impact, 'serious');
    assert.equal(ruleResult.incomplete[0].impact, 'critical');
    assert.isNull(ruleResult.passes[0].impact);
  });
});
