describe('aria.validateAttr', function () {
  'use strict';

  afterEach(function () {
    axe.reset();
  });

  it('should return true if attribute is found in lut', function () {
    axe.configure({
      standards: {
        ariaAttrs: {
          cats: {}
        }
      }
    });

    assert.isTrue(axe.commons.aria.validateAttr('cats'));
  });

  it('should return false if attribute is found in lut', function () {
    assert.isFalse(axe.commons.aria.validateAttr('cats'));
  });
});
