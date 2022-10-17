describe('forms.isNativeSelect', function () {
  'use strict';
  var isNativeSelect = axe.commons.forms.isNativeSelect;
  var queryFixture = axe.testUtils.queryFixture;

  it('returns true for a select element', function () {
    var node = queryFixture('<select id="target"></select>');
    assert.isTrue(isNativeSelect(node));
  });

  it('returns false for non-select elements', function () {
    var nonSelectElements = ['a', 'h1', 'div', 'span', 'main'];
    nonSelectElements.forEach(function (nodeName) {
      var node = queryFixture(
        '<' + nodeName + ' id="target"></' + nodeName + '>'
      );
      assert.isFalse(
        isNativeSelect(node),
        '<' + nodeName + '> is not a native select element'
      );
    });
  });
});
