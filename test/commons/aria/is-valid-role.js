describe('aria.isValidRole', function () {
  'use strict';

  afterEach(function () {
    axe.reset();
  });

  it('should return true if role is found in the lookup table', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          cats: true
        }
      }
    });
    assert.isTrue(axe.commons.aria.isValidRole('cats'));
  });

  it('should return false if role is not found in the lookup table', function () {
    assert.isFalse(axe.commons.aria.isValidRole('cats'));
  });

  it('returns false for abstract roles by default', function () {
    assert.isFalse(axe.commons.aria.isValidRole('input'));
  });

  it('returns true for abstract roles with { allowAbstract: true } ', function () {
    assert.isTrue(
      axe.commons.aria.isValidRole('input', { allowAbstract: true })
    );
  });
});
