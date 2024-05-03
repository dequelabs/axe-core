describe('forms.isAriaCombobox', function () {
  'use strict';
  let isAriaCombobox = axe.commons.forms.isAriaCombobox;
  let flatTreeSetup = axe.testUtils.flatTreeSetup;

  it('returns true for an element with role=combobox', function () {
    let node = document.createElement('div');
    node.setAttribute('role', 'combobox');
    flatTreeSetup(node);
    assert.isTrue(isAriaCombobox(node));
  });

  it('returns false for elements without role', function () {
    let node = document.createElement('div');
    flatTreeSetup(node);
    assert.isFalse(isAriaCombobox(node));
  });

  it('returns false for elements with incorrect role', function () {
    let node = document.createElement('div');
    node.setAttribute('role', 'main');
    flatTreeSetup(node);
    assert.isFalse(isAriaCombobox(node));
  });
});
