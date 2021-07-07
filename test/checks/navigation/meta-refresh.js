describe('meta-refresh', function() {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;

  afterEach(function() {
    checkContext.reset();
  });

  describe('; separator', function() {
    it('should return false if content value is not 0', function() {
      var checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="300">'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('meta-refresh')
          .apply(checkContext, checkArgs)
      );
    });

    it('should return false if content value does not start with 0', function() {
      var checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="300;URL=something.html">'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('meta-refresh')
          .apply(checkContext, checkArgs)
      );
    });

    it('should return true if content value starts with 0', function() {
      var checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="0;URL=something.html">'
      );

      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('meta-refresh')
          .apply(checkContext, checkArgs)
      );
    });

    it('should return true if content value is 0', function() {
      var checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="0">'
      );

      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('meta-refresh')
          .apply(checkContext, checkArgs)
      );
    });

    it('should return true if there is no content value', function() {
      var checkArgs = checkSetup('<meta id="target" name="refresh">');

      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('meta-refresh')
          .apply(checkContext, checkArgs)
      );
    });
  });
});
