describe('color.centerPointOfRect', function () {
  'use strict';

  it('returns `undefined` when element is placed outside of viewport (left position > window dimension)', function () {
    var actual = axe.commons.color.centerPointOfRect({
      left: 9999,
      top: 0,
      width: 200,
      height: 100
    });
    assert.isUndefined(actual);
  });

  it('returns `{x,y}` when element is with in viewport', function () {
    var actual = axe.commons.color.centerPointOfRect({
      left: 0,
      top: 0,
      width: 200,
      height: 100
    });
    assert.isDefined(actual);
    assert.hasAllKeys(actual, ['x', 'y']);
  });

  it('returns `{x,y}` when element is with in viewport (check returned coordinate values)', function () {
    var actual = axe.commons.color.centerPointOfRect({
      left: 100,
      top: 100,
      width: 250,
      height: 250
    });

    assert.isDefined(actual);
    assert.hasAllKeys(actual, ['x', 'y']);
    assert.equal(actual.x, 225);
    assert.equal(actual.y, 225);
  });
});
