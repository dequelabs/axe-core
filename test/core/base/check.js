describe('Check', function () {
  'use strict';

  var Check = axe._thisWillBeDeletedDoNotUse.base.Check;
  var CheckResult = axe._thisWillBeDeletedDoNotUse.base.CheckResult;
  var metadataFunctionMap =
    axe._thisWillBeDeletedDoNotUse.base.metadataFunctionMap;
  var noop = function () {};

  var fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should be a function', function () {
    assert.isFunction(Check);
  });

  describe('prototype', function () {
    describe('enabled', function () {
      it('should be true by default', function () {
        var check = new Check({});
        assert.isTrue(check.enabled);
      });
      it('should be set to whatever is passed in', function () {
        var check = new Check({ enabled: false });
        assert.isFalse(check.enabled);
      });
    });

    describe('configure', function () {
      it('should accept one parameter', function () {
        assert.lengthOf(new Check({}).configure, 1);
      });
      it('should override options', function () {
        Check.prototype.test = function () {
          return this.options;
        };
        var check = new Check({
          options: ['foo']
        });
        check.configure({ options: { value: 'fong' } });
        assert.deepEqual({ value: 'fong' }, check.test());
        delete Check.prototype.test;
      });
      it('should override evaluate', function () {
        Check.prototype.test = function () {
          return this.evaluate();
        };
        var check = new Check({
          evaluate: 'function () { return "foo"; }'
        });
        check.configure({ evaluate: 'function () { return "fong"; }' });
        assert.equal('fong', check.test());
        delete Check.prototype.test;
      });
      it('should override after', function () {
        Check.prototype.test = function () {
          return this.after();
        };
        var check = new Check({
          after: 'function () { return "foo"; }'
        });
        check.configure({ after: 'function () { return "fong"; }' });
        assert.equal('fong', check.test());
        delete Check.prototype.test;
      });
      it('should override evaluate as a function', function () {
        Check.prototype.test = function () {
          return this.evaluate();
        };
        var check = new Check({
          evaluate: function () {
            return 'foo';
          }
        });
        check.configure({
          evaluate: function () {
            return 'fong';
          }
        });
        assert.equal('fong', check.test());
        delete Check.prototype.test;
      });
      it('should override after as a function', function () {
        Check.prototype.test = function () {
          return this.after();
        };
        var check = new Check({
          after: function () {
            return 'foo';
          }
        });
        check.configure({
          after: function () {
            return 'fong';
          }
        });
        assert.equal('fong', check.test());
        delete Check.prototype.test;
      });
      it('should override evaluate as ID', function () {
        metadataFunctionMap['custom-evaluate'] = function () {
          return 'fong';
        };

        Check.prototype.test = function () {
          return this.evaluate();
        };
        var check = new Check({
          evaluate: 'function () { return "foo"; }'
        });
        check.configure({ evaluate: 'custom-evaluate' });
        assert.equal('fong', check.test());
        delete Check.prototype.test;
        delete metadataFunctionMap['custom-evaluate'];
      });
      it('should override after as ID', function () {
        metadataFunctionMap['custom-after'] = function () {
          return 'fong';
        };

        Check.prototype.test = function () {
          return this.after();
        };
        var check = new Check({
          after: 'function () { return "foo"; }'
        });
        check.configure({ after: 'custom-after' });
        assert.equal('fong', check.test());
        delete Check.prototype.test;
        delete metadataFunctionMap['custom-after'];
      });
      it('should error if evaluate does not match an ID', function () {
        function fn() {
          var check = new Check({});
          check.configure({ evaluate: 'does-not-exist' });
        }

        assert.throws(
          fn,
          'Function ID does not exist in the metadata-function-map: does-not-exist'
        );
      });
      it('should error if after does not match an ID', function () {
        function fn() {
          var check = new Check({});
          check.configure({ after: 'does-not-exist' });
        }

        assert.throws(
          fn,
          'Function ID does not exist in the metadata-function-map: does-not-exist'
        );
      });
      it('should override enabled', function () {
        Check.prototype.test = function () {
          return this.enabled;
        };
        var check = new Check({
          enabled: true
        });
        check.configure({ enabled: false });
        assert.equal(false, check.test());
        delete Check.prototype.test;
      });
      it('should NOT override id', function () {
        Check.prototype.test = function () {
          return this.id;
        };
        var check = new Check({
          id: 'fong'
        });
        check.configure({ id: 'foo' });
        assert.equal('fong', check.test());
        delete Check.prototype.test;
      });
      it('should NOT override any random property', function () {
        Check.prototype.test = function () {
          return this.random;
        };
        var check = new Check({});
        check.configure({ random: 'foo' });
        assert.equal(undefined, check.test());
        delete Check.prototype.test;
      });
    });

    describe('run', function () {
      it('should accept 5 parameters', function () {
        assert.lengthOf(new Check({}).run, 5);
      });

      it('should pass the node through', function (done) {
        new Check({
          evaluate: function (node) {
            assert.equal(node, fixture);
            done();
          }
        }).run(axe.utils.getFlattenedTree(fixture)[0], {}, {}, noop);
      });

      it('should pass the options through', function (done) {
        var expected = { monkeys: 'bananas' };

        new Check({
          options: expected,
          evaluate: function (node, options) {
            assert.deepEqual(options, expected);
            done();
          }
        }).run(fixture, {}, {}, noop);
      });

      it('should pass the options through modified by the ones passed into the call', function (done) {
        var configured = { monkeys: 'bananas' },
          expected = { monkeys: 'bananas', dogs: 'cats' };

        new Check({
          options: configured,
          evaluate: function (node, options) {
            assert.deepEqual(options, expected);
            done();
          }
        }).run(fixture, { options: expected }, {}, noop);
      });

      it('should normalize non-object options for internal checks', function (done) {
        metadataFunctionMap['custom-check'] = function (node, options) {
          assert.deepEqual(options, { value: 'foo' });
          done();
        };
        new Check({
          evaluate: 'custom-check'
        }).run(fixture, { options: 'foo' }, {}, noop);
        delete metadataFunctionMap['custom-check'];
      });

      it('should not normalize non-object options for external checks', function (done) {
        new Check({
          evaluate: function (node, options) {
            assert.deepEqual(options, 'foo');
            done();
          }
        }).run(fixture, { options: 'foo' }, {}, noop);
      });

      it('should pass the context through to check evaluate call', function (done) {
        var configured = {
          cssom: 'yay',
          source: 'this is page source',
          aom: undefined
        };
        new Check({
          options: configured,
          evaluate: function (node, options, virtualNode, context) {
            assert.property(context, 'cssom');
            assert.deepEqual(context, configured);
            done();
          }
        }).run(fixture, {}, configured, noop);
      });

      it('should pass the virtual node through', function (done) {
        var tree = axe.utils.getFlattenedTree(fixture);
        new Check({
          evaluate: function (node, options, virtualNode) {
            assert.equal(virtualNode, tree[0]);
            done();
          }
        }).run(tree[0]);
      });

      it.skip('should bind context to `bindCheckResult`', function (done) {
        var orig = axe.utils.checkHelper,
          cb = function () {
            return true;
          },
          options = {},
          context = {},
          result = { monkeys: 'bananas' };

        axe.utils.checkHelper = function (checkResult, options, callback) {
          assert.instanceOf(checkResult, window.CheckResult);
          assert.equal(callback, cb);
          return result;
        };

        new Check({
          evaluate: function () {
            assert.deepEqual(result, this);
            axe.utils.checkHelper = orig;
            done();
          }
        }).run(fixture, options, context, cb);
      });

      it('should allow for asynchronous checks', function (done) {
        var data = { monkeys: 'bananas' };
        new Check({
          evaluate: function () {
            var ready = this.async();
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

      it('should pass `null` as the parameter if not enabled', function (done) {
        new Check({
          evaluate: function () {},
          enabled: false
        }).run(fixture, {}, {}, function (data) {
          assert.isNull(data);
          done();
        });
      });

      it('should pass `null` as the parameter if options disable', function (done) {
        new Check({
          evaluate: function () {}
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

      it('passes a result to the resolve argument', function (done) {
        new Check({
          evaluate: function () {
            return true;
          }
        }).run(fixture, {}, {}, function (data) {
          assert.instanceOf(data, CheckResult);
          assert.isTrue(data.result);
          done();
        });
      });

      it('should pass errors to the reject argument', function (done) {
        new Check({
          evaluate: function () {
            throw new Error('Grenade!');
          }
        }).run(fixture, {}, {}, noop, function (err) {
          assert.instanceOf(err, Error);
          assert.equal(err.message, 'Grenade!');
          done();
        });
      });
    });

    describe('runSync', function () {
      it('should accept 3 parameters', function () {
        assert.lengthOf(new Check({}).runSync, 3);
      });

      it('should pass the node through', function () {
        new Check({
          evaluate: function (node) {
            assert.equal(node, fixture);
          }
        }).runSync(axe.utils.getFlattenedTree(fixture)[0], {}, {});
      });

      it('should pass the options through', function () {
        var expected = { monkeys: 'bananas' };

        new Check({
          options: expected,
          evaluate: function (node, options) {
            assert.deepEqual(options, expected);
          }
        }).runSync(fixture, {}, {});
      });

      it('should pass the options through modified by the ones passed into the call', function () {
        var configured = { monkeys: 'bananas' },
          expected = { monkeys: 'bananas', dogs: 'cats' };

        new Check({
          options: configured,
          evaluate: function (node, options) {
            assert.deepEqual(options, expected);
          }
        }).runSync(fixture, { options: expected }, {});
      });

      it('should normalize non-object options for internal checks', function (done) {
        metadataFunctionMap['custom-check'] = function (node, options) {
          assert.deepEqual(options, { value: 'foo' });
          done();
        };
        new Check({
          evaluate: 'custom-check'
        }).runSync(fixture, { options: 'foo' }, {});
        delete metadataFunctionMap['custom-check'];
      });

      it('should not normalize non-object options for external checks', function (done) {
        new Check({
          evaluate: function (node, options) {
            assert.deepEqual(options, 'foo');
            done();
          }
        }).runSync(fixture, { options: 'foo' }, {});
      });

      it('should pass the context through to check evaluate call', function () {
        var configured = {
          cssom: 'yay',
          source: 'this is page source',
          aom: undefined
        };
        new Check({
          options: configured,
          evaluate: function (node, options, virtualNode, context) {
            assert.property(context, 'cssom');
            assert.deepEqual(context, configured);
          }
        }).runSync(fixture, {}, configured);
      });

      it('should pass the virtual node through', function () {
        var tree = axe.utils.getFlattenedTree(fixture);
        new Check({
          evaluate: function (node, options, virtualNode) {
            assert.equal(virtualNode, tree[0]);
          }
        }).runSync(tree[0]);
      });

      it('should throw error for asynchronous checks', function () {
        var data = { monkeys: 'bananas' };

        try {
          new Check({
            evaluate: function () {
              var ready = this.async();
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

      it('should pass `null` as the parameter if not enabled', function () {
        var data = new Check({
          evaluate: function () {},
          enabled: false
        }).runSync(fixture, {}, {});

        assert.isNull(data);
      });

      it('should pass `null` as the parameter if options disable', function () {
        var data = new Check({
          evaluate: function () {}
        }).runSync(
          fixture,
          {
            enabled: false
          },
          {}
        );
        assert.isNull(data);
      });

      it('passes a result to the resolve argument', function () {
        var data = new Check({
          evaluate: function () {
            return true;
          }
        }).runSync(fixture, {}, {});
        assert.instanceOf(data, CheckResult);
        assert.isTrue(data.result);
      });

      it('should throw errors', function () {
        try {
          new Check({
            evaluate: function () {
              throw new Error('Grenade!');
            }
          }).runSync(fixture, {}, {});
        } catch (err) {
          assert.instanceOf(err, Error);
          assert.equal(err.message, 'Grenade!');
        }
      });
    });

    describe('getOptions', function () {
      var check;
      beforeEach(function () {
        check = new Check({
          options: {
            foo: 'bar'
          }
        });
      });

      it('should return default check options', function () {
        assert.deepEqual(check.getOptions(), { foo: 'bar' });
      });

      it('should merge options with Check defaults', function () {
        var options = check.getOptions({ hello: 'world' });
        assert.deepEqual(options, { foo: 'bar', hello: 'world' });
      });

      it('should override defaults', function () {
        var options = check.getOptions({ foo: 'world' });
        assert.deepEqual(options, { foo: 'world' });
      });

      it('should normalize passed in options', function () {
        var options = check.getOptions('world');
        assert.deepEqual(options, { foo: 'bar', value: 'world' });
      });
    });
  });

  describe('spec object', function () {
    describe('.id', function () {
      it('should be set', function () {
        var spec = {
          id: 'monkeys'
        };
        assert.equal(new Check(spec).id, spec.id);
      });

      it('should have no default', function () {
        var spec = {};
        assert.equal(new Check(spec).id, spec.id);
      });
    });

    describe('.after', function () {
      it('should be set', function () {
        var spec = {
          after: function () {}
        };
        assert.equal(new Check(spec).after, spec.after);
      });

      it('should have no default', function () {
        var spec = {};
        assert.equal(new Check(spec).after, spec.after);
      });

      it('should be able to take a string and turn it into a function', function () {
        var spec = {
          after: 'function () {return "blah";}'
        };
        assert.equal(typeof new Check(spec).after, 'function');
        assert.equal(new Check(spec).after(), 'blah');
      });
    });

    describe('.options', function () {
      it('should be set', function () {
        var spec = {
          options: { value: ['monkeys', 'bananas'] }
        };
        assert.equal(new Check(spec).options, spec.options);
      });

      it('should have no default', function () {
        var spec = {};
        assert.equal(new Check(spec).options, spec.options);
      });

      it('should normalize non-object options for internal checks', function () {
        var spec = {
          options: 'foo'
        };
        assert.deepEqual(new Check(spec).options, { value: 'foo' });
      });

      it('should not normalize non-object options for external checks', function () {
        var spec = {
          options: 'foo',
          evaluate: function () {}
        };
        assert.deepEqual(new Check(spec).options, 'foo');
      });
    });

    describe('.evaluate', function () {
      it('should be set', function () {
        var spec = {
          evaluate: function () {}
        };
        assert.equal(typeof new Check(spec).evaluate, 'function');
        assert.equal(new Check(spec).evaluate, spec.evaluate);
      });
      it('should turn a string into a function', function () {
        var spec = {
          evaluate: 'function () { return "blah";}'
        };
        assert.equal(typeof new Check(spec).evaluate, 'function');
        assert.equal(new Check(spec).evaluate(), 'blah');
      });
    });
  });
});
