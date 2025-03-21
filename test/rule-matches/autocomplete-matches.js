describe('autocomplete-matches', function () {
  'use strict';
  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const rule = axe.utils.getRule('autocomplete-valid');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('is a function', function () {
    assert.isFunction(rule.matches);
  });

  it('returns true for input elements', function () {
    const vNode = queryFixture('<input id="target" autocomplete="foo">');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns true for select elements', function () {
    const vNode = queryFixture('<select id="target" autocomplete="foo">');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns true for textarea elements', function () {
    const vNode = queryFixture('<textarea id="target" autocomplete="foo">');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns false for buttons elements', function () {
    const vNode = queryFixture('<button id="target" autocomplete="foo">');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('should return false for non-form field elements', function () {
    const vNode = queryFixture('<div id="target" autocomplete="foo">');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns false for input buttons', function () {
    ['reset', 'submit', 'button'].forEach(function (type) {
      const vNode = queryFixture(
        '<input id="target" type="' + type + '" autocomplete="foo">'
      );
      assert.isFalse(rule.matches(null, vNode));
    });
  });

  it('returns false for elements with an empty autocomplete', function () {
    const vNode = queryFixture('<input id="target" autocomplete="  ">');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns false for intput[type=hidden]', function () {
    const vNode = queryFixture(
      '<input id="target" type="hidden" autocomplete="foo">'
    );
    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns false for disabled fields', function () {
    ['input', 'select', 'textarea'].forEach(function (tagName) {
      const vNode = queryFixture(
        '<' + tagName + ' id="target" disabled autocomplete="foo">'
      );
      assert.isFalse(rule.matches(null, vNode));
    });
  });

  it('returns false for aria-disabled=true fields', function () {
    ['input', 'select', 'textarea'].forEach(function (tagName) {
      const vNode = queryFixture(
        '<' + tagName + ' id="target" aria-disabled="true" autocomplete="foo">'
      );
      assert.isFalse(rule.matches(null, vNode));
    });
  });

  it('returns true for aria-disabled=false fields', function () {
    ['input', 'select', 'textarea'].forEach(function (tagName) {
      const vNode = queryFixture(
        '<' + tagName + ' id="target" aria-disabled="false" autocomplete="foo">'
      );
      assert.isTrue(rule.matches(null, vNode));
    });
  });

  it('returns false for non-widget roles with tabindex=-1', function () {
    const nonWidgetRoles = ['application', 'fakerole', 'main'];
    nonWidgetRoles.forEach(function (role) {
      const vNode = queryFixture(
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
    const nonWidgetRoles = ['button', 'menuitem', 'slider'];
    nonWidgetRoles.forEach(function (role) {
      const vNode = queryFixture(
        '<input id="target" role="' +
          role +
          '" tabindex="-1" autocomplete="foo">'
      );
      assert.isTrue(rule.matches(null, vNode));
    });
  });

  it('returns true for form fields with tabindex=-1', function () {
    ['input', 'select', 'textarea'].forEach(function (tagName) {
      const vNode = queryFixture(
        '<' + tagName + ' id="target" tabindex="-1" autocomplete="foo">'
      );
      assert.isTrue(rule.matches(null, vNode));
    });
  });

  it('returns false for off screen and hidden form fields with tabindex=-1', function () {
    const vNode = queryFixture(
      '<div aria-hidden="true">' +
        '<input id="target" tabindex="-1" style="position:absolute; top:-9999em" autocomplete="foo">' +
        '</div>'
    );
    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns false if readonly attribute is placed whether autocomplete is not valid', function () {
    var vNode = queryFixture(
      '<input readonly autocomplete="some invalid value" id="target" />'
    );
    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns false if aria-readonly attribute is true whether autocomplete is not valid', function () {
    var vNode = queryFixture(
      '<input aria-readonly="true" autocomplete="some invalid value" id="target" />'
    );
    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns true if aria-readonly attribute is false whether autocomplete is not valid', function () {
    var vNode = queryFixture(
      '<input aria-readonly="false" autocomplete="some invalid value" id="target" />'
    );
    assert.isTrue(rule.matches(null, vNode));
  });
});
