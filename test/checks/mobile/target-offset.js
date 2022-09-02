describe('target-offset tests', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;
  var check = checks['target-offset'];

  afterEach(function () {
    checkContext.reset();
  });

  it('returns true when there are no other nearby targets', function () {
    var checkArgs = checkSetup(
      '<button id="target" style="' +
        'display: inline-block; width:16px; height:16px;' +
        '">x</button>'
    );

    assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 24);
    assert.closeTo(checkContext._data.closestOffset, 24, 0.2);
  });

  it('returns true when the offset is 24px', function () {
    var checkArgs = checkSetup(
      '<button id="target" style="' +
        'display: inline-block; width:16px; height:16px; margin-right: 8px' +
        '">x</button>' +
        '<button style="' +
        'display: inline-block; width:16px; height:16px;' +
        '">x</button>'
    );

    assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 24);
    assert.closeTo(checkContext._data.closestOffset, 24, 0.2);
  });

  it('returns false when the offset is 23px', function () {
    var checkArgs = checkSetup(
      '<button id="target" style="' +
        'display: inline-block; width:16px; height:16px; margin-right: 7px' +
        '">x</button>' +
        '<button style="' +
        'display: inline-block; width:16px; height:16px;' +
        '">x</button>'
    );

    assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 24);
    assert.closeTo(checkContext._data.closestOffset, 23, 0.2);
  });

  it('ignores non-widget elements as neighbors', function () {
    var checkArgs = checkSetup(
      '<button id="target" style="' +
        'display: inline-block; width:16px; height:16px; margin-right: 7px' +
        '">x</button>' +
        '<div style="' +
        'display: inline-block; width:16px; height:16px;' +
        '">x</div>'
    );

    assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 24);
    assert.closeTo(checkContext._data.closestOffset, 24, 0.2);
  });

  it('sets all elements that are too close as related nodes', function () {
    var checkArgs = checkSetup(
      '<a href="#" id="left" style="' +
        'display: inline-block; width:16px; height:16px;' +
        '">x</a>' +
        '<a href="#" id="target" style="' +
        'display: inline-block; width:16px; height:16px; margin-right: 4px' +
        '">x</a>' +
        '<a href="#" id="right" style="' +
        'display: inline-block; width:16px; height:16px;' +
        '">x</a>'
    );
    assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 24);
    assert.closeTo(checkContext._data.closestOffset, 16, 0.2);

    var relatedIds = checkContext._relatedNodes.map(function (node) {
      return '#' + node.id;
    });
    assert.deepEqual(relatedIds, ['#left', '#right']);
  });
});
