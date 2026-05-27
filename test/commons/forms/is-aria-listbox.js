describe('forms.isAriaListbox', () => {
  const isAriaListbox = axe.commons.forms.isAriaListbox;
  const flatTreeSetup = axe.testUtils.flatTreeSetup;

  it('returns true for an element with role=listbox', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'listbox');
    flatTreeSetup(node);
    assert.isTrue(isAriaListbox(node));
  });

  it('returns false for elements without role', () => {
    const node = document.createElement('div');
    flatTreeSetup(node);
    assert.isFalse(isAriaListbox(node));
  });

  it('returns false for elements with incorrect role', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'main');
    flatTreeSetup(node);
    assert.isFalse(isAriaListbox(node));
  });

  it('returns false for native select', () => {
    const node = document.createElement('select');
    flatTreeSetup(node);
    assert.isFalse(isAriaListbox(node));
  });
});
