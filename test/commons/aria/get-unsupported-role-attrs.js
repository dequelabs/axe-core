describe('aria.getUnsupportedRoleAttrs', function() {
  'use strict';

  var queryFixture = axe.testUtils.queryFixture;
  var getUnsupportedRoleAttrs = axe.commons.aria.getUnsupportedRoleAttrs;

  it('should return unsupported attrs by role', function() {
    axe.configure({
      standards: {
        ariaRoles: {
          button: {
            unsupportedAttrs: ['aria-selected']
          }
        }
      }
    });
    var vNode = queryFixture(
      '<button id="target" aria-selected="true">Contents</button>'
    );
    assert.deepEqual(getUnsupportedRoleAttrs(vNode), ['aria-selected']);
  });

  it('should return "aria-required" for a fieldset with aria-required=true but no descendants are required', function() {
    var vNode = queryFixture(
      '<fieldset id="target" aria-required="true"><input type="radio"></fieldset>'
    );
    assert.deepEqual(getUnsupportedRoleAttrs(vNode), ['aria-required']);
  });

  it('should return empty array for a fieldset with aria-required=false', function() {
    var vNode = queryFixture(
      '<fieldset id="target" aria-required="false"><input type="radio"></fieldset>'
    );
    assert.deepEqual(getUnsupportedRoleAttrs(vNode), []);
  });

  it('should empty array for a fieldset with aria-required=true with required descendant', function() {
    var vNode = queryFixture(
      '<fieldset id="target" aria-required="true"><input type="radio" required></fieldset>'
    );
    assert.deepEqual(getUnsupportedRoleAttrs(vNode), []);
  });

  it('should empty array for a fieldset with aria-required=true with aria-required descendant', function() {
    var vNode = queryFixture(
      '<fieldset id="target" aria-required="true"><input type="radio" aria-required="true"></fieldset>'
    );
    assert.deepEqual(getUnsupportedRoleAttrs(vNode), []);
  });
});
