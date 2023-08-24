describe('aria-conditional-attr', () => {
  const { checkSetup, getCheckEvaluate } = axe.testUtils;
  const checkContext = axe.testUtils.MockCheckContext();
  const ariaConditionalCheck = getCheckEvaluate('aria-conditional-attr');

  afterEach(() => {
    checkContext.reset();
  });

  it('is true for non-conditional roles', () => {
    const roles = ['main', 'button', 'radiogroup', 'tree', 'none'];
    for (const role of roles) {
      const params = checkSetup(`<div id="target" role="${role}"></div>`);
      assert.isTrue(ariaConditionalCheck.apply(checkContext, params));
    }
  });

  describe('ariaConditionalRoleAttr', () => {
    const treeGridRowProps = [
      'aria-posinset="1"',
      'aria-setsize="1"',
      'aria-expanded="true"',
      'aria-level="1"'
    ];

    it('returns true when valid ARIA props are used on table', () => {
      const params = checkSetup(
        `<div role="treegrid">
          <div id="target" role="row" aria-rowindex="1" aria-label="hello world"></div>
        </div>`
      );
      assert.isTrue(ariaConditionalCheck.apply(checkContext, params));
      assert.isNull(checkContext._data);
    });

    it('returns true when treegrid row props are used on a treegrid row', () => {
      const params = checkSetup(
        `<div role="treegrid">
          <div id="target" role="row" ${treeGridRowProps.join(' ')}></div>
        </div>`
      );
      assert.isTrue(ariaConditionalCheck.apply(checkContext, params));
      assert.isNull(checkContext._data);
    });

    it('returns true when the row is not in a table, grid, or treegrid', () => {
      const params = checkSetup(
        `<div id="target" role="row" ${treeGridRowProps.join(' ')}></div>`
      );
      assert.isTrue(ariaConditionalCheck.apply(checkContext, params));
      assert.isNull(checkContext._data);
    });

    it('returns false when treegrid row props are used on an ARIA table row', () => {
      for (const prop of treeGridRowProps) {
        const params = checkSetup(
          `<div role="table">
            <div id="target" role="row" ${prop}></div>
          </div>`
        );
        assert.isFalse(ariaConditionalCheck.apply(checkContext, params));
        assert.deepEqual(checkContext._data, {
          messageKey: 'rowSingular',
          invalidAttrs: [prop.split('=')[0]],
          ownerRole: 'table'
        });
      }
    });

    it('returns false when treegrid row props are used on a grid row', () => {
      for (const prop of treeGridRowProps) {
        const params = checkSetup(
          `<div role="grid">
            <div id="target" role="row" ${prop}></div>
          </div>`
        );
        assert.isFalse(ariaConditionalCheck.apply(checkContext, params));
        assert.deepEqual(checkContext._data, {
          messageKey: 'rowSingular',
          invalidAttrs: [prop.split('=')[0]],
          ownerRole: 'grid'
        });
      }
    });

    it('returns false when treegrid row props are used on a native table row', () => {
      for (const prop of treeGridRowProps) {
        const params = checkSetup(
          `<table> <tr id="target" ${prop}> <td></td> </tr> </table>`
        );
        assert.isFalse(ariaConditionalCheck.apply(checkContext, params));
        assert.deepEqual(checkContext._data, {
          messageKey: 'rowSingular',
          invalidAttrs: [prop.split('=')[0]],
          ownerRole: 'table'
        });
      }
    });

    it('sets messageKey to rowPlural with multiple bad attributes', () => {
      const params = checkSetup(
        `<div role="table">
          <div id="target" role="row" aria-expanded="false" aria-level="1"></div>
        </div>`
      );
      assert.isFalse(ariaConditionalCheck.apply(checkContext, params));
      assert.deepEqual(checkContext._data, {
        messageKey: 'rowPlural',
        invalidAttrs: ['aria-expanded', 'aria-level'],
        ownerRole: 'table'
      });
    });

    describe('options.invalidTableRowAttrs', function () {
      it('returns false for removed attribute', () => {
        const options = { invalidTableRowAttrs: ['aria-rowindex'] };
        const params = checkSetup(
          `<table> <tr id="target" aria-rowindex="1"> <td></td> </tr> </table>`,
          options
        );
        assert.isFalse(ariaConditionalCheck.apply(checkContext, params));
      });

      it('returns true for additional attribute', () => {
        const options = { invalidTableRowAttrs: ['aria-level'] };
        const params = checkSetup(
          `<table>
            <tr id="target" aria-expanded="true" aria-setsize="1" aria-posinset="1"> <td></td> </tr>
          </table>`,
          options
        );
        assert.isTrue(ariaConditionalCheck.apply(checkContext, params));
      });
    });
  });

  describe('ariaConditionalCheckboxAttr', () => {
    it('returns true for non-native checkbox', () => {
      const params = checkSetup(
        `<div id="target" role="checkbox" aria-checked="true"></div>`
      );
      assert.isTrue(ariaConditionalCheck.apply(checkContext, params));
      assert.isNull(checkContext._data);
    });

    it('returns true for checkbox without aria-checked value', () => {
      for (const prop of ['', 'aria-checked', 'aria-checked=""']) {
        const params = checkSetup(
          `<input id="target" type="checkbox" ${prop}>`
        );
        assert.isTrue(ariaConditionalCheck.apply(checkContext, params));
        assert.isNull(checkContext._data);
      }
    });

    describe('checked state', () => {
      const fixture = document.querySelector('#fixture');

      it('returns true for aria-checked="true" on a [checked] checkbox', () => {
        fixture.innerHTML = `<input type="checkbox" aria-checked="true" checked>`;
        const root = axe.setup(fixture);
        const vNode = axe.utils.querySelectorAll(root, 'input')[0];

        assert.isTrue(
          ariaConditionalCheck.call(checkContext, null, null, vNode)
        );
        assert.isNull(checkContext._data);
      });

      it('returns true for aria-checked="true" on a clicked checkbox', () => {
        fixture.innerHTML = `<input type="checkbox" aria-checked="true">`;
        fixture.firstChild.click(); // set checked state
        const root = axe.setup(fixture);
        const vNode = axe.utils.querySelectorAll(root, 'input')[0];

        assert.isTrue(
          ariaConditionalCheck.call(checkContext, null, null, vNode)
        );
        assert.isNull(checkContext._data);
      });

      it('returns false for other aria-checked values', () => {
        for (const prop of ['  ', 'false', 'mixed', 'incorrect', '  true  ']) {
          const params = checkSetup(
            `<input type="checkbox" aria-checked="${prop}" checked id="target">`
          );
          assert.isFalse(ariaConditionalCheck.apply(checkContext, params));
          assert.deepEqual(checkContext._data, {
            messageKey: 'checkbox',
            checkState: 'true'
          });
        }
      });
    });

    describe('unchecked state', () => {
      it('returns true for aria-checked="false"', () => {
        const params = checkSetup(
          `<input id="target" type="checkbox" aria-checked="false">`
        );
        assert.isTrue(ariaConditionalCheck.apply(checkContext, params));
        assert.isNull(checkContext._data);
      });

      it('returns true for aria-checked with an invalid value', () => {
        for (const prop of ['  ', 'invalid', 'FALSE', 'nope']) {
          const params = checkSetup(
            `<input type="checkbox" aria-checked="${prop}" id="target">`
          );
          assert.isTrue(ariaConditionalCheck.apply(checkContext, params));
          assert.isNull(checkContext._data);
        }
      });

      it('returns false for other aria-checked values', () => {
        for (const prop of ['true', 'TRUE', 'mixed', 'MiXeD']) {
          const params = checkSetup(
            `<input type="checkbox" aria-checked="${prop}" id="target">`
          );
          assert.isFalse(ariaConditionalCheck.apply(checkContext, params));
          assert.deepEqual(checkContext._data, {
            messageKey: 'checkbox',
            checkState: 'false'
          });
        }
      });
    });

    describe('indeterminate state', () => {
      function asIndeterminateVirtualNode(html) {
        const fixture = document.querySelector('#fixture');
        fixture.innerHTML = html;
        fixture.querySelector('input').indeterminate = true;
        const root = axe.setup(fixture);
        return axe.utils.querySelectorAll(root, 'input')[0];
      }

      it('returns true for aria-checked="mixed"', () => {
        const vNode = asIndeterminateVirtualNode(
          `<input type="checkbox" aria-checked="mixed">`
        );
        assert.isTrue(
          ariaConditionalCheck.call(checkContext, null, null, vNode)
        );
      });

      it('returns false for other aria-checked values', () => {
        for (const prop of ['true', 'TRUE', 'false', 'invalid']) {
          const vNode = asIndeterminateVirtualNode(
            `<input type="checkbox" aria-checked="${prop}" id="target">`
          );
          assert.isFalse(
            ariaConditionalCheck.call(checkContext, null, null, vNode)
          );
          assert.deepEqual(checkContext._data, {
            messageKey: 'checkbox',
            checkState: 'mixed'
          });
          axe.teardown(); // Reset for the next iteration
        }
      });
    });
  });
});
