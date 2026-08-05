describe('aria.isUnsupportedRole', () => {
  after(() => {
    axe.reset();
  });

  it('should return true if the role is unsupported', () => {
    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            unsupported: true
          }
        }
      }
    });
    assert.isTrue(axe.commons.aria.isUnsupportedRole('cats'));
  });

  it('should return false if the role is supported', () => {
    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            unsupported: false
          }
        }
      }
    });
    assert.isFalse(axe.commons.aria.isUnsupportedRole('cats'));
  });

  it('should return false if the role is invalid', () => {
    assert.isFalse(axe.commons.aria.isUnsupportedRole('cats'));
  });
});
