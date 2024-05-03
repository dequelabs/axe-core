describe('axe.log', function () {
  'use strict';

  it('should be a function', function () {
    assert.isFunction(axe.log);
  });
  it('should invoke console.log', function () {
    let orig = window.console;
    if (!window.console || window.console.log) {
      window.console = { log: function () {} };
    }
    let expected = ['hi', 'hello'];
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
