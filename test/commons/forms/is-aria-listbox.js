describe('forms.isAriaListbox', function () {
  'use strict';
  var isAriaListbox = axe.commons.forms.isAriaListbox;
  var flatTreeSetup = axe.testUtils.flatTreeSetup;

  it('returns true for an element with role=listbox', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'listbox');
    flatTreeSetup(node);
    assert.isTrue(isAriaListbox(node));
  });

  it('returns false for elements without role', function () {
    var node = document.createElement('div');
    flatTreeSetup(node);
    assert.isFalse(isAriaListbox(node));
  });

  it('returns false for elements with incorrect role', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'main');
    flatTreeSetup(node);
    assert.isFalse(isAriaListbox(node));
  });

  it('returns false for native select', function () {
    var node = document.createElement('select');
    flatTreeSetup(node);
    assert.isFalse(isAriaListbox(node));
  });
});
