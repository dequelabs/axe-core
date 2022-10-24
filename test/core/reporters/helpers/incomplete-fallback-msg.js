describe('helpers.incompleteFallbackMessage', function () {
  'use strict';

  it('returns a non-empty string by default', function () {
    var summary = helpers.incompleteFallbackMessage();
    assert.typeOf(summary, 'string');
    assert.notEqual(summary, '');
  });

  it('should return a string', function () {
    axe._load({
      messages: {},
      rules: [],
      data: {
        incompleteFallbackMessage: 'Dogs are the best'
      }
    });
    var summary = helpers.incompleteFallbackMessage();
    assert.equal(summary, 'Dogs are the best');
  });

  it('should handle doT.js template function', function () {
    axe._load({
      messages: {},
      rules: [],
      data: {
        incompleteFallbackMessage: function anonymous() {
          return 'Dogs are the best';
        }
      }
    });

    var summary = helpers.incompleteFallbackMessage();
    assert.equal(summary, 'Dogs are the best');
  });

  describe('when passed an invalid value', function () {
    it('returns `` when set to an object', function () {
      axe._load({
        messages: {},
        rules: [],
        data: {
          incompleteFallbackMessage: {}
        }
      });
      assert.equal(helpers.incompleteFallbackMessage(), '');
    });

    it('returns `` when set to null', function () {
      axe._load({
        messages: {},
        rules: [],
        data: {
          incompleteFallbackMessage: null
        }
      });
      assert.equal(helpers.incompleteFallbackMessage(), '');
    });

    it('returns `` when set to undefined', function () {
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
