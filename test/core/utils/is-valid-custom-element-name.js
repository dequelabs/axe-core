describe('utils.isValidCustomElementName', () => {
  const isValidCustomElementName = axe.utils.isValidCustomElementName;
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
    assert.isTrue(isValidCustomElementName('custom-button'));
  });

  it('returns true for custom element with emoji', () => {
    assert.isTrue(isValidCustomElementName('emotion-😍'));
  });

  it('returns true for custom element with international symbol', () => {
    assert.isTrue(isValidCustomElementName('café-menu'));
  });

  it('returns true for custom element with symbol', () => {
    assert.isTrue(isValidCustomElementName('math-π'));
  });

  it('returns false for element without a hyphen', () => {
    assert.isFalse(isValidCustomElementName('mathπ'));
  });

  it('return false for element with invalid name', () => {
    assert.isFalse(isValidCustomElementName('m 1-c'));
  });

  it('returns false for element with non-lower case alpha as first char', () => {
    assert.isFalse(isValidCustomElementName('1m-c'));
  });

  it('returns false for element with upper case letter', () => {
    assert.isFalse(isValidCustomElementName('custom-Button'));
  });

  for (const name of reservedNames) {
    it(`returns false for ${name}`, () => {
      assert.isFalse(isValidCustomElementName(name));
    });
  }
});
