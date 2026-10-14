describe('dom.isAbsoluteContainingBlock', () => {
  const { queryFixture } = axe.testUtils;
  const isAbsoluteContainingBlock = axe.commons.dom.isAbsoluteContainingBlock;

  it('returns false for a static element', () => {
    const vNode = queryFixture('<div id="target"></div>');
    assert.isFalse(isAbsoluteContainingBlock(vNode));
  });

  ['relative', 'absolute', 'fixed', 'sticky'].forEach(position => {
    it(`returns true for position: ${position}`, () => {
      const vNode = queryFixture(
        `<div id="target" style="position: ${position}"></div>`
      );
      assert.isTrue(isAbsoluteContainingBlock(vNode));
    });
  });

  [
    'transform: translateX(0)',
    'translate: 1px',
    'rotate: 1deg',
    'scale: 1.01',
    'filter: blur(0)',
    'backdrop-filter: blur(1px)',
    'perspective: 100px',
    'content-visibility: auto',
    'contain: paint',
    'contain: layout',
    'contain: strict',
    'contain: content',
    'will-change: transform',
    'will-change: translate',
    'will-change: filter',
    'will-change: backdrop-filter'
  ].forEach(style => {
    it(`returns true for ${style}`, () => {
      const vNode = queryFixture(`<div id="target" style="${style}"></div>`);
      assert.isTrue(isAbsoluteContainingBlock(vNode));
    });
  });

  ['will-change: opacity', 'content-visibility: visible'].forEach(style => {
    it(`returns false for ${style}`, () => {
      const vNode = queryFixture(`<div id="target" style="${style}"></div>`);
      assert.isFalse(isAbsoluteContainingBlock(vNode));
    });
  });

  it('returns false for display: contents, even when positioned', () => {
    const vNode = queryFixture(
      '<div id="target" style="display: contents; position: relative"></div>'
    );
    assert.isFalse(isAbsoluteContainingBlock(vNode));
  });
});
