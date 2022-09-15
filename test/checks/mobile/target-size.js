describe('target-size tests', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;
  var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  var shadowSupport = axe.testUtils.shadowSupport.v1;
  var isIE11 = axe.testUtils.isIE11;
  var check = checks['target-size'];

  afterEach(function () {
    checkContext.reset();
  });

  // IE cannot count
  (isIE11 ? xit : it)(
    'returns false for targets smaller than minSize',
    function () {
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
    }
  );

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
      messageKey: 'obscured',
      minSize: 24,
      width: 20,
      height: 30
    });
  });

  (shadowSupport ? it : xit)('works across shadow boundaries', function () {
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
      messageKey: 'obscured',
      minSize: 24,
      width: 20,
      height: 30
    });
  });
});
