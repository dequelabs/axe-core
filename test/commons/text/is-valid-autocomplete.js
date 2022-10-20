describe('text.isValidAutocomplete', function () {
  'use strict';

  var isValidAutocomplete = axe.commons.text.isValidAutocomplete;
  var options = {
    standaloneTerms: ['standalone-term'],
    qualifiedTerms: ['qualified-term']
  };

  it('returns true if autocomplete is `on` or `off', function () {
    ['on', 'off'].forEach(function (state) {
      assert.isTrue(isValidAutocomplete(state, options));
    });
  });

  it('returns false if `on` or `off` is used with another term', function () {
    ['on', 'off'].forEach(function (state) {
      assert.isFalse(isValidAutocomplete('section-foo ' + state, options));
    });
  });

  it('returns true the only term is a valid autocomplete term', function () {
    assert.isTrue(isValidAutocomplete('standalone-term', options));
  });

  it('returns false the only term is an invalid autocomplete term', function () {
    assert.isFalse(isValidAutocomplete('bad-term', options));
  });

  it('returns true if section-* is used as the first term', function () {
    assert.isTrue(isValidAutocomplete('section-foo standalone-term', options));
  });

  it('returns true if `shipping` or `billing` is used as the first term', function () {
    assert.isTrue(isValidAutocomplete('shipping standalone-term', options));
    assert.isTrue(isValidAutocomplete('billing standalone-term', options));
  });

  it('returns true if section-*  is used before `shipping` or `billing`', function () {
    assert.isTrue(
      isValidAutocomplete('section-foo shipping standalone-term', options)
    );
  });

  it('returns false if `shipping` or `billing` is used before section-*', function () {
    assert.isFalse(
      isValidAutocomplete('shipping section-foo standalone-term', options)
    );
  });

  it('returns true if "home", "work", "mobile", "fax" or "pager" is used before a qualifier', function () {
    ['home', 'work', 'mobile', 'fax', 'pager'].forEach(function (qualifier) {
      assert.isTrue(
        isValidAutocomplete(qualifier + ' qualified-term', options),
        'failed for ' + qualifier
      );
    });
  });

  it('returns false if "home", "work", "mobile", "fax" or "pager" is used before an inappropriate term', function () {
    ['home', 'work', 'mobile', 'fax', 'pager'].forEach(function (qualifier) {
      assert.isFalse(
        isValidAutocomplete(qualifier + ' standalone-term', options),
        'failed for ' + qualifier
      );
    });
  });

  describe('options.strictMode:false', function () {
    it('returns true if the last term is a valid autocomplete term', function () {
      assert.isTrue(
        isValidAutocomplete('do not care! valid-term', {
          looseTyped: true,
          standaloneTerms: ['valid-term']
        })
      );
    });

    it('returns false if the last term is an invalid autocomplete term', function () {
      assert.isFalse(
        isValidAutocomplete('shipping invalid', {
          looseTyped: true,
          standaloneTerms: ['valid-term']
        })
      );
    });
  });
});
