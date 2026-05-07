describe('index', () => {
  it('should redefine `define`', () => {
    assert.equal(typeof define, 'undefined');
  });
  it('should redefine `require`', () => {
    assert.equal(typeof require, 'undefined');
  });
});
