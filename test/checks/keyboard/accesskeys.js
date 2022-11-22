describe('accesskeys', () => {
  'use strict';

  const checkSetup = axe.testUtils.checkSetup;
  const checkContext = axe.testUtils.MockCheckContext();
  const checkEvaluate = axe.testUtils.getCheckEvaluate('accesskeys');

  afterEach(() => {
    checkContext.reset();
  });

  it('should return true and record accesskey', () => {
    const params = checkSetup('<div id="target" accesskey="A"></div>');
    assert.isTrue(checkEvaluate.apply(checkContext, params));

    assert.equal(checkContext._data, 'A');
    assert.lengthOf(checkContext._relatedNodes, 1);
    assert.equal(checkContext._relatedNodes[0], params[0]);
  });

  it('ignores hidden nodes', () => {
    const params = checkSetup(
      '<div id="target" accesskey="A" style="display: none"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));

    assert.isNull(checkContext._data);
  });

  it('does not ignore visibly hidden nodes', () => {
    const params = checkSetup(
      '<div id="target" accesskey="A" style="opacity: 0"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));

    assert.equal(checkContext._data, 'A');
    assert.lengthOf(checkContext._relatedNodes, 1);
    assert.equal(checkContext._relatedNodes[0], params[0]);
  });

  it('does not ignore screen reader hidden nodes', () => {
    const params = checkSetup(
      '<div id="target" accesskey="A" aria-hidden="true"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));

    assert.equal(checkContext._data, 'A');
    assert.lengthOf(checkContext._relatedNodes, 1);
    assert.equal(checkContext._relatedNodes[0], params[0]);
  });

  describe('after', () => {
    it('should push duplicates onto relatedNodes', () => {
      const results = [
        { data: 'A', relatedNodes: ['bob'] },
        { data: 'A', relatedNodes: ['fred'] }
      ];

      const result = checks.accesskeys.after(results);

      assert.lengthOf(result, 1);
      assert.equal(result[0].data, 'A');
      assert.lengthOf(result[0].relatedNodes, 1);
      assert.equal(result[0].relatedNodes[0], 'fred');
    });

    it('should remove non-unique accesskeys and toggle result', () => {
      const results = [
        { data: 'A', relatedNodes: ['bob'] },
        { data: 'A', relatedNodes: ['joe'] },
        { data: 'B', relatedNodes: ['fred'] }
      ];

      const result = checks.accesskeys.after(results);

      assert.lengthOf(result, 2);
      assert.isTrue(result[0].result);
      assert.isFalse(result[1].result);
    });

    it('should consider accesskeys with different cases as the same result', () => {
      const result = checks.accesskeys.after([
        { data: 'A', relatedNodes: ['bob'] },
        { data: 'a', relatedNodes: ['fred'] }
      ]);

      assert.lengthOf(result, 1);
      assert.equal(result[0].data, 'A');
      assert.lengthOf(result[0].relatedNodes, 1);
      assert.equal(result[0].relatedNodes[0], 'fred');
    });
  });
});
