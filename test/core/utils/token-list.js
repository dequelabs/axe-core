describe('axe.utils.tokenList', () => {
  it('should split by space', () => {
    assert.deepEqual(axe.utils.tokenList('bananas monkeys 42'), [
      'bananas',
      'monkeys',
      '42'
    ]);
  });

  it('should trim first', () => {
    assert.deepEqual(axe.utils.tokenList(' \r   bananas monkeys 42	\n  '), [
      'bananas',
      'monkeys',
      '42'
    ]);
  });

  it('should collapse whitespace', () => {
    assert.deepEqual(axe.utils.tokenList(' \r   bananas \r \n	monkeys		42	\n  '), [
      'bananas',
      'monkeys',
      '42'
    ]);
  });

  it('should return empty string array for null value', () => {
    assert.deepEqual(axe.utils.tokenList(null), ['']);
  });
});
