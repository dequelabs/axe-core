describe('no-naming-method-matches', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var rule = axe.utils.getRule('aria-toggle-field-name');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns false for node `a[href]`', function () {
    var vNode = queryFixture('<a href="# role="checkbox" id="target"></a>');
    var actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false for node `map area[href]`', function () {
    var vNode = queryFixture(
      '<map><area id="target" href="#" role="checkbox"></map>'
    );
    var actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false when node is either INPUT, SELECT or TEXTAREA', function () {
    ['input', 'select', 'textarea'].forEach(function (node) {
      var vNode = queryFixture(
        '<' + node + ' role="menuitemcheckbox" id="target"><' + node + '>'
      );
      var actual = rule.matches(null, vNode);
      assert.isFalse(actual);
    });
  });

  it('returns false when node is IMG', function () {
    var vNode = queryFixture('<img id="target" role="menuitemradio">');
    var actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false when node is not SVG', function () {
    var vNode = queryFixture('<svg id="target"></svg>');
    var actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false when node is BUTTON', function () {
    var vNode = queryFixture('<button id="target"></button>');
    var actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false for INPUT of type `BUTTON`, `SUBMIT` or `RESET`', function () {
    ['button', 'submit', 'reset'].forEach(function (type) {
      var vNode = queryFixture(
        '<input id="target" role="radio" type="' + type + '">'
      );
      var actual = rule.matches(null, vNode);
      assert.isFalse(actual);
    });
  });

  it('returns false when role=`combobox` has a child input', function () {
    var vNode = queryFixture(
      '<div id="target" role="combobox"><input type="text"/></div>'
    );
    var actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns true for a div with role=`button`', function () {
    var vNode = queryFixture('<div id="target" role="button"></div>');
    var actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });
});
