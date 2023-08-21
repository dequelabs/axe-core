describe('axe.utils.checkHelper', () => {
  const { queryFixture, fixtureSetup } = axe.testUtils;
  function noop() {}

  it('should be a function', () => {
    assert.isFunction(axe.utils.checkHelper);
  });

  it('should accept 4 named parameters', () => {
    assert.lengthOf(axe.utils.checkHelper, 4);
  });

  it('should return an object', () => {
    assert.isObject(axe.utils.checkHelper());
  });

  describe('return value', () => {
    describe('async', () => {
      it('should set isAsync property on returned object to `true` when called', () => {
        const target = {},
          helper = axe.utils.checkHelper(target, noop);

        helper.async();
        assert.isTrue(helper.isAsync);
      });

      it('should call the third parameter of `axe.utils.checkHelper` when invoked', () => {
        function fn() {
          success = true;
        }
        let success = false;
        const helper = axe.utils.checkHelper({}, {}, fn);

        const done = helper.async();
        done();

        assert.isTrue(success);
      });

      it('should call the fourth parameter of `axe.utils.checkHelper` when returning an error', () => {
        let success = false;
        function reject(e) {
          success = true;
          assert.equal(e.message, 'Concrete donkey!');
        }

        const helper = axe.utils.checkHelper({}, {}, noop, reject);
        const done = helper.async();
        done(new Error('Concrete donkey!'));

        assert.isTrue(success);
      });
    });

    describe('data', () => {
      it('should set data property on target when called', () => {
        const target = {},
          expected = { monkeys: 'bananas' },
          helper = axe.utils.checkHelper(target, noop);

        assert.notProperty(target, 'data');
        helper.data(expected);
        assert.equal(target.data, expected);
      });
    });

    describe('relatedNodes', () => {
      const fixture = document.getElementById('fixture');
      const getSelector = node => node.selector;

      it('returns DqElements', () => {
        fixtureSetup('<div id="t1"></div><div id="t2"></div>');
        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        helper.relatedNodes(fixture.children);
        assert.instanceOf(target.relatedNodes[0], axe.utils.DqElement);
      });

      it('should accept NodeList', () => {
        fixtureSetup('<div id="t1"></div><div id="t2"></div>');
        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        helper.relatedNodes(fixture.children);
        const selectors = target.relatedNodes.map(getSelector);
        assert.deepEqual(selectors, [['#t1'], ['#t2']]);
      });

      it('should accept a single Node', () => {
        fixtureSetup('<div id="t1"></div><div id="t2"></div>');
        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        helper.relatedNodes(fixture.firstChild);
        const selectors = target.relatedNodes.map(getSelector);
        assert.deepEqual(selectors, [['#t1']]);
      });

      it('should accept an Array', () => {
        fixtureSetup('<div id="t1"></div><div id="t2"></div>');

        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        helper.relatedNodes(Array.prototype.slice.call(fixture.children));
        const selectors = target.relatedNodes.map(getSelector);
        assert.deepEqual(selectors, [['#t1'], ['#t2']]);
      });

      it('should accept an array-like Object', () => {
        fixtureSetup('<div id="t1"></div><div id="t2"></div>');
        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        const nodes = {
          0: fixture.children[0],
          1: fixture.children[1],
          length: 2
        };
        helper.relatedNodes(nodes);
        const selectors = target.relatedNodes.map(getSelector);
        assert.deepEqual(selectors, [['#t1'], ['#t2']]);
      });

      it('should accept a VirtualNode', () => {
        const vNode = queryFixture('<a id="target"></a>');
        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        helper.relatedNodes(vNode);
        const selectors = target.relatedNodes.map(getSelector);
        assert.deepEqual(selectors, [['#target']]);
      });

      it('should accept an array of VirtualNodes', () => {
        const vNode = queryFixture(`
          <div id="target"><a id="a"></a><b id="b"></b></div>
        `);
        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        helper.relatedNodes(vNode.children);
        const selectors = target.relatedNodes.map(getSelector);
        assert.deepEqual(selectors, [['#a'], ['#b']]);
      });

      it('should filter out non-nodes', () => {
        const vNode = queryFixture(`
          <div><a id="target"></a><b id="b"></b></div>
        `);
        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        const nodes = [
          null,
          vNode,
          true,
          fixture.querySelector('b'),
          'hello world',
          new axe.SerialVirtualNode({
            nodeName: 's'
          })
        ];
        helper.relatedNodes(nodes);
        const selectors = target.relatedNodes.map(getSelector);
        assert.deepEqual(selectors, [['#target'], ['#b']]);
      });

      it('should noop for non-node-like objects', () => {
        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        const nodes = new axe.SerialVirtualNode({
          nodeName: 'div'
        });
        assert.doesNotThrow(() => {
          helper.relatedNodes(nodes);
        });
        assert.lengthOf(target.relatedNodes, 0);
      });
    });
  });
});
