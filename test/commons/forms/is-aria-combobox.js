describe('forms.isAriaCombobox', () => {
  const isAriaCombobox = axe.commons.forms.isAriaCombobox;
  const flatTreeSetup = axe.testUtils.flatTreeSetup;

  it('returns true for an element with role=combobox', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'combobox');
    flatTreeSetup(node);
    assert.isTrue(isAriaCombobox(node));
  });

  it('returns false for elements without role', () => {
    const node = document.createElement('div');
    flatTreeSetup(node);
    assert.isFalse(isAriaCombobox(node));
  });

  it('returns false for elements with incorrect role', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'main');
    flatTreeSetup(node);
    assert.isFalse(isAriaCombobox(node));
  });
});
