describe('forms.isAriaTextbox', function () {
  'use strict';
  let isAriaTextbox = axe.commons.forms.isAriaTextbox;
  let flatTreeSetup = axe.testUtils.flatTreeSetup;

  it('returns true for an element with role=textbox', function () {
    let node = document.createElement('div');
    node.setAttribute('role', 'textbox');
    flatTreeSetup(node);
    assert.isTrue(isAriaTextbox(node));
  });

  it('returns false for elements without role', function () {
    let node = document.createElement('div');
    flatTreeSetup(node);
    assert.isFalse(isAriaTextbox(node));
  });

  it('returns false for elements with incorrect role', function () {
    let node = document.createElement('div');
    node.setAttribute('role', 'main');
    flatTreeSetup(node);
    assert.isFalse(isAriaTextbox(node));
  });

  it('returns false for native textbox inputs', function () {
    let node = document.createElement('input');
    node.setAttribute('type', 'text');
    flatTreeSetup(node);
    assert.isFalse(isAriaTextbox(node));
  });
});
