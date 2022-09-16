describe('aria.getRoleType', function () {
  'use strict';
  var queryFixture = axe.testUtils.queryFixture;
  var getRoleType = axe.commons.aria.getRoleType;

  before(function () {
    axe._load({});
  });

  afterEach(function () {
    axe.reset();
  });

  it('should return the type from the lookup table', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            type: 'stuff'
          }
        }
      }
    });
    assert.equal(getRoleType('cats'), 'stuff');
  });

  it('should return null if role is not found in the lookup table', function () {
    assert.isNull(getRoleType('cats'));
  });

  it('returns the type from the role of a virtual node', function () {
    var vNode = queryFixture('<span id="target" role="cats"></span>');
    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            type: 'stuff'
          }
        }
      }
    });
    assert.equal(getRoleType(vNode), 'stuff');
  });

  it('returns the type from the role of a DOM node', function () {
    var domNode = queryFixture(
      '<span id="target" role="cats"></span>'
    ).actualNode;
    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            type: 'stuff'
          }
        }
      }
    });
    assert.equal(getRoleType(domNode), 'stuff');
  });
});
