describe('forms.isAriaTextbox', function () {
  'use strict';
  var isAriaTextbox = axe.commons.forms.isAriaTextbox;
  var flatTreeSetup = axe.testUtils.flatTreeSetup;

  it('returns true for an element with role=textbox', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'textbox');
    flatTreeSetup(node);
    assert.isTrue(isAriaTextbox(node));
  });

  it('returns false for elements without role', function () {
    var node = document.createElement('div');
    flatTreeSetup(node);
    assert.isFalse(isAriaTextbox(node));
  });

  it('returns false for elements with incorrect role', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'main');
    flatTreeSetup(node);
    assert.isFalse(isAriaTextbox(node));
  });

  it('returns false for native textbox inputs', function () {
    var node = document.createElement('input');
    node.setAttribute('type', 'text');
    flatTreeSetup(node);
    assert.isFalse(isAriaTextbox(node));
  });
});
