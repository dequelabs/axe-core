describe('VirtualNode', () => {
  const VirtualNode = axe.VirtualNode;
  let node;

  beforeEach(() => {
    node = document.createElement('div');
  });

  it('should be a function', () => {
    assert.isFunction(VirtualNode);
  });

  it('should accept three parameters', () => {
    assert.lengthOf(VirtualNode, 3);
  });

  describe('prototype', () => {
    it('should have public properties', () => {
      const parent = {};
      const vNode = new VirtualNode(node, parent, 'foo');

      assert.equal(vNode.shadowId, 'foo');
      assert.typeOf(vNode.children, 'array');
      assert.equal(vNode.actualNode, node);
      assert.equal(vNode.parent, parent);
    });

    it('should abstract Node properties', () => {
      node = document.createElement('input');
      node.id = 'monkeys';
      const vNode = new VirtualNode(node);

      assert.isDefined(vNode.props);
      assert.equal(vNode.props.nodeType, 1);
      assert.equal(vNode.props.nodeName, 'input');
      assert.equal(vNode.props.id, 'monkeys');
      assert.equal(vNode.props.type, 'text');
    });

    for (const [prop, tagName, examplePropValue] of [
      ['value', 'input', 'test value'],
      ['selected', 'option', true],
      ['checked', 'input', true],
      ['indeterminate', 'input', true],
      ['multiple', 'select', true]
    ]) {
      describe(`props.${prop}`, () => {
        it(`should reflect a ${tagName} element's ${prop} property`, () => {
          node = document.createElement(tagName);
          let vNode = new VirtualNode(node);
          assert.equal(vNode.props[prop], '');

          node[prop] = examplePropValue;
          vNode = new VirtualNode(node);
          assert.equal(vNode.props[prop], examplePropValue);
        });

        it('should be undefined for a text node', () => {
          node = document.createTextNode('text content');
          let vNode = new VirtualNode(node);
          assert.equal(vNode.props[prop], undefined);
        });

        // Regression test for #4316
        it(`should be resilient to text node with un-gettable ${prop} property`, () => {
          node = document.createTextNode('text content');
          Object.defineProperty(node, prop, {
            get() {
              throw new Error('Unqueryable value');
            }
          });
          let vNode = new VirtualNode(node);
          assert.throws(() => node[prop]);
          assert.doesNotThrow(() => vNode.props[prop]);
          assert.equal(vNode.props[prop], undefined);
        });
      });
    }

    it('should lowercase type', () => {
      node = document.createElement('input');
      node.setAttribute('type', 'COLOR');
      const vNode = new VirtualNode(node);

      assert.equal(vNode.props.type, 'color');
    });

    it('should default type to text', () => {
      node = document.createElement('input');
      const vNode = new VirtualNode(node);

      assert.equal(vNode.props.type, 'text');
    });

    it('should default type to text if type is invalid', () => {
      node = document.createElement('input');
      node.setAttribute('type', 'woohoo');
      const vNode = new VirtualNode(node);

      assert.equal(vNode.props.type, 'text');
    });

    it('should lowercase nodeName', () => {
      node = {
        nodeName: 'FOOBAR'
      };
      const vNode = new VirtualNode(node);

      assert.equal(vNode.props.nodeName, 'foobar');
    });

    describe('attr', () => {
      it('should return the value of the given attribute', () => {
        node.setAttribute('data-foo', 'bar');
        const vNode = new VirtualNode(node);

        assert.equal(vNode.attr('data-foo'), 'bar');
      });

      it('should return null for text nodes', () => {
        node.textContent = 'hello';
        const vNode = new VirtualNode(node.firstChild);

        assert.isNull(vNode.attr('data-foo'));
      });

      it('should return null if getAttribute is not a function', () => {
        node = {
          nodeName: 'DIV',
          getAttribute: null
        };
        const vNode = new VirtualNode(node);

        assert.isNull(vNode.attr('data-foo'));
      });
    });

    describe('hasAttr', () => {
      it('should return true if the element has the attribute', () => {
        node.setAttribute('foo', 'bar');
        const vNode = new VirtualNode(node);

        assert.isTrue(vNode.hasAttr('foo'));
      });

      it('should return false if the element does not have the attribute', () => {
        const vNode = new VirtualNode(node);

        assert.isFalse(vNode.hasAttr('foo'));
      });

      it('should return false for text nodes', () => {
        node.textContent = 'hello';
        const vNode = new VirtualNode(node.firstChild);

        assert.isFalse(vNode.hasAttr('foo'));
      });

      it('should return false if hasAttribute is not a function', () => {
        node = {
          nodeName: 'DIV',
          hasAttribute: null
        };
        const vNode = new VirtualNode(node);

        assert.isFalse(vNode.hasAttr('foo'));
      });
    });

    describe('attrNames', () => {
      it('should return a list of attribute names', () => {
        node.setAttribute('foo', 'bar');
        const vNode = new VirtualNode(node);

        assert.deepEqual(vNode.attrNames, ['foo']);
      });

      it('should work with clobbered attributes', () => {
        node = document.createElement('form');
        node.setAttribute('id', '123');
        node.innerHTML = '<select name="attributes"></select>';
        const vNode = new VirtualNode(node);

        assert.deepEqual(vNode.attrNames, ['id']);
      });

      it('should return an empty array if there are no attributes', () => {
        const vNode = new VirtualNode(node);
        assert.deepEqual(vNode.attrNames, []);
      });
    });

    describe('nodeIndex', () => {
      it('increments nodeIndex when a parent is passed', () => {
        const vHtml = new VirtualNode({ nodeName: 'html' });
        const vHead = new VirtualNode({ nodeName: 'head' }, vHtml);
        const vTitle = new VirtualNode({ nodeName: 'title' }, vHead);
        const vBody = new VirtualNode({ nodeName: 'body' }, vHtml);

        assert.equal(vHtml.nodeIndex, 0);
        assert.equal(vHead.nodeIndex, 1);
        assert.equal(vTitle.nodeIndex, 2);
        assert.equal(vBody.nodeIndex, 3);
      });

      it('resets nodeIndex when no parent is passed', () => {
        let vHtml = new VirtualNode({ nodeName: 'html' });
        let vHead = new VirtualNode({ nodeName: 'head' }, vHtml);
        assert.equal(vHtml.nodeIndex, 0);
        assert.equal(vHead.nodeIndex, 1);

        vHtml = new VirtualNode({ nodeName: 'html' });
        vHead = new VirtualNode({ nodeName: 'head' }, vHtml);
        assert.equal(vHtml.nodeIndex, 0);
        assert.equal(vHead.nodeIndex, 1);
      });
    });

    describe('checkbox properties', () => {
      it('should reflect the checked property', () => {
        const div = document.createElement('div');
        const vDiv = new VirtualNode(div);
        assert.isUndefined(vDiv.props.checked);

        node = document.createElement('input');
        node.setAttribute('type', 'checkbox');
        const vUnchecked = new VirtualNode(node);
        assert.isFalse(vUnchecked.props.checked);

        node.click();
        const vChecked = new VirtualNode(node);
        assert.equal(vChecked.props.checked, true);
      });

      it('reflects the indeterminate property', () => {
        const div = document.createElement('div');
        const vDiv = new VirtualNode(div);
        assert.isUndefined(vDiv.props.indeterminate);

        node = document.createElement('input');
        node.setAttribute('type', 'checkbox');
        const vUnchecked = new VirtualNode(node);
        assert.isFalse(vUnchecked.props.indeterminate);

        node.indeterminate = true;
        const vIndeterminate = new VirtualNode(node);
        assert.isTrue(vIndeterminate.props.indeterminate);
      });
    });

    describe.skip('isFocusable', () => {
      let commons;

      beforeEach(() => {
        commons = axe.commons = axe.commons;
      });

      afterEach(() => {
        axe.commons = commons;
      });

      it('should call dom.isFocusable', () => {
        let called = false;
        axe.commons = {
          dom: {
            isFocusable: () => {
              called = true;
            }
          }
        };
        const vNode = new VirtualNode(node);
        vNode.isFocusable;

        assert.isTrue(called);
      });

      it('should only call dom.isFocusable once', () => {
        let count = 0;
        axe.commons = {
          dom: {
            isFocusable: () => {
              count++;
            }
          }
        };
        const vNode = new VirtualNode(node);
        vNode.isFocusable;
        vNode.isFocusable;
        vNode.isFocusable;
        assert.equal(count, 1);
      });
    });

    describe.skip('tabbableElements', () => {
      let commons;

      beforeEach(() => {
        commons = axe.commons = axe.commons;
      });

      afterEach(() => {
        axe.commons = commons;
      });

      it('should call dom.getTabbableElements', () => {
        let called = false;
        axe.commons = {
          dom: {
            getTabbableElements: () => {
              called = true;
            }
          }
        };
        const vNode = new VirtualNode(node);
        vNode.tabbableElements;

        assert.isTrue(called);
      });

      it('should only call dom.getTabbableElements once', () => {
        let count = 0;
        axe.commons = {
          dom: {
            getTabbableElements: () => {
              count++;
            }
          }
        };
        const vNode = new VirtualNode(node);
        vNode.tabbableElements;
        vNode.tabbableElements;
        vNode.tabbableElements;
        assert.equal(count, 1);
      });
    });

    describe('getComputedStylePropertyValue', () => {
      let computedStyle;

      beforeEach(() => {
        computedStyle = window.getComputedStyle;
      });

      afterEach(() => {
        window.getComputedStyle = computedStyle;
      });

      it('should call window.getComputedStyle and return the property', () => {
        let called = false;
        window.getComputedStyle = () => {
          called = true;
          return {
            getPropertyValue: () => {
              return 'result';
            }
          };
        };
        const vNode = new VirtualNode(node);
        const result = vNode.getComputedStylePropertyValue('prop');

        assert.isTrue(called);
        assert.equal(result, 'result');
      });

      it('should only call window.getComputedStyle and getPropertyValue once', () => {
        let computedCount = 0;
        let propertyCount = 0;
        window.getComputedStyle = () => {
          computedCount++;
          return {
            getPropertyValue: () => {
              propertyCount++;
            }
          };
        };
        const vNode = new VirtualNode(node);
        vNode.getComputedStylePropertyValue('prop');
        vNode.getComputedStylePropertyValue('prop');
        vNode.getComputedStylePropertyValue('prop');
        assert.equal(computedCount, 1);
        assert.equal(propertyCount, 1);
      });
    });

    describe('clientRects', () => {
      it('should call node.getClientRects', () => {
        let called = false;
        node.getClientRects = () => {
          called = true;
          return [];
        };
        const vNode = new VirtualNode(node);
        vNode.clientRects;

        assert.isTrue(called);
      });

      it('should only call node.getClientRects once', () => {
        let count = 0;
        node.getClientRects = () => {
          count++;
          return [];
        };
        const vNode = new VirtualNode(node);
        vNode.clientRects;
        vNode.clientRects;
        vNode.clientRects;
        assert.equal(count, 1);
      });

      it('should filter out 0 width rects', () => {
        node.getClientRects = () => {
          return [{ width: 10 }, { width: 0 }, { width: 20 }];
        };
        const vNode = new VirtualNode(node);

        assert.deepEqual(vNode.clientRects, [{ width: 10 }, { width: 20 }]);
      });
    });

    describe('boundingClientRect', () => {
      it('should call node.getBoundingClientRect', () => {
        let called = false;
        node.getBoundingClientRect = () => {
          called = true;
        };
        const vNode = new VirtualNode(node);
        vNode.boundingClientRect;

        assert.isTrue(called);
      });

      it('should only call node.getBoundingClientRect once', () => {
        let count = 0;
        node.getBoundingClientRect = () => {
          count++;
        };
        const vNode = new VirtualNode(node);
        vNode.boundingClientRect;
        vNode.boundingClientRect;
        vNode.boundingClientRect;
        assert.equal(count, 1);
      });
    });
  });
});
