describe('no-naming-method-matches', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let rule = axe.utils.getRule('aria-toggle-field-name');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns false for node `a[href]`', function () {
    let vNode = queryFixture('<a href="# role="checkbox" id="target"></a>');
    let actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false for node `map area[href]`', function () {
    let vNode = queryFixture(
      '<map><area id="target" href="#" role="checkbox"></map>'
    );
    let actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false when node is either INPUT, SELECT or TEXTAREA', function () {
    ['input', 'select', 'textarea'].forEach(function (node) {
      let vNode = queryFixture(
        '<' + node + ' role="menuitemcheckbox" id="target"><' + node + '>'
      );
      let actual = rule.matches(null, vNode);
      assert.isFalse(actual);
    });
  });

  it('returns false when node is IMG', function () {
    let vNode = queryFixture('<img id="target" role="menuitemradio">');
    let actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false when node is not SVG', function () {
    let vNode = queryFixture('<svg id="target"></svg>');
    let actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false when node is BUTTON', function () {
    let vNode = queryFixture('<button id="target"></button>');
    let actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false for INPUT of type `BUTTON`, `SUBMIT` or `RESET`', function () {
    ['button', 'submit', 'reset'].forEach(function (type) {
      let vNode = queryFixture(
        '<input id="target" role="radio" type="' + type + '">'
      );
      let actual = rule.matches(null, vNode);
      assert.isFalse(actual);
    });
  });

  it('returns false when role=`combobox` has a child input', function () {
    let vNode = queryFixture(
      '<div id="target" role="combobox"><input type="text"/></div>'
    );
    let actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false for the listbox popup of a role=`combobox`', function () {
    let vNode = queryFixture(
      '<div role="combobox" aria-controls="target"></div>' +
        '<div id="target" role="listbox"></div>'
    );
    let actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns true for the dialog popup of a role=`combobox`', function () {
    let vNode = queryFixture(
      '<div role="combobox" aria-controls="target"></div>' +
        '<div id="target" role="dialog"></div>'
    );
    let actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for a div with role=`button`', function () {
    let vNode = queryFixture('<div id="target" role="button"></div>');
    let actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });
});
