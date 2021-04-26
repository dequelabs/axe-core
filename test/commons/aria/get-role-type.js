describe('aria.getRoleType', function() {
  'use strict';

  before(function() {
    axe._load({});
  });

  afterEach(function() {
    axe.reset();
  });

  it('should return true if role is found in the lookup table', function() {
    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            type: 'stuff'
          }
        }
      }
    });
    assert.equal(axe.commons.aria.getRoleType('cats'), 'stuff');
  });

  it('should return null if role is not found in the lookup table', function() {
    assert.isNull(axe.commons.aria.getRoleType('cats'));
  });
});
