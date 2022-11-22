describe('color.Color', function () {
  'use strict';

  it('should give sensible results for WCAG compliance', function () {
    var black = new axe.commons.color.Color(0, 0, 0, 1);
    var white = new axe.commons.color.Color(255, 255, 255, 1);
    var gray = new axe.commons.color.Color(128, 128, 128, 1);

    assert.isTrue(
      axe.commons.color.hasValidContrastRatio(black, white, 8, false).isValid
    );
    assert.isTrue(
      axe.commons.color.hasValidContrastRatio(black, white, 8, false)
        .contrastRatio > 4.5
    );
    assert.isTrue(
      axe.commons.color.hasValidContrastRatio(black, white, 8, false)
        .expectedContrastRatio === 4.5
    );

    assert.isTrue(
      axe.commons.color.hasValidContrastRatio(white, gray, 24, false).isValid
    );
    assert.isTrue(
      axe.commons.color.hasValidContrastRatio(white, gray, 24, false)
        .contrastRatio > 3
    );
    assert.isTrue(
      axe.commons.color.hasValidContrastRatio(white, gray, 24, false)
        .expectedContrastRatio === 3
    );

    assert.isTrue(
      axe.commons.color.hasValidContrastRatio(white, gray, 20, true).isValid
    );
    assert.isTrue(
      axe.commons.color.hasValidContrastRatio(white, gray, 20, true)
        .contrastRatio > 3
    );
    assert.isTrue(
      axe.commons.color.hasValidContrastRatio(white, gray, 20, true)
        .expectedContrastRatio === 3
    );

    assert.isFalse(
      axe.commons.color.hasValidContrastRatio(white, gray, 8, false).isValid
    );
    assert.isTrue(
      axe.commons.color.hasValidContrastRatio(white, gray, 8, false)
        .contrastRatio < 4.5
    );
    assert.isTrue(
      axe.commons.color.hasValidContrastRatio(white, gray, 8, false)
        .expectedContrastRatio === 4.5
    );
  });

  it('should count 1-1 ratios as visually hidden', function () {
    var black = new axe.commons.color.Color(0, 0, 0, 1);

    assert.isFalse(
      axe.commons.color.hasValidContrastRatio(black, black, 16, true).isValid
    );
    assert.isTrue(
      axe.commons.color.hasValidContrastRatio(black, black, 16, true)
        .contrastRatio === 1
    );
    assert.isTrue(
      axe.commons.color.hasValidContrastRatio(black, black, 16, true)
        .expectedContrastRatio === 4.5
    );
  });
});
