describe('axe.configure', () => {
  // var Rule = axe._thisWillBeDeletedDoNotUse.base.Rule;
  // var Check = axe._thisWillBeDeletedDoNotUse.base.Check;
  const fixture = document.getElementById('fixture');
  const axeVersion = axe.version;
  const ver = axe.version.substring(0, axe.version.lastIndexOf('.'));

  afterEach(() => {
    fixture.innerHTML = '';
    axe.version = axeVersion;
  });

  beforeEach(() => {
    axe._audit = null;
  });

  it('should throw if audit is not configured', () => {
    assert.throws(
      () => {
        axe.configure({});
      },
      Error,
      /^No audit configured/
    );
  });

  it("should override an audit's reporter - string", () => {
    axe._load({});
    assert.isNull(axe._audit.reporter);

    axe.configure({ reporter: 'v1' });
    assert.equal(axe._audit.reporter, 'v1');
  });

  it('should not allow setting to an un-registered reporter', () => {
    axe._load({ reporter: 'v1' });
    axe.configure({ reporter: 'no-exist-evar-plz' });
    assert.equal(axe._audit.reporter, 'v1');
  });

  it('should allow for addition of rules', () => {
    axe._load({});
    axe.configure({
      rules: [
        {
          id: 'bob',
          metadata: {
            joe: 'joe'
          }
        }
      ]
    });

    assert.lengthOf(axe._audit.rules, 1);
    // TODO: this does not work yet thanks to webpack
    // assert.instanceOf(axe._audit.rules[0], Rule);
    assert.equal(axe._audit.rules[0].id, 'bob');
    assert.deepEqual(axe._audit.data.rules.bob.joe, 'joe');
  });

  it('should throw error if rules property is invalid', () => {
    assert.throws(() => {
      (axe.configure({ rules: 'hello' }),
        TypeError,
        /^Rules property must be an array/);
    });
  });

  it('should throw error if rule is invalid', () => {
    assert.throws(() => {
      (axe.configure({ rules: ['hello'] }),
        TypeError,
        /Configured rule "hello" is invalid/);
    });
  });

  it('should throw error if rule does not have an id', () => {
    assert.throws(() => {
      (axe.configure({ rules: [{ foo: 'bar' }] }),
        TypeError,
        /Configured rule "{foo:\"bar\"}" is invalid/);
    });
  });

  it('should call setBranding when passed options', () => {
    axe._load({});
    axe.configure({
      rules: [
        {
          id: 'bob',
          selector: 'pass'
        }
      ],
      branding: {}
    });
    assert.lengthOf(axe._audit.rules, 1);
    assert.equal(
      axe._audit.data.rules.bob.helpUrl,
      `https://dequeuniversity.com/rules/axe/${ver}/bob?application=axeAPI`
    );
    axe.configure({
      branding: {
        application: 'thing',
        brand: 'thung'
      }
    });
    assert.equal(
      axe._audit.data.rules.bob.helpUrl,
      `https://dequeuniversity.com/rules/thung/${ver}/bob?application=thing`
    );
  });

  it('sets branding on newly configured rules', () => {
    axe._load({});
    axe.configure({
      branding: {
        application: 'thing',
        brand: 'thung'
      }
    });
    axe.configure({
      rules: [
        {
          id: 'bob',
          selector: 'pass'
        }
      ]
    });

    assert.equal(
      axe._audit.data.rules.bob.helpUrl,
      `https://dequeuniversity.com/rules/thung/${ver}/bob?application=thing`
    );
  });

  it('should allow for overwriting of rules', () => {
    axe._load({
      data: {
        rules: {
          bob: 'not-joe'
        }
      },
      rules: {
        id: 'bob',
        selector: 'fail'
      }
    });
    axe.configure({
      rules: [
        {
          id: 'bob',
          selector: 'pass',
          metadata: {
            joe: 'joe'
          }
        }
      ]
    });

    assert.lengthOf(axe._audit.rules, 1);
    // assert.instanceOf(axe._audit.rules[0], Rule);
    assert.equal(axe._audit.rules[0].id, 'bob');
    assert.equal(axe._audit.rules[0].selector, 'pass');
    assert.equal(axe._audit.data.rules.bob.joe, 'joe');
  });

  it('should allow for the addition of checks', () => {
    axe._load({});
    axe.configure({
      checks: [
        {
          id: 'bob',
          options: { value: true },
          metadata: {
            joe: 'joe'
          }
        }
      ]
    });

    // assert.instanceOf(axe._audit.checks.bob, Check);
    assert.equal(axe._audit.checks.bob.id, 'bob');
    assert.isTrue(axe._audit.checks.bob.options.value);
    assert.equal(axe._audit.data.checks.bob.joe, 'joe');
  });

  it('should throw error if checks property is invalid', () => {
    assert.throws(() => {
      (axe.configure({ checks: 'hello' }),
        TypeError,
        /^Checks property must be an array/);
    });
  });

  it('should throw error if check is invalid', () => {
    assert.throws(() => {
      (axe.configure({ checks: ['hello'] }),
        TypeError,
        /Configured check "hello" is invalid/);
    });
  });

  it('should throw error if check does not have an id', () => {
    assert.throws(() => {
      (axe.configure({ checks: [{ foo: 'bar' }] }),
        TypeError,
        /Configured check "{foo:\"bar\"}" is invalid/);
    });
  });

  it('should allow for the overwriting of checks', () => {
    axe._load({
      data: {
        checks: {
          bob: 'not-joe'
        }
      },
      checks: [
        {
          id: 'bob',
          options: { value: false }
        }
      ]
    });
    axe.configure({
      checks: [
        {
          id: 'bob',
          options: { value: true },
          metadata: {
            joe: 'joe'
          }
        }
      ]
    });

    // assert.instanceOf(axe._audit.checks.bob, Check);
    assert.equal(axe._audit.checks.bob.id, 'bob');
    assert.isTrue(axe._audit.checks.bob.options.value);
    assert.equal(axe._audit.data.checks.bob.joe, 'joe');
  });

  it('should create an execution context for check messages', () => {
    axe._load({});
    axe.configure({
      checks: [
        {
          id: 'bob',
          metadata: {
            messages: {
              pass: "function () { return 'Bob' + ' John';}",
              fail: 'Bob Pete'
            }
          }
        }
      ]
    });

    assert.isFunction(axe._audit.data.checks.bob.messages.pass);
    assert.isString(axe._audit.data.checks.bob.messages.fail);
    assert.equal(axe._audit.data.checks.bob.messages.pass(), 'Bob John');
    assert.equal(axe._audit.data.checks.bob.messages.fail, 'Bob Pete');
  });

  it('overrides the default value of audit.tagExclude', () => {
    axe._load({});
    assert.deepEqual(axe._audit.tagExclude, ['experimental', 'deprecated']);

    axe.configure({
      tagExclude: ['ninjas']
    });
    assert.deepEqual(axe._audit.tagExclude, ['ninjas']);
  });

  it('disables all untouched rules with disableOtherRules', () => {
    axe._load({
      rules: [{ id: 'captain-america' }, { id: 'thor' }, { id: 'spider-man' }]
    });
    axe.configure({
      disableOtherRules: true,
      rules: [{ id: 'captain-america' }, { id: 'black-panther' }]
    });

    assert.lengthOf(axe._audit.rules, 4);
    assert.equal(axe._audit.rules[0].id, 'captain-america');
    assert.equal(axe._audit.rules[0].enabled, true);
    assert.equal(axe._audit.rules[1].id, 'thor');
    assert.equal(axe._audit.rules[1].enabled, false);
    assert.equal(axe._audit.rules[2].id, 'spider-man');
    assert.equal(axe._audit.rules[2].enabled, false);
    assert.equal(axe._audit.rules[3].id, 'black-panther');
    assert.equal(axe._audit.rules[3].enabled, true);
  });

  it("should allow overriding an audit's noHtml", () => {
    axe._load({});
    assert.isFalse(axe._audit.noHtml);

    axe.configure({ noHtml: true });
    assert.isTrue(axe._audit.noHtml);
  });

  it("should allow overriding an audit's allowedOrigins", () => {
    axe._load({});
    assert.notDeepEqual(axe._audit.allowedOrigins, ['foo']);

    axe.configure({ allowedOrigins: ['foo'] });
    assert.deepEqual(axe._audit.allowedOrigins, ['foo']);
  });

  it('should throw error if allowedOrigins is not an array', () => {
    axe._load({});
    assert.throws(() => {
      axe.configure({ allowedOrigins: 'foo' });
    });
  });

  it("should throw error if the origin is '*'", () => {
    axe._load({});
    assert.throws(() => {
      axe.configure({ allowedOrigins: ['foo', '*'] });
    });
  });

  describe('given a locale object', () => {
    beforeEach(() => {
      axe._load({});

      axe.configure({
        rules: [
          {
            id: 'greeting',
            selector: 'div',
            excludeHidden: false,
            tags: ['foo', 'bar'],
            metadata: {
              description: 'This is a rule that rules',
              help: 'ABCDEFGHIKLMNOPQRSTVXYZ'
            }
          }
        ],
        checks: [
          {
            id: 'banana',
            evaluate: () => {},
            metadata: {
              impact: 'srsly serious',
              messages: {
                pass: 'yay',
                fail: 'boo',
                incomplete: {
                  foo: 'a',
                  bar: 'b',
                  baz: 'c'
                }
              }
            }
          }
        ]
      });
    });

    it('should update check and rule metadata', () => {
      axe.configure({
        locale: {
          lang: 'lol',
          rules: {
            greeting: {
              description: 'hello',
              help: 'hi'
            }
          },
          checks: {
            banana: {
              pass: 'pizza',
              fail: 'icecream',
              incomplete: {
                foo: 'meat',
                bar: 'fruit',
                baz: 'vegetables'
              }
            }
          }
        }
      });

      const audit = axe._audit;
      const localeData = audit.data;

      assert.equal(localeData.rules.greeting.help, 'hi');
      assert.equal(localeData.rules.greeting.description, 'hello');
      assert.equal(localeData.checks.banana.messages.pass, 'pizza');
      assert.equal(localeData.checks.banana.messages.fail, 'icecream');
      assert.deepEqual(localeData.checks.banana.messages.incomplete, {
        foo: 'meat',
        bar: 'fruit',
        baz: 'vegetables'
      });
    });

    it('should merge locales (favoring "new")', () => {
      axe.configure({
        locale: {
          lang: 'lol',
          rules: { greeting: { description: 'hello' } },
          checks: {
            banana: {
              fail: 'icecream'
            }
          }
        }
      });

      const audit = axe._audit;
      const localeData = audit.data;

      assert.equal(localeData.rules.greeting.help, 'ABCDEFGHIKLMNOPQRSTVXYZ');
      assert.equal(localeData.rules.greeting.description, 'hello');
      assert.equal(localeData.checks.banana.messages.pass, 'yay');
      assert.equal(localeData.checks.banana.messages.fail, 'icecream');
      assert.deepEqual(localeData.checks.banana.messages.incomplete, {
        foo: 'a',
        bar: 'b',
        baz: 'c'
      });
    });

    it('sets the lang property', () => {
      axe.configure({
        locale: {
          lang: 'lol',
          rules: { greeting: { description: 'hello' } },
          checks: {
            banana: {
              fail: 'icecream'
            }
          }
        }
      });

      assert.equal(axe._audit.lang, 'lol');
    });

    it('should call doT.compile if a messages uses doT syntax', () => {
      axe.configure({
        locale: {
          lang: 'lol',
          rules: { greeting: { description: 'hello' } },
          checks: {
            banana: {
              fail: 'icecream {{=it.data.value}}'
            }
          }
        }
      });

      const audit = axe._audit;
      const localeData = audit.data;

      assert.isTrue(
        typeof localeData.checks.banana.messages.fail === 'function'
      );
    });

    it('should leave the messages as a string if it does not use doT syntax', () => {
      axe.configure({
        locale: {
          lang: 'lol',
          rules: { greeting: { description: 'hello' } },
          checks: {
            banana: {
              fail: 'icecream ${data.value}'
            }
          }
        }
      });

      const audit = axe._audit;
      const localeData = audit.data;

      assert.isTrue(typeof localeData.checks.banana.messages.fail === 'string');
    });

    it('should update failure messages', () => {
      axe._load({
        data: {
          failureSummaries: {
            any: {
              failureMessage: () => {
                return 'failed any';
              }
            },
            none: {
              failureMessage: () => {
                return 'failed none';
              }
            }
          },
          incompleteFallbackMessage: () => {
            return 'failed incomplete';
          }
        }
      });

      axe.configure({
        locale: {
          lang: 'lol',
          failureSummaries: {
            any: {
              failureMessage: 'foo'
            },
            none: {
              failureMessage: 'bar'
            }
          },
          incompleteFallbackMessage: 'baz'
        }
      });

      const audit = axe._audit;
      const localeData = audit.data;

      assert.equal(localeData.failureSummaries.any.failureMessage, 'foo');
      assert.equal(localeData.failureSummaries.none.failureMessage, 'bar');
      assert.equal(localeData.incompleteFallbackMessage, 'baz');
    });

    it('should merge failure messages', () => {
      axe._load({
        data: {
          failureSummaries: {
            any: {
              failureMessage: () => {
                return 'failed any';
              }
            },
            none: {
              failureMessage: () => {
                return 'failed none';
              }
            }
          },
          incompleteFallbackMessage: () => {
            return 'failed incomplete';
          }
        }
      });

      axe.configure({
        locale: {
          lang: 'lol',
          failureSummaries: {
            any: {
              failureMessage: 'foo'
            }
          }
        }
      });

      const audit = axe._audit;
      const localeData = audit.data;

      assert.equal(localeData.failureSummaries.any.failureMessage, 'foo');
      assert.equal(
        localeData.failureSummaries.none.failureMessage(),
        'failed none'
      );
      assert.equal(localeData.incompleteFallbackMessage(), 'failed incomplete');
    });

    it('should not strip newline characters from doT template', () => {
      axe._load({
        data: {
          failureSummaries: {
            any: {
              failureMessage: () => {
                return 'failed any';
              }
            }
          }
        }
      });

      axe.configure({
        locale: {
          lang: 'lol',
          failureSummaries: {
            any: {
              failureMessage:
                "Fix any of the following:{{~it:value}}\n  {{=value.split('\\n').join('\\n  ')}}{{~}}"
            }
          }
        }
      });

      const audit = axe._audit;
      const localeData = audit.data;

      assert.equal(
        localeData.failureSummaries.any.failureMessage(['1', '2', '3']),
        'Fix any of the following:\n  1\n  2\n  3'
      );
    });

    describe('only given checks', () => {
      it('should not error', () => {
        assert.doesNotThrow(() => {
          axe.configure({
            locale: {
              lang: 'lol',
              checks: {
                banana: {
                  fail: 'icecream',
                  incomplete: {
                    baz: 'vegetables'
                  }
                }
              }
            }
          });
        });
      });
    });

    describe('only given rules', () => {
      it('should not error', () => {
        assert.doesNotThrow(() => {
          axe.configure({
            locale: {
              rules: { greeting: { help: 'foo', description: 'bar' } }
            }
          });
        });
      });
    });

    describe('check incomplete messages', () => {
      beforeEach(() => {
        axe.configure({
          checks: [
            {
              id: 'panda',
              evaluate: () => {},
              metadata: {
                impact: 'yep',
                messages: {
                  pass: 'p',
                  fail: 'f',
                  incomplete: 'i'
                }
              }
            }
          ]
        });
      });

      it('should support strings', () => {
        axe.configure({
          locale: {
            checks: {
              panda: {
                incomplete: 'radio'
              }
            }
          }
        });

        assert.equal(axe._audit.data.checks.panda.messages.incomplete, 'radio');
      });

      it('should shallow-merge objects', () => {
        axe.configure({
          locale: {
            lang: 'lol',
            checks: {
              banana: {
                incomplete: {
                  baz: 'vegetables'
                }
              }
            }
          }
        });

        assert.deepEqual(axe._audit.data.checks.banana.messages.incomplete, {
          foo: 'a',
          bar: 'b',
          baz: 'vegetables'
        });
      });
    });

    // This test ensures we do not drop additional properties added to
    // checks. See https://github.com/dequelabs/axe-core/pull/1036/files#r207738673
    // for reasoning.
    it('should keep existing properties on check data', () => {
      axe.configure({
        checks: [
          {
            id: 'banana',
            metadata: {
              impact: 'potato',
              foo: 'bar',
              messages: {
                pass: 'pass',
                fail: 'fail',
                incomplete: 'incomplete'
              }
            }
          }
        ]
      });

      axe.configure({
        locale: {
          lang: 'lol',
          checks: {
            banana: {
              pass: 'yay banana'
            }
          }
        }
      });

      const banana = axe._audit.data.checks.banana;
      assert.equal(banana.impact, 'potato');
      assert.equal(banana.foo, 'bar');
      assert.equal(banana.messages.pass, 'yay banana');
    });

    it('should error when provided an unknown rule id', () => {
      assert.throws(() => {
        axe.configure({
          locale: {
            rules: { nope: { help: 'helpme' } }
          }
        });
      }, /unknown rule: "nope"/);
    });

    it('should error when provided an unknown check id', () => {
      assert.throws(() => {
        axe.configure({
          locale: {
            checks: { nope: { pass: 'helpme' } }
          }
        });
      }, /unknown check: "nope"/);
    });

    it('should error when provided an unknown failure summary', () => {
      assert.throws(() => {
        axe.configure({
          locale: {
            failureSummaries: {
              nope: { failureMessage: 'helpme' }
            }
          }
        });
      });
    });

    it('should set default locale', () => {
      assert.isNull(axe._audit._defaultLocale);
      axe.configure({
        locale: {
          lang: 'lol',
          checks: {
            banana: {
              pass: 'yay banana'
            }
          }
        }
      });
      assert.ok(axe._audit._defaultLocale);
    });

    describe('also given metadata', () => {
      it('should favor the locale', () => {
        axe.configure({
          locale: {
            lang: 'lol',
            rules: {
              greeting: {
                help: 'hi'
              }
            }
          },
          rules: [
            {
              id: 'greeting',
              metadata: {
                help: 'potato'
              }
            }
          ]
        });

        const audit = axe._audit;
        const localeData = audit.data;

        assert.equal(localeData.rules.greeting.help, 'hi');
      });
    });

    describe('after locale has been set', () => {
      describe('the provided messages', () => {
        it('should allow for doT templating', () => {
          axe.configure({
            locale: {
              lang: 'foo',
              rules: {
                greeting: {
                  help: 'foo: {{=it.data}}.'
                }
              }
            }
          });

          const greeting = axe._audit.data.rules.greeting;
          const value = greeting.help({
            data: 'bar'
          });
          assert.equal(value, 'foo: bar.');
        });
      });
    });
  });

  describe('given an axeVersion property', () => {
    beforeEach(() => {
      axe._load({});
      axe.version = '1.2.3';
    });

    it('should not throw if version matches axe.version', () => {
      assert.doesNotThrow(function fn() {
        axe.configure({
          axeVersion: '1.2.3'
        });

        axe.version = '1.2.3-canary.2664bae';
        axe.configure({
          axeVersion: '1.2.3-canary.2664bae'
        });
      });
    });

    it('should not throw if patch version is less than axe.version', () => {
      assert.doesNotThrow(function fn() {
        axe.configure({
          axeVersion: '1.2.0'
        });
      });
    });

    it('should not throw if minor version is less than axe.version', () => {
      assert.doesNotThrow(function fn() {
        axe.configure({
          axeVersion: '1.1.9'
        });
      });
    });

    it('should not throw if versions match and axe has a canary version', () => {
      axe.version = '1.2.3-canary.2664bae';
      assert.doesNotThrow(function fn() {
        axe.configure({
          axeVersion: '1.2.3'
        });
      });
    });

    it('should throw if invalid version', () => {
      assert.throws(function fn() {
        axe.configure({
          axeVersion: '2'
        });
      }, 'Invalid configured version 2');

      assert.throws(function fn() {
        axe.configure({
          axeVersion: '2..'
        });
      }, 'Invalid configured version 2..');
    });

    it('should throw if major version is different than axe.version', () => {
      assert.throws(function fn() {
        axe.configure(
          {
            axeVersion: '2.0.0'
          },
          /^Configured version/
        );
      });
      assert.throws(function fn() {
        axe.configure(
          {
            axeVersion: '0.1.2'
          },
          /^Configured version/
        );
      });
    });

    it('should throw if minor version is greater than axe.version', () => {
      assert.throws(function fn() {
        axe.configure(
          {
            axeVersion: '1.3.0'
          },
          /^Configured version/
        );
      });
    });

    it('should throw if patch version is greater than axe.version', () => {
      assert.throws(function fn() {
        axe.configure(
          {
            axeVersion: '1.2.9'
          },
          /^Configured version/
        );
      });
    });

    it('should throw if versions match and axeVersion has a canary version', () => {
      assert.throws(function fn() {
        axe.configure(
          {
            axeVersion: '1.2.3-canary.2664bae'
          },
          /^Configured version/
        );
      });
    });

    it('should throw if versions match and both have a canary version', () => {
      axe.version = '1.2.3-canary.2664bae';
      assert.throws(function fn() {
        axe.configure(
          {
            axeVersion: '1.2.3-canary.a5d727c'
          },
          /^Configured version/
        );
      });
    });

    it('should accept ver property as fallback', () => {
      assert.throws(function fn() {
        axe.configure(
          {
            ver: '1.3.0'
          },
          /^Configured version/
        );
      });
    });

    it('should accept axeVersion over ver property', () => {
      assert.throws(function fn() {
        axe.configure(
          {
            ver: '0.1.2',
            axeVersion: '1.3.0'
          },
          /^Configured version 1\.3\.0/
        );
      });
    });
  });

  describe('given a standards object', () => {
    beforeEach(() => {
      axe._load({});
    });

    describe('ariaAttrs', () => {
      it('should allow creating new attr', () => {
        axe.configure({
          standards: {
            ariaAttrs: {
              newAttr: {
                type: 'string'
              }
            }
          }
        });

        const ariaAttr = axe._audit.standards.ariaAttrs.newAttr;
        assert.equal(ariaAttr.type, 'string');
      });

      it('should override existing attr', () => {
        axe.configure({
          standards: {
            ariaAttrs: {
              newAttr: {
                type: 'string'
              }
            }
          }
        });

        axe.configure({
          standards: {
            ariaAttrs: {
              newAttr: {
                type: 'mntoken',
                values: ['foo', 'bar']
              }
            }
          }
        });

        const ariaAttr = axe._audit.standards.ariaAttrs.newAttr;
        assert.equal(ariaAttr.type, 'mntoken');
        assert.deepEqual(ariaAttr.values, ['foo', 'bar']);
      });

      it('should merge existing attr', () => {
        axe.configure({
          standards: {
            ariaAttrs: {
              newAttr: {
                type: 'mntoken',
                values: ['foo', 'bar']
              }
            }
          }
        });

        axe.configure({
          standards: {
            ariaAttrs: {
              newAttr: {
                type: 'mntokens'
              }
            }
          }
        });

        const ariaAttr = axe._audit.standards.ariaAttrs.newAttr;
        assert.equal(ariaAttr.type, 'mntokens');
        assert.deepEqual(ariaAttr.values, ['foo', 'bar']);
      });

      it('should override and not merge array', () => {
        axe.configure({
          standards: {
            ariaAttrs: {
              newAttr: {
                type: 'mntoken',
                values: ['foo', 'bar']
              }
            }
          }
        });

        axe.configure({
          standards: {
            ariaAttrs: {
              newAttr: {
                values: ['baz']
              }
            }
          }
        });

        const ariaAttr = axe._audit.standards.ariaAttrs.newAttr;
        assert.deepEqual(ariaAttr.values, ['baz']);
      });
    });
  });
});
