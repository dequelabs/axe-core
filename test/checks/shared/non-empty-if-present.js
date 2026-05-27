describe('non-empty-if-present', () => {
  const fixture = document.getElementById('fixture');

  // These defaults are only available in IE and Edge
  const input = document.createElement('input');
  input.type = 'submit';
  const isEdgeOrIe = typeof input.getAttribute('value') === 'string';

  const checkContext = axe.testUtils.MockCheckContext();
  const queryFixture = axe.testUtils.queryFixture;

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return false if a value is present', () => {
    const vNode = queryFixture(
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
    () => {
      const vNode = queryFixture('<input id="target" type="submit" />');

      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('non-empty-if-present')
          .call(checkContext, null, {}, vNode)
      );
      assert.isNull(checkContext._data);
    }
  );

  it('should return false if an value is present, but empty', () => {
    const vNode = queryFixture('<input id="target" type="submit" value="" />');

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('non-empty-if-present')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should return false if the element is not a submit or reset input', () => {
    let vNode = queryFixture('<input id="target" type="text" />');
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
