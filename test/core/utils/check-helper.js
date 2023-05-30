describe('axe.utils.checkHelper', () => {
  const { queryFixture } = axe.testUtils;
  const DqElement = axe.utils.DqElement;
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
      afterEach(() => {
        fixture.innerHTML = '';
      });

      it('should accept NodeList', () => {
        fixture.innerHTML = '<div id="t1"></div><div id="t2"></div>';
        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        helper.relatedNodes(fixture.children);
        assert.lengthOf(target.relatedNodes, 2);
        assert.instanceOf(target.relatedNodes[0], DqElement);
        assert.instanceOf(target.relatedNodes[1], DqElement);
        assert.equal(target.relatedNodes[0].element, fixture.children[0]);
        assert.equal(target.relatedNodes[1].element, fixture.children[1]);
      });

      it('should accept a single Node', () => {
        fixture.innerHTML = '<div id="t1"></div><div id="t2"></div>';
        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        helper.relatedNodes(fixture.firstChild);
        assert.lengthOf(target.relatedNodes, 1);
        assert.instanceOf(target.relatedNodes[0], DqElement);
        assert.equal(target.relatedNodes[0].element, fixture.firstChild);
      });

      it('should accept an Array', () => {
        fixture.innerHTML = '<div id="t1"></div><div id="t2"></div>';
        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        helper.relatedNodes(Array.prototype.slice.call(fixture.children));
        assert.lengthOf(target.relatedNodes, 2);
        assert.instanceOf(target.relatedNodes[0], DqElement);
        assert.instanceOf(target.relatedNodes[1], DqElement);
        assert.equal(target.relatedNodes[0].element, fixture.children[0]);
        assert.equal(target.relatedNodes[1].element, fixture.children[1]);
      });

      it('should accept an array-like Object', () => {
        fixture.innerHTML = '<div id="t1"></div><div id="t2"></div>';
        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        const nodes = {
          0: fixture.children[0],
          1: fixture.children[1],
          length: 2
        };
        helper.relatedNodes(nodes);
        assert.lengthOf(target.relatedNodes, 2);
        assert.instanceOf(target.relatedNodes[0], DqElement);
        assert.instanceOf(target.relatedNodes[1], DqElement);
        assert.equal(target.relatedNodes[0].element, fixture.children[0]);
        assert.equal(target.relatedNodes[1].element, fixture.children[1]);
      });

      it('should accept a VirtualNode', () => {
        const vNode = queryFixture('<a id="target"></a>');
        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        helper.relatedNodes(vNode);
        assert.lengthOf(target.relatedNodes, 1);
        assert.instanceOf(target.relatedNodes[0], DqElement);
        assert.equal(target.relatedNodes[0].element.nodeName, 'A');
      });

      it('should accept an array of VirtualNodes', () => {
        const vNode = queryFixture(`
          <div id="target"><a></a><b></b></div>
        `);
        const target = {};
        const helper = axe.utils.checkHelper(target, noop);
        helper.relatedNodes(vNode.children);
        assert.lengthOf(target.relatedNodes, 2);
        assert.instanceOf(target.relatedNodes[0], DqElement);
        assert.equal(target.relatedNodes[0].element.nodeName, 'A');
        assert.equal(target.relatedNodes[1].element.nodeName, 'B');
      });

      it('should filter out non-nodes', () => {
        const vNode = queryFixture(`
          <div><a id="target"></a><b></b></div>
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
        assert.lengthOf(target.relatedNodes, 2);
        assert.instanceOf(target.relatedNodes[0], DqElement);
        assert.equal(target.relatedNodes[0].element.nodeName, 'A');
        assert.equal(target.relatedNodes[1].element.nodeName, 'B');
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
