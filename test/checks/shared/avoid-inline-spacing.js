describe('avoid-inline-spacing tests', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var checkEvaluate = axe.testUtils.getCheckEvaluate('avoid-inline-spacing');
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('returns true when no inline spacing styles are specified', function () {
    var vNode = queryFixture(
      '<p id="target" style="font-size: 200%;">The quick brown fox jumped over the lazy dog</p>'
    );
    var actual = checkEvaluate.call(checkContext, vNode.actualNode);
    assert.isTrue(actual);
    assert.isNull(checkContext._data);
  });

  it('returns true when inline spacing styles has invalid value', function () {
    var vNode = queryFixture(
      '<p id="target" style="line-height: 5invalid;">The quick brown fox jumped over the lazy dog</p>'
    );
    var actual = checkEvaluate.call(checkContext, vNode.actualNode);
    assert.isTrue(actual);
    assert.isNull(checkContext._data);
  });

  it('returns true when inline spacing styles has invalid value and `!important` priority', function () {
    var vNode = queryFixture(
      '<p id="target" style="line-height: invalid !important;">The quick brown fox jumped over the lazy dog</p>'
    );
    var actual = checkEvaluate.call(checkContext, vNode.actualNode);
    assert.isTrue(actual);
    assert.isNull(checkContext._data);
  });

  it('returns true when `line-height` style specified has no `!important` priority', function () {
    var vNode = queryFixture(
      '<p id="target" style="line-height: 1.5;">The quick brown fox jumped over the lazy dog</p>'
    );
    var actual = checkEvaluate.call(checkContext, vNode.actualNode);
    assert.isTrue(actual);
    assert.isNull(checkContext._data);
  });

  it('returns true when `letter-spacing` style specified has no `!important` priority', function () {
    var vNode = queryFixture(
      '<p id="target" style="letter-spacing: 50px;">The quick brown fox jumped over the lazy dog</p>'
    );
    var actual = checkEvaluate.call(checkContext, vNode.actualNode);
    assert.isTrue(actual);
    assert.isNull(checkContext._data);
  });

  it('returns true when `word-spacing` style specified has no `!important` priority', function () {
    var vNode = queryFixture(
      '<p id="target" style="word-spacing: 10px;">The quick brown fox jumped over the lazy dog</p>'
    );
    var actual = checkEvaluate.call(checkContext, vNode.actualNode);
    assert.isTrue(actual);
    assert.isNull(checkContext._data);
  });

  it('returns true when none of the multiple inline spacing styles specified have priority of `!important`', function () {
    var vNode = queryFixture(
      '<p id="target" style="word-spacing: 20ch; letter-spacing: 50rem; line-height: 3;">The quick brown fox jumped over the lazy dog</p>'
    );
    var actual = checkEvaluate.call(checkContext, vNode.actualNode);
    assert.isTrue(actual);
    assert.isNull(checkContext._data);
  });

  it('returns false when `line-height` style specified has `!important` priority', function () {
    var vNode = queryFixture(
      '<p id="target" style="line-height: 1.5 !important;">The quick brown fox jumped over the lazy dog</p>'
    );
    var actual = checkEvaluate.call(checkContext, vNode.actualNode);
    assert.isFalse(actual);
    assert.deepEqual(checkContext._data, ['line-height']);
  });

  it('returns false when `letter-spacing` style specified has `!important` priority', function () {
    var vNode = queryFixture(
      '<p id="target" style="letter-spacing: 100em !important;">The quick brown fox jumped over the lazy dog</p>'
    );
    var actual = checkEvaluate.call(checkContext, vNode.actualNode);
    assert.isFalse(actual);
    assert.deepEqual(checkContext._data, ['letter-spacing']);
  });

  it('returns false when `word-spacing` style specified has `!important` priority', function () {
    var vNode = queryFixture(
      '<p id="target" style="word-spacing: -.4ch !important;">The quick brown fox jumped over the lazy dog</p>'
    );
    var actual = checkEvaluate.call(checkContext, vNode.actualNode);
    assert.isFalse(actual);
    assert.deepEqual(checkContext._data, ['word-spacing']);
  });

  it('returns false when any of the multiple inline spacing styles specifies priority of `!important`', function () {
    var vNode = queryFixture(
      '<p id="target" style="word-spacing: 200%; letter-spacing: 50rem !important; line-height: 3;">The quick brown fox jumped over the lazy dog</p>'
    );
    var actual = checkEvaluate.call(checkContext, vNode.actualNode);
    assert.isFalse(actual);
    assert.deepEqual(checkContext._data, ['letter-spacing']);
  });

  it('returns false when multiple inline spacing styles specifies priority of `!important`', function () {
    var vNode = queryFixture(
      '<p id="target" style="line-height: 3 !important; letter-spacing: 50rem !important;">The quick brown fox jumped over the lazy dog</p>'
    );
    var actual = checkEvaluate.call(checkContext, vNode.actualNode);
    assert.isFalse(actual);
    assert.deepEqual(checkContext._data, ['line-height', 'letter-spacing']);
  });

  it('supports options.cssProperties', function () {
    var vNode = queryFixture(
      '<p id="target" style="font-size: 14px !important; line-height: 3 !important; letter-spacing: 50rem !important">The quick brown fox jumped over the lazy dog</p>'
    );
    var actual = checkEvaluate.call(checkContext, vNode.actualNode, {
      cssProperties: ['font-size']
    });
    assert.isFalse(actual);
    assert.deepEqual(checkContext._data, ['font-size']);
  });
});
