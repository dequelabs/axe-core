describe('aria.getRolesWithNameFromContents', function () {
  'use strict';

  before(function () {
    axe._load({});
  });

  afterEach(function () {
    axe.reset();
  });

  it('should return array if nameFrom contents is found in the lookup table', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          dogs: {
            type: 'things',
            nameFromContent: true
          },
          cats: {
            type: 'stuff'
          }
        }
      }
    });
    assert.include(axe.commons.aria.getRolesWithNameFromContents(), 'dogs');
  });
});
