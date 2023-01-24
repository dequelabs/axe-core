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
      it('is true when referenced with aria-controls (WAI-ARIA 1.2)', () => {
        const vNode = queryFixture(
          `<div role="combobox" aria-controls="target"></div>
          <div role="${role}" id="target"></div>`
        );
        assert.isTrue(isComboboxPopup(vNode));
      });

      it('is true when its a child of the combobox (WAI-ARIA 1.1)', () => {
        const vNode = queryFixture(
          `<div role="combobox">
            <div role="${role}" id="target"></div>
          </div>`
        );
        assert.isTrue(isComboboxPopup(vNode));
      });

      it('is true when referenced with aria-owned (WAI-ARIA 1.0)', () => {
        const vNode = queryFixture(
          `<div role="combobox" aria-owns="target"></div>
          <div role="${role}" id="target"></div>`
        );
        assert.isTrue(isComboboxPopup(vNode));
      });

      it('is false when not related to the combobox', () => {
        const vNode = queryFixture(
          `<div role="combobox"></div>
          <div role="${role}" id="target"></div>`
        );
        assert.isFalse(isComboboxPopup(vNode));
      });
    });
  }
});
