describe('non-empty-if-present', function () {
  'use strict';

  let fixture = document.getElementById('fixture');

  // These defaults are only available in IE and Edge
  let input = document.createElement('input');
  input.type = 'submit';
  let isEdgeOrIe = typeof input.getAttribute('value') === 'string';

  let checkContext = axe.testUtils.MockCheckContext();
  let queryFixture = axe.testUtils.queryFixture;

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return false if a value is present', function () {
    let vNode = queryFixture(
      '<input id="target" type="submit" value="woohoo" />'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('non-empty-if-present', { verifyMessage: false })
        .call(checkContext, null, {}, vNode)
    );
    assert.equal(checkContext._data.messageKey, 'has-label');
  });

  (isEdgeOrIe ? xit : it)(
    'should return true if a value is not present',
    function () {
      let vNode = queryFixture('<input id="target" type="submit" />');

      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('non-empty-if-present')
          .call(checkContext, null, {}, vNode)
      );
      assert.isNull(checkContext._data);
    }
  );

  it('should return false if an value is present, but empty', function () {
    let vNode = queryFixture('<input id="target" type="submit" value="" />');

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('non-empty-if-present')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should return false if the element is not a submit or reset input', function () {
    let vNode;

    vNode = queryFixture('<input id="target" type="text" />');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('non-empty-if-present')
        .call(checkContext, null, {}, vNode)
    );

    vNode = queryFixture('<input id="target" type="button" />');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('non-empty-if-present')
        .call(checkContext, null, {}, vNode)
    );

    vNode = queryFixture('<button id="target" type="submit"></button');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('non-empty-if-present')
        .call(checkContext, null, {}, vNode)
    );
  });
});
