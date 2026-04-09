describe('dom.isFixedPosition', () => {
  const isFixedPosition = axe.commons.dom.isFixedPosition;
  const { queryFixture } = axe.testUtils;

  it('returns true for element with "position: fixed"', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: fixed;"></div>'
    );

    assert.isTrue(isFixedPosition(vNode));
  });

  it('returns false for element without position', () => {
    const vNode = queryFixture('<div id="target"></div>');

    assert.isFalse(isFixedPosition(vNode));
  });

  for (const position of ['relative', 'absolute', 'sticky']) {
    it(`returns false for element with "position: ${position}"`, () => {
      const vNode = queryFixture(
        `<div id="target" style="position: ${position}"></div>`
      );

      assert.isFalse(isFixedPosition(vNode));
    });
  }

  it('returns true for ancestor with position: fixed', () => {
    const vNode = queryFixture(
      '<div style="position: fixed;"><div><div id="target"></div></div></div>'
    );

    assert.isTrue(isFixedPosition(vNode));
  });

  it('returns true for ancestor with "position: fixed" even when the element is positioned differently', () => {
    const vNode = queryFixture(
      '<div style="position: fixed;"><div><div id="target" style="position: relative"></div></div></div>'
    );

    assert.isTrue(isFixedPosition(vNode));
  });

  describe('options.skipAncestors', () => {
    it('returns false for ancestor with "position: fixed"', () => {
      const vNode = queryFixture(
        '<div style="position: fixed;"><div><div id="target"></div></div></div>'
      );

      assert.isFalse(isFixedPosition(vNode, { skipAncestors: true }));
    });
  });
});
