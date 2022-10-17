describe('aria.allowedAttr', function () {
  'use strict';

  var globalAttrs;
  before(function () {
    axe._load({});
    globalAttrs = axe.commons.standards.getGlobalAriaAttrs();
  });

  afterEach(function () {
    axe.reset();
  });

  it('should returned the attributes property for the proper role', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            allowedAttrs: ['hello']
          }
        }
      }
    });

    assert.deepEqual(
      axe.commons.aria.allowedAttr('cats'),
      globalAttrs.concat(['hello'])
    );
  });

  it('should also check required attributes', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            requiredAttrs: ['hello'],
            allowedAttrs: ['ok']
          }
        }
      }
    });

    assert.deepEqual(
      axe.commons.aria.allowedAttr('cats'),
      globalAttrs.concat(['ok', 'hello'])
    );
  });

  it('should return an array with globally allowed attributes', function () {
    assert.deepEqual(axe.commons.aria.allowedAttr('cats'), globalAttrs);
  });
});
