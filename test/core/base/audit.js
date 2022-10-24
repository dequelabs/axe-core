/* global Promise */
describe('Audit', function () {
  'use strict';

  var Audit = axe._thisWillBeDeletedDoNotUse.base.Audit;
  var Rule = axe._thisWillBeDeletedDoNotUse.base.Rule;
  var ver = axe.version.substring(0, axe.version.lastIndexOf('.'));
  var a, getFlattenedTree;
  var isNotCalled = function (err) {
    throw err || new Error('Reject should not be called');
  };
  var noop = function () {};

  var mockChecks = [
    {
      id: 'positive1-check1',
      evaluate: function () {
        return true;
      }
    },
    {
      id: 'positive2-check1',
      evaluate: function () {
        return true;
      }
    },
    {
      id: 'negative1-check1',
      evaluate: function () {
        return true;
      }
    },
    {
      id: 'positive3-check1',
      evaluate: function () {
        return true;
      }
    }
  ];

  var mockRules = [
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

  var fixture = document.getElementById('fixture');

  var origAuditRun;
  var origAxeUtilsPreload;

  beforeEach(function () {
    a = new Audit();
    mockRules.forEach(function (r) {
      a.addRule(r);
    });
    mockChecks.forEach(function (c) {
      a.addCheck(c);
    });
    origAuditRun = a.run;
  });

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
    axe._selectCache = undefined;
    a.run = origAuditRun;
  });

  it('should be a function', function () {
    assert.isFunction(Audit);
  });

  describe('defaults', function () {
    it('should set noHtml', function () {
      var audit = new Audit();
      assert.isFalse(audit.noHtml);
    });

    it('should set allowedOrigins', function () {
      var audit = new Audit();
      assert.deepEqual(audit.allowedOrigins, [window.location.origin]);
    });
  });

  describe('Audit#_constructHelpUrls', function () {
    it('should create default help URLS', function () {
      var audit = new Audit();
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
    it('should use changed branding', function () {
      var audit = new Audit();
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
    it('should use changed application', function () {
      var audit = new Audit();
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

    it('does not override helpUrls of different products', function () {
      var audit = new Audit();
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
    it('understands prerelease type version numbers', function () {
      var tempVersion = axe.version;
      var audit = new Audit();
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

    it('matches major release versions', function () {
      var tempVersion = axe.version;
      var audit = new Audit();
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
    it('sets the lang query if locale has been set', function () {
      var audit = new Audit();
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

  describe('Audit#setBranding', function () {
    it('should change the brand', function () {
      var audit = new Audit();
      assert.equal(audit.brand, 'axe');
      assert.equal(audit.application, 'axeAPI');
      audit.setBranding({
        brand: 'thing'
      });
      assert.equal(audit.brand, 'thing');
      assert.equal(audit.application, 'axeAPI');
    });
    it('should change the application', function () {
      var audit = new Audit();
      assert.equal(audit.brand, 'axe');
      assert.equal(audit.application, 'axeAPI');
      audit.setBranding({
        application: 'thing'
      });
      assert.equal(audit.brand, 'axe');
      assert.equal(audit.application, 'thing');
    });
    it('should change the application when passed a string', function () {
      var audit = new Audit();
      assert.equal(audit.brand, 'axe');
      assert.equal(audit.application, 'axeAPI');
      audit.setBranding('thing');
      assert.equal(audit.brand, 'axe');
      assert.equal(audit.application, 'thing');
    });
    it('should call _constructHelpUrls', function () {
      var audit = new Audit();
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
    it('should call _constructHelpUrls even when nothing changed', function () {
      var audit = new Audit();
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
    it('should not replace custom set branding', function () {
      var audit = new Audit();
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

  describe('Audit#addRule', function () {
    it('should override existing rule', function () {
      var audit = new Audit();
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
    it('should otherwise push new rule', function () {
      var audit = new Audit();
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

  describe('Audit#resetRulesAndChecks', function () {
    it('should override newly created check', function () {
      var audit = new Audit();
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
    it('should reset locale', function () {
      var audit = new Audit();
      assert.equal(audit.lang, 'en');
      audit.applyLocale({
        lang: 'de'
      });
      assert.equal(audit.lang, 'de');
      audit.resetRulesAndChecks();
      assert.equal(audit.lang, 'en');
    });
    it('should reset brand', function () {
      var audit = new Audit();
      assert.equal(audit.brand, 'axe');
      audit.setBranding({
        brand: 'test'
      });
      assert.equal(audit.brand, 'test');
      audit.resetRulesAndChecks();
      assert.equal(audit.brand, 'axe');
    });
    it('should reset brand application', function () {
      var audit = new Audit();
      assert.equal(audit.application, 'axeAPI');
      audit.setBranding({
        application: 'test'
      });
      assert.equal(audit.application, 'test');
      audit.resetRulesAndChecks();
      assert.equal(audit.application, 'axeAPI');
    });
    it('should reset brand tagExlcude', function () {
      axe._load({});
      assert.deepEqual(axe._audit.tagExclude, ['experimental']);
      axe.configure({
        tagExclude: ['ninjas']
      });
      axe._audit.resetRulesAndChecks();
      assert.deepEqual(axe._audit.tagExclude, ['experimental']);
    });

    it('should reset noHtml', function () {
      var audit = new Audit();
      audit.noHtml = true;
      audit.resetRulesAndChecks();
      assert.isFalse(audit.noHtml);
    });

    it('should reset allowedOrigins', function () {
      var audit = new Audit();
      audit.allowedOrigins = ['hello'];
      audit.resetRulesAndChecks();
      assert.deepEqual(audit.allowedOrigins, [window.location.origin]);
    });
  });

  describe('Audit#addCheck', function () {
    it('should create a new check', function () {
      var audit = new Audit();
      assert.equal(audit.checks.target, undefined);
      audit.addCheck({
        id: 'target',
        options: { value: 'jane' }
      });
      assert.ok(audit.checks.target);
      assert.deepEqual(audit.checks.target.options, { value: 'jane' });
    });
    it('should configure the metadata, if passed', function () {
      var audit = new Audit();
      assert.equal(audit.checks.target, undefined);
      audit.addCheck({
        id: 'target',
        metadata: { guy: 'bob' }
      });
      assert.ok(audit.checks.target);
      assert.equal(audit.data.checks.target.guy, 'bob');
    });
    it('should reconfigure existing check', function () {
      var audit = new Audit();
      var myTest = function () {};
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
    it('should not turn messages into a function', function () {
      var audit = new Audit();
      var spec = {
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

    it('should turn function strings into a function', function () {
      var audit = new Audit();
      var spec = {
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

  describe('Audit#setAllowedOrigins', function () {
    it('should set allowedOrigins', function () {
      var audit = new Audit();
      audit.setAllowedOrigins([
        'https://deque.com',
        'https://dequeuniversity.com'
      ]);
      assert.deepEqual(audit.allowedOrigins, [
        'https://deque.com',
        'https://dequeuniversity.com'
      ]);
    });

    it('should normalize <same_origin>', function () {
      var audit = new Audit();
      audit.setAllowedOrigins(['<same_origin>', 'https://deque.com']);
      assert.deepEqual(audit.allowedOrigins, [
        window.location.origin,
        'https://deque.com'
      ]);
    });

    it('should normalize <unsafe_all_origins>', function () {
      var audit = new Audit();
      audit.setAllowedOrigins([
        'https://deque.com',
        '<unsafe_all_origins>',
        '<same_origin>'
      ]);
      assert.deepEqual(audit.allowedOrigins, ['*']);
    });
  });

  describe('Audit#run', function () {
    it('should run all the rules', function (done) {
      fixture.innerHTML =
        '<input aria-label="monkeys" type="text">' +
        '<div id="monkeys">bananas</div>' +
        '<input aria-labelledby="monkeys">' +
        '<blink>FAIL ME</blink>';

      a.run(
        { include: [axe.utils.getFlattenedTree(fixture)[0]] },
        {},
        function (results) {
          var expected = [
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

          var out = results[0].nodes[0].node.source;
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

    it('should not run rules disabled by the options', function (done) {
      a.run(
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

    it('should ensure audit.run recieves preload options', function (done) {
      fixture.innerHTML = '<input aria-label="yo" type="text">';

      var audit = new Audit();
      audit.addRule({
        id: 'preload1',
        selector: '*'
      });
      audit.run = function (context, options, resolve, reject) {
        var randomRule = this.rules[0];
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

      var preloadOptions = {
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

          var optionsPassed = res[0].OPTIONS_PASSED;
          assert.property(optionsPassed, 'preload');
          assert.deepEqual(optionsPassed.preload, preloadOptions);

          // ensure cache is cleared
          assert.isTrue(typeof axe._selectCache === 'undefined');

          done();
        },
        noop
      );
    });

    it.skip('should run rules (that do not need preload) and preload assets simultaneously', function (done) {
      /**
       * Note:
       * overriding and resolving both check and preload with a delay,
       * but the invoked timestamp should ensure that they were invoked almost immediately
       */

      fixture.innerHTML = '<div id="div1"></div><div id="div2"></div>';

      var runStartTime = new Date();
      var preloadInvokedTime = new Date();
      var noPreloadCheckedInvokedTime = new Date();
      var noPreloadRuleCheckEvaluateInvoked = false;
      var preloadOverrideInvoked = false;

      // override preload method
      axe.utils.preload = function (options) {
        preloadInvokedTime = new Date();
        preloadOverrideInvoked = true;

        return new Promise(function (res, rej) {
          setTimeout(function () {
            res(true);
          }, 2000);
        });
      };

      var audit = new Audit();
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
          var ready = this.async();
          setTimeout(function () {
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

      var preloadOptions = {
        preload: {
          assets: ['cssom']
        }
      };

      var allowedDiff = 50;

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

    it.skip('should pass assets from preload to rule check that needs assets as context', function (done) {
      fixture.innerHTML = '<div id="div1"></div><div id="div2"></div>';

      var yesPreloadRuleCheckEvaluateInvoked = false;
      var preloadOverrideInvoked = false;

      var preloadData = {
        data: 'you got it!'
      };
      // override preload method
      axe.utils.preload = function (options) {
        preloadOverrideInvoked = true;
        return Promise.resolve({
          cssom: preloadData
        });
      };

      var audit = new Audit();
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

      var preloadOptions = {
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
          var ruleResult = results.filter(function (r) {
            return (r.id = 'yes-preload' && r.nodes.length > 0);
          })[0];
          var checkResult = ruleResult.nodes[0].any[0];
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

    it.skip('should continue to run rules and return result when preload is rejected', function (done) {
      fixture.innerHTML = '<div id="div1"></div><div id="div2"></div>';

      var preloadOverrideInvoked = false;
      var preloadNeededCheckInvoked = false;
      var rejectionMsg =
        'Boom! Things went terribly wrong! (But this was intended in this test)';

      // override preload method
      axe.utils.preload = function (options) {
        preloadOverrideInvoked = true;
        return Promise.reject(rejectionMsg);
      };

      var audit = new Audit();
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

      var preloadOptions = {
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
          var ruleResult = results.filter(function (r) {
            return (r.id = 'yes-preload' && r.nodes.length > 0);
          })[0];
          var checkResult = ruleResult.nodes[0].any[0];
          assert.isDefined(checkResult.data);
          assert.notProperty(checkResult.data, 'cssom');
          // done
          done();
        },
        noop
      );
    });

    it('should continue to run rules and return result when axios time(s)out and rejects preload', function (done) {
      fixture.innerHTML = '<div id="div1"></div><div id="div2"></div>';

      // there is no stubbing here,
      // the actual axios call is invoked, and timedout immediately as timeout is set to 0.1

      var preloadNeededCheckInvoked = false;
      var audit = new Audit();
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

      var preloadOptions = {
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
          var ruleResult = results.filter(function (r) {
            return (r.id = 'yes-preload' && r.nodes.length > 0);
          })[0];
          var checkResult = ruleResult.nodes[0].any[0];
          assert.isDefined(checkResult.data);
          assert.notProperty(checkResult.data, 'cssom');
          // done
          done();
        },
        noop
      );
    });

    it.skip('should assign an empty array to axe._selectCache', function (done) {
      var saved = axe.utils.ruleShouldRun;
      axe.utils.ruleShouldRun = function () {
        assert.equal(axe._selectCache.length, 0);
        return false;
      };
      a.run(
        { include: [axe.utils.getFlattenedTree()[0]] },
        {},
        function () {
          axe.utils.ruleShouldRun = saved;
          done();
        },
        isNotCalled
      );
    });

    it('should clear axe._selectCache', function (done) {
      a.run(
        { include: [axe.utils.getFlattenedTree()[0]] },
        {
          rules: {}
        },
        function () {
          assert.isTrue(typeof axe._selectCache === 'undefined');
          done();
        },
        isNotCalled
      );
    });

    it('should not run rules disabled by the configuration', function (done) {
      var a = new Audit();
      var success = true;
      a.rules.push(
        new Rule({
          id: 'positive1',
          selector: '*',
          enabled: false,
          any: [
            {
              id: 'positive1-check1',
              evaluate: function () {
                success = false;
              }
            }
          ]
        })
      );
      a.run(
        { include: [axe.utils.getFlattenedTree()[0]] },
        {},
        function () {
          assert.ok(success);
          done();
        },
        isNotCalled
      );
    });

    it("should call the rule's run function", function (done) {
      var targetRule = mockRules[mockRules.length - 1],
        rule = axe.utils.findBy(a.rules, 'id', targetRule.id),
        called = false,
        orig;

      fixture.innerHTML = '<a href="#">link</a>';
      orig = rule.run;
      rule.run = function (node, options, callback) {
        called = true;
        callback({});
      };
      a.run(
        { include: [axe.utils.getFlattenedTree()[0]] },
        {},
        function () {
          assert.isTrue(called);
          rule.run = orig;
          done();
        },
        isNotCalled
      );
    });

    it('should pass the option to the run function', function (done) {
      var targetRule = mockRules[mockRules.length - 1],
        rule = axe.utils.findBy(a.rules, 'id', targetRule.id),
        passed = false,
        orig,
        options;

      fixture.innerHTML = '<a href="#">link</a>';
      orig = rule.run;
      rule.run = function (node, o, callback) {
        assert.deepEqual(o, options);
        passed = true;
        callback({});
      };
      options = { rules: {} };
      (options.rules[targetRule.id] = {}).data = 'monkeys';
      a.run(
        { include: [axe.utils.getFlattenedTree()[0]] },
        options,
        function () {
          assert.ok(passed);
          rule.run = orig;
          done();
        },
        isNotCalled
      );
    });

    it('should skip pageLevel rules if context is not set to entire page', function () {
      var audit = new Audit();

      audit.rules.push(
        new Rule({
          pageLevel: true,
          enabled: true,
          evaluate: function () {
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

    it('catches errors and passes them as a cantTell result', function (done) {
      var err = new Error('Launch the super sheep!');
      a.addRule({
        id: 'throw1',
        selector: '*',
        any: [
          {
            id: 'throw1-check1'
          }
        ]
      });
      a.addCheck({
        id: 'throw1-check1',
        evaluate: function () {
          throw err;
        }
      });
      axe._tree = axe.utils.getFlattenedTree(fixture);
      axe._selectorData = axe.utils.getSelectorData(axe._tree);
      a.run(
        { include: [axe._tree[0]] },
        {
          runOnly: {
            type: 'rule',
            values: ['throw1']
          }
        },
        function (results) {
          assert.lengthOf(results, 1);
          assert.equal(results[0].result, 'cantTell');
          assert.equal(results[0].message, err.message);
          assert.equal(results[0].stack, err.stack);
          assert.equal(results[0].error, err);
          done();
        },
        isNotCalled
      );
    });

    it('should not halt if errors occur', function (done) {
      a.addRule({
        id: 'throw1',
        selector: '*',
        any: [
          {
            id: 'throw1-check1'
          }
        ]
      });
      a.addCheck({
        id: 'throw1-check1',
        evaluate: function () {
          throw new Error('Launch the super sheep!');
        }
      });
      a.run(
        { include: [axe.utils.getFlattenedTree(fixture)[0]] },
        {
          runOnly: {
            type: 'rule',
            values: ['throw1', 'positive1']
          }
        },
        function () {
          done();
        },
        isNotCalled
      );
    });

    it('should run audit.normalizeOptions to ensure valid input', function () {
      fixture.innerHTML =
        '<input type="text" aria-label="monkeys">' +
        '<div id="monkeys">bananas</div>' +
        '<input aria-labelledby="monkeys" type="text">' +
        '<blink>FAIL ME</blink>';
      var checked = 'options not validated';

      a.normalizeOptions = function () {
        checked = 'options validated';
      };

      a.run(
        { include: [axe.utils.getFlattenedTree(fixture)[0]] },
        {},
        noop,
        isNotCalled
      );
      assert.equal(checked, 'options validated');
    });

    it('should halt if an error occurs when debug is set', function (done) {
      a.addRule({
        id: 'throw1',
        selector: '*',
        any: [
          {
            id: 'throw1-check1'
          }
        ]
      });
      a.addCheck({
        id: 'throw1-check1',
        evaluate: function () {
          throw new Error('Launch the super sheep!');
        }
      });

      // check error node requires _selectorCache to be setup
      axe.setup();

      a.run(
        { include: [axe.utils.getFlattenedTree(fixture)[0]] },
        {
          debug: true,
          runOnly: {
            type: 'rule',
            values: ['throw1']
          }
        },
        noop,
        function (err) {
          assert.equal(err.message, 'Launch the super sheep!');
          done();
        }
      );
    });
  });

  describe('Audit#after', function () {
    it('should run Rule#after on any rule whose result is passed in', function () {
      /*eslint no-unused-vars:0*/
      var audit = new Audit();
      var success = false;
      var options = [{ id: 'hehe', enabled: true, monkeys: 'bananas' }];
      var results = [
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
    });
  });

  describe('Audit#normalizeOptions', function () {
    var axeLog;
    beforeEach(function () {
      axeLog = axe.log;
    });
    afterEach(function () {
      axe.log = axeLog;
    });

    it('returns the options object when it is valid', function () {
      var opt = {
        runOnly: {
          type: 'rule',
          values: ['positive1', 'positive2']
        },
        rules: {
          negative1: { enabled: false }
        }
      };
      assert(a.normalizeOptions(opt), opt);
    });

    it('allows `value` as alternative to `values`', function () {
      var opt = {
        runOnly: {
          type: 'rule',
          value: ['positive1', 'positive2']
        }
      };
      var out = a.normalizeOptions(opt);
      assert.deepEqual(out.runOnly.values, ['positive1', 'positive2']);
      assert.isUndefined(out.runOnly.value);
    });

    it('allows type: rules as an alternative to type: rule', function () {
      var opt = {
        runOnly: {
          type: 'rules',
          values: ['positive1', 'positive2']
        }
      };
      assert(a.normalizeOptions(opt).runOnly.type, 'rule');
    });

    it('allows type: tags as an alternative to type: tag', function () {
      var opt = {
        runOnly: {
          type: 'tags',
          values: ['positive']
        }
      };
      assert(a.normalizeOptions(opt).runOnly.type, 'tag');
    });

    it('allows type: undefined as an alternative to type: tag', function () {
      var opt = {
        runOnly: {
          values: ['positive']
        }
      };
      assert(a.normalizeOptions(opt).runOnly.type, 'tag');
    });

    it('allows runOnly as an array as an alternative to type: tag', function () {
      var opt = { runOnly: ['positive', 'negative'] };
      var out = a.normalizeOptions(opt);
      assert(out.runOnly.type, 'tag');
      assert.deepEqual(out.runOnly.values, ['positive', 'negative']);
    });

    it('allows runOnly as an array as an alternative to type: rule', function () {
      var opt = { runOnly: ['positive1', 'negative1'] };
      var out = a.normalizeOptions(opt);
      assert(out.runOnly.type, 'rule');
      assert.deepEqual(out.runOnly.values, ['positive1', 'negative1']);
    });

    it('allows runOnly as a string as an alternative to an array', function () {
      var opt = { runOnly: 'positive1' };
      var out = a.normalizeOptions(opt);
      assert(out.runOnly.type, 'rule');
      assert.deepEqual(out.runOnly.values, ['positive1']);
    });

    it('throws an error if runOnly contains both rules and tags', function () {
      assert.throws(function () {
        a.normalizeOptions({
          runOnly: ['positive', 'negative1']
        });
      });
    });

    it('defaults runOnly to type: tag', function () {
      var opt = { runOnly: ['fakeTag'] };
      var out = a.normalizeOptions(opt);
      assert(out.runOnly.type, 'tag');
      assert.deepEqual(out.runOnly.values, ['fakeTag']);
    });

    it('throws an error runOnly.values not an array', function () {
      assert.throws(function () {
        a.normalizeOptions({
          runOnly: {
            type: 'rule',
            values: { badProp: 'badValue' }
          }
        });
      });
    });

    it('throws an error runOnly.values an empty', function () {
      assert.throws(function () {
        a.normalizeOptions({
          runOnly: {
            type: 'rule',
            values: []
          }
        });
      });
    });

    it('throws an error runOnly.type is unknown', function () {
      assert.throws(function () {
        a.normalizeOptions({
          runOnly: {
            type: 'something-else',
            values: ['wcag2aa']
          }
        });
      });
    });

    it('throws an error when option.runOnly has an unknown rule', function () {
      assert.throws(function () {
        a.normalizeOptions({
          runOnly: {
            type: 'rule',
            values: ['frakeRule']
          }
        });
      });
    });

    it("doesn't throw an error when option.runOnly has an unknown tag", function () {
      assert.doesNotThrow(function () {
        a.normalizeOptions({
          runOnly: {
            type: 'tags',
            values: ['fakeTag']
          }
        });
      });
    });

    it('throws an error when option.rules has an unknown rule', function () {
      assert.throws(function () {
        a.normalizeOptions({
          rules: {
            fakeRule: { enabled: false }
          }
        });
      });
    });

    it('logs an issue when a tag is unknown', function () {
      var message = '';
      axe.log = function (m) {
        message = m;
      };
      a.normalizeOptions({
        runOnly: {
          type: 'tags',
          values: ['unknwon-tag']
        }
      });
      assert.include(message, 'Could not find tags');
    });

    it('logs no issues for unknown WCAG level tags', function () {
      var message = '';
      axe.log = function (m) {
        message = m;
      };
      a.normalizeOptions({
        runOnly: {
          type: 'tags',
          values: ['wcag23aaa']
        }
      });
      assert.isEmpty(message);
    });

    it('logs an issue when a tag is unknown, together with a wcag level tag', function () {
      var message = '';
      axe.log = function (m) {
        message = m;
      };
      a.normalizeOptions({
        runOnly: {
          type: 'tags',
          values: ['wcag23aaa', 'unknwon-tag']
        }
      });
      assert.include(message, 'Could not find tags');
    });
  });
});
