describe('aria.allowedAttr', () => {
  let globalAttrs;
  before(() => {
    axe._load({});
    globalAttrs = axe.commons.standards.getGlobalAriaAttrs();
  });

  afterEach(() => {
    axe.reset();
  });

  it('should returned the attributes property for the proper role', () => {
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

  it('should also check required attributes', () => {
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

  it('should return an array with globally allowed attributes', () => {
    assert.deepEqual(axe.commons.aria.allowedAttr('cats'), globalAttrs);
  });
});
