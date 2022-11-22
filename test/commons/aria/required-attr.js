describe('aria.requiredAttr', function () {
  'use strict';

  afterEach(function () {
    axe.reset();
  });

  it('should returned the attributes property for the proper role', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            requiredAttrs: ['yes']
          }
        }
      }
    });

    assert.deepEqual(axe.commons.aria.requiredAttr('cats'), ['yes']);
  });

  it('should returned empty array if the required attributes is not an array', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            requiredAttrs: 'yes'
          }
        }
      }
    });
    assert.deepEqual(axe.commons.aria.requiredAttr('cats'), []);
  });

  it('should return an empty array if there are no required attributes', function () {
    var result = axe.commons.aria.requiredAttr('cats');

    assert.deepEqual(result, []);
  });

  it('should return a unique copy of the attributes', function () {
    var attrs = ['yes', 'no'];

    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            requiredAttrs: attrs
          }
        }
      }
    });

    var result = axe.commons.aria.requiredAttr('cats');
    assert.notEqual(result, attrs);
  });
});
