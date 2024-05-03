describe('forms.isAriaListbox', function () {
  'use strict';
  let isAriaListbox = axe.commons.forms.isAriaListbox;
  let flatTreeSetup = axe.testUtils.flatTreeSetup;

  it('returns true for an element with role=listbox', function () {
    let node = document.createElement('div');
    node.setAttribute('role', 'listbox');
    flatTreeSetup(node);
    assert.isTrue(isAriaListbox(node));
  });

  it('returns false for elements without role', function () {
    let node = document.createElement('div');
    flatTreeSetup(node);
    assert.isFalse(isAriaListbox(node));
  });

  it('returns false for elements with incorrect role', function () {
    let node = document.createElement('div');
    node.setAttribute('role', 'main');
    flatTreeSetup(node);
    assert.isFalse(isAriaListbox(node));
  });

  it('returns false for native select', function () {
    let node = document.createElement('select');
    flatTreeSetup(node);
    assert.isFalse(isAriaListbox(node));
  });
});
