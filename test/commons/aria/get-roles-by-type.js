describe('aria.getRolesByType', function () {
  'use strict';

  before(function () {
    axe._load({});
  });

  afterEach(function () {
    axe.reset();
  });

  it('should return array if roletype is found in the lookup table', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          dogs: {
            type: 'things'
          },
          cats: {
            type: 'stuff'
          }
        }
      }
    });
    assert.deepEqual(axe.commons.aria.getRolesByType('stuff'), ['cats']);
  });

  it('should return empty array if role is not found in the lookup table', function () {
    assert.deepEqual(axe.commons.aria.getRolesByType('blahblahblah'), []);
  });
});
