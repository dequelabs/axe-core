describe('aria.isUnsupportedRole', function () {
  'use strict';

  after(function () {
    axe.reset();
  });

  it('should return true if the role is unsupported', function () {
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

  it('should return false if the role is supported', function () {
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

  it('should return false if the role is invalid', function () {
    assert.isFalse(axe.commons.aria.isUnsupportedRole('cats'));
  });
});
