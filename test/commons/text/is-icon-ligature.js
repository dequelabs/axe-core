describe('text.isIconLigature', function () {
  'use strict';

  var isIconLigature = axe.commons.text.isIconLigature;
  var queryFixture = axe.testUtils.queryFixture;
  var fontApiSupport = !!document.fonts;

  before(function (done) {
    if (!fontApiSupport) {
      done();
    }

    var firaFont = new FontFace(
      'Fira Code',
      'url(/test/assets/FiraCode-Regular.woff)'
    );
    var ligatureFont = new FontFace(
      'LigatureSymbols',
      'url(/test/assets/LigatureSymbols.woff)'
    );
    var materialFont = new FontFace(
      'Material Icons',
      'url(/test/assets/MaterialIcons.woff2)'
    );
    var robotoFont = new FontFace('Roboto', 'url(/test/assets/Roboto.woff2)');

    window.Promise.all([
      firaFont.load(),
      ligatureFont.load(),
      materialFont.load(),
      robotoFont.load()
    ]).then(function () {
      document.fonts.add(firaFont);
      document.fonts.add(ligatureFont);
      document.fonts.add(materialFont);
      document.fonts.add(robotoFont);
      done();
    });
  });

  it('should return false for normal text', function () {
    var target = queryFixture('<div id="target">Normal text</div>');
    assert.isFalse(isIconLigature(target.children[0]));
  });

  it('should return false for emoji', function () {
    var target = queryFixture('<div id="target">🌎</div>');
    assert.isFalse(isIconLigature(target.children[0]));
  });

  it('should return false for non-bmp unicode', function () {
    var target = queryFixture('<div id="target">◓</div>');
    assert.isFalse(isIconLigature(target.children[0]));
  });

  it('should return false for whitespace strings', function () {
    var target = queryFixture('<div id="target">     </div>');
    assert.isFalse(isIconLigature(target.children[0]));
  });

  (fontApiSupport ? it : it.skip)(
    'should return false for common ligatures (fi)',
    function () {
      var target = queryFixture(
        '<div id="target" style="font-family: Roboto">figure</div>'
      );
      assert.isFalse(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return false for common ligatures (ff)',
    function () {
      var target = queryFixture(
        '<div id="target" style="font-family: Roboto">ffugative</div>'
      );
      assert.isFalse(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return false for common ligatures (fl)',
    function () {
      var target = queryFixture(
        '<div id="target" style="font-family: Roboto">flu shot</div>'
      );
      assert.isFalse(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return false for common ligatures (ffi)',
    function () {
      var target = queryFixture(
        '<div id="target" style="font-family: Roboto">ffigure</div>'
      );
      assert.isFalse(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return false for common ligatures (ffl)',
    function () {
      var target = queryFixture(
        '<div id="target" style="font-family: Roboto">fflu shot</div>'
      );
      assert.isFalse(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return true for an icon ligature',
    function () {
      var target = queryFixture(
        '<div id="target" style="font-family: \'Material Icons\'">delete</div>'
      );
      assert.isTrue(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)('should trim the string', function () {
    var target = queryFixture(
      '<div id="target" style="font-family: Roboto">  fflu shot  </div>'
    );
    assert.isFalse(isIconLigature(target.children[0]));
  });

  (fontApiSupport ? it : it.skip)(
    'should return true for a font that has no character data',
    function () {
      var target = queryFixture(
        '<div id="target" style="font-family: \'Material Icons\'">f</div>'
      );
      assert.isTrue(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return false for a programming text ligature',
    function () {
      var target = queryFixture(
        '<div id="target" style="font-family: Fira Code">!==</div>'
      );
      assert.isFalse(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return true for an icon ligature with low pixel difference',
    function () {
      var target = queryFixture(
        '<div id="target" style="font-family: \'Material Icons\'">keyboard_arrow_left</div>'
      );
      assert.isTrue(isIconLigature(target.children[0]));
    }
  );

  (fontApiSupport ? it : it.skip)(
    'should return true after the 3rd time the font is an icon',
    function () {
      var target = queryFixture(
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
    function () {
      var target = queryFixture(
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

  describe('pixelThreshold', function () {
    (fontApiSupport ? it : it.skip)(
      'should allow higher percent (will not flag icon ligatures)',
      function () {
        var target = queryFixture(
          '<div id="target" style="font-family: \'LigatureSymbols\'">delete</div>'
        );

        // every pixel must be different to flag as icon
        assert.isFalse(isIconLigature(target.children[0], 1));
      }
    );

    (fontApiSupport ? it : it.skip)(
      'should allow lower percent (will flag text ligatures)',
      function () {
        var target = queryFixture(
          '<div id="target" style="font-family: Roboto">figure</div>'
        );
        assert.isTrue(isIconLigature(target.children[0], 0));
      }
    );
  });

  describe('occuranceThreshold', function () {
    (fontApiSupport ? it : it.skip)(
      'should change the number of times a font is seen before returning',
      function () {
        var target = queryFixture(
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
