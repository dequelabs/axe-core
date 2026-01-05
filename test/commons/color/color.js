describe('color.Color', () => {
  'use strict';
  const Color = axe.commons.color.Color;

  it('can be constructed without alpha', () => {
    const c1 = new Color(4, 3, 2);
    assert.equal(c1.red, 4);
    assert.equal(c1.green, 3);
    assert.equal(c1.blue, 2);
    assert.equal(c1.alpha, 1);
  });

  it('can be constructed from a Color', () => {
    const c1 = new Color(4, 3, 2, 0.5);
    const c2 = new Color(c1);
    assert.equal(c2.red, 4);
    assert.equal(c2.green, 3);
    assert.equal(c2.blue, 2);
    assert.equal(c2.alpha, 0.5);
  });

  it('clamps out of gamut values for red, green, blue', () => {
    const c1 = new Color(-255, 0, 510, 0.5);
    assert.equal(c1.red, 0);
    assert.equal(c1.green, 0);
    assert.equal(c1.blue, 255);
    assert.equal(c1.alpha, 0.5);
  });

  it('retains out of gamut values for r, g, b', () => {
    const c1 = new Color(-255, 0, 510, 0.5);
    assert.equal(c1.r, -1);
    assert.equal(c1.g, 0);
    assert.equal(c1.b, 2);
    assert.equal(c1.alpha, 0.5);
  });

  it('can be constructed from a Color preserving out of gamut values', () => {
    const c1 = new Color(-255, 0, 510, 0.5);
    const c2 = new Color(c1);
    assert.equal(c2.r, -1);
    assert.equal(c2.g, 0);
    assert.equal(c2.b, 2);
    assert.equal(c2.alpha, 0.5);
  });

  it('has a toJSON method', () => {
    const c1 = new Color(255, 128, 0);
    assert.deepEqual(c1.toJSON(), {
      red: 255,
      green: 128,
      blue: 0,
      alpha: 1
    });
  });

  describe('parseColorFnString', () => {
    describe('with rgb()', () => {
      it('should set values properly via RGB', () => {
        const c = new Color();
        c.parseColorFnString('rgb(17, 34,  51)');
        assert.equal(c.red, 17);
        assert.equal(c.green, 34);
        assert.equal(c.blue, 51);
        assert.equal(c.alpha, 1);
      });

      it('should set values properly via RGBA', () => {
        const c = new Color();
        c.parseColorFnString('rgba(17, 34,51,  0.2)');
        assert.equal(c.red, 17);
        assert.equal(c.green, 34);
        assert.equal(c.blue, 51);
        assert.closeTo(c.alpha, 0.2, 0.01);
      });

      it('allows decimal values, with and without the integer', () => {
        const c = new Color();
        c.parseColorFnString('rgba(.1, 23.4, 56.7, .89)');
        assert.equal(c.red, 0);
        assert.equal(c.green, 23);
        assert.equal(c.blue, 57);
        assert.closeTo(c.alpha, 0.89, 0.01);
      });

      it('allows percentages', () => {
        const c = new Color();
        c.parseColorFnString('rgba(100%, 100%, 0%, 50%)');
        assert.equal(c.red, 255);
        assert.equal(c.green, 255);
        assert.equal(c.blue, 0);
        assert.equal(c.alpha, 0.5);
      });

      it.skip('allows exponent numbers', () => {
        const c = new Color();
        c.parseColorFnString('rgb(2e0, 2e1, 2e2)');
        assert.equal(c.red, 2);
        assert.equal(c.green, 20);
        assert.equal(c.blue, 200);
        assert.equal(c.alpha, 1);
      });

      it('supports space separated notation', () => {
        const c = new Color();
        c.parseColorFnString('rgba(255 128 0 / 50%)');
        assert.equal(c.red, 255);
        assert.equal(c.green, 128);
        assert.equal(c.blue, 0);
        assert.equal(c.alpha, 0.5);
      });

      it('allows alpha values', () => {
        const c = new Color();
        c.parseColorFnString('rgb(255 128 0 / 50%)');
        assert.equal(c.red, 255);
        assert.equal(c.green, 128);
        assert.equal(c.blue, 0);
        assert.equal(c.alpha, 0.5);
      });
    });

    describe('with hsl(a)', () => {
      it('allows hsl', () => {
        const c = new Color();
        c.parseColorFnString('hsl(160, 40%, 50%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 1);
      });

      it('allows hsla', () => {
        const c = new Color();
        c.parseColorFnString('hsla(160, 40%, 50%, .5)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 0.5);
      });

      it('allows hsl with space notation', () => {
        const c = new Color();
        c.parseColorFnString('hsl(160 40% 50% / 5%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 0.05);
      });

      it('supports deg on hue', () => {
        const c = new Color();
        c.parseColorFnString('hsl(160deg, 40%, 50%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 1);
      });

      it('supports rad on hue', () => {
        const c = new Color();
        c.parseColorFnString('hsl(2.79rad, 40%, 50%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 1);
      });

      it('supports negative rad on hue', () => {
        const c = new Color();
        c.parseColorFnString('hsl(-3.49rad, 40%, 50%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 145);
        assert.equal(c.alpha, 1);
      });

      it('supports turn on hue', () => {
        const c = new Color();
        c.parseColorFnString('hsl(0.444turn, 40%, 50%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 1);
      });

      it('supports negative turn on hue', () => {
        const c = new Color();
        c.parseColorFnString('hsl(-0.556turn, 40%, 50%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 1);
      });
    });

    describe('with hwb()', () => {
      it('allows hwb', () => {
        const c = new Color();
        c.parseColorFnString('hwb(160, 40%, 50%)');
        assert.equal(c.red, 102);
        assert.equal(c.green, 128);
        assert.equal(c.blue, 119);
        assert.equal(c.alpha, 1);
      });

      it('allows alpha values', () => {
        const c = new Color();
        c.parseColorFnString('hwb(160, 40%, 50% / 50%)');
        assert.equal(c.red, 102);
        assert.equal(c.green, 128);
        assert.equal(c.blue, 119);
        assert.equal(c.alpha, 0.5);
      });

      it('allows hsl with space notation', () => {
        const c = new Color();
        c.parseColorFnString('hwb(160 40% 50% / 50%)');
        assert.equal(c.red, 102);
        assert.equal(c.green, 128);
        assert.equal(c.blue, 119);
        assert.equal(c.alpha, 0.5);
      });
    });

    describe('with lab()', () => {
      it('allows lab', () => {
        const c = new Color();
        c.parseColorFnString('lab(66.26 -37.50 8.58)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 1);
      });

      it('allows alpha values', () => {
        const c = new Color();
        c.parseColorFnString('lab(66.26 -37.50 8.58 / 50%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 0.5);
      });
    });

    describe('with lch()', () => {
      it('allows lch', () => {
        const c = new Color();
        c.parseColorFnString('lch(66.26 38.47 167.1)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 1);
      });

      it('allows alpha values', () => {
        const c = new Color();
        c.parseColorFnString('lch(66.26 38.47 167.1 / 50%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 0.5);
      });
    });

    describe('with oklab()', () => {
      it('allows oklab', () => {
        const c = new Color();
        c.parseColorFnString('oklab(0.697 -0.107 0.023)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 1);
      });

      it('allows alpha values', () => {
        const c = new Color();
        c.parseColorFnString('oklab(0.697 -0.107 0.023 / 50%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 0.5);
      });
    });

    describe('with oklch()', () => {
      it('allows oklch', () => {
        const c = new Color();
        c.parseColorFnString('oklch(0.6967 0.109 167.711)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 1);
      });

      it('allows alpha values', () => {
        const c = new Color();
        c.parseColorFnString('oklch(0.6967 0.109 167.711 / 50%)');
        assert.equal(c.red, 77);
        assert.equal(c.green, 179);
        assert.equal(c.blue, 144);
        assert.equal(c.alpha, 0.5);
      });

      it('clips out of gamut values', () => {
        const c = new Color();
        c.parseColorFnString('oklch(25% 0.75 345)');
        assert.equal(c.red, 186);
        assert.equal(c.green, 0);
        assert.equal(c.blue, 103);
        assert.equal(c.alpha, 1);

        assert.equal(c.red, Math.round(c.r * 255));
        assert.equal(c.green, Math.round(c.g * 255));
        assert.equal(c.blue, Math.round(c.b * 255));
      });
    });
  });

  describe('parseHexString', () => {
    it('returns values from a 6 digit hex string', () => {
      const color = new Color();
      color.parseHexString('#123Abc');
      assert.equal(color.red, 18);
      assert.equal(color.green, 58);
      assert.equal(color.blue, 188);
      assert.equal(color.alpha, 1);
    });

    it('returns values from a 3 digit hex string', () => {
      const color = new Color();
      color.parseHexString('#19E');
      assert.equal(color.red, 17);
      assert.equal(color.green, 153);
      assert.equal(color.blue, 238);
      assert.equal(color.alpha, 1);
    });

    it('returns values from a 8 digit hex string', () => {
      const color = new Color();
      color.parseHexString('#123ABCde');
      assert.equal(color.red, 18);
      assert.equal(color.green, 58);
      assert.equal(color.blue, 188);
      assert.closeTo(color.alpha, 222 / 255, 0.001);
    });

    it('returns values from a 4 digit hex string', () => {
      const color = new Color();
      color.parseHexString('#19EC');
      assert.equal(color.red, 17);
      assert.equal(color.green, 153);
      assert.equal(color.blue, 238);
      assert.closeTo(color.alpha, 204 / 255, 0.01);
    });

    it('does nothing when passed an invalid string', () => {
      const color = new Color(1, 2, 3, 0.4);
      const values = ['abcdef', '#abcde', '#XYZ', '#0123456789'];
      values.forEach(function (val) {
        color.parseHexString(val);
        assert.equal(color.red, 1);
        assert.equal(color.green, 2);
        assert.equal(color.blue, 3);
        assert.equal(color.alpha, 0.4);
      });
    });
  });

  describe('parseString', () => {
    it('sets the value of a named color', () => {
      const color = new Color();
      color.parseString('chocolate');
      assert.equal(color.red, 210);
      assert.equal(color.green, 105);
      assert.equal(color.blue, 30);
      assert.equal(color.alpha, 1);
    });

    it('returns everything on 0 with transparent', () => {
      const color = new Color(255, 255, 255, 1);
      color.parseString('transparent');
      assert.equal(color.red, 0);
      assert.equal(color.green, 0);
      assert.equal(color.blue, 0);
      assert.equal(color.alpha, 0);
    });

    it('sets hex colors', () => {
      const color = new Color();
      color.parseString('#F00C');
      assert.equal(color.red, 255);
      assert.equal(color.green, 0);
      assert.equal(color.blue, 0);
      assert.closeTo(color.alpha, 204 / 255, 0.01);
    });

    it('sets rgb colors', () => {
      const color = new Color();
      color.parseString('rgb(10, 20, 30)');
      assert.equal(color.red, 10);
      assert.equal(color.green, 20);
      assert.equal(color.blue, 30);
      assert.equal(color.alpha, 1);
    });

    it('sets rgba colors', () => {
      const color = new Color();
      color.parseString('rgba(10, 20, 30, 0.4)');
      assert.equal(color.red, 10);
      assert.equal(color.green, 20);
      assert.equal(color.blue, 30);
      assert.equal(color.alpha, 0.4);
    });

    it('allows hsl', () => {
      const c = new Color();
      c.parseString('hsl(160, 40%, 50%)');
      assert.equal(c.red, 77);
      assert.equal(c.green, 179);
      assert.equal(c.blue, 144);
      assert.equal(c.alpha, 1);
    });

    it('allows hsla', () => {
      const c = new Color();
      c.parseString('hsla(160, 40%, 50%, .5)');
      assert.equal(c.red, 77);
      assert.equal(c.green, 179);
      assert.equal(c.blue, 144);
      assert.equal(c.alpha, 0.5);
    });
  });

  describe('toHexString', () => {
    it('should return hex values properly', () => {
      const black = new Color(0, 0, 0, 1);
      const white = new Color(255, 255, 255, 1);
      const yellow = new Color(255, 255, 0, 1);
      const darkyellow = new Color(128, 128, 0, 1);
      const blue = new Color(0, 0, 255, 1);
      assert.equal(black.toHexString(), '#000000');
      assert.equal(white.toHexString(), '#ffffff');
      assert.equal(yellow.toHexString(), '#ffff00');
      assert.equal(darkyellow.toHexString(), '#808000');
      assert.equal(blue.toHexString(), '#0000ff');
    });

    it('should return hex values properly when they are non-integery', () => {
      const black = new Color(0, 0, 0, 1);
      const white = new Color(255, 255, 255, 0.1);
      const grayish = axe.commons.color.flattenColors(white, black);
      assert.equal(grayish.toHexString(), '#1a1a1a');
    });
  });

  describe('getRelativeLuminance', () => {
    it('should calculate luminance sensibly', () => {
      const black = new Color(0, 0, 0, 1);
      const white = new Color(255, 255, 255, 1);
      const yellow = new Color(255, 255, 0, 1);
      const darkyellow = new Color(128, 128, 0, 1);
      const blue = new Color(0, 0, 255, 1);
      const lBlack = black.getRelativeLuminance();
      const lWhite = white.getRelativeLuminance();
      const lYellow = yellow.getRelativeLuminance();
      const lDarkyellow = darkyellow.getRelativeLuminance();
      const lBlue = blue.getRelativeLuminance();

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

  describe('getLuminosity', () => {
    it('returns luminosity of the Color', () => {
      const L = new Color(128, 128, 0, 1).getLuminosity();
      assert.equal(L, 0.44674509803921564);
    });
  });

  describe('setLuminosity', () => {
    it('sets the luminosity of the Color', () => {
      const color = new Color(0, 0, 0, 1).setLuminosity(0.5);
      assert.deepEqual(color.toJSON(), {
        red: 128,
        green: 128,
        blue: 128,
        alpha: 1
      });
    });

    it('returns a new Color', () => {
      const black = new Color(0, 0, 0, 1);
      const nBlack = black.setLuminosity(0.5);
      assert.notEqual(black, nBlack);
    });
  });

  describe('getSaturation', () => {
    it('returns the saturation of the Color', () => {
      const s = new Color(255, 128, 200, 1).getSaturation();
      assert.equal(s, 0.4980392156862745);
    });
  });

  describe('setSaturation', () => {
    it('sets the saturation of the Color', () => {
      const color = new Color(128, 100, 0, 1).setSaturation(0.8);
      assert.deepEqual(color.toJSON(), {
        red: 204,
        green: 159,
        blue: 0,
        alpha: 1
      });
    });

    it('returns a new Color', () => {
      const black = new Color(0, 0, 0, 1);
      const nBlack = black.setSaturation(0.5);
      assert.notEqual(black, nBlack);
    });
  });

  describe('clip', () => {
    it('clips to the lower bound', () => {
      const color = new Color(255, 0, -1, 1).clip();
      assert.equal(color.r, 0.9909493297254295);
      assert.equal(color.g, 0.003870895819239939);
      assert.equal(color.b, 0);
    });

    it('clips to the upper bound', () => {
      const color = new Color(255, 0, 256, 1).clip();
      assert.equal(color.r, 0.9961043436801178);
      assert.equal(color.g, 0.002711982110142841);
      assert.equal(color.b, 1);
    });

    it('clips both the lower and upper bounds', () => {
      const color = new Color(-1, 0, 256, 1).clip();
      assert.equal(color.r, 0.00047889410870861904);
      assert.equal(color.g, 0.004247986549875488);
      assert.equal(color.b, 0.9691356514885925);
    });

    it('returns a new Color', () => {
      const black = new Color(0, 0, 0, 1);
      const nBlack = black.clip();
      assert.notEqual(black, nBlack);
    });
  });
});
