describe('meta-refresh', function () {
  'use strict';

  let checkContext = axe.testUtils.MockCheckContext();
  let checkSetup = axe.testUtils.checkSetup;
  let metaRefreshCheck = axe.testUtils.getCheckEvaluate('meta-refresh');

  afterEach(function () {
    checkContext.reset();
  });

  it('returns false if there is a number', function () {
    let checkArgs = checkSetup('<meta id="target" name="refresh" content="3">');
    assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
  });

  describe('returns false when valid', function () {
    it('there is a decimal', function () {
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3.1">'
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('there is a number followed by a dot', function () {
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3.">'
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('there is a dot followed by a number', function () {
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content=".5">'
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('there is whitespace before the number', function () {
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="  \n\t3">'
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    describe('with a valid separator', function () {
      it('the number is followed by a semicolon', function () {
        let checkArgs = checkSetup(
          '<meta id="target" name="refresh" content="3;">'
        );
        assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
      });

      it('the number is followed by a comma', function () {
        let checkArgs = checkSetup(
          '<meta id="target" name="refresh" content="3,">'
        );
        assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
      });

      it('the number is followed spaces, and then a separator', function () {
        let checkArgs = checkSetup(
          '<meta id="target" name="refresh" content="3 \t\n;">'
        );
        assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
      });

      it('the separator is followed by non-separator characters', function () {
        let checkArgs = checkSetup(
          '<meta id="target" name="refresh" content="3; https://deque.com/">'
        );
        assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
      });

      it('the separator is a space', function () {
        let checkArgs = checkSetup(
          '<meta id="target" name="refresh" content="3 https://deque.com/">'
        );
        assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
      });
    });
  });

  describe('returns true when invalid', function () {
    it('the number is prefaced with a plus', function () {
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="+3">'
      );
      assert.isTrue(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('the number is prefaced with a minus', function () {
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="-3">'
      );
      assert.isTrue(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('the number is prefaced with a letter', function () {
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="a3">'
      );
      assert.isTrue(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('the number is followed by an invalid separator character', function () {
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3: https://deque.com/">'
      );
      assert.isTrue(metaRefreshCheck.apply(checkContext, checkArgs));
    });
  });

  describe('options.minDelay', function () {
    it('returns false when the redirect number is greater than minDelay', function () {
      let options = { minDelay: 2 };
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3">',
        options
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('returns true when the redirect number equals minDelay', function () {
      let options = { minDelay: 3 };
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3">',
        options
      );
      assert.isTrue(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('returns true when the redirect number is less than minDelay', function () {
      let options = { minDelay: 4 };
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3">',
        options
      );
      assert.isTrue(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('ignores minDelay when set to false', function () {
      let options = { minDelay: false };
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="0">',
        options
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });
  });

  describe('options.maxDelay', function () {
    it('returns true when the redirect number is greater than maxDelay', function () {
      let options = { maxDelay: 2 };
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3">',
        options
      );
      assert.isTrue(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('returns false when the redirect number equals maxDelay', function () {
      let options = { maxDelay: 3 };
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3">',
        options
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('returns false when the redirect number is less than maxDelay', function () {
      let options = { maxDelay: 4 };
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3">',
        options
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('ignores maxDelay when set to false', function () {
      let options = { maxDelay: false };
      let checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="9999">',
        options
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });
  });
});
