describe('forms.isAriaRange', function () {
  'use strict';
  let isAriaRange = axe.commons.forms.isAriaRange;
  let flatTreeSetup = axe.testUtils.flatTreeSetup;

  it('returns true for an element with range roles', function () {
    let rangeRoles = ['progressbar', 'scrollbar', 'slider', 'spinbutton'];
    rangeRoles.forEach(function (role) {
      let node = document.createElement('div');
      node.setAttribute('role', role);
      node.setAttribute('aria-valuenow', '0');
      flatTreeSetup(node);
      assert.isTrue(
        isAriaRange(node),
        'role="' + role + '" is not an aria range role'
      );
    });
  });

  it('returns false for elements without role', function () {
    let node = document.createElement('div');
    flatTreeSetup(node);
    assert.isFalse(isAriaRange(node));
  });

  it('returns false for elements with incorrect role', function () {
    let node = document.createElement('div');
    node.setAttribute('role', 'main');
    flatTreeSetup(node);
    assert.isFalse(isAriaRange(node));
  });

  it('returns false for native range elements', function () {
    let nativeRangeElements = [
      {
        nodeName: 'progress'
      },
      {
        nodeName: 'input',
        type: 'range'
      },
      {
        nodeName: 'input',
        type: 'number'
      }
    ];
    nativeRangeElements.forEach(function (elm) {
      let node = document.createElement(elm.nodeName);
      if (elm.type) {
        node.setAttribute('type', elm.type);
      }
      flatTreeSetup(node);
      assert.isFalse(
        isAriaRange(node),
        node.outterHTML + ' is not an aria range element'
      );
    });
  });
});
