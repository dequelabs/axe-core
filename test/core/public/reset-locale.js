describe('axe.resetLocale', () => {
  beforeEach(() => {
    axe._audit = null;
  });

  it('should throw if no audit is configured', () => {
    assert.throws(
      () => {
        axe.resetLocale();
      },
      Error,
      /^No audit configured/
    );
  });

  it('should noop when no locale has been applied', () => {
    axe._load({
      data: {
        checks: {
          banana: {
            impact: 'serious',
            messages: {
              pass: 'yay',
              fail: 'boo',
              incomplete: 'donno'
            }
          }
        }
      },
      checks: [
        {
          id: 'banana',
          evaluate: () => {}
        }
      ]
    });

    assert.doesNotThrow(() => {
      axe.resetLocale();
    });

    const banana = axe._audit.data.checks.banana;
    assert.equal(banana.messages.pass, 'yay');
    assert.equal(banana.messages.fail, 'boo');
    assert.equal(banana.messages.incomplete, 'donno');
  });

  describe('when a custom locale was provided', () => {
    beforeEach(() => {
      axe._load({
        data: {
          checks: {
            banana: {
              impact: 'serious',
              messages: {
                pass: 'yay',
                fail: 'boo',
                incomplete: 'donno'
              }
            }
          }
        },
        checks: [
          {
            id: 'banana',
            evaluate: () => {}
          }
        ]
      });
    });

    it('should restore the original locale', () => {
      axe.configure({
        locale: {
          checks: {
            banana: {
              pass: 'wonderful',
              fail: 'horrible job',
              incomplete: 'donno'
            }
          }
        }
      });

      axe.resetLocale();

      const banana = axe._audit.data.checks.banana;
      assert.equal(banana.impact, 'serious');
      assert.equal(banana.messages.pass, 'yay');
      assert.equal(banana.messages.fail, 'boo');
      assert.equal(banana.messages.incomplete, 'donno');
    });

    it('should restore the original lang', () => {
      axe.configure({
        locale: {
          lang: 'ja'
        }
      });
      assert.equal(axe._audit.lang, 'ja');

      axe.resetLocale();

      assert.equal(axe._audit.lang, 'en');
    });

    it('should be safe to call repeatedly', () => {
      axe.configure({
        locale: {
          checks: {
            banana: {
              pass: 'wonderful',
              fail: 'horrible job',
              incomplete: 'donno'
            }
          }
        }
      });

      axe.resetLocale();
      axe.resetLocale();

      const banana = axe._audit.data.checks.banana;
      assert.equal(banana.messages.pass, 'yay');
      assert.equal(banana.messages.fail, 'boo');
    });

    it('should not affect other configuration', () => {
      axe.configure({
        rules: [
          {
            id: 'banana-rule',
            selector: 'pass',
            metadata: {
              description: 'banana check',
              help: 'check the banana'
            },
            any: ['banana']
          }
        ],
        locale: {
          checks: {
            banana: {
              pass: 'wonderful',
              fail: 'horrible job',
              incomplete: 'donno'
            }
          }
        }
      });

      const ruleCountBefore = axe._audit.rules.length;

      axe.resetLocale();

      assert.equal(axe._audit.rules.length, ruleCountBefore);
      assert.isDefined(
        axe._audit.rules.find(rule => rule.id === 'banana-rule')
      );
    });
  });
});
