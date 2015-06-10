/*global Tool */
describe('Tool', function () {
  'use strict';

  var fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should be a function', function () {
    assert.isFunction(Tool);
  });

  it('should default active to false', function () {
    var tool = new Tool({});
    assert.isFalse(tool.active);
  });

  describe('prototype', function () {
    describe('run', function () {
      it('should be a function', function () {
        assert.isFunction(Tool.prototype.run);
      });

      it('should set active to true', function () {
        var tool = new Tool({
          source: {
            run: function () {}
          }
        });
        tool.run(null, null, function () {
          assert.isTrue(tool.active);
        });
      });

      it('should call `run` as defined on spec object', function () {
        var div = document.createElement('div');
        fixture.appendChild(div);
        var expectedCb = function () {};
        var called = false;

        var tool = new Tool({
          source: {
            run: function (node, options, callback) {
              assert.equal(node, div);
              assert.equal(options, 'monkeys');
              assert.equal(callback, expectedCb);
              called = true;
            }
          }
        });

        tool.run(div, 'monkeys', expectedCb);
        assert.isTrue(called);
      });
    });
    describe('cleanup', function () {
      it('should be a function', function () {
        assert.isFunction(Tool.prototype.cleanup);
      });

      it('should set active to false', function () {
        var tool = new Tool({
          source: {
            cleanup: function () {}
          }
        });
        tool.active = true;
        tool.cleanup(function () {});
        assert.isFalse(tool.active);
      });

      it('should call `cleanup` as defined on spec object', function () {
        var expectedCb = function () {};
        var called = false;

        var tool = new Tool({
          source: {
            cleanup: function (callback) {
              assert.equal(callback, expectedCb);
              called = true;
            }
          }
        });

        tool.cleanup(expectedCb);
        assert.isTrue(called);
      });
    });
  });


  describe('spec object', function () {

    describe('.id', function () {
      it('should be set', function () {
        var spec = {
          id: 'monkeys'
        };
        assert.equal(new Tool(spec).id, spec.id);
      });

      it('should have no default', function () {
        var spec = {};
        assert.equal(new Tool(spec).id, spec.id);

      });

    });


    describe('.options', function () {
      it('should be set', function () {
        var spec = {
          options: ['monkeys', 'bananas']
        };
        assert.equal(new Tool(spec).options, spec.options);
      });

      it('should have no default', function () {
        var spec = {};
        assert.equal(new Tool(spec).options, spec.options);

      });

    });

  });
});
