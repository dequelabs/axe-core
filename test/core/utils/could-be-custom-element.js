describe('utils.couldBeCustomElement', () => {
  const couldBeCustomElement = axe.utils.couldBeCustomElement;
  const reservedNames = [
    'annotation-xml',
    'color-profile',
    'font-face',
    'font-face-src',
    'font-face-uri',
    'font-face-format',
    'font-face-name',
    'missing-glyph'
  ];

  it('returns true for potential custom element', () => {
    const node = document.createElement('custom-button');
    assert.isTrue(couldBeCustomElement(node));
  });

  it('returns true for custom element with emoji', () => {
    const node = document.createElement('emotion-😍');
    assert.isTrue(couldBeCustomElement(node));
  });

  it('returns true for custom element with international symbol', () => {
    const node = document.createElement('café-menu');
    assert.isTrue(couldBeCustomElement(node));
  });

  it('returns true for custom element with symbol', () => {
    const node = document.createElement('math-π');
    assert.isTrue(couldBeCustomElement(node));
  });

  it('returns false for element without a hyphen', () => {
    const node = document.createElement('mathπ');
    assert.isFalse(couldBeCustomElement(node));
  });

  it('return false for element with invalid name', () => {
    const node = document.createElement('m1');
    assert.isFalse(couldBeCustomElement(node));
  });

  for (const name of reservedNames) {
    it(`returns false for ${name}`, () => {
      const node = document.createElement(name);
      assert.isFalse(couldBeCustomElement(node));
    });
  }
});
