describe('target-size tests', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;
  var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  var check = checks['target-size'];

  afterEach(function () {
    checkContext.reset();
  });

  it('returns false for targets smaller than minSize', function () {
    var checkArgs = checkSetup(
      '<button id="target" style="' +
        'display: inline-block; width:20px; height:30px;' +
        '">x</button>'
    );
    assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      minSize: 24,
      width: 20,
      height: 30
    });
  });

  it('returns true for unobscured targets larger than minSize', function () {
    var checkArgs = checkSetup(
      '<button id="target" style="' +
        'display: inline-block; width:40px; height:30px;' +
        '">x</button>'
    );
    assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      minSize: 24,
      width: 40,
      height: 30
    });
  });

  describe('when fully obscured', function () {
    it('returns true, regardless of size', function () {
      var checkArgs = checkSetup(
        '<a href="#" id="target" style="' +
          'display: inline-block; width:20px; height:20px;' +
          '">x</a>' +
          '<div style="' +
          'display: inline-block; width:20px; height:20px; margin-left: -20px;' +
          '">x</div>'
      );
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, { messageKey: 'obscured' });
    });

    it('returns true when obscured by another focusable widget', function () {
      var checkArgs = checkSetup(
        '<a href="#" id="target" style="' +
          'display: inline-block; width:20px; height:20px;' +
          '">x</a>' +
          '<a href="#" style="' +
          'display: inline-block; width:20px; height:20px; margin-left: -20px;' +
          '">x</a>'
      );
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        messageKey: 'obscured',
        minSize: 24,
        width: 20,
        height: 20
      });
    });

    it('ignores obscuring element has pointer-events:none', function () {
      var checkArgs = checkSetup(
        '<a href="#" id="target" style="' +
          'display: inline-block; width:20px; height:20px;' +
          '">x</a>' +
          '<span style="' +
          'display: inline-block; pointer-events: none; width:20px; height:20px; margin-left: -20px;' +
          '">x</span>'
      );
      assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        minSize: 24,
        width: 20,
        height: 20
      });
    });
  });

  describe('when partially obscured', function () {
    it('returns true for focusable non-widgets', function () {
      var checkArgs = checkSetup(
        '<button id="target" style="' +
          'display: inline-block; width:40px; height:30px; margin-left:30px;' +
          '">x</button>' +
          '<button style="' +
          'display: inline-block; width:40px; height:30px; margin-left: -10px;' +
          '">x</button>' +
          '<span tabindex="0" style="' +
          'display: inline-block; width:40px; height:30px; margin-left: -100px;' +
          '">x</span>'
      );
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        minSize: 24,
        width: 30,
        height: 30
      });
    });

    it('returns true for non-focusable widgets', function () {
      var checkArgs = checkSetup(
        '<button id="target" style="' +
          'display: inline-block; width:40px; height:30px; margin-left:30px;' +
          '">x</button>' +
          '<button style="' +
          'display: inline-block; width:40px; height:30px; margin-left: -10px;' +
          '">x</button>' +
          '<button disabled style="' +
          'display: inline-block; width:40px; height:30px; margin-left: -100px;' +
          '">x</button>'
      );
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        minSize: 24,
        width: 30,
        height: 30
      });
    });

    describe('by a focusable widget', function () {
      it('returns true for obscured targets with insufficient space', function () {
        var checkArgs = checkSetup(
          '<button id="target" style="' +
            'display: inline-block; width:40px; height:30px;' +
            '">x</button>' +
            '<button style="' +
            'display: inline-block; width:40px; height:30px; margin-left: -10px;' +
            '">x</button>'
        );
        assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
        assert.deepEqual(checkContext._data, {
          minSize: 24,
          width: 30,
          height: 30
        });
      });

      it('returns false for obscured targets with insufficient space', function () {
        var checkArgs = checkSetup(
          '<button id="target" style="' +
            'display: inline-block; width:40px; height:30px; margin-left:30px;' +
            '">x</button>' +
            '<button style="' +
            'display: inline-block; width:40px; height:30px; margin-left: -10px;' +
            '">x</button>' +
            '<button style="' +
            'display: inline-block; width:40px; height:30px; margin-left: -100px;' +
            '">x</button>'
        );
        assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
        assert.deepEqual(checkContext._data, {
          messageKey: 'partiallyObscured',
          minSize: 24,
          width: 20,
          height: 30
        });
      });
    });
  });

  it('works across shadow boundaries', function () {
    var checkArgs = shadowCheckSetup(
      '<span id="shadow"></span>' +
        '<button style="' +
        'display: inline-block; width:40px; height:30px; margin-left: -10px;' +
        '">x</button>' +
        '<button style="' +
        'display: inline-block; width:40px; height:30px; margin-left: -100px;' +
        '">x</button>',
      '<button id="target" style="' +
        'display: inline-block; width:40px; height:30px; margin-left:30px;' +
        '">x</button>'
    );
    assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      messageKey: 'partiallyObscured',
      minSize: 24,
      width: 20,
      height: 30
    });
  });
});
