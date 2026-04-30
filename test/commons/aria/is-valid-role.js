describe('aria.isValidRole', () => {
  afterEach(() => {
    axe.reset();
  });

  it('should return true if role is found in the lookup table', () => {
    axe.configure({
      standards: {
        ariaRoles: {
          cats: true
        }
      }
    });
    assert.isTrue(axe.commons.aria.isValidRole('cats'));
  });

  it('should return false if role is not found in the lookup table', () => {
    assert.isFalse(axe.commons.aria.isValidRole('cats'));
  });

  it('returns false for abstract roles by default', () => {
    assert.isFalse(axe.commons.aria.isValidRole('input'));
  });

  it('returns true for abstract roles with { allowAbstract: true } ', () => {
    assert.isTrue(
      axe.commons.aria.isValidRole('input', { allowAbstract: true })
    );
  });
});
