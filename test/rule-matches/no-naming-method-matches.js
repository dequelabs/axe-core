describe('no-naming-method-matches', function () {
  'use strict';

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const rule = axe.utils.getRule('aria-toggle-field-name');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns false for node `a[href]`', function () {
    const vNode = queryFixture('<a href="# role="checkbox" id="target"></a>');
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false for node `map area[href]`', function () {
    const vNode = queryFixture(
      '<map><area id="target" href="#" role="checkbox"></map>'
    );
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false when node is either INPUT, SELECT or TEXTAREA', function () {
    ['input', 'select', 'textarea'].forEach(function (node) {
      const vNode = queryFixture(
        '<' + node + ' role="menuitemcheckbox" id="target"><' + node + '>'
      );
      const actual = rule.matches(null, vNode);
      assert.isFalse(actual);
    });
  });

  it('returns false when node is IMG', function () {
    const vNode = queryFixture('<img id="target" role="menuitemradio">');
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false when node is not SVG', function () {
    const vNode = queryFixture('<svg id="target"></svg>');
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false when node is BUTTON', function () {
    const vNode = queryFixture('<button id="target"></button>');
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false when node is SUMMARY', function () {
    const vNode = queryFixture('<summary id="target"></summary>');
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false for INPUT of type `BUTTON`, `SUBMIT` or `RESET`', function () {
    ['button', 'submit', 'reset'].forEach(function (type) {
      const vNode = queryFixture(
        '<input id="target" role="radio" type="' + type + '">'
      );
      const actual = rule.matches(null, vNode);
      assert.isFalse(actual);
    });
  });

  it('returns false when role=`combobox` has a child input', function () {
    const vNode = queryFixture(
      '<div id="target" role="combobox"><input type="text"/></div>'
    );
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false for the listbox popup of a role=`combobox`', function () {
    const vNode = queryFixture(
      '<div role="combobox" aria-controls="target"></div>' +
        '<div id="target" role="listbox"></div>'
    );
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns true for the dialog popup of a role=`combobox`', function () {
    const vNode = queryFixture(
      '<div role="combobox" aria-controls="target"></div>' +
        '<div id="target" role="dialog"></div>'
    );
    const actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for a div with role=`button`', function () {
    const vNode = queryFixture('<div id="target" role="button"></div>');
    const actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });
});
