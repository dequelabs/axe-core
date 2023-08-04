describe('target-offset tests', () => {

  const checkContext = axe.testUtils.MockCheckContext();
  const { checkSetup, getCheckEvaluate } = axe.testUtils;
  const checkEvaluate = getCheckEvaluate('target-offset');

  afterEach(() => {
    checkContext.reset();
  });

  it('returns true when there are no other nearby targets', () => {
    const checkArgs = checkSetup(
      '<a href="#" id="target" style="' +
        'display: inline-block; width:16px; height:16px;' +
        '">x</a>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 12);
    assert.closeTo(checkContext._data.closestOffset, 12, 0.2);
  });

  it('returns true when the offset is 12px', () => {
    const checkArgs = checkSetup(
      '<a href="#" id="target" style="' +
        'display: inline-block; width:16px; height:16px; margin-right: 8px' +
        '">x</a>' +
        '<a href="#" style="' +
        'display: inline-block; width:16px; height:16px;' +
        '">x</a>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 12);
    assert.closeTo(checkContext._data.closestOffset, 12, 0.2);
  });

  describe('when the offset is insufficient', () => {
    it('returns false for targets in the tab order', () => {
      const checkArgs = checkSetup(
        '<a href="#" id="target" style="' +
          'display: inline-block; width:16px; height:16px; margin-right: 7px' +
          '">x</a>' +
          '<a href="#" style="' +
          'display: inline-block; width:16px; height:16px;' +
          '">x</a>'
      );

      assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
      assert.isUndefined(checkContext._data.messageKey);
      assert.equal(checkContext._data.minOffset, 12);
      assert.closeTo(checkContext._data.closestOffset, 11, 0.2);
    });

    it('returns undefined for targets not in the tab order', () => {
      const checkArgs = checkSetup(
        '<a href="#" id="target" tabindex="-1" style="' +
          'display: inline-block; width:16px; height:16px; margin-right: 7px' +
          '">x</a>' +
          '<a href="#" style="' +
          'display: inline-block; width:16px; height:16px;' +
          '">x</a>'
      );

      assert.isUndefined(checkEvaluate.apply(checkContext, checkArgs));
      assert.isUndefined(checkContext._data.messageKey);
      assert.equal(checkContext._data.minOffset, 12);
      assert.closeTo(checkContext._data.closestOffset, 11, 0.2);
    });
  });

  it('ignores non-widget elements as neighbors', () => {
    const checkArgs = checkSetup(
      '<a href="#" id="target" style="' +
        'display: inline-block; width:16px; height:16px; margin-right: 7px' +
        '">x</a>' +
        '<div style="' +
        'display: inline-block; width:16px; height:16px;' +
        '">x</div>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 12);
    assert.closeTo(checkContext._data.closestOffset, 12, 0.2);
  });

  it('ignores non-focusable widget elements as neighbors', () => {
    const checkArgs = checkSetup(
      '<a href="#" id="target" style="' +
        'display: inline-block; width:16px; height:16px; margin-right: 7px' +
        '">x</a>' +
        '<button disabled style="' +
        'display: inline-block; width:16px; height:16px;' +
        '">x</button>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 12);
    assert.closeTo(checkContext._data.closestOffset, 12, 0.2);
  });

  it('sets all elements that are too close as related nodes', () => {
    const checkArgs = checkSetup(
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
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 12);
    assert.closeTo(checkContext._data.closestOffset, 4, 0.2);

    const relatedIds = checkContext._relatedNodes.map(function (node) {
      return '#' + node.id;
    });
    assert.deepEqual(relatedIds, ['#left', '#right']);
  });

  describe('when neighbors are focusable but not tabbable', () => {
    it('returns undefined if all neighbors are not tabbable', () => {
      const checkArgs = checkSetup(
        '<a href="#" id="left" tabindex="-1" style="' +
          'display: inline-block; width:16px; height:16px;' +
          '">x</a>' +
          '<a href="#" id="target" style="' +
          'display: inline-block; width:16px; height:16px; margin-right: 4px' +
          '">x</a>' +
          '<a href="#" id="right" tabindex="-1" style="' +
          'display: inline-block; width:16px; height:16px;' +
          '">x</a>'
      );
      assert.isUndefined(checkEvaluate.apply(checkContext, checkArgs));
      assert.equal(checkContext._data.messageKey, 'nonTabbableNeighbor');
      assert.equal(checkContext._data.minOffset, 12);
      assert.closeTo(checkContext._data.closestOffset, 4, 0.2);

      const relatedIds = checkContext._relatedNodes.map(function (node) {
        return '#' + node.id;
      });
      assert.deepEqual(relatedIds, ['#left', '#right']);
    });

    it('returns false if some but not all neighbors are not tabbable', () => {
      const checkArgs = checkSetup(
        '<a href="#" id="left" style="' +
          'display: inline-block; width:16px; height:16px;' +
          '">x</a>' +
          '<a href="#" id="target" style="' +
          'display: inline-block; width:16px; height:16px; margin-right: 4px' +
          '">x</a>' +
          '<a href="#" id="right" tabindex="-1" style="' +
          'display: inline-block; width:16px; height:16px;' +
          '">x</a>'
      );
      assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
      assert.isUndefined(checkContext._data.messageKey);
      assert.equal(checkContext._data.minOffset, 12);
      assert.closeTo(checkContext._data.closestOffset, 4, 0.2);

      const relatedIds = checkContext._relatedNodes.map(function (node) {
        return '#' + node.id;
      });
      assert.deepEqual(relatedIds, ['#left', '#right']);
    });
  });
});
