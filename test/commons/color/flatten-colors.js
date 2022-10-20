describe('color.flattenColors', function () {
  'use strict';

  it('should flatten colors properly', function () {
    var halfblack = new axe.commons.color.Color(0, 0, 0, 0.5);
    var fullblack = new axe.commons.color.Color(0, 0, 0, 1);
    var transparent = new axe.commons.color.Color(0, 0, 0, 0);
    var white = new axe.commons.color.Color(255, 255, 255, 1);
    var gray = new axe.commons.color.Color(128, 128, 128, 1);
    var halfRed = new axe.commons.color.Color(255, 0, 0, 0.5);
    var quarterLightGreen = new axe.commons.color.Color(0, 128, 0, 0.25);

    var flat = axe.commons.color.flattenColors(halfblack, white);
    assert.equal(flat.red, gray.red);
    assert.equal(flat.green, gray.green);
    assert.equal(flat.blue, gray.blue);

    var flat2 = axe.commons.color.flattenColors(fullblack, white);
    assert.equal(flat2.red, fullblack.red);
    assert.equal(flat2.green, fullblack.green);
    assert.equal(flat2.blue, fullblack.blue);

    var flat3 = axe.commons.color.flattenColors(transparent, white);
    assert.equal(flat3.red, white.red);
    assert.equal(flat3.green, white.green);
    assert.equal(flat3.blue, white.blue);

    var flat4 = axe.commons.color.flattenColors(halfRed, white);
    assert.equal(flat4.red, 255);
    assert.equal(flat4.green, 128);
    assert.equal(flat4.blue, 128);
    assert.equal(flat4.alpha, 1);

    var flat5 = axe.commons.color.flattenColors(quarterLightGreen, white);
    assert.equal(flat5.red, 191);
    assert.equal(flat5.green, 223);
    assert.equal(flat5.blue, 191);
    assert.equal(flat5.alpha, 1);

    var flat6 = axe.commons.color.flattenColors(quarterLightGreen, halfRed);
    assert.equal(flat6.red, 153);
    assert.equal(flat6.green, 51);
    assert.equal(flat6.blue, 0);
    assert.equal(flat6.alpha, 0.625);
  });
});

describe('color.flattenColors mix-blend-mode functions', function () {
  'use strict';

  var colourOne = new axe.commons.color.Color(216, 22, 22, 1);
  var colourTwo = new axe.commons.color.Color(114, 129, 114, 0.25);

  var colourThree = new axe.commons.color.Color(211, 162, 180, 1);
  var colourFour = new axe.commons.color.Color(115, 255, 0, 0.5);

  it('should flatten colors correctly using blend mode: multiply', function () {
    var flatten = axe.commons.color.flattenColors(
      colourTwo,
      colourOne,
      'multiply'
    );
    assert.equal(flatten.red, 186);
    assert.equal(flatten.green, 19);
    assert.equal(flatten.blue, 19);
    assert.equal(flatten.alpha, 1);

    var flattenTwo = axe.commons.color.flattenColors(
      colourFour,
      colourThree,
      'multiply'
    );
    assert.equal(flattenTwo.red, 153);
    assert.equal(flattenTwo.green, 162);
    assert.equal(flattenTwo.blue, 90);
    assert.equal(flattenTwo.alpha, 1);
  });

  it('should flatten colors correctly using blend mode: screen', function () {
    var flatten = axe.commons.color.flattenColors(
      colourTwo,
      colourOne,
      'screen'
    );
    assert.equal(flatten.red, 220);
    assert.equal(flatten.green, 51);
    assert.equal(flatten.blue, 48);
    assert.equal(flatten.alpha, 1);

    var flattenTwo = axe.commons.color.flattenColors(
      colourFour,
      colourThree,
      'screen'
    );
    assert.equal(flattenTwo.red, 221);
    assert.equal(flattenTwo.green, 209);
    assert.equal(flattenTwo.blue, 180);
    assert.equal(flattenTwo.alpha, 1);
  });

  it('should flatten colors correctly using blend mode: overlay', function () {
    var flatten = axe.commons.color.flattenColors(
      colourTwo,
      colourOne,
      'overlay'
    );
    assert.equal(flatten.red, 215);
    assert.equal(flatten.green, 22);
    assert.equal(flatten.blue, 21);
    assert.equal(flatten.alpha, 1);
  });

  it('should flatten colors correctly using blend mode: darken', function () {
    var flatten = axe.commons.color.flattenColors(
      colourTwo,
      colourOne,
      'darken'
    );
    assert.equal(flatten.red, 191);
    assert.equal(flatten.green, 22);
    assert.equal(flatten.blue, 22);
    assert.equal(flatten.alpha, 1);

    var flattenTwo = axe.commons.color.flattenColors(
      colourFour,
      colourThree,
      'darken'
    );
    assert.equal(flattenTwo.red, 163);
    assert.equal(flattenTwo.green, 162);
    assert.equal(flattenTwo.blue, 90);
    assert.equal(flattenTwo.alpha, 1);
  });

  it('should flatten colors correctly using blend mode: lighten', function () {
    var flatten = axe.commons.color.flattenColors(
      colourTwo,
      colourOne,
      'lighten'
    );
    assert.equal(flatten.red, 216);
    assert.equal(flatten.green, 49);
    assert.equal(flatten.blue, 45);
    assert.equal(flatten.alpha, 1);

    var flattenTwo = axe.commons.color.flattenColors(
      colourFour,
      colourThree,
      'lighten'
    );
    assert.equal(flattenTwo.red, 211);
    assert.equal(flattenTwo.green, 209);
    assert.equal(flattenTwo.blue, 180);
    assert.equal(flattenTwo.alpha, 1);
  });

  it('should flatten colors correctly using blend mode: color-dodge', function () {
    var flatten = axe.commons.color.flattenColors(
      colourTwo,
      colourOne,
      'color-dodge'
    );
    assert.equal(flatten.red, 226);
    assert.equal(flatten.green, 28);
    assert.equal(flatten.blue, 26);
    assert.equal(flatten.alpha, 1);

    var flattenTwo = axe.commons.color.flattenColors(
      colourFour,
      colourThree,
      'color-dodge'
    );
    assert.equal(flattenTwo.red, 233);
    assert.equal(flattenTwo.green, 209);
    assert.equal(flattenTwo.blue, 180);
    assert.equal(flattenTwo.alpha, 1);
  });

  it('should flatten colors correctly using blend mode: color-burn', function () {
    var flatten = axe.commons.color.flattenColors(
      colourTwo,
      colourOne,
      'color-burn'
    );
    assert.equal(flatten.red, 204);
    assert.equal(flatten.green, 17);
    assert.equal(flatten.blue, 17);
    assert.equal(flatten.alpha, 1);

    var flattenTwo = axe.commons.color.flattenColors(
      colourFour,
      colourThree,
      'color-burn'
    );
    assert.equal(flattenTwo.red, 184);
    assert.equal(flattenTwo.green, 162);
    assert.equal(flattenTwo.blue, 90);
    assert.equal(flattenTwo.alpha, 1);
  });

  it('should flatten colors correctly using blend mode: hard-light', function () {
    var flatten = axe.commons.color.flattenColors(
      colourTwo,
      colourOne,
      'hard-light'
    );
    assert.equal(flatten.red, 210);
    assert.equal(flatten.green, 23);
    assert.equal(flatten.blue, 21);
    assert.equal(flatten.alpha, 1);

    var flattenTwo = axe.commons.color.flattenColors(
      colourFour,
      colourThree,
      'hard-light'
    );
    assert.equal(flattenTwo.red, 201);
    assert.equal(flattenTwo.green, 209);
    assert.equal(flattenTwo.blue, 90);
    assert.equal(flattenTwo.alpha, 1);
  });

  it('should flatten colors correctly using blend mode: soft-light', function () {
    var flatten = axe.commons.color.flattenColors(
      colourTwo,
      colourOne,
      'soft-light'
    );
    assert.equal(flatten.red, 215);
    assert.equal(flatten.green, 22);
    assert.equal(flatten.blue, 21);
    assert.equal(flatten.alpha, 1);

    var flattenTwo = axe.commons.color.flattenColors(
      colourFour,
      colourThree,
      'soft-light'
    );
    assert.equal(flattenTwo.red, 209);
    assert.equal(flattenTwo.green, 183);
    assert.equal(flattenTwo.blue, 154);
    assert.equal(flattenTwo.alpha, 1);
  });

  it('should flatten colors correctly using blend mode: difference', function () {
    var flatten = axe.commons.color.flattenColors(
      colourTwo,
      colourOne,
      'difference'
    );
    assert.equal(flatten.red, 188);
    assert.equal(flatten.green, 43);
    assert.equal(flatten.blue, 40);
    assert.equal(flatten.alpha, 1);

    var flattenTwo = axe.commons.color.flattenColors(
      colourFour,
      colourThree,
      'difference'
    );
    assert.equal(flattenTwo.red, 154);
    assert.equal(flattenTwo.green, 128);
    assert.equal(flattenTwo.blue, 180);
    assert.equal(flattenTwo.alpha, 1);
  });

  it('should flatten colors correctly using blend mode: exclusion', function () {
    var flatten = axe.commons.color.flattenColors(
      colourTwo,
      colourOne,
      'exclusion'
    );
    assert.equal(flatten.red, 196);
    assert.equal(flatten.green, 49);
    assert.equal(flatten.blue, 46);
    assert.equal(flatten.alpha, 1);

    var flattenTwo = axe.commons.color.flattenColors(
      colourFour,
      colourThree,
      'exclusion'
    );
    assert.equal(flattenTwo.red, 173);
    assert.equal(flattenTwo.green, 128);
    assert.equal(flattenTwo.blue, 180);
    assert.equal(flattenTwo.alpha, 1);
  });
});
