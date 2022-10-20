describe('aria.implicitNodes', function () {
  'use strict';

  var orig;
  beforeEach(function () {
    orig = axe.commons.aria.lookupTable.role;
  });

  afterEach(function () {
    axe.commons.aria.lookupTable.role = orig;
  });

  it('should return the implicit property for the proper role', function () {
    axe.commons.aria.lookupTable.role = {
      cats: {
        implicit: 'yes'
      }
    };
    assert.equal(axe.commons.aria.implicitNodes('cats'), 'yes');
  });

  it('should return null if there are no implicit roles', function () {
    axe.commons.aria.lookupTable.role = {};
    var result = axe.commons.aria.implicitNodes('cats');

    assert.isNull(result);
  });
});
