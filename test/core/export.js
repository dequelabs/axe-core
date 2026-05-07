describe('export', () => {
  it('should publish a global `axe` variable', () => {
    assert.isDefined(window.axe);
  });
  it('should define version', () => {
    assert.isNotNull(axe.version);
  });
});
