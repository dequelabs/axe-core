describe('color.Color', function () {
  'use strict';
  var Color = axe.commons.color.Color;

  describe('parseColorFnString', function () {
    it('should set values properly via RGB', function () {
      var c = new Color();
      c.parseColorFnString('rgb(17, 34,  51)');
      assert.equal(c.red, 17);
      assert.equal(c.green, 34);
      assert.equal(c.blue, 51);
      assert.equal(c.alpha, 1);
    });

    it('should set values properly via RGBA', function () {
      var c = new Color();
      c.parseColorFnString('rgba(17, 34,51,  0.2)');
      assert.equal(c.red, 17);
      assert.equal(c.green, 34);
      assert.equal(c.blue, 51);
      assert.closeTo(c.alpha, 0.2, 0.01);
    });

    it('allows decimal values, with and without the integer', function () {
      var c = new Color();
      c.parseColorFnString('rgba(.1, 23.4, 56.7,  .89)');
      assert.closeTo(c.red, 0.1, 0.01);
      assert.closeTo(c.green, 23.4, 0.01);
      assert.closeTo(c.blue, 56.7, 0.01);
      assert.closeTo(c.alpha, 0.89, 0.01);
    });

    it('allows percentages', function () {
      var c = new Color();
      c.parseColorFnString('rgba(100%, 100%, 0%, 50%)');
      assert.equal(c.red, 255);
      assert.equal(c.green, 255);
      assert.equal(c.blue, 0);
      assert.equal(c.alpha, 0.5);
    });

    it('allows exponent numbers', function () {
      var c = new Color();
      c.parseColorFnString('rgb(2e0, 2e1, 2e2)');
      assert.equal(c.red, 2);
      assert.equal(c.green, 20);
      assert.equal(c.blue, 200);
      assert.equal(c.alpha, 1);
    });

    it('supports space separated notation', function () {
      var c = new Color();
      c.parseColorFnString('rgba(255 128 0 / 50%)');
      assert.equal(c.red, 255);
      assert.equal(c.green, 128);
      assert.equal(c.blue, 0);
      assert.equal(c.alpha, 0.5);
    });

    it('allows alpha values in rgb()', function () {
      var c = new Color();
      c.parseColorFnString('rgb(255 128 0 / 50%)');
      assert.equal(c.red, 255);
      assert.equal(c.green, 128);
      assert.equal(c.blue, 0);
      assert.equal(c.alpha, 0.5);
    });

    describe('with hsl(a)', function () {
      it('allows hsl', function () {
        var c = new Color();
        c.parseColorFnString('hsl(160, 40%, 50%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 145);
        assert.equal(c.alpha, 1);
      });

      it('allows hsla', function () {
        var c = new Color();
        c.parseColorFnString('hsla(160, 40%, 50%, .5)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 145);
        assert.equal(c.alpha, 0.5);
      });

      it('allows hsl with space notation', function () {
        var c = new Color();
        c.parseColorFnString('hsl(160 40% 50% / 5%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 145);
        assert.equal(c.alpha, 0.05);
      });

      it('supports deg on hue', function () {
        var c = new Color();
        c.parseColorFnString('hsl(160deg, 40%, 50%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 145);
        assert.equal(c.alpha, 1);
      });

      it('supports rad on hue', function () {
        var c = new Color();
        c.parseColorFnString('hsl(2.8rad, 40%, 50%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 145);
        assert.equal(c.alpha, 1);
      });

      it('supports turn on hue', function () {
        var c = new Color();
        c.parseColorFnString('hsl(0.446turn, 40%, 50%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 145);
        assert.equal(c.alpha, 1);
      });
    });
  });

  describe('parseHexString', function () {
    it('returns values from a 6 digit hex string', function () {
      var color = new Color();
      color.parseHexString('#123Abc');
      assert.equal(color.red, 18);
      assert.equal(color.green, 58);
      assert.equal(color.blue, 188);
      assert.equal(color.alpha, 1);
    });

    it('returns values from a 3 digit hex string', function () {
      var color = new Color();
      color.parseHexString('#19E');
      assert.equal(color.red, 17);
      assert.equal(color.green, 153);
      assert.equal(color.blue, 238);
      assert.equal(color.alpha, 1);
    });

    it('returns values from a 8 digit hex string', function () {
      var color = new Color();
      color.parseHexString('#123ABCde');
      assert.equal(color.red, 18);
      assert.equal(color.green, 58);
      assert.equal(color.blue, 188);
      assert.closeTo(color.alpha, 222 / 255, 0.001);
    });

    it('returns values from a 4 digit hex string', function () {
      var color = new Color();
      color.parseHexString('#19EC');
      assert.equal(color.red, 17);
      assert.equal(color.green, 153);
      assert.equal(color.blue, 238);
      assert.closeTo(color.alpha, 204 / 255, 0.01);
    });

    it('does nothing when passed an invalid string', function () {
      var color = new Color(1, 2, 3, 0.4);
      var values = ['abcdef', '#abcde', '#XYZ', '#0123456789'];
      values.forEach(function (val) {
        color.parseHexString(val);
        assert.equal(color.red, 1);
        assert.equal(color.green, 2);
        assert.equal(color.blue, 3);
        assert.equal(color.alpha, 0.4);
      });
    });
  });

  describe('parseString', function () {
    it('sets the value of a named color', function () {
      var color = new Color();
      color.parseString('chocolate');
      assert.equal(color.red, 210);
      assert.equal(color.green, 105);
      assert.equal(color.blue, 30);
      assert.equal(color.alpha, 1);
    });

    it('returns everything on 0 with transparent', function () {
      var color = new Color(255, 255, 255, 1);
      color.parseString('transparent');
      assert.equal(color.red, 0);
      assert.equal(color.green, 0);
      assert.equal(color.blue, 0);
      assert.equal(color.alpha, 0);
    });

    it('sets hex colors', function () {
      var color = new Color();
      color.parseString('#F00C');
      assert.equal(color.red, 255);
      assert.equal(color.green, 0);
      assert.equal(color.blue, 0);
      assert.closeTo(color.alpha, 204 / 255, 0.01);
    });

    it('sets rgb colors', function () {
      var color = new Color();
      color.parseString('rgb(10, 20, 30)');
      assert.equal(color.red, 10);
      assert.equal(color.green, 20);
      assert.equal(color.blue, 30);
      assert.equal(color.alpha, 1);
    });

    it('sets rgba colors', function () {
      var color = new Color();
      color.parseString('rgba(10, 20, 30, 0.4)');
      assert.equal(color.red, 10);
      assert.equal(color.green, 20);
      assert.equal(color.blue, 30);
      assert.equal(color.alpha, 0.4);
    });

    it('allows hsl', function () {
      var c = new Color();
      c.parseString('hsl(160, 40%, 50%)');
      assert.equal(c.red, 77);
      assert.equal(c.green, 179);
      assert.equal(c.blue, 145);
      assert.equal(c.alpha, 1);
    });

    it('allows hsla', function () {
      var c = new Color();
      c.parseString('hsla(160, 40%, 50%, .5)');
      assert.equal(c.red, 77);
      assert.equal(c.green, 179);
      assert.equal(c.blue, 145);
      assert.equal(c.alpha, 0.5);
    });
  });

  describe('toHexString', function () {
    it('should return hex values properly', function () {
      var black = new Color(0, 0, 0, 1);
      var white = new Color(255, 255, 255, 1);
      var yellow = new Color(255, 255, 0, 1);
      var darkyellow = new Color(128, 128, 0, 1);
      var blue = new Color(0, 0, 255, 1);
      assert.equal(black.toHexString(), '#000000');
      assert.equal(white.toHexString(), '#ffffff');
      assert.equal(yellow.toHexString(), '#ffff00');
      assert.equal(darkyellow.toHexString(), '#808000');
      assert.equal(blue.toHexString(), '#0000ff');
    });

    it('should return hex values properly when they are non-integery', function () {
      var black = new Color(0, 0, 0, 1);
      var white = new Color(255, 255, 255, 0.1);
      var grayish = axe.commons.color.flattenColors(white, black);
      assert.equal(grayish.toHexString(), '#1a1a1a');
    });
  });

  describe('getRelativeLuminance', function () {
    it('should calculate luminance sensibly', function () {
      var black = new Color(0, 0, 0, 1);
      var white = new Color(255, 255, 255, 1);
      var yellow = new Color(255, 255, 0, 1);
      var darkyellow = new Color(128, 128, 0, 1);
      var blue = new Color(0, 0, 255, 1);
      var lBlack = black.getRelativeLuminance();
      var lWhite = white.getRelativeLuminance();
      var lYellow = yellow.getRelativeLuminance();
      var lDarkyellow = darkyellow.getRelativeLuminance();
      var lBlue = blue.getRelativeLuminance();

      //values range from zero to one
      assert.equal(lBlack, 0);
      assert.equal(lWhite, 1);

      //brighter values are more luminant than darker ones
      assert.isTrue(lWhite > lYellow);
      assert.isTrue(lYellow > lDarkyellow);
      assert.isTrue(lYellow > lBlue);
      assert.isTrue(lBlue > lBlack);
    });
  });
});
