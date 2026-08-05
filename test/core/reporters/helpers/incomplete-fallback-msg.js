describe('helpers.incompleteFallbackMessage', () => {
  it('returns a non-empty string by default', () => {
    const summary = helpers.incompleteFallbackMessage();
    assert.typeOf(summary, 'string');
    assert.notEqual(summary, '');
  });

  it('should return a string', () => {
    axe._load({
      messages: {},
      rules: [],
      data: {
        incompleteFallbackMessage: 'Dogs are the best'
      }
    });
    const summary = helpers.incompleteFallbackMessage();
    assert.equal(summary, 'Dogs are the best');
  });

  it('should handle doT.js template function', () => {
    axe._load({
      messages: {},
      rules: [],
      data: {
        incompleteFallbackMessage: function anonymous() {
          return 'Dogs are the best';
        }
      }
    });

    const summary = helpers.incompleteFallbackMessage();
    assert.equal(summary, 'Dogs are the best');
  });

  describe('when passed an invalid value', () => {
    it('returns `` when set to an object', () => {
      axe._load({
        messages: {},
        rules: [],
        data: {
          incompleteFallbackMessage: {}
        }
      });
      assert.equal(helpers.incompleteFallbackMessage(), '');
    });

    it('returns `` when set to null', () => {
      axe._load({
        messages: {},
        rules: [],
        data: {
          incompleteFallbackMessage: null
        }
      });
      assert.equal(helpers.incompleteFallbackMessage(), '');
    });

    it('returns `` when set to undefined', () => {
      axe._load({
        messages: {},
        rules: [],
        data: {
          incompleteFallbackMessage: undefined
        }
      });
      assert.equal(helpers.incompleteFallbackMessage(), '');
    });
  });
});
