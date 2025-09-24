describe('Audit', () => {
  const Audit = axe._thisWillBeDeletedDoNotUse.base.Audit;
  const Rule = axe._thisWillBeDeletedDoNotUse.base.Rule;
  const ver = axe.version.substring(0, axe.version.lastIndexOf('.'));
  const { fixtureSetup, captureError } = axe.testUtils;
  let audit;
  const isNotCalled = err => {
    throw err || new Error('Reject should not be called');
  };
  const noop = () => {};

  const assertEqualRuleError = (actual, expect) => {
    assert.include(actual.message, expect.message);
    assert.equal(actual.stack, expect.stack);
    assert.equal(actual.name, expect.name);
  };

  const assertErrorResults = (result, error, selector) => {
    assert.equal(result.result, 'cantTell');
    assertEqualRuleError(result.error, error);

    assert.lengthOf(result.nodes, 1);
    const node1 = result.nodes[0];
    assert.isEmpty(node1.any);
    assert.isEmpty(node1.all);
    assert.include(node1.node.selector, selector);

    assert.lengthOf(node1.none, 1);
    const none = node1.none[0];
    assert.equal(none.id, 'error-occurred');
    assert.equal(none.result, undefined);
    assert.isDefined(none.data);
    assertEqualRuleError(none.data, error);
    assert.lengthOf(none.relatedNodes, 0);
  };

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

  const fixture = document.getElementById('fixture');
  let origAuditRun;
  beforeEach(() => {
    audit = new Audit();
    mockRules.forEach(function (r) {
      audit.addRule(r);
    });
    mockChecks.forEach(function (c) {
      audit.addCheck(c);
    });
    origAuditRun = audit.run;
  });

  afterEach(() => {
    axe.teardown();
    audit.run = origAuditRun;
  });

  it('should be a function', () => {
    assert.isFunction(Audit);
  });

  describe('defaults', () => {
    it('should set noHtml', () => {
      audit = new Audit();
      assert.isFalse(audit.noHtml);
    });

    it('should set allowedOrigins', () => {
      audit = new Audit();
      assert.deepEqual(audit.allowedOrigins, [window.location.origin]);
    });
  });

  describe('Audit#_constructHelpUrls', () => {
    it('should create default help URLS', () => {
      audit = new Audit();
      audit.addRule({
        id: 'target',
        matches: 'function () {return "hello";}',
        selector: 'bob'
      });
      assert.lengthOf(audit.rules, 1);
      assert.equal(audit.data.rules.target, undefined);
      audit._constructHelpUrls();
      assert.deepEqual(audit.data.rules.target, {
        helpUrl:
          'https://dequeuniversity.com/rules/axe/' +
          ver +
          '/target?application=axeAPI'
      });
    });
    it('should use changed branding', () => {
      audit = new Audit();
      audit.addRule({
        id: 'target',
        matches: 'function () {return "hello";}',
        selector: 'bob'
      });
      assert.lengthOf(audit.rules, 1);
      assert.equal(audit.data.rules.target, undefined);
      audit.brand = 'thing';
      audit._constructHelpUrls();
      assert.deepEqual(audit.data.rules.target, {
        helpUrl:
          'https://dequeuniversity.com/rules/thing/' +
          ver +
          '/target?application=axeAPI'
      });
    });
    it('should use changed application', () => {
      audit = new Audit();
      audit.addRule({
        id: 'target',
        matches: 'function () {return "hello";}',
        selector: 'bob'
      });
      assert.lengthOf(audit.rules, 1);
      assert.equal(audit.data.rules.target, undefined);
      audit.application = 'thing';
      audit._constructHelpUrls();
      assert.deepEqual(audit.data.rules.target, {
        helpUrl:
          'https://dequeuniversity.com/rules/axe/' +
          ver +
          '/target?application=thing'
      });
    });

    it('does not override helpUrls of different products', () => {
      audit = new Audit();
      audit.addRule({
        id: 'target1',
        matches: 'function () {return "hello";}',
        selector: 'bob',
        metadata: {
          helpUrl:
            'https://dequeuniversity.com/rules/myproject/' +
            ver +
            '/target1?application=axeAPI'
        }
      });
      audit.addRule({
        id: 'target2',
        matches: 'function () {return "hello";}',
        selector: 'bob'
      });

      assert.equal(
        audit.data.rules.target1.helpUrl,
        'https://dequeuniversity.com/rules/myproject/' +
          ver +
          '/target1?application=axeAPI'
      );
      assert.isUndefined(audit.data.rules.target2);

      assert.lengthOf(audit.rules, 2);
      audit.brand = 'thing';
      audit._constructHelpUrls();

      assert.equal(
        audit.data.rules.target1.helpUrl,
        'https://dequeuniversity.com/rules/myproject/' +
          ver +
          '/target1?application=axeAPI'
      );
      assert.equal(
        audit.data.rules.target2.helpUrl,
        'https://dequeuniversity.com/rules/thing/' +
          ver +
          '/target2?application=axeAPI'
      );
    });
    it('understands prerelease type version numbers', () => {
      const tempVersion = axe.version;
      audit = new Audit();
      audit.addRule({
        id: 'target',
        matches: 'function () {return "hello";}',
        selector: 'bob'
      });

      axe.version = '3.2.1-alpha.0';
      audit._constructHelpUrls();

      axe.version = tempVersion;
      assert.equal(
        audit.data.rules.target.helpUrl,
        'https://dequeuniversity.com/rules/axe/3.2/target?application=axeAPI'
      );
    });

    it('matches major release versions', () => {
      const tempVersion = axe.version;
      audit = new Audit();
      audit.addRule({
        id: 'target',
        matches: 'function () {return "hello";}',
        selector: 'bob'
      });

      axe.version = '1.0.0';
      audit._constructHelpUrls();

      axe.version = tempVersion;
      assert.equal(
        audit.data.rules.target.helpUrl,
        'https://dequeuniversity.com/rules/axe/1.0/target?application=axeAPI'
      );
    });
    it('sets the lang query if locale has been set', () => {
      audit = new Audit();
      audit.addRule({
        id: 'target',
        matches: 'function () {return "hello";}',
        selector: 'bob'
      });
      audit.applyLocale({
        lang: 'de'
      });
      assert.lengthOf(audit.rules, 1);
      assert.equal(audit.data.rules.target, undefined);
      audit._constructHelpUrls();
      assert.deepEqual(audit.data.rules.target, {
        helpUrl:
          'https://dequeuniversity.com/rules/axe/' +
          ver +
          '/target?application=axeAPI&lang=de'
      });
    });
  });

  describe('Audit#setBranding', () => {
    it('should change the brand', () => {
      audit = new Audit();
      assert.equal(audit.brand, 'axe');
      assert.equal(audit.application, 'axeAPI');
      audit.setBranding({
        brand: 'thing'
      });
      assert.equal(audit.brand, 'thing');
      assert.equal(audit.application, 'axeAPI');
    });
    it('should change the application', () => {
      audit = new Audit();
      assert.equal(audit.brand, 'axe');
      assert.equal(audit.application, 'axeAPI');
      audit.setBranding({
        application: 'thing'
      });
      assert.equal(audit.brand, 'axe');
      assert.equal(audit.application, 'thing');
    });
    it('should change the application when passed a string', () => {
      audit = new Audit();
      assert.equal(audit.brand, 'axe');
      assert.equal(audit.application, 'axeAPI');
      audit.setBranding('thing');
      assert.equal(audit.brand, 'axe');
      assert.equal(audit.application, 'thing');
    });
    it('should call _constructHelpUrls', () => {
      audit = new Audit();
      audit.addRule({
        id: 'target',
        matches: 'function () {return "hello";}',
        selector: 'bob'
      });
      assert.lengthOf(audit.rules, 1);
      assert.equal(audit.data.rules.target, undefined);
      audit.setBranding({
        application: 'thing'
      });
      assert.deepEqual(audit.data.rules.target, {
        helpUrl:
          'https://dequeuniversity.com/rules/axe/' +
          ver +
          '/target?application=thing'
      });
    });
    it('should call _constructHelpUrls even when nothing changed', () => {
      audit = new Audit();
      audit.addRule({
        id: 'target',
        matches: 'function () {return "hello";}',
        selector: 'bob'
      });
      assert.lengthOf(audit.rules, 1);
      assert.equal(audit.data.rules.target, undefined);
      audit.setBranding(undefined);
      assert.deepEqual(audit.data.rules.target, {
        helpUrl:
          'https://dequeuniversity.com/rules/axe/' +
          ver +
          '/target?application=axeAPI'
      });
    });
    it('should not replace custom set branding', () => {
      audit = new Audit();
      audit.addRule({
        id: 'target',
        matches: 'function () {return "hello";}',
        selector: 'bob',
        metadata: {
          helpUrl:
            'https://dequeuniversity.com/rules/customer-x/' +
            ver +
            '/target?application=axeAPI'
        }
      });
      audit.setBranding({
        application: 'thing',
        brand: 'other'
      });
      assert.equal(
        audit.data.rules.target.helpUrl,
        'https://dequeuniversity.com/rules/customer-x/' +
          ver +
          '/target?application=axeAPI'
      );
    });
  });

  describe('Audit#addRule', () => {
    it('should override existing rule', () => {
      audit = new Audit();
      audit.addRule({
        id: 'target',
        matches: 'function () {return "hello";}',
        selector: 'bob'
      });
      assert.lengthOf(audit.rules, 1);
      assert.equal(audit.rules[0].selector, 'bob');
      assert.equal(audit.rules[0].matches(), 'hello');

      audit.addRule({
        id: 'target',
        selector: 'fred'
      });

      assert.lengthOf(audit.rules, 1);
      assert.equal(audit.rules[0].selector, 'fred');
      assert.equal(audit.rules[0].matches(), 'hello');
    });
    it('should otherwise push new rule', () => {
      audit = new Audit();
      audit.addRule({
        id: 'target',
        selector: 'bob'
      });
      assert.lengthOf(audit.rules, 1);
      assert.equal(audit.rules[0].id, 'target');
      assert.equal(audit.rules[0].selector, 'bob');

      audit.addRule({
        id: 'target2',
        selector: 'fred'
      });

      assert.lengthOf(audit.rules, 2);
      assert.equal(audit.rules[1].id, 'target2');
      assert.equal(audit.rules[1].selector, 'fred');
    });
  });

  describe('Audit#resetRulesAndChecks', () => {
    it('should override newly created check', () => {
      audit = new Audit();
      assert.equal(audit.checks.target, undefined);
      audit.addCheck({
        id: 'target',
        options: { value: 'jane' }
      });
      assert.ok(audit.checks.target);
      assert.deepEqual(audit.checks.target.options, { value: 'jane' });
      audit.resetRulesAndChecks();
      assert.equal(audit.checks.target, undefined);
    });
    it('should reset locale', () => {
      audit = new Audit();
      assert.equal(audit.lang, 'en');
      audit.applyLocale({
        lang: 'de'
      });
      assert.equal(audit.lang, 'de');
      audit.resetRulesAndChecks();
      assert.equal(audit.lang, 'en');
    });
    it('should reset brand', () => {
      audit = new Audit();
      assert.equal(audit.brand, 'axe');
      audit.setBranding({
        brand: 'test'
      });
      assert.equal(audit.brand, 'test');
      audit.resetRulesAndChecks();
      assert.equal(audit.brand, 'axe');
    });
    it('should reset brand application', () => {
      audit = new Audit();
      assert.equal(audit.application, 'axeAPI');
      audit.setBranding({
        application: 'test'
      });
      assert.equal(audit.application, 'test');
      audit.resetRulesAndChecks();
      assert.equal(audit.application, 'axeAPI');
    });
    it('should reset brand tagExlcude', () => {
      axe._load({});
      assert.deepEqual(axe._audit.tagExclude, ['experimental', 'deprecated']);
      axe.configure({
        tagExclude: ['ninjas']
      });
      axe._audit.resetRulesAndChecks();
      assert.deepEqual(axe._audit.tagExclude, ['experimental', 'deprecated']);
    });

    it('should reset noHtml', () => {
      audit = new Audit();
      audit.noHtml = true;
      audit.resetRulesAndChecks();
      assert.isFalse(audit.noHtml);
    });

    it('should reset allowedOrigins', () => {
      audit = new Audit();
      audit.allowedOrigins = ['hello'];
      audit.resetRulesAndChecks();
      assert.deepEqual(audit.allowedOrigins, [window.location.origin]);
    });
  });

  describe('Audit#addCheck', () => {
    it('should create a new check', () => {
      audit = new Audit();
      assert.equal(audit.checks.target, undefined);
      audit.addCheck({
        id: 'target',
        options: { value: 'jane' }
      });
      assert.ok(audit.checks.target);
      assert.deepEqual(audit.checks.target.options, { value: 'jane' });
    });
    it('should configure the metadata, if passed', () => {
      audit = new Audit();
      assert.equal(audit.checks.target, undefined);
      audit.addCheck({
        id: 'target',
        metadata: { guy: 'bob' }
      });
      assert.ok(audit.checks.target);
      assert.equal(audit.data.checks.target.guy, 'bob');
    });
    it('should reconfigure existing check', () => {
      audit = new Audit();
      const myTest = () => {};
      audit.addCheck({
        id: 'target',
        evaluate: myTest,
        options: { value: 'jane' }
      });

      assert.deepEqual(audit.checks.target.options, { value: 'jane' });

      audit.addCheck({
        id: 'target',
        options: { value: 'fred' }
      });

      assert.equal(audit.checks.target.evaluate, myTest);
      assert.deepEqual(audit.checks.target.options, { value: 'fred' });
    });
    it('should not turn messages into a function', () => {
      audit = new Audit();
      const spec = {
        id: 'target',
        evaluate: 'function () { return "blah";}',
        metadata: {
          messages: {
            fail: 'it failed'
          }
        }
      };
      audit.addCheck(spec);

      assert.equal(typeof audit.checks.target.evaluate, 'function');
      assert.equal(typeof audit.data.checks.target.messages.fail, 'string');
      assert.equal(audit.data.checks.target.messages.fail, 'it failed');
    });

    it('should turn function strings into a function', () => {
      audit = new Audit();
      const spec = {
        id: 'target',
        evaluate: 'function () { return "blah";}',
        metadata: {
          messages: {
            fail: 'function () {return "it failed";}'
          }
        }
      };
      audit.addCheck(spec);

      assert.equal(typeof audit.checks.target.evaluate, 'function');
      assert.equal(typeof audit.data.checks.target.messages.fail, 'function');
      assert.equal(audit.data.checks.target.messages.fail(), 'it failed');
    });
  });

  describe('Audit#setAllowedOrigins', () => {
    it('should set allowedOrigins', () => {
      audit = new Audit();
      audit.setAllowedOrigins([
        'https://deque.com',
        'https://dequeuniversity.com'
      ]);
      assert.deepEqual(audit.allowedOrigins, [
        'https://deque.com',
        'https://dequeuniversity.com'
      ]);
    });

    it('should normalize <same_origin>', () => {
      audit = new Audit();
      audit.setAllowedOrigins(['<same_origin>', 'https://deque.com']);
      assert.deepEqual(audit.allowedOrigins, [
        window.location.origin,
        'https://deque.com'
      ]);
    });

    it('should normalize <unsafe_all_origins>', () => {
      audit = new Audit();
      audit.setAllowedOrigins([
        'https://deque.com',
        '<unsafe_all_origins>',
        '<same_origin>'
      ]);
      assert.deepEqual(audit.allowedOrigins, ['*']);
    });
  });

  describe('Audit#run', () => {
    it('should run all the rules', done => {
      fixtureSetup(
        '<input aria-label="monkeys" type="text">' +
          '<div id="monkeys">bananas</div>' +
          '<input aria-labelledby="monkeys">' +
          '<blink>FAIL ME</blink>'
      );

      audit.run(
        { include: [axe.utils.getFlattenedTree(fixture)[0]] },
        {},
        function (results) {
          const expected = [
            {
              id: 'positive1',
              result: 'inapplicable',
              pageLevel: false,
              impact: null,
              nodes: '...other tests cover this...'
            },
            {
              id: 'positive2',
              result: 'inapplicable',
              pageLevel: false,
              impact: null,
              nodes: '...other tests cover this...'
            },
            {
              id: 'negative1',
              result: 'inapplicable',
              pageLevel: false,
              impact: null,
              nodes: '...other tests cover this...'
            },
            {
              id: 'positive3',
              result: 'inapplicable',
              pageLevel: false,
              impact: null,
              nodes: '...other tests cover this...'
            }
          ];

          const out = results[0].nodes[0].node.source;
          results.forEach(function (res) {
            // attribute order is a pain in the lower back in IE, so we're not
            // comparing nodes. Check.run and Rule.run do this.
            res.nodes = '...other tests cover this...';
          });

          assert.deepEqual(JSON.parse(JSON.stringify(results)), expected);
          assert.match(
            out,
            /^<input(\s+type="text"|\s+aria-label="monkeys"){2,}>/
          );
          done();
        },
        isNotCalled
      );
    });

    it('should not run rules disabled by the options', done => {
      audit.run(
        { include: [axe.utils.getFlattenedTree()[0]] },
        {
          rules: {
            positive3: {
              enabled: false
            }
          }
        },
        function (results) {
          assert.equal(results.length, 3);
          done();
        },
        isNotCalled
      );
    });

    it('should ensure audit.run recieves preload options', done => {
      fixture.innerHTML = '<input aria-label="yo" type="text">';

      audit = new Audit();
      audit.addRule({
        id: 'preload1',
        selector: '*'
      });
      audit.run = function (context, options, resolve, reject) {
        const randomRule = this.rules[0];
        randomRule.run(
          context,
          options,
          function (ruleResult) {
            ruleResult.OPTIONS_PASSED = options;
            resolve([ruleResult]);
          },
          reject
        );
      };

      const preloadOptions = {
        preload: {
          assets: ['cssom']
        }
      };
      audit.run(
        { include: [axe.utils.getFlattenedTree(fixture)[0]] },
        {
          preload: preloadOptions
        },
        function (res) {
          assert.isDefined(res);

          assert.lengthOf(res, 1);
          assert.property(res[0], 'OPTIONS_PASSED');

          const optionsPassed = res[0].OPTIONS_PASSED;
          assert.property(optionsPassed, 'preload');
          assert.deepEqual(optionsPassed.preload, preloadOptions);

          // ensure cache is cleared
          assert.isTrue(typeof axe._selectCache === 'undefined');

          done();
        },
        noop
      );
    });

    it.skip('should run rules (that do not need preload) and preload assets simultaneously', done => {
      /**
       * Note:
       * overriding and resolving both check and preload with a delay,
       * but the invoked timestamp should ensure that they were invoked almost immediately
       */

      fixture.innerHTML = '<div id="div1"></div><div id="div2"></div>';

      const runStartTime = new Date();
      const preloadInvokedTime = new Date();
      const noPreloadCheckedInvokedTime = new Date();
      const noPreloadRuleCheckEvaluateInvoked = false;
      const preloadOverrideInvoked = false;

      // override preload method
      axe.utils.preload = function (options) {
        preloadInvokedTime = new Date();
        preloadOverrideInvoked = true;

        return new Promise(function (res, rej) {
          setTimeout(() => {
            res(true);
          }, 2000);
        });
      };

      audit = new Audit();
      // add a rule and check that does not need preload
      audit.addRule({
        id: 'no-preload',
        selector: 'div#div1',
        any: ['no-preload-check'],
        preload: false
      });
      audit.addCheck({
        id: 'no-preload-check',
        evaluate: function (node, options, vNode, context) {
          noPreloadCheckedInvokedTime = new Date();
          noPreloadRuleCheckEvaluateInvoked = true;
          const ready = this.async();
          setTimeout(() => {
            ready(true);
          }, 1000);
        }
      });

      // add a rule which needs preload
      audit.addRule({
        id: 'yes-preload',
        selector: 'div#div2',
        preload: true
      });

      const preloadOptions = {
        preload: {
          assets: ['cssom']
        }
      };

      const allowedDiff = 50;

      audit.run(
        { include: [axe.utils.getFlattenedTree(fixture)[0]] },
        {
          preload: preloadOptions
        },
        function (results) {
          assert.isDefined(results);
          // assert that check was invoked for rule(s)
          assert.isTrue(noPreloadRuleCheckEvaluateInvoked);
          // assert preload was invoked
          assert.isTrue(preloadOverrideInvoked);
          // assert that time diff(s)
          // assert that run check invoked immediately
          // choosing 5ms as an arbitary number
          assert.isBelow(
            noPreloadCheckedInvokedTime - runStartTime,
            allowedDiff
          );
          // assert that preload  invoked immediately
          assert.isBelow(preloadInvokedTime - runStartTime, allowedDiff);
          // ensure cache is clear
          assert.isTrue(typeof axe._selectCache === 'undefined');
          // done
          done();
        },
        noop
      );
    });

    it.skip('should pass assets from preload to rule check that needs assets as context', done => {
      fixture.innerHTML = '<div id="div1"></div><div id="div2"></div>';

      const yesPreloadRuleCheckEvaluateInvoked = false;
      const preloadOverrideInvoked = false;

      const preloadData = {
        data: 'you got it!'
      };
      // override preload method
      axe.utils.preload = function (options) {
        preloadOverrideInvoked = true;
        return Promise.resolve({
          cssom: preloadData
        });
      };

      audit = new Audit();
      // add a rule and check that does not need preload
      audit.addRule({
        id: 'no-preload',
        selector: 'div#div1',
        preload: false
      });
      // add a rule which needs preload
      audit.addRule({
        id: 'yes-preload',
        selector: 'div#div2',
        preload: true,
        any: ['yes-preload-check']
      });
      audit.addCheck({
        id: 'yes-preload-check',
        evaluate: function (node, options, vNode, context) {
          yesPreloadRuleCheckEvaluateInvoked = true;
          this.data(context);
          return true;
        }
      });

      const preloadOptions = {
        preload: {
          assets: ['cssom']
        }
      };
      audit.run(
        { include: [axe.utils.getFlattenedTree(fixture)[0]] },
        {
          preload: preloadOptions
        },
        function (results) {
          assert.isDefined(results);
          // assert that check was invoked for rule(s)
          assert.isTrue(yesPreloadRuleCheckEvaluateInvoked);
          // assert preload was invoked
          assert.isTrue(preloadOverrideInvoked);

          // assert preload data that was passed to check
          const ruleResult = results.filter(function (r) {
            return (r.id = 'yes-preload' && r.nodes.length > 0);
          })[0];
          const checkResult = ruleResult.nodes[0].any[0];
          assert.isDefined(checkResult.data);
          assert.property(checkResult.data, 'cssom');
          assert.deepEqual(checkResult.data.cssom, preloadData);
          // ensure cache is clear
          assert.isTrue(typeof axe._selectCache === 'undefined');
          // done
          done();
        },
        noop
      );
    });

    it.skip('should continue to run rules and return result when preload is rejected', done => {
      fixture.innerHTML = '<div id="div1"></div><div id="div2"></div>';

      const preloadOverrideInvoked = false;
      const preloadNeededCheckInvoked = false;
      const rejectionMsg =
        'Boom! Things went terribly wrong! (But this was intended in this test)';

      // override preload method
      axe.utils.preload = function (options) {
        preloadOverrideInvoked = true;
        return Promise.reject(rejectionMsg);
      };

      audit = new Audit();
      // add a rule and check that does not need preload
      audit.addRule({
        id: 'no-preload',
        selector: 'div#div1',
        preload: false
      });
      // add a rule which needs preload
      audit.addRule({
        id: 'yes-preload',
        selector: 'div#div2',
        preload: true,
        any: ['yes-preload-check']
      });
      audit.addCheck({
        id: 'yes-preload-check',
        evaluate: function (node, options, vNode, context) {
          preloadNeededCheckInvoked = true;
          this.data(context);
          return true;
        }
      });

      const preloadOptions = {
        preload: {
          assets: ['cssom']
        }
      };
      audit.run(
        { include: [axe.utils.getFlattenedTree(fixture)[0]] },
        {
          preload: preloadOptions
        },
        function (results) {
          assert.isDefined(results);
          // assert preload was invoked
          assert.isTrue(preloadOverrideInvoked);

          // assert that both rules ran, although preload failed
          assert.lengthOf(results, 2);

          // assert that because preload failed
          // cssom was not populated on context of repective check
          assert.isTrue(preloadNeededCheckInvoked);
          const ruleResult = results.filter(function (r) {
            return (r.id = 'yes-preload' && r.nodes.length > 0);
          })[0];
          const checkResult = ruleResult.nodes[0].any[0];
          assert.isDefined(checkResult.data);
          assert.notProperty(checkResult.data, 'cssom');
          // done
          done();
        },
        noop
      );
    });

    it('should continue to run rules and return result when axios time(s)out and rejects preload', done => {
      fixture.innerHTML = '<div id="div1"></div><div id="div2"></div>';

      // there is no stubbing here,
      // the actual axios call is invoked, and timedout immediately as timeout is set to 0.1

      let preloadNeededCheckInvoked = false;
      audit = new Audit();
      // add a rule and check that does not need preload
      audit.addRule({
        id: 'no-preload',
        selector: 'div#div1',
        preload: false
      });
      // add a rule which needs preload
      audit.addRule({
        id: 'yes-preload',
        selector: 'div#div2',
        preload: true,
        any: ['yes-preload-check']
      });
      audit.addCheck({
        id: 'yes-preload-check',
        evaluate: function (node, options, vNode, context) {
          preloadNeededCheckInvoked = true;
          this.data(context);
          return true;
        }
      });
      axe.setup();

      const preloadOptions = {
        preload: {
          assets: ['cssom'],
          timeout: 0.1
        }
      };
      audit.run(
        { include: [axe.utils.getFlattenedTree(fixture)[0]] },
        {
          preload: preloadOptions
        },
        function (results) {
          assert.isDefined(results);
          // assert that both rules ran, although preload failed
          assert.lengthOf(results, 2);

          // assert that because preload failed
          // cssom was not populated on context of repective check
          assert.isTrue(preloadNeededCheckInvoked);
          const ruleResult = results.filter(function (r) {
            return (r.id = 'yes-preload' && r.nodes.length > 0);
          })[0];
          const checkResult = ruleResult.nodes[0].any[0];
          assert.isDefined(checkResult.data);
          assert.notProperty(checkResult.data, 'cssom');
          // done
          done();
        },
        noop
      );
    });

    it.skip('should assign an empty array to axe._selectCache', done => {
      const saved = axe.utils.ruleShouldRun;
      axe.utils.ruleShouldRun = () => {
        assert.equal(axe._selectCache.length, 0);
        return false;
      };
      audit.run(
        { include: [axe.utils.getFlattenedTree()[0]] },
        {},
        () => {
          axe.utils.ruleShouldRun = saved;
          done();
        },
        isNotCalled
      );
    });

    it('should clear axe._selectCache', done => {
      audit.run(
        { include: [axe.utils.getFlattenedTree()[0]] },
        {
          rules: {}
        },
        () => {
          assert.isTrue(typeof axe._selectCache === 'undefined');
          done();
        },
        isNotCalled
      );
    });

    it('should not run rules disabled by the configuration', done => {
      audit = new Audit();
      const success = true;
      audit.rules.push(
        new Rule({
          id: 'positive1',
          selector: '*',
          enabled: false,
          any: [
            {
              id: 'positive1-check1',
              evaluate: () => {
                success = false;
              }
            }
          ]
        })
      );
      audit.run(
        { include: [axe.utils.getFlattenedTree()[0]] },
        {},
        () => {
          assert.ok(success);
          done();
        },
        isNotCalled
      );
    });

    it("should call the rule's run function", done => {
      const targetRule = mockRules[mockRules.length - 1];
      const rule = axe.utils.findBy(audit.rules, 'id', targetRule.id);
      let called = false;
      let orig;

      fixture.innerHTML = '<a href="#">link</a>';
      orig = rule.run;
      rule.run = function (node, options, callback) {
        called = true;
        callback({});
      };
      audit.run(
        { include: [axe.utils.getFlattenedTree()[0]] },
        {},
        () => {
          assert.isTrue(called);
          rule.run = orig;
          done();
        },
        isNotCalled
      );
    });

    it('should pass the option to the run function', done => {
      const targetRule = mockRules[mockRules.length - 1];
      const rule = axe.utils.findBy(audit.rules, 'id', targetRule.id);
      let passed = false;
      let orig;
      let options;

      fixture.innerHTML = '<a href="#">link</a>';
      orig = rule.run;
      rule.run = function (node, o, callback) {
        assert.deepEqual(o, options);
        passed = true;
        callback({});
      };
      options = { rules: {} };
      (options.rules[targetRule.id] = {}).data = 'monkeys';
      audit.run(
        { include: [axe.utils.getFlattenedTree()[0]] },
        options,
        () => {
          assert.ok(passed);
          rule.run = orig;
          done();
        },
        isNotCalled
      );
    });

    it('should skip pageLevel rules if context is not set to entire page', () => {
      audit = new Audit();

      audit.rules.push(
        new Rule({
          pageLevel: true,
          enabled: true,
          evaluate: () => {
            assert.ok(false, 'Should not run');
          }
        })
      );

      audit.run(
        {
          include: [axe.utils.getFlattenedTree(document.body)[0]],
          page: false
        },
        {},
        function (results) {
          assert.deepEqual(results, []);
        },
        isNotCalled
      );
    });

    it('should not halt if errors occur', done => {
      audit.addRule({
        id: 'throw1',
        selector: '*',
        any: [
          {
            id: 'throw1-check1'
          }
        ]
      });
      audit.addCheck({
        id: 'throw1-check1',
        evaluate: () => {
          throw new Error('Launch the super sheep!');
        }
      });
      audit.run(
        { include: [axe.utils.getFlattenedTree(fixture)[0]] },
        {
          runOnly: {
            type: 'rule',
            values: ['throw1', 'positive1']
          }
        },
        () => {
          done();
        },
        isNotCalled
      );
    });

    it('should run audit.normalizeOptions to ensure valid input', () => {
      fixture.innerHTML =
        '<input type="text" aria-label="monkeys">' +
        '<div id="monkeys">bananas</div>' +
        '<input aria-labelledby="monkeys" type="text">' +
        '<blink>FAIL ME</blink>';
      let checked = 'options not validated';

      audit.normalizeOptions = () => {
        checked = 'options validated';
      };

      audit.run(
        { include: [axe.utils.getFlattenedTree(fixture)[0]] },
        {},
        noop,
        isNotCalled
      );
      assert.equal(checked, 'options validated');
    });

    it('propagates DqElement options', async () => {
      fixtureSetup('<input id="input">');
      const results = await new Promise((resolve, reject) => {
        audit.run(
          { include: [axe.utils.getFlattenedTree(fixture)[0]] },
          { elementRef: true, absolutePaths: true },
          resolve,
          reject
        );
      });
      const { node } = results[0].nodes[0];
      assert.equal(node.element, fixture.firstChild);
      assert.equal(node.selector, 'html > body > #fixture > #input');
    });

    describe('when an error occurs', () => {
      let err;
      beforeEach(() => {
        err = new Error('Launch the super sheep!');
        audit.addRule({
          id: 'throw1',
          selector: '#fixture',
          any: [
            {
              id: 'throw1-check1'
            }
          ]
        });
        audit.addCheck({
          id: 'throw1-check1',
          evaluate: () => {
            throw err;
          }
        });
        axe.setup();
      });

      it('catches errors and resolves them as a cantTell result', done => {
        audit.run(
          { include: [axe._tree[0]] },
          { runOnly: { type: 'rule', values: ['throw1'] } },
          captureError(results => {
            assert.lengthOf(results, 1);
            assertErrorResults(results[0], err, '#fixture');
            done();
          }, done),
          isNotCalled
        );
      });

      it('should halt if an error occurs when debug is set', done => {
        const context = { include: [axe.utils.getFlattenedTree(fixture)[0]] };
        const options = {
          debug: true,
          runOnly: { type: 'rule', values: ['throw1'] }
        };
        audit.run(
          context,
          options,
          noop,
          captureError(reject => {
            assert.include(reject.message, err.message);
            done();
          }, done)
        );
      });
    });
  });

  describe('Audit#after', () => {
    it('should run Rule#after on any rule whose result is passed in', () => {
      /*eslint no-unused-vars:0*/
      audit = new Audit();
      let success = false;
      const options = { runOnly: 'hehe' };
      const results = [
        {
          id: 'hehe',
          monkeys: 'bananas'
        }
      ];
      audit.rules.push(
        new Rule({
          id: 'hehe',
          pageLevel: false,
          enabled: false
        })
      );

      audit.rules[0].after = function (res, opts) {
        assert.equal(res, results[0]);
        assert.deepEqual(opts, options);
        success = true;
      };

      audit.after(results, options);
      assert.isTrue(success);
    });

    it('does not run Rule#after if the result has an error', () => {
      audit = new Audit();
      const results = [{ id: 'throw1', error: new Error('La la la!') }];
      let success = true;
      audit.rules.push(new Rule({ id: 'throw1' }));
      audit.rules[0].after = () => (success = false);
      audit.after(results, {});
      assert.lengthOf(results, 1);
      assert.equal(results[0].error.message, 'La la la!');
      assert.isTrue(success, 'Rule#after should not be called');
    });

    it('catches errors and passes them as a cantTell result', () => {
      audit = new Audit();
      const err = new SyntaxError('La la la!');
      const results = [
        {
          id: 'throw1',
          nodes: [
            {
              id: 'throw1-check1-after',
              node: new axe.utils.DqElement(fixture),
              any: [{ id: 'throw1-check1-after', result: false }],
              all: [],
              none: []
            }
          ]
        }
      ];
      audit.addRule({
        id: 'throw1',
        selector: '#fixture',
        any: [{ id: 'throw1-check1-after' }]
      });
      audit.addCheck({
        id: 'throw1-check1-after',
        after: () => {
          throw err;
        }
      });
      axe.setup();
      const result = audit.after(results, {});
      assert.lengthOf(result, 1);
      assertErrorResults(result[0], err, '#fixture');
    });

    it('throws errors when debug is set', () => {
      audit = new Audit();
      const err = new SyntaxError('La la la!');
      const options = { debug: true };
      const results = [
        {
          id: 'throw1',
          nodes: [
            {
              id: 'throw1-check1-after',
              node: new axe.utils.DqElement(fixture),
              any: [{ id: 'throw1-check1-after', result: false }],
              all: [],
              none: []
            }
          ]
        }
      ];
      audit.addRule({
        id: 'throw1',
        selector: '#fixture',
        any: [{ id: 'throw1-check1-after' }]
      });
      audit.addCheck({
        id: 'throw1-check1-after',
        after: () => {
          throw err;
        }
      });
      axe.setup();
      try {
        audit.after(results, options);
        assert.fail('Should have thrown');
      } catch (actual) {
        assertEqualRuleError(actual, err);
      }
    });
  });

  describe('Audit#normalizeOptions', () => {
    let axeLog;
    beforeEach(() => {
      axeLog = axe.log;
    });
    afterEach(() => {
      axe.log = axeLog;
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
      assert(audit.normalizeOptions(opt), opt);
    });

    it('allows `value` as alternative to `values`', () => {
      const opt = {
        runOnly: {
          type: 'rule',
          value: ['positive1', 'positive2']
        }
      };
      const out = audit.normalizeOptions(opt);
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
      assert(audit.normalizeOptions(opt).runOnly.type, 'rule');
    });

    it('allows type: tags as an alternative to type: tag', () => {
      const opt = {
        runOnly: {
          type: 'tags',
          values: ['positive']
        }
      };
      assert(audit.normalizeOptions(opt).runOnly.type, 'tag');
    });

    it('allows type: undefined as an alternative to type: tag', () => {
      const opt = {
        runOnly: {
          values: ['positive']
        }
      };
      assert(audit.normalizeOptions(opt).runOnly.type, 'tag');
    });

    it('allows runOnly as an array as an alternative to type: tag', () => {
      const opt = { runOnly: ['positive', 'negative'] };
      const out = audit.normalizeOptions(opt);
      assert(out.runOnly.type, 'tag');
      assert.deepEqual(out.runOnly.values, ['positive', 'negative']);
    });

    it('allows runOnly as an array as an alternative to type: rule', () => {
      const opt = { runOnly: ['positive1', 'negative1'] };
      const out = audit.normalizeOptions(opt);
      assert(out.runOnly.type, 'rule');
      assert.deepEqual(out.runOnly.values, ['positive1', 'negative1']);
    });

    it('allows runOnly as a string as an alternative to an array', () => {
      const opt = { runOnly: 'positive1' };
      const out = audit.normalizeOptions(opt);
      assert(out.runOnly.type, 'rule');
      assert.deepEqual(out.runOnly.values, ['positive1']);
    });

    it('throws an error if runOnly contains both rules and tags', () => {
      assert.throws(() => {
        audit.normalizeOptions({
          runOnly: ['positive', 'negative1']
        });
      });
    });

    it('defaults runOnly to type: tag', () => {
      const opt = { runOnly: ['fakeTag'] };
      const out = audit.normalizeOptions(opt);
      assert(out.runOnly.type, 'tag');
      assert.deepEqual(out.runOnly.values, ['fakeTag']);
    });

    it('throws an error runOnly.values not an array', () => {
      assert.throws(() => {
        audit.normalizeOptions({
          runOnly: {
            type: 'rule',
            values: { badProp: 'badValue' }
          }
        });
      });
    });

    it('throws an error runOnly.values an empty', () => {
      assert.throws(() => {
        audit.normalizeOptions({
          runOnly: {
            type: 'rule',
            values: []
          }
        });
      });
    });

    it('throws an error runOnly.type is unknown', () => {
      assert.throws(() => {
        audit.normalizeOptions({
          runOnly: {
            type: 'something-else',
            values: ['wcag2aa']
          }
        });
      });
    });

    it('throws an error when option.runOnly has an unknown rule', () => {
      assert.throws(() => {
        audit.normalizeOptions({
          runOnly: {
            type: 'rule',
            values: ['frakeRule']
          }
        });
      });
    });

    it("doesn't throw an error when option.runOnly has an unknown tag", () => {
      assert.doesNotThrow(() => {
        audit.normalizeOptions({
          runOnly: {
            type: 'tags',
            values: ['fakeTag']
          }
        });
      });
    });

    it('throws an error when option.rules has an unknown rule', () => {
      assert.throws(() => {
        audit.normalizeOptions({
          rules: {
            fakeRule: { enabled: false }
          }
        });
      });
    });

    it('logs an issue when a tag is unknown', () => {
      let message = '';
      axe.log = function (m) {
        message = m;
      };
      audit.normalizeOptions({
        runOnly: {
          type: 'tags',
          values: ['unknwon-tag']
        }
      });
      assert.include(message, 'Could not find tags');
    });

    it('logs no issues for unknown WCAG level tags', () => {
      let message = '';
      axe.log = function (m) {
        message = m;
      };
      audit.normalizeOptions({
        runOnly: {
          type: 'tags',
          values: ['wcag23aaa']
        }
      });
      assert.isEmpty(message);
    });

    it('logs an issue when a tag is unknown, together with a wcag level tag', () => {
      let message = '';
      axe.log = function (m) {
        message = m;
      };
      audit.normalizeOptions({
        runOnly: {
          type: 'tags',
          values: ['wcag23aaa', 'unknwon-tag']
        }
      });
      assert.include(message, 'Could not find tags');
    });
  });
});
