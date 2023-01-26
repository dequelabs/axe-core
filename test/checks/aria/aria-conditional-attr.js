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

    it('returns set messageKey to rowPlural with multiple bad attributes', () => {
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

    it('returns true for checkbox without aria-checked', () => {
      const params = checkSetup(`<input id="target" type="checkbox">`);
      assert.isTrue(ariaConditionalCheck.apply(checkContext, params));
      assert.isNull(checkContext._data);
    });

    it('returns false for aria-checked="miXed"', () => {
      const params = checkSetup(
        `<input id="target" type="checkbox" aria-checked="miXed">`
      );
      assert.isFalse(ariaConditionalCheck.apply(checkContext, params));
      assert.deepEqual(checkContext._data, {
        messageKey: 'checkboxMixed'
      });
    });

    it('returns true when aria-checked matches [checked] state', () => {
      const validStates = [
        'aria-checked="True" checked',
        'aria-checked="false"'
      ];
      for (const validState of validStates) {
        const params = checkSetup(
          `<input id="target" type="checkbox" ${validState}>`
        );
        assert.isTrue(ariaConditionalCheck.apply(checkContext, params));
        assert.isNull(checkContext._data);
      }
    });

    it('returns false when aria-checked does not match [checked] state', () => {
      const validStates = [
        'aria-checked="false" checked',
        'aria-checked="true"'
      ];
      for (const validState of validStates) {
        const params = checkSetup(
          `<input id="target" type="checkbox" ${validState}>`
        );
        assert.isFalse(ariaConditionalCheck.apply(checkContext, params));
        assert.deepEqual(checkContext._data, {
          messageKey: 'checkbox'
        });
      }
    });

    it('treats incorrect aria-checked values as false', () => {
      const values = ['', 'nah', 'FALSE'];
      for (const value of values) {
        const params = checkSetup(
          `<input id="target" type="checkbox" aria-checked="${value}">`
        );
        assert.isTrue(ariaConditionalCheck.apply(checkContext, params));
      }
    });
  });
});
