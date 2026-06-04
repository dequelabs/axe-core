describe('aria.validateAttr', () => {
  afterEach(() => {
    axe.reset();
  });

  it('should return true if attribute is found in lut', () => {
    axe.configure({
      standards: {
        ariaAttrs: {
          cats: {}
        }
      }
    });

    assert.isTrue(axe.commons.aria.validateAttr('cats'));
  });

  it('should return false if attribute is found in lut', () => {
    assert.isFalse(axe.commons.aria.validateAttr('cats'));
  });
});
