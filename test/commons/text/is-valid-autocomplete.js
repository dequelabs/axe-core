describe('text.isValidAutocomplete', () => {
  const isValidAutocomplete = axe.commons.text.isValidAutocomplete;
  const options = {
    standaloneTerms: ['standalone-term'],
    qualifiedTerms: ['qualified-term']
  };

  it('is true when empty', () => {
    assert.isTrue(isValidAutocomplete('', options));
  });

  it('is true when there is a stateTerm', () => {
    assert.isTrue(isValidAutocomplete('on', options));
  });

  it('is true when there is a standaloneTerms', () => {
    assert.isTrue(isValidAutocomplete('standalone-term', options));
  });

  it('is true when there is a qualifiedTerms', () => {
    assert.isTrue(isValidAutocomplete('qualified-term', options));
  });

  it('is false when there is no stateTerm, standaloneTerms, or qualifiedTerms', () => {
    assert.isFalse(isValidAutocomplete('bad-term', options));
  });

  describe('section-* grouping', () => {
    it('is false when used by itself', () => {
      assert.isFalse(isValidAutocomplete('section-foo', options));
    });

    it('is true when used before a standaloneTerm', () => {
      assert.isTrue(
        isValidAutocomplete('section-foo standalone-term', options)
      );
    });

    it('is true when used before a qualifiedTerm', () => {
      assert.isTrue(isValidAutocomplete('section-foo qualified-term', options));
    });

    it('is false when used with a stateTerm', () => {
      assert.isFalse(isValidAutocomplete('section-foo off', options));
      assert.isFalse(isValidAutocomplete('section-foo on', options));
    });

    it('is false when used out of order', () => {
      assert.isFalse(
        isValidAutocomplete('qualified-term section-foo', options)
      );
      assert.isFalse(
        isValidAutocomplete('standalone-term section-foo', options)
      );
    });
  });

  describe('locations', () => {
    it('is false when used by itself', () => {
      assert.isFalse(isValidAutocomplete('shipping', options));
    });

    it('is true when in order', () => {
      assert.isTrue(isValidAutocomplete('shipping standalone-term', options));
      assert.isTrue(isValidAutocomplete('shipping qualified-term', options));
      assert.isTrue(
        isValidAutocomplete('section-foo shipping standalone-term', options)
      );
      assert.isTrue(
        isValidAutocomplete('section-foo shipping qualified-term', options)
      );
    });

    it('is false when used out of order', () => {
      assert.isFalse(isValidAutocomplete('standalone-term shipping', options));
      assert.isFalse(isValidAutocomplete('qualified-term shipping', options));
      assert.isFalse(
        isValidAutocomplete('shipping section-foo standalone-term', options)
      );
      assert.isFalse(
        isValidAutocomplete('shipping section-foo qualified-term', options)
      );
    });

    it('is false when used with a stateTerm', () => {
      assert.isFalse(isValidAutocomplete('shipping off', options));
      assert.isFalse(isValidAutocomplete('shipping on', options));
    });
  });

  describe('qualifiers', () => {
    it('is true when used before a qualifiedTerm', () => {
      assert.isTrue(isValidAutocomplete('home qualified-term', options));
      assert.isTrue(
        isValidAutocomplete('shipping home qualified-term', options)
      );
    });

    it('is false when used before a standaloneTerm', () => {
      assert.isFalse(isValidAutocomplete('home standalone-term', options));
    });

    it('is false when used with a stateTerm', () => {
      assert.isFalse(isValidAutocomplete('home off', options));
      assert.isFalse(isValidAutocomplete('home on', options));
    });

    it('is false when used out of order', () => {
      assert.isFalse(isValidAutocomplete('qualified-term home', options));
      assert.isFalse(
        isValidAutocomplete('home section-foo qualified-term', options)
      );
      assert.isFalse(
        isValidAutocomplete('home shipping qualified-term', options)
      );
      assert.isFalse(
        isValidAutocomplete('section-foo home shipping qualified-term', options)
      );
      assert.isFalse(
        isValidAutocomplete('home section-foo shipping qualified-term', options)
      );
    });
  });

  describe('webauthn', () => {
    it('returns false if used as the only term', () => {
      assert.isFalse(isValidAutocomplete('webauthn', options));
    });

    it('returns false if used with a state term', () => {
      assert.isFalse(isValidAutocomplete('on webauthn', options));
      assert.isFalse(isValidAutocomplete('off webauthn', options));
    });

    it('returns true if used after a standalone term', () => {
      assert.isTrue(isValidAutocomplete('standalone-term webauthn', options));
      assert.isTrue(
        isValidAutocomplete('billing standalone-term webauthn', options)
      );
      assert.isTrue(
        isValidAutocomplete('section-foo standalone-term webauthn', options)
      );
      assert.isTrue(
        isValidAutocomplete(
          'section-foo billing standalone-term webauthn',
          options
        )
      );
    });

    it('returns false if used before a standalone term', () => {
      assert.isFalse(isValidAutocomplete('webauthn standalone-term', options));
      assert.isFalse(
        isValidAutocomplete('webauthn section-foo standalone-term', options)
      );
      assert.isFalse(
        isValidAutocomplete('section-foo webauthn standalone-term', options)
      );
    });

    it('returns true if used after a qualified term', () => {
      assert.isTrue(isValidAutocomplete('qualified-term webauthn', options));
      assert.isTrue(
        isValidAutocomplete('section-foo qualified-term webauthn', options)
      );
      assert.isTrue(
        isValidAutocomplete('home qualified-term webauthn', options)
      );
      assert.isTrue(
        isValidAutocomplete('section-foo home qualified-term webauthn', options)
      );
    });

    it('returns false when used with only optional tokens', () => {
      assert.isFalse(isValidAutocomplete('home webauthn', options));
      assert.isFalse(isValidAutocomplete('section-foo webauthn', options));
      assert.isFalse(isValidAutocomplete('section-foo home webauthn', options));
    });
  });

  describe('options.strictMode:false', () => {
    it('returns true if the last term is a valid autocomplete term', () => {
      assert.isTrue(
        isValidAutocomplete('do not care! valid-term', {
          looseTyped: true,
          standaloneTerms: ['valid-term']
        })
      );
    });

    it('returns true if the last term is webauthn, and the term before is valid', () => {
      assert.isTrue(
        isValidAutocomplete('do not care! valid-term webauthn', {
          looseTyped: true,
          standaloneTerms: ['valid-term']
        })
      );
    });

    it('returns false if the last term is an invalid autocomplete term', () => {
      assert.isFalse(
        isValidAutocomplete('shipping invalid', {
          looseTyped: true,
          standaloneTerms: ['valid-term']
        })
      );
    });
  });
});
