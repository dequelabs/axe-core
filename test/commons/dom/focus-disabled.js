describe('dom.focus-disabled', () => {
  const focusDisabled = axe.commons.dom.focusDisabled;
  const { queryFixture, queryShadowFixture } = axe.testUtils;

  it('returns false for non-disabled element', () => {
    const vNode = queryFixture('<span id="target"></span>');

    assert.isFalse(focusDisabled(vNode));
  });

  it('returns true for disabled element which is allowed to be disabled', () => {
    const vNode = queryFixture('<button id="target" disabled></button>');

    assert.isTrue(focusDisabled(vNode));
  });

  it('returns false for disabled element which is not allowed to be disabled', () => {
    const vNode = queryFixture('<span id="target" disabled></span>');

    assert.isFalse(focusDisabled(vNode));
  });

  it('returns true if parent fieldset is disabled', () => {
    const vNode = queryFixture(
      '<fieldset disabled><input id="target"/></fieldset>'
    );

    assert.isTrue(focusDisabled(vNode));
  });

  it('returns false if element is inside a legend inside a disabled fieldset', () => {
    const vNode = queryFixture(
      '<fieldset disabled><legend><input id="target"/></legend></fieldset>'
    );

    assert.isFalse(focusDisabled(vNode));
  });

  it('returns false for disabled fieldset outside shadow tree', () => {
    const vNode = queryShadowFixture(
      '<fieldset disabled><div id="shadow"></div></fieldset>',
      '<input id="target"/>'
    );

    assert.isFalse(focusDisabled(vNode));
  });

  it('returns true if element is hidden for everyone', () => {
    const vNode = queryFixture('<button id="target" hidden></button>');

    assert.isTrue(focusDisabled(vNode));
  });

  it('returns true for element with inert', () => {
    const vNode = queryFixture('<button id="target" inert></button>');

    assert.isTrue(focusDisabled(vNode));
  });

  it('returns true for ancestor with inert', () => {
    const vNode = queryFixture(
      '<div inert><div><button id="target"></button></div></div>'
    );

    assert.isTrue(focusDisabled(vNode));
  });

  it('returns true for ancestor with inert outside shadow tree', () => {
    const vNode = queryShadowFixture(
      '<div inert><div id="shadow"></div></div>',
      '<input id="target"/>'
    );

    assert.isTrue(focusDisabled(vNode));
  });

  describe('SerialVirtualNode', () => {
    it('returns false if element is hidden for everyone', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'button',
        attributes: {
          hidden: true
        }
      });

      assert.isFalse(focusDisabled(vNode));
    });
  });
});
