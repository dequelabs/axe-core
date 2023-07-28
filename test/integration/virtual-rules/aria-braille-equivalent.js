describe('aria-braille-equivalent virtual-rule', () => {
  afterEach(() => {
    axe.reset();
  });

  it('passes when aria-braillelabel is not empty', () => {
    const results = axe.runVirtualRule('aria-braille-equivalent', {
      nodeName: 'img',
      attributes: {
        alt: 'Hello world',
        'aria-braillelabel': 'Hello world'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('fails when accessible text is empty but braille label is not', () => {
    const results = axe.runVirtualRule('aria-braille-equivalent', {
      nodeName: 'img',
      attributes: {
        alt: '',
        'aria-braillelabel': 'hello world'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('passes when roledescription and brailleroledescription are not empty', () => {
    const results = axe.runVirtualRule('aria-braille-equivalent', {
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Hello world',
        'aria-brailleroledescription': 'Hello world'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('fails when roledescription is empty but brailleroledescription is not', () => {
    const results = axe.runVirtualRule('aria-braille-equivalent', {
      nodeName: 'div',
      attributes: {
        'aria-roledescription': '',
        'aria-brailleroledescription': 'Hello world'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
