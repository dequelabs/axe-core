describe('axe.utils.aggregateChecks', () => {
  const FAIL = axe.constants.FAIL;
  const PASS = axe.constants.PASS;
  const CANTTELL = axe.constants.CANTTELL;
  const NA = axe.constants.NA;

  // create an object of check results, padding input with defaults and
  // wrapping arrays where required
  function createTestCheckResults(node) {
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
  }

  beforeEach(() => {
    axe._load({});
  });

  it('should be a function', () => {
    assert.isFunction(axe.utils.aggregateChecks);
  });

  it('Should be `inapplicable` when no results are given', () => {
    const ruleResult = axe.utils.aggregateChecks(createTestCheckResults({}));

    assert.equal(ruleResult.result, NA);
  });

  it('sets result  to cantTell when result is not a boolean', () => {
    const values = [undefined, null, 0, 'true', {}, NaN];
    values.forEach(value => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          any: [{ result: value }]
        })
      );
      assert.equal(checkResult.result, CANTTELL);
    });
  });

  it('returns impact for fail and canttell', () => {
    const failCheck = axe.utils.aggregateChecks(
      createTestCheckResults({
        any: [{ result: false, impact: 'serious' }]
      })
    );
    const canttellCheck = axe.utils.aggregateChecks(
      createTestCheckResults({
        any: [{ result: undefined, impact: 'moderate' }]
      })
    );

    assert.equal(failCheck.impact, 'serious');
    assert.equal(canttellCheck.impact, 'moderate');
  });

  it('sets impact to null for pass', () => {
    const passCheck = axe.utils.aggregateChecks(
      createTestCheckResults({
        any: [{ result: true, impact: 'serious' }]
      })
    );
    assert.isNull(passCheck.impact);
  });

  describe('none', () => {
    it('gives result FAIL when any is true', () => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          none: [false, true, undefined]
        })
      );

      assert.equal(checkResult.result, FAIL);
    });

    it('gives result CANTTELL when none is true and any is not a boolean', () => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          none: [undefined, false]
        })
      );
      assert.equal(checkResult.result, CANTTELL);
    });

    it('gives result PASS when all are FALSE', () => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          none: [false, false]
        })
      );
      assert.equal(checkResult.result, PASS);
    });
  });

  describe('any', () => {
    it('gives result PASS when any is true', () => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          any: [undefined, true]
        })
      );
      assert.equal(checkResult.result, PASS);
    });

    it('gives result CANTTELL when none is true and any is not a bool', () => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          any: [undefined, false]
        })
      );
      assert.equal(checkResult.result, CANTTELL);
    });

    it('gives result FAIL when all are false', () => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          any: [false, false]
        })
      );
      assert.equal(checkResult.result, FAIL);
    });
  });

  describe('all', () => {
    it('gives result FAIL when any is false', () => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          all: [false, true, undefined]
        })
      );

      assert.equal(checkResult.result, FAIL);
    });

    it('gives result CANTTELL when none is false and any is not a boolean', () => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          all: [undefined, true]
        })
      );
      assert.equal(checkResult.result, CANTTELL);
    });

    it('gives result PASS when all are true', () => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          all: [true, true]
        })
      );
      assert.equal(checkResult.result, PASS);
    });
  });

  describe('combined', () => {
    it('gives result PASS when all are PASS', () => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          any: true,
          all: true,
          none: false
        })
      );

      assert.equal(checkResult.result, PASS);
    });

    it('gives result CANTTELL when none is FAIL and any is CANTTELL', () => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          any: 0,
          all: true,
          none: false
        })
      );
      assert.equal(checkResult.result, CANTTELL);
    });

    it('gives result FAIL when any are FAIL', () => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          any: 0,
          all: false,
          none: false
        })
      );
      assert.equal(checkResult.result, FAIL);
    });

    it('ignores fail checks on any, if at least one passed', () => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          any: [false, undefined, true], // cantTell
          none: [true, false] // fail
        })
      );

      assert.lengthOf(checkResult.any, 0);
      assert.lengthOf(checkResult.none, 1);
    });

    it('includes cantTell checks from any if there are no fails', () => {
      const checkResult = axe.utils.aggregateChecks(
        createTestCheckResults({
          any: [undefined, undefined, false], // cantTell
          none: [undefined, false] // cantTell
        })
      );

      assert.lengthOf(checkResult.any, 2);
      assert.lengthOf(checkResult.none, 1);
    });
  });
});
