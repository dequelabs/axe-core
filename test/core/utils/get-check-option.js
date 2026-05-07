describe('axe.utils.getCheckOption', () => {
  it('should prefer options from rules', () => {
    assert.deepEqual(
      axe.utils.getCheckOption(
        {
          id: 'bananas',
          enabled: 'fail',
          options: 'fail'
        },
        'monkeys',
        {
          rules: {
            monkeys: {
              checks: {
                bananas: {
                  enabled: 'yes',
                  options: 'please'
                }
              }
            }
          },
          checks: {
            bananas: {
              enabled: 'nope',
              options: 'jerk'
            }
          }
        }
      ),
      {
        enabled: 'yes',
        options: 'please',
        absolutePaths: undefined
      }
    );
  });
  it('should fallback to global check options if not defined on the rule', () => {
    assert.deepEqual(
      axe.utils.getCheckOption(
        {
          id: 'bananas',
          enabled: 'fail',
          options: 'fail'
        },
        'monkeys',
        {
          rules: {
            monkeys: {
              checks: {
                bananas: {
                  enabled: 'yes'
                }
              }
            }
          },
          checks: {
            bananas: {
              enabled: 'nope',
              options: 'please'
            }
          }
        }
      ),
      {
        enabled: 'yes',
        options: 'please',
        absolutePaths: undefined
      }
    );
  });

  it('should prefer fallback to global check options if not defined on the rule', () => {
    assert.deepEqual(
      axe.utils.getCheckOption(
        {
          id: 'bananas',
          enabled: 'fail',
          options: 'fail'
        },
        'monkeys',
        {
          checks: {
            bananas: {
              enabled: 'yes',
              options: 'please'
            }
          }
        }
      ),
      {
        enabled: 'yes',
        options: 'please',
        absolutePaths: undefined
      }
    );
  });

  it('should otherwise use the check', () => {
    assert.deepEqual(
      axe.utils.getCheckOption(
        {
          id: 'bananas',
          enabled: 'yes',
          options: 'please'
        },
        'monkeys',
        {}
      ),
      {
        enabled: 'yes',
        options: 'please',
        absolutePaths: undefined
      }
    );
  });

  it('passes absolutePaths option along', () => {
    assert.deepEqual(
      axe.utils.getCheckOption(
        {
          id: 'bananas',
          enabled: 'on',
          options: 'many'
        },
        'monkeys',
        {
          absolutePaths: 'yep'
        }
      ),
      {
        enabled: 'on',
        options: 'many',
        absolutePaths: 'yep'
      }
    );
  });
});
