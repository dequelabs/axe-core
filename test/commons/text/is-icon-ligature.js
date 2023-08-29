describe('text.isIconLigature', () => {
  'use strict';

  const isIconLigature = axe.commons.text.isIconLigature;
  const queryFixture = axe.testUtils.queryFixture;
  const fontApiSupport = !!document.fonts;

  before(done => {
    if (!fontApiSupport) {
      done();
    }

    const firaFont = new FontFace(
      'Fira Code',
      'url(/test/assets/FiraCode-Regular.woff)'
    );
    const ligatureFont = new FontFace(
      'LigatureSymbols',
      'url(/test/assets/LigatureSymbols.woff)'
    );
    const materialFont = new FontFace(
      'Material Icons',
      'url(/test/assets/MaterialIcons.woff2)'
    );
    const robotoFont = new FontFace('Roboto', 'url(/test/assets/Roboto.woff2)');
    const zeroWidth0CharFont = new FontFace(
      'ZeroWidth0Char',
      'url(/test/assets/ZeroWidth0Char.woff)'
    );

    window.Promise.all([
      firaFont.load(),
      ligatureFont.load(),
      materialFont.load(),
      robotoFont.load(),
      zeroWidth0CharFont.load()
    ]).then(() => {
      document.fonts.add(firaFont);
      document.fonts.add(ligatureFont);
      document.fonts.add(materialFont);
      document.fonts.add(robotoFont);
      document.fonts.add(zeroWidth0CharFont);
      done();
    });
  });

  it('should return false for normal text', () => {
    const target = queryFixture('<div id="target">Normal text</div>');
    assert.isFalse(isIconLigature(target.children[0]));
  });

  it('should return false for emoji', () => {
    const target = queryFixture('<div id="target">🌎</div>');
    assert.isFalse(isIconLigature(target.children[0]));
  });

  it('should return false for non-bmp unicode', () => {
    const target = queryFixture('<div id="target">◓</div>');
    assert.isFalse(isIconLigature(target.children[0]));
  });

  it('should return false for whitespace strings', () => {
    const target = queryFixture('<div id="target">     </div>');
    assert.isFalse(isIconLigature(target.children[0]));
  });

  (fontApiSupport ? it : it.skip)(
    'should return false for common ligatures (fi)',
    () => {
      const target = queryFixture(
        '<div id="target" style="font-family: Roboto">figure</div>'
      );
      assert.isFalse(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return false for common ligatures (ff)',
    () => {
      const target = queryFixture(
        '<div id="target" style="font-family: Roboto">ffugative</div>'
      );
      assert.isFalse(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return false for common ligatures (fl)',
    () => {
      const target = queryFixture(
        '<div id="target" style="font-family: Roboto">flu shot</div>'
      );
      assert.isFalse(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return false for common ligatures (ffi)',
    () => {
      const target = queryFixture(
        '<div id="target" style="font-family: Roboto">ffigure</div>'
      );
      assert.isFalse(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return false for common ligatures (ffl)',
    () => {
      const target = queryFixture(
        '<div id="target" style="font-family: Roboto">fflu shot</div>'
      );
      assert.isFalse(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return true for an icon ligature',
    () => {
      const target = queryFixture(
        '<div id="target" style="font-family: \'Material Icons\'">delete</div>'
      );
      assert.isTrue(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)('should trim the string', () => {
    const target = queryFixture(
      '<div id="target" style="font-family: Roboto">  fflu shot  </div>'
    );
    assert.isFalse(isIconLigature(target.children[0]));
  });

  (fontApiSupport ? it : it.skip)(
    'should return true for a font that has no character data',
    () => {
      const target = queryFixture(
        '<div id="target" style="font-family: \'Material Icons\'">f</div>'
      );
      assert.isTrue(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return true for a font that has zero width characters',
    () => {
      const target = queryFixture(
        '<div id="target" style="font-family: \'ZeroWidth0Char\'">0</div>'
      );
      assert.isTrue(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return false for a programming text ligature',
    () => {
      const target = queryFixture(
        '<div id="target" style="font-family: Fira Code">!==</div>'
      );
      assert.isFalse(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return true for an icon ligature with low pixel difference',
    () => {
      const target = queryFixture(
        '<div id="target" style="font-family: \'Material Icons\'">keyboard_arrow_left</div>'
      );
      assert.isTrue(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return true after the 3rd time the font is an icon',
    () => {
      const target = queryFixture(
        '<div id="target" style="font-family: \'LigatureSymbols\'">delete</div>'
      );

      isIconLigature(target.children[0]);
      isIconLigature(target.children[0]);
      isIconLigature(target.children[0]);

      // change text to non-icon
      target.children[0].actualNode.textContent = '__non-icon text__';
      assert.isTrue(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return false after the 3rd time the font is not an icon',
    () => {
      const target = queryFixture(
        '<div id="target" style="font-family: \'Roboto\'">__non-icon text__</div>'
      );

      isIconLigature(target.children[0]);
      isIconLigature(target.children[0]);
      isIconLigature(target.children[0]);

      // change text to icon
      target.children[0].actualNode.textContent = 'delete';
      assert.isFalse(isIconLigature(target.children[0]));
    }
  );

  describe('pixelThreshold', () => {
    (fontApiSupport ? it : it.skip)(
      'should allow higher percent (will not flag icon ligatures)',
      () => {
        const target = queryFixture(
          '<div id="target" style="font-family: \'LigatureSymbols\'">delete</div>'
        );

        // every pixel must be different to flag as icon
        assert.isFalse(isIconLigature(target.children[0], 1));
      }
    );

    (fontApiSupport ? it : it.skip)(
      'should allow lower percent (will flag text ligatures)',
      () => {
        const target = queryFixture(
          '<div id="target" style="font-family: Roboto">figure</div>'
        );
        assert.isTrue(isIconLigature(target.children[0], 0));
      }
    );
  });

  describe('occurrenceThreshold', () => {
    (fontApiSupport ? it : it.skip)(
      'should change the number of times a font is seen before returning',
      () => {
        const target = queryFixture(
          '<div id="target" style="font-family: \'LigatureSymbols\'">delete</div>'
        );

        isIconLigature(target.children[0]);

        // change text to non-icon
        target.children[0].actualNode.textContent = '__non-icon text__';
        assert.isTrue(isIconLigature(target.children[0], 0.1, 1));
        assert.isFalse(isIconLigature(target.children[0]));
      }
    );
  });
});
