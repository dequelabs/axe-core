describe('strict-csp', () => {
  it('should parse without errors', () => {
    (assert.isDefined(window.axe), 'axe is not defined');
    assert.isDefined(window.axe.run, 'axe.run is not defined');
  });

  it('should run without errors', done => {
    axe.run((err, results) => {
      assert.isNull(err);
      assert.isDefined(results);
      done();
    });
  });
});
