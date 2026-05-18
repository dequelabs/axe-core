describe('externalAPIs', () => {
  const externalAPIs = axe.externalAPIs;
  const { external, resetExternal } = axe._thisWillBeDeletedDoNotUse.public;
  const { html, queryShadowFixture } = axe.testUtils;
  const { getNodeFromTree } = axe.utils;
  const isNotCalled = err => {
    throw err || new Error('Reject should not be called');
  };

  describe('elementInternals', () => {
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
      resetExternal();
    });

    it('noops if elementInternals is not passed', () => {
      assert.doesNotThrow(() => {
        externalAPIs();
        externalAPIs({});
      });

      for (const type of [undefined, null]) {
        assert.doesNotThrow(
          () => {
            externalAPIs({ elementInternals: type });
          },
          Error,
          '',
          `"${type}" threw an error`
        );
      }
    });

    it('throws if elementInternals is not a function', () => {
      for (const type of ['1', 0, false, {}, []]) {
        assert.throws(
          () => {
            externalAPIs({ elementInternals: type });
          },
          Error,
          '',
          `"${type}" did not through an error`
        );
      }

      assert.doesNotThrow(() => {
        externalAPIs({ elementInternals() {} });
      });
    });

    it('sets internals on the vNode', done => {
      externalAPIs({
        elementInternals() {
          return Promise.resolve(externalInternals);
        }
      });

      external.elementInternals(() => {
        try {
          const node = document.querySelector('testutils-element');
          const vNode = getNodeFromTree(node);

          const internals = vNode.elementInternals;
          assert.ok(internals);
          assert.equal(internals.role, 'heading');

          const shadowInternals = shadowVNode.elementInternals;
          assert.ok(shadowInternals);
          assert.equal(shadowInternals.role, 'input');

          done();
        } catch (err) {
          done(err);
        }
      }, isNotCalled);
    });

    it('converts idref ancestry to HTMLElement', done => {
      externalAPIs({
        elementInternals() {
          return Promise.resolve(externalInternals);
        }
      });

      external.elementInternals(() => {
        try {
          const node = document.querySelector('testutils-element');
          const activeDesc = document.querySelector('testutils-element > div');
          const vNode = getNodeFromTree(node);

          const internals = vNode.elementInternals;
          assert.equal(internals.ariaActiveDescendantElement, activeDesc);

          done();
        } catch (err) {
          done(err);
        }
      }, isNotCalled);
    });

    it('converts idrefs ancestry to NodeList', done => {
      externalAPIs({
        elementInternals() {
          return Promise.resolve(externalInternals);
        }
      });

      external.elementInternals(() => {
        try {
          const node = document.querySelector('testutils-element');
          const label = document.querySelector('#label');
          const vNode = getNodeFromTree(node);

          const internals = vNode.elementInternals;
          assert.deepEqual(internals.ariaLabelledbyElements, [label]);

          done();
        } catch (err) {
          done(err);
        }
      }, isNotCalled);
    });

    it('timesout if elementInternals function does not return in time', done => {
      externalAPIs({
        elementInternals() {
          return new Promise(res => {
            setTimeout(res, 1500);
          });
        }
      });

      external.elementInternals(
        () => {
          done(new Error('Did not time out'));
        },
        err => {
          try {
            assert.isTrue(err.message.includes('Timeout'));
            done();
          } catch (error) {
            done(error);
          }
        }
      );
    });

    it('allows configuring the timeout time', done => {
      externalAPIs({
        elementInternalsTimeout: 250,
        elementInternals() {
          return new Promise(res => {
            setTimeout(res, 500);
          });
        }
      });

      external.elementInternals(
        () => {
          done(new Error('Did not time out'));
        },
        err => {
          try {
            assert.isTrue(err.message.includes('Timeout'));
            done();
          } catch (error) {
            done(error);
          }
        }
      );
    });

    it('forwards rejection if elementInternals rejects', done => {
      externalAPIs({
        elementInternals() {
          return Promise.reject(new Error('boom!'));
        }
      });

      external.elementInternals(
        () => {
          done(new Error('Did not throw'));
        },
        err => {
          try {
            assert.isTrue(err.message.includes('boom'));
            done();
          } catch (error) {
            done(error);
          }
        }
      );
    });

    it('does not error if the resolved value is not an array', async () => {
      for (const type of ['1', 1, false, null, () => {}, {}]) {
        externalAPIs({
          elementInternals() {
            return Promise.resolve(type);
          }
        });

        await external.elementInternals(() => {}, isNotCalled);
      }
    });

    it('does not error if internals property is missing', done => {
      externalAPIs({
        elementInternals() {
          return Promise.resolve([
            {
              ancestry: 'testutils-element'
            }
          ]);
        }
      });

      external.elementInternals(() => {
        done();
      }, isNotCalled);
    });

    it('does not error if internals property is not an object', async () => {
      for (const type of ['1', 1, false, null, () => {}]) {
        externalAPIs({
          elementInternals() {
            return Promise.resolve([
              {
                ancestry: 'testutils-element',
                internals: type
              }
            ]);
          }
        });

        await external.elementInternals(() => {}, isNotCalled);
      }
    });

    it('does not error if ancestry is not a string or array', async () => {
      for (const type of [1, false, null, () => {}, {}]) {
        externalAPIs({
          elementInternals() {
            return Promise.resolve([
              {
                ancestry: type,
                internals: {}
              }
            ]);
          }
        });

        await external.elementInternals(() => {}, isNotCalled);
      }
    });

    it('does not error if it cannot find the ancestry node', done => {
      externalAPIs({
        elementInternals() {
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

      external.elementInternals(() => {
        done();
      }, isNotCalled);
    });
  });
});
