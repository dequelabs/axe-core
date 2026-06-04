describe('axe.constants', () => {
  it('should create an object', () => {
    assert.isObject(axe.constants);
  });

  it('should have a results array', () => {
    assert.isArray(axe.constants.results);
  });

  it('should have PASS', () => {
    assert.equal(axe.constants.PASS, 'passed');
  });

  it('should have FAIL', () => {
    assert.equal(axe.constants.FAIL, 'failed');
  });

  it('should have NA', () => {
    assert.equal(axe.constants.NA, 'inapplicable');
  });

  it('should have CANTTELL', () => {
    assert.equal(axe.constants.CANTTELL, 'cantTell');
  });

  it('should have priorities for results', () => {
    assert.equal(axe.constants.NA_PRIO, 0);
  });

  it('should have groups for results', () => {
    assert.equal(axe.constants.FAIL_GROUP, 'violations');
  });

  it('should have a gridSize', () => {
    assert.equal(axe.constants.gridSize, 200);
  });

  it('should have a selectorSimilarFilterLimit', () => {
    assert.equal(axe.constants.selectorSimilarFilterLimit, 700);
  });

  it('has a serializableErrorProps array', () => {
    assert.isArray(axe.constants.serializableErrorProps);
    axe.constants.serializableErrorProps.forEach(prop => {
      assert.typeOf(prop, 'string', `prop ${prop} is not a string`);
    });
  });
});
