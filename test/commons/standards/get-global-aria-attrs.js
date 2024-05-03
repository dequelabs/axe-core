describe('standards.getGlobalAriaAttrs', function () {
  let getGlobalAriaAttrs = axe.commons.standards.getGlobalAriaAttrs;

  before(function () {
    axe._load({});
  });

  after(function () {
    axe.reset();
  });

  it('should return global attrs', function () {
    // Source: https://www.w3.org/TR/wai-aria-1.1/#global_states
    let globalAttrs = getGlobalAriaAttrs();
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

  it('should return configured global attrs', function () {
    axe.configure({
      standards: {
        ariaAttrs: {
          myAttr: {
            global: true
          }
        }
      }
    });

    let globalAttrs = getGlobalAriaAttrs();
    assert.include(globalAttrs, 'myAttr');
  });

  it('should not return global attr that is configured to not be global', function () {
    axe.configure({
      standards: {
        ariaAttrs: {
          'aria-atomic': {
            global: false
          }
        }
      }
    });

    let globalAttrs = getGlobalAriaAttrs();
    assert.notInclude(globalAttrs, 'aria-atomic');
  });
});
