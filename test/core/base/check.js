describe('Check', () => {
  const Check = axe._thisWillBeDeletedDoNotUse.base.Check;
  const CheckResult = axe._thisWillBeDeletedDoNotUse.base.CheckResult;
  const metadataFunctionMap =
    axe._thisWillBeDeletedDoNotUse.base.metadataFunctionMap;
  const noop = () => {};

  const fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should be a function', () => {
    assert.isFunction(Check);
  });

  describe('prototype', () => {
    describe('enabled', () => {
      it('should be true by default', () => {
        const check = new Check({});
        assert.isTrue(check.enabled);
      });
      it('should be set to whatever is passed in', () => {
        const check = new Check({ enabled: false });
        assert.isFalse(check.enabled);
      });
    });

    describe('configure', () => {
      it('should accept one parameter', () => {
        assert.lengthOf(new Check({}).configure, 1);
      });
      it('should override options', () => {
        Check.prototype.test = function () {
          return this.options;
        };
        const check = new Check({
          options: ['foo']
        });
        check.configure({ options: { value: 'fong' } });
        assert.deepEqual({ value: 'fong' }, check.test());
        delete Check.prototype.test;
      });
      it('should override evaluate', () => {
        Check.prototype.test = function () {
          return this.evaluate();
        };
        const check = new Check({
          evaluate: 'function () { return "foo"; }'
        });
        check.configure({ evaluate: 'function () { return "fong"; }' });
        assert.equal('fong', check.test());
        delete Check.prototype.test;
      });
      it('should override after', () => {
        Check.prototype.test = function () {
          return this.after();
        };
        const check = new Check({
          after: 'function () { return "foo"; }'
        });
        check.configure({ after: 'function () { return "fong"; }' });
        assert.equal('fong', check.test());
        delete Check.prototype.test;
      });
      it('should override evaluate as a function', () => {
        Check.prototype.test = function () {
          return this.evaluate();
        };
        const check = new Check({
          evaluate() {
            return 'foo';
          }
        });
        check.configure({
          evaluate() {
            return 'fong';
          }
        });
        assert.equal('fong', check.test());
        delete Check.prototype.test;
      });
      it('should override after as a function', () => {
        Check.prototype.test = function () {
          return this.after();
        };
        const check = new Check({
          after() {
            return 'foo';
          }
        });
        check.configure({
          after() {
            return 'fong';
          }
        });
        assert.equal('fong', check.test());
        delete Check.prototype.test;
      });
      it('should override evaluate as ID', () => {
        metadataFunctionMap['custom-evaluate'] = () => {
          return 'fong';
        };

        Check.prototype.test = function () {
          return this.evaluate();
        };
        const check = new Check({
          evaluate: 'function () { return "foo"; }'
        });
        check.configure({ evaluate: 'custom-evaluate' });
        assert.equal('fong', check.test());
        delete Check.prototype.test;
        delete metadataFunctionMap['custom-evaluate'];
      });
      it('should override after as ID', () => {
        metadataFunctionMap['custom-after'] = () => {
          return 'fong';
        };

        Check.prototype.test = function () {
          return this.after();
        };
        const check = new Check({
          after: 'function () { return "foo"; }'
        });
        check.configure({ after: 'custom-after' });
        assert.equal('fong', check.test());
        delete Check.prototype.test;
        delete metadataFunctionMap['custom-after'];
      });
      it('should error if evaluate does not match an ID', () => {
        function fn() {
          const check = new Check({});
          check.configure({ evaluate: 'does-not-exist' });
        }

        assert.throws(
          fn,
          'Function ID does not exist in the metadata-function-map: does-not-exist'
        );
      });
      it('should error if after does not match an ID', () => {
        function fn() {
          const check = new Check({});
          check.configure({ after: 'does-not-exist' });
        }

        assert.throws(
          fn,
          'Function ID does not exist in the metadata-function-map: does-not-exist'
        );
      });
      it('should override enabled', () => {
        Check.prototype.test = function () {
          return this.enabled;
        };
        const check = new Check({
          enabled: true
        });
        check.configure({ enabled: false });
        assert.equal(false, check.test());
        delete Check.prototype.test;
      });
      it('should NOT override id', () => {
        Check.prototype.test = function () {
          return this.id;
        };
        const check = new Check({
          id: 'fong'
        });
        check.configure({ id: 'foo' });
        assert.equal('fong', check.test());
        delete Check.prototype.test;
      });
      it('should NOT override any random property', () => {
        Check.prototype.test = function () {
          return this.random;
        };
        const check = new Check({});
        check.configure({ random: 'foo' });
        assert.equal(undefined, check.test());
        delete Check.prototype.test;
      });
    });

    describe('run', () => {
      it('should accept 5 parameters', () => {
        assert.lengthOf(new Check({}).run, 5);
      });

      it('should pass the node through', done => {
        new Check({
          evaluate(node) {
            assert.equal(node, fixture);
            done();
          }
        }).run(axe.utils.getFlattenedTree(fixture)[0], {}, {}, noop);
      });

      it('should pass the options through', done => {
        const expected = { monkeys: 'bananas' };

        new Check({
          options: expected,
          evaluate(node, options) {
            assert.deepEqual(options, expected);
            done();
          }
        }).run(fixture, {}, {}, noop);
      });

      it('should pass the options through modified by the ones passed into the call', done => {
        const configured = { monkeys: 'bananas' },
          expected = { monkeys: 'bananas', dogs: 'cats' };

        new Check({
          options: configured,
          evaluate(node, options) {
            assert.deepEqual(options, expected);
            done();
          }
        }).run(fixture, { options: expected }, {}, noop);
      });

      it('should normalize non-object options for internal checks', done => {
        metadataFunctionMap['custom-check'] = function (node, options) {
          assert.deepEqual(options, { value: 'foo' });
          done();
        };
        new Check({
          evaluate: 'custom-check'
        }).run(fixture, { options: 'foo' }, {}, noop);
        delete metadataFunctionMap['custom-check'];
      });

      it('should not normalize non-object options for external checks', done => {
        new Check({
          evaluate(node, options) {
            assert.deepEqual(options, 'foo');
            done();
          }
        }).run(fixture, { options: 'foo' }, {}, noop);
      });

      it('should pass the context through to check evaluate call', done => {
        const configured = {
          cssom: 'yay',
          source: 'this is page source',
          aom: undefined
        };
        new Check({
          options: configured,
          evaluate(node, options, virtualNode, context) {
            assert.property(context, 'cssom');
            assert.deepEqual(context, configured);
            done();
          }
        }).run(fixture, {}, configured, noop);
      });

      it('should pass the virtual node through', done => {
        const tree = axe.utils.getFlattenedTree(fixture);
        new Check({
          evaluate(node, options, virtualNode) {
            assert.equal(virtualNode, tree[0]);
            done();
          }
        }).run(tree[0]);
      });

      it.skip('should bind context to `bindCheckResult`', done => {
        const orig = axe.utils.checkHelper,
          cb = () => {
            return true;
          },
          options = {},
          context = {},
          result = { monkeys: 'bananas' };

        axe.utils.checkHelper = function (checkResult, opts, callback) {
          assert.instanceOf(checkResult, window.CheckResult);
          assert.equal(callback, cb);
          return result;
        };

        new Check({
          evaluate() {
            assert.deepEqual(result, this);
            axe.utils.checkHelper = orig;
            done();
          }
        }).run(fixture, options, context, cb);
      });

      it('should allow for asynchronous checks', done => {
        const data = { monkeys: 'bananas' };
        new Check({
          evaluate() {
            const ready = this.async();
            setTimeout(function () {
              ready(data);
            }, 10);
          }
        }).run(fixture, {}, {}, function (d) {
          assert.instanceOf(d, CheckResult);
          assert.deepEqual(d.result, data);
          done();
        });
      });

      it('should pass `null` as the parameter if not enabled', done => {
        new Check({
          evaluate() {},
          enabled: false
        }).run(fixture, {}, {}, function (data) {
          assert.isNull(data);
          done();
        });
      });

      it('should pass `null` as the parameter if options disable', done => {
        new Check({
          evaluate() {}
        }).run(
          fixture,
          {
            enabled: false
          },
          {},
          function (data) {
            assert.isNull(data);
            done();
          }
        );
      });

      it('passes a result to the resolve argument', done => {
        new Check({
          evaluate() {
            return true;
          }
        }).run(fixture, {}, {}, function (data) {
          assert.instanceOf(data, CheckResult);
          assert.isTrue(data.result);
          done();
        });
      });

      it('should pass errors to the reject argument', done => {
        new Check({
          evaluate() {
            throw new Error('Grenade!');
          }
        }).run(fixture, {}, {}, noop, function (err) {
          assert.instanceOf(err, Error);
          assert.equal(err.message, 'Grenade!');
          done();
        });
      });
    });

    describe('runSync', () => {
      it('should accept 3 parameters', () => {
        assert.lengthOf(new Check({}).runSync, 3);
      });

      it('should pass the node through', () => {
        new Check({
          evaluate(node) {
            assert.equal(node, fixture);
          }
        }).runSync(axe.utils.getFlattenedTree(fixture)[0], {}, {});
      });

      it('should pass the options through', () => {
        const expected = { monkeys: 'bananas' };

        new Check({
          options: expected,
          evaluate(node, options) {
            assert.deepEqual(options, expected);
          }
        }).runSync(fixture, {}, {});
      });

      it('should pass the options through modified by the ones passed into the call', () => {
        const configured = { monkeys: 'bananas' },
          expected = { monkeys: 'bananas', dogs: 'cats' };

        new Check({
          options: configured,
          evaluate(node, options) {
            assert.deepEqual(options, expected);
          }
        }).runSync(fixture, { options: expected }, {});
      });

      it('should normalize non-object options for internal checks', done => {
        metadataFunctionMap['custom-check'] = function (node, options) {
          assert.deepEqual(options, { value: 'foo' });
          done();
        };
        new Check({
          evaluate: 'custom-check'
        }).runSync(fixture, { options: 'foo' }, {});
        delete metadataFunctionMap['custom-check'];
      });

      it('should not normalize non-object options for external checks', done => {
        new Check({
          evaluate(node, options) {
            assert.deepEqual(options, 'foo');
            done();
          }
        }).runSync(fixture, { options: 'foo' }, {});
      });

      it('should pass the context through to check evaluate call', () => {
        const configured = {
          cssom: 'yay',
          source: 'this is page source',
          aom: undefined
        };
        new Check({
          options: configured,
          evaluate(node, options, virtualNode, context) {
            assert.property(context, 'cssom');
            assert.deepEqual(context, configured);
          }
        }).runSync(fixture, {}, configured);
      });

      it('should pass the virtual node through', () => {
        const tree = axe.utils.getFlattenedTree(fixture);
        new Check({
          evaluate(node, options, virtualNode) {
            assert.equal(virtualNode, tree[0]);
          }
        }).runSync(tree[0]);
      });

      it('should throw error for asynchronous checks', () => {
        const data = { monkeys: 'bananas' };

        try {
          new Check({
            evaluate() {
              const ready = this.async();
              setTimeout(function () {
                ready(data);
              }, 10);
            }
          }).runSync(fixture, {}, {});
        } catch (err) {
          assert.instanceOf(err, Error);
          assert.equal(
            err.message,
            'Cannot run async check while in a synchronous run'
          );
        }
      });

      it('should pass `null` as the parameter if not enabled', () => {
        const data = new Check({
          evaluate() {},
          enabled: false
        }).runSync(fixture, {}, {});

        assert.isNull(data);
      });

      it('should pass `null` as the parameter if options disable', () => {
        const data = new Check({
          evaluate() {}
        }).runSync(
          fixture,
          {
            enabled: false
          },
          {}
        );
        assert.isNull(data);
      });

      it('passes a result to the resolve argument', () => {
        const data = new Check({
          evaluate() {
            return true;
          }
        }).runSync(fixture, {}, {});
        assert.instanceOf(data, CheckResult);
        assert.isTrue(data.result);
      });

      it('should throw errors', () => {
        try {
          new Check({
            evaluate() {
              throw new Error('Grenade!');
            }
          }).runSync(fixture, {}, {});
        } catch (err) {
          assert.instanceOf(err, Error);
          assert.equal(err.message, 'Grenade!');
        }
      });
    });

    describe('getOptions', () => {
      let check;
      beforeEach(function () {
        check = new Check({
          options: {
            foo: 'bar'
          }
        });
      });

      it('should return default check options', () => {
        assert.deepEqual(check.getOptions(), { foo: 'bar' });
      });

      it('should merge options with Check defaults', () => {
        const options = check.getOptions({ hello: 'world' });
        assert.deepEqual(options, { foo: 'bar', hello: 'world' });
      });

      it('should override defaults', () => {
        const options = check.getOptions({ foo: 'world' });
        assert.deepEqual(options, { foo: 'world' });
      });

      it('should normalize passed in options', () => {
        const options = check.getOptions('world');
        assert.deepEqual(options, { foo: 'bar', value: 'world' });
      });
    });
  });

  describe('spec object', () => {
    describe('.id', () => {
      it('should be set', () => {
        const spec = {
          id: 'monkeys'
        };
        assert.equal(new Check(spec).id, spec.id);
      });

      it('should have no default', () => {
        const spec = {};
        assert.equal(new Check(spec).id, spec.id);
      });
    });

    describe('.after', () => {
      it('should be set', () => {
        const spec = {
          after() {}
        };
        assert.equal(new Check(spec).after, spec.after);
      });

      it('should have no default', () => {
        const spec = {};
        assert.equal(new Check(spec).after, spec.after);
      });

      it('should be able to take a string and turn it into a function', () => {
        const spec = {
          after: 'function () {return "blah";}'
        };
        assert.equal(typeof new Check(spec).after, 'function');
        assert.equal(new Check(spec).after(), 'blah');
      });
    });

    describe('.options', () => {
      it('should be set', () => {
        const spec = {
          options: { value: ['monkeys', 'bananas'] }
        };
        assert.equal(new Check(spec).options, spec.options);
      });

      it('should have no default', () => {
        const spec = {};
        assert.equal(new Check(spec).options, spec.options);
      });

      it('should normalize non-object options for internal checks', () => {
        const spec = {
          options: 'foo'
        };
        assert.deepEqual(new Check(spec).options, { value: 'foo' });
      });

      it('should not normalize non-object options for external checks', () => {
        const spec = {
          options: 'foo',
          evaluate() {}
        };
        assert.deepEqual(new Check(spec).options, 'foo');
      });
    });

    describe('.evaluate', () => {
      it('should be set', () => {
        const spec = {
          evaluate() {}
        };
        assert.equal(typeof new Check(spec).evaluate, 'function');
        assert.equal(new Check(spec).evaluate, spec.evaluate);
      });
      it('should turn a string into a function', () => {
        const spec = {
          evaluate: 'function () { return "blah";}'
        };
        assert.equal(typeof new Check(spec).evaluate, 'function');
        assert.equal(new Check(spec).evaluate(), 'blah');
      });
    });
  });
});
