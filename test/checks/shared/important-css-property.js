describe('important-css-property tests', function() {
  'use strict';
  var fixture = document.getElementById('fixture');
  var checkSetup = axe.testUtils.checkSetup;

  afterEach(function() {
    fixture.innerHTML = '';
  });

  describe('important-letter-spacing check', function () {
    var checkEvaluate = axe.testUtils.getCheckEvaluate('important-letter-spacing');
    var checkContext = axe.testUtils.MockCheckContext();
    afterEach(function() {
      checkContext.reset();
    });

    it('is true when the property is not set in the style attribute', function () {
      var params = checkSetup('<p style="width: 60%" id="target">Hello world</p>');
      var result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is false letter-spacing greater than 0.15em and !important', function () {
      var params = checkSetup(
        '<p style="letter-spacing: 0.1em !important" id="target">Hello world</p>'
      );
      var result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, { value: 0.1 });
    });

    it('is true when !important is not used', function () {
      var params = checkSetup(
        '<p style="letter-spacing: 0.1em" id="target">Hello world</p>'
      );
      var result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is true letter-spacing is 0.15 times the font-size', function () {
      var params = checkSetup(
        '<p style="letter-spacing: 0.15em !important" id="target">Hello world</p>'
      );
      var result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.deepEqual(checkContext._data, { value: 0.15 });
    });

    it('uses the highest priority value if multiple are set', function () {
      var style = [
        'letter-spacing: 0.15em !important',
        'letter-spacing: 0.1em !important',
        'letter-spacing: 0.2em'
      ].join('; ')
      var params = checkSetup('<p style="' + style + '" id="target">Hello world</p>');
      var result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, { value: 0.1 });
    });

    describe('handles different font-sizes', function () {
      it('is true when the font is 0.15 time the spacing', function () {
        var params = checkSetup(
          '<p style="font-size: 20px; letter-spacing: 3px !important" id="target">Hello world</p>'
        );
        var result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.deepEqual(checkContext._data, { value: 0.15 });
      });
      
      it('is false when the font is 0.10 time the spacing', function () {
        var params = checkSetup(
          '<p style="font-size: 30px; letter-spacing: 3px !important" id="target">Hello world</p>'
        );
        var result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.deepEqual(checkContext._data, { value: 0.1 });
      });
    })

    describe('with non-number values', function () {
      it('is false when `normal` (which is 0) is used along with !important', function () {
        var params = checkSetup(
          '<p style="letter-spacing: normal !important" id="target">Hello world</p>'
        );
        var result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.deepEqual(checkContext._data, { value: 0 });
      });
  
      it('is false when `initial` (meaning `normal`) is used along with !important', function () {
        var params = checkSetup(
          '<p style="letter-spacing: initial !important" id="target">Hello world</p>'
        );
        var result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.deepEqual(checkContext._data, { value: 0 });
      });

      it('is true when `inherited` is used along with !important', function () {
        var params = checkSetup(
          '<p style="letter-spacing: 0.1em">' +
          '<span style="letter-spacing: inherit !important;" id="target">Hello world</span</p>'
        );
        var result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.deepEqual(checkContext._data, { value: 'inherit' });
      });

      it('is true when `unset` is used along with !important', function () {
        var params = checkSetup(
          '<p style="letter-spacing: 0.1em">' +
          '<span style="letter-spacing: unset !important;" id="target">Hello world</span</p>'
        );
        var result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.deepEqual(checkContext._data, { value: 'unset' });
      });
    })
  });

  describe('important-word-spacing check', function () {
    var checkEvaluate = axe.testUtils.getCheckEvaluate('important-word-spacing');
    var checkContext = axe.testUtils.MockCheckContext();
    afterEach(function() {
      checkContext.reset();
    });

    it('is true when word-spacing is not set in the style attribute', function () {
      var params = checkSetup('<p style="width: 60%" id="target">Hello world</p>');
      var result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is true when below 0.16em and not !important', function () {
      var params = checkSetup(
        '<p style="word-spacing: 0.1em" id="target">Hello world</p>'
      );
      var result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is false when below 0.16em and !important', function () {
      var params = checkSetup(
        '<p style="word-spacing: 0.1em !important" id="target">Hello world</p>'
      );
      var result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, { value: 0.1 });
    });

    it('is true when 0.16em and !important', function () {
      var params = checkSetup(
        '<p style="word-spacing: 0.16em !important" id="target">Hello world</p>'
      );
      var result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.deepEqual(checkContext._data, { value: 0.16 });
    });
  });

  describe('important-line-height check', function () {
    var checkEvaluate = axe.testUtils.getCheckEvaluate('important-line-height');
    var checkContext = axe.testUtils.MockCheckContext();
    afterEach(function() {
      checkContext.reset();
    });

    it('is true when line-height is not set in the style attribute', function () {
      var params = checkSetup('<p style="width: 60%" id="target">Hello world</p>');
      var result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is true when below 1.5em and not !important', function () {
      var params = checkSetup(
        '<p style="line-height: 1.2em; max-width: 200px;" id="target">' + 
        '	The toy brought back fond memories of being lost in the rain forest.'+
        '</p>'
      );
      var result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is false when below 1.5em and !important', function () {
      var params = checkSetup(
        '<p style="line-height: 1.2em !important; max-width: 200px;" id="target">' + 
        '	The toy brought back fond memories of being lost in the rain forest.'+
        '</p>'
      );
      var result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, { value: 1.2 });
    });

    it('is true when 1.5em and !important', function () {
      var params = checkSetup(
        '<p style="line-height: 1.5em !important; max-width: 200px;" id="target">' + 
        '	The toy brought back fond memories of being lost in the rain forest.'+
        '</p>'
      );
      var result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.deepEqual(checkContext._data, { value: 1.5 });
    });

    it('is true for single line texts', function () {
      var params = checkSetup(
        '<p style="line-height: 1.2em !important; max-width: 200px;" id="target">' + 
        '	Short' +
        '</p>'
      );
      var result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });
  });
});
