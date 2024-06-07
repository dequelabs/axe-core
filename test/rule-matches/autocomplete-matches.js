describe('autocomplete-matches', function () {
  'use strict';
  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let rule = axe.utils.getRule('autocomplete-valid');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('is a function', function () {
    assert.isFunction(rule.matches);
  });

  it('returns true for input elements', function () {
    let vNode = queryFixture('<input id="target" autocomplete="foo">');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns true for select elements', function () {
    let vNode = queryFixture('<select id="target" autocomplete="foo">');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns true for textarea elements', function () {
    let vNode = queryFixture('<textarea id="target" autocomplete="foo">');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns false for buttons elements', function () {
    let vNode = queryFixture('<button id="target" autocomplete="foo">');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('should return false for non-form field elements', function () {
    let vNode = queryFixture('<div id="target" autocomplete="foo">');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns false for input buttons', function () {
    ['reset', 'submit', 'button'].forEach(function (type) {
      let vNode = queryFixture(
        '<input id="target" type="' + type + '" autocomplete="foo">'
      );
      assert.isFalse(rule.matches(null, vNode));
    });
  });

  it('returns false for elements with an empty autocomplete', function () {
    let vNode = queryFixture('<input id="target" autocomplete="  ">');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns false for intput[type=hidden]', function () {
    let vNode = queryFixture(
      '<input id="target" type="hidden" autocomplete="foo">'
    );
    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns false for disabled fields', function () {
    ['input', 'select', 'textarea'].forEach(function (tagName) {
      let vNode = queryFixture(
        '<' + tagName + ' id="target" disabled autocomplete="foo">'
      );
      assert.isFalse(rule.matches(null, vNode));
    });
  });

  it('returns false for aria-disabled=true fields', function () {
    ['input', 'select', 'textarea'].forEach(function (tagName) {
      let vNode = queryFixture(
        '<' + tagName + ' id="target" aria-disabled="true" autocomplete="foo">'
      );
      assert.isFalse(rule.matches(null, vNode));
    });
  });

  it('returns true for aria-disabled=false fields', function () {
    ['input', 'select', 'textarea'].forEach(function (tagName) {
      let vNode = queryFixture(
        '<' + tagName + ' id="target" aria-disabled="false" autocomplete="foo">'
      );
      assert.isTrue(rule.matches(null, vNode));
    });
  });

  it('returns false for non-widget roles with tabindex=-1', function () {
    let nonWidgetRoles = ['application', 'fakerole', 'main'];
    nonWidgetRoles.forEach(function (role) {
      let vNode = queryFixture(
        '<input id="target" role="' +
          role +
          '" tabindex="-1" autocomplete="foo">'
      );
      assert.isFalse(
        rule.matches(null, vNode),
        'Expect role=' + role + ' to be ignored when it has tabindex=-1'
      );
    });
  });

  it('returns true for form fields with a widget role with tabindex=-1', function () {
    let nonWidgetRoles = ['button', 'menuitem', 'slider'];
    nonWidgetRoles.forEach(function (role) {
      let vNode = queryFixture(
        '<input id="target" role="' +
          role +
          '" tabindex="-1" autocomplete="foo">'
      );
      assert.isTrue(rule.matches(null, vNode));
    });
  });

  it('returns true for form fields with tabindex=-1', function () {
    ['input', 'select', 'textarea'].forEach(function (tagName) {
      let vNode = queryFixture(
        '<' + tagName + ' id="target" tabindex="-1" autocomplete="foo">'
      );
      assert.isTrue(rule.matches(null, vNode));
    });
  });

  it('returns false for off screen and hidden form fields with tabindex=-1', function () {
    let vNode = queryFixture(
      '<div aria-hidden="true">' +
        '<input id="target" tabindex="-1" style="position:absolute; top:-9999em" autocomplete="foo">' +
        '</div>'
    );
    assert.isFalse(rule.matches(null, vNode));
  });
});
