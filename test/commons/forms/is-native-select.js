describe('forms.isNativeSelect', function () {
  'use strict';
  let isNativeSelect = axe.commons.forms.isNativeSelect;
  let queryFixture = axe.testUtils.queryFixture;

  it('returns true for a select element', function () {
    let node = queryFixture('<select id="target"></select>');
    assert.isTrue(isNativeSelect(node));
  });

  it('returns false for non-select elements', function () {
    let nonSelectElements = ['a', 'h1', 'div', 'span', 'main'];
    nonSelectElements.forEach(function (nodeName) {
      let node = queryFixture(
        '<' + nodeName + ' id="target"></' + nodeName + '>'
      );
      assert.isFalse(
        isNativeSelect(node),
        '<' + nodeName + '> is not a native select element'
      );
    });
  });
});
