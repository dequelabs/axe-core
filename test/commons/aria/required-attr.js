describe('aria.requiredAttr', () => {
  afterEach(() => {
    axe.reset();
  });

  it('should returned the attributes property for the proper role', () => {
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

  it('should returned empty array if the required attributes is not an array', () => {
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

  it('should return an empty array if there are no required attributes', () => {
    const result = axe.commons.aria.requiredAttr('cats');

    assert.deepEqual(result, []);
  });

  it('should return a unique copy of the attributes', () => {
    const attrs = ['yes', 'no'];

    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            requiredAttrs: attrs
          }
        }
      }
    });

    const result = axe.commons.aria.requiredAttr('cats');
    assert.notEqual(result, attrs);
  });
});
