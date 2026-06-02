describe('externalAPIs', () => {
  const externalAPIs = axe.externalAPIs;
  const { external } = axe._thisWillBeDeletedDoNotUse.public;
  const { html, queryShadowFixture } = axe.testUtils;
  const { getNodeFromTree } = axe.utils;
  const subLogger = sinon.stub();

  describe('getElementInternals', () => {
    let externalInternals;
    let shadowVNode;

    beforeEach(() => {
      shadowVNode = queryShadowFixture(
        html`
          <testutils-element>
            <div>active child</div>
          </testutils-element>
          <div id="shadow"></div>
          <div id="label">label</div>
        `,
        html` <testutils-element id="target"></testutils-element> `
      );

      externalInternals = [
        {
          ancestry: '#fixture > testutils-element:nth-child(1)',
          internals: {
            role: 'heading',
            ariaLabelledbyElements: {
              type: 'NodeList',
              value: ['#fixture > div:nth-child(3)']
            },
            ariaActiveDescendantElement: {
              type: 'HTMLElement',
              value: '#fixture > testutils-element:nth-child(1) > div'
            }
          }
        },
        {
          ancestry: ['#fixture > div:nth-child(2)', 'testutils-element'],
          internals: {
            role: 'input'
          }
        }
      ];
    });

    afterEach(() => {
      subLogger.resetHistory();
      externalAPIs({
        getElementInternals: null,
        elementInternalsTimeout: null
      });
    });

    it('throws if getElementInternals is not a function', () => {
      for (const type of ['1', 0, false, {}, []]) {
        assert.throws(
          () => {
            externalAPIs({ getElementInternals: type });
          },
          Error,
          '',
          `"${type}" did not throw an error`
        );
      }

      assert.doesNotThrow(() => {
        externalAPIs({ getElementInternals() {} });
      });
    });

    it('sets internals on the vNode', async () => {
      externalAPIs({
        getElementInternals() {
          return Promise.resolve(externalInternals);
        }
      });

      await external.loadElementInternals();

      const node = document.querySelector('testutils-element');
      const vNode = getNodeFromTree(node);

      const internals = vNode.elementInternals;
      assert.ok(internals);
      assert.equal(internals.role, 'heading');

      const shadowInternals = shadowVNode.elementInternals;
      assert.ok(shadowInternals);
      assert.equal(shadowInternals.role, 'input');
    });

    it('converts idref ancestry to HTMLElement', async () => {
      externalAPIs({
        getElementInternals() {
          return Promise.resolve(externalInternals);
        }
      });

      await external.loadElementInternals();

      const node = document.querySelector('testutils-element');
      const activeDesc = document.querySelector('testutils-element > div');
      const vNode = getNodeFromTree(node);

      const internals = vNode.elementInternals;
      assert.equal(internals.ariaActiveDescendantElement, activeDesc);
    });

    it('converts idrefs ancestry to NodeList', async () => {
      externalAPIs({
        getElementInternals() {
          return Promise.resolve(externalInternals);
        }
      });

      await external.loadElementInternals();

      const node = document.querySelector('testutils-element');
      const label = document.querySelector('#label');
      const vNode = getNodeFromTree(node);

      const internals = vNode.elementInternals;
      assert.deepEqual(internals.ariaLabelledbyElements, [label]);
    });

    it('resets getElementInternals if passed null', async () => {
      const stub = sinon.stub().returns(Promise.resolve([]));

      externalAPIs({
        getElementInternals() {
          return stub;
        }
      });

      externalAPIs({ getElementInternals: null });
      await external.loadElementInternals();

      assert.isFalse(stub.called);
    });

    it('timesout if getElementInternals function does not return in time', async () => {
      externalAPIs({
        getElementInternals() {
          return new Promise(res => {
            setTimeout(res, 1500);
          });
        }
      });

      try {
        await external.loadElementInternals();
        throw new Error('Did not time out');
      } catch (err) {
        assert.isTrue(err.message.includes('Timeout'));
      }
    });

    it('allows configuring the timeout time', async () => {
      externalAPIs({
        elementInternalsTimeout: 250,
        getElementInternals() {
          return new Promise(res => {
            setTimeout(res, 500);
          });
        }
      });

      try {
        await external.loadElementInternals();
        throw new Error('Did not time out');
      } catch (err) {
        assert.isTrue(err.message.includes('Timeout'));
      }
    });

    it('resets the timeout if passed null', async () => {
      externalAPIs({
        elementInternalsTimeout: 250,
        getElementInternals() {
          return new Promise(res => {
            setTimeout(res, 500, externalInternals);
          });
        }
      });

      externalAPIs({
        elementInternalsTimeout: null
      });

      await external.loadElementInternals();

      const node = document.querySelector('testutils-element');
      const vNode = getNodeFromTree(node);
      const internals = vNode.elementInternals;
      assert.ok(internals);
      assert.equal(internals.role, 'heading');
    });

    it('forwards rejection if getElementInternals rejects', async () => {
      externalAPIs({
        getElementInternals() {
          return Promise.reject(new Error('boom!'));
        }
      });

      try {
        await external.loadElementInternals();
        throw new Error('Did not throw');
      } catch (err) {
        assert.isTrue(err.message.includes('boom!'));
      }
    });

    it('logs and does not error if the resolved value is not an array', async () => {
      for (const type of ['1', 1, false, null, () => {}, {}]) {
        externalAPIs({
          getElementInternals() {
            return Promise.resolve(type);
          }
        });

        subLogger.resetHistory();
        try {
          await external.loadElementInternals(subLogger);
        } catch (err) {
          throw new Error(`"${type}" threw an error`, { cause: err });
        }

        assert.isTrue(subLogger.called);
        assert.include(subLogger.firstCall.args[0], 'did not return an array');
      }
    });

    it('logs and does not error if resolve value contains non-object items', async () => {
      externalAPIs({
        getElementInternals() {
          return Promise.resolve(['1', 1, false, null, () => {}]);
        }
      });

      await external.loadElementInternals(subLogger);

      assert.isTrue(subLogger.called);
      assert.include(subLogger.firstCall.args[0], 'is not an object');
    });

    it('logs and does not error internals property is missing', async () => {
      externalAPIs({
        getElementInternals() {
          return Promise.resolve([
            {
              ancestry: 'testutils-element'
            }
          ]);
        }
      });

      await external.loadElementInternals(subLogger);

      assert.isTrue(subLogger.called);
      assert.include(subLogger.firstCall.args[0], 'internals is not an object');
    });

    it('logs and does not error if internals property is not an object', async () => {
      for (const type of ['1', 1, false, null, () => {}]) {
        externalAPIs({
          getElementInternals() {
            return Promise.resolve([
              {
                ancestry: 'testutils-element',
                internals: type
              }
            ]);
          }
        });

        subLogger.resetHistory();
        try {
          await external.loadElementInternals(subLogger);
        } catch (err) {
          throw new Error(`"${type}" threw an error`, { cause: err });
        }

        assert.isTrue(subLogger.called);
        assert.include(
          subLogger.firstCall.args[0],
          'internals is not an object'
        );
      }
    });

    it('logs and does not error if ancestry is not a string or array', async () => {
      for (const type of [1, false, null, () => {}, {}]) {
        externalAPIs({
          getElementInternals() {
            return Promise.resolve([
              {
                ancestry: type,
                internals: {}
              }
            ]);
          }
        });

        subLogger.resetHistory();
        try {
          await external.loadElementInternals(subLogger);
        } catch (err) {
          throw new Error(`"${type}" threw an error`, { cause: err });
        }

        assert.isTrue(subLogger.called);
        assert.include(
          subLogger.firstCall.args[0],
          'ancestry is not a string or an array of strings'
        );
      }
    });

    it('logs and does not error if it cannot find the ancestry node', async () => {
      externalAPIs({
        getElementInternals() {
          return Promise.resolve([
            {
              ancestry: 'does-not-exist',
              internals: {
                role: 'button'
              }
            }
          ]);
        }
      });

      await external.loadElementInternals(subLogger);

      assert.isTrue(subLogger.called);
      assert.include(
        subLogger.firstCall.args[0],
        'Unable to locate node using selector'
      );
    });

    it('logs and does not error if internals property is an object without the "type" property', async () => {
      externalAPIs({
        getElementInternals() {
          return Promise.resolve([
            {
              ancestry: '#fixture > testutils-element:nth-child(1)',
              internals: {
                ariaActiveDescendantElement: {
                  value: 'button'
                }
              }
            }
          ]);
        }
      });

      await external.loadElementInternals(subLogger);

      assert.isTrue(subLogger.called);
      assert.include(
        subLogger.firstCall.args[0],
        'is an object but has no "type" property'
      );
    });

    it('logs and does not error if internals property is an object without the "value" property', async () => {
      externalAPIs({
        getElementInternals() {
          return Promise.resolve([
            {
              ancestry: '#fixture > testutils-element:nth-child(1)',
              internals: {
                ariaActiveDescendantElement: {
                  type: 'HTMLElement'
                }
              }
            }
          ]);
        }
      });

      await external.loadElementInternals(subLogger);

      assert.isTrue(subLogger.called);
      assert.include(
        subLogger.firstCall.args[0],
        'is an object but has no "value" property'
      );
    });

    it("sets a getter that throws if it can't find an idref element", async () => {
      externalAPIs({
        getElementInternals() {
          return Promise.resolve([
            {
              ancestry: '#fixture > testutils-element:nth-child(1)',
              internals: {
                ariaActiveDescendantElement: {
                  type: 'HTMLElement',
                  value: 'button'
                }
              }
            }
          ]);
        }
      });

      await external.loadElementInternals();

      const node = document.querySelector('testutils-element');
      const vNode = getNodeFromTree(node);

      const internals = vNode.elementInternals;
      assert.throws(() => {
        internals.ariaActiveDescendantElement;
      }, /Unable to locate node using selector/);
    });

    it("sets a getter that throws if it can't find idrefs elements", async () => {
      externalAPIs({
        getElementInternals() {
          return Promise.resolve([
            {
              ancestry: '#fixture > testutils-element:nth-child(1)',
              internals: {
                ariaLabelledbyElements: {
                  type: 'NodeList',
                  value: ['button']
                }
              }
            }
          ]);
        }
      });

      await external.loadElementInternals();

      const node = document.querySelector('testutils-element');
      const vNode = getNodeFromTree(node);

      const internals = vNode.elementInternals;
      assert.throws(() => {
        internals.ariaLabelledbyElements;
      }, /Unable to locate nodes using selectors/);
    });
  });
});
