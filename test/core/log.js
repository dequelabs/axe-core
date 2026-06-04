describe('axe.log', () => {
  it('should be a function', () => {
    assert.isFunction(axe.log);
  });
  it('should invoke console.log', () => {
    const orig = window.console;
    if (!window.console || window.console.log) {
      window.console = { log: () => {} };
    }
    const expected = ['hi', 'hello'];
    let success = false;

    window.console.log = function () {
      success = true;
      assert.equal(arguments[0], expected[0]);
      assert.equal(arguments[1], expected[1]);
    };

    axe.log.apply(axe.log, expected);
    assert.isTrue(success);

    window.console = orig;
  });
});
