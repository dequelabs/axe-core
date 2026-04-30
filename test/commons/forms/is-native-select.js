describe('forms.isNativeSelect', () => {
  const isNativeSelect = axe.commons.forms.isNativeSelect;
  const queryFixture = axe.testUtils.queryFixture;

  it('returns true for a select element', () => {
    const node = queryFixture('<select id="target"></select>');
    assert.isTrue(isNativeSelect(node));
  });

  it('returns false for non-select elements', () => {
    const nonSelectElements = ['a', 'h1', 'div', 'span', 'main'];
    nonSelectElements.forEach(nodeName => {
      const node = queryFixture(`<${nodeName} id="target"></${nodeName}>`);
      assert.isFalse(
        isNativeSelect(node),
        `<${nodeName}> is not a native select element`
      );
    });
  });
});
