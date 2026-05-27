describe('standards.getGlobalAriaAttrs', () => {
  const getGlobalAriaAttrs = axe.commons.standards.getGlobalAriaAttrs;

  before(() => {
    axe._load({});
  });

  after(() => {
    axe.reset();
  });

  it('should return global attrs', () => {
    // Source: https://www.w3.org/TR/wai-aria-1.1/#global_states
    const globalAttrs = getGlobalAriaAttrs();
    assert.deepEqual(globalAttrs, [
      'aria-atomic',
      'aria-braillelabel',
      'aria-brailleroledescription',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-description',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ]);
  });

  it('should return configured global attrs', () => {
    axe.configure({
      standards: {
        ariaAttrs: {
          myAttr: {
            global: true
          }
        }
      }
    });

    const globalAttrs = getGlobalAriaAttrs();
    assert.include(globalAttrs, 'myAttr');
  });

  it('should not return global attr that is configured to not be global', () => {
    axe.configure({
      standards: {
        ariaAttrs: {
          'aria-atomic': {
            global: false
          }
        }
      }
    });

    const globalAttrs = getGlobalAriaAttrs();
    assert.notInclude(globalAttrs, 'aria-atomic');
  });
});
