describe('isComboboxPopup', () => {
  const { isComboboxPopup } = axe.commons.aria;
  const { queryFixture } = axe.testUtils;

  it('does not match non-popup roles', () => {
    const roles = ['main', 'combobox', 'textbox', 'button'];
    for (const role of roles) {
      const vNode = queryFixture(
        `<div role="combobox" aria-controls="target"></div>
        <div role="${role}" id="target"></div>`
      );
      assert.isFalse(isComboboxPopup(vNode));
    }
  });

  for (const role of ['menu', 'listbox', 'tree', 'grid', 'dialog']) {
    describe(role, () => {
      it('is false when not related to the combobox', () => {
        const vNode = queryFixture(
          `<div role="combobox"></div>
          <div role="${role}" id="target"></div>`
        );
        assert.isFalse(isComboboxPopup(vNode));
      });

      describe('using aria-controls (ARIA 1.2 pattern)', () => {
        it('is true when referenced', () => {
          const vNode = queryFixture(
            `<div role="combobox" aria-controls="target"></div>
            <div role="${role}" id="target"></div>`
          );
          assert.isTrue(isComboboxPopup(vNode));
        });

        it('is false when controlled by a select element', () => {
          const vNode = queryFixture(
            `<select role="combobox" aria-controls="target"></select>
            <div role="${role}" id="target"></div>`
          );
          assert.isFalse(isComboboxPopup(vNode));
        });

        it('is false when not controlled by a combobox', () => {
          const vNode = queryFixture(
            `<div role="button combobox" aria-controls="target"></div>
            <div role="${role}" id="target"></div>`
          );
          assert.isFalse(isComboboxPopup(vNode));
        });
      });

      describe('using parent owned (ARIA 1.1 pattern)', () => {
        it('is true when its a child of the combobox', () => {
          const vNode = queryFixture(
            `<div role="combobox">
              <div role="${role}" id="target"></div>
            </div>`
          );
          assert.isTrue(isComboboxPopup(vNode));
        });

        it('is false when its not a child of a real combobox', () => {
          const vNode = queryFixture(
            `<div role="button combobox">
              <div role="${role}" id="target"></div>
            </div>`
          );
          assert.isFalse(isComboboxPopup(vNode));
        });

        it('is false when its nearest parent with a role is not a combobox', () => {
          const vNode = queryFixture(
            `<div role="combobox">
              <div role="region">
                <div role="${role}" id="target"></div>
              </div>
            </div>`
          );
          assert.isFalse(isComboboxPopup(vNode));
        });

        it('is true when its nearest parent with a role is not a combobox', () => {
          const vNode = queryFixture(
            `<div role="combobox">
              <div>
                <div role="none">
                  <div role="presentation">
                    <div role="${role}" id="target"></div>
                  </div>
                </div>
              </div>
            </div>`
          );
          assert.isTrue(isComboboxPopup(vNode));
        });
      });

      describe('when using aria-owns (ARIA 1.0 pattern)', () => {
        it('is true when referenced', () => {
          const vNode = queryFixture(
            `<div role="combobox" aria-owns="target"></div>
            <div role="${role}" id="target"></div>`
          );
          assert.isTrue(isComboboxPopup(vNode));
        });

        it('is false when owned by a select element', () => {
          const vNode = queryFixture(
            `<select role="combobox" aria-owns="target"></select>
            <div role="${role}" id="target"></div>`
          );
          assert.isFalse(isComboboxPopup(vNode));
        });

        it('is false when not owned by a combobox', () => {
          const vNode = queryFixture(
            `<div role="button combobox" aria-owns="target"></div>
            <div role="${role}" id="target"></div>`
          );
          assert.isFalse(isComboboxPopup(vNode));
        });
      });
    });
  }

  describe('options.popupRoles', () => {
    it('allows custom popup roles', () => {
      const vNode = queryFixture(
        `<div role="combobox" aria-controls="target"></div>
        <div role="button" id="target"></div>`
      );
      assert.isFalse(isComboboxPopup(vNode));
      assert.isTrue(isComboboxPopup(vNode, { popupRoles: ['button'] }));
    });

    it('overrides the default popup roles', () => {
      const vNode = queryFixture(
        `<div role="combobox" aria-controls="target"></div>
        <div role="listbox" id="target"></div>`
      );
      assert.isTrue(isComboboxPopup(vNode));
      assert.isFalse(isComboboxPopup(vNode, { popupRoles: ['button'] }));
    });
  });
});
