describe('color.getContrast', function () {
  'use strict';

  it('should calculate contrast sensibly', function () {
    var black = new axe.commons.color.Color(0, 0, 0, 1);
    var transparent = new axe.commons.color.Color(0, 0, 0, 0);
    var white = new axe.commons.color.Color(255, 255, 255, 1);
    var yellow = new axe.commons.color.Color(255, 255, 0, 1);

    //Same foreground/background gives 1
    assert.equal(axe.commons.color.getContrast(black, black), 1);
    assert.equal(axe.commons.color.getContrast(transparent, black), 1);
    assert.equal(axe.commons.color.getContrast(white, white), 1);
    assert.equal(axe.commons.color.getContrast(yellow, yellow), 1);

    //contrast ratio is reversible
    assert.equal(
      axe.commons.color.getContrast(yellow, black),
      axe.commons.color.getContrast(black, yellow)
    );
    assert.equal(
      axe.commons.color.getContrast(yellow, white),
      axe.commons.color.getContrast(white, yellow)
    );

    //things that are more contrasty return higher values than things that are less contrasty
    assert.isTrue(
      axe.commons.color.getContrast(yellow, white) <
        axe.commons.color.getContrast(yellow, black)
    );
    assert.isTrue(
      axe.commons.color.getContrast(yellow, black) <
        axe.commons.color.getContrast(white, black)
    );
  });
});
