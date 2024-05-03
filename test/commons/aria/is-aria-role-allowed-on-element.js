describe('aria.isAriaRoleAllowedOnElement', function () {
  'use strict';
  let flatTreeSetup = axe.testUtils.flatTreeSetup;

  it('returns true for SECTION with role alert', function () {
    let node = document.createElement('section');
    let role = 'alert';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    let actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, role);
    let expected = true;
    assert.equal(actual, expected);
  });

  it('returns false for SECTION with role checkbox', function () {
    let node = document.createElement('section');
    let role = 'checkbox';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    let actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, role);
    let expected = false;
    assert.equal(actual, expected);
  });

  it('returns true for SVG with role alertdialog', function () {
    let node = document.createElement('svg');
    let role = 'alertdialog';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true for OBJECT with role application', function () {
    let node = document.createElement('object');
    let role = 'application';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    let actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, role);
    assert.isTrue(actual);
  });

  it('returns false for A with role button', function () {
    let node = document.createElement('a');
    let role = 'button';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns false for ARTICLE with role cell', function () {
    let node = document.createElement('article');
    let role = 'cell';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isFalse(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true for BUTTON with role checkbox', function () {
    let node = document.createElement('button');
    let role = 'checkbox';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true for IFRAME with role document', function () {
    let node = document.createElement('iframe');
    let role = 'document';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true for ASIDE with role feed', function () {
    let node = document.createElement('aside');
    let role = 'feed';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true for FIGURE with role group', function () {
    let node = document.createElement('figure');
    let role = 'group';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true for SVG with role img', function () {
    let node = document.createElement('svg');
    let role = 'img';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true for INPUT with type image and role link', function () {
    let node = document.createElement('input');
    let role = 'link';
    node.setAttribute('role', role);
    node.setAttribute('type', 'image');
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true for HEADER with role none', function () {
    let node = document.createElement('header');
    let role = 'none';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true for LI with role option', function () {
    let node = document.createElement('li');
    let role = 'option';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true for H1 with role tab', function () {
    let node = document.createElement('h1');
    let role = 'tab';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true for OL with role tablist', function () {
    let node = document.createElement('ol');
    let role = 'tablist';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true when A has namespace as svg and role menuitem', function () {
    let node = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    flatTreeSetup(node);
    assert.isTrue(
      axe.commons.aria.isAriaRoleAllowedOnElement(node, 'menuitem')
    );
  });

  it('returns true when BUTTON has type menu and role as menuitem', function () {
    let node = document.createElement('button');
    let role = 'menuitem';
    node.setAttribute('type', 'menu');
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns false when MENU has type context and role navigation', function () {
    let node = document.createElement('menu');
    let role = 'navigation';
    node.setAttribute('type', 'context');
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isFalse(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true when B has role navigation', function () {
    let node = document.createElement('b');
    let role = 'navigation';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true when NAV has role menubar', function () {
    let node = document.createElement('nav');
    let role = 'menubar';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true when NAV has role tablist', function () {
    let node = document.createElement('nav');
    let role = 'tablist';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns false when PROGRESS has role button', function () {
    let node = document.createElement('progress');
    let role = 'button';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    assert.isFalse(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
  });

  it('returns true if given element can have any role', function () {
    let node = document.createElement('div');
    flatTreeSetup(node);
    let actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, 'link');
    assert.isTrue(actual);
  });

  it('returns false if given element cannot have any role', function () {
    let node = document.createElement('main');
    flatTreeSetup(node);
    let actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, 'alert'); // changed this
    assert.isFalse(actual);
  });

  it('returns false if given element cannot have any role', function () {
    let node = document.createElement('track');
    flatTreeSetup(node);
    let actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, 'banner');
    assert.isFalse(actual);
  });

  it('returns false if elements implicit role matches the role', function () {
    let node = document.createElement('area');
    node.setAttribute('href', '#yay');
    node.setAttribute('role', 'link');
    flatTreeSetup(node);
    let actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, 'link');
    assert.isFalse(actual);
  });
});
