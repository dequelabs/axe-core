describe('dom.isFixedContainingBlock', () => {
  const { queryFixture } = axe.testUtils;
  const isFixedContainingBlock = axe.commons.dom.isFixedContainingBlock;

  ['static', 'relative', 'absolute', 'fixed', 'sticky'].forEach(position => {
    it(`returns false for position: ${position}`, () => {
      const vNode = queryFixture(
        `<div id="target" style="position: ${position}"></div>`
      );
      assert.isFalse(isFixedContainingBlock(vNode));
    });
  });

  it('returns true for a transformed element', () => {
    const vNode = queryFixture(
      '<div id="target" style="transform: translateX(0)"></div>'
    );
    assert.isTrue(isFixedContainingBlock(vNode));
  });

  ['will-change: contain', 'will-change: scroll-position, contain'].forEach(
    style => {
      it(`returns true for ${style}`, () => {
        const vNode = queryFixture(`<div id="target" style="${style}"></div>`);
        assert.isTrue(isFixedContainingBlock(vNode));
      });
    }
  );

  [
    'will-change: contain-intrinsic-size',
    'will-change: filter-x',
    'container-type: size',
    'container-type: inline-size'
  ].forEach(style => {
    it(`returns false for ${style}`, () => {
      const vNode = queryFixture(`<div id="target" style="${style}"></div>`);
      assert.isFalse(isFixedContainingBlock(vNode));
    });
  });

  it('returns false for display: contents', () => {
    const vNode = queryFixture(
      '<div id="target" style="display: contents; transform: translateX(0)"></div>'
    );
    assert.isFalse(isFixedContainingBlock(vNode));
  });
});
