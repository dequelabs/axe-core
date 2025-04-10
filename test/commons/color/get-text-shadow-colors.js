describe('axe.commons.color.getTextShadowColors', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var getTextShadowColors = axe.commons.color.getTextShadowColors;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns an empty array when there is no text-shadow', function () {
    fixture.innerHTML = '<span>Hello world</span>';
    var span = fixture.querySelector('span');
    var shadowColors = getTextShadowColors(span);
    assert.lengthOf(shadowColors, 0);
  });

  it('returns a rgb values of each text-shadow color', function () {
    fixture.innerHTML =
      '<span style="text-shadow: ' +
      '1px 1px 2px #F00, rgb(0, 0, 255) 0 0 1em, \n0\t 0  0.2em green;' +
      '">Hello world</span>';

    var span = fixture.querySelector('span');
    var shadowColors = getTextShadowColors(span);

    assert.lengthOf(shadowColors, 3);
    assert.equal(shadowColors[0].red, 255);
    assert.equal(shadowColors[0].green, 0);
    assert.equal(shadowColors[0].blue, 0);

    assert.equal(shadowColors[1].red, 0);
    assert.equal(shadowColors[1].blue, 255);
    assert.equal(shadowColors[1].green, 0);

    assert.equal(shadowColors[2].red, 0);
    assert.equal(shadowColors[2].green, 128);
    assert.equal(shadowColors[2].blue, 0);
  });

  it('returns transparent if the blur radius is greater than the offset', function () {
    fixture.innerHTML =
      '<span style="text-shadow: ' +
      '1px 3px 2px red, blue 10px 0 9px, 20px 20px 18px green;' +
      '">Hello world</span>';
    var span = fixture.querySelector('span');
    var shadowColors = getTextShadowColors(span);

    assert.lengthOf(shadowColors, 3);
    assert.equal(shadowColors[0].alpha, 0);
    assert.equal(shadowColors[1].alpha, 0);
    assert.equal(shadowColors[2].alpha, 0);
  });

  it('returns an estimated alpha value based on blur radius', function () {
    fixture.innerHTML =
      '<span style="text-shadow: ' +
      '1px 1px 2px red, blue 0 0 10px, \n0\t 0  18px green;' +
      '">Hello world</span>';

    var span = fixture.querySelector('span');
    var shadowColors = getTextShadowColors(span);
    var expected0 = 3.7 / (2 + 8);
    var expected1 = 3.7 / (10 + 8);
    var expected2 = 3.7 / (18 + 8);

    assert.lengthOf(shadowColors, 3);
    assert.closeTo(shadowColors[0].alpha, expected0, 0.05);
    assert.closeTo(shadowColors[1].alpha, expected1, 0.05);
    assert.closeTo(shadowColors[2].alpha, expected2, 0.05);
  });

  it('returns an alpha of 1 if blur radius is 0', function () {
    fixture.innerHTML =
      '<span style="text-shadow: ' +
      '0px 0px 0 red, blue 0 0 0, \n0\t 0  0 green, 0px 0px red;' +
      '">Hello world</span>';

    var span = fixture.querySelector('span');
    var shadowColors = getTextShadowColors(span);

    assert.lengthOf(shadowColors, 4);
    assert.equal(shadowColors[0].alpha, 1);
    assert.equal(shadowColors[1].alpha, 1);
    assert.equal(shadowColors[2].alpha, 1);
    assert.equal(shadowColors[3].alpha, 1);
  });

  it('handles floating point values', function () {
    fixture.innerHTML =
      '<span style="text-shadow: ' +
      '0 0.1px .2px red' +
      '">Hello world</span>';

    var span = fixture.querySelector('span');
    var shadowColors = getTextShadowColors(span);
    var expectedAlpha = 3.7 / (0.12 + 8);

    assert.lengthOf(shadowColors, 1);
    assert.closeTo(shadowColors[0].alpha, expectedAlpha, 0.01);
  });

  it('combines the blur radius alpha with the alpha of the text-shadow color', function () {
    fixture.innerHTML =
      '<span style="text-shadow: ' +
      'rgba(255, 0, 0, 0) 0 0 2px, rgba(255,0,0,0.5) 0 0 2px, rgba(255,0,0,0.8) 0 0 2px' +
      '">Hello world</span>';

    var span = fixture.querySelector('span');
    var shadowColors = getTextShadowColors(span);
    var expected1 = (3.7 / (2 + 8)) * 0.5;
    var expected2 = (3.7 / (2 + 8)) * 0.8;

    assert.lengthOf(shadowColors, 3);
    assert.closeTo(shadowColors[0].alpha, 0, 0.05);
    assert.closeTo(shadowColors[1].alpha, expected1, 0.05);
    assert.closeTo(shadowColors[2].alpha, expected2, 0.05);
  });

  it('treats the blur radius as 0 when left undefined', function () {
    fixture.innerHTML =
      '<span style="text-shadow: ' + '1px 2px red' + '">Hello world</span>';

    var span = fixture.querySelector('span');
    var shadowColors = getTextShadowColors(span);

    assert.lengthOf(shadowColors, 1);
    assert.equal(shadowColors[0].alpha, 0);
  });

  it('uses text color if text-shadow color is ommitted', function () {
    fixture.innerHTML =
      '<span style="color: red;' +
      'text-shadow: 1px 1px 1px;' +
      '">Hello world</span>';
    var span = fixture.querySelector('span');
    var shadowColors = getTextShadowColors(span);

    assert.lengthOf(shadowColors, 1);
    assert.equal(shadowColors[0].red, 255);
    assert.equal(shadowColors[0].green, 0);
    assert.equal(shadowColors[0].blue, 0);
  });

  it('returns null if a shadows has a ratio less than minRatio', function () {
    fixture.innerHTML =
      '<span style="text-shadow: ' +
      '0 0 1em #F00, 0 0 0.5em #0F0, 1px 1px 0.2em #00F;' +
      '">Hello world</span>';

    var span = fixture.querySelector('span');
    var shadowColors = getTextShadowColors(span, { minRatio: 0.5 });
    assert.isNull(shadowColors);
  });

  it('does not return shadows with a ratio less than maxRatio', function () {
    fixture.innerHTML =
      '<span style="text-shadow: ' +
      '0 0 1em #F00, 0 0 0.5em #0F0, 1px 1px 0.2em #00F;' +
      '">Hello world</span>';

    var span = fixture.querySelector('span');
    var shadowColors = getTextShadowColors(span, { maxRatio: 0.5 });

    assert.lengthOf(shadowColors, 1);
    assert.equal(shadowColors[0].blue, 255);
  });

  it('returns a transparent shadow when x offset is greater than blur', function () {
    fixture.innerHTML =
      '<span style="text-shadow: 1px 0 0 #F00">Hello world</span>';
    var span = fixture.querySelector('span');
    var shadowColors = getTextShadowColors(span);
    assert.lengthOf(shadowColors, 1);
    assert.equal(shadowColors[0].red, 0);
    assert.equal(shadowColors[0].green, 0);
    assert.equal(shadowColors[0].blue, 0);
    assert.equal(shadowColors[0].alpha, 0);
  });

  it('returns a transparent shadow when y offset is greater than blur', function () {
    fixture.innerHTML =
      '<span style="text-shadow: 0 1px 0 #F00">Hello world</span>';
    var span = fixture.querySelector('span');
    var shadowColors = getTextShadowColors(span);
    assert.lengthOf(shadowColors, 1);
    assert.equal(shadowColors[0].red, 0);
    assert.equal(shadowColors[0].green, 0);
    assert.equal(shadowColors[0].blue, 0);
    assert.equal(shadowColors[0].alpha, 0);
  });

  describe('with shadows that combine to a stroke', () => {
    const opt = { minRatio: 0.01 };
    it('combines multiple shadows without blur into a single stroke', () => {
      fixture.innerHTML = `
        <span style="text-shadow:
          0 -2px #F00,
          2px 0 #F00,
          0 2px #F00,
          -2px 0 #F00;
        ">Hello world</span>
      `;
      const shadowColors = getTextShadowColors(fixture.firstElementChild, opt);
      assert.lengthOf(shadowColors, 1);
      assert.deepEqual(shadowColors[0].toJSON(), {
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1
      });
    });

    it('only combines shadows thinner than minRatio', () => {
      const minRatio = 0.1; // .1em (has to be greater than 1px, or this will be null)
      fixture.innerHTML = `
        <span style="text-shadow:
          0 -2px ${minRatio}em #000,
          2px 0 ${minRatio}em #000,
          0 2px ${minRatio}em #000,
          -2px 0 ${minRatio}em #000;
        ">Hello wold</span>
      `;
      const shadowColors = getTextShadowColors(fixture.firstElementChild, {
        minRatio
      });
      assert.lengthOf(shadowColors, 4);
    });

    it('places the combined shadow in the correct order with shadows', () => {
      fixture.innerHTML = `
        <span style="text-shadow:
          0 -1px #000, 1px 0 #000, 0 1px #000, -1px 0 #000,
          0 0 1em #111,
          0 -1px #222, 1px 0 #222, 0 1px #222, -1px 0 #222,
          1px 1px 0.2em #333;
        ">Hello wold</span>
      `;
      const shadowColors = getTextShadowColors(fixture.firstElementChild, opt);
      const hexColors = shadowColors.map(color => color.toHexString()[1]);
      assert.deepEqual(['0', '1', '2', '3'], hexColors);
    });

    it('returns null when when thin shadows are not all the way around the text', () => {
      fixture.innerHTML = `
        <span style="text-shadow:
          0 -2px #000,
          2px 0 #000,
          0 2px #000;
        ">Hello wold</span>
      `;
      const shadowColors = getTextShadowColors(fixture.firstElementChild, opt);
      assert.isNull(shadowColors);
    });

    it('ignores partial strokes with ignoreEdgeCount: true', () => {
      fixture.innerHTML = `
        <span style="text-shadow:
          2px 1px 2px #F00,
          0 -2px #000,
          2px 0 #000,
          0 2px #000;
        ">Hello wold</span>
      `;
      const shadowColors = getTextShadowColors(fixture.firstElementChild, {
        ...opt,
        ignoreEdgeCount: true
      });
      assert.lengthOf(shadowColors, 1);
      assert.equal(shadowColors[0].red, 255);
    });
  });
});
