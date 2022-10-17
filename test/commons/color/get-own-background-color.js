describe('color.getOwnBackgroundColor', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var getOwnBackgroundColor = axe.commons.color.getOwnBackgroundColor;

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('returns `new axe.commons.color.Color` instance when no background is set', function () {
    var vNode = queryFixture(
      '<div id="target" style="height: 40px; width: 30px;">' + '</div>'
    );
    var actual = getOwnBackgroundColor(
      window.getComputedStyle(vNode.actualNode)
    );
    assert.equal(actual.red, 0);
    assert.equal(actual.green, 0);
    assert.equal(actual.blue, 0);
    assert.equal(actual.alpha, 0);
  });

  it('returns color with rgba values of specified background-color value', function () {
    var vNode = queryFixture(
      '<div id="target" style="height: 40px; width: 30px; background-color: pink;">' +
        '</div>'
    );
    var actual = getOwnBackgroundColor(
      window.getComputedStyle(vNode.actualNode)
    );
    assert.equal(actual.red, 255);
    assert.equal(actual.green, 192);
    assert.equal(actual.blue, 203);
    assert.equal(actual.alpha, 1);
  });

  it('returns color with rgba values and alpha', function () {
    var vNode = queryFixture(
      '<div id="target" style="height: 20px; width: 15px; background-color: rgba(0, 128, 0, 0.5);">' +
        '</div>'
    );
    var actual = getOwnBackgroundColor(
      window.getComputedStyle(vNode.actualNode)
    );
    assert.equal(actual.red, 0);
    assert.equal(actual.green, 128);
    assert.equal(actual.blue, 0);
    assert.equal(actual.alpha, 0.5);
  });

  it('returns color with rgba values and opacity (for blending)', function () {
    var vNode = queryFixture(
      '<div id="target" style="height: 20px; width: 15px; opacity: 0.5; background-color: green;">' +
        '</div>'
    );
    var actual = getOwnBackgroundColor(
      window.getComputedStyle(vNode.actualNode)
    );
    assert.equal(actual.red, 0);
    assert.equal(actual.green, 128);
    assert.equal(actual.blue, 0);
    assert.equal(actual.alpha, 0.5);
  });

  it('returns color with rgba values, alpha and opacity', function () {
    var vNode = queryFixture(
      '<div id="target" style="height: 20px; width: 15px; opacity: 0.5; background-color: rgba(0, 128, 0, 0.5);">' +
        '</div>'
    );
    var actual = getOwnBackgroundColor(
      window.getComputedStyle(vNode.actualNode)
    );
    assert.equal(actual.red, 0);
    assert.equal(actual.green, 128);
    assert.equal(actual.blue, 0);
    assert.equal(actual.alpha, 0.25);
  });
});
