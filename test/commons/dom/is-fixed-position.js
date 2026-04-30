describe('dom.isFixedPosition', () => {
  const isFixedPosition = axe.commons.dom.isFixedPosition;
  const { queryFixture, queryShadowFixture } = axe.testUtils;

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

  it('returns false on detached elements', function () {
    var el = document.createElement('div');
    el.innerHTML = 'I am not visible because I am detached!';

    assert.isFalse(axe.commons.dom.isFixedPosition(el));
  });

  describe('options.skipAncestors', () => {
    it('returns false for ancestor with "position: fixed"', () => {
      const vNode = queryFixture(
        '<div style="position: fixed;"><div><div id="target"></div></div></div>'
      );

      assert.isFalse(isFixedPosition(vNode, { skipAncestors: true }));
    });
  });

  describe('Shadow DOM', () => {
    it('returns false when no element in the composed tree has position: fixed', () => {
      const vNode = queryShadowFixture(
        '<div id="shadow"></div>',
        '<span id="target"></span>'
      );
      assert.isFalse(isFixedPosition(vNode));
    });

    it('returns true for element in shadow tree with position: fixed', () => {
      const vNode = queryShadowFixture(
        '<div id="shadow"></div>',
        '<div id="target" style="position: fixed;"></div>'
      );

      assert.isTrue(isFixedPosition(vNode));
    });

    it('returns true when ancestor outside shadow tree has position: fixed', () => {
      const vNode = queryShadowFixture(
        '<div style="position: fixed;"><div id="shadow"></div></div>',
        '<span id="target"></span>'
      );
      assert.isTrue(isFixedPosition(vNode));
    });

    it('returns true when ancestor outside shadow is fixed and target in shadow has a different position', () => {
      const vNode = queryShadowFixture(
        '<div style="position: fixed;"><div id="shadow"></div></div>',
        '<span id="target" style="position: relative"></span>'
      );
      assert.isTrue(isFixedPosition(vNode));
    });

    it('returns false with skipAncestors when only ancestor outside shadow tree is fixed', () => {
      const vNode = queryShadowFixture(
        '<div style="position: fixed;"><div id="shadow"></div></div>',
        '<span id="target"></span>'
      );
      assert.isFalse(isFixedPosition(vNode, { skipAncestors: true }));
    });
  });
});
