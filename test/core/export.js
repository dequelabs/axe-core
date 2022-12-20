describe('export', function () {
  'use strict';

  it('should publish a global `axe` variable', function () {
    assert.isDefined(window.axe);
  });
  it('should define version', function () {
    assert.isNotNull(axe.version);
  });
});
