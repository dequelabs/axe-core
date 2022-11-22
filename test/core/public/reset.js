describe('axe.reset', function () {
  'use strict';

  // var Rule = axe._thisWillBeDeletedDoNotUse.base.Rule;
  var fixture = document.getElementById('fixture');
  afterEach(function () {
    fixture.innerHTML = '';
  });

  beforeEach(function () {
    axe._audit = null;
  });

  it('should throw if no audit is configured', function () {
    assert.throws(
      function () {
        axe.reset(
          function () {},
          function () {}
        );
      },
      Error,
      /^No audit configured/
    );
  });

  it('should restore the default configuration', function () {
    axe._load({
      data: {
        rules: {
          bob: {
            knows: 'not-joe'
          }
        }
      },
      rules: [
        {
          id: 'bob',
          selector: 'fail'
        }
      ],
      reporter: 'v2'
    });
    assert.lengthOf(axe._audit.rules, 1);
    // TODO: this does not work yet thanks to webpack
    // assert.instanceOf(axe._audit.rules[0], Rule);
    assert.equal(axe._audit.rules[0].id, 'bob');
    assert.equal(axe._audit.rules[0].selector, 'fail');
    assert.equal(axe._audit.reporter, 'v2');

    axe.configure({
      rules: [
        {
          id: 'bob',
          selector: 'pass',
          metadata: {
            knows: 'joe'
          }
        }
      ],
      reporter: 'raw'
    });
    assert.lengthOf(axe._audit.rules, 1);
    // assert.instanceOf(axe._audit.rules[0], Rule);
    assert.equal(axe._audit.rules[0].id, 'bob');
    assert.equal(axe._audit.rules[0].selector, 'pass');
    assert.equal(axe._audit.reporter, 'raw');
    assert.equal(axe._audit.data.rules.bob.knows, 'joe');

    axe.reset();

    assert.lengthOf(axe._audit.rules, 1);
    // assert.instanceOf(axe._audit.rules[0], Rule);
    assert.equal(axe._audit.rules[0].id, 'bob');
    assert.equal(axe._audit.rules[0].selector, 'fail');
    assert.equal(axe._audit.reporter, 'v2');
    assert.equal(axe._audit.data.rules.bob.knows, 'not-joe');
  });

  describe('when custom locale was provided', function () {
    beforeEach(function () {
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
            evaluate: function () {}
          }
        ]
      });
    });

    it('should restore the original locale', function () {
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

      axe.reset();

      var banana = axe._audit.data.checks.banana;
      assert.equal(banana.impact, 'serious');
      assert.equal(banana.messages.pass, 'yay');
      assert.equal(banana.messages.fail, 'boo');
      assert.equal(banana.messages.incomplete, 'donno');
    });
  });

  it('should restore standards object', function () {
    axe._load({});

    axe.configure({
      standards: {
        ariaAttrs: {
          'aria-live': {
            type: 'string'
          }
        }
      }
    });

    axe.reset();

    var ariaLiveAttr = axe._audit.standards.ariaAttrs['aria-live'];
    assert.equal(ariaLiveAttr.type, 'nmtoken');
  });
});
